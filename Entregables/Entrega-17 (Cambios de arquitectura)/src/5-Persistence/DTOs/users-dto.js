const md5 = require("md5");

function loginDTO(data) {
  if (!data.user || !data.password) {
    throw {
      error: "Ingrese todos los datos requeridos (user, password)",
      errorCode: 400,
    };
  }

  return {
    user: data.user,
    password: data.password,
  };
}

function registerDTO(data) {
  return {
    email: data.email,
    alias: data.alias,
    direction: data.direction,
    age: data.age,
    prefix: data.prefix,
    phoneNum: data.phoneNum,
    userCart: [],
    password: md5(data.password),
    pathToPhoto: data.pathToPhoto,
  };
}

function userInfoDTO(data) {
  if (
    !data.alias ||
    !data.email ||
    !data.direction ||
    !data.age ||
    !data.phoneNum
  ) {
    throw {
      error:
        "Ingrese todos los datos requeridos (alias, email, direction, age, phoneNum)",
      errorCode: 400,
    };
  }

  let encriptedPhoneNum = String(data.phoneNum).slice(-2);
  encriptedPhoneNum = parseInt(encriptedPhoneNum);

  return {
    alias: data.alias,
    email: data.email,
    direction: data.direction,
    age: data.age,
    phoneNum: encriptedPhoneNum,
  };
}

module.exports = { loginDTO, registerDTO, userInfoDTO };
