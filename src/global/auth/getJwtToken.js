export function getJwtToken() {
    const token = sessionStorage.getItem("jwt")
    if(token == 'undefined')
        return null
    return token
}