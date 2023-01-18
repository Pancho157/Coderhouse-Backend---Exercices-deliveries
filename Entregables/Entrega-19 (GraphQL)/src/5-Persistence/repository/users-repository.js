const md5 = require("md5");
const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const { DAO } = require("../DAOs/DAOselector");
const {
  userInfoDTO,
  registerDTO,
  userLoginInfoDTO,
} = require("../DTOs/users-dto");

const DAOs = new DAO(process.env.PERS);

// -------------------------------------------------------------
async function registerUser(data) {
  const userDataFromDTO = registerDTO(data);
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

// -------------------------------------------------------------
async function getUserLoginInfo(user) {
  let userInfo;

  try {
    userInfo = await DAOs.users.getUserInfo(user);
  } catch (err) {
    logger.error(err);
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

  return userLoginInfoDTO(userInfo);
}

// -------------------------------------------------------------
async function verifyUserExists(user) {
  let exists = {};
  try {
    exists.alias = await DAOs.users.verifyAlias(user); // returns true / false
    exists.email = await DAOs.users.verifyEmail(user); // returns true / false

    if (exists.alias || exists.email) {
      return exists;
    }

    return false;
  } catch (err) {
    logger.error(err);
    throw {
      error:
        "Lo sentimos, ha ocurrido un error, recargue la pábina e intentelo de nuevo",
      errorCode: 500,
    };
  }
}

// -------------------------------------------------------------
async function getUserInfoFromDB(user) {
  try {
    let userInfo = await DAOs.users.getUserInfo(user);

    if (!userInfo) {
      throw {
        error: "El usuario ingresado no existe",
        errorCode: 400,
      };
    }

    const censoredUserInfo = userInfoDTO(userInfo);

    return censoredUserInfo;
  } catch (err) {
    logger.error(err);
    throw {
      error:
        "Lo sentimos, ha ocurrido un error, recargue la pábina e intentelo de nuevo",
      errorCode: 500,
    };
  }
}

async function getDetailedUserInfo(user) {
  try {
    let userInfo = await DAOs.users.getUserInfo(user);

    if (!userInfo) {
      throw {
        error: "El usuario ingresado no existe",
        errorCode: 400,
      };
    }

    delete userInfo.password;

    return userInfo;
  } catch (err) {
    logger.error(err);
    throw {
      error:
        "Lo sentimos, ha ocurrido un error, recargue la pábina e intentelo de nuevo",
      errorCode: 500,
    };
  }
}

module.exports = {
  registerUser,
  getUserLoginInfo,
  verifyUserExists,
  getUserInfoFromDB,
  getDetailedUserInfo,
};
