import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Play, Music } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';

const Library = () => {
    const { playlists, likedSongs } = usePlaylist();

    return (
        <div className="home-container p-8">
            <h1 className="text-3xl font-bold mb-8">Your Library</h1>

            <div className="playlist-grid">
                {/* Liked Songs Card */}
                <Link to="/liked-songs" className="playlist-card group relative overflow-hidden bg-gradient-to-br from-[#5038a0] to-[#8B5CF6] !p-0">
                    <div className="h-full flex flex-col justify-end p-6 relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-2">Liked Songs</h3>
                        <p className="text-white/80 font-medium">{likedSongs.length} liked songs</p>
                        <div className="play-overlay" style={{ opacity: 1, transform: 'translateY(0)', bottom: '1.5rem', right: '1.5rem' }}>
                            <button className="play-btn-round bg-[#FF5500] group-hover:scale-105 transition-transform">
                                <Play fill="white" size={20} className="ml-1" />
                            </button>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <Heart size={120} className="absolute -bottom-4 -right-4 text-white/10 rotate-12" fill="currentColor" />
                </Link>

                {/* User Playlists */}
                {playlists.map((playlist) => (
                    <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="playlist-card">
                        <div className="card-image-container bg-gray-100 flex items-center justify-center">
                            {playlist.tracks.length > 0 ? (
                                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                                    <Music size={48} className="text-orange-300" />
                                </div>
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <Music size={48} className="text-gray-300" />
                                </div>
                            )}
                            <div className="play-overlay">
                                <button className="play-btn-round">
                                    <Play fill="white" size={20} className="ml-1" />
                                </button>
                            </div>
                        </div>
                        <h3 className="card-title">{playlist.name}</h3>
                        <p className="card-desc">By You</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Library;
