const {UserService} = require("../service/index.js");


class viewsController { 
uploader = async (req, res) => {
    try {
        const UID = req.params;
        
        
       

        let user = await UserService.findUser(UID);
        
        const object = {
            style: "index.css",
            title: "Subir Archivos",
           
        };
        res.render("uploader");
    } catch (error) {
        
       console.log("error")
    }
};
adminPanel = async (req, res, next) => {
    try {
        const { normalizedUsers, pagination } = await UserService.getUsers()
        const pages = pageBuilder(req, pagination)

        normalizedUsers.map(user => user.documents = user.documents.join(" / "))

        const render = {
            normalizedUsers,
            pages,
            style: "adminpanel.css",
            script: "adminpanel.js"
        }
        res.status(200).render("adminpanel", render)
    } catch (error) {
        next(error)
    }
}
}

module.exports = new viewsController();