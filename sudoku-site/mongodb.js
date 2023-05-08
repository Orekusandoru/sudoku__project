const mongoose = require("mongoose")
mongoose.connect ('mongodb://localhost:27017/mydatabase')

.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})

const 