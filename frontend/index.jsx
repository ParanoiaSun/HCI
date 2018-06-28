const React = require('react');
const ReactDOM = require('react-dom');
const LoginController = require('./components/pages/LoginController');
const RegisterController = require('./components/pages/RegisterController');
const AdminController = require('./components/admin/AdminController');
const AdminEditController = require('./components/admin/AdminEditController');
const Homepage = require('./components/pages/Homepage');
const HotTwitterController = require('./components/pages/subPages/HotTwitterController');
const JoinedActivityController = require('./components/pages/subPages/JoinedActivityController');
const FollowTwitterController = require('./components/pages/subPages/FollowTwitterController');
const MessageController = require('./components/pages/subPages/MessageController');
const PhotoSearchController = require('./components/photoSearch/PhotoSearchController');
const PhotoEdit = require('./components/photoEdit/photoEdit');
const BlogController = require('./components/blog/BlogController');
const AlbumController = require('./components/album/AlbumController');
const AlbumContentController = require('./components/albumContent/AlbumContentController');
const MainPageController = require('./components/mainpage/MainPageController');
const ProfileController = require('./components/profile/ProfileController');
const ProfileEditController = require('./components/profile/ProfileEditController');
const ForumController = require('./components/forum/ForumController');
const ActivityController = require('./components/activity/ActivityController');
const ActivityEditController = require('./components/activity/ActivityEditController');
const Main = require('./components/main');
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

const requireAuth = (nextState, replace) => {
    if (localStorage.getItem('photoWall_user_id') === null || localStorage.getItem('photoWall_user_id') === undefined) {
        replace({ pathname: '/login' })
    }
};
const requireAdmin = (nextState, replace) => {
    if (localStorage.getItem('photoWall_admin_right') !== 'true') {
        replace({ pathname: '/login' })
    }
};

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRedirect to="/homepage/" />
            <Route path="homepage/" component={Homepage} onEnter={requireAuth}>
                <IndexRoute component={HotTwitterController} onEnter={requireAuth}/>
                <Route path="twitter/:id" component={FollowTwitterController} onEnter={requireAuth}/>
                <Route path="hot" component={HotTwitterController} onEnter={requireAuth}/>
                <Route path="activity" component={JoinedActivityController} onEnter={requireAuth}/>
                <Route path="message/:id" component={MessageController} onEnter={requireAuth}/>
            </Route>
            <Route path="search/:data" component={PhotoSearchController} onEnter={requireAuth}/>
            <Route path="photo/edit/:id" component={PhotoEdit} onEnter={requireAuth}/>
            <Route path="blog/:id" component={BlogController} onEnter={requireAuth}/>
            <Route path="album/:id" component={AlbumController} onEnter={requireAuth}/>
            <Route path="album/id/:id" component={AlbumContentController} onEnter={requireAuth}/>
            <Route path="profile/:id" component={ProfileController} onEnter={requireAuth}/>
            <Route path="profile_edit" component={ProfileEditController} onEnter={requireAuth}/>
            <Route path="user/:id" component={MainPageController} onEnter={requireAuth}/>
            <Route path="activity/:page" component={ActivityController} onEnter={requireAuth}/>
            <Route path="activity/edit/:id" component={ActivityEditController} onEnter={requireAuth}/>
            <Route path="forum" component={ForumController} onEnter={requireAuth}/>
        </Route>
        <Route path="/login" component={LoginController} />
        <Route path="/register" component={RegisterController} />
        <Route path="/admin" component={AdminController} onEnter={requireAdmin}/>
        <Route path="/admin/:id" component={AdminEditController} onEnter={requireAdmin}/>
    </Router>),
    document.querySelector('#app')
);
