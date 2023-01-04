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
  const {
    email,
    alias,
    direction,
    age,
    prefix,
    phoneNum,
    password,
    pathToPhoto,
  } = data;

  if (
    !email ||
    !alias ||
    !direction ||
    !age ||
    !prefix ||
    !phoneNum ||
    !password ||
    !pathToPhoto
  ) {
    throw {
      error: "Ingrese todos los datos requeridos",
      errorCode: 400,
    };
  }

  return {
    email: email,
    alias: alias,
    direction: direction,
    age: age,
    prefix: prefix,
    phoneNum: phoneNum,
    userCart: [],
    password: md5(password),
    pathToPhoto: pathToPhoto,
  };
}

function userInfoDTO(data) {
  const { alias, email, direction, age, phoneNum } = data;

  if (!alias || !email || !direction || !age || !phoneNum) {
    throw {
      error:
        "Ingrese todos los datos requeridos (alias, email, direction, age, phoneNum)",
      errorCode: 400,
    };
  }

  let encriptedPhoneNum = String(phoneNum).slice(-2);
  encriptedPhoneNum = parseInt(encriptedPhoneNum);

  return {
    alias: alias,
    email: email,
    direction: direction,
    age: age,
    phoneNum: encriptedPhoneNum,
  };
}

module.exports = { loginDTO, registerDTO, userInfoDTO };
