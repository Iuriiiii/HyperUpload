import express from 'express';
import database from '../../db.js';
import { body, validationResult } from 'express-validator';
import { sha256 } from '../../utils.js';

let router = express.Router();

router.get('/:id?', (req, res) => {
    if (typeof req.params.id === 'undefined')
        database.query('SELECT name, email, creation_date FROM users', function (error, response, fields) {
            if (error)
                throw error;

            res.status(200).json(response)
        });
    else
        database.query(`SELECT name, email, creation_date FROM users WHERE name = '${req.params.id}'`, function (error, response, fields) {
            if (error)
                throw error;
                
            res.status(response.length === 0 ? 404 : 200).json(response);
        });
});

router.post(
    '/',
    body('user').isLength({ min: 4, max: 60 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 60 }),
    (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        let { user, email, password } = req.body;

        password = sha256(password);

        database.query(`SELECT * FROM users WHERE name = '${user}'`, function(error, result) {
            if(error)
                throw error;

            if(result && result.length > 0)
                return res.status(409).json({status: 'failure', description: 'User does exists'});
            else
                database.query(`INSERT INTO users (name, password, email) VALUES ('${user}', '${password}', '${email}')`, function(error, result) {
                    if(error)
                        throw error;
        
                    res.status(200).json({status: 'success', description: 'User created succefully'});
                });
        });
    }
);



export default router;