const React = require('react');
const ActivityEdit = require('./ActivityEdit');
import ActivityStore from '../../stores/ActivityStore';

const ActivityEditController = React.createClass({
    getInitialState: function () {
        return {
            activity: ActivityStore.getActivityInfo(this.props.params.id)
        };
    },

    render: function() {
        return <ActivityEdit
            activity={this.state.activity}
        />;
    }

});

module.exports = ActivityEditController;