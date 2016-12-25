const md5 = require('md5')
const sha1 = require('sha1')

Object.assign(String.prototype, {
    // md5
    md5: function (option) {
        return md5(this, option)
    },
    // sha1
    sha1: function () {
        return sha1(this)
    },
    // 字符串反转
    reverse: function () {
        return this.split('')
            .reverse()
            .join('')
    }
})
