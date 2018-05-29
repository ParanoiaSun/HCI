var React = require('react');
var Homepage = require('./Homepage');
import TwitterStore from '../../stores/TwitterStore';
import ActivityStore from '../../stores/ActivityStore';

var LoginFormController = React.createClass({
    getInitialState: function () {
        return {
            allTwitters: TwitterStore.getAllTwitters(),
            hot: TwitterStore.getHot(),
            activities: ActivityStore.getJoinedActivities()
        };
    },
    contextTypes: {
        router: React.PropTypes.object
    },

    render: function() {
        return <Homepage
            allTwitters={this.state.allTwitters}
            hot={this.state.hot}
            activities={this.state.activities}
        />;
    }
});

module.exports = LoginFormController;