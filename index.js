// We import the mongodb obj from MongoDB //
const MongoClient = require('mongodb').MongoClient
const assert = require('assert').strict
const dboper = require('./operations')

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

        // insert a new document into the campsites collection // 
        dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => {
            console.log('Insert Document: ', result.ops)
            
            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs)

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, 
                    { description: "Updated Test Description"}, 'campsites', 
                    result => {
                        console.log('Updated Document Count:', result.result.nModified)

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs)

                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount)
                             
                                    client.close()
                                }
                            )
                        })
                    }
                )
            })
        })
    })
})

