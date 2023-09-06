const { userModel } = require("./model/user.model");

class UserManager {

    addUser = async (data) => {
        try {
            return await userModel.create(data)
        } catch (error) {
            if (error) {
                throw error
            }
        }
    }

    async getUsers() {
        try {
            return await userModel.find({})
        } catch (err) {
            return new Error(err)
        }
    }

    changePassword = async ({ email, newPassword }) => {
        try {
            return await userModel.findOneAndUpdate({ email }, { $set: { password: newPassword } })
        } catch (error) {
            return `ERROR: ${error}`
        }
    }

    findUser = async (id) => {
        try {
            if (id.includes('@')) return await userModel.findOne({ email: id })//Si el ID contiene un @ es porque es un email y efectua la busqueda por email
            return await userModel.findById(id).lean()//Si no, efectua la busqueda por ID del usuario.
        } catch (error) {
            return `ERROR: ${error}`
        }
    }

    updateUser = async (id, body) => {
        try {
            return await userModel.findOneAndUpdate({ _id: id }, { $set: body })
        } catch (error) {
            throw error
        }
    }

    updateDocuments = async (id, newDocs) => {
        try {
            return await userModel.findByIdAndUpdate(id, { $push: { documents: { $each: newDocs } } })
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteUser = async (uid) => {
        try {
            return await userModel.findOneAndDelete({ _id: uid })
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserManager