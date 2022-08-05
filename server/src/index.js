import 'dotenv/config';
import express from "express";
import usersRouter from './v1/routes/users.js';
import authRouter from './v1/routes/auth.js';
import filesRouter from './v1/routes/files.js';
import { getFileByAccessId } from './v1/controllers/files.js';

const app = express();
const port = process.env.API_PORT || 64000;

app.use(express.json());
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/files', filesRouter);

app.get('/:id', getFileByAccessId);

app.listen(port, () => {
    console.log('Listening at', port);
})
