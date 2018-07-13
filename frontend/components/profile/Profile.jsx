const React = require('react');
import { Tabs, Button, Popconfirm, Select } from 'antd';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import ActivityStore from '../../stores/ActivityStore';
import UserStore from '../../stores/UserStore';
const Option = Select.Option;

var null_info = <span style={{color: '#AAAAAA'}}>Oh!There is no one here~</span>;

function followList(array) {
    if(array === null || array === undefined)
        return null_info;
    return array.map(function (item, i) {
        return <div key={i} className="follow-avatar" onClick={jumpToProfile.bind(this, item.user_id)}><img src={item.avatar} width="70" alt=""/></div>
        ;
    });
}

function jumpToProfile (id) {
    hashHistory.replace('/profile/' + id);
    location.reload();
}

const Profile = function(props) {
    const userInfo = props.userInfo;
    const userFollow = props.userFollow;
    const userFollower = props.userFollower;
    const activities = props.activities;
    const TabPane = Tabs.TabPane;
    const groups = props.groups;
    const editable = (userInfo.user_id === localStorage.getItem('photoWall_user_id'));

    function groupList(array) {
        console.log(array);
        if(array === null || array === undefined)
            return ;
        return array.map(function (item, i) {
            return <Option key={i} value={item.name}>{item.name}</Option>
                ;
        });
    }

    function groupName() {
        return UserStore.getFollowGroup(userInfo.user_id);
    }

    function deleteActivity (id, ev) {
        ActivityStore.deleteActivity(id);
        location.reload();
    }

    function checkUser(id, act_id) {
        if(id === (localStorage.getItem('photoWall_user_id')))
            return <div><Link to={{ pathname: '/activity/edit/' + act_id}}><Button type="primary"> Edit </Button></Link>
                <Popconfirm title="Are you sure？"
                    onConfirm={deleteActivity.bind(this, act_id)}
                    okText="Yes"
                    cancelText="No">
                <Button type="danger" ghost> Delete </Button>
            </Popconfirm></div>;
        return null;
    }

    function activityList(array) {
        if(array === null || array.length === 0)
            return null_info;
        console.log(array);
        return array.map(function (item, i) {
            return <div key={i} className="activity-item">
                <div className="activity-item-title">
                    {item.name}
                </div>
                <div className="activity-item-time">
                    Time: {item.start_time} - {item.end_time}
                </div>
                <div className="activity-item-des">
                    {item.description}
                </div>
                <div className="activity-item-part">
                    {item.participant_num} people have joined this activity.
                </div>
                {checkUser(item.user_id, item.id)}
            </div>;
        });
    }

    function callback(key) {
        // console.log(key);
    }

    function follow() {
        UserStore.follow(userInfo.user_id);
    }

    function unFollow() {
        UserStore.unFollow(userInfo.user_id);
    }

    function handleChange(value) {
        UserStore.editFollowGroup(value, userInfo.user_id);
        console.log(`selected ${value}`);
    }

    function checkFollow () {
        if(!UserStore.checkHasFollow(userInfo.user_id) && userInfo.user_id !== localStorage.getItem('photoWall_user_id')) {
            return <Button type="primary" onClick={follow}> Follow </Button>;
        } else if(UserStore.checkHasFollow(userInfo.user_id) && userInfo.user_id !== localStorage.getItem('photoWall_user_id'))
            return <div className="unfollow-buttons">
                <Button onClick={unFollow}> Unfollow </Button>
                    <Select defaultValue={groupName()} style={{ width: 120 }} onChange={handleChange}>
                        {groupList(groups)}
                    </Select>
                </div>;
        return ;
    }

    if(userInfo.deleted === 1)
        return <div className="profile-content">
            <p>this user do not exist!</p>
        </div>;
    else
        return <div className="profile-content">
            <div className="profile-title">
                Personal Profile
            </div>
            <div className="profile-button">
                <Link to={{ pathname: '/blog/' + userInfo.user_id}}>
                    <Button type="primary">Visit Blog</Button>
                </Link>
                {editable? <Link to={{ pathname: '/profile_edit'}}><Button type="primary">Edit Profile</Button></Link> : null}
                {checkFollow()}
            </div>
            <div className="profile-avatar">
                <img src={userInfo.avatar} width="100" alt=""/>
            </div>
            <div className="profile-info">
                <div className="profile-info-item">
                    <span className="profile-tag">USERNAME </span><span className="profile-info-content" >{userInfo.username}</span>
                </div>
                <div className="profile-info-item">
                    <span className="profile-tag">ID </span><span className="profile-info-content" >{userInfo.user_id}</span>
                </div>
                <div className="profile-info-item">
                    <span className="profile-tag">EMAIL </span><span className="profile-info-content" >{userInfo.email}</span>
                </div>
            </div>
            <div className="profile-detail">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Activities" key="1"> {activityList(activities)}</TabPane>
                    <TabPane tab="Follows" key="2">{followList(userFollow)}</TabPane>
                    <TabPane tab="Followers" key="3"> {followList(userFollower)}</TabPane>
                </Tabs>
            </div>
        </div>;
}

module.exports = Profile;