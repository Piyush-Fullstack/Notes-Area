import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GrUpdate } from 'react-icons/gr';

const ShowNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/notes/getallnotes',
        { withCredentials: true }
      );
      setNotes(response.data.data || []);
    } catch (error) {
      console.error('Error fetching notes:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-3xl font-bold text-center mb-6">My Notes</h1>

        <div className="bg-white shadow-md rounded-lg p-4">
          
          {loading ? (
            <p className="text-gray-500 text-center">Loading your notes...</p>
          ) : notes.length === 0 ? (
            <>
              <p className="text-gray-600 mb-3 text-center">
                You don't have any notes yet.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/create-note"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md transition"
                >
                  Create One
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {notes.map((notes) => (
                <div
                  key={notes._id}
                  className="border border-gray-200 rounded-md p-3 hover:shadow-md transition relative"
                >
                  <h2 className="font-bold text-lg text-gray-800 mb-1">
                    {notes.title}
                  </h2>

                  <p className="text-gray-600">{notes.content}</p>

                  <div className="absolute top-3 right-3 flex gap-3 text-xl">
                    <Link
                      to={`/update-note/${notes._id}`}
                      className="text-blue-600 hover:text-blue-700 transition"
                    >
                      <GrUpdate />
                    </Link>
                  </div>
                </div>
              ))}

              <div className="flex justify-center mt-6">
                <Link
                  to="/create-note"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md transition"
                >
                  Create New Note
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ShowNotes;
