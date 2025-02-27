import './PerspectiveContext.css'
import type {ReactNode} from "react";

export function PerspectiveContext ({
    children
}: { children: ReactNode }) {

    return (
        <div className="perspective-context">
            <div className={"perspective-camera"}>
                {children}
            </div>
        </div>
    );
};