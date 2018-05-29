const React = require('react');
import { Input, Button, message } from 'antd';
const Search = Input.Search;
import AdminStore from '../../stores/AdminStore';

const AdminEdit = function(props) {
    const user = props.userInfo;

    function saveChange () {
        const username = document.getElementById('admin-username').value;
        const email = document.getElementById('admin-email').value;
        if(username.length > 0 && email.length > 0)
            AdminStore.updateUserInfo(username, email, user.user_id);
        else
            message.info('Please input complete info.')
    }

    return <div className="admin-page">
        <p className="admin-page-title">User Administration</p>
        <Search
            placeholder="Search User By ID"
            onSearch={value => {
                if(value.length > 0) {
                    let temp = AdminStore.getUserById(value);
                    if (temp === null || temp === undefined)
                        message.info('Can\'t find this id.');
                    else {
                        console.log(111);
                        hashHistory.replace({
                            pathname: '/admin/' + temp.user_id
                        })
                    }
                }else
                    message.info('Please Input complete id.')
            }}
            style={{ width: 300, height: 30 }}
            className="admin-search"
        />
        <br/>
        <div className="admin-user-info">
            <div className="admin-user-info-avatar">
                <img src={user.avatar} width="200" alt=""/>
            </div>
            <div className="admin-user-info-detail">
                <span className="detail-header">user id</span>
                <span> {user.user_id} </span><br/>
                <span className="detail-header">username</span>
                <Input placeholder="username" defaultValue={user.username} style={{ width: 200, height: 30 }} id="admin-username"/><br/>
                <span className="detail-header">email</span>
                <Input placeholder="username" defaultValue={user.email} style={{ width: 200, height: 30 }} id="admin-email"/><br/>
                <Button type="primary" onClick={saveChange}> Save </Button>
            </div>
        </div>
    </div>;
}

module.exports = AdminEdit;