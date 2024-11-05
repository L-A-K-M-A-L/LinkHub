const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const User = new Schema({
    name: { type: String },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: 'https://cdn-icons-png.flaticon.com/128/924/924874.png' },
    password: { type: String, required: true },
    role: { type: String, enum: ['Creator', 'Brand', 'Agency', 'admin'], default: 'Creator' },
    handle: { type: String, required: true, unique: true },
    links: [{
        url: { type: String, default: 'www.google.com' },
        title: { type: String },
        icon: { type: String },
    }],
    socialMedia : {
        facebook: {type:String},
        twitter : {type:String},
        instagram : {type:String},
        youtube : {type:String},
        linkedin : {type:String},
        github : {type:String}
    }
}, { collection: 'user-data-linkhub' });

const userModel = model('userData', User);

module.exports = userModel;