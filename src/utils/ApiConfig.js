const ApiConfig = (token) => {
    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
}
export default ApiConfig;