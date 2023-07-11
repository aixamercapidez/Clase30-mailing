

class ProductRepository {
    constructor(dao){
        this.dao = dao
    }

    getProducts = async ()=>{
        let result = await this.dao.getProducts()
        return result
    }
    getProductById = async (pid)=>{
        let result = await this.dao.getProductById(pid)
        return result
    }
    addProduct = async (newProduct)=>{
       
        let result = await this.dao.addProduct(newProduct)
        return result
    }
    updateProduct = async (pid,updateProduct)=>{
       
        let result = await this.dao.addProduct(pid,updateProduct)
        return result
    }
    deleteProduct = async (pid)=>{
       
        let result = await this.dao.deleteProduct(pid)
        return result
    }
}

module.exports = ProductRepository
