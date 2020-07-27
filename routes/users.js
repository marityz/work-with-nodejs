const usersRouter = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');

usersRouter.get('/', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      try {
        const fileUsers = JSON.parse(data);
        return fileUsers;
      } catch (e) {
        res.status(415).send({ message: 'Не удалось распознать формат файла' });
        return undefined;
      }
    })
    .then((jsonUsers) => {
      res.send(jsonUsers);
    })
    .catch((err) => {
      res.status(500).send({ message: ` Произошла ошибка ${err} ` });
    });
});

usersRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      try {
        const jsonFile = JSON.parse(data);
        return jsonFile;
      } catch (e) {
        res.status(415).send({ message: 'Не удалось распознать формат файла' });
        return undefined;
      }
    })
    .then((jsonFile) => {
      if (!(jsonFile.some((user) => user._id === id))) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(jsonFile.find((user) => user._id === id));
    })
    .catch((err) => {
      res.status(500).send({ message: ` Произошла ошибка ${err} ` });
    });
});

module.exports = usersRouter;
