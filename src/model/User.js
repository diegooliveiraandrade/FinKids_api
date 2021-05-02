const mongoose = require('../config/database')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  wallet: {
    type: Number,
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  },

  spent: [{
    product: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    value: {
      type: Number,
      required: false
    },
    desire: {
      type: Boolean,
      required: false
    },
    when: {
      type: Date,
      required: false
    },
    created: {
      type: Date,
      default: Date.now
    }
  }]
})

module.exports = mongoose.model('Users', UserSchema)