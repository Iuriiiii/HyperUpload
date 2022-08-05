import jwt from 'jsonwebtoken';
import fs from 'fs';
import crypto from 'crypto';

export const sha256 = (content) => crypto.createHash('sha256').update(content).digest('hex');

export function shaFile(path) {
    return sha256(fs.readFileSync(path, 'utf8'));
}

export function jwtValidator(broke = true) {
    return (req, res, next) => {
        if(typeof req.headers['authorization'] !== 'undefined') {
            let splitted = req.headers['authorization'].split(' ');

            if(splitted[0] === 'Bearer')
                req.token = splitted[1];
        }

        if(typeof req.token === 'undefined')
            if(broke)
                return res.status(403).json({status: 'failure', description: 'No token'});
            else
                return next();
    
        jwt.verify(req.token, process.env.JWT_KEY || 'mysecretkeyisthis', (error, decoded) => {
            if(error !== null || typeof decoded.name !== 'string' || typeof decoded.id !== 'number')
                if(broke)
                    return res.status(403).json({status: 'failure', description: 'Invalid token'});
                else
                    return next();

            req.session = decoded;
        });

        // if(broke)
        //     return res.status(403).json({status: 'failure', description: 'Invalid token'});

        return next();
    };
}