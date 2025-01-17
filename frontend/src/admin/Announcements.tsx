import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  date: string;
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await axios.get('http://localhost:7000/api/announcements');
      setAnnouncements(response.data);
    };

    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement = { title, content };

    // Post the new announcement and expect it to return the full announcement object
    const response = await axios.post('http://localhost:7000/api/announcements', newAnnouncement);
    setAnnouncements([...announcements, response.data]); // Use the response data
    setTitle('');
    setContent('');
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar component */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Announcements</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Announcement
          </button>
        </form>
        <div>
          {announcements.map((announcement) => (
            <div key={announcement._id} className="border p-4 mb-2 rounded">
              <h2 className="text-xl font-semibold">{announcement.title}</h2>
              <p>{announcement.content}</p>
              <small>{new Date(announcement.date).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;

                     