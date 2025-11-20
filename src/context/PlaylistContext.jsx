import React, { createContext, useContext, useState, useEffect } from 'react';

const PlaylistContext = createContext();

export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([
        { id: '1', name: 'My Favorites', tracks: [] },
        { id: '2', name: 'Workout Mix', tracks: [] },
    ]);

    const [likedSongs, setLikedSongs] = useState([]);
    const [allTracks, setAllTracks] = useState([]);

    useEffect(() => {
        fetchTracks();
    }, []);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const fetchTracks = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tracks`);
            if (response.ok) {
                const data = await response.json();
                // Add full URL to audio
                const tracksWithUrl = data.map(track => ({
                    ...track,
                    url: `${API_BASE_URL}${track.url}`
                }));
                setAllTracks(tracksWithUrl);
            }
        } catch (error) {
            console.error('Failed to fetch tracks:', error);
        }
    };

    const createPlaylist = (name) => {
        if (playlists.some(p => p.name.toLowerCase() === name.trim().toLowerCase())) {
            return false;
        }
        const newPlaylist = {
            id: Date.now().toString(),
            name: name.trim(),
            tracks: []
        };
        setPlaylists([...playlists, newPlaylist]);
        return true;
    };

    const addToPlaylist = (playlistId, track) => {
        let result = { success: true };
        const newPlaylists = playlists.map(playlist => {
            if (playlist.id === playlistId) {
                // Check if track already exists
                if (playlist.tracks.some(t => t.id === track.id)) {
                    result = { success: false, message: 'This song is already in the playlist.' };
                    return playlist;
                }
                return { ...playlist, tracks: [...playlist.tracks, track] };
            }
            return playlist;
        });

        if (result.success) {
            setPlaylists(newPlaylists);
        }
        return result;
    };

    const deletePlaylist = (playlistId) => {
        setPlaylists(playlists.filter(p => p.id !== playlistId));
    };

    const toggleLike = (track) => {
        if (likedSongs.some(t => t.id === track.id)) {
            setLikedSongs(likedSongs.filter(t => t.id !== track.id));
        } else {
            setLikedSongs([...likedSongs, track]);
        }
    };

    const isLiked = (trackId) => {
        return likedSongs.some(t => t.id === trackId);
    };

    return (
        <PlaylistContext.Provider value={{ playlists, createPlaylist, addToPlaylist, deletePlaylist, likedSongs, toggleLike, isLiked, allTracks }}>
            {children}
        </PlaylistContext.Provider>
    );
};
