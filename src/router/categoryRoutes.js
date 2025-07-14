const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();

router.post("/", CategoryController.create);
router.get("/", CategoryController.read);
router.get("/:id", CategoryController.details);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.destroy);

module.exports = router;
