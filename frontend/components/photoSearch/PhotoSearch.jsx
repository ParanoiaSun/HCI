const React = require('react');
import { Upload, Icon, Modal, Tag, message } from 'antd';
import UserStore from '../../stores/UserStore';
import { Link } from 'react-router';

const PhotoSearch = function(props) {
    const word = props.word;
    const photos = props.photos;

    function getPhotoList () {
        if(photos !== undefined) {
            const display = [];
            console.log(photos);
            for (let i = 0; i < photos.length; i++) {
                display.push({
                    uid: photos[i].img_id,
                    name: i + 'xxx.jpg',
                    status: 'done',
                    url: photos[i].img_url,
                    tags: photos[i].tag,
                    user_id: photos[i].user_id
                })
            }
            return display;
        }else
            return null;
    }

    class PicturesWall extends React.Component {
        state = {
            previewVisible: false,
            previewImage: '',
            fileList: getPhotoList(),
            userInfo: {},
            tags: ''
        };

        handleCancel = () => this.setState({ previewVisible: false })

        handlePreview = (file) => {
            this.setState({
                previewImage: file.url || file.thumbUrl,
                previewVisible: true,
                userInfo: UserStore.getUserInfo(file.user_id),
                tags: file.tags
            });
        };

        handleChange = ({ fileList }) => (message.warn('You don\'t have this right!'));

        getTags = () => {
            const tags = this.state.tags;
            console.log(tags);
            if(tags === null || tags === undefined || tags.length === 0)
                return null;
            else {
                const split_tags = tags.split(';');
                return this.tagList(split_tags);
            }

        };

        tagList = (array) => {
            const null_info = <span style={{color: '#AAAAAA'}}>Oh!There is nothing here~</span>;
            if(array === null || array === undefined )
                return null_info;
            return array.map(function (item, i) {
                return <Tag key={i}>{item}</Tag>;
            });
        };

        render() {
            const { previewVisible, previewImage, fileList, userInfo } = this.state;
            return (
                <div className="clearfix">
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img className="preview-img" alt="example" style={{ width: '100%' }} src={previewImage} />
                        {this.getTags()}
                        <p className="preview-uploader">{'Upload By '} <Link to={{ pathname: '/profile/' + userInfo.user_id}}>{userInfo.username}</Link></p>
                    </Modal>
                </div>
            );
        }
    }

    return <div className="photo-search-page">
        <div className="search-title">
            <p>{'Search Result: ' + word}</p>
        </div>
        <PicturesWall />
    </div>;
}

module.exports = PhotoSearch;