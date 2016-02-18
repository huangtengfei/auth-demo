/*
* 工具函数
* 
* */

'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');

const cert = fs.readFileSync('./server/private.key');	// 加密私钥
const TOKEN_EXPIRATION = 60;	// token 过期时间，默认单位为s，Eg: 60, "2 days", "10h", "7d"

let util = {};

util.genToken = (tokendata) => {
	return jwt.sign(tokendata, cert, {expiresIn: TOKEN_EXPIRATION});	
}

module.exports = util;