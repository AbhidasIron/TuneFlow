import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(1); // 0 to 1
    const audioRef = useRef(null);

    const playTrack = (track) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audio = new Audio(track.url);
        audioRef.current = audio;
        audio.volume = volume; // Set initial volume

        audio.play().catch(error => console.error("Playback failed:", error));
        setCurrentTrack(track);
        setIsPlaying(true);

        audio.ontimeupdate = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.onloadedmetadata = () => {
            setDuration(audio.duration);
        };

        audio.onended = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => console.error("Playback failed:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const pauseTrack = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setIsPlaying(false);
    };

    const seek = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const setVolume = (newVolume) => {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        setVolumeState(clampedVolume);
        if (audioRef.current) {
            audioRef.current.volume = clampedVolume;
        }
    };

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    return (
        <PlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlay, pauseTrack, currentTime, duration, seek, volume, setVolume }}>
            {children}
        </PlayerContext.Provider>
    );
};
