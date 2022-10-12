import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'

import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm'
import Button from '../UI/Button';

const Comments = ({ id }) => {

  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comments, setComments] = useState([])

  const fetchComments = useCallback(async () => {
    const response = await axios.get(`http://localhost:3001/comments/${id}`)
    setComments(response.data)
  }, [id])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const PostingComment = async (comment) => {
    try {
      const response = await axios.post("http://localhost:3001/comments", comment, {
        headers: { accessToken: localStorage.getItem("accessToken") }
      })
      setComments([...comments, response.data])
    } catch (e) {
      alert("Unable to add Comment")
    }
  }

  const DeleteComment = async (id) => {
    await axios.delete(`http://localhost:3001/comments/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") }
    })
    const filteredComments = comments.filter((comment) => {
      return comment.id !== id
    })
    setComments(filteredComments);
  }


  return (
    <>
      <section style={{ textAlign: "center" }}>
        {!isAddingComment ?
          <Button onClick={() => setIsAddingComment(true)}>Add a Comment</Button>
          :
          <NewCommentForm id={id} post={PostingComment} />
        }
      </section>
      <CommentsList comments={comments} deleteComment={DeleteComment} />
    </>

  );
};

export default Comments;
