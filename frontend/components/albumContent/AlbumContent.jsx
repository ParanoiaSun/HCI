const React = require('react');
import { Link } from 'react-router';
import { Upload, Icon, Modal, Button, Input, message, Tag, Tooltip } from 'antd';
import PhotoStore from '../../stores/PhotoStore';
import TwitterStore from '../../stores/TwitterStore';

class EditableTagGroup extends React.Component {
    state = {
        tags: (this.props.tag === undefined || this.props.tag.length === 0)? [] : this.props.tag.split(';'),
        inputVisible: false,
        inputValue: '',
        photoId: this.props.photoId
    };

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        PhotoStore.deleteTag(removedTag, this.state.photoId);
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
            PhotoStore.addTag(inputValue, this.state.photoId);
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

    saveInputRef = input => this.input = input

    render() {
        const { tags, inputVisible, inputValue, photoId } = this.state;
        return (
            <div className="preview-tag">
                {tags.map((tag, index) => {
                    console.log(11);
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag} closable="true" afterClose={() => this.handleClose(tag)} >
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

const AlbumContent = function(props) {
    const photos = props.photos;
    const user_id = props.user_id;
    const { TextArea } = Input;
    const album_id = props.album_id;

    function getPhotoList () {
        if(photos !== undefined) {
            const display = [];
            console.log(photos);
            for (let i = 0; i < photos.length; i++) {
                display.push({
                    uid: photos[i].img_id,
                    name: i + '.jpg',
                    status: 'done',
                    url: photos[i].img_url,
                    tags: photos[i].tag,
                    user_id: photos[i].userId
                })
            }
            return display;
        }else
            return [];
    }

    class PicturesWall extends React.Component {
        state = {
            previewVisible: false,
            previewImage: '',
            fileList: getPhotoList(),
            tags: [],
            photoId: '',
            user_id: ''
        };

        handleCancel = () => this.setState({ previewVisible: false })

        handlePreview = (file) => {
            this.setState({
                previewImage: file.url || file.thumbUrl,
                previewVisible: true,
                tags: file.tags,
                photoId: file.uid,
                user_id: file.user_id
            });
        };

        handleChange = ({ fileList }) => {
            this.setState({ fileList });
        };

        handleRemove = (file) => {
            console.log(file.uid);
            PhotoStore.deletePhoto(file.uid);
        };

        sharePhoto = (img, ev) => {
            let input = document.getElementById('album-photo-share-input').value;
            if(input.length === 0) {
                message.info('Please input your share content');
            }else {
                TwitterStore.sendTwitter(img, input);
            }
        };

        render() {
            const { previewVisible, previewImage, fileList, tags, photoId, user_id } = this.state;
            const uploadButton = (
                <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                </div>
            );
            return (
                <div className="clearfix">
                    <Upload
                        action="//localhost:3000/photo/upload"
                        data={{album_id: album_id, user_id: localStorage.getItem('photoWall_user_id')}}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        onRemove={this.handleRemove}
                    >
                        {uploadButton}
                    </Upload>
                    <Modal className="album-photo-clearfix" visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        <EditableTagGroup tag={tags} photoId={photoId}/>
                        <div className="album-photo-share">
                            <TextArea id="album-photo-share-input"
                                placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
                        </div>
                        <div className="album-photo-share-button">
                            <Button type="primary" onClick={this.sharePhoto.bind(this, previewImage)}>SHARE</Button>
                        </div>
                        {/*{ (user_id === localStorage.getItem('photoWall_user_id'))?*/}
                            {/*<div className="album-photo-edit-button">*/}
                                <Link to={{ pathname: '/photo/edit/' + photoId}}>
                                    <Button type="primary" >EDIT</Button>
                                </Link>
                            {/*</div> : null*/}
                        {/*}*/}
                        <div className="album-photo-download">
                            <a href={previewImage} download>
                                <Button><Icon type="download" style={{ fontSize: 20, color: '#08c' }}/></Button>
                            </a>
                        </div>
                    </Modal>
                </div>
            );
        }
    }

    return <div className="album-content-page">
        <Link to={{ pathname: '/album/' + user_id}}>Back To Album List</Link>
        <br/>
        <div className="album-content-photo">
            <PicturesWall />
        </div>
    </div>;
}

module.exports = AlbumContent;