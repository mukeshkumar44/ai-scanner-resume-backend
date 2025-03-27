const app= require ('./src/App.js');
const connectDB = require('./src/config/db.js');
 const PORT = process.env.PORT || 4002;
 
 connectDB();
 app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });