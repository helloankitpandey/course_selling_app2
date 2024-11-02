const  mongoose = require('mongoose');

// connecct to MongoDB
mongoose.connect('mongodb+srv://Ankit1:Ankit1234%40@cluster0.ft2it1n.mongodb.net/Course_selling_app2?');

// Define schemas 
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // 
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // 
    title: String,
    description: String,
    imageLnk: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}