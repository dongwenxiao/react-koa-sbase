const multer = require('koa-multer')

module.exports = multer

// todo clean code
/*const multer = require('koa-multer')
const upload = multer({ dest: 'uploads/' })





module.exports = async(ctx, next) => {
    app.use(route.post('/profile', upload.single('avatar')))

}*/