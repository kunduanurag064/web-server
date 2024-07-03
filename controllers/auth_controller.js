// controllers/userController.js

const User = require('../modals/user.modals.js');
const Content = require('../modals/content.modals.js');
const bcrypt = require('bcryptjs');
require('dotenv').config()



exports.registerUser = async (req, res) => {
    try {
        const { username, emailaddress, password } = req.body;

        if (!emailaddress) {
            console.log('Email address is required');
            return res.status(400).json({ msg: 'Email address is required' });
        }

        const userExist = await User.findOne({ emailaddress });
        if (userExist) {
            console.log('User already exists with email:', emailaddress);
            return res.status(400).json({ msg: 'User already exists' });
        }
         // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userDetails = await User.create({ username, emailaddress, password:hashedPassword });

        // `newUser` now holds the document that was inserted into the database
        console.log('New user created:');
        res.send(userDetails.emailaddress);
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};


exports.loginUser = async (req,res) => {
    try {
        const { emailaddress, password } = req.body;

        if (!emailaddress) {
            console.log('Email address is required');
            return res.status(400).json({ msg: 'Email address is required' });
        }

        const userExist = await User.findOne({ emailaddress });
        if (!userExist) {
            console.log('Invalid Credentials. no user');
            res.send("invalid");
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            console.log('Invalid Credentials.');
            res.send("invalid");
        }
        else{
           
            const mytoken = userExist.generateAuthToken(process.env.JWT_SECURITY_KEY);
            console.log("logged in");
            res.status(201).json({msg:"successful",token:mytoken,userId:userExist._id.toString(),email:emailaddress});
        }


    } catch (error) {
        console.log("there is an error"+error);
    }
}

exports.createPost = async (req,res) => {
    try {
        const userid = req.body.userid;
        const image = req.body.image;
        const title = req.body.myslug;
        const content = req.body.mycontent;
        if (!userid || !title || !content || !image) {
            console.log('Email address is required');
            return res.status(400).json({ msg: 'Email address is required' });
        }

        await Content.create({ userid, image, title, content });
        console.log('Article added to the network.');
        res.status(201).json({msg:"successful"});
        
    } catch (error) {
        console.log("there is error in contentpost .",error);
    }

}


exports.getContent = async (req,res) => {
    try {
        const posts = await Content.find();
        res.json(posts);
        
    } catch (error) {
        console.log("err",error);
    }
}


exports.getUserPosts = async (req,res)=>{
    try {
        const userid = req.query.userid;
        const posts = await Content.find({userid});
        res.json(posts);
        
    } catch (error) {
        console.log("this error : ",error);
    }
}
