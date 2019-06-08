const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('view engine', 'pug');

mongoose.connect('mongodb://localhost/notedb');
let db = mongoose.connection;

let Note = require('./models/note');

db.once('open', function(){
    console.log('Connected to Database');
});

db.on('error', function(err){
    console.log(err);
});

app.post('/', (request, response) => {
    Note.find({author: request.body.username}, function(err, notes){
        if(err) {
            console.log(err);
        }
        else {
            console.log(notes);
            response.render('note_list', { 'title': 'Your Notes', 'notes': notes});
        }
    });
});

app.get('/login', (request, response) => {
    response.render('login', { 'title': 'Login' });
});

app.get('/note/add', (request, response) => {
    response.render('add-form', { 'title': 'Add new note' });
});

app.post('/note/add', (request, response) => {
    let note = new Note();
    note.title = request.body.title;
    note.author = request.body.author;
    note.body = request.body.body;
    note.post_date = new Date();

    note.save(function(err){
        if(err) {
            console.log(err);
            return;
        }
        else {
            response.redirect('/');
        }
    });
});

app.get('/note/details/:title', (request, response) => {
    Note.find({title: request.params.title.replace(/%20/g,' ')}, function(err, notes){
        if(err) {
            console.log(err);
        }
        else {
            console.log(notes);
            response.render('note_details', {'notes': notes});
        }
    });
});

app.listen(3000, () => {
 console.log('Server running at http://localhost:3000/');
});