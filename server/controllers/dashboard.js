const User = require('../models/user');
const jwt = require('jsonwebtoken');

const dashBoardData = async (req, res) => {
    // Grab token from the request body
    const { tokenMail } = req.body;

    if (!tokenMail) {
        return res.status(400).json({ status: 'error', message: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decodedToken = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedToken.email;

        // Fetch the user data from the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        // Prepare user data to send back
        const userData = {
            name: user.name || 'Unknown User',
            role: user.role || 'User',
            bio: user.bio || 'User Bio',
            avatar: user.avatar || 'https://cdn-icons-png.flaticon.com/128/924/924874.png',
            handle: user.handle || '',
            links: user.links.length,
        };

        return res.status(200).json({ message: 'User loaded', userData, status: 'success' });
    } catch (err) {
        console.error("Error in retrieving dashboard data:", err.message);
        return res.status(500).json({ status: 'error', message: 'Failed to retrieve user data', error: err.message });
    }
};

module.exports = { dashBoardData };
