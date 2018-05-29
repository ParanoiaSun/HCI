const React = require('react');
const AlbumContent = require('./AlbumContent');
import PhotoStore from '../../stores/PhotoStore';

const AlbumContentController = React.createClass({
    getInitialState: function () {
        return {
            photos: PhotoStore.getPhotos(this.props.params.id),
            user_id: localStorage.getItem('photoWall_user_id'),
            album_id: this.props.params.id
        };
    },

    render: function() {
        return <AlbumContent
            photos={this.state.photos}
            album_id={this.state.album_id}
            user_id={this.state.user_id}
        />;
    }

});

module.exports = AlbumContentController;