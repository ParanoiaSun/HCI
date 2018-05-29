const React = require('react');
import MessageBox from './MessageBox';

const null_info = <span style={{color: '#AAAAAA'}}>Oh!There is nothing here~</span>;

const Message = function(props) {
    const photos = props.photos;

    function messageList(array) {
        if(array === null || array === undefined )
            return null_info;
        if(array.length === 0)
            return null_info;
        return array.map(function (item, i) {
            return <MessageBox key={i} photo={item}/>;
        });
    }


    return <div className="message-page">
        {messageList(photos)}
    </div>;
}

module.exports = Message;