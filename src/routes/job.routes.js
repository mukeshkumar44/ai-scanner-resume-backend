const express = require('express');
const {postJob,reviewJob,getJobs}=require('../controllers/job.controller');
const{authverifyToken, isAdmin}=require('../middlewares/authmiddleware');
const router = express.Router();
router.post('/post-job',authverifyToken,postJob);
router.put('/review',authverifyToken,isAdmin ,reviewJob);
router.get('/all',getJobs);
module.exports=router;