const mongoose = require("mongoose")
// let User = mongoose.model("User")
let User = require("../model/user.js")

let sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
}

module.exports.addexercise = (req, res) => {
    
    createExercise(req,res)
}

const createExercise = (req, res) => {
  User.findOne({name: req.body.username}, function(err, data){
      if(err) { sendJSONresponse(res, 400, {"message": err})}
      if(data){
        data.exercise.push({description: req.body.description, duration: req.body.duration, date: (req.body.date.toString() == "") ? undefined : req.body.date })
        // data.exercise.set({description: req.body.description, duration: req.body.duration, date: (req.body.date == "") ? undefined : req.body.date })
        data.save(function(err, data){
          if(err){ sendJSONresponse(res, 400, {"message": err.message})}
          else{
            sendJSONresponse(res, 200, [{"message": "You successfully add an exercise"}, data.exercise[data.exercise.length-1]])
          } 
        })
      }else {
        if(!req.body.username) sendJSONresponse(res, 400, {message: "Unknown username, Please check again"})
      }
  })
}


const validDate =(date) =>{
  return false;
}

