// const { loadEnv } = require("./src/config/env");
// const { app, port } = require("./src/app");
// const connectdb=require("./src/config/db");

// loadEnv();
// connectdb();

// app.listen(port, () => {
//   console.log(`Backend running on http://localhost:${port}`);
// });


// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/pre-register", require("./routes/preRegisterRoutes"));
// app.use("/api/verify", require("./routes/verificationRoutes"));

// app.get("/", (req, res) => {
//   res.send("Eco-Coins API Running");
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));



const dotenv = require("dotenv");
const { app, port } = require("./src/app");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
