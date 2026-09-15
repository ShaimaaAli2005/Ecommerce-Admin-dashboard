import axiosInstance from './axiosInstance';

// get all products
export const getProducts = async(params)=>{
   try{
    const response = await axiosInstance.get('/products',{params}) 
    return response.data

   }catch (error) {
        console.error("Error fetching products:", error);
        throw error;
   }
}

// search products
export const searchProducts = async(params)=>{
   try{
    const response = await axiosInstance.get('/products/search',{params})
     return response.data
   }catch(error){
    console.error("Error searching products:", error)
    throw error
   }
}

// getProductById
export const getProductById = async(_id)=>{
   try{
    const response = await axiosInstance.get(`/products/${_id}`)
     return response.data
   }catch(error){
    console.error(`Error fetching product with id ${_id}:`, error)
    throw error
   }
}

// create product
export const createProduct = async(productData)=>{
   try{
    const response = await axiosInstance.post('/products',productData)
     return response.data
   }catch(error){
    console.error('Error create product:', error)
    throw error
   }
}

// delete product
export const deleteProduct = async(_id)=>{
   try{
    const response = await axiosInstance.delete(`/products/${_id}`)
     return response.data
   }catch(error){
    console.error(`Error deleting product with id ${_id}:`, error)
    throw error
   }
}

// update product
export const updateProduct = async(_id,productData)=>{
   try{
    const response = await axiosInstance.patch(`/products/update/${_id}`,productData)
     return response.data
   }catch(error){
    console.error(`Error updating product with id ${_id}:`, error)
    throw error
   }
}