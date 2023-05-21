import {Button, Form, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {userSignIn} from 'reducers/Boarding/boardingSlice';




const SignInForm = () =>{
  const dispatch = useDispatch();
  const loader = useSelector(state => state.Auth.signInLoader);
  const onFinish=(values)=>{
    dispatch(userSignIn(values));
  }

  return(
    <div className={'sign-in-page'}>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <label>Email<span className={'danger'}>*</span></label>
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
            {
              type:'email',
              message: 'Please input valid Email!',
            },
          ]}
        >
          <Input placeholder={'Email'}/>
        </Form.Item>

        <label>
          Password
          <span className={'danger'}>*</span>
          {/*<span className={'forgot-pass'}>*/}
          {/*  ForgotPassword?*/}
          {/*</span>*/}
        </label>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder={'Password'}/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loader}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  )

}
export default SignInForm;