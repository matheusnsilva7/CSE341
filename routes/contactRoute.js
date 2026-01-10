const express = require("express");
const router = new express.Router();
const contactController = require("../controllers/contactController")

router.get("/", contactController.getAll);

router.get("/:id", contactController.getOne)

module.exports = router;
