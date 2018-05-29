const React = require('react');
import { Button, Popconfirm } from 'antd';
import AdminStore from '../../stores/AdminStore';
import { Link } from 'react-router';

const Admin = function(props) {
    const user = props.user;

    function confirm () {
        AdminStore.deleteUser(user.user_id);
    }

    return <div className="admin-user-item">
        <div className="admin-user-avatar">
            <img src={user.avatar} width="40" alt=""/>
        </div>
        <div className="admin-user-id">{user.user_id}</div>
        <div className="admin-user-name">{user.username}</div>
        <div className="admin-user-action">
            <Link to={{ pathname: '/admin/' + user.user_id}}>
                <Button type="primary"> Edit </Button>
            </Link>
            <Popconfirm
                title="Are you sure？"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No">
                <Button type="primary"> Delete </Button>
            </Popconfirm>
        </div>
    </div>;
}

module.exports = Admin;