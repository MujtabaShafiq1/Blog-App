import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import Post from '../components/Posts/Post';

const Home = () => {

    const [listOfPosts, setListOfPosts] = useState([]);

    const fetchPosts = useCallback(async () => {
        const { data } = await axios.get("http://localhost:3001/posts");
        setListOfPosts(data)
    }, [])

    const deletePost = (id) => {
        if (window.confirm("Are you sure you want to Delete this Post ?")) {
            axios.delete(`http://localhost:3001/posts/${id}`, { headers: { "accessToken": localStorage.getItem("accessToken") } })
            setListOfPosts(listOfPosts.filter(p => (p.id !== id)));
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts])

    return (
        <>
            {listOfPosts.length > 0 ?
                <>
                    {listOfPosts.map((p => <Post post={p} key={p.id} deleteHandler={deletePost} />))}
                </>
                :
                <h1 style={{ color: "black", display: "flex", justifyContent: "center" }}>No posts found</h1>
            }
        </>
    )
}

export default Home;