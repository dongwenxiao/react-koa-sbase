var router = require('koa-router')()
const log4js = require('koa-log4')


router.get('/', async function(ctx, next) {

	const logger = log4js.getLogger('custom')
	logger.info('!!!!!custom!!!!!!!')
    ctx.body = 'Hello Koa';
})

module.exports = router;
