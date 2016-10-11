var React = require('./react');
var Child = require('./child.jsx');

var Parent = React.createClass({
	getInitialState: function() {
	    return {
	        name: ['judge-1','judge-2','judge-3'],
	        label: ['do you like this demo',
	        	'do you want to know react',
	        	'do you want to learn react'
	        ],
	        value1: 'true',
	        value2: 'true',
	        value3: 'true'
	    };
	},
	handleChange: function(value, event){
		var newState = {};
		newState[value] = event.target.value;
		this.setState(newState)
 	},
 	handleSubmit: function(event){
 		event.preventDefault();
 		console.log(this.state)
 	},
 	render: function(){
 		var renderChilds = [];
 		renderChilds =this.state.name.map(function(value,index){
 			return (
 				<Child name={this.state.name[index]} 
 					label={this.state.lable[index]} 
 					onChange={this.handleChange.bind(this,"value"+(index+1))}>
 				</Child>
 			)
 		}.bind(this));
 		return (
 			<form onSubmit={this.handleSubmit}>
 				{renderChilds}
 				<button type="submit">提交</button> 
 			</form>
 		)
 	}
})
module.exports = Parent;