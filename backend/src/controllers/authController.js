import {
    loginUser,
    getCurrentUser,
} from "../services/authService.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const data = await loginUser(
            username,
            password
        );

        res.json(data);
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

export const me = async (req, res) => {
    try {
        const user = await getCurrentUser(
            req.user.userId
        );

        res.json(user);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};