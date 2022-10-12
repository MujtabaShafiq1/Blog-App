import classes from './HighlightedPost.module.css';

const HighlightedPost = ({ singlePost }) => {

  return (
    <>
      <div className={classes.container}>
        <div className={classes.quote}>
          <div className={classes.title}>{singlePost.title}</div>
          <p>{singlePost.postText}</p>
          <div className={classes.username}>{singlePost.username}</div>
        </div>
      </div>
    </>

  );

}

export default HighlightedPost