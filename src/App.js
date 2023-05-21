import './App.scss';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import {
  PrivateRoutes,
  privateRouter,
  PublicRoutes,
  publicRouter,
  commonRouter,
} from 'routes/router';
import {Layout, Result, Spin} from 'antd';
import 'antd/dist/reset.css';
import AppHeader from 'components/Common/AppHeader';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userSessionCheck} from 'common/utils/common';
import {LoadingOutlined} from '@ant-design/icons';

const App=()=> {
  const isAuthenticated = useSelector(state => state.Auth.isLoggedIn);
  const loader = useSelector(state => state.Auth.appLoader);
  const dispatch = useDispatch();

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 200,

      }}
      spin
    />
  );

  useEffect(()=>{
    if(isAuthenticated){
      userSessionCheck(dispatch);
    }
    // eslint-disable-next-line
  },[]);



  return (
    <Layout className={'common-layout'} style={{justifyContent:loader && 'center',height: loader && window.innerHeight}}>
      <BrowserRouter>
        {
          loader ?(<Spin indicator={antIcon} />):(
            window.innerWidth < 801 ?
              (
                <Result
                  title={'This Application available only in Desktop site'}
                />
              ):
              (
                <>
                  <AppHeader />
                  <Layout style={{height:window.innerHeight-64}}>
                    <Routes>
                      <Route element={<PublicRoutes isAuthenticated={isAuthenticated}/>}>
                        {
                          publicRouter.map((data,index)=>(
                            <Route path={data.path} element={data.element} key={index}/>
                          ))
                        }
                      </Route>
                      <Route element={<PrivateRoutes isAuthenticated={isAuthenticated}/>}>
                        {
                          privateRouter.map((data,index)=>(
                            <Route path={data.path} element={data.element} key={index} />
                          ))
                        }
                      </Route>
                      {
                        commonRouter.map((data,index)=>(
                          <Route path={data.path} element={data.element} key={index} />
                        ))
                      }
                    </Routes>
                  </Layout>
                </>
              ))
        }
      </BrowserRouter>
    </Layout>
  );
}

export default App;
