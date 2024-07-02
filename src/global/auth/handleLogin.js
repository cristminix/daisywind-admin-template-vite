import { setJwtToken } from './setJwtToken';
import { setRefreshToken } from './setRefreshToken';
import { login } from './login';

export async function  handleLogin({ email, password ,callback=f=>f}) {
  // Call login method in API
  // The server handler is responsible for setting user fingerprint cookie during this as well
  const { success,message, jwtToken, refreshToken } = await login({ email, password })
  setJwtToken(jwtToken)
  setRefreshToken(refreshToken)
  console.log({ success,message, jwtToken, refreshToken })
  // If you like, you may redirect the user now
  // Router.push("/some-url")
  callback&&callback(success,message)
}