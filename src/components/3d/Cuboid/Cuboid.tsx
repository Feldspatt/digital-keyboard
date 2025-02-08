import './Cuboid.css'

interface CuboidProps {
    width?: number;
    height?: number;
    depth?: number;
    className?: string;
    onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// Define custom CSS properties interface
interface CuboidCSSProperties extends React.CSSProperties {
    '--width': string;
    '--height': string;
    '--depth': string;
}

export const Cuboid = ({ width = 300, height = 50, depth = 500, className, onMouseEnter }: CuboidProps) => {
    const cubeStyles: CuboidCSSProperties = {
        '--width': `${width}px`,
        '--height': `${height}px`,
        '--depth': `${depth}px`,
    };

    return (
        <div onMouseEnter={onMouseEnter} className={`solid ${className ?? ''}`}
             style={cubeStyles}>
            <div className={'face front'}/>
            <div className={'face back'}/>
            <div className={'face left'}/>
            <div className={'face right'}/>
            <div className={'face top'}/>
            <div className={'face bottom'}/>
        </div>
    );
};

export default Cuboid;