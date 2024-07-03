export function getJwtToken() {
    const token = sessionStorage.getItem("jwt")
    if(token == 'undefined' || token == 'null' || token=='')
        return null
    return token
}