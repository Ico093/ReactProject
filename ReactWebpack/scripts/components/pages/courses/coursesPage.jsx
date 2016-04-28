'use strict';

var React = require('react');
var Link = require('react-router').Link;

var CoursesList = require('./coursesList.jsx');

var CoursesPage = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Courses</h1>
                <Link to="/course">Add Course</Link>
                <CoursesList/>
            </div>
        );
    }
});

module.exports = CoursesPage;