const User = require('../models/user');
const jwt = require('jsonwebtoken');

const saveSocials = async (req, res) => {
    const { tokenMail, socials } = req.body;

    // Validate input
    if (!socials || typeof socials !== 'object') {
        return res.status(400).json({ status: 'error', error: 'Invalid socials data' });
    }

    try {
        const decodedToken = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedToken.email;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        // Update user's social media links
        user.socialMedia = socials;

        // Save updated user data
        await user.save();

        return res.json({ message: 'Socials saved successfully', status: 'success' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', error: err.message });
    }
};



const saveProfile = async (req, res) => {
    const { tokenMail, name, bio, avatar } = req.body;

    // Validate input
    if (!name || !bio || !avatar) {
        return res.status(400).json({ status: 'error', error: 'Missing required fields' });
    }

    try {
        const decodedToken = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedToken.email;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        // Update user profile
        user.name = name;
        user.bio = bio;
        user.avatar = avatar;

        // Save updated user data
        await user.save();

        return res.json({ message: 'Profile saved successfully', status: 'success' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', error: err.message });
    }
};

const saveLinks = async (req, res) => {
    const { tokenMail, links } = req.body;

    try {
        const decodedToken = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedToken.email;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        // Update the user's links
        const newLinks = links.map((link) => ({ // changed from 'links' to 'link' to avoid conflict
            url: link.url,    // Assuming the 'link' object contains 'url' and 'title'
            title: link.title,
            icon: ''           // Set default value for icon
        }));

        // Save updated user data
        user.links = newLinks;
        await user.save();

        return res.json({ message: 'Links saved successfully', status: 'success' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', error: err.message });
    }
};



module.exports = { saveSocials, saveProfile, saveLinks };
