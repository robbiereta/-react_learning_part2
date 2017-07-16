import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  constructor(){
  	super();
  	this.state = {
      red:0,
    };
    this.update=this.update.bind(this)
  }
  update(e){
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,

    })
  }
  render() {
    return (
			<div>
        <NumInput
          ref="red"
          update={this.update}
          min={1}
          max={255}
          step={1}
          val={+this.state.red}
          label="Red"
          update={this.update}/>
			</div>
    );
  }
}

class NumInput extends React.Component {

    render() {
      let label = this.props.label !== '' ? //si no existe label entonces se crea una , sino es un empty string
        <label>{this.props.label} - {this.props.val}</label> : ''
        return (
            <div>
            <input ref="inp"
              type={this.props.type}
              min={this.props.min}
              max={this.props.max}
              step={this.props.step}
              defaultValue={this.props.val}
              onChange={this.props.update}/>
              {label}

            </div>

        )
    }
}

NumInput.propTypes={
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  val: PropTypes.number,
  label: PropTypes.string,
  update: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['number','range'])
}
NumInput.defaultProps = {
  min:0,
  max:0,
  step:1,
  val:0,
  label:'',
  type:'range'
}
export default App;
