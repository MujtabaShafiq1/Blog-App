import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios'

import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Layout from './components/layout/Layout';
import ViewPost from './pages/ViewPost';
import Login from './pages/Login';
import Registration from './pages/Registration';
import PageNotFound from './pages/PageNotFound';
import { AuthActions } from './store/AuthSlice';

function App() {

  const dispatch = useDispatch();

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth/auth", { headers: { accessToken: localStorage.getItem("accessToken") } })
      if (!response.data.error) dispatch(AuthActions.login({ username: response.data.username, id: response.data.id, status: true }))
    } catch (e) {
      console.log(e)
    }
  }, [dispatch])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (

    <Layout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/createpost" exact element={<AddPost />} />
        <Route path="/post/:id" exact element={<ViewPost />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Registration />} />
        <Route path="/*" exact element={<PageNotFound />} />
      </Routes>
    </Layout>

  );
}

export default App;
