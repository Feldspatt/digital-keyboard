import type {CSSProperties} from "react";
import './PerspectiveContext.css'

// Custom perspective properties
interface PerspectiveProps {
    rotX?: number;  // Rotation X in degrees
    rotY?: number;  // Rotation Y in degrees
    rotZ?: number;  // Rotation Z in degrees
    transX?: number; // Translation X in pixels
    transY?: number; // Translation Y in pixels
    transZ?: number; // Translation Z in pixels
    scale?: number;  // Scale factor
}

// Default values for perspective properties
export const DEFAULT_PERSPECTIVE: Required<PerspectiveProps> = {
    rotX: -45,
    rotY: 0,
    rotZ: 0,
    transX: 0,
    transY: 300,
    transZ: -200,
    scale: 1,
};

// Utility type to convert perspective props to transform string
export const perspectiveToTransform = (props: Partial<PerspectiveProps>): string => {
    const _ = { ...DEFAULT_PERSPECTIVE, ...props }

    return [
        `rotateX(${_.rotX}deg)`,
        `rotateY(${_.rotY}deg)`,
        `rotateZ(${_.rotZ}deg)`,
        `translate3d(${_.transX}px, ${_.transY}px, ${_.transZ}px)`,
        `scale(${_.scale})`,
    ].join(' ');
};

// Combined type for component props
export interface PerspectiveContextProps extends Omit<CSSProperties, 'transform'> {
    children: React.ReactNode;
    className?: string;
    duration?: number; // Animation duration in milliseconds
    easing?: string;  // CSS easing function
    perspectiveProps?:  PerspectiveProps
}

export function PerspectiveContext ({
    children,
    duration = 1000,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    perspectiveProps
}: PerspectiveContextProps) {
    const combinedStyle: CSSProperties = {
        transform: perspectiveToTransform(perspectiveProps ?? {}),
        transition: `transform ${duration}ms ${easing}`,
    }

    return (
        <div className="perspective-context">
            <div className={"perspective-camera"} style={combinedStyle}>
                {children}
            </div>
        </div>
    );
};