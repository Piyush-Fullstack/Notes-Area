import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); 

const UpdateNote = () => {
  const { id } = useParams(); 
  const [note, setNote] = useState({ title: '', content: '' });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [collaborators, setCollaborators] = useState(1);
  const saveTimer = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/notes/getnotebyid/${id}`);
        setNote({ title: response.data.data.title, content: response.data.data.content });
        setLastUpdated(response.data.data.updatedAt);
      } catch (error) {
        console.error('Error fetching note:', error.response?.data || error.message);
      }
    };
    fetchNote();
  }, [id]);

  // Join note room
  useEffect(() => {
    socket.emit('join_note', id);

    // Listen for live updates from other collaborators
    socket.on('note_updated', ({ title, content }) => {
      setNote({ title, content });
      setLastUpdated(new Date().toISOString());
    });

    return () => {
      socket.off('note_updated');
    };
  }, [id]);

  // Handle content change with live updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));

    // Emit changes to other clients
    socket.emit('note_update', { noteId: id, ...note });

    // Auto-save after 5 seconds of inactivity
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(saveNote, 5000);
  };

  // Save note to backend
  const saveNote = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/notes/updatenotebyid/${id}`, note);
      setLastUpdated(response.data.data.updatedAt);
      console.log('Note saved:', response.data);
    } catch (error) {
      console.error('Error saving note:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">{note.title || 'Untitled Note'}</h1>
      <textarea
        name="content"
        value={note.content}
        onChange={handleChange}
        className="w-full max-w-3xl h-[400px] p-4 border rounded-md shadow-md"
        placeholder="Start typing your note..."
      />
      <div className="mt-3 text-gray-600">
        Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}
      </div>
      <div className="mt-1 text-gray-600">
        Active collaborators: {collaborators}
      </div>
    </div>
  );
};

export default UpdateNote;
