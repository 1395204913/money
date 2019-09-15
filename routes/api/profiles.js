// 登陆和注册
const express = require('express');
const router = express.Router();
const Profile = require('../../models/profile');
const passport = require('passport');

// 添加数据 Address: api/profile/add
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const infomations = {};
    if (req.body.type) infomations.type = req.body.type;
    if (req.body.describe) infomations.describe = req.body.describe;
    if (req.body.income) infomations.income = req.body.income;
    if (req.body.outcome) infomations.outcome = req.body.outcome;
    if (req.body.cash) infomations.cash = req.body.cash;
    if (req.body.remark) infomations.remark = req.body.remark;
    new Profile(infomations).save().then(result => {
        res.json(result);
    })
})

// 获取全部数据 Address ：/
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find().then(result => {
        res.json(result);
    })
})

// 根据id显示数据 Address: /:id
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ _id: req.params.id }).then(result => {
        if (!result) return res.status(404).json('好像出了点问题')
        res.json(result);
    }).catch(err => res.status(404).json(err))

})
// 根据id修改数据 Address:/edit/:id
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newInfomations = {};
    if (req.body.type) newInfomations.type = req.body.type;
    if (req.body.describe) newInfomations.describe = req.body.describe;
    if (req.body.income) newInfomations.income = req.body.income;
    if (req.body.outcome) newInfomations.outcome = req.body.outcome;
    if (req.body.cash) newInfomations.cash = req.body.cash;
    if (req.body.remark) newInfomations.remark = req.body.remark;
    Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: newInfomations },
        { new: true }
    ).then(result => res.json(result))
})
// 根据id删除数据 Address:/del/:id
router.delete('/del/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id }).then(result => res.json(result))
        .catch(err => {
            res.status(404).json('删除失败')
        })
})
module.exports = router;