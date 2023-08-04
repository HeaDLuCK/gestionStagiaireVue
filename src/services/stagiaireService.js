import axios from "axios"
import authHeader from "./authHeader"

export const getStagiaires = () => {
    return axios.get('/authorize/stagiaire', { headers: authHeader() })
}
export const ajouterStagiaire = (object) => {
    return axios.post('/authorize/stagiaire', object, { headers: authHeader() })
}
export const modifierStagiaire = (id, object) => {
    
    return axios.put('/authorize/stagiaire/update', object, { headers: { ...authHeader(), id: id } })
}
export const supprimerStagiaire = (id) => {
    return axios.delete('/authorize/stagiaire/delete', { headers: { ...authHeader(), id: id } })
}