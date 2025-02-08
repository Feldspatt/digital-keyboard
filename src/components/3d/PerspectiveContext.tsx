import type {ReactNode} from "react";

export function PerspectiveContext ({ children }: { children: ReactNode }) {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '800px',
        }}>
            <div style={{
                transform: 'rotateX(-25deg) rotateY(-25deg)',
                transformStyle: 'preserve-3d'
            }}>
                {children}
            </div>
        </div>
    );
};