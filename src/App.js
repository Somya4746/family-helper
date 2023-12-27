import 'semantic-ui-css/semantic.min.css';
import './App.css';
import React, { useState, useEffect, useReducer } from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { generateClient } from 'aws-amplify/api';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import MainHeader from './components/Headers/MainHeader';
import Lists from './components/Lists/Lists';
import { Button, Container, Form, Icon, Modal } from 'semantic-ui-react';

Amplify.configure(awsExports);

const initialState = {
  title: '',
  description: ''
}

function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'DESCRIPTION_CHANGED':
      return { ...state, description: action.value };
    case 'TITLE_CHANGED':
      return { ...state, title: action.value };
    default:
      console.log('Default action for: ', action);
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(listReducer, initialState)
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const client = generateClient();

  async function fetchList() {
    try {
      const listData = await client.graphql({ query: queries.listLists });
      const lists = listData.data.listLists.items;
      setLists(lists);
    } catch (error) {
      console.error('Error fetching lists', error);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  function toggleModal(shouldOpen) {
    setIsModalOpen(shouldOpen);
  }

  async function saveList(){ 
    const { title, description } = state;
    try {
      await client.graphql({
        query: mutations.createList,
        variables: { input: { title, description }}
      });
      toggleModal(false);
      fetchList(); // Refresh the list after saving
    } catch (error) {
      console.error('Error saving list', error);
    }
  }

  return (
    <>
      <MainHeader />

      <Authenticator>
        {({ signOut, user }) => (
          <>
            <Container style={{ height: '100vh' }}>
              <Button className='floatingButton' onClick={() => toggleModal(true)}>
                <Icon name='plus' className='floatingButton_icon' />
              </Button>

              <main>
                <h1>Hello {user.username}</h1>
                <button className="fluid ui button" onClick={signOut}>Sign out</button>
                <Lists lists={lists} />
              </main>

              <Modal open={isModalOpen} dimmer='blurring'>
                <Modal.Header> Create your list </Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Input
                      label='Title'
                      placeholder='My pretty list'
                      value={state.title}
                      onChange={(e) => dispatch({ type: 'TITLE_CHANGED', value: e.target.value })}
                    />
                    <Form.TextArea
                      label='Description'
                      placeholder='Things that my pretty list is about'
                      value={state.description}
                      onChange={(e) => dispatch({ type: 'DESCRIPTION_CHANGED', value: e.target.value })}
                    />
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={() => toggleModal(false)}>Cancel</Button>
                  <Button positive onClick={saveList}>Save</Button>
                </Modal.Actions>
              </Modal>
            </Container>
          </>
        )}
      </Authenticator>
    </>
  );
}
