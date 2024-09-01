import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

export default function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [userReady, setUserReady] = useState(false);

  function userClicked(){
    setUserReady(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {userReady && <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Message Title"
        />}
        <textarea
        onClick={userClicked}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Message Body"
          rows={userReady ? "3" : "1"}
        />
        <Zoom in={userReady}>
          <Fab onClick={submitNote}>
            <AddIcon/>
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
