const User = require('../models/user');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { handle, email, password, category } = req.body;
    console.log(req.body);
    try {
        const defaultLink = { url: '', title: '', icon: '' }
        const user = await User.create({ handle, email, password, role: category, links: [defaultLink] });

        const token = jwt.sign({ email: email }, process.env.SECRET_JWT)

        res.json({ message: 'user created', status: 'success', 'token': token, id: user._id });
    } catch (err) {
        res.json({ message: err.message, status: 'error' });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user with the provided email and password
        const user = await User.findOne({ email: email, password: password });

        if (!user) {
            return res.status(404).json({ status: 'not found', error: "Invalid Credentials" });
        }

        // Create a token
        const token = jwt.sign({ email: user.email }, process.env.SECRET_JWT);

        return res.status(200).json({ message: 'User found', status: 'success', token, id: user._id });
    } catch (err) {
        return res.status(500).json({ message: err.message, status: 'error' });
    }
};

module.exports = { registerUser, loginUser };
