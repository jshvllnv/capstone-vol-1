const router = require("express").Router();
const pool = require('../db');
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//Register Route
router.post('/register', validInfo, async(req, res) => {
    try {
        
        const { name, email, password} = req.body;
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(user.rows.length !== 0) {
            return res.status(401).json('User already exist')
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, bcryptPassword]);

        const token = jwtGenerator(newUser.rows[0].id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Login Route
router.post('/login', validInfo, async(req, res) => {
    try {

        const { email, password} = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if(user.rows.length === 0) {
            return res.status(401).json('Email or Password is incorrect');
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword) {
            return res.status(401).json('Email or Password is incorrect.')
        }

        const token = jwtGenerator(user.rows[0].id);

        res.json({ token });

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/is-verify', authorization, async(req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;