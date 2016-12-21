const mongo = require('mongodb')
const ObjectID = mongo.ObjectID
const MongoClient = mongo.MongoClient
const config = global.spConfig.MONGODB

const getDB = () => {
    return MongoClient.connect(`mongodb://${config.ip}:${config.port}/${config.db}`)
}


module.exports = {
    // query
    // https://docs.mongodb.com/manual/reference/operator/query/#query-selectors
    find: async (collection, selecter = {}) => {

        if (selecter._query === undefined)
            selecter._query = {}

        if (selecter._query._id)
            selecter._query._id = new ObjectID(selecter._query._id)

        const db = await getDB()
        const col = await db.collection(collection)

        let cursor = col.find(selecter._query)

        selecter._limit !== undefined && cursor.limit(selecter._limit)
        selecter._skip !== undefined && cursor.skip(selecter._skip)
        selecter._filter !== undefined && cursor.skip(selecter._filter) // 子项过滤

        const result = cursor.toArray()
        db.close()

        return result

    },
    count: async () => { 
        // TODO
    },
    insert: async (collection, doc) => {

        const db = await getDB()
        const col = await db.collection(collection)

        const result = await col.insert(doc)

        db.close()
        return result
    },
    update: async (collection, selecter, doc, option = { multi: true, upsert: true }) => {

        if (selecter === undefined) return false
        if (JSON.stringify(selecter) == '{}') return false

        if (selecter._id)
            selecter._id = new ObjectID(selecter._id)

        const db = await getDB()
        const col = await db.collection(collection)

        const result = col.update(selecter, { $set: doc }, option)

        db.close()
        return result
    },
    delete: async (collection, selecter) => {

        if (selecter === undefined) return false

        if (selecter._id)
            selecter._id = new ObjectID(selecter._id)

        const db = await getDB()
        const col = await db.collection(collection)

        const result = col.remove(selecter)

        db.close()
        return result
    }
}
