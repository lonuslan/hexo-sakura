/**
 * Butterfly
 * for aside categories
 */

'use strict'

hexo.extend.helper.register('aside_categories', function (categories, options) {
  if (!options && (!categories || !Object.prototype.hasOwnProperty.call(categories, 'length'))
  ) {
    options = categories
    categories = this.site.categories
  }

  if (!categories || !categories.length) return ''
  options = options || {}
  const { config } = this
  const showCount = Object.prototype.hasOwnProperty.call(options, 'show_count')
    ? options.show_count
    : true
  const depth = options.depth ? parseInt(options.depth, 10) : 0
  const orderby = options.orderby || 'name'
  const order = options.order || 1
  const categoryDir = this.url_for(config.category_dir)
  const limit = options.limit === 0 ? categories.length : options.limit
  const isExpand = options.expand !== 'none'
  const expandClass = isExpand && options.expand === true ? 'card-category-list-icon expand' : 'card-category-list-icon'

  const buttonLabel = this._p('aside.more_button')
  const prepareQuery = (parent) => {
    const query = {}
    if (parent) { query.parent = parent } else { query.parent = { $exists: false } }
    return categories.find(query).sort(orderby, order).filter((cat) => cat.length)
  }

  const hierarchicalList = (t, level, parent, topparent = true) => {
    let result = ''
    var isTopParent = topparent
    if (t > 0) {
      prepareQuery(parent).forEach((cat, i) => {
        if (t > 0) {
          t = t - 1
          let child
          if (!depth || level + 1 < depth) {
            var childList = hierarchicalList(t, level + 1, cat._id, false)
            child = childList[0]
            t = childList[1]
          }

          var parentClass = isExpand && isTopParent && child ? 'parent' : ''

          result += `<li class="card-category-list-item ${parentClass}">`

          result += `<a class="card-category-list-link" href="${this.url_for(cat.path)}">`

          result += `<span class="card-category-list-name">${cat.name}</span>`

          if (showCount) {
            result += `<span class="card-category-list-count">${cat.length}</span>`
          }

          if (isExpand && isTopParent && child) {
            result += `<i class="fas fa-caret-left ${expandClass}"></i>`
          }

          result += '</a>'

          result += '</li>'

          if (child) {
            result += `<ul class="card-category-list child">${child}</ul>`
          }
        }
      })
    }

    return [result, t]
  }

  const list = hierarchicalList(limit, 0)

  var moreButton = function () {
    var moreHtml = ''
    if (categories.length <= limit) return ''
    moreHtml += '<li class="card-category-list-item more is-center">'
    moreHtml += `<a class="card-category-list-link-more" href="${categoryDir}">
                <span>${buttonLabel}</span><i class="fas fa-angle-right"></i></a></li>`

    return moreHtml
  }

  return `<ul class="card-category-list">
            ${list[0]}
            ${moreButton()}           
            </ul>`
})
