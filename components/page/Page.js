import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import s from './Page.css';

@inject('store')
@observer
class Page extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
