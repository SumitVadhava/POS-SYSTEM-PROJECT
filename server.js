const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("./server/models/User");
const bcrypt = require("bcrypt");
require('colors');
dotenv.config();

// app creation
const app = express();
    
//database
const database = require('./server/config/database');

// importing middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// routes
app.use("/items", require("./server/routes/itemsRoutes"));
app.use("/bills", require("./server/routes/billsRoutes"));


const JWT_SECRET = crypto.randomBytes(32).toString("hex");

// route
app.get('/', (req, res) => {
    res.send("POS SYSTEM");
});

app.use('/items', require("./server/routes/itemsRoutes"));

//app listen
database();
const PORT = process.env.PORT || 5000;

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // check if the user is already registered
        let user = await User.findOne({ email: email });
        if (user) return res.status(400).send("User already exists");

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        console.log(hashPassword);

        //create a new user
        const count = await User.countDocuments();
        const newUser = new User({ id: count + 1, name, email, password: hashPassword });
        await newUser.save();

        res.status(200).send({ name: newUser.name, email: newUser.email });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send("Invalid credentials");

        // compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        // create JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.json({ token });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});



app.listen(PORT, () => {
    console.log(`server is started at ${PORT}`);
});