import React, { Component } from 'react';

import Person from './Person/Person';
class Persons extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);
  }

  componentWillMount() {
    console.log('[App.js] Inside Component Will Mount');
  }

  componentDidMount() {
    console.log('[.js] Inside Component Did Mount');
  }
  shouldComponentUpdate( nextProps, nextState) {
    console.log('[Update Persons.js] Inside shouldComponentUpdate')
    return nextProps.persons !== this.props.persons ;
  }
  
  
  render(){
    return this.props.persons.map((person, index) => {
      return <Person 
      click={() => this.props.clicked(index)}
      name={person.name}
      age={person.age}
      key={person.id}
      changed={(event) => this.props.changed(event, person.id)} />
    });
  }
}



export default Persons;