'use strict';

function name(req, res, next){
  if(!req.query.name){
    next('No name provided');
  }
  next();
}

module.exports = name;