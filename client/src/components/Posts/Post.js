import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from "./Post.module.css"
import Like from "../../assets/Like.png"
import axios from 'axios'

const Post = ({ post, deleteHandler }) => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user)
    const [liked, setLiked] = useState(false)
    const [likeValue, setLikeValue] = useState(post.Likes.length)

    useEffect(() => {
        if (post.Likes.filter((like) => like.UserId === user.id).length > 0) {
            setLiked(true);
        }
    }, [post.Likes, user.id])

    const likeHandler = async () => {
        if (!user.status) return;

        const response = await axios.post("http://localhost:3001/likes", { PostId: post.id }, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        })

        if (response.data.liked) {
            setLikeValue((prev) => prev + 1)
            setLiked(true)
            return;
        }
        setLikeValue((prev) => prev - 1)
        setLiked(false)
    }

    return (
        <div className={classes.homePage} >

            <div className={classes.post}>

                {user.username === post.username &&
                    <h4 className={classes.delete} onClick={() => { deleteHandler(post.id) }}>X</h4>
                }

                <div className={classes.postHeader}>
                    <h3 className={classes.title}>{post.title}</h3>
                </div>

                <div onClick={() => navigate(`/post/${post.id}`)}>
                    <div className={classes.postTextContainer}>
                        <p>{post.postText}</p>
                    </div>
                    <img src={post.image} alt="" className={classes.imageContainer} />
                </div>

                <div className={classes.footer}>
                    <div className={classes.likeContainer}>
                        <img src={Like} alt="" className={liked ? `${classes.image} ${classes.liked}` : `${classes.image}`} onClick={() => { likeHandler() }} />
                        <h5 className={classes.likes}>{likeValue}</h5>
                    </div>
                    <h4 className={classes.author}>{post.username}</h4>
                </div>
            </div>

        </div>
    )
}

export default Post;