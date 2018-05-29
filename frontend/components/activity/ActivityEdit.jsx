const React = require('react');
import { Link } from 'react-router';
import moment from 'moment';
import {Button, Input, DatePicker, message} from 'antd';
import ActivityStore from '../../stores/ActivityStore';

const ActivityEdit = function(props) {
    const activity = props.activity;
    console.log(activity);
    let start_time = activity.start_time; let end_time = activity.end_time;
    const dateFormat = 'YYYY-MM-DD';
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    function onChange(date, dateString) {
        start_time = dateString[0];
        end_time = dateString[1];
    }

    function editActivity () {
        const title = document.getElementById('activity-title').value;
        const des = document.getElementById('activity-des').value;
        if(title.length === 0) {
            message.warn('Please input activity title.');
        }else if(des.length === 0) {
            message.warn('Please input activity description.');
        }else if(start_time === '' || end_time === '') {
            message.warn('Please input date.');
        } else {
            ActivityStore.updateActivity(activity.id, title, des, start_time, end_time);
            message.info('Edit Successfully!');
            setTimeout('location.reload();', 800);
        }
    }

    return <div className="activity-edit-page">
        <div className="activity-edit-title">
            <Link to={{ pathname: '/profile/' + localStorage.getItem('photoWall_user_id') }}>Back To Profile</Link> <br/>
        </div>
        <div className="activity-title-input">
            <Input placeholder="Activity Title" defaultValue={activity.title} id="activity-title"/>
        </div>
        <RangePicker onChange={onChange} format={dateFormat}
                     defaultValue={[moment(activity.start_time, dateFormat), moment(activity.end_time, dateFormat)]}/>
        <div className="activity-launch-content">
                <TextArea id="activity-des"
                          placeholder="Activity Description" autosize={{ minRows: 2, maxRows: 6 }}
                          defaultValue={activity.description} />
        </div>
        <Button type="primary" className="activity-launch-button" onClick={editActivity}> Save </Button>
    </div>;
}

module.exports = ActivityEdit;