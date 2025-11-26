import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateNote = () => {
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/notes/create-note",
        note,
        { withCredentials: true }
      );

      console.log("Note Created:", response.data);
      navigate('/show-notes');

    } catch (error) {
      console.error("Error creating note:", error.response?.data || error.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-indigo-100 flex justify-center items-center">
      <div className="bg-indigo-200 w-[450px] rounded-lg p-5 shadow-lg">
        
        <h1 className="text-indigo-700 text-center font-extrabold text-3xl mb-4">
          Create Note
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            className="border rounded-md outline-indigo-600 p-2 w-full"
            value={note.title}
            onChange={handleChange}
          />

          <textarea
            name="content"
            placeholder="Enter content"
            className="border rounded-md outline-indigo-600 p-2 w-full h-[200px]"
            value={note.content}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-indigo-500 rounded-md w-[130px] text-white p-2
              hover:bg-indigo-600 transition mx-auto"
          >
            Create Note
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateNote;
