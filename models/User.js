const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const config = require('../config')

const userSchema = mongoose.Schema({
  uid: {
    type: String,
    index: {
      unique: true,
    },
  },
  nick: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  create: {
    type: Number,
    default: Date.now,
  },
  privilege: {
    type: Number,
    default: 1,
  },
  timerecord: {
    type: [ Number ],
    default: [ 0, 0, 0, 0, 0 ],
  },
  iprecord: {
    type: [ String ],
    default: [ '', '', '', '', '' ],
  },
  status: {
    type: Number,
    default: config.status.Available,
  },
  solve: {
    type: Number,
    default: 0,
  },
  submit: {
    type: Number,
    default: 0,
  },
  gid: {
    type: [ Number ],
    default: [],
    index: true,
  },
  motto: String,
  mail: String,
  school: String,
}, {
  collection: 'User',
})

userSchema.plugin(mongoosePaginate)

userSchema.pre('validate', function (next) {
  // 验证字段 做了这样限制 之前不符合此规则的用户无法被查询 TODO
  if (this.uid.length < 3) {
    next(new Error('The length of the username must be greater than 3'))
  } else if (this.uid.length >= 50) {
    next(new Error('The length of the username must be less than 50'))
  } else if (this.nick.length < 1) {
    next(new Error('The length of the nick must be greater than 1'))
  } else if (this.nick.length >= 50) {
    next(new Error('The length of the nick must be less than 50'))
  } else {
    next()
  }
})

module.exports = mongoose.model('User', userSchema)
