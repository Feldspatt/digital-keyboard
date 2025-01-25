import type {NotePlayer} from "../model/NotePlayer.ts";

export function CustomNoteInput({note, notePlayer}: {note: Note, notePlayer: NotePlayer}) {
    // biome-ignore lint/a11y/useButtonType: <explanation>
    return (<button onClick={()=> notePlayer.playInstant(note)}>O</button>)
}