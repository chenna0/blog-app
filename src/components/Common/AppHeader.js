import {Avatar, Button, Dropdown, Layout, Tabs} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Dashboard from 'images/DashboardLogo.png';
import {useDispatch, useSelector} from 'react-redux';
import {userSignOut} from 'reducers/Boarding/boardingSlice';
import {useLocation, useNavigate} from 'react-router-dom';
import {publishData, setDrawer} from 'reducers/BlogList/blogSlice';
import {useEffect, useState} from 'react';

const {Header} = Layout;

const AppHeader = () => {
  const isAuthenticated = useSelector(state => state.Auth.isLoggedIn);
  const firstName = useSelector(state => state.Auth.firstName);
  const lastName = useSelector(state => state.Auth.lastName);
  const blogPublish = useSelector(state => state.Blog.blogPublish);
  const loader = useSelector(state => state.Blog.singleBlogLoader);
  const publishLoader = useSelector(state => state.Blog.publishLoader);
  const profile = useSelector(state => state.Auth.profilePicture);
  const dispatch = useDispatch();
  const location =useLocation();
  const [path,setPath] = useState(location.pathname);

  const navigate = useNavigate();


  useEffect(()=>{
    if(path !== location.pathname){
      setPath(location.pathname);
    }
    // eslint-disable-next-line
  },[location.pathname]);


  const items= isAuthenticated ? [
    {
      key: 'sign-out',
      label: 'Sign Out',
    },
  ]:[
    {
      key: 'sign-in',
      label: 'sign In',
    },
  ];

  const onClick=({key})=>{
    switch (key) {
      case 'sign-out':
        dispatch(userSignOut());
        break;
      default:
        navigate('/signin')
    }
  }

  const tabExtraContent = {
    left:<img src={Dashboard} alt="Logo" className="logo" />,
    right:(
      <>
        {
          isAuthenticated && <span className={'user-name'}>{firstName} {lastName}</span>
        }
        <Dropdown
          menu={{
            items,
            onClick,
          }}
          placement={'bottomRight'}
        >
          {
            profile?.length >10 ?
              <Avatar size={40} src={<img src={profile} alt={'avatar'}/>} className="profile" />  :
              <Avatar size={40} icon={<UserOutlined/>} className="profile" />
          }

        </Dropdown>
      </>
    ),
  }

  const blogContent = {
    left:<p className={'link'} onClick={()=>navigate('/list')}>Back</p>,
    right:(
      !loader && (
        <>
          {
            !blogPublish &&
            <Button
              type={'primary'}
              style={{marginRight:10}}
              disabled={publishLoader}
              onClick={
                ()=> dispatch(
                  setDrawer({isEditForm: true,showDrawer:true}),
                )
              }
            >
              Edit
            </Button>
          }
          <Button 
            type={blogPublish?'default':'primary'} 
            onClick={
              ()=>dispatch(publishData())
            }
            loading={publishLoader}
            disabled={publishLoader}
          >
            {blogPublish?'UnPublish':'Publish'}
          </Button>
        </>
      )
    ),
  }

  const tabs=[
    {
      label:'Blog Page',
      key:'/',
    },{
      label:'Blog List',
      key:'/list',
    },
    {
      label: 'Profile',
      key:'/profile',
    },
  ];

  const onChange = (key)=>{
    switch (key) {
      case '/list':
        navigate('/list');
        break;
      case '/profile':
        navigate('/profile');
        break;
      default:
        navigate('/');
    }
  }
  
  return(
    <>
      {
        !location.pathname.includes('sign')&&(
          <Header className={`app-header ${location.pathname.includes('blog')&&'single-blog'}`}>
            <Tabs
              className={isAuthenticated ?location.pathname.includes('blog')? 'blog-page':'logged-in':'logged-out'}
              defaultActiveKey={'/'}
              activeKey={path}
              centered
              items={
                isAuthenticated && !location.pathname.includes('blog')&&
                tabs.map((data)=>({label:data.label,key:data.key}))
              }
              onChange={onChange}
              tabBarExtraContent={location.pathname.includes('blog')? blogContent: tabExtraContent}
            />
          </Header>
        )
      }
    </>
  )
  
}

export default AppHeader;