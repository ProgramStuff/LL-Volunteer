import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Note(props) {
  console.log("NOTE " + props.title);
  function handleClick() {
    props.onDelete(props.id, props.title);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon/>
      </button>
    </div>
  );
}
