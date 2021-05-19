const fs = require('fs')
const path = require('path')
const sourcePath = path.resolve('./note/docs/nav.10.JS/10-Core/')
const targetPath = path.resolve('./docs/components')

function syncFiles(sourcePath, targetPath, fileName = '') {
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath)
  }
  fs.readdir(sourcePath, function (err, paths) {
    if (err) {
      console.log('读取文件夹出错')
    }
    paths.map(p => {
      console.log('p', p, !/\.md/.test(p), !/\./.test(p))
      if (!/\./.test(p)) { // 如果是文件夹
        return syncFiles(path.join(sourcePath, p), targetPath)
      }
      if (!/\.md/.test(p)) {
        return
      }
      const readstream = fs.createReadStream(path.join(sourcePath, p))
      const writestream = fs.createWriteStream(path.join(targetPath, p))
      readstream.pipe(writestream)
    })
  })
}
syncFiles(sourcePath, targetPath)