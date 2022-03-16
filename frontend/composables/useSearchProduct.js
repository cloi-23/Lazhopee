const useSearchProduct = async (productList, searchValue) => {
    return productList.filter((src) => {
      const regex = /\s|[-]/g;
  
      const prod = src.name.toLowerCase().split(regex).join("");
      const searchProd = searchValue.toLowerCase().split(regex).join("");
  
      return prod.startsWith(searchProd);
    });
  };
  export default useSearchProduct;
  