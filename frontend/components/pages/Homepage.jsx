var React = require('react');
import { Tabs, Button, message, Menu, Icon, Input } from 'antd';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import UserStore from '../../stores/UserStore';

const SubMenu = Menu.SubMenu;
const Search = Input.Search;

export default class Homepage extends React.Component{
    rootSubmenuKeys = ['sub1', 'sub2'];
    state = {
        openKeys: ['sub1', 'sub2'],
        groups: UserStore.getUserGroup(localStorage.getItem('photoWall_user_id'))
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    constructor(props){
        super(props);
    }

    refresh = () => {
        location.reload();
    };

    twitterGroupList = () => {
        const null_info = <span style={{color: '#AAAAAA'}}>Oh!There is nothing here~</span>;
        const array = this.state.groups;
        if(array === null || array === undefined )
            return null_info;
        if(array.len === 0)
            return null_info;
        return array.map(function (item, i) {
            return <Menu.Item key={101+i}><Link to={{ pathname: '/homepage/twitter/' + item.name}} onClick={() => location.reload()}>
                {item.name}
            </Link></Menu.Item>;
        });
    };

    messageGroupList = () => {
        const null_info = <span style={{color: '#AAAAAA'}}>Oh!There is nothing here~</span>;
        const array = this.state.groups;
        if(array === null || array === undefined )
            return null_info;
        if(array.len === 0)
            return null_info;
        return array.map(function (item, i) {
            return <Menu.Item key={201+i}><Link to={{ pathname: '/homepage/message/' + item.name}} onClick={() => location.reload()}>
                {item.name}
            </Link></Menu.Item>;
        });
    };

    searchPhotos = () => {
        const input = document.getElementById('photo-search-input').value;
        console.log(input);
        if(input.length === 0) {
            message.warn('Please input your search word.');
        }else{
            hashHistory.replace('search/' + input);
            location.reload();
        }
    }

    render() {
        return (
            <div className="main-content">
                <div className="cover-div">
                    <img id="main-cover" src="img/cover1.jpg" alt=""/>
                    <div className="main-search">
                        <Search
                            id="photo-search-input"
                            placeholder="search photo by tag"
                            onSearch={this.searchPhotos}
                            style={{ width: 300, height: 30}}
                        />
                    </div>
                </div>
            <div className="main-page">
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    defaultSelectedKeys={[]}
                    onOpenChange={this.onOpenChange}
                    style={{ width: 256 }}
                    className="homepage-sider"
                >
                    <Menu.Item key="5">
                        <Link to={{ pathname: '/homepage/hot'}} onClick={this.refresh}>
                            Hot Twitter
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to={{ pathname: '/homepage/activity'}} onClick={this.refresh}>
                            Joined Activities
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="picture" /><span>Twitters</span></span>}>
                        <Menu.Item key="100">
                            <Link to={{ pathname: '/homepage/twitter/all'}} onClick={this.refresh}>
                                all
                            </Link>
                        </Menu.Item>
                        {this.twitterGroupList()}
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="mail" /><span>Messages</span></span>}>
                        <Menu.Item key="200">
                            <Link to={{ pathname: '/homepage/message/all'}} onClick={this.refresh}>
                                all
                            </Link>
                        </Menu.Item>
                        {this.messageGroupList()}
                    </SubMenu>
                </Menu>
                <div className="homepage-twitter-part">
                    {this.props.children}
                </div>
            </div>
            </div>
        );
    }
}

module.exports = Homepage;