import React, { useState } from 'react';
import { Play, Plus, Heart } from 'lucide-react';
import AddToPlaylistModal from '../components/AddToPlaylistModal';
import { usePlaylist } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const { toggleLike, isLiked, allTracks } = usePlaylist();
    const { playTrack } = usePlayer();

    const playlists = [
        { title: 'Top Hits 2024', desc: 'The hottest tracks right now', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
        { title: 'Chill Vibes', desc: 'Relax and unwind', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' },
        { title: 'Workout Mix', desc: 'Get pumped up', img: 'https://images.unsplash.com/photo-1534258936925-c48947387603?w=300&h=300&fit=crop' },
        { title: 'Focus Flow', desc: 'Instrumental beats', img: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop' },
        { title: 'Indie Gems', desc: 'Undiscovered favorites', img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop' },
    ];

    const handleAddClick = (e, track) => {
        e.stopPropagation();
        setSelectedTrack(track);
        setIsModalOpen(true);
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-bg-effect"></div>
                <div className="hero-content">
                    <h2 className="hero-subtitle">Featured Playlist</h2>
                    <h1 className="hero-title">Orange Summer Vibes</h1>
                    <p className="hero-desc">The perfect soundtrack for sunny days and warm nights. Curated just for you.</p>
                    <div className="hero-buttons">
                        <button className="btn-play">
                            <Play fill="#FF5500" size={20} />
                            Play Now
                        </button>
                        <button className="btn-save">
                            Save to Library
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="content-sections">
                <section>
                    <div className="section-header">
                        <h2 className="section-title">Made For You</h2>
                        <a href="#" className="section-link">Show all</a>
                    </div>

                    <div className="playlist-grid">
                        {playlists.map((item, i) => (
                            <div key={i} className="playlist-card">
                                <div className="card-image-container">
                                    <img src={item.img} alt={item.title} className="card-image" />
                                    <div className="play-overlay">
                                        <button className="play-btn-round">
                                            <Play fill="white" size={20} className="ml-1" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="section-header">
                        <h2 className="section-title">Recently Played</h2>
                        <a href="#" className="section-link">Show all</a>
                    </div>

                    <div className="playlist-grid">
                        {allTracks.length === 0 ? (
                            <div className="p-4 text-gray-500">Loading tracks or no tracks found. Make sure the backend is running!</div>
                        ) : (
                            allTracks.map((track, i) => {
                                const liked = isLiked(track.id);
                                return (
                                    <div
                                        key={i}
                                        className="track-row"
                                        onClick={() => playTrack(track)}
                                    >
                                        <div className="track-art">
                                            <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                                            <div className="track-play-overlay">
                                                <Play fill="white" size={16} className="text-white" />
                                            </div>
                                        </div>
                                        <div className="track-info-row">
                                            <h4 className="track-title-row">{track.title}</h4>
                                            <p className="track-artist-row">{track.artist}</p>
                                        </div>
                                        <button
                                            className={`track-add-btn ${liked ? 'text-[#FF5500]' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleLike(track);
                                            }}
                                        >
                                            <Heart size={16} fill={liked ? "#FF5500" : "none"} />
                                        </button>
                                        <button
                                            className="track-add-btn"
                                            onClick={(e) => handleAddClick(e, track)}
                                        >
                                            <Plus size={16} />
                                        </button>
                                        <span className="track-duration">{track.duration}</span>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </section>
            </div>

            <AddToPlaylistModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                track={selectedTrack}
            />
        </div>
    );
};

export default Home;
