'use strict';

var React = require('react');
var hashHistory = require('react-router').hashHistory;
var AuthorForm = require('./authorForm.jsx');
var AuthorActions = require('../../../actions/authorActions');
var AuthorStore = require('../../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    getInitialState: function () {
        return {
            author: {id: '', firstName: '', lastName: ''},
            errors: {}
        };
    },

    componentWillMount:function(){
        var authorId = this.props.params.id;

        if(authorId){
            this.setState({author:AuthorStore.getAuthorById(authorId)})
        }
    },

    setAuthorState: function (event) {
        var field = event.target.name;
        var value = event.target.value;

        this.state.author[field] = value;

        return this.setState({author: this.state.author});
    },

    authorFormIsValid: function () {
        var formIsValid = true;

        this.state.errors = {};

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name must be at least 3 characters.';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});

        return formIsValid;
    },

    saveAuthor: function (event) {
        event.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }

        if(this.state.author.id){
            AuthorActions.updateAuthor(this.state.author);

        }else{
            AuthorActions.createAuthor(this.state.author);
        }

        toastr.success('Author saved.');
        hashHistory.push('authors');
    },

    render: function () {
        return (
            <AuthorForm author={this.state.author}
                        onChange={this.setAuthorState}
                        onSave={this.saveAuthor}
                        errors={this.state.errors}/>
        );
    }
});

module.exports = ManageAuthorPage;