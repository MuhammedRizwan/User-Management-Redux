const User = require('../Model/userModel');
const bcrypt = require('bcrypt')

const securepassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error);
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        const AdminData = await User.findOne({ email })
        if (!AdminData) {
            return res.json({ error: "invalid email", success: false })
        }
        const passwordMatch = await bcrypt.compare(password, AdminData.password)
        if (!passwordMatch) {
            return res.json({ error: "invalid password", success: false })
        }
        if (!AdminData.isAdmin) {
            return res.json({ error: 'not an admin', success: false })
        }

        return res.json({ admin: AdminData })
    } catch (error) {

    }
}

const fetchUserData = async (req, res) => {
    try {
        const usersData = await User.find({ isAdmin: false })
        return res.json({ users: usersData })
    } catch (error) {
        console.log(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, email, phone } = req.body;
        const result = await User.updateOne(
            { _id: userId },
            {
                $set: {
                    username,
                    email,
                    phone,
                    profilePicture: `/uploads/${req.file.filename}`
                }
            }
        )
        const updatedUser = await User.findById(userId);
        return res.json(updatedUser);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the user profile.' });
    }
};
const deleteUser=async(req,res)=>{
    try {
        const userId=req.params.userId
        const deleteUserData=await User.deleteOne({_id:userId})
        return res.json({message:"user Deleted user"})
    } catch (error) {
        
    }
}
const addUser=async(req,res)=>{
    try {
        const {username,email,phone}=req.body
        const userData=new User({
            username,email,phone,profilePicture: `/uploads/${req.file.filename}`
        })
        const saveUserData=await userData.save()
        if(!saveUserData){
            return res.json({message:"something went wrong"}) 
        }
        return res.json({messge:"successfully added user"})
    } catch (error) {
        
    }
}

module.exports = {
    loginAdmin,
    fetchUserData,
    updateUser,
    deleteUser,
    addUser
}