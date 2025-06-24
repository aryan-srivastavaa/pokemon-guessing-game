// app/game/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { FiRotateCcw } from 'react-icons/fi';
import Link from 'next/link';
import * as THREE from 'three';

const pokemons = [
    'charmander', 'eevee', 'bulbasaur', 'haunter',
    'jigglypuff', 'snorlax', 'magikarp', 'mew', 'pikachu',
    'poliwag', 'squirtle'
];

function PokemonModel({ name }: { name: string }) {
    const { scene } = useGLTF(`/models/${name}.glb`);
const ref = useRef<THREE.Group | null>(null);
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.005;
        }
    });
    return <primitive ref={ref} object={scene} scale={3} position={[0, -1, 0]} />;
}

export default function GamePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [result, setResult] = useState('');
    const [showPokemon, setShowPokemon] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;
    const handleGuess = () => {
        if (input.toLowerCase().trim() === pokemons[currentIndex]) {
            setScore((prev) => prev + 1);
            setResult('✅ Correct!');
        } else {
            setResult('❌ Wrong!');
        }
        setTimeout(() => {
            setInput('');
            setResult('');
            setShowPokemon(false);
            setCurrentIndex((prev) => prev + 1);
            setTimeout(() => setShowPokemon(true), 500);
        }, 1500);
    };

    if (currentIndex >= pokemons.length) {
        return (
            <div className="h-screen w-full relative overflow-hidden">
                {/* Blurred video background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-15 filter blur-sm scale-110"
                >
                    <source src="/backgrounds/game-over.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="relative z-20 flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl font-bold text-white dark:text-white animate-bounce transition-all duration-700 ease-in-out">
                        🎉 Game Over!
                    </h1>
                    <p className="text-2xl mt-4 text-white dark:text-white animate-fadeInUp animation-delay-700">
                        Your Score: {score} / {pokemons.length}
                    </p>

                    <Link href="/">
                        <button className="mt-8 flex items-center gap-2 cursor-pointer bg-white text-black px-6 py-2 rounded-full text-lg font-medium shadow-md hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-transform duration-300">
                            <FiRotateCcw className="text-xl" />
                            Retry
                        </button>
                    </Link>
                </div>
                <div className="absolute bottom-2 right-4 text-xs text-white/60 dark:text-white/40 z-30">
                    © Aryan Srivastava
                </div>
            </div>

        );
    }

    return (
        <div className="h-screen w-full relative overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-11 filter blur-sm scale-110"
            >
                <source src="/backgrounds/game-page-bg-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full">
                <div className="w-full h-[60vh]">
                    <Canvas className='cursor-pointer' camera={{ position: [0, 0, 6] }}>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[0, 0, 5]} />
                        <Suspense fallback={null}>
                            {showPokemon && <PokemonModel name={pokemons[currentIndex]} />}
                            <OrbitControls minDistance={4} maxDistance={10} />
                        </Suspense>
                    </Canvas>
                </div>
                <div className="mt-6 w-full max-w-md px-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                        placeholder="Enter Pokémon name"
                        className="w-full p-3 border-2 border-gray-500 rounded-lg focus:outline-none text-gray-300 focus:border-blue-500 text-center text-lg"
                    />
                    <p className="mt-4 text-xl font-semibold text-center text-white">{result}</p>
                    <p className="mt-2 text-center text-sm text-gray-100">Score: {score} / {pokemons.length}</p>
                </div>
            </div>
            <div className="absolute bottom-2 right-4 text-xs text-white/60 dark:text-white/40 z-30">
                © Aryan Srivastava
            </div>
        </div>
    );
}

// Ensure the .glb files are stored in /public/models/ directory.
// And video background is located in /public/backgrounds/
