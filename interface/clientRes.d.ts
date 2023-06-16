import { Research } from "../server/src/data/researchInfo"

interface ClientResTemplate {
    query: string
    content: object | null
}

interface ClientResResearchInfo extends ClientResTemplate {
    query: "getResearchInfo"
    content: null
}

interface ClientResCheckValid extends ClientResTemplate {
    query: "checkValid"
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
    ClientResCheckValid |
    ClientResSubmit

export type { ClientRes }