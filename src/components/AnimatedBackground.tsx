import { useEffect, useRef } from 'react';
import { NeatGradient } from "@firecms/neat";

type NeatConfig = {
    colors: Array<{
        color: string;
        enabled: boolean;
    }>;
    speed: number;
    horizontalPressure: number;
    verticalPressure: number;
    waveFrequencyX: number;
    waveFrequencyY: number;
    waveAmplitude: number;
    shadows: number;
    highlights: number;
    colorBrightness: number;
    colorSaturation: number;
    wireframe: boolean;
    colorBlending: number;
    backgroundColor: string;
    backgroundAlpha: number;
    grainScale: number;
    grainSparsity: number;
    grainIntensity: number;
    grainSpeed: number;
    resolution: number;
    showCredit: boolean;
}

function NeatBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const config: NeatConfig = {
            colors: [
                {
                    color: '#FF5772',
                    enabled: true,
                },
                {
                    color: '#4CB4BB',
                    enabled: true,
                },
                {
                    color: '#FFC600',
                    enabled: true,
                },
                {
                    color: '#8B6AE6',
                    enabled: true,
                },
                {
                    color: '#2E0EC7',
                    enabled: true,
                },
            ],
            speed: 2,
            horizontalPressure: 3,
            verticalPressure: 4,
            waveFrequencyX: 2,
            waveFrequencyY: 3,
            waveAmplitude: 5,
            shadows: 1,
            highlights: 5,
            colorBrightness: 1,
            colorSaturation: 7,
            wireframe: false,
            colorBlending: 8,
            backgroundColor: '#003FFF',
            backgroundAlpha: 1,
            grainScale: 2,
            grainSparsity: 0.02,
            grainIntensity: 0.2,
            grainSpeed: 1,
            resolution: 1,
            showCredit: false
        };

        if (canvasRef.current) {
            const neat = new NeatGradient({
                ref: canvasRef.current,
                ...config
            });

            const handleResize = () => {
                if (canvasRef.current) {
                    canvasRef.current.width = window.innerWidth;
                    canvasRef.current.height = window.innerHeight;
                }
            };
            
            window.addEventListener('resize', handleResize);
            handleResize();

            return () => {
                neat.destroy();
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1
            }}
        />
    );
}

export default NeatBackground;
