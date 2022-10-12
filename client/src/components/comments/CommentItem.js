import { useSelector } from 'react-redux'
import DeleteIcon from "../../assets/delete.png"
import classes from './CommentItem.module.css';

const CommentItem = ({ comment, deleteComment }) => {

  const user = useSelector((state) => state.auth.user)
  return (
    <li className={classes.item} key={comment.id}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 3, alignItems: "center" }}>
        <p>{comment.commentBody}</p>
        <div>
          <div style={{ display: "flex", gap: 5, alignItems: "center", justifyContent: "flex-end" }}>
            <p>- {comment.username}</p>
            {user.username === comment.username &&
              <img src={DeleteIcon} style={{ width: "10%", height: "auto", cursor: "pointer" }} onClick={() => deleteComment(comment.id)} alt="" />
            }
          </div>
          <p style={{ fontSize: "12px" }}>{comment.createdAt}</p>
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
