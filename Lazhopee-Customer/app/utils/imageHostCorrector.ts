export function imageHostCorretor(imgSrc){
    return imgSrc.map(prod =>{
        const imageHost =  prod.image.split('').slice(7,21).join('')
        if(imageHost == 'localhost:3000'){
          const imgLocation=prod.image.split('').slice(22).join('')
          const image = `${process.env.BACKEND_URL}/${imgLocation}`;
          return{
            ...prod,
            image
          } 
        }
        return prod
      })
}