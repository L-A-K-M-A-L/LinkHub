const User = require('../models/user');

const getUserData = async ( req, res ) =>{
    const handle = req.params.handle;
    try{
        
        const user = await User.findOne({ handle });
        console.log("user data", user);
        
        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        const userData = {
            name: user.name,
            handle: user.handle,
            avatar : user.avatar,
            bio: user.bio,
            links : user.links
        }

        const socials  = user.socialMedia;

        return res.json({ message : 'found', userData, socials,status: 'success' });
    }catch(err){
        console.log(err);

        return res.json({ status: 'error', error: err.message })
    }
}

const getUserSocials = async( req, res ) => {
    const handle = req.params.handle;

    try{
        console.log(handle);
        const user = await User.findOne({ handle });
        const socials  = user.socialMedia;

        return res.json({ message: 'found links', socials, status:'success' });
    }catch(err){
        return res.json({ status: 'error', error: err.message });
    }
}
module.exports = { getUserData, getUserSocials }