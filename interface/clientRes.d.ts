import { Research } from "../server/src/data/researchInfo"

interface ClientResTemplate {
    query: string
    content: object | null
}

interface ClientResResearchInfo extends ClientResTemplate {
    query: "getResearchInfo"
    content: null
}

interface ClientResCheckDone extends ClientResTemplate {
    query: "checkDone"
    content: {
        code: string
    }
}

interface ClientResSubmit extends ClientResTemplate {
    query: "submit"
    content: {
        code: string
        vote: {            
            first: Research[]
            second: Research
        }
    }
}

type ClientRes =
    ClientResResearchInfo |
    ClientResCheckDone |
    ClientResSubmit

export type { ClientRes }