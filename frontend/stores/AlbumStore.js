/**
 * Created by paranoia on 2017/12/8.
 */
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
import $ from 'jquery';
import { message } from 'antd';

var server_url = 'http://localhost:3000';

const AlbumStore = assign({}, EventEmitter.prototype, {
    albums: {},
    userId: '',

    getAlbums: function (id) {
        this.userId = id;
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/album/get/' + this.userId,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.albums = data.data;
                        break;
                    default:
                        message.info('未知错误，读取文件信息失败');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('读取文件信息失败，该文件不存在');
                        break;
                    default:
                        message.info('读取文件信息失败，请检查网络连接或重新尝试');
                        break;
                }
            }
        });
        return this.albums;
    },

    addAlbum: function (name) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/album/add',
            data: {
                userId: localStorage.getItem('photoWall_user_id'),
                name: name
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        message.info('add successfully!');
                        setTimeout('location.reload();', 800);
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

    addTag: function (tag, album_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/album/add/tag',
            data: {
                album_id: album_id,
                tag: tag
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            message.info('add successfully!');
                            // setTimeout('location.reload();', 800);
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

    deleteTag: function (tag, album_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/album/delete/tag',
            data: {
                album_id: album_id,
                tag: tag
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            message.info('delete successfully!');
                            // setTimeout('location.reload();', 800);
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

    deleteAlbum: function (album_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/album/delete',
            data: {
                album_id: album_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            message.info('delete successfully!');
                            setTimeout('location.reload();', 800);
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

    editAlbum: function (name, album_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/album/edit',
            data: {
                name: name,
                album_id: album_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            message.info('edit successfully!');
                            setTimeout('location.reload();', 800);
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
    }
});

module.exports = AlbumStore;
