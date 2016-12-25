import path from 'path'

// server 打包后public目录会改变到dist下
let appStatic = `${global.spConfig.RUN_PATH}/server/public`
if (!__DEV__) {
    appStatic = `${global.spConfig.RUN_PATH}/dist/public`
}

module.exports = {
	// 项目名
    APP_NAME: 'cm_ux_fed_superproject',
	// 项目域名
    APP_DOMAIN: 'http://localhost',
	// 启动端口
    SERVER_PORT: '3000',
    CLIENT_PORT: '3001',
	// 静态输出文件夹
    STATIC_PATH: [
		// app项目目录下的public
        appStatic,
		// superproject目录下的public
        path.resolve(global.spConfig.RUN_PATH, '../../server/public')
    ],
	// path
    UPLOAD_FILE: {
		// 本地存储位置
        dir: `${global.spConfig.RUN_PATH}/server/public/upload`,
		// 上传后的文件名字模式，md5 或者 原名 或者 时间
		// md5|origin|time
        filenameMode: 'md5',
		// post请求中，file的字段名
        postFilenameKey: 'file'
    },
    SESSION: {
		// 过期时长，单位：毫秒，默认1天
        EXPIRE: 1000 * 60 * 60 * 24
    }
}
