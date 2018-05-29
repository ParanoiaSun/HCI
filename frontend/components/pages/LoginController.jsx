const React = require('react');
const Login = require('./Login');

const LoginController = React.createClass({
    handleSubmit: function(e) {
        console.log('hhh');
    },

    enterAdmin: function () {

    },

    render: function() {
        return <Login
            handleSubmit={this.handleSubmit}
            enterAdmin={this.enterAdmin}
        />;
    }

});

module.exports = LoginController;