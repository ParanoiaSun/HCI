const React = require('react');
import { Button, message } from 'antd';

const null_info = <span style={{color: '#AAAAAA'}}>Oh!There is nothing here~</span>;

const JoinedActivity = function(props) {
    function quitActivity (id, event) {
        if(ActivityStore.quitActivity(id)) {
            location.reload();
            message.info('Quit Successfully!');
        }else {
            message.info('Quit Failed!');
        }
    }

    function checkSate(state, id) {
        if(state === "finished")
            return <div className="activity-item-join-state">
                This activity has finished!
            </div>;
        return <Button onClick={quitActivity.bind(this, id)}> Quit Activity </Button>;
    }

    function activityList (array) {
        if(array === null || array === undefined || array.length === 0 )
            return null_info;
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
                {checkSate(item.state, item.id)}
            </div>;
        });
    }

    return <div className="joined-activity-page">
        {activityList(props.activities)}
    </div>;
}

module.exports = JoinedActivity;