const { getAttributes, defaultTabsAttributes } = require('./util');
const container = require('markdown-it-container');

module.exports = (md, options = {}) => {
  md.use(container, 'col', {
    render: (tokens, idx) => {
      const token = tokens[idx];
      const defaultAttributes = defaultTabsAttributes(options.colAttributes);
      const attributes = getAttributes(token.info, 'col');

      if (token.nesting === 1) {
        return `<shopee-col ${defaultAttributes} ${attributes}><div>\n`;
      } else {
        return `</div></shopee-col>\n`;
      }
    },
  });
};
