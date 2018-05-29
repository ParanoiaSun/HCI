const React = require('react');
const Message = require('./Message');
import PhotoStore from '../../../stores/PhotoStore';

const MessageController = React.createClass({
    getInitialState: function () {
        return {
            photos: PhotoStore.getMessagesByGroup(this.props.params.id, localStorage.getItem('photoWall_user_id'))
        };
    },

    render: function() {
        return <Message
            photos={this.state.photos}
        />;
    }

});

module.exports = MessageController;