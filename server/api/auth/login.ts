import {useApi} from "../../utils/useApi";
import { FetchError } from 'ofetch'

interface data {
    success: boolean,
    message: string,
    token: string,
    user: user,
}

interface user {
    id: number,
    name: string,
    lastName: string,
    email: string,
    role: number,
    idBranch: number | null,
}
export default defineEventHandler(async (event) => {
    try {
      
        const { email, passwordHash } = await readBody(event);
        
   
        const response = await useApi("/auth", {
            method: 'POST',
            body: {
                email,
                passwordHash,
            },
        })
        console.log(response)
        return response as data
    } catch (error) {
        if (error instanceof FetchError) {
            throw createError({
                statusCode: error.status,
                statusMessage: error.statusText,
                message: error.message,
                data: error.response?._data.data,
            })
        }
        throw createError({
            statusCode: 500,
            message: "Error interno del servidor",
        });
    }
})