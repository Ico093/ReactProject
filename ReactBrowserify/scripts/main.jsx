﻿'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var hashHistory = require('react-router').hashHistory;
var routes = require('./routes.jsx');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

ReactDOM.render((
    <Router history={hashHistory}>
        {routes}
    </Router>
), document.getElementById('app'));