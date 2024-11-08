const User = require('../models/user');
const jwt = require('jsonwebtoken');

const loadSocials = async (req, res) => {
    const { tokenMail } = req.body;

    try {
        // Verify token and decode
        const decodedToken = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedToken.email;

        // Find user by email
        const user = await User.findOne({ email });

        // If user is not found, return an error response
        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        // Return user's social media data
        return res.json({
            message: 'User socials found',
            status: 'success',
            social: user.socialMedia  // Send the social media data
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', error: err.message });
    }
};

const loadLinks = async (req, res) => {
    const { tokenMail } = req.body;

    try {
        // Verify token and decode
        const decodedToken = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedToken.email;

        // Find user by email
        const user = await User.findOne({ email });

        // If user is not found, return an error response
        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        // Return user's social links data
        return res.json({
            message: 'User links found',
            status: 'success',
            links: user.links 
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', error: err.message });
    }
};

module.exports = { loadSocials, loadLinks };
