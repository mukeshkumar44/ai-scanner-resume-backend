const express = require('express');
const{applyForJob,getApplications,updateApplicationStatus,filterApplicationBySkills}=require('../controllers/application.controller');
const{authverifyToken, isAdmin}=require('../middlewares/authmiddleware');
const upload=require('../middlewares/upload.middleware');
const router = express.Router();

router.post('/apply',authverifyToken,upload.single('resume'),applyForJob);
router.get('/all',authverifyToken,isAdmin,getApplications);
router.put('/update-status',authverifyToken,isAdmin,updateApplicationStatus);
router.post('/filter-by-skills',authverifyToken,isAdmin,filterApplicationBySkills);
module.exports=router;