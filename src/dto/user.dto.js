class UserDto {
    constructor(user) {
        this.userID = user._id.toString()
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.cartID = user.cartID.toString()
        this.role = user.role
        this.age = this.#ageCalculator(user.birthdate)
        this.password = user.password
        this.email = user.email
        this.documents = user.documents
    }

    #ageCalculator = (birthdate) => {
        const age = new Date(birthdate).getFullYear()
        const actualYear = new Date().getFullYear()
        return actualYear - age;
    }
    static getUserDto = (user) => {
        return {
            UID: user._id.toString(),
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            CID: user.cartID.toString(),
            age: this.#ageCalculator(user.birthdate),
            role: user.role,
            password: user.password,
            last_connection: user.last_connection,
            documents: user.documents
        }
}
}
module.exports = UserDto
