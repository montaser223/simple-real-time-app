const cors = require("cors");
const express = require("express");
const app = express();
const shortRouter = require("./routes/short");
const longRouter = require("./routes/long");

app.use(cors());
app.use(express.json());
app.use("/short", shortRouter);
app.use("/long", longRouter);

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
