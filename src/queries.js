
const fetch = require('node-fetch')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'forumsdb',
    password: 'admin',
    port: 5432
});

const loginCheck = async (req,res) => {
    if(req.cookies){
        if(req.cookies.type==='teacher'){
            const login = { userid: req.cookies.userid,
                            password: req.cookies.password
            }
            const logincreds = await fetch('teacherdb', {
                method: 'POST',
                body: JSON.stringify(login),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            } )
            if(logincreds){
                res.send(true)
            }else{
                res.send(false)
            }
        }else if(req.cookies.type==='student'){
            const login = { userid: req.cookies.userid,
                            password: req.cookies.password
                            }
            const logincreds = await fetch('studentdb', {
                method: 'POST',
                body: JSON.stringify(login),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            if(logincreds){
                res.send(true)
            }else{
                res.send(false)
            }
        }
        else {
            res.cookie('loggedIn','false').cookie('userid','none').cookie('password','none').cookie('type','none').send(false)
        }
    }

}

const performLogin = async (req,res) => {
    console.log(req.params.type)
    if(req.params.type==='teacher'){
        const login = { userid: req.params.userid,
                        password: req.params.password
                        }
        const logincreds = await fetch('teacherdb', {
            method: 'POST',
            body: JSON.stringify(login),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
            } )
        if(logincreds){
            res.cookie('loggedIn','true').cookie('userid',`${req.params.userid}`).cookie('password',`${req.params.password}`).cookie('type','teacher').send("Login success!")
        }else{
            res.cookie('loggedIn','false').cookie('userid','none',).cookie('password','none').cookie('type','none').send("Login failed")
        }  
    }else if(req.params.type==='student'){
                const login = { userid: req.params.userid,
                                password: req.params.password
                        }
                const logincreds = await fetch('studentdb', {
                    method: 'POST',
                    body: JSON.stringify(login),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                    } )
                if(logincreds){
                    res.cookie('loggedIn','true').cookie('userid',`${req.params.userid}`).cookie('password',`${req.params.password}`).cookie('type','student').send("Login success!")
                }else{
                    res.cookie('loggedIn','false').cookie('userid','none',).cookie('password','none').cookie('type','none').send("Login failed")
                }  
    }else {
        res.cookie('loggedIn','false').cookie('userid','none').cookie('password','none').cookie('type','none').send(false)
    }
}
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
        })
        pool.query("UPDATE comments SET children=true WHERE commentid=$1", [comment.parentid], (err,result) => {
            if(err){
                throw err;
            }
        })
        res.send("Comment added."); 
    } else{
        res.status(400).send("Comment failed.");
    }

}
const addPost = (req, res) =>  {
    const post = req.body;
    if(post.forumid && post.userid && post.content){
        pool.query("INSERT INTO posts (forumid, userid, content) VALUES ($1, $2, $3);", [post.forumid, post.userid, post.content], (err, result) => {
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
    createForum,
   loginCheck,
   performLogin
    };