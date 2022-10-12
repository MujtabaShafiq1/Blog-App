import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import HighlightedPost from '../components/Posts/HighlightedPost';
import Comments from '../components/comments/Comments';

const ViewPost = () => {

    const params = useParams();
    const { id } = params;

    const [singlePost, setSinglePost] = useState({})

    const fetchPost = useCallback(async () => {
        const response = await axios.get(`http://localhost:3001/posts/byId/${id}`)
        setSinglePost(response.data)
    }, [id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    return (
        <>
            <HighlightedPost singlePost={singlePost} />
            <Comments id={singlePost.id} />
        </>
    )
}

export default ViewPost