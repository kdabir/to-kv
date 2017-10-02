module.exports = function (options) {
  const defaults = {keyName: 'key', valueName: 'value', onConflict: 'keepLast'};

  const {keyName, valueName, onConflict} = Object.assign({}, defaults, options);

  const strategies = {
    keepAll: (acc, cur) => {
      if (acc[cur[keyName]] === undefined) {
        acc[cur[keyName]] = []
      }
      acc[cur[keyName]].push(cur[valueName]);
      return acc;
    },

    keepFirst: (acc, cur) => {
      if (acc[cur[keyName]] === undefined) {
        acc[cur[keyName]] = cur[valueName];
      }
      return acc;
    },

    keepLast: (acc, cur) => {
      acc[cur[keyName]] = cur[valueName];
      return acc;
    }
  };

  return (arr) => arr.reduce(strategies[onConflict], {});
};
