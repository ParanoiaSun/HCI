const React = require('react');
const ProfileEdit = require('./ProfileEdit');
import UserStore from '../../stores/UserStore';

const ProfileEditController = React.createClass({
    getInitialState: function () {
        return {
            userInfo: UserStore.getUserInfo(localStorage.getItem('photoWall_user_id')),
            tags: UserStore.getUserGroup(localStorage.getItem('photoWall_user_id'))
        };
    },
    render: function() {
        return <ProfileEdit
            userInfo={this.state.userInfo}
            tags={this.state.tags}
        />;
    }

});

module.exports = ProfileEditController;