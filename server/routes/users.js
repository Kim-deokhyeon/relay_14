const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    ("rerere",res);
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        company: req.user.company,
        school:req.user.school,
        phone: req.user.phone,
        birth: req.user.birth,
        intro: req.user.intro,
        sex: req.user.sex
    });
});

router.post("/register", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    const user = new User(req.body);
    try {
        await user.save()
        return res.status(200).json({
            success: true
        });
    } catch (err) {
        (err)
    }
});

router.post("/login", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, account not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({
                    loginSuccess: true,
                    userId: user._id,
                    tokenExp: user.tokenExp,
                    token: user.token
                });
            });
        });
    });
});

router.get("/logout", auth, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" })
        return res.status(200).send({
            success: true
        });
    } catch (error) {
        (error)
    }
});


router.get("/getUser", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    User.find()
        .exec((err, user) => {
            if (err) return res.status(400).send(err);

           
            res.status(200).json({ success: true, user })
        })

});

module.exports = router;
