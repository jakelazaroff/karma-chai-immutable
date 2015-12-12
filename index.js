var path = require('path');

var pattern = function (file) {
  return {pattern: file, included: true, served: true, watched: false};
};

var CHAI_PATH = path.resolve(require.resolve('chai'), '../chai.js');
var IMMUTABLE_PATH = path.resolve(require.resolve('immutable'));

function findDuplicates (files) {
  var duplicates = {};

  for (var i = 0; i < files.length; i++) {
    duplicates.chai = duplicates.chai || files[i].pattern === CHAI_PATH;
    duplicates.immutable = duplicates.immutable || files[i].pattern === IMMUTABLE_PATH;
  }

  return duplicates;
}

var framework = function (files) {
  var duplicates = findDuplicates(files);

  // chai
  if (!duplicates.chai) {
    files.push(pattern(CHAI_PATH));
    files.push(pattern(path.join(__dirname, 'adapter.js')));
  }

  // immutable
  if (!duplicates.immutable) {
    files.push(pattern(IMMUTABLE_PATH));
  }

  // chai-immutable
  files.push(pattern(path.resolve(require.resolve('chai-immutable'))));
};

framework.$inject = ['config.files'];
module.exports = {'framework:chai-immutable': ['factory', framework]};
