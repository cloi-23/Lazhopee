

export function useJwtToken(){
const token =  typeof window !== 'undefined' ? localStorage.getItem('token') : null
    let config = {
    headers: { 
      Authorization: `Bearer ${token}` 
      }
    }
    return config
}