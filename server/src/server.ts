import { resolve } from "path"
import express from "express"
import { ClientRes, ServerRes } from "../../interface"
import { checkDone, researchInfo, vote } from "./data/researchInfo"

const app = express()
app.use(express.static(resolve(__dirname, "../../client/build")))
app.use(express.json())
app.get("*", (_, res) => {
    res.sendFile(resolve(__dirname, "../../client/build/index.html"));
})
app.listen(80, () => {
    console.log("The server has started!")
})

app.post("/api", async (req, res) => {
    const send = (serverRes: ServerRes) => {
        res.json(serverRes)
    }

    const { query, content } = req.body as ClientRes
    if (query === "getResearchInfo") {
        send({
            type: "researchInfo",
            content: {
                researchInfo 
            }
        })
        return
    }
    if (query === "checkDone") {
        const result = await checkDone(content.code)
        send({
            type: "checkDone",
            content: {
                result
            }
        })
        return
    }
    if (query === "submit") {
        vote(content.code, content.vote)
        send({
            type: "submit",
            content: {
                result: true
            }
        })
        return
    }
})