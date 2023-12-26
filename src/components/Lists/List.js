import React from 'react'
import { Item } from 'semantic-ui-react'

function List({title , description ,createdAt}) {
  return (
    <div>
      <Item>
      <Item.Image size = "tiny" src="https://react.semantic-ui.com/images/wireframe/image.png" />
        <Item.Content>
            <Item.Header>{title}</Item.Header>
            <Item.Description>{description}</Item.Description>
            <Item.Extra>{createdAt}</Item.Extra>
        </Item.Content>
      </Item>
    </div>
  );
}

export default List;
