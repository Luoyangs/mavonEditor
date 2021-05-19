const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const markdownIt = require('markdown-it');
const meta = require('markdown-it-meta');
const startCase = require("lodash.startcase");
const escapeRegExp = require("lodash.escaperegexp");

// Load all MD files in a specified directory and order by metadata 'order' value
const getChildren = function(parent_path, dir) {
  files = glob
    .sync(parent_path + (dir ? `/${dir}` : '') + '/**/*.md')
    .map(path => {
      // Instantiate MarkdownIt
      md = new markdownIt();
      // Add markdown-it-meta
      md.use(meta);
      // Get the order value
      file = fs.readFileSync(path, 'utf8');
      md.render(file);
      order = md.meta.order;
      // Remove "parent_path" and ".md"
      path = path.slice(parent_path.length + 1, -3);
      // Remove "README", making it the de facto index page
      if (path.endsWith('README')) {
          path = path.slice(0, -6);
      }

      return {
        path,
        order
      };
    });

  // Return the ordered list of files, sort by 'order' then 'path'
  return _.sortBy(files, ['order', 'path'])
    .map(file => file.path);
};



const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs.readdirSync(source)
    .filter(name => !(name === ".vuepress" || name === 'components') && isDirectory(path.join(source, name)));
function getName(dir, { navPrefix, stripNumbers } = {}) {
  let name = dir.split(path.sep).pop();
  const argsIndex = name.lastIndexOf("--");
  if (argsIndex > -1) {
    name = name.substring(0, argsIndex);
  }

  if (navPrefix) {
    // "nav.001.xyz" or "nav-001.xyz" or "nav_001.xyz" or "nav 001.xyz" -> "nav"
    const pattern = new RegExp(`^${escapeRegExp(navPrefix)}[.-_ ]?`);
    name = name.replace(pattern, "");
  }
  if (stripNumbers) {
    // "001.guide" or "001-guide" or "001_guide" or "001 guide" -> "guide"
    name = name.replace(/^\d+[.\-_ ]?/, "");
  }

  return startCase(name);
}
    
// getChildren('docs/01.components'); // [ '01.components', '02.com' ]
const sidebar = [];
getDirectories('./docs').forEach(dir => {
  const bars = getChildren('docs', dir);
  sidebar.push({
    title: getName(dir, { stripNumbers: true }),
    collapsable: true,
    children: bars,
  })
})

console.log(sidebar, getName('01.components'), getName('01.components', { stripNumbers: true }))

module.exports = {
  getChildren,
  sidebar
}