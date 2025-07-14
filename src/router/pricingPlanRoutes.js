const express = require("express");
const PricingPlanController = require("../controllers/PricingPlanController");
const router = express.Router();

router.post("/", PricingPlanController.create);
router.get("/", PricingPlanController.read);
router.get("/:id", PricingPlanController.details);
router.put("/:id", PricingPlanController.update);
router.delete("/:id", PricingPlanController.destroy);

module.exports = router;
