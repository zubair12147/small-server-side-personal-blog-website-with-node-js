const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let postHeading = [];
let postContent = [];

app.get('/', (req,res)=>{
    res.render('home',{mainTitle: "Personal Blog", post_headings: postHeading, post_contents: postContent});
})

app.get('/add_post', (req,res) =>{
    res.render('add_post');
});

app.post('/', (req,res)=>{
    var title = req.body.title;
    var content = req.body.postBody;
    if(title !== "" && content !== ""){
        postHeading.push(title);
        postContent.push(content);
    }
    res.redirect('/');
})

app.post('/display',(req,res) =>{
    let heading = req.body.text;
    res.render('post_page',{mainTitle: heading, heading:heading, content: postContent[postHeading.indexOf(heading)]});
})

app.get('/Home', (req,res) =>{
    res.redirect('/');
});

app.get('/about', (req,res) =>{
    res.render('about');
});

app.get('/contact', (req,res) =>{
    res.render('contact');
});

app.listen(process.env.PORT || PORT,()=>{
    console.log(`server is running at port: ${PORT}`)
} )

