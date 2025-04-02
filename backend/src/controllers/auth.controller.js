import { generateToken } from "../lib/utilis.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
        //generate jwt token
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic,
        });
    }else{
        res.status(400).json({ message: "User not found" });
    }
    } catch (error) {
        console.log("Error in signuo controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = (req, res) => {
    res.send("login route");
  };
  
  export const logout = (req, res) => {
    res.send("logout route");
  };