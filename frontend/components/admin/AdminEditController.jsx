const React = require('react');
const AdminEdit = require('./AdminEdit');
import AdminStore from '../../stores/AdminStore';

const AdminEditController = React.createClass({
    getInitialState: function () {
        return {
            userInfo: AdminStore.getUserById(this.props.params.id)
        };
    },

    render: function() {
        return <AdminEdit
            userInfo={this.state.userInfo}
        />;
    }

});

module.exports = AdminEditController;