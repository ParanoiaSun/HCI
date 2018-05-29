const React = require('react');
const PhotoEdit = require('./PhotoEdit');
import PhotoStore from '../../stores/PhotoStore';

const PhotoEditController = React.createClass({
    getInitialState: function () {
        return {
            photo: PhotoStore.getPhotoById(this.props.params.id)
        };
    },

    render: function() {
        return <PhotoEdit
            photo={this.state.photo}
        />;
    }

});

module.exports = PhotoEditController;