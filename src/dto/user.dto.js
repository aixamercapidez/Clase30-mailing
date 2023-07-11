class UserDto {
    User = async ()=>{
        const { first_name } = req.session.user
        const { last_name } = req.session.user
        const { email } = req.session.user

        const { role } = req.session.user
        const user=first_name
        return user
    }
}

module.exports = {
    UserDto
}
