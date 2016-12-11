import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

  constructor() {
    super();
    // getInitialState
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
      , {
      context: this,
      state: 'fishes'
    });

    // check if any order in localstorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      //update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish(fish) {
    //update state
    const fishes = {...this.state.fishes};

    // add new fish

    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //this.state.fishes.fish1 = fish;
    //set state

    //this.setState({ fishes: fishes})  ** this is the old way. Below is the es6 way that is now allowed
    this.setState({ fishes });
  }

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes })
  }

  removeFish(key){
    const fishes = {...this.state.fishes};
    // you would think the below would work, but firebase has some different behavior
    // delete fishes[key]
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // copy of state
    const order = {...this.state.order};
    // update or add the new number of fish

    order[key] = order[key] + 1 || 1;

    // update state

    this.setState({order})
  }

  removeFromOrder(key){
    const order = {...this.state.order};

    delete order[key];

    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
        <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            { Object
               .keys(this.state.fishes)
               .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes}
               order={this.state.order}
               params={this.props.params}
               removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          storeId={this.props.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;