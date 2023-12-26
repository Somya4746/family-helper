import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

function MainHeader() {
  return (
    <div className="main-header">
      <Header as='h1' textAlign='center'>
        <div className="icon-wrapper">
          <Icon name='users' size='huge' />
        </div>
        <div className="title-text">Family Helper</div>
      </Header>
    </div>
  );
}

export default MainHeader;
