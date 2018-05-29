const React = require('react');
import { Link } from 'react-router';
import UserItem from './UserItem';
import { Input, message } from 'antd';
import AdminStore from '../../stores/AdminStore';
import { hashHistory } from 'react-router';

function getUserList (array) {
    if(array === undefined || array === null)
        return null;
    return array.map(function (item, i) {
        return <UserItem key={i} user={item}/>
    });
}

const Admin = function(props) {
    const users = props.users;
    const Search = Input.Search;
    return <div className="admin-page">
        <Link to={{ pathname: '/login' }}>Back To Login</Link>
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
        <span id="admin-form-header1" className="admin-form-header">Avatar</span>
        <span id="admin-form-header2" className="admin-form-header">ID</span>
        <span id="admin-form-header3" className="admin-form-header">Username</span>
        {getUserList(users)}
    </div>;
}

module.exports = Admin;