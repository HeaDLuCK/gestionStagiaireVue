const authHeader = () => {
    if (localStorage.getItem('token') !== null) {
        return { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    } else {
        return {}
    }
}

export default  authHeader;