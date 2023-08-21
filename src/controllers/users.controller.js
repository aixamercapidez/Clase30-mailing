const {userModel} = require('../dao/mongo/model/user.model')

const { UserService } = require("../service/index");//

class UserController {
updateRol = async (req, res, next) => {
    try {
        
        const { params: { UID } } = req
        
        const  nonSensitiveUser  = await userModel.findById(UID)
        console.log(nonSensitiveUser)
        if (!nonSensitiveUser) {
            throw new Error("User doesn't exists")
        }

        if (nonSensitiveUser.role == "user"){
            
            nonSensitiveUser.role = "premium"
            const newRole = await UserService.updateUser(UID, nonSensitiveUser)
        }
        if (nonSensitiveUser.role == "premium"){
            
            nonSensitiveUser.role = "user"
            const newRole = await UserService.updateUser(UID, nonSensitiveUser)
        }

        

        //nonSensitiveUser.role == "user" ? nonSensitiveUser.role = "premium" : nonSensitiveUser.role === "premium" ? nonSensitiveUser.role = "user" : null
        const newRole = await UserService.updateUser(UID, nonSensitiveUser)

        res.status(200).send(newRole)
        console.log("usuario cambiado correctamente")
    } catch (error) {
       console.log("error")
    }
}
}
module.exports= new UserController()