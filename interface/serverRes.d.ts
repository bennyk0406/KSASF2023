import type { Student } from "../server/src/data/studentInfo"

interface ServerResTemplate {
    type: string
    content: object | null
}

interface ServerResResearchInfo extends ServerResTemplate {
    type: "researchInfo"
    content: {
        researchInfo: Research[]
    }
}

interface ServerResCheckValid extends ServerResTemplate {
    type: "checkValid"
    content: {
        result: boolean
        message: null | string
    }
}

interface ServerResSubmit extends ServerResTemplate {
    type: "submit"
    content: {
        result: boolean
    }
}

type ServerRes =
    ServerResResearchInfo |
    ServerResCheckValid |
    ServerResSubmit

export type { ServerRes, ServerResResearchInfo, ServerResCheckValid, ServerResSubmit }