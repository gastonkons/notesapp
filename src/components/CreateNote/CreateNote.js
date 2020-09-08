import React, { useState, useEffect } from "react";
import "./CreateNote.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateNote(props) {
  const dateDefault = new Date();
  const [usernames, setUsernames] = useState([]);
  const [date, setDate] = useState(dateDefault);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userSelected, setUserSelected] = useState("choose");
  const [editing, setEditing] = useState(false);
  const [noteId, setNoteId] = useState("");

  const URL = "http://localhost:4000/api";
  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(URL + "/users").catch((err) => {
        return { statusText: "ERROR" };
      });
      if (res.statusText === "OK") {
        setUsernames(res.data.map((user) => user.username));
      } else if (res.statusText === "ERROR") {
        console.log("Error");
      }
    }

    fetchData();
    if (props.match.params.id) {
      async function getNote() {
        const res = await axios.get(URL + "/notes/" + props.match.params.id);
        setTitle(res.data.title);
        setContent(res.data.content);
        setUserSelected(res.data.author);
        setDate(new Date(res.data.date));
      }
      getNote();
      setEditing(true);
      setNoteId(props.match.params.id);
    }
  }, [props.match.params.id]);

  const inputChange = (e) => {
    const paragraphNote = document.querySelector(".form-message.noteMessage");
    paragraphNote.innerHTML = "";
    switch (e.target.name) {
      case "userSelected":
        setUserSelected(e.target.value);
        break;
      case "title":
        setTitle(e.target.value);
        break;
      case "content":
        setContent(e.target.value);
        break;
      default:
        console.log("err");
    }
  };

  const dateChange = (date) => {
    setDate(date);
  };

  const createNote = async () => {
    const paragraphNote = document.querySelector(".form-message.noteMessage");
    paragraphNote.innerHTML = "";
    if (userSelected === "" || title === "" || content === "") {
      paragraphNote.innerHTML = "* All fields are required.";
    } else {
      const newNote = {
        title: title,
        author: userSelected,
        content: content,
        date: date,
      };

      if (editing) {
        await axios
          .put(URL + "/notes/" + noteId, newNote)
          .then((res) => {
            paragraphNote.style.color = "green";
            paragraphNote.innerHTML = `${res.data}`;
          })
          .catch((err) => console.log(err));
      } else {
        await axios
          .post(URL + "/notes", newNote)
          .then((res) => {
            paragraphNote.style.color = "green";
            paragraphNote.innerHTML = `${res.data}`;
          })
          .catch((err) => console.log(err));
      }

      clearInputs();
      history.push("/");
    }
  };

  const clearInputs = () => {
    document.querySelector('input[name="title"]').value = "";
    document.querySelector('textarea[name="content"]').value = "";
    document.querySelector(".react-datepicker-wrapper input").value = new Date(
      dateDefault
    );
    document.querySelector('select[name="userSelected"]').value = "choose";
  };

  return (
    <div className="content">
      <div className="createNote">
        <h3 className="title">Create a Note</h3>
        <div className="form-group">
          <select
            name="userSelected"
            value={userSelected}
            onChange={inputChange}
          >
            <option name="choose" value="choose" disabled>
              Choose Username
            </option>
            {usernames.map((username) => (
              <option key={username} name={username}>
                {username}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={inputChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="content"
            placeholder="Description"
            onChange={inputChange}
            value={content}
          ></textarea>
        </div>
        <div className="form-group">
          <DatePicker onChange={dateChange} selected={date} />
        </div>
        <button className="form-btn" onClick={createNote}>
          {editing ? "Update" : "Create"}
        </button>
        <p className="form-message noteMessage"></p>
      </div>
    </div>
  );
}

export default CreateNote;
