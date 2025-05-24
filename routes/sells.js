const express = require("express");
const router = express.Router();
const sellsController = require("../controllers/sellsController");

router.get("/", sellsController.getAll);

router.post("/add", sellsController.create);

router.post("/delete/:id", sellsController.delete);

module.exports = router;
