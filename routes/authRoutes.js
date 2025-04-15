const express = require("express");
const dotenv = require("dotenv");
const controller = require("./routesController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

dotenv.config();

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/dashboard", authMiddleware, controller.dashboard)
/* router.get("validate-session", controller.validateSession) */

module.exports = router;