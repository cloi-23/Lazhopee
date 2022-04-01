import { tokenJWT } from '../store/token'
import { storeToRefs } from 'pinia';

export function useJwtToken(){
const myToken = tokenJWT()
const { token } = storeToRefs(myToken)
    let config = {
    headers: { 
      Authorization: `Bearer ${token.value}` 
      }
    }
    return config
}