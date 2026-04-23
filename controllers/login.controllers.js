import User from "../models/users.models.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ Login: false, message: "Username and password required", user: {} });
        }

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ Login: false, message: "User not found", user: {} });
        }

        if (user.password === password) {
            return res.json({ Login: true, message: "Ok", user: user });
        } else {
            return res.status(401).json({ Login: false, message: "Wrong credentials", user: {} });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Login: false, message: "Server error", user: {} });
    }
};