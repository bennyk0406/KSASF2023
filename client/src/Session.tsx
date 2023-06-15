/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"

interface SessionProps {
    name: string
    action: () => void
    selected: boolean
}

const Session: React.FC<SessionProps> = (props) => {
    return (
        <div css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid black;
            border-radius: 5px;
            width: 150px;
            height: 100px;
            font-size: 25px;
            background-color: ${props.selected ? "#2244f0" : "#fea120"};
            color: ${props.selected ? "white" : "black"};
        `} onClick={props.action}>
            {props.name}
        </div>
    )
}

export { Session }