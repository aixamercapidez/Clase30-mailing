const { ticketModel } = require("./model/ticket.model")

class TicketManagerMongo {

    newTicket = async (ticket) => {
        try {
            return await ticketModel.create(ticket)
        } catch (error) {
            throw error
        }
    }
}

module.exports = TicketManagerMongo