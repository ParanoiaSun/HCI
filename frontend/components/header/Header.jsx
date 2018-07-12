var React = require('react');
import { Input, message } from 'antd';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import UserStore from '../../stores/UserStore';
import AdminStore from '../../stores/AdminStore';

var Header = function(props) {
    const Search = Input.Search;
    const userInfo = UserStore.getUserInfo(localStorage.getItem('photoWall_user_id'));

    function clearLogin () {
        localStorage.removeItem('photoWall_user_id');
    }

    function jumpToProfile () {
        location.reload();
    }

    function refresh () {
        location.reload();
    }

    function searchUsers () {
        const input = document.getElementById('user-search-input').value;
        console.log(input);
        if(input.length > 0) {
            let temp = AdminStore.getUserById(input);
            if (temp === null || temp === undefined)
                message.info('Can\'t find this id.');
            else {
                hashHistory.replace({
                    pathname: '/profile/' + temp.user_id
                })
            }
        }else
            message.info('Please Input complete id.')
    }

    return <div className="header">
        <div className="header-logo header-item">
            <img src="img/camera.png" height="35" alt="" />
        </div>
        <div className="header-search header-item">
            <Search
                id="user-search-input"
                placeholder="search user by ID"
                onSearch={searchUsers}
                style={{ width: 300, height: 30}}
            />
        </div>

        <div className="header-right-part">
            <div className="header-navbar right-item">
                <div className="nav-item">
                    <Link to={{ pathname: '/'}} onClick={refresh}>
                        HOME
                    </Link>
                </div>
                <div className="nav-item">
                    <Link to={{ pathname: '/activity/1'}} onClick={refresh}>
                        ACTIVITY
                    </Link>
                </div>
                <div className="nav-item">
                    <Link to={{ pathname: '/blog/' + userInfo.user_id}} onClick={refresh}>
                        BLOG
                    </Link>
                </div>
                <div className="nav-item">
                    <Link to={{ pathname: '/album/' + userInfo.user_id}} onClick={refresh}>
                        ALBUM
                    </Link>
                </div>
            </div>
            <div className="separate-line right-item" />
            <div className="header-user right-item">
                <Link to={{ pathname: '/profile/' + userInfo.user_id}} onClick={jumpToProfile}>
                    {userInfo.username}
                </Link>
                <Link to={{ pathname: '/login'}} onClick={clearLogin}>
                    <span className="log-out">LOG OUT</span>
                </Link>
            </div>
        </div>

    </div>;
};

module.exports = Header;