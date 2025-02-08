import './Cuboid.css'

export const Cuboid = ({ width = 300, height = 50, depth = 500 }) => {
    const cubeStyles = {
        '--width': `${width}px`,
        '--height': `${height}px`,
        '--depth': `${depth}px`,
    };

    return (
        <div className="solid"
             style={cubeStyles}>
            <div className={'face front'}>front</div>
            <div className={'face back'}>back</div>
            <div className={'face left'}>left</div>
            <div className={'face right'}>right</div>
            <div className={'face top'}>top</div>
            <div className={'face bottom'}>bottom</div>
        </div>
    );
};

export default Cuboid;