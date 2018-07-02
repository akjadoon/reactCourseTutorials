import React, { Component } from 'react';
import classes from './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);
  }

  componentWillMount() {
    console.log('[App.js] Inside Component Will Mount');
  }

  componentDidMount() {
    console.log('[App.js] Inside Component Did Mount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log( '[UPDATE Persons.js] Inside componentShouldUpdate')
    return nextState.persons !== this.state.persons ||
    nextState.showPersons !== this.state.showPersons ;
  }

  state = {
    persons: [
      {id: "haa8", name: "Max", age: 28},
      {id: "asj2", name: "Manu", age: 18},
      {id: "ajj2", name: "Lee", age: 30}
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => { 
    const personIndex = this.state.persons.findIndex(p => {
      return p.userId === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState({persons: persons});
  }
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {

    let persons = null;
    

    if (this.state.showPersons){
        persons = (<Persons
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />
        );

        
    }

    console.log("[App.js] Inside Component render");
    return (
        <WithClass classes={classes.App}>
            <button onClick={() => {this.setState({showPersons: true})} }>Show Persons</button>
            <Cockpit
              appTitle={this.props.title}
              showPersons={this.state.showPersons} 
              persons={this.state.persons}
              clicked={this.togglePersonsHandler} />
            {persons}
        </WithClass>
    );
  }
}

export default App;
