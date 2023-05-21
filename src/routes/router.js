import { Navigate, Outlet} from 'react-router-dom';
import LandingPage from 'containers/Boarding/LandingPage';
import BlogPage from 'containers/BlogPage/BlogPage';
import PageNotFound from 'containers/PageNotFound/PageNotFound';
import BlogList from 'containers/BlogList/BlogList';
import Profile from 'containers/Profile/Profile';
import BlogDetail from '../containers/BlogDetail/BlogDetail';

export const publicRouter = [
  {
    path: '/signin',
    element: <LandingPage />,
  },
  {
    path: '/signup',
    element: <LandingPage />,
  },
];

export const privateRouter = [
  {
    path: '/list',
    element: <BlogList/>,
  },
  {
    path: '/profile',
    element: <Profile/>,
  },
  {
    path: '/blog/:id',
    element: <BlogDetail/>,
  },
];

export const commonRouter = [
  {
    path: '*',
    element: <PageNotFound/>,
  },
  {
    path: '/',
    element: <BlogPage />,
  },
]

// Private route restrict to access public pages after login.
export const PrivateRoutes=({isAuthenticated})=>
  (isAuthenticated ? (
    <Outlet/>
  ) : (<Navigate to={{
    pathname: '/signin',
  }}/>))


// Public route restrict to access authenticated pages before login.
export const PublicRoutes=({isAuthenticated})=>
  (!isAuthenticated ? (
    <Outlet/>
  ) : (<Navigate to={{
    pathname: '/',
  }}/>))