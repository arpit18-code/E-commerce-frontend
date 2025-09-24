
export default async function fetchProduct(skip){
   let link = `https://dummyjson.com/products?limit=30&skip=${skip}`
    try {
      let data = await fetch(`${link}`)
      let objectData = await data.json()
      let productsArray = objectData.products
      return productsArray
    } catch (error) {
      console.log('error occured in api call')   
    }
}

