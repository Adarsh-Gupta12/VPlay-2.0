var mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

var adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    encry_password: {
      type: String,
      required: true,
    },
    //salt for encrypting plain password entered by Admin
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

//Process the plain password entered by Admin using virtual fields
adminSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

adminSchema.methods = {
  //Auth function to check if password entered by Admin is correct or not
  autheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  //encrypt the password entered by Admin to secure it
  securePassword: function (plainpassword) {
    if (!plainpassword) return '';
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};

module.exports = mongoose.model('User', adminSchema);
