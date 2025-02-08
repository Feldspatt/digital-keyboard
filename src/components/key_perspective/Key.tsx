import Cuboid from '../3d/Cuboid/Cuboid';
import './KeyboardKey.css';

const KeyboardKey = ({onMouseEnter, color}: {onMouseEnter: ()=>void, color: 'white' | 'black'}) => {

    return (<Cuboid width={100} height={25} depth={200}   onMouseEnter={onMouseEnter} className="key-cube"/>)
};

export default KeyboardKey;
