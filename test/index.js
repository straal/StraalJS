var testsContext = require.context('.', true, /test_.+\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('../src', true, /.+\.js$/);
srcContext.keys().forEach(srcContext);
