


export function useMonth(){
    const date = new Date()
 
    let  last =`${date.getFullYear()}-${(((date.getMonth()+1) < 10)?"0":"") + (date.getMonth())}-${((date.getDate() < 10)?"0":"") + date.getDate()}`;
    let  now =`${date.getFullYear()}-${(((date.getMonth()+1) < 10)?"0":"") + (date.getMonth()+1)}-${((date.getDate() < 10)?"0":"") + date.getDate()}`;
    return{last,now}
    }
    export function useYear(){
        const date = new Date()
     
        let  last =`${date.getFullYear()-1}-${(((date.getMonth()+1) < 10)?"0":"") + (date.getMonth())}-${((date.getDate() < 10)?"0":"") + date.getDate()}`;
        let  now =`${date.getFullYear()}-${(((date.getMonth()+1) < 10)?"0":"") + (date.getMonth())}-${((date.getDate() < 10)?"0":"") + date.getDate()}`;
        return{last,now}
        }