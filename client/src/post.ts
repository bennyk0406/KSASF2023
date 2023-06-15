import type { ClientRes, ServerRes } from '../../interface'

const requestQuery = async (clientRes: ClientRes): Promise<ServerRes> => {
    const response = await fetch('http://localhost/api/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientRes)
    })
    const data = await response.json() as ServerRes
    return data
}

export { requestQuery }