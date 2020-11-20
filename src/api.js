const fs = require("fs")
const bodyParser = require("body-parser")

const express = require('express')
const app = express()
const port = 3001

const db = require('./queries');

app.use(bodyParser.json())

app.get('/forums', db.getForums);

app.get('/posts/:forumid', db.getPosts);

app.get('/comments/:postid/:parentid', db.getComments)

app.post('/createforum/', db.createForum);

app.post('/createpost', db.addPost);

app.post('/addcomment',db.addComment)


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))