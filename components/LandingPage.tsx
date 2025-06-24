'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
const backgrounds = [{ path: '/backgrounds/landing-page-bg.mp4' }, { path: '/backgrounds/landing-page-bg-2.mp4' }, { path: '/backgrounds/landing-page-bg-3.mp4' }, { path: '/backgrounds/landing-page-bg-4.mp4' }];
export default function LandingPage() {
    const [videoPath, setVideoPath] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        setVideoPath(backgrounds[randomIndex].path);

        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);
    if (!videoPath) {
        return <div className="h-screen bg-black" />;
    }
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-12 filter blur-sm scale-110"
            >
                <source src={videoPath} type="video/mp4" />
                Your browser does not support the video tag.

            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />

            <div className={`relative z-20 flex flex-col items-center justify-center h-full text-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-blue-700 drop-shadow-lg mb-8 tracking-wider">
                    Who&apos;s That Pokémon?
                </h1>
                <Link href='/game'>
                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg border-4 border-white transition-colors duration-100"
                    >
                        Guess the Pokémon
                    </button>
                </Link>

            </div>
            <div className="absolute bottom-2 right-4 text-xs text-white/60 dark:text-white/40 z-30">
                © Aryan Srivastava
            </div>
        </div>
    );
}
