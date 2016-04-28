'use strict';

var React = require('react');

var About = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Abouta</h1>
                <div>
                    This app uses following tech:
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = About;