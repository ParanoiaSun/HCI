const React = require('react');
const Blog = require('./Blog');
import UserStore from '../../stores/UserStore';
import TwitterStore from '../../stores/TwitterStore';

const BlogController = React.createClass({
    getInitialState: function () {
        return {
            userInfo: UserStore.getUserInfo(this.props.params.id),
            twitters: TwitterStore.getTwitters(this.props.params.id)
        };
    },

    render: function() {
        return <Blog
            userInfo={this.state.userInfo}
            twitters={this.state.twitters}
        />;
    }

});

module.exports = BlogController;