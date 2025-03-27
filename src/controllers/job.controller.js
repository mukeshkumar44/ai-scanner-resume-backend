// const job = require('../models/job.model');
// exports.postJob = async (req, res) => {
//     try {
//         const { title, description, company, location } = req.body;
//         const job = new Job({ title, description, company, location, createdBy: req.user._id });
//         await job.save();
//        return res.status(200).json({ message:'Job posted successfully' });
//     }   
//     catch (error) {
    
//         res.status(500).json({ message: 'bhaiya error aa gya ha Error posting job' });
//     }
//     }

const Job = require('../models/job.model'); 

exports.postJob = async (req, res) => {
    try {
    
        const { title, description, company, location } = req.body;
        
      
        if (!title || !description || !company || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const job = new Job({
            title,
            description,
            company,
            location,
            createdBy: req.user._id 
        });

        await job.save();
        return res.status(201).json({ message: "Job posted successfully" });
    }   
    catch (error) {
        console.error("Error:", error); 
        res.status(500).json({ message: "bhaiya error aa gya ha Error posting job", error });
    }
};

exports.reviewJob=async(req,res)=>{
    try{
        const{jobId,status}=req.body;
        if(!["approved","rejected"]){
            return res.status(400).json({message:"your status is kindly try again after some time"});
        }
        await Job.findByIdAndUpdate(jobId,{status});
        return res.status(200).json({message:`job ${status} successfully`});
    }catch(error){
        return res.status(500).json({message:"error aa gya bhaiya  an error occured while reviewing job"});
    }
}


exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({status:"approved"})
        return res.status(200).json({ jobs });
    } catch (error) {
        console.error( error); 
        res.status(500).json({ message: "bhaiya error aa gya ha Error getting jobs", error });
    }
};