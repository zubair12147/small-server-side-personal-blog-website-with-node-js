const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index');
})

app.listen(process.env.PORT || PORT,()=>{
    console.log(`server is running at port: ${PORT}`)
} )

