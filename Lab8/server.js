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
            response.render('note_list', { 'title': 'Your Notes', 'notes': notes});
        }
    });
});

app.get('/notes/:username', (request, response) => {
    Note.find({author: request.params.username.replace(/%20/g,' ')}, function(err, notes){
        if(err) {
            console.log(err);
        }
        else {
            response.render('note_list', { 'title': 'Your Notes', 'notes': notes});
        }
    });
});

app.get('/login', (request, response) => {
    response.render('login', { 'title': 'Login' });
});

app.get('/note/add/:author', (request, response) => {
    response.render('add-form', { 'title': 'Add new note', 'author': request.params.author.replace(/%20/g,' ')});
});

app.post('/note/add/:author', (request, response) => {
    let note = new Note();
    note.title = request.body.title;
    note.author = request.params.author.replace(/%20/g,' ');
    note.body = request.body.body;
    note.post_date = new Date();

    note.save(function(err){
        if(err) {
            console.log(err);
            return;
        }
        else {
            response.redirect('/notes/' + note.author);
        }
    });
});

app.get('/note/details/:title', (request, response) => {
    Note.find({title: request.params.title.replace(/%20/g,' ')}, function(err, notes){
        if(err) {
            console.log(err);
        }
        else {
            response.render('note_details', {'notes': notes});
        }
    });
});

app.get('/note/delete/:id/:author', (request, response) => {
    Note.remove({_id: request.params.id}, function(err, notes){
        if(err) {
            console.log(err);
        }
        else {
            response.redirect('/notes/' + request.params.author.replace(/%20/g,' '));
        }
    });
});

app.listen(3000, () => {
 console.log('Server running at http://localhost:3000/');
});