import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import AdminPage from "./pages/admin";

import './App.css'
import SignUpPage from './pages/signup.tsx';
import TeamPage from './pages/team.tsx';
import AboutPage from './pages/about.tsx';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutPage />} />


        <Route path="*" element={<div>404: Page not found</div>} />
      </Routes>

      <Footer />
  </>
  )
}



export default App
