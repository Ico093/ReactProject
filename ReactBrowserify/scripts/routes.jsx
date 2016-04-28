'use strict';

var React = require('react');

var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var routes = (
    <Route path='/' component={require('./components/app.jsx')}>
        <IndexRoute component={require('./components/pages/homePage.jsx')}/>

        <Route path='about' component={require('./components/pages/aboutPage.jsx')}/>

        <Route path='authors' component={require('./components/pages/authors/authorsPage.jsx')}/>
        <Route path="author" component={require('./components/pages/authors/manageAuthorPage.jsx')}/>
        <Route path="author/:id" component={require('./components/pages/authors/manageAuthorPage.jsx')}/>

        <Route path="courses" component={require('./components/pages/courses/coursesPage.jsx')}/>
        <Route path="course" component={require('./components/pages/courses/manageCoursesPage.jsx')}/>

        <Route path="*" component={require('./components/pages/errors/page404.jsx')}/>
    </Route>
);

module.exports = routes;