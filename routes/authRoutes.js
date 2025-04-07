const express = require("express");
const dotenv = require("dotenv");
const controller = require("./routesController.js");

dotenv.config();

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

module.exports = router;