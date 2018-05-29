/**
 * Created by paranoia on 2017/12/8.
 */
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
import $ from 'jquery';
import { message} from 'antd';

const server_url = 'http://localhost:3000';

const UserStore = assign({}, EventEmitter.prototype, {
    user: {},
    userId: '',
    userFollow: [],
    userFollower: [],
    registerResult: {},
    loginResult: '',
    hasFollow: false,
    groups: [],
    group: '',

    getUserInfo: function (id) {
        this.userId = id;
        $.ajax({
            async: false,
            type : 'POST',
            // url: './profile.json'
            url: server_url + '/user/profile',
            data: {
                userId: this.userId
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.user = data.profile;
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
        return this.user;
    },

    getUserFollow: function (id) {
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/user/follow/' + id,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.userFollow = data.data;
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
        return this.userFollow;
    },

    getUserFollower: function (id) {
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/user/follower/' + id,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.userFollower = data.data;
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
        return this.userFollower;
    },

    checkHasFollow: function (user_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/user/check_follow',
            data: {
                follower_id: localStorage.getItem('photoWall_user_id'),
                follow_id: user_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.hasFollow = (data.message === 25);
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
        return this.hasFollow;
    },

    login: function (values) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/user/login',
            data: {userId: values.userName, password: values.password},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        switch (data.message) {
                            case 25:
                                this.loginResult = data; break;
                            case 21:
                                message.info('mistakes with id or password');
                        }
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
        return this.loginResult;
    },

    register: function (values) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/user/register',
            data: {username: values.userName, password: values.password},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.registerResult = data;
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
        return this.registerResult;
    },

    follow: function (user_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/user/follow',
            data: {
                follower_id: localStorage.getItem('photoWall_user_id'),
                follow_id: user_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            message.info('Follow successfully!');
                            setTimeout('location.reload();', 800);
                        }
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

    unFollow: function (user_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/user/unFollow',
            data: {
                follower_id: localStorage.getItem('photoWall_user_id'),
                follow_id: user_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            message.info('UnFollow successfully!');
                            setTimeout('location.reload();', 800);
                        }
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

    getUserGroup: function (user_id) {
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/user/group/' + user_id,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.groups = data.data;
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
        return this.groups;
    },

    addGroup: function (user_id, group) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/user/groupAdd',
            data: {
                user_id: user_id,
                group_name: group
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25){
                            message.info('Add Successfully!');
                        }
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
    },

    deleteGroup: function (user_id, group) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/user/groupDelete',
            data: {
                user_id: user_id,
                group_name: group
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25){
                            message.info('Delete Successfully!');
                        }
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
    },

    getFollowGroup: function (user_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/user/follow/group',
            data: {
                follow_id: user_id,
                follower_id: localStorage.getItem('photoWall_user_id')
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.group = data.data;
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
        return this.group;
    },

    editFollowGroup: function (group, user_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/user/follow/groupEdit',
            data: {
                group_name: group,
                follow_id: user_id,
                user_id: localStorage.getItem('photoWall_user_id')
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.group = data.data;
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
        return this.group;
    }
});

module.exports = UserStore;
