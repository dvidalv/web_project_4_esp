// postcss.config.js

// conecta los plugins al archivo
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  // conecta los plugins a PostCSS
  plugins: [
    // conecta el autoprefixer
    autoprefixer,
    // pasa un objeto con opciones después de conectar cssnano:
    cssnano({ preset: "default" }) // establece los ajustes de minificación por defecto
  ]
};
