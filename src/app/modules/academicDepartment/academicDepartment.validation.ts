import { z } from 'zod';

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name Must be a string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty Must be String',
      required_error: 'Academic Faculty is required',
    }),
  }),
});

const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name Must be a string',
    }).optional(),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty Must be String',
    }).optional(),
  }),
});

export const AcademicDepartmentValidations = {
    createAcademicDepartmentValidation,
    updateAcademicDepartmentValidation
}
