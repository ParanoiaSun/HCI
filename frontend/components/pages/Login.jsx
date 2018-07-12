const React = require('react');
import UserStore from '../../stores/UserStore';
import { Form, Icon, Input, Button, Checkbox, message, Modal } from 'antd';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
const FormItem = Form.Item;

class LocalizedModal extends React.Component {
    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    enterAdmin = () => {
        const input = document.getElementById('admin-enter-pw').value;
        if(input.length === 0){
            message.info('Please Input Your Key.');
        } else {
            if(input === 'root') {
                this.setState({
                    visible: false,
                });
                localStorage.setItem('photoWall_admin_right', 'true');
                hashHistory.replace('/admin');
            } else {
                message.error('Your key is Wrong');
            }
        }
    };
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div>
                <p className="admin-enter-button" onClick={this.showModal}>Admin Entrance</p>
                <Modal
                    title="Please Input Your Secret Key"
                    visible={this.state.visible}
                    onOk={this.enterAdmin}
                    onCancel={this.hideModal}
                    okText="Enter"
                    cancelText="Cancel"
                >
                    <Input placeholder="Basic usage" id="admin-enter-pw"/>
                </Modal>
            </div>
        );
    }
}

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const result = UserStore.login(values);
                if(result.message === 25) {
                    localStorage.setItem('photoWall_user_id', values.userName);
                    message.info('login success, welcome to Photo Wall.');
                    hashHistory.push('/#/');
                }
            }
        });
    };
    enterAdmin = () => {

    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <p className="login-form-title">PhotoWall Login</p>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your user id!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="User ID" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                  <div>
                      {getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                      })(
                          <Checkbox>Remember me</Checkbox>
                      )}
                      <Link style={{float:'right'}} to={{ pathname: '/register'}}>forget password?</Link>
                  </div>
                      <div>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                      </div>
                      <br/>
                      <div className="register-form-botton">
                        <center>
                        Or&nbsp;
                          <Link to={{ pathname: '/register'}}>register now!</Link>
                        </center>
                      </div>
                </FormItem>
                <LocalizedModal />
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

const Login = function(props) {

    return <div className="login-page">
        <div className="login-form-wrapper">
            <WrappedNormalLoginForm />
        </div>
    </div>;

}

module.exports = Login;
