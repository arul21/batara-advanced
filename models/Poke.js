const { model, Schema } = require('mongoose');

const pokeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    pokeId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Poke = model('Poke', pokeSchema);
module.exports = Poke;
