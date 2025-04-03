const extractSkillsFormResume = require('../utils/resumeParser');
const Application = require('../models/application.model');
//apply for a job
exports.applyForJob = async (req, res) => {
    try{
        const {jobId} = req.body;
        if(!req.file){
            return res.status(400).json({message:"please upload a resume"});
        }
        console.log("📥 Resume Path:", req.file.path);
        const skills = await extractSkillsFormResume(req.file.path);
        const application = new Application({
            jobId,
            userId:req.user.id,
            resumeUrl:req.file.path,
            skills:skills
        })
        await application.save();
        return res.status(200).json({message:"applied for job successfully"});
    }catch(error){
        console.error("Error:", error);
        return res.status(500).json({message:"error aa gya bhaiya  an error occured while applying for job"});
    }
}
//get all applications

exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate("jobId userId", "title name email");
        return res.status(200).json({ applications });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "bhaiya error aa gya ha Error fetching applications", error });
    }
}

//update application status
// exports.updateApplicationStatus = async (req, res) => {
//     try {
//         const { applicationId, status } = req.body;
//         if (!["reviewed", "rejected"].includes(status))  {
//             return res.status(400).json({ message: "Invalid status  changed as it is aleadredy reviewed rejected" });
//         }
//         await Application.findByIdAndUpdate(applicationId, { status });
//         return res.status(200).json({ message: `Application ${status} successfully` });
//     }
//     catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({ message: "bhaiya error aa gya ha Error updating application status", error });
//     }
// }
exports.updateApplicationStatus = async (req, res) => {
    try {
        console.log("Request Body:", req.body);  // Yeh check karne ke liye ki body mein kya aa raha hai
        const { applicationId, status } = req.body;

        if (!applicationId) {
            return res.status(400).json({ message: "Application ID is required" });
        }

        if (!["reviewed", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: "Application not found" });
        }

        return res.status(200).json({
            message: `Application ${status} successfully`,
            updatedApplication
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error updating application status", error });
    }
};



// exports.filterApplicationBySkills = async (req,res)=>{
//     try{
//         const {jobId,requiredSkills} = req.body;
//         const applications = await Application.find({jobId}).populate("userId","name email");
//         const filteredApplications = applications.filter(application=>{
//             const matchedSkills = application.skills.filter(skill=>requiredSkills.includes(skill));
//             return matchedSkills.length>0;
//         })
//         return res.status(200).json({applications:filteredApplications});
//     }catch(error){
//         console.error(error);
//         return res.status(500).json({message:"bhaiya error aa gya ha Error filtering applications by skills",error});
//     }
//     }

exports.filterApplicationBySkills = async (req, res) => {
    try {
        const { jobId, requiredSkills } = req.body;
        
        if (!jobId || !requiredSkills) {
            return res.status(400).json({ message: "jobId and requiredSkills are required" });
        }

        // Filter directly in MongoDB
        const applications = await Application.find({
            jobId,
            skills: { $in: requiredSkills } 
        }).populate("userId", "name email");

        return res.status(200).json({ applications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error filtering applications by skills", error });
    }
};
exports.getMyApplications = async (req, res) => {
    try {
        // Ensure the user object exists in the request
        if (!req.user || !req.user.id) {
            console.error("User ID not found in request:", req.user);
            return res.status(401).json({ message: "User authentication failed or user ID missing" });
        }
        
        const userId = req.user.id;
        console.log("Fetching applications for user:", userId);
        
        // Improved query to handle different formats of userId (string or ObjectId)
        const applications = await Application.find({ 
            $or: [
                { userId: userId }, 
                { 'userId._id': userId }
            ] 
        }).populate("jobId", "title company location");
        
        console.log(`Found ${applications.length} applications for user ${userId}`);
        
        res.status(200).json(applications);
    } catch (err) {
        console.error("Error in getMyApplications:", err);
        res.status(500).json({ message: "An error occurred while getting your applications" });
    }
};
