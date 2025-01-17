import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/pages/Sidebar';


interface Profile {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const Profile: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await axios.get('http://localhost:7000/api/profiles');
      setProfiles(response.data);
    };

    fetchProfiles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile = { username, email, firstName, lastName, dateOfBirth };

    // Post the new profile and expect it to return the full profile object
    const response = await axios.post('http://localhost:7000/profiles', newProfile);
    setProfiles([...profiles, response.data]); // Use the response data
    setUsername('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setDateOfBirth('');
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Insert the Sidebar here */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="border p-2 rounded w-full mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Profile
          </button>
        </form>
        <div>
          {profiles.map((profile) => (
            <div key={profile._id} className="border p-4 mb-2 rounded">
              <h2 className="text-xl font-semibold">{profile.username}</h2>
              <p>Email: {profile.email}</p>
              <p>Name: {profile.firstName} {profile.lastName}</p>
              <p>Date of Birth: {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;