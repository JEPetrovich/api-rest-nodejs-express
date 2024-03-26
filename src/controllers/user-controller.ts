import express from 'express';
import * as service from '../services/user-service';

const router = express.Router();

router.get('/list', (_req, res) => {
  res.status(200).send(service.getUsers());
});

router.post('/add', (req, res) => {
  try {
    const newUser = service.getNewUser(req.body);
    const addedUser = service.addUser(newUser);
    res
      .status(200)
      .json({ data: addedUser, message: 'User created successfully!' });
  } catch (e: any) {
    if (e instanceof Error) res.status(400).send(e.message);
    else res.sendStatus(400);
  }
});

router.put('/update', (req, res) => {
  try {
    const editUser = service.getEditUser(req.body);
    const updatedUser = service.updateUser(editUser);
    res.status(200).json({
      data: updatedUser,
      message: 'User edited successfully!',
    });
  } catch (e: any) {
    if (e instanceof Error) {
      let code = e.message.includes('not found') ? 404 : 400;
      res.status(code).send(e.message);
    } else res.sendStatus(400);
  }
});

router.delete('/delete/:id', (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const deletedUser = service.deleteUser(id);
    res.status(200).json({
      data: deletedUser,
      message: 'User successfully deleted!',
    });
  } catch (e: any) {
    if (e instanceof Error) {
      let code = e.message.includes('not found') ? 404 : 400;
      res.status(code).send(e.message);
    } else res.sendStatus(400);
  }
});

export default router;
