const express = require('express');
const router = express.Router();
const { isLogin } = require('../middlewares/auth');
const { getPokes, getPokeById } = require('../controllers/pokeController');
const client = require('../helpers/redis');

(async () => {
  await client.connect();
})();
client.on('connect', () => console.log('::> Redis Client Connected'));
client.on('error', (err) => console.log('<:: Redis Client Error', err));

// async function cachePoke(req, res, next) {
//   const reply = await client.get('poke');
//   if (reply) {
//     res.status(200).json(JSON.parse(reply));
//     return;
//   } else {
//     next();
//   }
// }

router.get('/:offset/:limit', isLogin, getPokes);
// router.get('/:offset/:limit', isLogin, cachePoke, getPokes);
router.get('/:pokeId', isLogin, getPokeById);

module.exports = router;
