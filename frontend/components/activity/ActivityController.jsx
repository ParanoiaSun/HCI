const React = require('react');
const Activity = require('./Activity');
import ActivityStore from '../../stores/ActivityStore';

const ActivityController = React.createClass({
    getInitialState: function () {
        return {
            activity: ActivityStore.getActivities(this.props.params.page)
        };
    },

    render: function() {
        return <Activity
            activity={this.state.activity}
        />;
    }
});

module.exports = ActivityController;