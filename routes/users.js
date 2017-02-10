var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.render('updateUser');
});


// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});


router.get('/queryAll', function(req, res, next) {
    console.log('查询所有user');
    userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
    userDao.queryById(req, res, next);
});

router.get('/queryByName', function(req, res, next) {
    userDao.queryByName(req, res, next);
});

router.get('/queryByNickname', function(req, res, next) {
    userDao.queryByNickname(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
    userDao.delete(req, res, next);
});

router.post('/file/uploading', function(req, res, next){
	//生成multiparty对象，并配置上传目标路径
var form = new multiparty.Form({uploadDir: '../public/files/'});
//上传完成后处理
form.parse(req, function(err, fields, files) {
  var filesTmp = JSON.stringify(files,null,2);

  if(err){
    console.log('parse error: ' + err);
  } else {
    console.log('parse files: ' + filesTmp);
    var inputFile = files.inputFile[0];
    var uploadedPath = inputFile.path;
    var dstPath = '../public/files/' + inputFile.originalFilename;
    //重命名为真实文件名
    fs.rename(uploadedPath, dstPath, function(err) {
      if(err){
        console.log('rename error: ' + err);
      } else {
        console.log('rename ok');
      }
    });
  }

  res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
  res.write('received upload:\n\n');
});
});

router.post('/updateUser', function(req, res, next) {
    userDao.update(req, res, next);
});

module.exports = router;

