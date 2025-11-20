import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreatePlaylistModal = ({ isOpen, onClose, onCreate }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (playlistName.trim()) {
            const success = onCreate(playlistName);
            if (success) {
                setPlaylistName('');
                setError('');
                onClose();
            } else {
                setError('A playlist with this name already exists.');
            }
        }
    };

    const handleClose = () => {
        setError('');
        setPlaylistName('');
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Create Playlist</h2>
                    <button onClick={handleClose} className="modal-close-btn">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <input
                            type="text"
                            placeholder="Playlist Name"
                            className={`modal-input ${error ? 'border-red-500' : ''}`}
                            value={playlistName}
                            onChange={(e) => {
                                setPlaylistName(e.target.value);
                                setError('');
                            }}
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={handleClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={!playlistName.trim()}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;
