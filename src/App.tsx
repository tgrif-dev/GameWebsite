import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import BlogPage from './pages/blogPage.tsx';
import BlogPostPage from './pages/blogPostPage.tsx';
import TeamPage from './pages/team.tsx';
import AboutPage from './pages/about.tsx';
import DownloadPage from './pages/downloadPage.tsx';
import GalleryPage from './pages/galleryPage.tsx';
import LeaderboardPage from './pages/leaderboardPage.tsx';
import PrivacyPage from './pages/privacyPage.tsx';
import AdminPage from './pages/adminPage.tsx';
import NotFoundPage from './pages/notFoundPage.tsx';

import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App