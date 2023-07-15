const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const lodash = require('lodash');

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/blogWebsiteDB');

const blogSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    date: { type: Date, default: Date.now() }
});

const BlogWebsite = mongoose.model("BlogWebsite", blogSchema);




app.get('/', (req, res) => {
    let postHeading = [];
    let postContent = [];
    BlogWebsite.find({}).then((foundItems) => {
        foundItems.forEach((item) => {
            postHeading.push(item.title);
            postContent.push(item.body);
        })
        res.render('home', {
            mainTitle: 'Personal Blog',
            post_headings: postHeading,
            post_contents: postContent
        });
    }).catch((err) => {
        console.log(err);
    });
})

app.get('/add_post', (req, res) => {
    res.render('add_post');
});

app.post('/', (req, res) => {
    var title = req.body.title;
    var content = req.body.postBody;
    if (title !== '' && content !== '') {
        const item = new BlogWebsite({
            title: title,
            body: content
        })
        item.save();
        // postHeading.push(title);
        // postContent.push(content);
    }
    res.redirect('/');
})

app.post('/display', (req, res) => {
    let heading = req.body.text;
    BlogWebsite.findOne({title:heading}).then((foundItem)=>{
        res.render('post_page', {
            mainTitle: foundItem.title,
            heading: foundItem.title,
            content: foundItem.body
        });
    }).catch((err)=>{
        console.log(err);
    })
})

app.get('/Home', (req, res) => {
    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(
    process.env.PORT || PORT,
    () => { console.log(`server is running at port: ${PORT}`) })
