// routes/userRoutes.js

const express = require('express');
const { registerUser,loginUser,createPost ,getContent ,  getUserPosts} = require('../controllers/auth_controller');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/createpost', createPost);
router.get('/posts',getContent);

router.get('/myposts',getUserPosts);

module.exports = router;
