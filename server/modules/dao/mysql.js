const mysql = require('mysql')
const config = global.spConfig.MYSQL
const pool = mysql.createPool(config)
const _ = require('underscore')


pool.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
	if (err) throw err;

	console.log('MySQL: connect success.')
})

module.exports = {
	find: (table, selecter = {}) => {

		/*
		// 样例
		selecter = {
			select: ['key1', 'key2'],
			where: {
				key3: 'val3'
			},
			orderby: {
				key1: 'desc'
			},
			skip: 10,
			limit: 10
		}*/

		let select = ((select) => {

			if (_.isArray(select)) {
				return select.join(',')
			}
			return '*'
		})(selecter.select)

		let where = ((where) => {

			let _where = ['1=1']

			if (_.isObject(where)) {
				for (let key in where) {
					let val = where[key]
					if (val.indexOf('%') > -1) {
						_where.push(`${key} LIKE ${where[key]}`)
					} else {
						_where.push(`${key}=${where[key]}`)
					}
				}
			}
			return _where.join(' AND ')
		})(selecter.where)

		let orderby = ((orderby) => {

			let _orderby = []

			if (_.isObject(orderby)) {
				for (let key in orderby) {
					let val = orderby[key]
					_orderby.push(`${key} ${val}`)
				}
			}

			if (_orderby.length > 0) {
				return _orderby.join(',')
			}
			return ''

		})(selecter.orderby)

		let skiplimit = ((skip, limit) => {

			let _sl = ''

			if (skip !== undefined) _sl += `SKIP ${skip}`
			if (limit !== undefined) _sl += `, LIMIT ${limit}`

			return _sl
		})(selecter.skip, selecter.limit)

		let sql = `SELECT ${select} FROM ${table} WHERE ${where} ${orderby} ${skiplimit};`

		return new Promise((resolve, reject) => {
			pool.getConnection((err, conn) => {
				conn.query(sql, (err, result) => {
					conn.release()
					if (!err) {
						resolve(result)
					} else {
						reject(err)
					}
				})
			})
		})
	},

	count: (table, selecter) => { },

	insert: (table, records) => {

	},

	update: (table, selecter, records) => {

	},

	delete: (table, selecter) => {

	}
}