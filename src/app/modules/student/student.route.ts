import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../utils/validateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router();

//will call controller

router.get("/", StudentControllers.getAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);

router.patch("/:studentId", validateRequest(studentValidations.updateStudentValidationSchema), StudentControllers.updateStudent);

router.delete("/:studentId", StudentControllers.deleteSingleStudent)

export const StudentRoute = router;