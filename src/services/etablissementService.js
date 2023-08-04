import axios from "axios"
import authHeader from "./authHeader"
export const getEtablissements = () => {
    return axios.get('/authorize/etablissement', { headers: authHeader() })
}
export const ajouterEtablissement = (object) => {
    return axios.post('/authorize/etablissement', object, { headers: authHeader() })
}
export const modifierEtablissement = (id, object) => {
    return axios.put('/authorize/etablissement/update', object, { headers: { ...authHeader(), id: id } })
}
export const supprimerEtablissement = (id) => { 
    return axios.delete('/authorize/etablissement/delete',{ headers: { ...authHeader(), id: id } })
}