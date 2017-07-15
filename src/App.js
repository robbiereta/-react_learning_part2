import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
			<Parent>
        <div className="childA"></div>
      

      </Parent>
    );
  }
}

class Parent extends React.Component {

    render() {

        //con .map
        // let items = React.Children
        // .map(this.props.children, child => child)

        // con .toArray
        // let items = React.Children.toArray(this.props.children)
        // console.log(items)

        //con .forEach
        // let items = React.Children
        //   .forEach(this.props.children, child => console.log(child.props.className))
        //   console.log(items);

        //solo para un solo child
        let items= React.Children.only(this.props.children)
        console.log(items);


        // para 2 children
        // let items=this.props.children.map(child => child)
        // console.log(items)
        return null
    }
}

export default App;
