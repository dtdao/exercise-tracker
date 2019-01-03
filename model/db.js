const mongoose = require("mongoose")
const mongooseDB = process.env.MONGO_URI

mongoose.connect(mongooseDB)

mongoose.connection.on("connected", ()=>{
  console.log("Mongoose has connect to database")
})

mongoose.connection.on("error", (err) =>{ 
  console.log("There was an error connecting to the database", err)
})

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Disconnected")
})


require("./user.js")