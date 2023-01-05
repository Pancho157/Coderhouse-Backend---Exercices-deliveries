const md5 = require("md5");
const { DAO } = require("../DAOs/DAOselector");
const { deleteUserPhoto } = require("../../4-Service/utils/deleteUserPhoto");
const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const { registerDTO } = require("../DTOs/users-dto");

const DAOs = new DAO(process.env.PERS);

async function registerUser(data) {
  let exists = {};
  const userDataFromDTO = registerDTO(data);

  // * En caso de existir el usuario
  try {
    // if exists = true, else = false
    if (await DAOs.users.verifyAlias(userDataFromDTO.alias))
      exists.alias = true;

    if (await DAOs.users.verifyEmail(userDataFromDTO.email))
      exists.email = true;
  } catch (err) {
    logger.error(err);
    throw {
      error: "Se ha producido un error",
      errorCode: 500,
    };
  }

  if (exists.alias == true && exists.email == true) {
    throw {
      error: "El email y alias ingresados ya existen",
      errorCode: 400,
    };
  } else if (exists.alias == true) {
    throw {
      error: "El alias ingresado ya existe",
      errorCode: 400,
    };
  } else if (exists.email == true) {
    throw {
      error: "El email ingresado ya existe",
      errorCode: 400,
    };
  }

  // * Creación de usuario
  try {
    response = await DAOs.users.createUser(userDataFromDTO);
    return userDataFromDTO.alias;
  } catch (err) {
    deleteUserPhoto(userDataFromDTO.pathToPhoto);
    logger.error(err);
    throw {
      error: "Se ha producido un error",
      errorCode: 500,
    };
  }
}

module.exports = { registerUser };
