// 上传文件到本地
// 此中间件没有自动挂载，
// 根据文件使用，单独添加
// example：
// router.post('/upload', uploadMiddleware, function(ctx, next) {}

const multer = require('koa-multer')
const md5 = require('md5')
const config = require('../../storage.disk')

const storage = multer.diskStorage({

    // 设置文件存储位置
    destination: function(req, file, cb) {

        const dir = config.dir

        if (!exists(dir)) {
            fs.mkdirSync(dir)
        }

        cb(null, dir)
    },

    // 设置文件名字
    filename: function(req, file, cb) {

        const name = file.originalname
        const ext = path.extname(name)
        const now = (new Date()).format('yyyyMMddhhmmss.S')
        let newName = ''

        if (config.filenameMode === 'md5') {
            newName = `${md5(name + now)}.${ext}`
        } else if (config.filenameMode === 'time') {
            newName = `${now}.${ext}`
        } else if (config.filenameMode === 'origin') {
            newName = name
        } else {
            newName = name
        }

        req.uploadNewFileName = newName
        cb(null, newName)
    }
})

const upload = multer({ storage: storage })
const uploadMiddleware = upload.single(config.postFilenameKey)

module.exports = uploadMiddleware