const React = require('react');
const JoinedActivity = require('./JoinedActivity');
import ActivityStore from '../../../stores/ActivityStore';

const JoinedActivityController = React.createClass({
    getInitialState: function () {
        return {
            activities: ActivityStore.getJoinedActivities()
        };
    },

    render: function() {
        return <JoinedActivity
            activities={this.state.activities}
        />;
    }

});

module.exports = JoinedActivityController;