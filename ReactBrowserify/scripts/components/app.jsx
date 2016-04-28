/*eslint-disable strict */ // Disabling check because we can't run strict mode because of jQuery

var $ = require('jquery');
var React = require('react');

var Header = require('./common/header.jsx');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header/>
                <div className='container-fluid'>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = App;