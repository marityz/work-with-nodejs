const usersRouter = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const usersPath = path.join('data', 'users.json');

usersRouter.get('/users', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send({ message: 'Запрашиваемый файл не найден, отвалите' });
    });
});

usersRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;

  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      if (!(JSON.parse(data).some((item) => item._id === id))) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(JSON.parse(data).find((item) => item._id === id));
    })
    .catch((err) => {
      res.status(500).send({ message: 'Запрашиваемый файл не найден' });
    });
});

module.exports = usersRouter;

