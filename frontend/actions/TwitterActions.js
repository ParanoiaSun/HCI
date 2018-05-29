/**
 * Created by paranoia on 2017/12/19.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');

var TwitterActions = {

    likeBlog: function (text) {
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        });
    },
    changeForm: function () {
        AppDispatcher.dispatch({
            actionType: 'CHANGE_FORM'
        });
    },
    displayFileName: function (text) {
        AppDispatcher.dispatch({
            actionType: 'DISPLAY_FILE_NAME',
            text: text
        });
    },
    displayRecCase: function (id) {
        AppDispatcher.dispatch({
            actionType: 'DISPLAY_REC_CASE',
            id: id
        });
    }

};

module.exports = TwitterActions;
