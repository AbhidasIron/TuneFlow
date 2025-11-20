import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Clock, Heart, Plus } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';
import AddToPlaylistModal from '../components/AddToPlaylistModal';

const PlaylistDetails = () => {
    const { id } = useParams();
    const { playlists, toggleLike, isLiked } = usePlaylist();
    const { playTrack, currentTrack, isPlaying } = usePlayer();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const playlist = playlists.find(p => p.id === id);

    if (!playlist) {
        return <div className="p-8 text-center">Playlist not found</div>;
    }

    const handleAddClick = (e, track) => {
        e.stopPropagation();
        setSelectedTrack(track);
        setIsModalOpen(true);
    };

    return (
        <div className="home-container">
            {/* Header */}
            <div className="hero-section" style={{ height: '240px' }}>
                <div className="hero-bg-effect"></div>
                <div className="hero-content playlist-hero-content">
                    <div className="playlist-cover-large">
                        <span className="playlist-cover-letter">{playlist.name[0]}</span>
                    </div>
                    <div className="playlist-info">
                        <h2 className="hero-subtitle">Playlist</h2>
                        <h1 className="hero-title playlist-title">{playlist.name}</h1>
                        <p className="hero-desc playlist-meta">{playlist.tracks.length} songs</p>
                    </div>
                </div>
            </div>

            {/* Track List */}
            <div className="content-sections">
                <div className="playlist-table-container">
                    {playlist.tracks.length === 0 ? (
                        <div className="empty-playlist-message">
                            This playlist is empty. Add some songs from the Home page!
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
                            {playlist.tracks.map((track, index) => {
                                const isCurrent = currentTrack?.id === track.id;
                                const liked = isLiked(track.id);
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
                                                className={`opacity-0 group-hover:opacity-100 ${liked ? 'opacity-100 text-[#FF5500]' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                <Heart size={16} fill={liked ? "#FF5500" : "none"} />
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

export default PlaylistDetails;
