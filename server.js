const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;



MongoClient.connect('mongodb+srv://dbUser:1qwsde345g**@cluster0.0amcl.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true })
    .then(client =>{
        console.log('Connected to Database')
        const db = client.db('motivational-quotes')
        const quotesCollection = db.collection('quotes')

        app.set('view engine', 'ejs')
        
        app.use(bodyParser.urlencoded({ extended:true }))

        app.listen('3000', () => {
            console.log('Listening on port 3000')
        })

        app.get('/', (req, res) =>{
            db.collection('quotes').find().toArray()
                .then(results =>{
                    console.log(results)
                })
                .catch(err => console.log(err))
                // console.log(cursor)
                // res.sendFile(__dirname + '/index.html')
        })

        app.post('/quotes', (req,res) => {
            quotesCollection.insertOne(req.body)
                .then(result =>{
                    res.redirect('/')
                })
                .catch(err => console.log(err))
        })
    })
    .catch(err => console.log(err))


