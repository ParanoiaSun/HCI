import React from 'react'
import HeaderController from './header/HeaderController';
import { browserHistory } from 'react-router';
import { BackTop } from 'antd';

export default class Main extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="main-div">
                <HeaderController/>
                <div className="content-div">
                    {this.props.children}
                </div>
                <BackTop />
            </div>
        );
    }
}

module.exports = Main;
