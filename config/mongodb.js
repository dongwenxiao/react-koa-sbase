module.exports = {
    ip: '10.60.82.238',
    port: '27017',
    db: '__tpl_webapp',
    collections: {
        user: {
            username: {
                type: 'string',
                require: true
            },
            password: {
                type: 'string',
                require: true
            },
            role: {
                type: 'string',
                require: false
            }
        },
        role: {
            name: 'string'
        }
    }
}
