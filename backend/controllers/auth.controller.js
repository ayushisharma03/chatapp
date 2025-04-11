import bcryptjs from "bcryptjs"; // For password hashing
import User from "../models/user.model.js"; // User schema/model
import generateTokenAndSetCookie from "../utils/generateToken.js"; // JWT generator and cookie setter

// ========================
// ✅ Signup Controller
// ========================
export const signup = async (req, res) => {
  try {
    // Destructure user input from request body
    const { fullname, username, password, confirmPassword, gender } = req.body;

    // Ensure all required fields are provided
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if both password fields match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password using bcryptjs
    const salt = await bcryptjs.genSalt(10); // Generate a random salt
    const hashedPassword = await bcryptjs.hash(password, salt); // Hash the password

    // Generate a profile picture URL based on gender and username
    const profilePic = `https://avatar.iran.liara.run/public/${gender}?username=${username}`;

    // Create a new user document
    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token and send it as an HTTP-only cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Send success response with user info
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });

  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" }); // General error fallback
  }
};

// ========================
// ✅ Login Controller
// ========================
export const login = async (req, res) => {
  try {
    // Destructure username and password from request body
    const { username, password } = req.body;

    // Ensure both fields are provided
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Look for the user in the database
    const user = await User.findOne({ username });

    // Compare input password with stored hashed password
    const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");

    // Return error if user is not found or password is incorrect
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // If login is successful, generate JWT token and set it in a cookie
    generateTokenAndSetCookie(user._id, res);

    // Send success response with user data (excluding password)
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });

  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ========================
// ✅ Logout Controller
// ========================
export const logout = async (req, res) => {
  try {
    // Clear the JWT cookie by setting it to expire immediately
    res.cookie("jwt", "", {
      httpOnly: true, // Prevents client-side JS access
      expires: new Date(0), // Forces immediate expiration
    });

    // Send logout success response
    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
