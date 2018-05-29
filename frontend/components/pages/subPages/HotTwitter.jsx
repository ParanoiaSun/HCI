const React = require('react');
import TwitterController from '../../blog/twitter/TwitterController';

const null_info = <span style={{color: '#AAAAAA'}}>Oh!There is nothing here~</span>;

function TwitterList (array) {
    if(array === null || array === undefined )
        return null_info;
    if(array.len === 0)
        return ;
    return array.map(function (item, i) {
        return <TwitterController key={i} item={item} homepage="1"/>;
    });
}

const HotTwitter = function(props) {

    return <div className="hot-twitter-page">
        {TwitterList(props.hot)}
    </div>;
}

module.exports = HotTwitter;