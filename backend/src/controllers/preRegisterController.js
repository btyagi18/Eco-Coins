// const preRegistrationModel=require("../models/PreRegister");
// const createPreRegister=async (req,res)=>{

//     try {
//         const {first_name, last_name, email, phoneNo, reason} = req.body; 

//         if (!first_name || !last_name || !email || !reason){
//             return res.status(400).json({
//                 status: "Failed",
//                 message: "kuch fields khali hn... dhang s data bhej"
//             })
//         }

//         // Save in the model
//         const newUser = new preRegistrationModel({
//             first_name, last_name, email, phoneNo, reason
//         })

//         await newUser.save();

//         res.status(201).json({
//             status: "Success",
//             message: "You  have successfully register for our Beta programe.We will reach out soon."
//         })

//     } catch (error) {
//         return res.status(500).json({
//             status: "Failed",
//             message: `Some error occured: ${error}`
//         })
//     }
// }

// module.exports = createPreRegister;



// const PreRegister = require("../models/PreRegister");

// exports.joinBeta = async (req, res) => {
//   const { name, email } = req.body;

//   const exists = await PreRegister.findOne({ email });
//   if (exists) {
//     return res.status(400).json({ message: "Already registered" });
//   }

//   const user = await PreRegister.create({ name, email });

//   res.json({ message: "Joined Beta Successfully", user });
// };



const PreRegister = require("../models/PreRegister");

exports.joinBeta = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // 🔴 Validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        message: "First name, last name and email are required",
      });
    }

    // 🔴 Check existing user
    const exists = await PreRegister.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "Already registered with this email",
      });
    }

    // 🔴 Create entry
    const user = await PreRegister.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    // ✅ Success
    res.status(201).json({
      message: "Joined Beta Successfully",
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};