import User from "../models/users.models.js"

export const getUsers = async(req,res) => {
    const users = await User.find()
    res.json(users)
}
export const getUser = async (req,res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.json(user)
}
export const postUser = async (req,res) => {
    const {name, username, password} = req.body
    const user = new User({name, username, password})
    await user.save()
    res.json(user)
}
export const putUser = async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    const user = await User.findByIdAndUpdate(id, datosActualizados, { new: true });
    res.json(user);
}

export const delUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.json({ message: "Usuario eliminado correctamente", user: user });
}