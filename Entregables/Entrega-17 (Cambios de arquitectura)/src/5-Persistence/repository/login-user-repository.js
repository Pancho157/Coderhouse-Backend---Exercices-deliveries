const md5 = require("md5");
const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const { DAO } = require("../DAOs/DAOselector");
const { userInfoDTO, loginDTO } = require("../DTOs/users-dto");

const DAOs = new DAO(process.env.PERS);

async function login(data) {
  let userInfo;

  try {
    userInfo = await DAOs.users.getUserInfo(user);
  } catch (err) {
    throw {
      error:
        "Hubo un error al iniciar sesión, recargue la página y vuelva a intentarlo",
      errorCode: 500,
    };
  }

  if (!userInfo) {
    throw {
      error: "El usuario ingresado no existe",
      errorCode: 400,
    };
  }

  const userInput = loginDTO(data);

  if (userInfo.password == md5(userInput.password)) {
    return { alias: userInfo.alias, userId: userInfo._id };
  } else {
    throw {
      error: "Contraseña incorrecta",
      errorCode: 400,
    };
  }
}

async function getUserInfoFromDB(user) {
  try {
    let userInfo = await DAOs.users.getUserInfo(user);

    if (!userInfo) {
      throw {
        error: "El usuario ingresado no existe",
        errorCode: 400,
      };
    }

    const userInfoDTO = userInfoDTO(userInfo);

    return userInfoDTO;
  } catch (err) {
    logger.error(err);
    throw {
      error:
        "Lo sentimos, ha ocurrido un error, recargue la pábina e intentelo de nuevo",
      errorCode: 500,
    };
  }
}

module.exports = { login, getUserInfoFromDB };
