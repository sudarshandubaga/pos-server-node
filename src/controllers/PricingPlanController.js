const Crud = require("../utils/crud.util");
const { v4: uuidv4 } = require("uuid");

const TABLE = "pos_pricing_plans";

const PricingPlanController = {
  async create(req, res) {
    try {
      const existing = await Crud.findByField(TABLE, "name", req.body.name);
      if (existing) {
        return res
          .status(400)
          .send({ message: "Pricing Plan name already exists" });
      }

      await Crud.create(TABLE, {
        id: uuidv4(),
        name: req.body.name,
        price: parseFloat(req.body.price),
        duration: parseInt(req.body.duration),
        description: req.body.description || null,
        is_recommended: req.body.is_recommended || false,
        is_active: req.body.is_active || true,
        created_at: new Date(),
        updated_at: new Date(),
      });

      res.send({ message: "Pricing Plan created successfully" });
    } catch (error) {
      console.error("Error creating Pricing Plan:", error);
      res
        .status(500)
        .send({ message: "Internal server error", error: error.message });
    }
  },

  async read(req, res) {
    try {
      const records = await Crud.findAll(TABLE, {
        orderBy: { field: "created_at", dir: "DESC" },
      });
      res.send(records);
    } catch (error) {
      console.error("Error reading pricing plans:", error);
      res
        .status(500)
        .send({ message: "Internal server error", error: error.message });
    }
  },

  async details(req, res) {
    try {
      const record = await Crud.findById(TABLE, req.params.id);
      if (!record) {
        return res.status(404).send({ message: "Pricing Plan not found" });
      }
      res.send(record);
    } catch (error) {
      console.error("Error reading Pricing Plan details:", error);
      res
        .status(500)
        .send({ message: "Internal server error", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const existing = await Crud.findById(TABLE, req.params.id);
      if (!existing) {
        return res.status(404).send({ message: "Pricing Plan not found" });
      }

      await Crud.update(TABLE, req.params.id, {
        name: req.body.name,
        price: parseFloat(req.body.price),
        duration: parseInt(req.body.duration),
        description: req.body.description || null,
        is_recommended: req.body.is_recommended || false,
        is_active: req.body.is_active || true,
        updated_at: new Date(),
      });

      res.send({ message: "Pricing Plan updated successfully" });
    } catch (error) {
      console.error("Error updating Pricing Plan:", error);
      res
        .status(500)
        .send({ message: "Internal server error", error: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const existing = await Crud.findById(TABLE, req.params.id);
      if (!existing) {
        return res.status(404).send({ message: "Pricing Plan not found" });
      }

      await Crud.destroy(TABLE, req.params.id);
      res.send({ message: "Pricing Plan deleted successfully" });
    } catch (error) {
      console.error("Error deleting Pricing Plan:", error);
      res
        .status(500)
        .send({ message: "Internal server error", error: error.message });
    }
  },
};

module.exports = PricingPlanController;
