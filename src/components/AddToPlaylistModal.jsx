import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';

const AddToPlaylistModal = ({ isOpen, onClose, track }) => {
    const { playlists, addToPlaylist } = usePlaylist();
    const [error, setError] = useState('');

    if (!isOpen || !track) return null;

    const handleSelect = (playlistId) => {
        const result = addToPlaylist(playlistId, track);
        if (result && !result.success) {
            setError(result.message);
        } else {
            setError('');
            onClose();
        }
    };

    const handleClose = () => {
        setError('');
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Add to Playlist</h2>
                    <button onClick={handleClose} className="modal-close-btn">
                        <X size={24} />
                    </button>
                </div>
                <div className="modal-body">
                    <p className="modal-subtitle">Select a playlist to add <strong>{track.title}</strong></p>
                    {error && <div className="p-3 mb-3 bg-red-50 text-red-500 text-sm rounded border border-red-500">{error}</div>}
                    <ul className="modal-list">
                        {playlists.map((playlist) => (
                            <li key={playlist.id}>
                                <button
                                    className="modal-list-item"
                                    onClick={() => handleSelect(playlist.id)}
                                >
                                    <div className="modal-list-icon">
                                        <Plus size={16} />
                                    </div>
                                    <span>{playlist.name}</span>
                                    <span className="modal-list-count">{playlist.tracks.length} songs</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddToPlaylistModal;
