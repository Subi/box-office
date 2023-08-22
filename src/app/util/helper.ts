export interface IOptions {
    method: string
    headers: {
        accept:string
        authorization:string 
    }
}

export const createOpts = (method:string):IOptions => {
    return {
        "method": method,
        "headers": {
            "accept": 'application/json',
            "authorization": `Bearer ${process.env.ACCESS_TOKEN}`
        }
    }
}