import Prx from "../fn/prx"
import { API_BASE_URL } from "../../config"
import { getRefreshToken } from './getRefreshToken';
import { setJwtToken } from './setJwtToken';

export async function updateToken(){
    const refreshToken = getRefreshToken()

	const result = await Prx.post(`${API_BASE_URL}/auth/refresh`,refreshToken,null)
	setJwtToken(result.data.token)
	console.log(result)
}