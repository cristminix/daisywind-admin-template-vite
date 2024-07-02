import { getFingerprint } from '@thumbmarkjs/thumbmarkjs'
import Prx from "../fn/prx"
import { API_BASE_URL } from "../../config"
export const login = async ({ email, password }) => {
	const devId = await getFingerprint()
	const ipaddr = await fetch("https://api.ipify.org?format=json").then(r=>r.json())
	console.log(devId,ipaddr)
	let success = false,
		messages = [],
		result= {success:false,token:null,refreshToken:null}
	try {
		result = await Prx.post(`${API_BASE_URL}/auth/login`, null, {
			email,
			password,
			devId,
			ipaddr:ipaddr.ip
		})
		
		result = result.data
		success = result.success
		
		if (!success) {
			messages.push(result.message)
		}
		else if (result.error) {
			for (const error of result.error.issues) {
				messages.push(error.message)
			}
		}
	} catch (e) {
		messages.push(e.toString())
		console.log(e)
	}

	return {
		success,
		message:messages.join(" "),
		jwtToken : result.token, 
		refreshToken : result.refreshToken
	}
}