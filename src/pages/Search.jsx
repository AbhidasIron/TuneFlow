import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Play, Heart, Clock, Plus } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';
import AddToPlaylistModal from '../components/AddToPlaylistModal';
//const router = express.Router();
//const tracks = require('server/data/tracks');

const Search = () => {
    const [query, setQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const { playTrack, currentTrack, isPlaying } = usePlayer();
    const { toggleLike, isLiked, allTracks } = usePlaylist();

    //const [tracks, setTracks] = useState([]);

    // Mock Data
    const browseCategories = [
        { title: 'Pop', color: '#EF4444' },
        { title: 'Hip-Hop', color: '#F97316' },
        { title: 'Rock', color: '#F59E0B' },
        { title: 'Indie', color: '#10B981' },
        { title: 'R&B', color: '#3B82F6' },
        { title: 'Electronic', color: '#6366F1' },
        { title: 'Latin', color: '#8B5CF6' },
        { title: 'K-Pop', color: '#EC4899' },
    ];

    // useEffect(() => {
    //     const fetchTracks = async () => {
    //         try {
    //             const res = await fetch('http://localhost:3000/api/tracks');
    //             const data = await res.json();
    //             setTracks(data);
    //         } catch (err) {
    //             console.error('Erro fetching tracks:', err);
    //         }
    //     };
    //     fetchTracks();
    // }, []);

//     const mockTracks = [
        
// //         router.get('/tracks', (req, res) => {
// //     res.json(tracks);
// // })
//         // { id: 's1', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
//         // { id: 's2', title: 'As It Was', artist: 'Harry Styles', duration: '2:47' },
//         // { id: 's3', title: 'Levitating', artist: 'Dua Lipa', duration: '3:23' },
//         // { id: 's4', title: 'Peaches', artist: 'Justin Bieber', duration: '3:18' },
//         // { id: 's5', title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35' },
//         // { id: 's6', title: 'Good 4 U', artist: 'Olivia Rodrigo', duration: '2:58' },
//         // { id: 's7', title: 'Kiss Me More', artist: 'Doja Cat', duration: '3:28' },
//         // { id: 's8', title: 'Montero', artist: 'Lil Nas X', duration: '2:17' },
//     ];

    const filteredTracks = allTracks.filter(track =>
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase())
    );

    const handleAddClick = (e, track) => {
        e.stopPropagation();
        setSelectedTrack(track);
        setIsModalOpen(true);
    };

    return (
        <div className="home-container p-8">
            {/* Search Bar */}
            <div className="search-header">
                <div className="search-bar-container">
                    <div className="search-icon-wrapper">
                        <SearchIcon className="search-icon-svg" />
                    </div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="What do you want to listen to?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>
            </div>

            {/* Content */}
            {query === '' ? (
                /* Browse All */
                <div>
                    <h2 className="section-title mb-4">Browse All</h2>
                    <div className="browse-grid">
                        {browseCategories.map((category, index) => (
                            <div
                                key={index}
                                className="browse-card"
                                style={{ backgroundColor: category.color }}
                            >
                                <h3 className="browse-card-title">{category.title}</h3>
                                <div className="browse-card-bg-1"></div>
                                <div className="browse-card-bg-2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* Search Results */
                <div>
                    <h2 className="text-2xl font-bold mb-4">Songs</h2>
                    {filteredTracks.length === 0 ? (
                        <div className="text-gray-500">No results found for "{query}"</div>
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
                            {filteredTracks.map((track, index) => {
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
                                        <div className="col-duration">{track.duration}</div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
            <AddToPlaylistModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                track={selectedTrack}
            />
        </div>
    );
};

export default Search;
