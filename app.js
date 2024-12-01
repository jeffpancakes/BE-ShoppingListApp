const express = require("express");
const shoppingListRoutes = require("./shopping-list/routes/shoppingListRoutes");

const app = express();
app.use(express.json());

app.use("/shopping-list", shoppingListRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});