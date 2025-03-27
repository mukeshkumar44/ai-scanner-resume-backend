// //utils/resumeParser.js


// const pdf = require('pdf-parse');

// const axios = require('axios');

// const extractSkillsFormResume = (resumeUrl)=>{
//     return new Promise((resolve, reject) => {
//         axios.get(resumeUrl,{responseType: 'arraybuffer'})
//         .then(response => {
//             pdf(response.data).then((parsedData)=> {
//                 const text = parsedData.text.toLowerCase();
//                 const skillsList = [
//                     "javascript","react", "nodejs", "express", "python", "java", "sql", "html", "css","git","communication", "mern" , "c","c++" , "mongodb", "php"
//                 ]
//                 const extractedSkills =skillsList.filter(skill=>text.includes(skill))
//                 resolve(extractedSkills);
//             }
//             ).catch(reject)
            
//         })
//         .catch(reject)
//     });
// }
// module.exports = extractSkillsFormResume;
// utils/resumeParser.js
const pdf = require('pdf-parse');
const axios = require('axios');

const extractSkillsFromResume = (resumeUrl) => {
    return new Promise((resolve, reject) => {
        console.log("📥 Resume URL:", resumeUrl);

        // Step 1: Axios GET Request
        axios.get(resumeUrl, { responseType: 'arraybuffer' })
            .then(response => {
                console.log("✅ Axios Response Status:", response.status);
                console.log("📦 Axios Response Headers:", response.headers);

                if (!response.data) {
                    console.log("⚠️ No data received from URL.");
                    return reject("No data received from URL.");
                }

                // Step 2: Parse PDF using pdf-parse
                pdf(response.data)
                    .then((parsedData) => {
                        console.log("🗃️ Parsed PDF Metadata:", parsedData.info);
                        console.log("📝 Full Extracted Text:\n", parsedData.text);

                        const text = parsedData.text ? parsedData.text.toLowerCase() : "";

                        // Step 3: Skills List for Extraction
                        const skillsList = [
                            "javascript", "react", "nodejs", "express", "python",
                            "java", "sql", "html", "css", "git", "communication",
                            "mern", "c", "c++", "mongodb", "php"
                        ];

                        // Step 4: Skill Extraction
                        const extractedSkills = skillsList.filter(skill => text.includes(skill));

                        console.log("🛑 Extracted Skills:", extractedSkills);

                        if (extractedSkills.length === 0) {
                            console.log("⚠️ No relevant skills found.");
                            return reject("No skills found in the resume.");
                        }

                        // Step 5: Resolve with Extracted Skills
                        resolve(extractedSkills);
                    })
                    .catch(err => {
                        console.log("🚨 PDF Parse Error:", err.message);
                        reject("Error parsing PDF.");
                    });
            })
            .catch(err => {
                console.log("🚨 Axios Fetch Error:", err.message);
                reject("Error fetching PDF from URL.");
            });
    });
};

module.exports = extractSkillsFromResume;
