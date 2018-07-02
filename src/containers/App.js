import React, { Component } from 'react';
import classes from './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);
    this.state = {
      persons: [
        {id: "haa8", name: "Max", age: 28},
        {id: "asj2", name: "Manu", age: 18},
        {id: "ajj2", name: "Lee", age: 30}
      ],
      showPersons: false,
      toggleClicked: 0
    }
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
    this.setState( (prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
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
        <React.Fragment>
            <button onClick={() => {this.setState({showPersons: true})} }>Show Persons</button>
            <Cockpit
              appTitle={this.props.title}
              showPersons={this.state.showPersons} 
              persons={this.state.persons}
              clicked={this.togglePersonsHandler} />
            {persons}
        </React.Fragment>
    );
  }
}

export default withClass(App, classes.App);
