import express from 'express'
export const router = express.Router()
import {loadPage, createMessage, deleteMessage, editMessage, saveMessage} from '../controllers/messageController.js'
import {createUser, deleteUser} from '../controllers/userController.js'
//import * as messageController from '..controllers/messageController.js'
// HOME PAGE
router.get("/", loadPage);

// CREATE MESSAGE
router.post("/messages", createMessage);

// DELETE MESSAGE
router.post("/messages/delete/:id", deleteMessage);

//EDIT MESSAGE
router.get("/messages/edit/:id", editMessage)

//SAVE MESSAGE
router.post("/messages/edit/:id", saveMessage)

// CREATE USER
router.post("/users", createUser);

// DELETE USER
router.post("/users/delete/:id", deleteUser);
