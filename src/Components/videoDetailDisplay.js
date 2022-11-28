import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./videoDetailDisplay.css";
import Comment from "./Comment";

export default function VideoDetailDisplay() {
  const storage_prefix = "v-ideo";
  let { id } = useParams();
  let videoHistory;
  try {
    videoHistory =
      JSON.parse(localStorage.getItem(`${storage_prefix}${id}`)) || {};
  } catch (error) {
    videoHistory = {};
  }

  if (Object.prototype.toString.call(videoHistory) !== "[object Object]") {
    videoHistory = {};
  }
  const [comments, setComments] = useState(videoHistory.comments || []);
  const [commentForm, setCommentForm] = useState({ name: "", comment: "" });

  ////event////////////////////////////////////////////////////
  const on_form_reset = (evt) => {
    for (let x in commentForm) {
      evt.target[x].classList.remove("error");
    }
    evt.target["submit"].nextSibling.classList.remove("error");
  };
  const on_comment_form_change = (evt, key) => {
    setCommentForm((pv) => ({ ...pv, [key]: evt.target.value }));
  };
  const on_comment_form_submit = (evt) => {
    evt.preventDefault();
    let err = false;
    for (let x in commentForm) {
      if (commentForm[x] === "") {
        evt.target[x].classList.add("error");
        err = true;
      }
    }
    if (err) {
      evt.target["submit"].nextSibling.classList.add("error");
      return;
    }
    videoHistory["comments"] = comments.concat(commentForm);
    setComments((pv) => [...pv, commentForm]);
    setCommentForm({ name: "", comment: "" });
    localStorage.setItem(
      `${storage_prefix}${id}`,
      JSON.stringify(videoHistory)
    );
    on_form_reset(evt);
  };
  const on_comment_remove_click = (idx) => {
    comments.splice(idx);
    setComments([...comments]);
  };
  const on_comment_update_click = (idx,comment) => {
    const updatedComments = [...comments]
    const matchComment = updatedComments[idx]
    if(!matchComment) return;
    matchComment.name= comment.name;
    matchComment.comment= comment.comment;

    setComments([...updatedComments]);
    videoHistory.comments= updatedComments
    localStorage.setItem(
      `${storage_prefix}${id}`,
      JSON.stringify(videoHistory)
    );
  };
  ////////////////////////////////////////////////////////
  return (
    <>
      <div className="video-container">
        <iframe
          title="unique"
          type="text/html"
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
        />
      </div>
      <hr className="hr" />
      <div>
        <div className="video-comment-form-container">
          <form onSubmit={on_comment_form_submit}>
            <label>
              Name{" "}
              <p>
                <input
                  name="name"
                  value={commentForm.name}
                  onChange={(e) => {
                    on_comment_form_change(e, "name");
                  }}
                  placeholder="Name..."
                />
                <span></span>
              </p>
            </label>
            <label>
              Comment{" "}
              <p>
                <input
                  name="comment"
                  value={commentForm.comment}
                  onChange={(e) => {
                    on_comment_form_change(e, "comment");
                  }}
                  placeholder="..."
                />
              </p>
            </label>
            <input name="submit" type="submit" />
            <span
              style={{
                display: "none",
                color: "red",
                border: "none",
                marginLeft: "10px",
              }}
            >
              Please fill out the form before submit.
            </span>
          </form>
          <hr className="hr" />
        </div>
        <p>Comments</p>
        <ul className="video-comment-container">
          {comments.map((el, idx) => (
            <Comment
              key={idx}
              name={el.name}
              comment={el.comment}
              remove={() => {
                on_comment_remove_click(idx);
              }}
              updateComment={(comment) => on_comment_update_click(idx, comment)}
            />
          ))}
        </ul>
        <hr className="hr" />
      </div>
    </>
  );
}
