const container = require('markdown-it-container');

module.exports = (md, options = {}) => {
  md.use(container, 'br', {
    render: (tokens, idx) => {
      const token = tokens[idx];

      if (token.nesting === 1) {
        return `<div class="shopee-br"></div>`;
      }
    },
  });
};
