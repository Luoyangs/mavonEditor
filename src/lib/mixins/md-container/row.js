const { getAttributes, defaultTabsAttributes } = require('./util');
const container = require('markdown-it-container');

module.exports = (md, options = {}) => {
  md.use(container, 'row', {
    render: (tokens, idx) => {
      const token = tokens[idx];
      const defaultAttributes = defaultTabsAttributes(options.rowAttributes);
      const attributes = getAttributes(token.info, 'row');

      if (token.nesting === 1) {
        return `<shopee-row ${defaultAttributes} ${attributes}>\n`;
      } else {
        return `</shopee-row>\n`;
      }
    },
  });
};
