import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NotesList.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { confirmAlert } from "react-confirm-alert";
import Loading from "../../assets/images/loading.gif";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const URL = "https://safe-scrubland-91703.herokuapp.com/api";

  const fetchNotes = async () => {
    setIsLoading(true);
    const res = await axios
      .get(URL + "/notes")
      .catch((err) => console.log("Hubo un error\n" + err));
    setNotes(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    console.log("delete ", id);
    const res = await axios
      .delete(URL + "/notes/" + id)
      .catch((err) => console.log(res));
    fetchNotes();
  };

  const confirmDeleteNote = (id) => {
    confirmAlert({
      message: "Are you sure you want to delete it?",
      buttons: [
        {
          label: "No",
          onClick: () => {},
        },
        {
          label: "Yes, I want to",
          onClick: () => deleteNote(id),
        },
      ],
    });
  };

  return (
    <div className="content">
      <div className="notesList">
        <h3 className="title">Notes</h3>
        {isLoading ? (
          <div className="loading">
            <img src={Loading} alt="Loading.." />
          </div>
        ) : (
          <main className="notesList-grid">
            {notes.map((note) => (
              <div className="notesList-note" key={note._id}>
                <div className="note-header">
                  <div className="note-title">{note.title}</div>
                </div>
                <div className="note-body">
                  <div className="note-content">{note.content}</div>
                  <div className="note-info">
                    <div className="note-author">{note.author}</div>
                    <div className="note-date">{format(note.date)}</div>
                  </div>
                </div>
                <div className="note-footer">
                  <button
                    className="note-delete"
                    onClick={() => confirmDeleteNote(note._id)}
                  >
                    Delete
                  </button>
                  <Link to={{ pathname: "/edit/" + note._id, hash: note._id }}>
                    <button className="note-edit">Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}

export default NotesList;
