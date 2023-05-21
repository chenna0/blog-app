import {Col, Layout, Row} from 'antd';
import 'containers/Boarding/style.scss';
import LandingImage from 'images/ScreenImage.png';
import SignUpForm from 'components/Boarding/SignUpForm';
import SignInForm from 'components/Boarding/SignInForm';
import BlogLogo from 'images/BlogLogo.png';
import {Link} from 'react-router-dom';

const LandingPage = () => {
  const {Content} = Layout;
  const pathName = window.location.pathname;
  return(
    <Content className={'registration-page'}>
      <img src={BlogLogo} alt={'logo'} className={'logo'}/>
      <Row style={{height:window.innerHeight}} className={'page-height'}>
        <Col className={'form-page'} span={14}>
          {
            pathName.includes('up') ? <SignUpForm/>:<SignInForm/>
          }
          <p className={'navigation'}>
            <Link to="/">BlogPage</Link><br/>
            {
              pathName.includes('up')?
                <>Already have an account? <Link to="/signin">Signin</Link></>:
                <>Don't have an account? <Link to={'/signup'}>Signup</Link></>
            }
          </p>
        </Col>
        <Col className={'screen'} span={10}>
          <img src={LandingImage} alt={'signin'} height={window.innerHeight} width={'100%'}/>
        </Col>
      </Row>
    </Content>
  )
}

export default LandingPage;