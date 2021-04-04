import classes from "./CommentList.module.css";

function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {comments.map(({ id, text, name }) => (
        <li key={id}>
          <p>{text}</p>
          <div>
            By <address>{name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
