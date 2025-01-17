import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/errorHandler.js'
export const test = (req, res) => {
    res.json({
        message: 'API is working',
    })
}
// update user
export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    filePath: req.body.filePath,
                }
            },{new: true}
        );

        const { password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);


    } catch (error) {
        next(error);
    }

};
// Fetch the user profile
export const getUserProfile = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("-password"); // Exclude the password field
  
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }
  
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };