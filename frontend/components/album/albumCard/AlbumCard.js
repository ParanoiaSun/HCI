const React = require('react');
import { Card, Tag, Input, Tooltip, Icon, message, Button, Modal } from 'antd';
import { Link } from 'react-router';
import AlbumStore from '../../../stores/AlbumStore';

const AlbumCard = function(props) {
    const album = props.album;
    const tags = album.tag.split(';');

    class EditButton extends React.Component {
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
            const albumName = document.getElementById('edit-album-name').value;
            if(albumName.length === 0)
                message.info('Please Input Album Name!');
            else
                AlbumStore.editAlbum(albumName, album.album_id);
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
                    <Button type="primary" onClick={this.showModal}>Edit</Button>
                    <Modal
                        title="Edit Album"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        cancelText="Cancel"
                        okText="Save"
                    >
                        <Input placeholder="New Album Name" id="edit-album-name" defaultValue={album.album_name}/>
                    </Modal>
                </div>
            );
        }
    }

    class EditableTagGroup extends React.Component {
        state = {
            tags: tags,
            inputVisible: false,
            inputValue: '',
        };

        handleClose = (removedTag) => {
            const tags = this.state.tags.filter(tag => tag !== removedTag);
            AlbumStore.deleteTag(removedTag, album.album_id);
            console.log(tags);
            this.setState({ tags });
        };

        showInput = () => {
            this.setState({ inputVisible: true }, () => this.input.focus());
        };

        handleInputChange = (e) => {
            this.setState({ inputValue: e.target.value });
        };

        handleInputConfirm = () => {
            const state = this.state;
            const inputValue = state.inputValue;
            let tags = state.tags;
            if(!tags.includes(inputValue)) {
                if (inputValue && tags.indexOf(inputValue) === -1) {
                    tags = [...tags, inputValue];
                }
                AlbumStore.addTag(inputValue, album.album_id);
                console.log(inputValue);
                this.setState({
                    tags,
                    inputVisible: false,
                    inputValue: '',
                });
            } else {
                message.info('don\'t add same tag!');
            }
        };

        saveInputRef = input => this.input = input;

        render() {
            const { tags, inputVisible, inputValue } = this.state;
            return (
                <div>
                    {tags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                            <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                        );
                        return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                    })}
                    {inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag
                            onClick={this.showInput}
                            style={{ background: '#fff', borderStyle: 'dashed' }}
                        >
                            <Icon type="plus" /> New Tag
                        </Tag>
                    )}
                </div>
            );
        }
    }

    function deleteAlbum (id) {
        var r = confirm("Are you confirming to delete this album?");
        if(r == true) {
            AlbumStore.deleteAlbum(id);
        }
    }

    return <Card title={album.album_name} className="album-card"
                 extra={<div className="album-button">
                     <Link to={{ pathname: '/album/id/' + album.album_id}}>
                         <Icon type="eye" style={{ fontSize: 16, color: '#08c',marginTop: 12 }}/>
                     </Link>
                     <Icon onClick={deleteAlbum.bind(this, album.album_id)}
                           type="delete" style={{ fontSize: 16, color: '#08c', marginLeft: 10 }}/>
                 </div>
                 }
                 style={{ width: 270 }}>
        <EditableTagGroup />
        <EditButton />
    </Card>;
}

module.exports = AlbumCard;