import {Button, Form, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {userRegister} from 'reducers/Boarding/boardingSlice';

const SignUpForm = () =>{

  const dispatch = useDispatch();
  const loader = useSelector(state => state.Auth.signUpLoader);
  const onFinish =(values)=>{
    let data={};
    for(const attribute in values){
      if (attribute !== 'confirm'){
        data[attribute]=values[attribute];
      }
    }
    dispatch(userRegister(data))
  }


  return(
    <div className={'sign-up-page'}>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className={'name-align'}>
          <span>
            <label>FirstName<span className={'danger'}>*</span></label>
            <Form.Item
              name="first_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your First Name!',
                },
              ]}
            >
              <Input placeholder={'First Name'}/>
            </Form.Item>
          </span>
          <span>
            <label>LastName<span className={'danger'}>*</span></label>
            <Form.Item
              name="last_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Last Name!',
                },
              ]}
            >
              <Input placeholder={'Last Name'}/>
            </Form.Item>
          </span>
        </div>
        <label>Email<span className={'danger'}>*</span></label>
        <Form.Item
          name="email"
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

        <label>Password<span className={'danger'}>*</span></label>
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

        <label>Confirm Password<span className={'danger'}>*</span></label>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
          className={'confirm-pass'}
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUpForm;