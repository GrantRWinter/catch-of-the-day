import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {


  // will use the below contructor way for methods that get used more than once in a class.

  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }



  goToStore(event) {
    event.preventDefault();
    console.log("You changed the url");
    // first grab the text from box
    const storeId = this.storeInput.value;
    console.log(this.storeInput.value);
    // second we're going to transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      // <form className="store-selector" onSubmit={this.goToStore.bind(this)} > // this way of doing things will only reference one element
      // the below way will create the same reference for multiple elements on the page
      <form className="store-selector" onSubmit={ (e) => this.goToStore(e) } >

        { /* comment in jsx , always return in element also */}
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
