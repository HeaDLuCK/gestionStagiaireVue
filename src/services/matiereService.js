import axios from "axios"
import authHeader from "./authHeader"

export const getMatieres = () => {
    return axios.get('/authorize/matiere', { headers: authHeader() })
}
export const ajouterMatiere = (object) => {
    return axios.post('/authorize/matiere',object, { headers: authHeader() })
 }
export const modifierMatiere = (id, object) => {
    return axios.put('/authorize/matiere/update',object, { headers: { ...authHeader(), id: id } })
 }
export const supprimerMatiere = (id) => {
    return axios.delete('/authorize/matiere/delete',{ headers: { ...authHeader(), id: id } })
 }