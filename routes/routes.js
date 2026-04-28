import express from 'express'
export const router = express.Router()
import {loadPage, createMessage, deleteMessage, editMessage, saveMessage, adminLogin, adminDashboard} from '../controllers/adminController.js'
import {createBuilding, deleteBuilding} from '../controllers/buildingController.js'

// HOME PAGE
router.get("/", loadPage);

//ADMIN PAGE
router.get("/admin", adminLogin)

//ADMIN DASHBOARD
router.post("/admin/dashboard", adminDashboard)

// CREATE MESSAGE
router.post("/messages", createMessage);

// DELETE MESSAGE
router.post("/messages/delete/:id", deleteMessage);

//EDIT MESSAGE
router.get("/messages/edit/:id", editMessage)

//SAVE MESSAGE
router.post("/messages/edit/:id", saveMessage)

// CREATE USER
router.post("/users", createBuilding);

// DELETE USER
router.post("/users/delete/:id", deleteBuilding);


