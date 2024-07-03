export function getRefreshToken() {
    const token = sessionStorage.getItem("refreshToken")
    if( token == 'undefined'|| token == 'null'||token=='')
        return null
    return token
}