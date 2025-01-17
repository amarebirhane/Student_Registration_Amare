import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Announcements from './pages/Announcements';
import Attendance from './pages/Attendance';
import Assignments from './pages/Assignments';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import Library from './pages/Library';

import PerformanceRecords from './pages/PerformanceRecords';
import CourseList from './course/CourseList';
import AddCourse from './course/AddCourse';
import ForgotPassword from './components/ForgotPassword';
import ProfileUpdate from './pages/ProfileUpdate';


function App() {

  return (
    <>
  <Router>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/signup" element={<Signup/>} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/Announcements" element={<Announcements/>} />
          <Route  path="/attendance" element={<Attendance/>} />
          <Route  path="/assignments" element={<Assignments/>} />
          <Route  path="/exams" element={<Exams/>} />
          <Route  path="/performance" element={<PerformanceRecords/>} />
          <Route  path="/library" element={<Library/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course-list" element={<CourseList />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/profileUpdate" element={<ProfileUpdate />} />
          <Route path="/ForgotPassword" element={<ForgotPassword/>} />
    
        </Routes>
     
</Router>
    </>
  )
}

export default App
