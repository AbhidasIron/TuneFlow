import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Volume1, VolumeX, Heart, Mic2, ListMusic, MonitorSpeaker } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';

const Player = () => {
    const { currentTrack, isPlaying, togglePlay, currentTime, duration, seek, volume, setVolume } = usePlayer();
    const { toggleLike, isLiked } = usePlaylist();

    if (!currentTrack) {
        return null; // Or render a placeholder/minimized player
    }

    const liked = isLiked(currentTrack.id);

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSeek = (e) => {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = x / width;
        const newTime = percentage * duration;
        seek(newTime);
    };

    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="player-bar">
            {/* Track Info */}
            <div className="track-info">
                <div className="album-art">
                    <div className="album-art-placeholder"></div>
                </div>
                <div className="track-details">
                    <a href="#" className="track-name">{currentTrack.title}</a>
                    <a href="#" className="artist-name">{currentTrack.artist}</a>
                </div>
                <button
                    className={`like-button ${liked ? 'text-[#FF5500]' : ''}`}
                    onClick={() => toggleLike(currentTrack)}
                >
                    <Heart size={18} fill={liked ? "#FF5500" : "none"} />
                </button>
            </div>

            {/* Controls */}
            <div className="player-controls">
                <div className="control-buttons">
                    <button className="control-btn secondary">
                        <Shuffle size={18} />
                    </button>
                    <button className="control-btn">
                        <SkipBack size={22} fill="currentColor" />
                    </button>
                    <button
                        className="play-pause-btn"
                        onClick={togglePlay}
                    >
                        {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-0.5" />}
                    </button>
                    <button className="control-btn">
                        <SkipForward size={22} fill="currentColor" />
                    </button>
                    <button className="control-btn secondary">
                        <Repeat size={18} />
                    </button>
                </div>

                <div className="progress-container">
                    <span className="time">{formatTime(currentTime)}</span>
                    <div className="progress-bar-wrapper" onClick={handleSeek}>
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                        <div
                            className="progress-handle"
                            style={{ left: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <span className="time">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume & Extras */}
            <div className="volume-controls">
                <button className="extra-btn">
                    <Mic2 size={18} />
                </button>
                <button className="extra-btn">
                    <ListMusic size={18} />
                </button>
                <button className="extra-btn">
                    <MonitorSpeaker size={18} />
                </button>
                <div className="volume-slider-container">
                    {volume === 0 ? (
                        <VolumeX size={18} className="volume-icon" onClick={() => setVolume(1)} />
                    ) : volume < 0.5 ? (
                        <Volume1 size={18} className="volume-icon" onClick={() => setVolume(0)} />
                    ) : (
                        <Volume2 size={18} className="volume-icon" onClick={() => setVolume(0)} />
                    )}
                    <div
                        className="volume-slider"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const width = rect.width;
                            const newVolume = x / width;
                            setVolume(newVolume);
                        }}
                    >
                        <div
                            className="volume-fill"
                            style={{ width: `${volume * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
