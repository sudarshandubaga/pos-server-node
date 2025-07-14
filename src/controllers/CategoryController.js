const Crud = require("../utils/crud.util");
const { v4: uuidv4 } = require("uuid");

const TABLE = "pos_categories";

const CategoryController = {
  async create(req, res) {
    try {
      const existing = await Crud.findByField(TABLE, "name", req.body.name);
      if (existing) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }

      await Crud.create(TABLE, {
        id: uuidv4(),
        name: req.body.name,
        parent_id: req.body.parent_id || null,
        created_at: new Date(),
        updated_at: new Date(),
      });

      res.json({ message: "Category created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async read(req, res) {
    try {
      const categories = await Crud.findAll(TABLE, {
        orderBy: { field: "created_at", dir: "DESC" },
      });
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async details(req, res) {
    try {
      const category = await Crud.findById(TABLE, req.params.id);
      if (!category) return res.status(404).json({ message: "Not found" });
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async update(req, res) {
    try {
      const category = await Crud.findById(TABLE, req.params.id);
      if (!category) return res.status(404).json({ message: "Not found" });

      await Crud.update(TABLE, req.params.id, {
        name: req.body.name,
        parent_id: req.body.parent_id || null,
        updated_at: new Date(),
      });

      res.json({ message: "Category updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async destroy(req, res) {
    try {
      const category = await Crud.findById(TABLE, req.params.id);
      if (!category) return res.status(404).json({ message: "Not found" });

      await Crud.destroy(TABLE, req.params.id);
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = CategoryController;
