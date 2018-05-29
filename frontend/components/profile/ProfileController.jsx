const React = require('react');
const Profile = require('./Profile');
import UserStore from '../../stores/UserStore';
import ActivityStore from '../../stores/ActivityStore';

const ProfileController = React.createClass({
    getInitialState: function () {
        return {
            userInfo: UserStore.getUserInfo(this.props.params.id),
            userFollow: UserStore.getUserFollow(this.props.params.id),
            userFollower: UserStore.getUserFollower(this.props.params.id),
            activities: ActivityStore.getLaunchedActivities(this.props.params.id),
            activeNum: (this.props.activeNum)? 1 : this.props.activeNum,
            groups: UserStore.getUserGroup(localStorage.getItem('photoWall_user_id'))
        };
    },

    render: function() {
        return <Profile
            userInfo={this.state.userInfo}
            userFollow={this.state.userFollow}
            userFollower={this.state.userFollower}
            activities={this.state.activities}
            activeNum={this.state.activeNum}
            groups={this.state.groups}
        />;
    }

});

module.exports = ProfileController;