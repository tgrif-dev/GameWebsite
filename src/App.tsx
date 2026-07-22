import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import BlogPostPage from './pages/blogPostPage.tsx';

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import DownloadPage from './pages/downloadPage.tsx';
import './App.css'
import BlogPage from './pages/blogPage.tsx';
import TeamPage from './pages/team.tsx';
import AboutPage from './pages/about.tsx';
import NotFoundPage from './pages/notFoundPage.tsx';
import PrivacyPage from './pages/privacyPage.tsx';
import GalleryPage from './pages/galleryPage.tsx';
import AdminPage from './pages/adminPage.tsx';
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <Footer />
  </>
  )
}



export default App
