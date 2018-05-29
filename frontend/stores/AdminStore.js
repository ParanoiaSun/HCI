/**
 * Created by paranoia on 2017/12/9.
 */
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
import $ from 'jquery';
import { message} from 'antd';

var server_url = 'http://localhost:3000';

const AdminStore = assign({}, EventEmitter.prototype, {
    users: [],
    user: {},

    getUsers: function () {
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/admin/user',
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.users = data.data;
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('404 Not Found!');
                        break;
                    default:
                        message.info('Server Error!');
                        break;
                }
            }
        });
        return this.users;
    },

    getUserById: function (id) {
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/admin/user/' + id,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.user = data.data;
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('404 Not Found!');
                        break;
                    default:
                        message.info('Server Error!');
                        break;
                }
            }
        });
        return this.user;
    },

    deleteUser: function (id) {
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/admin/delete/' + id,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        message.info('Delete Successfully!');
                        location.reload();
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('404 Not Found!');
                        break;
                    default:
                        message.info('Server Error!');
                        break;
                }
            }
        });
    },

    updateUserInfo: function(username, email, id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/admin/edit/' + id,
            data: {
                username: username,
                email: email
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        message.info('Edit Successfully!')
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
    }
});

module.exports = AdminStore;
