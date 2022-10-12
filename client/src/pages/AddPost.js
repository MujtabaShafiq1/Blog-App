import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import CreatePost from '../components/Posts/CreatePost'

const AddPost = () => {

  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.user.status)

  useEffect(() => {
    if (!status) {
      navigate("/login")
    }
  }, [navigate, status])

  return (
    <>
      <CreatePost />
    </>
  )
}

export default AddPost