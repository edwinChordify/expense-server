
const express = require('express')
const { sequelize, User } = require('./models')
const app = express()
app.use(express.json())


app.post('/users', async (req, res) => {


    const { name, email, password, age } = req.body
    try {
        console.log(age);
        const user = await User.create({ name, email, password, age })
        return res.json(user)

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)

    }

})


app.post('/login',async (req,res)=>{
    const {email,password}=req.body
    try {
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
        
    }

})

app.listen({ port: 8000 }, async () => {
    console.log("server running");
    await sequelize.authenticate()
    console.log('Database connected!');

})    
