/**
 * Created by paranoia on 2017/12/8.
 */
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
import $ from 'jquery';
import { message } from 'antd';

var server_url = 'http://localhost:3000';

const PhotoStore = assign({}, EventEmitter.prototype, {
    photos: [],
    albumId: '',
    photo: {},
    photoId: '',

    getPhotos: function (id) {
        this.albumId = id;
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/photo/' + this.albumId,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.photos = data.data;
                        break;
                    default:
                        message.info('Unknown Error1');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error1');
                        break;
                    default:
                        message.info('Unknown Error1');
                        break;
                }
            }
        });
        return this.photos;
    },

    searchPhoto: function (input) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/photo/searchAll',
            data: {
                word: input
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.photos = data.data;
                        else
                            this.photos = [];
                        break;
                    default:
                        message.info('Unknown Error1');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error1');
                        break;
                    default:
                        message.info('Unknown Error1');
                        break;
                }
            }
        });
        return this.photos;
    },

    deletePhoto: function (photo_id) {
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/photo/delete/' + photo_id,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            message.info('Delete Successfully!');
                        }
                        break;
                    default:
                        message.info('Unknown Error1');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error1');
                        break;
                    default:
                        message.info('Unknown Error1');
                        break;
                }
            }
        });
    },

    addTag: function (tag, photo_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/photo/add/tag',
            data: {
                photo_id: photo_id,
                tag: tag
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            message.info('add successfully!');
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

    deleteTag: function (tag, photo_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/photo/delete/tag',
            data: {
                photo_id: photo_id,
                tag: tag
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            message.info('delete successfully!');
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

    getMessagesByGroup: function (group, user_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/photo/message/group',
            data: {
                group: group,
                user_id: user_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.photos = data.data;
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('404 Not Found');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
        return this.photos;
    },

    getPhotoById: function (id) {
        this.photoId = id;
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/photo/get/' + this.photoId,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.photo = data.data;
                        else
                            this.photo = {};
                        break;
                    default:
                        message.info('Unknown Error1');
                        break;
                }
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case 404:
                        message.info('Unknown Error1');
                        break;
                    default:
                        message.info('Unknown Error1');
                        break;
                }
            }
        });
        return this.photo;
    },

    saveEditPhoto: function (file, id) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        console.log(file);

        $.ajax({
            async: false,
            contentType: false,
            processData: false,
            cache: false,
            type : 'POST',
            url: server_url + '/photo/save',
            data: formData,
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            message.info('Save Successfully!');
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
                        message.info('404 Not Found');
                        break;
                    default:
                        message.info('Unknown Error');
                        break;
                }
            }
        });
    }

});

module.exports = PhotoStore;
