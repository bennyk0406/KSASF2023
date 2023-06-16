/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { requestQuery } from "./post"
import { Research, Student } from "../../server/src/data/researchInfo"
import { ServerResCheckValid, ServerResResearchInfo, ServerResSubmit } from "../../interface"

interface QuestionProps {
    children: React.ReactNode
}

const Question: React.FC<QuestionProps> = (props) => {
    return (
        <div css={css`
            padding: 15px 15px;
            border-radius: 10px;
            width: 100%;
            box-sizing: border-box;
            background-color: white;
            color: #00122d;
        `}>
            {props.children}
        </div>
    )
}

interface TitleProps {
    children: string
}

const Title: React.FC<TitleProps> = (props) => {
    return (
        <div css={css`
            display: flex;
            justify-content: start;
            font-size: 17px;
            margin: 0 0 8px;
        `}>
            {props.children}
        </div>
    )
}

interface DescriptionProps {
    children: string
}

const Description: React.FC<DescriptionProps> = (props) => {
    return (
        <div css={css`
            display: flex;
            justify-content: start;
            font-size: 16px;
            color: #2a9ee9;
            margin-bottom: 15px;
        `}>
            {props.children}
        </div>
    )
}

interface OptionContainerProps {
    children: React.ReactNode
}

const OptionContainer: React.FC<OptionContainerProps> = (props) => {
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
        `}>
            {props.children}
        </div>
    )
}

interface OptionProps {
    content: string
    disabled: boolean
    action: () => void
}

const Option: React.FC<OptionProps> = (props) => {
    const [checked, setChecked] = useState(false)

    return (
        <div>
            <label css={css`
                display: flex;
                align-items: center;
                font-family: "a고딕13";
                color: ${props.disabled ? "gray" : "#00122d"};
            `}>
                <div css={css`
                    margin: 0 10px 0 0;
                    height: 100%;
                `}>
                    <input
                        type="checkbox" css={css`display: none; margin: 0;`} disabled={props.disabled}
                        onChange={() => {
                            props.action()
                            setChecked((checked) => !checked)
                        }} />
                    <Checkbox disabled={props.disabled} checked={checked}/>
                </div>
                {props.content}
            </label>
        </div>
    )
}

interface CheckboxProps {
    disabled: boolean
    checked: boolean
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    return (
        <div css={css`
            border: 1.5px solid gainsboro;
            border-radius: 4px;
            width: 16px;
            height: 16px;
            background-color: ${props.disabled ? "gainsboro" : (props.checked ? "#2a9ee9" : "white")};
            ${
                props.checked
                ? `border-color: transparent;
                background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
                background-size: 100% 100%;
                background-position: 50%;
                background-repeat: no-repeat;`
                : ""
            }
        `} />
    )
}

const Form = () => {
    const [searchParams] = useSearchParams()
    const [myCategoryResearchInfo, setMyCategoryResearchInfo] = useState<Research[]>([])
    const [otherCategoryResearchInfo, setOtherCategoryResearchInfo] = useState<Research[]>([])
    const [ownResearchInfo, setOwnResearchInfo] = useState<Research>()
    const [selectedFirst, setSelectedFirst] = useState<boolean[]>([])
    const [selectedSecond, setSelectedSecond] = useState<boolean[]>([])

    const navigate = useNavigate()
    const code = searchParams.get("code")

    useEffect(() => {
        (async () => {
            if (code === null) {
                window.alert("Unknown identification code.")
                navigate("../")
                return
            }
            const res = await requestQuery({
                query: "checkValid",
                content: {
                    code
                }
            }) as ServerResCheckValid
            if (!res.content.result) {
                window.alert(res.content.message)
                navigate("../")
                return
            }
            const serverRes = await requestQuery({
                query: "getResearchInfo",
                content: null
            }) as ServerResResearchInfo
            const researchInfo = serverRes.content.researchInfo
            const ownResearchInfo = researchInfo.find((research: Research) => research.students.some((student: Student) => student.code === code)) as Research
            setOwnResearchInfo(ownResearchInfo)
            const myCategoryResearchInfo = researchInfo.filter((research) => research.category.split("-")[0] === ownResearchInfo.category.split("-")[0])
            setMyCategoryResearchInfo(myCategoryResearchInfo)
            const otherCategoryResearchInfo = researchInfo.filter((student) => student.category.split("-")[0] !== ownResearchInfo.category.split("-")[0])
            setOtherCategoryResearchInfo(otherCategoryResearchInfo)
            setSelectedFirst(new Array(myCategoryResearchInfo.length).fill(false))
            setSelectedSecond(new Array(otherCategoryResearchInfo.length).fill(false))
        })()
    }, [navigate, code])

    const submit = async () => {
        if (selectedFirst.filter((v) => v).length !== 2) {
            window.alert("You must select two from the first question.")
            return
        }
        if (selectedSecond.filter((v) => v).length !== 1) {
            window.alert("You must select one from the second question.")
            return
        }
        const res = await requestQuery({
            query: "submit",
            content: {
                code: code as string,
                vote: {
                    first: selectedFirst.map((_, i) => myCategoryResearchInfo[i]).filter((_, i) => selectedFirst[i]),
                    second: otherCategoryResearchInfo[selectedSecond.findIndex((v) => v)]
                }
            }
        }) as ServerResSubmit
        if (res.content.result) navigate("./result")
    }

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: "Noto Sans KR", sans-serif;
            font-weight: 500;
            max-width: 1000px;
            height: 100%;
            gap: 30px;
            box-sizing: border-box;
        `}>
            <Question>
                <Title>
                    1. Please select your TWO favorite posters from your session.
                </Title>
                <Description>
                    You cannot select yourself or your school's team.
                </Description>
                <OptionContainer>
                    {
                        myCategoryResearchInfo
                            .map((research, i) => (
                                <Option
                                    content={`${research.category}. ${research.name} (from ${research.school})`} disabled={research.school === ownResearchInfo?.school}
                                    action={() => setSelectedFirst((rawSelected) => {
                                        const selected = [...rawSelected]
                                        selected[i] = !selected[i]
                                        return selected
                                    })}
                                />
                            ))

                    }
                </OptionContainer>
            </Question>
            <Question>
                <Title>
                    2. Please select your ONE favorite poster outside of your session.
                </Title>
                <Description>
                    You cannot select yourself or your school's team.
                </Description>
                <OptionContainer>
                    {
                        otherCategoryResearchInfo
                            .map((research, i) => (
                                <Option
                                    content={`${research.category}. ${research.name} (from ${research.school})`} disabled={research.school === ownResearchInfo?.school}
                                    action={() => setSelectedSecond((rawSelected) => {
                                        const selected = [...rawSelected]
                                        selected[i] = !selected[i]
                                        return selected
                                    })}
                                />
                            ))

                    }
                </OptionContainer>
            </Question>
            <div css={css`
                width: 100%;
                display: flex;
                justify-content: end;
            `}>
                <div css={css`
                    border-radius: 10px;
                    width: 100px;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: white;
                    color: #00122d;
                    font-size: 19px;
                    margin-bottom: 30px;
                `} onClick={submit}>
                    Submit
                </div>
            </div>
        </div>
    )
}

export { Form }