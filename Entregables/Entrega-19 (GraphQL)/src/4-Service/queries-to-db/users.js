const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const { deleteUserPhoto } = require("../utils/deleteUserPhoto");
const {
  registerUser,
  getUserLoginInfo,
  verifyUserExists,
  getUserInfoFromDB,
} = require("../../5-Persistence/repository/users-repository");
const md5 = require("md5");

class UsersService {
  constructor() {}

  // ----------------------------------------------------------------
  async newUser(data) {
    let exists;

    // * If user exists
    try {
      exists = verifyUserExists(data.alias);
    } catch (err) {
      logger.error(err);
      throw {
        error: "Se ha producido un error",
        errorCode: 500,
      };
    }

    if (exists.alias == true) {
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

    // * User creation
    try {
      response = await registerUser(data);
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

  // ----------------------------------------------------------------
  async login(data) {
    let loginInfo;
    try {
      loginInfo = await getUserLoginInfo(data.user);
    } catch (err) {
      logger.error(err);
      throw err;
    }

    if (loginInfo.password == md5(data.password)) {
      return { alias: loginInfo.alias, pathToPhoto: loginInfo.pathToPhoto };
    } else {
      throw {
        error: "Contraseña incorrecta",
        errorCode: 400,
      };
    }
  }

  // ----------------------------------------------------------------
  async getUserData(user) {
    try {
      const userInfo = getUserInfoFromDB(user);
      return userInfo;
    } catch (err) {
      throw err;
    }
  }
}

const users = new UsersService();

module.exports = { users };
