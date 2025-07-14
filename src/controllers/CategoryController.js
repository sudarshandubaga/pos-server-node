const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    // Check if a category with the same name already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name: req.body.name },
    });
    if (existingCategory) {
      return res.status(400).send({
        message: "Category name have been already exists",
      });
    }

    await prisma.category.create({
      data: {
        name: req.body.name,
        parent_id: req.body.parent_id || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.send({
      message: "Category created successfully",
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const read = async (req, res) => {
  try {
    let records = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        parent: true,
        subcategories: true,
      },
    });

    res.send(records);
  } catch (error) {
    console.error("Error reading categories:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const details = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category
      .findUnique({
        where: {
          id,
        },
        include: {
          parent: true,
          subcategories: true,
        },
      })
      .then((record) => {
        if (!record) {
          return res.status(404).send({
            message: "Category not found",
          });
        }
        res.send(record);
      });
  } catch (error) {
    console.error("Error reading category details:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      return res.status(404).send({ message: "Category not found" });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: req.body.name,
        parent_id: req.body.parent_id || null,
        updatedAt: new Date(),
      },
    });

    res.send({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      return res.status(404).send({ message: "Category not found" });
    }

    await prisma.category.delete({
      where: { id },
    });

    res.send({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const CategoryController = {
  create,
  read,
  details,
  update,
  destroy,
};

module.exports = CategoryController;
