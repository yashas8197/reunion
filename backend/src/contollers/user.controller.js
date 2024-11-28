import User from "../models/user.model.js";

async function generateAccessAndRefreshToken(id) {
  const user = await User.findById(id);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
}

export const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if ([name, email, password].some((field) => field.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create the user in the database
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // Fetch user details to send to the frontend
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while signing up the user" });
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    // Respond with user data and tokens
    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User signed up successfully",
        createdUser,
        accessToken,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  // get the credential from req.body
  // check if the credentials are present in the body
  // get the user from the db using email
  // check if the password is valid
  // generate access and refresh token
  // get the data from the db
  // create option to make it secure
  // send access and refresh token in cookie and json

  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(400)
        .json({ message: "Password and email are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User does not exist, Please sign up and try again" });
    }

    const isVaildPassword = await user.isPasswordCorrect(password);

    if (!isVaildPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User logged in successfully",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User loggout outs" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
