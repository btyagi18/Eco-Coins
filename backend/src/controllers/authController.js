// const { authenticateUser } = require("../services/authService");
// const { createSuccessResponse } = require("../utils/apiResponse");
// const { registerUser } = require("../services/authService");

// const register = async (req, res) => {
//   try {
//     const user = registerUser(req.body);

//     return res.status(201).json(
//       createSuccessResponse(201, "User registered successfully", {
//         userId: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified,
//       })
//     );
//   } catch (error) {
//     const status = error.statusCode || 500;

//     return res.status(status).json({
//       timestamp: new Date().toISOString(),
//       status,
//       message: error.message || "Registration failed",
//       data: null,
//     });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const user = authenticateUser(req.body);

//     return res.status(200).json(
//       createSuccessResponse(200, "Login successful", {
//         userId: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified,
//       })
//     );
//   } catch (error) {
//     const status = error.statusCode || 500;

//     return res.status(status).json({
//       timestamp: new Date().toISOString(),
//       status,
//       message: error.message || "Login failed",
//       data: null,
//     });
//   }
// };

// module.exports = { register, login };



// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const generateToken = require("../utils/generateToken");

// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashed = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashed,
//   });

//   res.json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     token: generateToken(user._id),
//   });
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// };





const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: String(name).trim(),
    email: normalizedEmail,
    password: hashed,
  });

  res.status(201).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      ecoCoins: user.ecoCoins,
      cleanups: user.cleanups,
      impactScore: user.impactScore,
    },
    token: generateToken(user._id),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: String(email).trim().toLowerCase() });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        ecoCoins: user.ecoCoins,
        cleanups: user.cleanups,
        impactScore: user.impactScore,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
