import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { AuthActions } from '../../store/AuthSlice';
import Button from '../UI/Button';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const logoutHandler = () => {
    localStorage.removeItem("accessToken")
    dispatch(AuthActions.logout())
  }

  return (
    <header className={classes.header}>
      <Link to='/' className={classes.logo}>
        Post App
      </Link>
      <h2 style={{ paddingLeft: "13%", color: "white" }}>{user.username}</h2>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/' className={(navData) => (navData.isActive ? `${classes.active}` : 'none')}>
              Home
            </NavLink>
          </li>
          {!user.status ?
            <>
              <li>
                <NavLink to='/login' className={(navData) => (navData.isActive ? `${classes.active}` : 'none')}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/register' className={(navData) => (navData.isActive ? `${classes.active}` : 'none')}>
                  Registration
                </NavLink>
              </li>
            </>
            :
            <>
              <li>
                <NavLink to='/createpost' className={(navData) => (navData.isActive ? `${classes.active}` : 'none')}>
                  Create Post
                </NavLink>
              </li>
              <li>
                <NavLink to='/login'>
                  <Button style={{ padding: "0px 10px" }} onClick={logoutHandler}>
                    Logout
                  </Button>
                </NavLink>
              </li>
            </>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
