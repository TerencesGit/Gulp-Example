var React = require('./react');
var Parent = require('./parent.jsx');
console.log(React.render)
React.render(<Parent></Parent>, document.body);
Perf = React.addons.Perf;