module.exports = {
  getPokeId: (url) => {
    var pathname = new URL(url).pathname;
    var params = pathname.split('/');
    const id = params[params.length - 2];
    return Number(id);
  },
};
