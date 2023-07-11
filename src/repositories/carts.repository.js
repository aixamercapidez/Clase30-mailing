

class CartRepository {
    constructor(dao){
        this.dao = dao
    }

    getCarts = async ()=>{
        let result = await this.dao.getCarts()
        return result
    }
    getCartById = async (cid)=>{
        let result = await this.dao.getCartById(cid)
        return result
    }
    addCart = async (newCart)=>{
       
        let result = await this.dao.addCart(newCart)
        return result
    }
    addProduct = async (cid,pid)=>{
       
        let result = await this.dao.addProduct(cid,pid)
        return result
    }
    deleteProduct = async (cid,pid)=>{
       
        let result = await this.dao.deleteProduct(cid,pid)
        return result
    }
    deleteCart = async (cid)=>{
       
        let result = await this.dao.deleteCart(cid)
        return result
    }
    UpdateCart = async (cid, updatecart)=>{
       
        let result = await this.dao.UpdateCart(cid, updatecart)
        return result
    }
    Updatequantity = async (cid, pid, quantity)=>{
       
        let result = await this.dao.Updatequantity(cid, pid, quantity)
        return result
    }
}

module.exports = CartRepository
