const User = require('../models/admin.model.js');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user found in DB',
      });
    }
    req.profile = user;
    next();
  });
};

//get particular User
exports.getUser = (req, res) => {
  //these info not being hidden in DB,just user's profile can't see such sensitive info
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;

  return res.json(req.profile);
};
