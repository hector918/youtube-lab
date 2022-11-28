import React, { useState, useEffect } from "react";

export default function Comment(props) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    setName(props.name);
    setComment(props.comment);
  }, [props]);
  if (show)
    return (
      <li>
        <form>
          <label>Name</label>
          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br/>
          <label>Comment</label>
          <br />
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
          <br/>
          <br />
          <button
            style={{ marginRight: "1rem" }}
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.updateComment({ name, comment });
              setShow(false);
            }}
          >
            Update
          </button>
        </form>
      </li>
    );
  return (
    <li>
      <h4>{props.name}</h4>
      <p>{props.comment}</p>
      <button style={{ borderRadius: "50px" }} onClick={props.remove}>
        ❌
      </button>
      <button style={{ borderRadius: "50px" }} onClick={() => setShow(true)}>
        ✏️
      </button>
    </li>
  );
}
