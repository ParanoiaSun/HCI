const React = require('react');
import TwitterController from '../../blog/twitter/TwitterController';

const null_info = <span style={{color: '#AAAAAA'}}>Oh!There is nothing here~</span>;

const FollowTwitter = function(props) {

    function TwitterList (array) {
        console.log(array);
        if(array === undefined || array === null || array.length === 0)
            return null_info;
        else
            return array.map(function (item, i) {
                return <TwitterController key={i} item={item} homepage="1"/>;
            });
    }

    return <div className="follow-twitter-page">
        {TwitterList(props.twitters)}
    </div>;
}

module.exports = FollowTwitter;