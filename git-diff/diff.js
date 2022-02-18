
const { exec } = require('child_process');


async function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, function(err, stdout, stderr) {
            if(err) {
                reject(err);
            }

            resolve(stdout);
        });
    })


}

// Return the list of modified|created|deleted files according to git, between
// the `base` commit and the `HEAD`
module.exports.getDiffFiles = async function (source, target) {
  const stdout = await execute(`git diff --name-status --no-renames ${target}...${source}`);
  const files = stdout.split('\n').map(getDiffFile).filter(Boolean)

  const modified = getFilesByType(files, 'M')
  const created = getFilesByType(files, 'A')
  const deleted = getFilesByType(files, 'D')
  return { modified, created, deleted }
}

// Parse each `git diff` line
const getDiffFile = function (line) {
  const result = DIFF_FILE_REGEXP.exec(line)

  // Happens for example when `base` is invalid
  if (result === null) {
    return
  }

  const [, type, filepath] = result
  return { type, filepath }
}

const DIFF_FILE_REGEXP = /([ADM])\s+(.*)/

const getFilesByType = function (files, type) {
  return files.filter((file) => file.type === type).map(getFilepath)
}

const getFilepath = function ({ filepath }) {
  return filepath
}