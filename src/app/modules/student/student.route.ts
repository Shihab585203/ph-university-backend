import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../utils/validateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router();

//will call controller

router.get("/", StudentControllers.getAllStudents);

router.get("/:id", StudentControllers.getSingleStudent);

router.patch("/:id", validateRequest(studentValidations.updateStudentValidationSchema), StudentControllers.updateStudent);

router.delete("/:id", StudentControllers.deleteSingleStudent)

export const StudentRoute = router;