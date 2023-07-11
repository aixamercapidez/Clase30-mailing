

class ticketRepository {
    // createTicket = async (newTicket)=>{
       
    //     let result = await this.dao.createTicket(newTicket)
    //     return result
    // }

    constructor(dao) {
        this.dao = dao
    }
    newTicket = async (code1, total, userEmail) => {
        try {
            return await this.dao.newTicket({ code:code1, amount: total, purchaser: userEmail })
        } catch (error) {
            throw error
        }

    }

}

module.exports = ticketRepository
