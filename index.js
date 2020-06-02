// We import the mongodb obj from MongoDB //
const MongoClient = require('mongodb').MongoClient
const assert = require('assert').strict

// url in which to access the mongo server //
const url = 'mongodb://localhost:27017'
// created the db name in the REPL exorcise //
const dbname = 'nucampsite'

// use the connect() to attach the URL to the MongoDB server and then access the client obj to access the nucampsite database //
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null)

    console.log('Connected correctly to server')

    // access the nucampsite database //
    const db = client.db(dbname)

    // Drop (delete) the campsite collection from the database //
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null)
        console.log('Dropped Collection', result)

        // re-create the campsite collection // 
        const collection = db.collection('campsites')

        // insert a new document into the campsites collection // 
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null)
            console.log('Insert Document: ', result.ops)

            // find() to console log all the documents inside the campsites collection // 
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null)
                console.log('Found Documents:', docs)

                client.close()
            })
        })
    })

})

