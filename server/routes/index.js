const express = require('express')
const router = express.Router()
let userController = require('../controllers/userController')
let itemController = require('../controllers/itemController')
let helpers = require('../helpers/helpers')

// NOTE: user
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/signinfb', userController.signInFB)
router.get('/allusers', userController.getAllUsers)
router.get('/detailuser/:id', userController.getUserById)
router.put('/edituser/:id', userController.editUser)  // password harus disertakan
router.delete('/deleteuser/:id', userController.deleteUserById)

// NOTE: item
router.get('/bukalapak/:keyword', itemController.getItemBukalapak);
router.post('/createitem', helpers.checkRole, itemController.createItem)
router.get('/allitem', itemController.getAllItem)
router.get('/detailitem/:id', itemController.getItemById)
router.put('/edititem/:id', helpers.checkRole, itemController.editItemById)
router.delete('/deleteitem/:id', helpers.checkRole, itemController.deleteItemById)

module.exports = router