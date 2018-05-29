const React = require('react');
const Album = require('./Album');
import AlbumStore from '../../stores/AlbumStore';

const AlbumController = React.createClass({
    getInitialState: function () {
        return {
            albums: AlbumStore.getAlbums(this.props.params.id)
        };
    },

    render: function() {
        return <Album
            albums={this.state.albums}
        />;
    }

});

module.exports = AlbumController;