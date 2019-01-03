const mongoose = require("mongoose")
let User = require("../model/user.js")

let sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
}

module.exports.adduser = (req, res) => {
  createUser(req, res)
  res.status(200)
}

let createUser = (req, res) => {
  User.
      findOne({name: req.body.username}).exec(function(err, id){
      if(err) sendJSONresponse(res, 400, {"message": err.message.message})
      if(!id){
        User.create({
          name: req.body.username
        })
        sendJSONresponse(res, 200, {"message": `Congratuations, you successfully registered. ${req.body.username} is your username`})
      }
      else {
        sendJSONresponse(res, 400, {"message": "Please pick another name, that username is already taken."})
      }
  });
}