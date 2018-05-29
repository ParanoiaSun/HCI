const React = require('react');
const Admin = require('./Admin');
import AdminStore from '../../stores/AdminStore';

const AdminController = React.createClass({
    getInitialState: function (){
        return {
            users: AdminStore.getUsers()
        };
    },
    render: function() {
        return <Admin
            users={this.state.users}
        />;
    }

});

module.exports = AdminController;