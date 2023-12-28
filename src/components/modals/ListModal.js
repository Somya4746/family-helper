import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import * as mutations from '../../graphql/mutations';


function ListModal({ state, dispatch ,client}) {
  
  // Define the saveList function inside the component
  const saveList = async () => {
    const { title, description } = state;
    try {
      await client.graphql({
        query: mutations.createList,
        variables: { input: { title, description } }
      });
      dispatch({ type: 'CLOSE_MODAL' });
    } catch (error) {
      console.error('Error saving list:', error);
      dispatch({ type: 'ERROR', field: 'error', value: error.message });
    }
  };

  const changeList = async () => {
    const { id, title, description } = state;
    try {
      await client.graphql({
        query: mutations.updateList,
        variables: { input: { id, title, description } }
      });
      dispatch({ type: 'CLOSE_MODAL' });
    } catch (error) {
      console.error('Error editing list:', error);
      dispatch({ type: 'ERROR', field: 'error', value: error.message });
    }
  };

  return (
    <Modal open={state.isModalOpen} dimmer='blurring'>
      <Modal.Header>
        {state.modalType === 'add' ? 'Create ' : 'Edit '}
        your list
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            label='Title'
            placeholder='My pretty list'
            value={state.title}
            onChange={(e) => dispatch({ type: 'TITLE_CHANGED', field: 'title', value: e.target.value })}
          />
          <Form.TextArea
            label='Description'
            placeholder='Things that my pretty list is about'
            value={state.description}
            onChange={(e) => dispatch({ type: 'DESCRIPTION_CHANGED', field: 'description', value: e.target.value })}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>Cancel</Button>
        <Button positive onClick={state.modalType === 'add' ? saveList : changeList}>
          {state.modalType === 'add' ? 'Save ' : 'Update '}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ListModal;
