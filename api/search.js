const mongoose = require("mongoose")
let User = require("../model/user.js")

const sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
}

module.exports.search = (req, res) => {
  
  //This is find whether there is a username or is an error in search
  //Probably a more elegant way to search but im lazy.
  // This will do for now
  User.findOne({name: req.query.username}).exec(function(err, data){
    if(err) return sendJSONresponse(res, 400, {"message": err})
    if(data === null) return sendJSONresponse(res, 400, {"message": "username not found"})
  })
  //IF limit query is not present sets limit to 10
  
  //Generate the from query or set default to 10
  let limit = (req.query.limit ? parseInt(req.query.limit) : 10)
  
  //generate the ending date from query or set default to current day.
  let end = (req.query.end && checkDate(req.query.end)? new Date(req.query.end): new Date())
  
  //generate the starting date from query or set default as Janaury 1 1970 
  let from = (req.query.from && checkDate(req.query.from)? new Date(req.query.from): new Date(1))
  
  //Used Aggregate to the get the list of subdocuments 
  User.aggregate([
    {$match: {name: req.query.username}},
    {$unwind: "$exercise"},{$limit: limit},
    {$match: {"exercise.date": {$gte: from, $lte: end}}},
    {$group: {_id: "$name", exercise: {$push: {description: "$exercise.description", duration: "$exercise.duration", date: "$exercise.date"}}}}
  ],(err, data) => {
    if(err){ sendJSONresponse(res, 400, err)}
    else {
      sendJSONresponse(res, 200, data)  
    }
  })
}


//Check if date is valid
const checkDate = (dateString) => {
  return (Date.parse(dateString) != NaN)
}
