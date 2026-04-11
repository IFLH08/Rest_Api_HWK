import User from "../models/users.models.js";

export const login = async (req, res)=>{
    const {username, password} = req.body;
    const user = await User.findOne({username:username});
    if (user.password === password) {
        res.json({login:true, message:"Ok", user:user})
    } else {
        res.status(404).json({login:false, message:"wrong",user:{}})
    }
}