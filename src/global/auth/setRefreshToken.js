export function setRefreshToken(token) {
    const data = sessionStorage.setItem("refreshToken", token)
    if(data=='undefined')
        return null
    return data
}
