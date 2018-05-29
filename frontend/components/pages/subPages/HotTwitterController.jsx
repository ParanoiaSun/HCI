const React = require('react');
const HotTwitter = require('./HotTwitter');
import TwitterStore from '../../../stores/TwitterStore';

const HotTwitterController = React.createClass({
    getInitialState: function () {
        return {
            hot: TwitterStore.getHot()
        };
    },

    render: function() {
        return <HotTwitter
            hot={this.state.hot}
        />;
    }

});

module.exports = HotTwitterController;