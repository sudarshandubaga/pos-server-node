const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = 8888;

app.use(fileUpload());

app.use("/category", require("./src/router/categoryRoutes"));
app.use("/pricing-plan", require("./src/router/pricingPlanRoutes"));

app.get("/", (req, res) => {
  res.send({
    message: "Weclome to XPERT CODERS",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
