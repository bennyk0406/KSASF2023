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

interface ServerResCheckDone extends ServerResTemplate {
    type: "checkDone"
    content: {
        result: boolean
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
    ServerResCheckDone |
    ServerResSubmit

export type { ServerRes, ServerResResearchInfo, ServerResCheckDone, ServerResSubmit }