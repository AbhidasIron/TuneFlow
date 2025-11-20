import React, { useState } from 'react';
import { Home, Search, Library, Plus, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePlaylist } from '../context/PlaylistContext';
import CreatePlaylistModal from './CreatePlaylistModal';

const Sidebar = () => {
  const location = useLocation();
  const { playlists, createPlaylist } = usePlaylist();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`nav-item ${isActive ? 'active' : ''}`}
      >
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              T
            </div>
            <span className="logo-text">TuneFlow</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/search" icon={Search} label="Search" />
          <NavItem to="/library" icon={Library} label="Your Library" />

          <div className="playlist-header">
            <span>Playlists</span>
          </div>

          <button className="nav-button" onClick={() => setIsModalOpen(true)}>
            <div className="icon-box">
              <Plus size={14} />
            </div>
            <span>Create Playlist</span>
          </button>

          <Link to="/liked-songs" className="nav-button">
            <div className="icon-box gradient-heart">
              <Heart size={12} fill="white" />
            </div>
            <span>Liked Songs</span>
          </Link>

          <div className="playlist-list">
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  <Link to={`/playlist/${playlist.id}`} className="playlist-link">
                    {playlist.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createPlaylist}
      />
    </>
  );
};

export default Sidebar;
