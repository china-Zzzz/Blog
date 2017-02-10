// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(name, password, sex, nickname)VALUES(?,?,?,?)',
    update:'update user set name=?, age=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryByName: 'select * from user where name=?',
    queryByNickname: 'select * from user where nickname=?',
    queryAll: 'select * from user'
};

module.exports = user;