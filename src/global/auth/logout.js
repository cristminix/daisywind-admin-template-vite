
import {
	// JWT_FINGERPRINT_COOKIE_NAME,
	// JWT_FINGERPRINT_REFRESH_COOKIE_NAME
	API_BASE_URL
} from "../../config"

import { setJwtToken, setRefreshToken } from '.';

// import {useCookies} from "react-cookie"
// function clearCookie(name, domain=null, path=null){
//     var domain = domain || document.domain;
//     var path = path || "/";
//     document.cookie = name + "=; expires=" + +new Date + "; domain=" + domain + "; path=" + path;
// };

import Prx from "../fn/prx"
import { getJwtToken } from './getJwtToken';
import { getRefreshToken } from './getRefreshToken';

export async function logout(){
	// const [cookies, setCookie, removeCookie] = useCookies([JWT_FINGERPRINT_COOKIE_NAME,JWT_FINGERPRINT_REFRESH_COOKIE_NAME])
	// clearCookie(JWT_FINGERPRINT_COOKIE_NAME)
	// clearCookie(JWT_FINGERPRINT_REFRESH_COOKIE_NAME)
	const token =  getRefreshToken()
	const result = await Prx.post(`${API_BASE_URL}/auth/logout`,token)
	await setJwtToken(null)
  	await setRefreshToken(null)
}