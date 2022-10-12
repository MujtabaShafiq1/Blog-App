import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = ({ comments, deleteComment }) => {

  return (
    <>
      {comments.length > 0 ?
        <ul className={classes.comments}>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} deleteComment={deleteComment} />
          ))}
        </ul>
        :
        <h1 style={{ textAlign: "center" }}>No Comments Found</h1>}
    </>

  );
};

export default CommentsList;
