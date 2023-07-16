const { productGenerator } = require("../utils/productMockGenerator")

class MockingController {
    getProducts = (_req, res) => {
        try {
            const products = []

            for (let i = 0; i < 100; i++) {
                products.push(productGenerator())
            }

            res.send({status:"succes",
            payload: products })
        } catch (error) {
            res.send({status:"error" })
        }
    }

    simple = (req, res) => {
        let suma = 0
        for (let i = 0; i < 1000000; i++) {
            suma += i
        }
        res.send({status:"succes",
            payload: suma })
    }

    compleja = (req, res) => {
        let suma = 0;
        for (let i = 0; i < 5e8; i++) {
            suma += i
        }
        res.send({status:"succes",
            payload: suma })
    }
}

module.exports = new MockingController()