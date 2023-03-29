const express = require('express');


const { loginController,
    registerController,getUsers } = require('../controllers/userController');


//Router object
const router = express.Router();


//routes
//GET users
router.get('/', getUsers);
//POST || LOGIN
router.post('/login', loginController)

//POST || Register
router.post('/register', registerController)



module.exports = router