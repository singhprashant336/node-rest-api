const express = require("express");
const router = express.Router();
const UsersController = require('../controllers/user');

router.post("/signup", UsersController.users_create_user)

router.post("/login", UsersController.users_login_user)
  
router.delete("/:userId", UsersController.users_delete_user)

module.exports = router;