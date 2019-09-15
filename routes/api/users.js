// 登陆和注册
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/key').secretOrKey;
const passport = require('passport');
// Post address: api/users/test 返回请求Json数据
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({ email }).then(user => {
        if (!user) return res.status(404).json({ email: '用户不存在' });
        //密码匹配
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const ruler = { id: user.id, name: user.name, avatar: user.avatar, identify: user.identify }
                jwt.sign(ruler, keys, { expiresIn: 86400 }, (err, token) => {
                    if (err) throw err;
                    res.json({ sucess: true, token: 'Bearer ' + token })
                })
            } else {
                return res.status(404).json({ password: '密码错误' });
            }
        })
    })

})

// Post address: api/users/register 返回请求Json数据
router.post('/register', (req, res) => {

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ msg: "邮箱已被注册" })
            } else {
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    identify: req.body.identify,
                    password: req.body.password
                })
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash
                        newUser.save().then(user => res.json(user)).catch(err => console.log(err))
                    });
                });
            }
        }
        )
})

// Get address: api/users/current 返回 当前用户信息
router.get('/current', passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identify: req.user.identify
    })
    // res.json({ msg: 'success' })
})
module.exports = router;