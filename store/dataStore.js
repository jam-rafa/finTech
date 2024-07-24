// src/dataStore.js
let xlsData = null;

const setXlsData = (data) => {
  xlsData = data;
};

const getXlsData = () => {
  return xlsData;
};

module.exports = {
  setXlsData,
  getXlsData
};
