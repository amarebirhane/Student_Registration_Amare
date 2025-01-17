import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, password, dob } = req.body;

    // Debugging Logs
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !dob) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // Save user to database
    const user = new User({
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      filePath: req.file?.path || "",
    });

    try {
      await user.save();
      console.log("User saved to database.");
    } catch (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({ success: false, message: "Failed to save user to database." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log("JWT Token Generated:", token);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ success: true, message: "Signup successful." });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

//login handler
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Send token and success message
    res.status(200).json({ token, message: "Login successful!" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// logout
export const logout  =async (req, res)=>{
  try {
      res.clearCookie('token', {
            httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })

      return res.json({success:true, message:"logged out"})
      
  } catch (error) {
      return res.json({ success: false, message: error.message });

  }
}
// forget password handler
export const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Email and new password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
