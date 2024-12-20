import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Note(props) {
  function handleClick() {
    props.onDelete(props.id, props.title);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {props.onDelete &&
      <button className="delete-button" onClick={handleClick}>
        <DeleteIcon sx={{color: '#FCC737'}} />
      </button>}
    </div>
  );
}
