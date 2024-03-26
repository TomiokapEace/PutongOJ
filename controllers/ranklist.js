const only = require('only')
const User = require('../models/User')
const { purify } = require('../utils/helper')

// 返回排名列表
const find = async (ctx) => {
  const opt = ctx.request.query
  const page = Number.parseInt(opt.page) || 1
  const pageSize = Number.parseInt(opt.pageSize) || 30
  const filter = purify(only(opt, 'gid'))
  const list = await User.paginate(filter, {
    sort: { solve: -1, submit: 1 },
    page,
    limit: pageSize,
    select: '-_id -pwd -privilege -timerecord -iprecord -create -__v',
    lean: true,
  })

  ctx.body = {
    list,
  }
}

module.exports = {
  find,
}
