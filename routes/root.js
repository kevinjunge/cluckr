const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('home',{username: res.locals.username});
});
router.get('/clucks',(req,res)=>{
    res.render('home');
});

router.get('/clucks/new',checkIfAuthenticated,(req,res)=>{
    res.render('new_cluck');
});
router.get('/login',(req,res)=>{
    res.render('login');
});

// equivalence of one day!
const ONE_DAY = new Date(Date.now()+1*24*60*60*1000);

router.post('/login',(req,res)=>{
    const { username } = req.body;
    res.cookie('username', username, {expires: ONE_DAY})
    res.redirect('/');
})

router.post('/clucks',(req,res)=>{
    const content = req.body.content;
    const image_url = req.body.image_url;
    knex.insert({
        username: req.cookies.username,
        image_url: image_url,
        content: content
    })
    .into('cluck')
    .then((record)=>{
        console.log(`record: ${record} created!`);
        res.redirect('/');
    }).catch((err) => {
        res.send('<div>sorry something went wrong</div>')
    })
})

router.post('/sign_in', (req,res)=>{
    const username = req.body.username;
    res.cookie("username", username, {maxAge: ONE_DAY});
    res.redirect("/");
});
router.post('/sign_out',(req,res)=>{
    res.clearCookie("username");
    res.redirect("/");
});

module.exports = router;
