import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import config from '../../index';
import { TUSer } from './user.interface';
import { StudentModel } from '../student/student.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a new user object

  const userData: Partial<TUSer> = {};

  //if password not given, use default password

  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info

  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('Admission semester Not found!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set automatically generated id
    userData.id = await generateStudentId(admissionSemester);
    //create a user (transaction - 1)
    const newUser = await User.create([userData], { session }); //array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_GATEWAY, 'Failed to create user');
    }

    payload.id = newUser[0].id; //embedding Id
    payload.user = newUser[0]._id; //reference _id

    //create a student (transaction - 2)

    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(404, 'Failed to create Student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
