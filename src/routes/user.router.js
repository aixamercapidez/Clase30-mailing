

const UserController = require("../controllers/users.controller");
const uploader = require("../utils/multer");

const RouterClass = require("./RouterClass");

const user = new UserController()

class UsersRouter extends RouterClass {
    init() {
        this.get('/', ['ADMIN'], user.getUsers)
        this.get('/premium/:UID', ['USER', 'PREMIUM', 'ADMIN'], user.updateRol)
        this.post('/:UID/documents', ['USER', 'PREMIUM', 'ADMIN'], uploader.fields([
            { name: "profile", maxCount: 1 },
            { name: "products", maxCount: 1 },
            { name: "identification", maxCount: 1 },
            { name: "comprobant", maxCount: 1 },
            { name: "accountStatus", maxCount: 1 },
        ]), user.document)
        this.delete('/deleteusers', ['ADMIN'], user.deleteUsers)

        this.get('/delete/:UID', ['ADMIN'], user.deleteUser)



    }
}
module.exports = UsersRouter