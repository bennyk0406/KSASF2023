/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Logo from "./assets/logo.svg"

const FormResult = () => {
    return (
        <div css={css`
            font-size: 20px;
            text-align: center;
            display: flex;
            flex-direction: column;
        `}>
            Thank you for taking the time to complete the survey. Enjoy KSASF!
        </div>
    )
}

export { FormResult }