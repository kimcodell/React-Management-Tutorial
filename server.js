const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id' : 1,
            'image' : 'https://placeimg.com/64/64/1',
            'name' : '김민혁',
            'birthday' : '991224',
            'gender' : '남',
            'jobs' : '대학생'
        },
        {
            'id' : 2,
            'image' : 'https://placeimg.com/64/64/2',
            'name' : '전보송',
            'birthday' : '941225',
            'gender' : '남',
            'jobs' : '프로그래머'
        },
        {
            'id' : 3,
            'image' : 'https://placeimg.com/64/64/3',
            'name' : '신선혜',
            'birthday' : '920214',
            'gender' : '여',
            'jobs' : '요리사'
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
