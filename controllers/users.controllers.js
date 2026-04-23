import User from "../models/users.models.js"
export const getUsers = async(req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al obtener usuarios' })
    }
}
export const getUser = async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al obtener usuario' })
    }
}
export const postUser = async (req,res) => {
    try {
        const {name, username, password} = req.body || {}
        if (!name || !username || !password) {
            return res.status(400).json({ error: 'Faltan campos requeridos: name, username, password' })
        }
        const user = new User({name, username, password})
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        console.error(error)
        if (error.code === 11000) {
            return res.status(409).json({ error: 'El nombre de usuario ya existe' })
        }
        res.status(500).json({ error: 'Error al crear usuario' })
    }
}
export const putUser = async (req, res) => {
    try {
        const {name, username, password} = req.body || {}
        const user = await User.findByIdAndUpdate(req.params.id, {name, username, password}, {new: true});
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.json(user);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al actualizar usuario' })
    }
}

export const delUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.json({ message: "Usuario eliminado correctamente", user: user });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al eliminar usuario' })
    }
}