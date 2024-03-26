const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const config = require('../config')
const ids = require('./ID')

const contestSchema = mongoose.Schema({
  cid: {
    type: Number,
    index: {
      unique: true,
    },
    default: -1,
  },
  title: String,
  status: {
    type: Number,
    default: config.status.Available, // 默认新建的比赛显示
  },
  create: {
    type: Number,
    default: Date.now,
  },
  start: Number,
  end: Number,
  creator: String,
  list: [ Number ],
  encrypt: {
    type: Number,
    default: config.encrypt.Public,
  },
  argument: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  ranklist: {
    type: mongoose.Schema.Types.Mixed,
    default () { return {} },
  },
}, {
  collection: 'Contest',
  minimize: false,
})

contestSchema.plugin(mongoosePaginate)

contestSchema.pre('validate', function (next) {
  // 验证字段
  [ 'title', 'start', 'end', 'list', 'encrypt' ].forEach((item) => {
    if (typeof this[item] === 'undefined' || this[item] === '') {
      next(new Error(`Field "${item}" is required to create a contest`))
    }
  })

  if (this.title.length >= 80) {
    next(new Error('The length of the title should not be greater than 80'))
  } else if (new Date(this.start).getTime() > new Date(this.end).getTime()) {
    next(new Error('The race end time can not be earlier than the start time!'))
  } else {
    next()
  }
})

contestSchema.pre('save', function (next) {
  // 保存
  if (this.cid === -1) {
    // 表示新的比赛被创建了，因此赋予一个新的 id
    ids
      .generateId('Contest')
      .then((id) => {
        this.cid = id
      })
      .then(next)
  } else {
    next()
  }
})

module.exports = mongoose.model('Contest', contestSchema)
