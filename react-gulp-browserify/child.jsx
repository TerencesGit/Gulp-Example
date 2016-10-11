var React = require('./react');

var Child = React.createClass({

	getInitialState: function() {
	    return {
	        vaule: 'true'  
	    };
	},
	handleChange: function(event){
		if(this.props.onChange){
			this.props.onChange(event)
		}
		this.setState({
			value: event.target.event
		})
	},
	render: function(){
		return (
			<div>
				<label>{this.props.label}</label>
				<input type="radio" name={this.props.name} checked={this.state.value == 'true'} value="true" onchange={this.handleChange} />
				"true"
				<input type="radio" name={this.props.name} checked={this.state.value == 'false'} value="false" onchange={this.handleChange} />
				"false"
			</div>	
		)
	}
})
module.exports =  Child;