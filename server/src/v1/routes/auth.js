import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import database from '../../db.js';
import { sha256 } from '../../utils.js';

let router = express.Router();

router.post(
    '/login',
    body('user').isLength({min: 4, max: 60}),
    body('password').isLength({min: 5, max: 60}),
    (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty())
            return res.status(404).json({status: 'failure', description: 'Invalid user or password'});

        let { user, password } = req.body;

        password = sha256(password);
        
        database.query(`SELECT name, id FROM users WHERE name = '${user}' AND password = '${password}'`, function(error, result) {
            if(error)
                throw error;

            if(result && result.length === 0)
                return res.status(404).json({status: 'failure', description: 'User does not exists'});
            else
                return res.status(200).json({
                    key: jwt.sign(
                        {...result[0]},
                        process.env.JWT_KEY || 'mysecretkeyisthis',
                        {expiresIn: process.env.JWT_KEY_EXPIRATION_TIME || '7d'}
                    )
                });
        });
    }
);

export default router;