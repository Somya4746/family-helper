import React from 'react';
import { Icon, Item } from 'semantic-ui-react';

function List(props) {
  const { id, title, description, createdAt, dispatch } = props;
  return (
    <div>
      <Item>
        <Item.Image size="tiny" src="https://react.semantic-ui.com/images/wireframe/image.png" />
        <Item.Content>
          <Item.Header>{title}</Item.Header>
          <Item.Description>{description}</Item.Description>
          <Item.Extra>
            {new Date(createdAt).toDateString()}
            <Icon name='trash' className='ml-trash' onClick={() => dispatch({ type: 'DELETE_LIST', value: id })} />
            <Icon name='edit' onClick={() => dispatch({ type: 'EDIT_LIST', value: props })} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </div>
  );
}

export default List;
