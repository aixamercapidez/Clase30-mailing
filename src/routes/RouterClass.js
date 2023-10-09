const { Router } = require('express');
const { userModel } = require('../dao/mongo/model/user.model');


class RouterClass {
    constructor() {
        this.router = Router()
        this.init()
    }

    getRouter = () => {
        return this.router
    }
    
    /**
     * 
     * @param {Array<String>} policies 
     * @returns {(Response | Request | void)} 
     */
    handlePolicies = policies => async (req, res, next) => {
        if (policies[0] === 'PUBLIC') return next()
        
        
         

        if (policies[0] !== 'PUBLIC'){
        const { email } = req.session.user
            let userDB = await userModel.findOne({ email })
            let role = userDB.role
        console.log(role)
        
        if (!policies.includes(role.toUpperCase())) return res.status(403).send({ status: 'error', payload: 'No permission' })}
        
        next()
    }

    
    generateCustomResponse = async (_req, res, next) => {
        try {
            res.sendSuccess = payload => res.send({ status: 'success', payload })
            res.sendServerError = error => res.send({ status: 'error', error })
            res.sendUserError = error => res.send({ status: 'error', error })
            next()
        } catch (error) {
            if (error) {
                return res.send(error.message)
            }
        }
    }

    init() { }

    
    applyCallbacks = (callbacksArray) => {
       
        return callbacksArray.map(cbIndividual => async (...params) => {
            try {
                await cbIndividual.apply(this, params)
            } catch (error) {
                params[1].status(500).send({
                    status: 'error',
                    error
                })
            }
        })
    }

  
    get = async (path, policies, ...callbacks) => {
        try {
            this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
        } catch (error) {
            if (error) return error.message
        }
    }
    post = async (path, policies, ...callbacks) => {
        try {
            this.router.post(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
        } catch (error) {
            if (error) return error.message
        }
    }
    put = async (path, policies, ...callbacks) => {
        try {
            this.router.put(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
        } catch (error) {
            if (error) return error.message
        }
    }
    delete = async (path, policies, ...callbacks) => {
        try {
            this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
        } catch (error) {
            return error.message
        }
    }
}

module.exports = RouterClass