var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('micro-first', { pictures: '../images/麦兜.jpg' });
});
/*登陆后页面*/
router.get('/land', function(req, res, next) {
  res.render('micro-entry', { 
  		pictures: '../images/麦兜.jpg',
  		params: req.query 
  
  });
});

module.exports = router;
