const React = require('react');
import AlbumCard from './albumCard/AlbumCard';
import { Modal, Button, Input, message } from 'antd';
import AlbumStore from '../../stores/AlbumStore';

class AddButton extends React.Component {
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        const albumName = document.getElementById('album-name').value;
        if(albumName.length === 0)
            message.info('Please Input Album Name!');
        else
            AlbumStore.addAlbum(albumName);
    };
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        return (
            <div>
                <Button type="dashed" onClick={this.showModal}>Create New Album</Button>
                <Modal
                    title="Create New Album"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder="New Album Name" id="album-name"/>
                </Modal>
            </div>
        );
    }
}

const Album = function(props) {
    const albums = props.albums;
    const confirm = Modal.confirm;

    function albumList (array) {
        var null_info = <span style={{color: '#AAAAAA'}}>Oh!There is no one here~</span>
        if(array === undefined || array === null || array.len === 0)
            return null;
        return array.map(function (item, i) {
            return <AlbumCard key={i} album={item}/>
        });
    }

    return <div className="album-page">
        {albumList(albums)}
        <AddButton />
    </div>;
}

module.exports = Album ;