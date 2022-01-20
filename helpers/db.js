const fsPromise = require('fs/promises');
const { constants } = require('fs');
const archivo = './db/data.json';

const guardarDB = async (data) => {
  await fsPromise.writeFile(archivo, JSON.stringify(data));
}

const leerDB = async () => {
  try {
    await fsPromise.access(archivo, constants.R_OK | constants.W_OK);
    const info = await fsPromise.readFile(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    return data;
  } catch(error) {
    return null
  }
}

module.exports = {
  guardarDB,
  leerDB
}