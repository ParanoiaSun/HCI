/**
 * Created by paranoia on 2017/12/8.
 */
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
import $ from 'jquery';
import { message} from 'antd';

const server_url = 'http://localhost:3000';

const TwitterStore = assign({}, EventEmitter.prototype, {
    twitters: [],
    userId: '',
    reviews: [],
    like: false,

    getTwitters: function (id) {
        this.userId = id;
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/blog',
            data: {
                id: this.userId
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.twitters = data.data;
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
        return this.twitters;
    },

    deleteTwitter: function (id) {
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/blog/delete/' + id,
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
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

    sendTwitter: function (img, des) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/blog/add',
            data: {
                user_id: localStorage.getItem('photoWall_user_id'),
                img: img,
                des: des
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        message.info('send successfully!');
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

    repostTwitter: function (user_id, twitter_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/blog/repost',
            data: {
                user_id: user_id,
                twitter_id: twitter_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        message.info('send successfully!');
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

    getAllTwitters: function () {
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/blog/all',
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.twitters = data.data;
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
        return this.twitters;
    },

    getHot: function () {
        $.ajax({
            async: false,
            type : 'GET',
            url: server_url + '/blog/hot',
            data: {},
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        this.twitters = data.data;
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
        return this.twitters;
    },

    getTwittersByGroup: function (group, user_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/blog/follow/group',
            data: {
                group: group,
                user_id: user_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.twitters = data.data;
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
        return this.twitters;
    },

    sendReview: function (user_id, user_name, content, twitter_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/blog/review/add',
            data: {
                user_id: user_id,
                user_name: user_name,
                content: content,
                twitter_id: twitter_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        message.info('send successfully!');
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

    getReviews: function (twitter_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/blog/review/',
            data: {
                twitter_id: twitter_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25)
                            this.reviews = data.data;
                        else
                            this.reviews = [];
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
        return this.reviews;
    },

    deleteReview: function (twitter_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/blog/review/delete',
            data: {
                twitter_id: twitter_id
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
        return this.reviews;
    },

    checkLike: function (user_id, twitter_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/blog/hasLike',
            data: {
                user_id: user_id,
                twitter_id: twitter_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
                        if(data.message === 25) {
                            this.like = true;
                        }else{
                            this.like = false;
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
        return this.like;
    },

    likeTittwer: function (user_id, twitter_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/blog/like',
            data: {
                user_id: user_id,
                twitter_id: twitter_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
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

    cancelLike: function (user_id, twitter_id) {
        $.ajax({
            async: false,
            type : 'POST',
            url: server_url + '/blog/cancelLike',
            data: {
                user_id: user_id,
                twitter_id: twitter_id
            },
            datatype : 'json',
            success : function(data, textStatus, xhr) {
                switch (xhr.status) {
                    case 200:
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
        return this.like;
    }
});

module.exports = TwitterStore;
