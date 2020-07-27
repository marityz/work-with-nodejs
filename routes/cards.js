const cardsRouter = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const cardsPath = path.join(__dirname, '../data/cards.json');

cardsRouter.get('/', (req, res) => {
  fsPromises.readFile(cardsPath, { encoding: 'utf8' })
    .then((data) => {
      try {
        const fileCards = JSON.parse(data);
        return fileCards;
      } catch (e) {
        res.status(415).send({ message: 'Не удалось распознать формат файла' });
        return undefined;
      }
    })
    .then((jsonCards) => {
      res.send(jsonCards);
    })
    .catch((err) => {
      res.status(500).send({ message: ` Произошла ошибка ${err} ` });
    });
});

module.exports = cardsRouter;
