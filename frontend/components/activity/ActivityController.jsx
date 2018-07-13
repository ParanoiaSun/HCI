const React = require('react');
const Activity = require('./Activity');
import ActivityStore from '../../stores/ActivityStore';

const ActivityController = React.createClass({
    getInitialState: function () {
        return {
            activity: ActivityStore.getActivitiesByPage(this.props.params.page),
            page: ActivityStore.getPage()
        };
    },

    render: function() {
        return <Activity
            activity={this.state.activity}
            page={this.state.page}
            currentPage={this.props.params.page}
        />;
    }
});

module.exports = ActivityController;