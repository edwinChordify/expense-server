
const express = require('express')
const { sequelize, User } = require('./models')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())


app.post('/users', async (req, res) => {


    const { name, email, password } = req.body
    try {
        const user = await User.create({ name, email, password })
        return res.json(user)

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)

    }

})


app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const loginUser = await User.findOne({ where: { email } })
        if (loginUser) {
            return res.status(200).json(loginUser)

        } else {
            return res.status(401).json("user not found")
        }



    } catch (err) {
        console.log(err);
        return res.status(500).json("user not exist")

    }

})

app.post('/addexpense/:id', async (req, res) => {
    const userId = req.params.id
    const { amount, category, despription } = req.body
    try {
        const user = await User.findByPk(userId)
        if (user) {
            const expense = await user.createExpense({ amount, category, despription })
            return res.status(200).json(expense)
        }
        else {
            return res.status(404).json(error)
        }

    } catch (err) {
        console.log(err)
        return res.status(401).json(err)

    }
})

app.get('/userdetails/:id',async (req,res)=>{
    const userId=req.params.id
    try {
        const user = await User.findByPk(userId);
        if(user){
            return res.status(200).json(user)
        }
        else{
            return res.status(401).json("user not found")

        }

        
    } catch (error) {
        console.log(error);
        return res.status(401).json(error)
        
    }
})

app.listen({ port: 8000 }, async () => {
    console.log("server running");
    await sequelize.authenticate()
    console.log('Database connected!');

})    
