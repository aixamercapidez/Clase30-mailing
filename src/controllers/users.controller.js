const { userModel } = require('../dao/mongo/model/user.model')

const { UserService } = require("../service/index");//
const sendMail = require('../utils/sendmail')
class UserController {
    getUsers = async (req, res) => {
        try {
            //const users = await UserService.getUsers()

            const { page = 1 } = req.query
            const { limit = 10 } = req.query
            const { category } = req.query
            const { status } = req.query
            const { sort } = req.query
            let sortOptions
            if (sort === 'asc') {

                sortOptions = { price: 1 };

            } else if (sort === 'desc') {

                sortOptions = { price: -1 };

            }

            let query = {}
            if (category) {
                query = { category: category }
            }
            if (status) {
                query = { status: status }
            }

            let users = await userModel.paginate(query, { limit: limit, page: page, lean: true, sort: sortOptions })

            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = users






            res.render('users', {
                status: 'success',
                users: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,

            })
            // res.status(200).send({
            //     status: 'success',
            //     payload: users
            // })




        } catch (error) {
            console.log("error")
        }
    }

    updateUser = async (id, body) => {
        try {
            return await userModel.findOneAndUpdate({ _id: id }, { $set: body }, { returnDocument: "after" })
        } catch (error) {
            throw error
        }
    }
    deleteUsers = async (req, res, next) => {
        try {
            const normalizedUsers = await UserService.getUsers()
            console.log(normalizedUsers)
            const usersToDelete = normalizedUsers.filter((user) => {
                const userconect = user.last_connection
                const splitedLast_Connection = userconect.split(",")
                const last_connectionDate = splitedLast_Connection[0].split("/").reverse().join("-")
                const last_connection = last_connectionDate.concat(splitedLast_Connection[1])

                /*Para los días*/
                // const userLastConnectionDate = new Date(last_connection)
                // const days = 1000 * 60 * 60 * 24
                const userLastConnectionHour = new Date(last_connection)
               
                const actualHour = new Date()
                //const userLastConnectionHour = new Date(userconect)



                console.log(actualHour)
                console.log(userconect)
                console.log(userLastConnectionHour)

                const minutes = 1000 * 60
                let resultado = ((actualHour - userLastConnectionHour) / minutes) >= 30
                console.log(resultado)

                return parseInt((actualHour - userLastConnectionHour) / minutes) >= 30
            })
            const HTML = `<p>Your account was been deleted for inactivity</p>`

            usersToDelete.forEach(async user => {
                let email = user.email
                let user1 = await userModel.findOne({email})
                const UID = user1._id.toString()
                await UserService.deleteUser(UID)
                sendMail(user.email, "inactivity", HTML)
            });

            res.send('Users deleted')
        } catch (error) {
            next(error)
        }
    }
    deleteUser = async (req, res, next) => {
        try {
            //extrae el UID de los params
            
            const { UID } = req.params
            

            //Valida que el UID sea un objectID válido
            
            const deleted = await UserService.deleteUser(UID)

            res.send({ message: "User deleted successfully", deleted })
        } catch (error) {
           console.log("error")
        }
    }



    updateRol = async (req, res, next) => {
        try {

            const { UID } = req.params

            const nonSensitiveUser = await userModel.findById(UID)
           
            if (!nonSensitiveUser) {
                throw new Error("User doesn't exists")
            }
            let update
            if (nonSensitiveUser.role === 'user') {
                console.log("toy aca")
                // const rolechange = nonSensitiveUser
                // rolechange.role = "premium"

                // nonSensitiveUser.role = "premium"
                // const newRole = await UserService.updateUser(UID, rolechange)
                update = {"role":"premium"}
                console.log(update)
                //const newRole = await UserService.updateUser(UID, update)
               // res.send(newRole)
            }
            if (nonSensitiveUser.role === 'premium')  {

                // nonSensitiveUser.role = "user"
                // const newRole = await UserService.updateUser(UID, nonSensitiveUser)
                update = {"role":"user"}
                console.log(update)
                //const newRole = await UserService.updateUser(UID, update)
               // res.send(newRole)
            }

            const newRole = await UserService.updateUser(UID, update)
            res.send(newRole)
            //nonSensitiveUser.role == "user" ? nonSensitiveUser.role = "premium" : nonSensitiveUser.role === "premium" ? nonSensitiveUser.role = "user" : null
           // const newRole = await UserService.updateUser(UID, nonSensitiveUser)

           // res.status(200).send(newRole)
            console.log("usuario cambiado correctamente")
        } catch (error) {
            console.log("error")
        }
    }

    document = async (req, res) => {
        // try {
        //     const { params: { UID } } = req
        //     const { nonSensitiveUser } = await UserService.findUser(UID) ?? {}
        //     if (!nonSensitiveUser) throw new Error('User not found')

        //     const identify = req.files?.identify
        //     const address = req.files?.address
        //     const bankStatement = req.files?.bankStatement

        //     if (!identify && !address && !bankStatement) throw new Error('At least one document should be uploaded')

        //     const documents = []
        //     let response = "Next documents were uploaded successfully:"

        //     if (identify) {
        //         documents.push({ name: identify[0].filename, reference: identify[0].path })
        //         if (documents.length > 1) {
        //             response = response.concat(", ", "Identify")
        //         } else {
        //             response = response.concat(" ", "Identify")
        //         }
        //     }
        //     if (address) {
        //         documents.push({ name: address[0].filename, reference: address[0].path })
        //         if (documents.length > 1) {
        //             response = response.concat(", ", "Address")
        //         } else {
        //             response = response.concat(" ", "Address")
        //         }
        //     }
        //     if (bankStatement) {
        //         documents.push({ name: bankStatement[0].filename, reference: bankStatement[0].path })
        //         if (documents.length > 1) {
        //             response = response.concat(", ", "Bank Statement")
        //         } else {
        //             response = response.concat(" ", "Bank Statement")
        //         }
        //     }

        //     await UserService.updateDocuments(UID, documents)
        //     res.status(202).send(response)
        // } catch (error) {
        //     console.log("error")
        // }

        try {
            const { UID } = req.params;

            let user = await UserService.findUser(UID);

            //console.log(req.files);

            if (!user) {
                console.log("Usuario inexistente");
                return res.status(404).send({ status: "error", message: "Usuario inexistente" });
            }



            for (const [key, value] of Object.entries(req.files)) {
                console.log(key, value);
                console.log("ok")
                //console.log(user.documents.some((document) => document.name.includes(key)));
                //valido si ya se cargo una imagen para ese tipo de archivo. si ya se cargo la piso.
                if (user.documents.some((document) => document.name.includes(key))) {
                    const existingDocumentIndex = user.documents.findIndex((document) => document.name.includes(key));
                    let nameMatchingDocument = user.documents[existingDocumentIndex].name;
                    await userModel.updateOne(
                        { _id: UID, "documents.name": nameMatchingDocument },
                        { $set: { "documents.$.name": value[0].filename, "documents.$.reference": value[0].path } }
                    );
                } else {
                    await userModel.updateOne({ _id: UID }, { $push: { documents: { name: value[0].filename, reference: value[0].path } } });
                }
            }

            res.status(200).send({
                status: "success",
                payload: `Archivos subidos correctamente.`,
            });
            //res.sendSuccess(result);
        } catch (error) {
            console.log("error en controller")
        }
    };

}


module.exports = new UserController()