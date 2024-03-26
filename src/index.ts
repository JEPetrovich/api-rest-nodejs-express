import express from 'express';
import cors from 'cors';
import { consoleLogTimed } from './utils/app-utils';
import userController from './controllers/user-controller';

const app = express();
app.use(cors());

const PORT = 8080;

app.use('/api/user', userController);

app.listen(PORT, () => {
  consoleLogTimed(`Server running on port ${PORT}.`);
});
