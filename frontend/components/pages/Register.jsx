const React = require('react');
import { Form, Icon, Input, Button, Checkbox, Modal, message } from 'antd';
import { Link } from 'react-router';
import UserStore from '../../stores/UserStore';
import { hashHistory } from 'react-router';
const FormItem = Form.Item;

class RegisterForm extends React.Component {
    state = {
        visible: false,
        id: ''
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        console.log(this.state.id);
        localStorage.setItem('photoWall_user_id', this.state.id);
        message.info('register success, welcome to Photo Wall.');
        hashHistory.push('/#/');
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.password !== values.password2) {
                    message.warn('Please Input Same Password!');
                }else{
                    const result = UserStore.register(values);
                    if(result.message === 25) {
                        console.log(result);
                        this.state.id = result.id;
                        this.showModal();
                    }
                }
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <p className="login-form-title">PhotoWall Register</p>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
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
                    {getFieldDecorator('password2', {
                        rules: [{ required: true, message: 'Please input your Password Again!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Repeat Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <br/>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                    <div>
                      <center>
                        Or&nbsp;<Link to={{ pathname: '/login'}}>login now!</Link>
                      </center>
                    </div>
                </FormItem>
                <Modal
                    title="Register Success"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            OK
                        </Button>,
                    ]}
                >
                    <p>Your ID is {this.state.id}</p>
                    <p>Use ID to login</p>
                </Modal>
            </Form>
        );
    }
}

const WrappedRegisterForm = Form.create()(RegisterForm);

const Register = function(props) {

    return <div className="login-page">
        <div className="login-form-wrapper">
            <WrappedRegisterForm />
        </div>
    </div>;

}

module.exports = Register;
