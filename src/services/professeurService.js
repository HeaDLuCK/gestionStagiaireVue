import axios from "axios"
import authHeader from "./authHeader"
export const getProfesseurs = () => {
    return axios.get('/authorize/professeur', { headers: authHeader() })
}
export const ajouterProfesseur = (object) => { 
    return axios.post('/authorize/professeur',object, { headers: authHeader() })
}
export const modifierProfesseur = (id, object) => { 
    return axios.put('/authorize/professeur/update',object, { headers: { ...authHeader(), id: id } })
}
export const supprimerProfesseur = (id) => {
    return axios.delete('/authorize/professeur/delete',{ headers: { ...authHeader(), id: id } })
 }