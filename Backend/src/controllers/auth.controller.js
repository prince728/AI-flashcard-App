const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const getMe = async (req, res) => {
    try {
        const userId = req.user;

        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        return res.status(200).json({
            message: "user detail fetched successfully",
            user: {
                fullName: user.fullName,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }


}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "'please provide right credentials to login"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "user does not exist with given credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "incorrect password"
            })
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "user register successfully",
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });


    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}


const userRegister = async (req, res) => {

    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "please provide credential to register"
            })
        }

        const isUserAlreadyExist = await userModel.findOne({ email });

        if (isUserAlreadyExist) {
            return res.status(400).json({
                message: "User already exist with given credentials"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            email,
            password: hashPassword,
            fullName
        });

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "user register successfully",
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }


}


const userLogout = async (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({ message: "User logged out successfully" })
}


const userUpdateProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { fullName, email, password } = req.body;

    
    if (email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        return res.status(400).json({
          message: "Email already exists with another account",
        });
      }
    }

    const updateData = { fullName, email };

    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      updateData.password = hashPassword;
    }

    const user = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({
      message: "user updated successfully",
      user: {
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const userDeleteProfile = async (req, res) => {

    try {
        const userId = req.user;

        const user = await userModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        return res.status(200).json({
            message: "user deleted successfully",
            user: {
                email: user.email,
                fullName: user.fullName,
            }
        })
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }


}

module.exports = {
    userLogin,
    userRegister,
    getMe,
    userLogout,
    userUpdateProfile,
    userDeleteProfile
}