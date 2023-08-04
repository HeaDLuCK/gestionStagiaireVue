import axios from "axios"
import authHeader from "./authHeader"

export const stagiaireSelect = () => {
    return axios.get('/authorize/stagiaire/select', { headers: authHeader() })
}

export const profSelect = () => {
    return axios.get('/authorize/professeur/select', { headers: authHeader() })
}

export const matiereSelect = () => {
    return axios.get('/authorize/matiere/select', { headers: authHeader() })
}

export const etablissementSelect = () => {
    return axios.get('/authorize/etablissement/select', { headers: authHeader() })
}

export const stagiaireNumeroGenere = () => {
    return axios.get('/authorize/stagiaire/numerogenere', { headers: authHeader() })

}

export const profNumeroGenere = () => {
    return axios.get('/authorize/professeur/numerogenere', { headers: authHeader() })

}

export const matiereNumeroGenere = () => {
    return axios.get('/authorize/matiere/numerogenere', { headers: authHeader() })

}