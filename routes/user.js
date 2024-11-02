const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");



// User Middleware
router.post("/signup",async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username: username,
        password: password
    })

    res.json({
        msg: "user created successfully"
    })

})

router.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })
    if(user){
        const token = jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token
        })   
    }
    else{
        res.status(411).json({
            msg: "Incorrect username and password"
        })
        
    } 


})

router.get("/course", async (req, res) => {

    const response =await Course.find({});

    res.json({
        courses: response
    })

})

router.post("/course/:courseId", userMiddleware, async(req, res) => {
    const courseId = req.params.courseId;
    const username = req.body.username;

    await User.updateOne({
        username: username
    },{
        "$push": {
                purchasedCourses: courseId
            }
    })
    /*.catch((e) => {
    //     console.log(e)

    // }) */

    res.json({
        message: "Purchased completely",
        // courses: courseId
    })
});

router.get("/purchasedcourse", userMiddleware, async (req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    })

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })

    res.json({
        courses: courses
    });
})

module.exports = router;