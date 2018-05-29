const React = require('react');
const FollowTwitter = require('./FollowTwitter');
import TwitterStore from '../../../stores/TwitterStore';

const FollowTwitterController = React.createClass({
    getInitialState: function () {
        return {
            twitters: TwitterStore.getTwittersByGroup(this.props.params.id, localStorage.getItem('photoWall_user_id'))
        };
    },

    render: function() {
        return <FollowTwitter
            twitters={this.state.twitters}
        />;
    }

});

module.exports = FollowTwitterController;