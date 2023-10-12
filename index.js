const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./src/routers/routers");
const PORT = process.env.PORT || 3000;

app.use(express.json({ strict: false }));
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
