const Users = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userControl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            // Check if the email already exists
            const user = await Users.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "Email already exists" });
            }
            if (password.length < 6) {
                return res.status(400).json({ msg: "Password should be longer than 6 characters" });
            }
            // Generate salt and hash password
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            // Create new user
            const newUser = new Users({
                name, email, password: hashedPassword
            });

            // Save new user to the database
            await newUser.save();

            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh-token',
                sameSite: 'Strict' || 'None', // Ensure the cookie is sent only to your domain
                secure: process.env.NODE_ENV === 'production' // Ensure cookie is sent only over HTTPS in production
            });


            res.json({ accessToken });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ msg: "User does not exist with that email" });

            const isMatch = await bcryptjs.compare(password, user.password);

            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = createRefreshToken({ id: user._id });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh-token',
                // sameSite: 'None', // Ensure the cookie is sent only to your domain
                secure: process.env.NODE_ENV === 'production' // Ensure cookie is sent only over HTTPS in production
            });

            res.json({ accessToken })

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshToken;
    
            if (!rf_token) {
                return res.status(400).json({ msg: "Please register or login" });
            }
    
            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (error, user) => {
                if (error) {
                    return res.status(400).json({ msg: "Please register or login" });
                }
    
                const accessToken = createAccessToken({ id: user.id });
                res.json({ accessToken });
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshToken', {
                path: '/user/refresh-token'
            })
            return res.json({msg: "Logged out"})
        } catch (error) {
            
        }
    },
    deleteAccount: async (req, res) => {
        try {
            const userId = req.user.id;
            await Users.findByIdAndDelete({ _id: userId });
            res.json({ msg: "Account has been deleted" })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getProfile: async (req, res) => {
        try {
          // Retrieve the user ID from the request object, assuming auth middleware sets req.user
          const userId = req.user.id;
          
          // Fetch the user from the database and exclude the password field
          const user = await Users.findById(userId).select('-password');
          
          // Handle case where the user is not found
          if (!user) {
            return res.status(404).json({ msg: "User not found" });
          }
          
          // Respond with the user's profile data
          res.json(user);
        } catch (error) {
          // Handle any unexpected errors
          return res.status(500).json({ msg: error.message });
        }
      },
    updateProfile: async (req, res) => {
        try {
            const userId = req.user.id; // Assuming auth middleware sets req.user
            const { name, email, password } = req.body;
            const updatedData = {};
            if (name) updatedData.name = name;
            // Check if email is being updated and if it is already in use
            if (email) {
                const existingUser = await Users.findOne({ email });
                if (existingUser && existingUser._id.toString() !== userId.toString()) {
                    return res.status(400).json({ msg: "Email is already in use by another account" });
                }
                updatedData.email = email;
            }

            if (password) {
                if (password.length < 6) {
                    return res.status(400).json({ msg: "Password should be longer than 6 characters" });
                }
                const salt = await bcryptjs.genSalt(10);
                updatedData.password = await bcryptjs.hash(password, salt);
            }
            const updatedUser = await Users.findByIdAndUpdate(userId, updatedData, { new: true });
            res.json(updatedUser);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getInfo: async (req, res) =>{
        try {
            const userId = req.user.id;
            const user = await Users.findById(userId).select('-password');
          
          // Handle case where the user is not found
          if (!user) {
            return res.status(404).json({ msg: "User not found" });
          }
          res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '7d' })
}

module.exports = userControl;