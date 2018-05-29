const React = require('react');
const PhotoSearch = require('./PhotoSearch');
import PhotoStore from '../../stores/PhotoStore';

const PhotoSearchController = React.createClass({
    getInitialState: function () {
        return {
            word: this.props.params.data,
            photos: PhotoStore.searchPhoto(this.props.params.data)
        };
    },

    render: function() {
        return <PhotoSearch
            word={this.state.word}
            photos={this.state.photos}
        />;
    }

});

module.exports = PhotoSearchController;