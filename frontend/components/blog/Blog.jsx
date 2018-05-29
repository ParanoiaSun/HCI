const React = require('react');
import UserCard from '../userCard/UserCard';
import TwitterController from './twitter/TwitterController';
import {Link} from 'react-router';
import {Icon, Button, Input} from 'antd';

const null_info = <span style={{color: '#AAAAAA'}}>Oh!There is nothing here~</span>;

const Blog = function(props) {
    const userInfo = props.userInfo;
    const twitters = props.twitters;

    function twitterList(array) {
        const { TextArea } = Input;
        if(array === null || array === undefined )
            return null_info;
        return array.map(function (item, i) {
            return <TwitterController key={i} item={item} homepage="0"/>;
        });
    }

    function reviewList(array) {
        if(array === null || array === undefined )
            return null_info;
        return array.map(function (item, i) {
            return <div key={i} className="blog-twitter-review">
                <div><Link to={{ pathname: '/profile/' + item.user_id}}>
                    {item.user_name}
                </Link></div>
                <div>{item.content}</div>
                <hr/>
            </div>;
        });
    }

    console.log(twitters);

    return <div className="blog-page">
        <div className="card-area">
            <UserCard userInfo={userInfo}/>
        </div>
        <div className="blog-twitter-content">
            {twitterList(twitters)}
        </div>
    </div>;
}

module.exports = Blog;