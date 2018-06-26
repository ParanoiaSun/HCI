/**
 * Created by paranoia on 2017/12/12.
 */
import React from 'react';
import { Icon, Button, Input, message } from 'antd';
import { Link } from 'react-router';
import TwitterStore from '../../../stores/TwitterStore';
import UserStore from '../../../stores/UserStore';

const Twitter = function(props) {
    const item = props.item;
    const isOrigin = (item.origin_id === null);
    const origin_id = isOrigin? null : UserStore.getUserInfo(item.origin_id).user_id;
    const origin_name = isOrigin? null : UserStore.getUserInfo(item.origin_id).username;
    const reviews = TwitterStore.getReviews(item.id);
    const isHomepage = props.homepage === '1';
    const user_id = isHomepage? UserStore.getUserInfo(item.user_id).user_id : null;
    const user_name = isHomepage? UserStore.getUserInfo(item.user_id).username : null;
    const user_avatar = isHomepage? UserStore.getUserInfo(item.user_id).avatar : null;

    const { TextArea } = Input;
    let scale = false;
    let isLike = TwitterStore.checkLike(localStorage.getItem('photoWall_user_id'), item.id);
    let likeHtml = isLike? <div className="blog-icon-like blog-icon">
            <Button><Icon id={'blog-like-icon-' + item.id} type="like" style={{ fontSize: 14, color: '#08c' }} onClick={handleLike} /></Button>
            <span className="blog-like-num" id={ item.id + '-blog-like-num'}>{item.like_num}</span></div>:
        <div className="blog-icon-like blog-icon">
            <Button><Icon id={'blog-like-icon-' + item.id} type="like" style={{ fontSize: 14, color: '#999' }} onClick={handleLike} /></Button>
            <span className="blog-like-num" id={ item.id + '-blog-like-num'}>{item.like_num}</span>
        </div>;
    let isUser = (item.user_id === localStorage.getItem('photoWall_user_id'));

    function magnifier () {
        if(!scale)
            document.getElementById('blog-twitter-img' + item.id).setAttribute("width", "600");
        else
            document.getElementById('blog-twitter-img' + item.id).setAttribute("width", "100");
        scale = !scale;
    }

    function deleteReview(id) {
        TwitterStore.deleteReview(id);
    }

    function reviewList (array) {
        if(array === null)
            return null;
        return array.map(function (item, i) {
            return <div key={i} className="blog-twitter-review">
                <div><Link to={{ pathname: '/profile/' + item.user_id}}>
                    {item.user_name}
                </Link></div>
                { item.user_id === localStorage.getItem('photoWall_user_id') ? <div className="review-icon-delete review-icon">
                        <Button onClick={deleteReview.bind(this, item.id)}><Icon type="delete" style={{ fontSize: 14, color: '#08c' }}/></Button>
                    </div> : null }
                <div>{item.content}</div>
                <hr/>
            </div>;
        });
    }

    function deleteTwitter () {
        TwitterStore.deleteTwitter(item.id);
        message.info('delete successfully!');
        setTimeout('location.reload();', 800);
    }

    function repostTwitter() {
        TwitterStore.repostTwitter(localStorage.getItem('photoWall_user_id'), item.id);
    }

    function sendReview (id, ev) {
        const input = document.getElementById('review-' + id).value;
        if(input.length === 0)
            message.warn('Please input your comment!');
        else {
            const username = UserStore.getUserInfo(localStorage.getItem('photoWall_user_id')).username;
            TwitterStore.sendReview(localStorage.getItem('photoWall_user_id'), username, input, id);
        }
    }

    function handleLike () {
        if(isLike) {
            const like = parseInt(document.getElementById(item.id + '-blog-like-num').innerHTML);
            document.getElementById(item.id + '-blog-like-num').innerHTML = (like-1).toString();
            document.getElementById('blog-like-icon-' + item.id).style.color = '#999';
            TwitterStore.cancelLike(localStorage.getItem('photoWall_user_id'), item.id);
        }else{
            const like = parseInt(document.getElementById(item.id + '-blog-like-num').innerHTML);
            document.getElementById(item.id + '-blog-like-num').innerHTML = (like+1).toString();
            document.getElementById('blog-like-icon-' + item.id).style.color = '#08c';
            TwitterStore.likeTittwer(localStorage.getItem('photoWall_user_id'), item.id);
        }
        isLike = !isLike;
    }
    //08c
    return <div className="blog-twitter">
        {
            isHomepage ? <div>
                    <img src={user_avatar}  width="40" alt=""/>
                    <div className="twitter-homepage-username">
                        <Link to={{ pathname: '/profile/' + user_id}}>{user_name}</Link>
                    </div>
                    <hr/>
                </div> : null
        }
        {isOrigin? null : <div>
            <span>Respot from <Link to={{ pathname: '/profile/' + origin_id}}>{origin_name}</Link></span>
            <hr/></div>}
        <div className="blog-twitter-des">
            {item.description}
        </div>
        <div className="blog-twitter-img" onClick={magnifier}>
            <img src={item.img} id={'blog-twitter-img' + item.id} width="100" alt=""/>
        </div>
        <div className="blog-twitter-time">
            Send on {item.send_time}
        </div>
        { likeHtml }
        <div className="blog-icon-repost blog-icon">
            <Button onClick={repostTwitter}><Icon type="rollback" style={{ fontSize: 14, color: '#08c' }}/></Button>
        </div>
        { isUser ? <div className="blog-icon-delete blog-icon">
                <Button onClick={deleteTwitter}><Icon type="delete" style={{ fontSize: 14, color: '#08c' }}/></Button>
            </div> : null }
        <hr/>
        {reviewList(reviews)}
        <TextArea id={'review-' + item.id} placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
        <Button type="primary" className="blog-review-button" onClick={sendReview.bind(this, item.id)}> SEND </Button>
    </div>;

};

module.exports = Twitter;
