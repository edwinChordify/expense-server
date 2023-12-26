
const express = require('express')

const { sequelize, User, Post } = require('./models')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const bcrypt = require('bcrypt');

const saltRounds = 10;



app.post('/users', async (req, res) => {


    const { name, email, password } = req.body
    try {
        const hashedpassword = await bcrypt.hash(password, saltRounds);




        const user = await User.create({ name, email, password: hashedpassword })
        return res.json(user)

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)

    }

})


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        const loginUser = await User.findOne({ where: { email } });

        if (!loginUser) {
            return res.status(401).json("User not found");
        }




        const passwordMatch = await bcrypt.compare(password, loginUser.password);
        if (passwordMatch) {


            return res.status(200).json(loginUser);
        } else {
            return res.status(401).json("Incorrect password");
        }
    }

    catch (err) {
        console.log(err);
        return res.status(500).json("User not exist");
    }
});

app.post('/addexpense/:id', async (req, res) => {
    const userId = req.params.id
    const { amount, category, despription } = req.body
    try {
        const user = await User.findByPk(userId)
        if (user) {
            const expense = await user.createPost({ amount, category, despription })
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

app.get('/userdetails/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findByPk(userId);
        if (user) {
            return res.status(200).json(user)
        }
        else {
            return res.status(401).json("user not found")

        }


    } catch (error) {
        console.log(error);
        return res.status(401).json(error)

    }
})


app.get('/expensedetails/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const expensedetails = await Post.findAll({ where: { userId: userId } });

        return res.status(200).json(expensedetails)






    } catch (error) {
        console.log(error);
        return res.status(401).json(error)

    }
})

app.get('/eachExpense/:id', async (req, res) => {
    const expenseId = req.params.id
    try {
        const eachexpense = await Post.findByPk(expenseId)
        if (!eachexpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        return res.status(200).json(eachexpense)
    } catch (error) {
        console.log(error);
        return res.status(401).json(error)

    }
})
app.put('/editExpense/:id', async (req, res) => {
    const editId = req.params.id;
    const { amount, category, despription } = req.body;

    try {
        const expenseToUpdate = await Post.findByPk(editId);

        if (!expenseToUpdate) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        // Update the expense details
        expenseToUpdate.amount = amount;
        expenseToUpdate.category = category;
        expenseToUpdate.despription = despription;

        // Save the updated expense
        await expenseToUpdate.save();

        return res.status(200).json(expenseToUpdate);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});


app.delete('/deleteexpense/:id', async (req, res) => {
    const expenseId = req.params.id
    try {
        const postdelete = await Post.findByPk(expenseId)
        if (!postdelete) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        await postdelete.destroy()
        return res.status(200).json("deleted")
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
