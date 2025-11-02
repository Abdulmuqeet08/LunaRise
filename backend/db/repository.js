const Result = require("folktale/result");
const db = require("models/index.js");

module.exports.execute = async (query) =>
  new Promise((resolve) => {
    query
      .get()
      .then((data) => {
        resolve(Result.Ok(data));
      })
      .catch((error) => {
        resolve(Result.Error(error));
      });
  });

module.exports.find = async (query) =>
  new Promise((resolve) => {
    query
      .get()
      .then((data) => {
        resolve(Result.Ok(data));
      })
      .catch((error) => {
        console.log(error);
        resolve(Result.Error(error));
      });
  });

module.exports.findOne = async (query) =>
  new Promise((resolve) => {
    query
      .get()
      .then((data) => {
        resolve(Result.Ok(data));
      })
      .catch((error) => {
        resolve(Result.Error(error));
      });
  });

module.exports.getFirstItem = async (query) =>
  new Promise((resolve) => {
    query
      .get()
      .then((data) => {
        resolve(Result.Ok(data[0]));
      })
      .catch((error) => {
        resolve(Result.Error(error));
      });
  });

module.exports.findOrCreate = async (query) =>
  new Promise(async (resolve) => {
    try {
      await db.sequelize.transaction((t) => {
        console.log("transaction" + t);

        const result = query
          .get(t)
          .then((data) => {
            resolve(Result.Ok(data));
          })
          .catch((error) => {
            resolve(Result.Error(error));
          });

        // const result = await db.sequelize.transaction(async (t) => {
        //   query.get({ transaction: t }).then((data) => data);
        //   const resolveAllResult = await Promise.all(allResult);
        //   return resolveAllResult;
        // });
        // console.log("result" + result);
        // resolve(Result.Ok(result));

        // return query
        //   .get({ transaction: t })
        //   .spread(function (data, created) {
        //     console.log("spread" + spread);
        //     if (created) {
        //       // created will be true if a new user was created
        //     }
        //     resolve(Result.Ok(data));
        //   })
        //   .catch((error) => {
        //     console.log("Error1" + error);
        //     resolve(Result.Error(error));
        //   });
      });
    } catch (error) {
      console.log("Error2" + error);
      resolve(Result.Error(error));
    }
  });

module.exports.executeMutiple = async (queries) =>
  new Promise(async (resolve) => {
    try {
      const result = await db.sequelize.transaction(async (t) => {
        const allResult = queries.map((query) =>
          query.get({ transaction: t }).then((data) => data)
        );
        const resolveAllResult = await Promise.all(allResult);
        return resolveAllResult;
      });
      resolve(Result.Ok(result));
    } catch (error) {
      resolve(Result.Error(error));
    }
  });
