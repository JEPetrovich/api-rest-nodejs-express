import express from 'express';
import cors from 'cors';
import userController from './controllers/user-controller';
import { print } from './utils/app-utils';

const app = express();
app.use(cors());

const PORT = 8080;

app.use('/api/user', userController);

app.listen(PORT, () => {
  print.success(`Server running on port ${PORT}.`, true);
});
