const UserDTO = require('../dto/user.dto')

class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    getUsers = async ()=>{
        let result = await this.dao.getUsers()
        return result
    }

    addUser = async (userData) => {
        try {

            const newUser = await this.dao.addUser(userData)

            const { password, ...user } = new UserDTO(newUser)
            return user
        } catch (error) {
            throw error
        }
    }

    /**
     * Method to search a user using the ID or Email user
     * @param {String} userInfo Parameter recives user ID or Email
     * @returns {Promise<Object<<any>> | error } Returns a promise object if the query its ok, return a error if something gone wrong
     */
    findUser = async (userInfo) => {
        try {
            const user = await this.dao.findUser(userInfo)

            if (!user) return null

            const { password, ...nonSensitiveUser } = new UserDTO(user)
            return { password, nonSensitiveUser }
        } catch (error) {
            throw error
        }
    }

    updateUser = async (UID, body) => {
        try {
            const updatedUser = await this.dao.updateUser(UID, body)
            //const { password, ...user } = new UserDTO(updatedUser)
            return updatedUser
        } catch (error) {
            throw error
        }
    }

    updateDocuments = async (uid, documents) => {
        try {
            return await this.dao.updateDocuments(uid, documents)
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteUser = async (uid) => {
        try {
            return this.dao.deleteUser(uid)
        } catch (error) {
            throw error
        }
    }

    changePassword = async ({ email, newPassword }) => {
        try {
            return await this.dao.changePassword({ email, newPassword })
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserRepository