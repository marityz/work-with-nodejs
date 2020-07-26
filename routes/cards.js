const cardsRouter = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const cardsPath = path.join(__dirname, '../data/cards.json');

cardsRouter.get('/', (req, res) => {
  fsPromises.readFile(cardsPath, { encoding: 'utf8' })
    .then((data) => {
      try {
        const json = JSON.parse(data);
        return json;
      } catch (e) {
        res.status(415).send({ message: 'Не удалось распознать формат файла' });
      }
    })
    .then((json) => {
      res.send(json);
    })
    .catch((err) => {
      res.status(500).send({ message: ` Произошла ошибка ${err} ` });
    });
});

module.exports = cardsRouter;
