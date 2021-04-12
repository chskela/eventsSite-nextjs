import { useEffect, useState, useContext } from "react";

import CommentList from "./CommentList";
import NotificationContext from "../../store/NotificationContext";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";

function Comments({ eventId }) {
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    let cleanupFunction = false;

    if (showComments) {
      setIsLoading(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then(({ comments }) => {
          if (!cleanupFunction) {
            setIsLoading(false);
            setComments(comments);
          }
        });
    }
    return () => (cleanupFunction = true);
  }, [showComments]);

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Added comment for this event.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully added comment!",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: err.message || "Something went wrong!",
          status: "error",
        });
      });
  }
  const content =
    showComments &&
    (isLoading ? <p>Loading...</p> : <CommentList comments={comments} />);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {content}
    </section>
  );
}

export default Comments;
