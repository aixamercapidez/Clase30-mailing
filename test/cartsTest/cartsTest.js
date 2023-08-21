const chai = require('chai')
const superTest = require('supertest')

const expect = chai.expect
const requester = superTest('http://localhost:8080')

describe('/api/carts Router test', () => {
    let cartID, cookie;
    beforeEach(async () => {
        const user = {
            email: 'juanp@gmail.com',
            password: '123'
        }
        let { header } = await requester.post('/api/session/login').send(user)
        // const [cookieHeader] = header['set-cookie']
        // cookie = {
        //     name: cookieHeader.split('=')[0],
        //     value: cookieHeader.split('=')[1].split(';')[0]
        // }
         let { _body } = await requester.get('/api/session/current')
        cartID = _body.payload.user.cartID
    })
    it('Router should add a product', async () => {
        const productsMock = "64600f448a5c8b883b5a71aa"

        let { _body } = await requester.post('/api/carts/${cartID}/${productsMock}')
            // .set('Cookie', [`${cookie.name}=${cookie.value}`])
           

        expect(_body.payload).to.have.property('products')
        expect(_body.payload.products).to.have.length(1)
    })
    it('Router should delete a product', async () => {
        const productID = "64d1ca472a099bf1db85b307"

        const { _body } = await requester.delete(`/api/carts/${cartID}/product/${productID}`)
            .set('Cookie', [`${cookie.name}=${cookie.value}`])

        expect(_body.payload._id).to.be.equal(cartID)
        expect(_body.payload.products).to.have.length(2)
    })
    it("Router should be able to buy products inside, instead they aren't available and generates a ticket on DB", async () => {
        const { _body } = await requester.post(`/api/carts/${cartID}/purchase`)
            .set('Cookie', [`${cookie.name}=${cookie.value}`])
        const { _body: bodyCart } = await requester.get(`/api/carts/${cartID}`)

        expect(bodyCart.payload.products).to.have.length(0)
        expect(_body.payload).to.have.property('purchaser')
    })
})