// 4 CRUD OPERATIONS //

exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection)
    return coll.insertOne(document)
}

exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection)
    return coll.find().toArray()
}

exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection)
    return coll.deleteOne(document)
}

exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection)
    // {$set: update} is used to over write existing information //
    return coll.updateOne(document, { $set: update }, null)
}