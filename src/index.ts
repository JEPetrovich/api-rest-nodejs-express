import express from 'express';
import { consoleLogTimed } from './utils/app-utils';
import userController from './controllers/user-controller';

const app = express();
app.use(express.json());

const PORT = 8080;

app.use('/api/user', userController);

app.listen(PORT, () => {
  consoleLogTimed(`Server running on port ${PORT}.`);
});
