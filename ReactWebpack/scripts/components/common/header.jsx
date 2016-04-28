'use strict';

var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <Link to="" className="navbar-brand">
                        <img id="logoImage" src="images/pluralsight-logo.png"/>
                    </Link>
                    <ul className="nav navbar-nav">
                        <li><Link to="">Home</Link></li>
                        <li><Link to="authors">Authors</Link></li>
                        <li><Link to="courses">Courses</Link></li>
                        <li><Link to="about">About</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;