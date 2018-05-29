/**
 * Created by paranoia on 2017/12/9.
 */
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
import $ from 'jquery';
import { message} from 'antd';

var server_url = 'http://localhost:3000';

const TwitterStore = assign({}, EventEmitter.prototype, {
    activities: {},
    hasJoined: true,
    join: false,
    quit: false,
    activity: {},

    getActivities: function () {
        $.ajax({
            async: false,
            type : 'GET',
            // url: './activity.json',
            url: server_url + '/activity/getAll',
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.activities = data.data;
                        else
                            message.error('Error With Database');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.error('404 Not Found!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }
        });
        return this.activities;
    },

    addActivities: function (title, des, start_time, end_time) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/activity/add',
            data: {
                userId: localStorage.getItem('photoWall_user_id'),
                title: title,
                des: des,
                startTime: start_time,
                endTime: end_time
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.registerResult = data;
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.error('404 Not Found!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }
        });
    },

    getJoinedActivities: function () {
        $.ajax({
            async: false,
            type : 'GET',
            // url: './activity.json',
            url: server_url + '/activity/joined/' + localStorage.getItem('photoWall_user_id'),
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.activities = data.data;
                        else if(data.message === 21)
                            this.activities = [];
                        else
                            message.error('Error With Database');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.error('404 Not Found!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }
        });
        return this.activities;
    },

    getLaunchedActivities: function (id) {
        $.ajax({
            async: false,
            type : 'GET',
            // url: './activity.json',
            url: server_url + '/activity/launched/' + id,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.activities = data.data;
                        else if(data.message === 21)
                            this.activities = [];
                        else
                            message.error('Error With Database');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.error('404 Not Found!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }
        });
        return this.activities;
    },

    checkHasJoined: function (act_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/activity/joined',
            data: {
                user_id: localStorage.getItem('photoWall_user_id'),
                act_id: act_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.hasJoined = (data.message === 25);
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.error('404 Not Found!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }
        });
        return this.hasJoined;
    },

    quitActivity: function (act_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/activity/quit',
            data: {
                user_id: localStorage.getItem('photoWall_user_id'),
                act_id: act_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.quit = true;
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.error('404 Not Found!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }
        });
        return this.quit;
    },

    joinActivity: function (act_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/activity/join',
            data: {
                user_id: localStorage.getItem('photoWall_user_id'),
                act_id: act_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.join = true;
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.error('404 Not Found!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }
        });
        return this.join;
    },

    deleteActivity: function (act_id) {
        $.ajax({
            async: false,
            type : 'GET',
            // url: './activity.json',
            url: server_url + '/activity/delete/' + act_id,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        message.info('Delete Successfully!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.error('404 Not Found!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }
        });
    },

    getActivityInfo: function (act_id) {
        $.ajax({
            async: false,
            type : 'GET',
            // url: './activity.json',
            url: server_url + '/activity/get/' + act_id,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.activity = data.data;
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.error('404 Not Found!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }
        });
        return this.activity;
    },

    updateActivity: function (id, title, des, start_time, end_time) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/activity/edit',
            data: {
                act_id: id,
                title: title,
                start_time: start_time,
                end_time: end_time,
                des: des
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.join = true;
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.error('404 Not Found!');
                        break;
                    default:
                        message.error('Unknown Error');
                        break;
                }
            }
        });
    }
});

module.exports = TwitterStore;
