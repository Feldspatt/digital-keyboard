import './KeyboardKey.css';

const KeyboardKey = ({onMouseEnter, color}: {onMouseEnter: ()=>void, color: 'white' | 'black'}) => {

    return (
        <div className={`keyboard-key ${color === 'white'? 'white-key': 'black-key'}`}>
            <div  onMouseEnter={onMouseEnter} className="key-cube">
                <div className="key-face front"/>
                <div className="key-face back"/>
                <div className="key-face left"/>
                <div className="key-face right"/>
                <div className="key-face top"/>
                <div className="key-face bottom"/>
            </div>
        </div>
    );
};

export default KeyboardKey;
