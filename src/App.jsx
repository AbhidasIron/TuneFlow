import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';

import { PlaylistProvider } from './context/PlaylistContext';
import { PlayerProvider } from './context/PlayerContext';
import PlaylistDetails from './pages/PlaylistDetails';
import LikedSongs from './pages/LikedSongs';
import Library from './pages/Library';
import Search from './pages/Search';

function App() {
  return (
    <PlaylistProvider>
      <PlayerProvider>
        <div className="app-container">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/liked-songs" element={<LikedSongs />} />
              <Route path="/playlist/:id" element={<PlaylistDetails />} />
            </Routes>
          </main>

          <BottomNav />
          <Player />
        </div>
      </PlayerProvider>
    </PlaylistProvider>
  );
}

export default App;
