import React, { useState } from 'react';
import { Play, Clock, Heart, Plus } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';
import AddToPlaylistModal from '../components/AddToPlaylistModal';

const LikedSongs = () => {
    const { likedSongs, toggleLike, isLiked } = usePlaylist();
    const { playTrack, currentTrack, isPlaying } = usePlayer();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const handleAddClick = (e, track) => {
        e.stopPropagation();
        setSelectedTrack(track);
        setIsModalOpen(true);
    };

    return (
        <div className="home-container">
            {/* Header */}
            <div className="hero-section" style={{ height: '240px', background: 'linear-gradient(135deg, #5038a0 0%, #8B5CF6 100%)' }}>
                <div className="hero-bg-effect"></div>
                <div className="hero-content playlist-hero-content">
                    <div className="playlist-cover-large" style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                        <Heart size={64} fill="white" color="white" />
                    </div>
                    <div className="playlist-info">
                        <h2 className="hero-subtitle">Playlist</h2>
                        <h1 className="hero-title playlist-title">Liked Songs</h1>
                        <p className="hero-desc playlist-meta">{likedSongs.length} songs</p>
                    </div>
                </div>
            </div>

            {/* Track List */}
            <div className="content-sections">
                <div className="playlist-table-container">
                    {likedSongs.length === 0 ? (
                        <div className="empty-playlist-message">
                            You haven't liked any songs yet. Click the heart icon on songs you love!
                        </div>
                    ) : (
                        <div className="playlist-table">
                            <div className="table-header" style={{ gridTemplateColumns: '3rem 4fr 2fr 3rem 3rem 3rem' }}>
                                <div className="col-index">#</div>
                                <div className="col-title">Title</div>
                                <div className="col-artist">Artist</div>
                                <div className="col-duration"></div>
                                <div className="col-duration"></div>
                                <div className="col-duration"><Clock size={16} /></div>
                            </div>
                            {likedSongs.map((track, index) => {
                                const isCurrent = currentTrack?.id === track.id;
                                return (
                                    <div
                                        key={index}
                                        className={`table-row ${isCurrent ? 'active' : ''}`}
                                        style={{ gridTemplateColumns: '3rem 4fr 2fr 3rem 3rem 3rem' }}
                                        onClick={() => playTrack(track)}
                                    >
                                        <div className="col-index">
                                            {isCurrent && isPlaying ? (
                                                <div className="playing-indicator"></div>
                                            ) : (
                                                <span className="index-number">{index + 1}</span>
                                            )}
                                            <Play size={16} className="play-icon" fill="currentColor" />
                                        </div>
                                        <div className="col-title">
                                            <span className={isCurrent ? 'text-primary' : ''}>{track.title}</span>
                                        </div>
                                        <div className="col-artist">{track.artist}</div>
                                        <div className="col-action flex justify-center items-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleLike(track);
                                                }}
                                                className="text-[#FF5500]"
                                            >
                                                <Heart size={16} fill="#FF5500" />
                                            </button>
                                        </div>
                                        <div className="col-action flex justify-center items-center">
                                            <button
                                                onClick={(e) => handleAddClick(e, track)}
                                                className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <div className="col-duration">3:42</div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <AddToPlaylistModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                track={selectedTrack}
            />
        </div>
    );
};

export default LikedSongs;
