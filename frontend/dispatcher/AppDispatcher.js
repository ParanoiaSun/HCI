var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var ListStore = require('../stores/ListStore');

AppDispatcher.register(function (action) {
    switch(action.actionType) {
        case 'ADD_NEW_ITEM':
            ListStore.addNewItemHandler(action.text);
            ListStore.emitChange();
            break;
        case 'CHANGE_FORM':
            ListStore.changeFormHandler();
            ListStore.emitChange();
            break;
        case 'DISPLAY_FILE_NAME':
            ListStore.displayFileName(action.text);
            ListStore.emitChange();
            break;
        case 'LIKE_BLOG':
            T
        default:
        // no op
    }
})

module.exports = AppDispatcher;
