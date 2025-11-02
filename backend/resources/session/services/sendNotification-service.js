const axios = require('axios');
const { logInfo } = require('lib/functional/logger');
const config = require('config');
const Result = require('folktale/result');



module.exports.perform = async (messageDetails) => {
  logInfo('Get communications service', { messageDetails });
  if (messageDetails) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.gatewayUrl}/communications/sendNotification`, { "messageDetails": messageDetails })
        .then((response) => {
          resolve(Result.Ok(response.data.entity));
        }).catch((error) => {
          reject(Result.Error(error));
        });
      return Result.Ok([]);
    });
  }

};
