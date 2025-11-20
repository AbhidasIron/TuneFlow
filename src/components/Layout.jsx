import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Player from './Player';

const Layout = ({ children }) => {
    const { currentTrack } = usePlayer();
    const isPlayerActive = !!currentTrack;

    return (
        <div className={`app-container ${isPlayerActive ? 'player-active' : ''}`}>
            <Sidebar />

            <main className="main-content">
                {children}
            </main>

            <BottomNav />
            <Player />
        </div>
    );
};

export default Layout;
