const { Poke } = require('../models');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { getPokeId } = require('../helpers/getId');
const client = require('../helpers/redis');

module.exports = {
  getPokes: async (req, res) => {
    const { offset, limit } = req.params;
    const offsetNumber = Number(offset);
    const limitNumber = Number(limit);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      );
      const dataPoke = await response.json();
      const { results, count } = dataPoke;
      const pokeDB = await Poke.find()
        .limit(limitNumber)
        .skip(offsetNumber)
        .sort([['pokeId', 'asc']]);

      const compare = results.filter(
        (x) => !pokeDB.some((y) => x.name === y.name),
      );
      if (compare.length > 0) {
        const test2 = compare.map((v) => ({
          ...v,
          pokeId: getPokeId(v.url),
        }));
        await Poke.create(test2);
      }

      const reply = await client.get(`poke${offset}${limit}`);
      if (reply) {
        res.status(200).json(JSON.parse(reply));
      } else {
        const newList = await Poke.find()
          .limit(limitNumber)
          .skip(offsetNumber)
          .sort([['pokeId', 'asc']]);

        const dataReponse = {
          success: true,
          message: 'success get pokes',
          data: { count, results: newList },
        };
        if (newList) {
          await client.set(`poke${offset}${limit}`, JSON.stringify(dataReponse), {
            EX: 30,
            NX: true,
          });
        }

        res.status(200).json(dataReponse);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'error get pokes',
        data: error.stack,
      });
    }
  },

  getPokeById: async (req, res) => {
    const { pokeId } = req.params;
    try {
      const reply = await client.get(`${pokeId}`);
      if (reply) {
        res.status(200).json(JSON.parse(reply));
      } else {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokeId}`,
        );
        const data = await response.json();
        const dataReponse = {
          success: true,
          message: 'success',
          data,
        };
        await client.set(`${pokeId}`, JSON.stringify(dataReponse), {
          EX: 60,
          NX: true,
        });
        res.status(200).json(dataReponse);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'error get poke by id',
        data: error.stack,
      });
    }
  },
};
