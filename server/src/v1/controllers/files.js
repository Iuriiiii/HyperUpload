import database from '../../db.js';


export function getFileByAccessId(req, res) {

    database.query(`SELECT * FROM files WHERE access_id = '${req.params.id}'`, function (error, result) {
        if (error)
            throw error;
        
        if(result && result.length > 0)
            res.status(200).sendFile(result[0].path, {root: './'});
    });
}