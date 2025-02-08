import Cuboid from "./Cuboid/Cuboid.tsx";

export function PerspectiveContext () {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1000px'
        }}>
            <div style={{
                transform: 'rotateX(-20deg) rotateY(45deg)',
                transformStyle: 'preserve-3d'
            }}>
                <Cuboid width={60} height={20} depth={200} />
            </div>
        </div>
    );
};