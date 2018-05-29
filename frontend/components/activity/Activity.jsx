const React = require('react');
import {Button, Input, DatePicker, message} from 'antd';
import ActivityStore from '../../stores/ActivityStore';

const null_info = <span style={{color: '#AAAAAA'}}>Oh!There is no one here~</span>;

const Activity = function(props) {
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const activity = props.activity;
    const dateFormat = 'YYYY-MM-DD';
    let act_id = '';
    let start_time = ''; let end_time = '';

    function activityList(array) {
        if(array === null || array.length === 0)
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
                {checkSate(item.state ,item.id)}
            </div>;
        });
    }

    function quitActivity (id, event) {
        if(ActivityStore.quitActivity(id)) {
            location.reload();
            message.info('Quit Successfully!');
        }else {
            message.info('Quit Failed!');
        }
    }

    function joinActivity (id, event) {
        if(ActivityStore.joinActivity(id)) {
            location.reload();
            message.info('Join Successfully!');
        }else {
            message.info('Join Failed!');
        }
    }

    function checkHasJoined () {
        if(ActivityStore.checkHasJoined(act_id))
            return <Button onClick={quitActivity.bind(this, act_id)}> Quit Activity </Button>;
        else
            return <Button onClick={joinActivity.bind(this, act_id)} type="primary"> Join Activity </Button>;
    }

    function checkSate(state, id) {
        act_id = id;
        if(state === "ongoing")
            return checkHasJoined();
        else if(state === "finished")
            return <div className="activity-item-join-state">
                This activity has finished!
            </div>;
        return <div className="activity-item-join-state">
            This activity has not started!
        </div>;
    }

    function onChange(date, dateString) {
        console.log(date, dateString);
        start_time = dateString[0];
        end_time = dateString[1];
    }


    function addActivity () {
        const title = document.getElementById('activity-title').value;
        const des = document.getElementById('activity-des').value;
        if(title.length === 0) {
            message.warn('Please input activity title.');
        }else if(des.length === 0) {
            message.warn('Please input activity description.');
        }else if(start_time === '' || end_time === '') {
            message.warn('Please input date.');
        } else {
            ActivityStore.addActivities(title, des, start_time, end_time);
            location.reload();
        }
    }

    return <div className="activity-page">
        <div className="activity-title"> Activity List</div>
        {activityList(activity)}
        <div className="create-activity">
            <div className="activity-title">Launch Your Own Activity</div>
            <div className="activity-title-input">
                <Input placeholder="Activity Title" id="activity-title"/>
            </div>
            <RangePicker onChange={onChange} format={dateFormat} placeholder={['Start Time', 'End Time']}/>
            <div className="activity-launch-content">
                <TextArea id="activity-des"
                    placeholder="Activity Description" autosize={{ minRows: 2, maxRows: 6 }} />
            </div>
            <Button type="primary" className="activity-launch-button" onClick={addActivity}> LAUNCH </Button>
        </div>
    </div>;
}

module.exports = Activity;