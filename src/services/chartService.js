import axios from "axios"
import authHeader from "./authHeader"

export const pieChartData = () => {
    return axios.get('/authorize/professeur/countstagiaire', { headers: authHeader() })
}

export const barChartData = () => {
    return axios.get('/authorize/professeur/countprof', {headers: authHeader()})
}