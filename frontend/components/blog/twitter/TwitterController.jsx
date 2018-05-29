const React = require('react');
const Twitter = require('./Twitter');

const TwitterController = React.createClass({
    getInitialState: function () {
        return {
            item: this.props.item,
            repost: this.props.repost,
            homepage: this.props.homepage
        };
    },

    render: function() {
        return <Twitter
            item={this.state.item}
            repost={this.state.repost}
            homepage={this.state.homepage}
        />;
    }

});

module.exports = TwitterController;