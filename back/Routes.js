require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const express = require('express');
const route = express.Router();

const productSchema = require('./models/productSchema')
const userSchema = require('./models/userSchema')

//routes
//get requests
route.get('/inventory', async(req, res) => {
    const data = await productSchema.find()
    res.status(200).json(data)
});

//post requests
route.post('/create-user', async(req, res) => {
    const {company, oldpassword} = req.body
    const exists = await userSchema.findOne({company : company})
    if(exists) {
        return res.status(400).json({msg : "company already exists"})
    }
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(oldpassword, salt);
    const data = await userSchema.create({company, password})
    res.status(201).json({data})
});
route.post('/login-user', async(req, res) => {
    const {company, password} = req.body
    const companyCheck = await userSchema.findOne({company: company})
    if(companyCheck) {
        bcrypt.compare(password, companyCheck.password)
            .then(() => {
                jwt.sign({company}, process.env.code, {expiresIn : "2h"}, (err,token) => {
                    if(err) {
                        return res.status(400).json({ result : "something not right" })
                    }
                    return res.status(200).json({company : companyCheck.company, auth : token})
                })
            })
            .catch((err) => {
                res.status(400).json({msg : 'invalid password'})
            })
    }
    else{
        return res.status(404).json({'msg' : 'user not found'})
    }
})
route.post('/new-product', async(req, res) => {
    const { name, price, featured, rating, company, auth } = req.body
    const product = { name, price, featured, rating, company }

    try {
        const decoded = jwt.verify(auth, process.env.code)
        console.log(decoded);
        if (decoded) {
            const data = await productSchema.create(product)
            res.status(201).json(data)   
        }
        else{
        res.status(400).json({msg : "user not authenticated"})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({msg : "some issue posting product"});
    }
})

//patch request
route.patch('/product-edit/:id', async(req, res) => {
    const id = req.params.id
    const {newName, newPrice, newfeat, newRating, auth} = req.body

    const newProd = {name : newName, price : newPrice, featured : newfeat, rating : newRating}

    try {
        const decode = jwt.verify(auth, process.env.code)
        if(decode) {
        const data = await productSchema.findByIdAndUpdate({_id : id}, newProd, { new: true })
        res.status(201).json(data)
        }
        else{
            res.status(400).json({msg : "user not authenticated"})
        }
    } catch (error) {
        res.status(400).json({msg : "request cannot be fulfilled"})
    }
})

//delete request
route.delete('/delete-product/:id', async(req, res) => {
    const id = req.params.id
    try {
        const deletedProduct = await productSchema.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json({msg : error})
    }
})

module.exports = route;