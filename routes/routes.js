import express from 'express'
export const router = express.Router()
import {loadPage, createMessage, deleteMessage, editMessage, saveMessage, adminLogin, adminDashboard, verifyPassword} from '../controllers/adminController.js'
import {createBuilding, deleteBuilding} from '../controllers/buildingController.js'
import {eventForm, eventEdit, saveEventEdits, createEvent, deleteEvent, editEvent, eventLogin, viewEventMap} from '../controllers/eventController.js'

// HOME PAGE
router.get("/", loadPage);

//ADMIN PAGE
router.get("/admin", adminLogin)

//VERIFY PASSWORD
router.post("/verify-password", verifyPassword)

//ADMIN DASHBOARD
router.get("/admin/dashboard", adminDashboard)

//EVENT FORM
router.post("/index", eventForm)

//Password/Admin login
router.get("/login", eventLogin)

//CREATE EVENT
router.post("/index/create", createEvent)

//EDIT EVENT
router.get("/edit", eventEdit)

//SAVE EDITED EVENT
router.post("/edit", saveEventEdits)

//DELETE EVENT
router.post("/deleteEvent", deleteEvent)

//EDIT EVENT
router.post("/editEvent/:id", editEvent)

// VIEW EVENT MAP
router.get("/events/:id/map", viewEventMap)

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


