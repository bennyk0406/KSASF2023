/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react"
import React, { useState } from "react"
import { Session } from "./Session";

const room = ["형302", "형304", "형306", "형205", "형207"]
const sessionList = {
    first: [
        "B-1", "C-1", "C&M-1", "E&E-1", "P-1",
        "B-2", "C-2", "C&M-2", "E&E-2", "P-2",
        "B-3", "C-3", "C&M-3", "E&E-3", "P-3",
        "B-4", "C-4", "C&M-4", "E&E-4", "P-4",
        "", "", "", "", ""
    ],
    second: [
        "B-5", "C-5", "C&M-5", "E&E-5", "P-5",
        "B-6", "C-6", "C&M-6", "E&E-6", "P-6",
        "B-7", "C-7", "C&M-7", "E&E-7", "P-7",
        "B-8", "C-8", "C&M-8", "", "E&C-1",
        "", "", "", "", "E&C-2"
    ]
}

interface MoveProps {
    content: string
    style: SerializedStyles
    action: () => void
}

const Move: React.FC<MoveProps> = (props) => {
    return (
        <div css={css`
            padding: 7px;
            border-radius: 10px;
            border: 1px solid #00122d;
            transition: background-color 1s, color 1s;
            &:hover {
                border: 1px solid white;
                background-color: white;
                color: #00122d;
            }
            ${props.style}
        `} onClick={props.action}>
            {props.content}
        </div>
    )
}

const Status = () => {
    const [selected, setSelected] = useState<boolean[]>(new Array(25).fill(false))
    const [half, setHalf] = useState<"first" | "second">("first");

    return (
        <div css={css`
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 50px;
        `}>
            <Move
                content="&#9664; First Half"
                action={() => {
                    setHalf("first")
                    setSelected(new Array(25).fill(false))
                }}
                style={css`visibility: ${half === "first" ? "hidden" : "visible"};`}
            />
            <div css={css`
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: 40px repeat(5, 1fr);
                gap: 20px;
            `}>
                {room.map((name) => (
                    <div css={css`
                        display: flex;
                        font-size: 25px;
                        align-items: center;
                        justify-content: center;
                    `}>
                        {name}
                    </div>))}
                {sessionList[half].map((name, i) => 
                    name === "" 
                    ? <div />
                    : <Session name={name} selected={selected[i]} action={() => setSelected(
                        (selected) => {
                            const newSelected = [...selected]
                            newSelected[i] = !newSelected[i]
                            return newSelected
                        }
                    )} />)}
            </div>
            <Move
                content="Second Half &#9654;"
                action={() => {
                    setHalf("second")
                    setSelected(new Array(25).fill(false))
                }}
                style={css`visibility: ${half === "second" ? "hidden" : "visible"};`}
            />
        </div>
    )
}

export { Status }