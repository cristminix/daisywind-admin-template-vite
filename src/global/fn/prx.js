const getJsonResponse = async (response) => {
  let data = null,
    text = "",
    validJson = false,
    validData = false,
    code = response.status,
    ok = response.ok

  try {
    data = await response.json()
    validJson = true
  } catch (error) {
    text = response.statusText
    // console.log(error)
  }
  return { data, text, ok, code, validJson, validData }
}
const getResponse = async (response) => {
  let data = null,
    text = "",
    validData = false,
    code = response.status,
    ok = response.ok

  try {
    data = await response.text()
    validData = true
  } catch (error) {
    text = response.statusText
    console.log(error)
  }
  return { data, text, ok, code, validData }
}

class Prx {
  static async request(url, method = "get", requestToken = null, formData = null, headers = {}, responseType = "json") {
    return new Promise((resolve, reject) => {
      let defautHeaders = {
        Accept: "application/json",
          "Content-Type": "application/json"
      }
      
      const options = { 
        headers:{
          ...defautHeaders,
          ...headers,
        },
        credentials: "include", 
      }
      if (method) {
        options.method = method.toUpperCase()
      }
      if (formData) {
        options.body =  JSON.stringify(formData)
      }
      if (requestToken) {
        options.headers.Authorization = `Bearer ${requestToken}`
      }
      fetch(url, options)
        .then((response) => {
          if (responseType == "json") {
            getJsonResponse(response).then((jsonResponse) => {
              resolve(jsonResponse)
            })
          } else {
            getResponse(response).then((textResponse) => {
              resolve(textResponse)
            })
          }
        })

        .catch((error) => {
          reject(error)
        })
    })
  }
  static async get(url, requestToken = null, headers = {}, responseType = "json") {
    return await Prx.request(url, "get", requestToken, null, headers, responseType)
  }
  static async post(url, requestToken, formData = null, headers = {}, responseType = "json") {
    return await Prx.request(url, "post", requestToken, formData, headers, responseType)
  }
  static async put(url, requestToken, formData = null, headers = {}, responseType = "json") {
    return await Prx.request(url, "put", requestToken, formData, headers, responseType)
  }
  static async delete(url, requestToken, formData = null, headers = {}, responseType = "json") {
    return await Prx.request(url, "delete", requestToken, formData, headers, responseType)
  }
}

export default Prx