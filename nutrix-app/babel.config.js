module.exports = function (api) {
  api.cache(true);
  // Expo SDK 51 resolves the "@/*" tsconfig paths alias natively via Metro,
  // so no module-resolver plugin is needed here.
  return {
    presets: ["babel-preset-expo"],
  };
};
