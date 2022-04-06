export function imageHostCorrector(imgSrc){
  const total = []
  const articles =  imgSrc.map(prod =>{
         const quantity = prod.quantity
         const price = prod.sellingPrice
         total.push(quantity * price)
        const imageHost =  prod.image.split('').slice(7,21).join('')
       if(imageHost == 'localhost:3000'){
            const imgLocation=prod.image.split('').slice(22).join('')
         const image = `${process.env.BACKEND_URL}/${imgLocation}`;
        return {
            productId: prod.productId,
            sellingPrice:prod.sellingPrice,
            quantity:prod.quantity,
            name:prod.name,
            image,
            total:quantity * price
        }
        
    }
    return prod
   
     })

     return { articles:articles, total:total.reduce((x,y)=>x+y)}
}

