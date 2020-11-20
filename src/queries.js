const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'forumsdb',
    password: 'admin',
    port: 5432
});

const getForums = (req,res) => {
    
    pool.query("SELECT * FROM forums;", (err,result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}
const getPosts = (req, res) => {
    let forumid=req.params.forumid
    pool.query('SELECT * FROM posts WHERE forumid=$1;', [forumid], (err, result) => {
        if(err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}
const getComments = (req,res) => {
    let postid = req.params.postid
    let parentid = req.params.parentid
    pool.query("SELECT * FROM comments WHERE postid=$1 AND parentid=$2;", [postid,parentid], (err, result) => {
        if(err){
            throw err;
        }
        res.status(200).send(result.rows);
    })

}
const addComment = (req, res) =>  {
    const comment = req.body;
    if(comment.postid && comment.userid && comment.parentid && comment.content){
        pool.query("INSERT INTO comments (postid, userid, parentid, content) VALUES ($1, $2, $3, $4);", [comment.postid, comment.userid, comment.parentid, comment.content], (err, result) => {
            if(err){
                throw err;
            }
            res.send("Comment added.");
        })
    } else{
        res.status(400).send("Comment failed.");
    }

}
const addPost = (req, res) =>  {
    const post = req.body;
    if(post.postid && post.forumid && post.userid && post.content){
        pool.query("INSERT INTO posts (postid, forumid, userid, content) VALUES ($1, $2, $3, $4);", [post.postid, post.forumid, post.userid, post.content], (err, result) => {
            if(err){
                throw err;
            }
            res.status(200).send("Post created.");
        })
    }else{
        res.status(400).send("Post creation failed.");
    }

}
const createForum = (req, res) =>  {
    const forum = req.body;
    if(forum.courseid && forum.coursename){
        pool.query("INSERT INTO forums (courseid, coursename) VALUES ($1, $2);", [forum.courseid, forum.coursename], (err, result) => {
            if(err){
                throw err;
            }
            res.status(200).send("Forum created.");
        })
    }else{
        res.status(400).send("Forum creation failed.");
    }

}

module.exports = {
    getForums,
    getPosts,
    getComments,
    addComment,
    addPost,
    createForum
    };