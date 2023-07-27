import { Router } from "express";
import { TasksOfoneUserData, addTask, delelteTask, getAllTasksWithUsers, tasksLate, tasksOfEmploy, updateTask } from "./controller/tasks.controller.js";
import { auth } from "../../middleware/auth.js";

const router= Router()

router.post("/addTask",auth,addTask)
router.put("/updateTask/:userId",auth,updateTask)
router.delete("/deleteTask/:userId",auth,delelteTask)
router.get("/getAllTasksWithUsers",getAllTasksWithUsers)
router.get("/TasksOfoneUserData",auth,TasksOfoneUserData)
router.get("/tasksOfEmploy",auth,tasksOfEmploy)
router.get("/tasksLate",auth,tasksLate)

export default router