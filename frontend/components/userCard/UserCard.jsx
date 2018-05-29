const React = require('react');

const UserCard = function(props) {
    const userInfo = props.userInfo;
    return <div className="user-card">
        <div className="card-avatar">
            <img src={userInfo.avatar} width="200" alt=""/>
        </div>
        <div className="card-info">
            <div className="card-info-item">
                <div className="card-title">Follow</div>
                <div>{userInfo.follow_num}</div>
            </div>
            <div className="card-info-item">
                <div className="card-title">Follower</div>
                <div>{userInfo.follower_num}</div>
            </div>
            <div className="card-info-item">
                <div className="card-title">Twitter</div>
                <div>{userInfo.twitter_num}</div>
            </div>
        </div>
    </div>;
}

module.exports = UserCard;