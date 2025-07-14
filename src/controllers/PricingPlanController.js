const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    // Check if a PricingPlan with the same name already exists
    const existingPricingPlan = await prisma.pricingPlan.findUnique({
      where: { name: req.body.name },
    });
    if (existingPricingPlan) {
      return res.status(400).send({
        message: "Pricing Plan name have been already exists",
      });
    }

    await prisma.pricingPlan.create({
      data: {
        name: req.body.name,
        duration: parseInt(req.body.duration),
        price: parseFloat(req.body.price),
        description: req.body.description,
        isRecommended: req.body.is_recommended || false,
        isActive: req.body.is_active || true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.send({
      message: "Pricing Plan created successfully",
    });
  } catch (error) {
    console.error("Error creating Pricing Plan:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const read = async (req, res) => {
  try {
    let records = await prisma.pricingPlan.findMany({
      orderBy: {
        createdAt: "desc",
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
    await prisma.pricingPlan
      .findUnique({
        where: {
          id,
        },
      })
      .then((record) => {
        if (!record) {
          return res.status(404).send({
            message: "Pricing Plan not found",
          });
        }
        res.send(record);
      });
  } catch (error) {
    console.error("Error reading Pricing Plan details:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const existingPricingPlan = await prisma.pricingPlan.findUnique({
      where: { id },
    });
    if (!existingPricingPlan) {
      return res.status(404).send({ message: "Pricing Plan not found" });
    }

    const updatedPricingPlan = await prisma.pricingPlan.update({
      where: { id },
      data: {
        name: req.body.name,
        duration: parseInt(req.body.duration),
        price: parseFloat(req.body.price),
        description: req.body.description,
        isRecommended: req.body.is_recommended || false,
        isActive: req.body.is_active || true,
        updatedAt: new Date(),
      },
    });

    res.send({
      message: "Pricing Plan updated successfully",
      PricingPlan: updatedPricingPlan,
    });
  } catch (error) {
    console.error("Error updating Pricing Plan:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const existingPricingPlan = await prisma.pricingPlan.findUnique({
      where: { id },
    });
    if (!existingPricingPlan) {
      return res.status(404).send({ message: "Pricing Plan not found" });
    }

    await prisma.pricingPlan.delete({
      where: { id },
    });

    res.send({
      message: "Pricing Plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Pricing Plan:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const PricingPlanController = {
  create,
  read,
  details,
  update,
  destroy,
};

module.exports = PricingPlanController;
