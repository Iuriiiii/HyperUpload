import express from 'express';
import { jwtValidator } from '../../utils.js';
import database from '../../db.js';
import multer from 'multer';
import { sha256, shaFile } from '../../utils.js';
import randomstring from 'randomstring';
import { body, validationResult } from 'express-validator';
import { getFileByAccessId } from '../controllers/files.js';

function extension(filename) {
    let split = filename.split('.');

    if(split.length === 1)
        return '';
    
    return split[1]; 
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        /*
        {
            fieldname: 'hyperfile',
            originalname: 'filename.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg'
        }
        */
        let filename = Date.now() + '.' + extension(file.originalname);
        cb(null, filename);
    }
});

// function filter(req, file, cb) {
//     console.log(file);
//     cb(null, true);
// }

let router = express.Router();
const upload = multer({
    storage: storage,
    limits: {fileSize: process.env.MAX_FILE_UPLOAD_SIZE || 1024*1024*3}
});

router.get('/', (req, res) => {

    database.query(`SELECT * FROM files`, function (error, result) {
        if (error)
            throw error;
            
        res.status(200).json(result);
    });
});

router.get('/fromsession', jwtValidator(), (req, res, next) => {
    if(typeof req.session === 'undefined')
        return next();

    database.query(`SELECT * FROM files WHERE user = ${req.session.id}`, function (error, result) {
        if (error)
            throw error;
            
        res.status(200).json(result);
    });
});

router.get('/:id', getFileByAccessId);

router.delete(
    '/:id',
    jwtValidator(),
    (req, res, next) => {

    if(typeof req.session === 'undefined')
        return next();

    database.query(`DELETE FROM files WHERE access_id = '${req.params.id}' AND user = ${req.session.id}`, function (error, result) {
        if (error)
            throw error;
        
        /*
        OkPacket {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 0,
            serverStatus: 34,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0
        }
        */

        if(result && result.affectedRows > 0)
            res.status(200).json({status: 'success', description: 'File deleted succefully'});
        else
            res.status(404).json({status: 'failure', description: 'File not found'});
    });
});

router.post('/', jwtValidator(), upload.single('hyperfile'), (req, res, next) => {
    /*
    {
        fieldname: 'hyperfile',
        originalname: 'filename.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: './uploads',
        filename: '1659674146108.jpg',
        path: 'uploads\\1659674146108.jpg',
        size: 211093
    }
    */
    if(typeof req.session === 'undefined')
        return next();

    const hash = shaFile(req.file.path);
    const accessId = randomstring.generate(20);
    
    database.query(`SELECT * FROM users WHERE id = ${req.session.id}`, function(error, result) {
        if(error)
            throw error;

        if(result && result.length == 0)
            return res.status(403).json({status: 'failure', description: 'User does not exists'});
        else
            database.query(`INSERT INTO files (user, path, hash, access_id, mime) values (${req.session.id}, '${req.file.path.replace('\\', '/')}', '${hash}', '${accessId}', '${req.file.mimetype}')`, function (error, result) {
                if (error)
                    throw error;
                    
                res.status(200).json({status: 'success', description: 'File uploaded succefully', access: accessId});
            });
    });


});

export default router;