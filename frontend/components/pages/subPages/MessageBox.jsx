const React = require('react');
import { Link } from 'react-router';
import UserStore from '../../../stores/UserStore';

const MessageBox = function(props) {
    const photo = props.photo;
    const user = UserStore.getUserInfo(photo.user_id);
    let scale = false;

    function magnifier () {
        if(!scale)
            document.getElementById('message-img-'+photo.id).setAttribute("width", "600");
        else
            document.getElementById('message-img-'+photo.id).setAttribute("width", "100");
        scale = !scale;
    }

    return <div className="message-box">
        <img src={user.avatar} width="40" alt=""/>
        <div className="message-username">
            <Link to={{ pathname: '/profile/' + user.user_id}}>{user.username}</Link>
        </div>
        <div className="message-text">
            <span>upload photograph on</span> <span>{photo.upload_time}</span>
        </div>
        <div className="message-img"><img src={photo.img} alt="" id={'message-img-'+photo.id} width="100" onClick={magnifier}/></div>
    </div>;
}

module.exports = MessageBox;
