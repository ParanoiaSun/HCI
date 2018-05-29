const React = require('react');
import { Input, Button, message, Tag, Icon } from 'antd';
import { Link } from 'react-router';
import AdminStore from '../../stores/AdminStore';
import UserStore from '../../stores/UserStore';

const ProfileEdit = function(props) {
    const user = props.userInfo;
    const temp = props.tags;
    let tags = [];

    for(let i = 0; i < temp.length; i ++) {
        tags.push(temp[i].name);
    };

    function saveChange () {
        const username = document.getElementById('edit-username').value;
        const email = document.getElementById('edit-email').value;
        if(username.length > 0 && email.length > 0) {
            AdminStore.updateUserInfo(username, email, user.user_id);
            setTimeout('location.reload();', 800);
        } else
            message.info('Please input complete info.')
    }

    class EditableTagGroup extends React.Component {
        state = {
            tags: tags,
            inputVisible: false,
            inputValue: '',
        };

        handleClose = (removedTag) => {
            const tags = this.state.tags.filter(tag => tag !== removedTag);
            UserStore.deleteGroup(localStorage.getItem('photoWall_user_id'), removedTag);
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
                UserStore.addGroup(localStorage.getItem('photoWall_user_id'), inputValue);
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
                            <Icon type="plus" /> New Group
                        </Tag>
                    )}
                </div>
            );
        }
    }

    return <div className="profile-edit-content">
        <Link to={{ pathname: '/profile/' + localStorage.getItem('photoWall_user_id') }}>Back To Profile</Link> <br/>
        <div className="profile-edit-info-avatar">
            <img src={user.avatar} width="200" alt=""/>
        </div>
        <div className="profile-edit-info-detail">
            <span className="profile-edit-detail-header">user id</span>
            <span> {user.user_id} </span><br/>
            <span className="profile-edit-detail-header">username</span>
            <Input placeholder="username" defaultValue={user.username} style={{ width: 200, height: 30 }} id="edit-username"/><br/>
            <span className="profile-edit-detail-header">email</span>
            <Input placeholder="email" defaultValue={user.email} style={{ width: 200, height: 30 }} id="edit-email"/><br/>
            <Button type="primary" onClick={saveChange}> Save </Button>
        </div>
        <div className="profile-edit-group">
            <p>Group Edit</p>
            <EditableTagGroup/>
        </div>
    </div>;
}

module.exports = ProfileEdit;