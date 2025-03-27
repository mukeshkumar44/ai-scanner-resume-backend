const jwt = require("jsonwebtoken");


exports.isAdmin=(req,res,next)=>{
    if(req.user.role!=="admin"){
        return res.status(403).json({message:"bhag jao access nahi h tumhare liye"});

    }
    next();
}
// exports.authverifyToken = (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) {
//         return res.status(401).json({ message: "bhai token to diya hii nhiii  Access denied" });
//     }
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified.user;
//         next();
//     } catch (error) {
//         console.log(error);
//        return res.status(500).json({ message: "invailed token" });
//     }
//  }
exports.authverifyToken = (req, res, next) => {
    let token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "bhai token to diya hii nhiii, Access denied" });
    }
     
   
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); 
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log(verified.role)
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
