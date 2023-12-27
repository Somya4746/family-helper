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
import { onCreateList } from './graphql/subscriptions';
import { graphqlOperation } from '@aws-amplify/api-graphql';

Amplify.configure(awsExports);

const initialState = {
  title: '',
  description: '',
  isModalOpen: false,
  error: null
};

function listReducer(state, action) {
  switch (action.type) {
    case 'DESCRIPTION_CHANGED':
    case 'TITLE_CHANGED':
    case 'ERROR':
      return { ...state, [action.field]: action.value };
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...initialState };
    default:
      console.error('Unhandled action type:', action.type);
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(listReducer, initialState);
  const [lists, setLists] = useState([]);
  const client = generateClient();

  const fetchList = async () => {
    try {
      const listData = await client.graphql({ query: queries.listLists });
      setLists(listData.data.listLists.items);
    } catch (error) {
      console.error('Error fetching lists:', error);
      dispatch({ type: 'ERROR', field: 'error', value: error.message });
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    const subscription = client
      .graphql(graphqlOperation(onCreateList))
      .subscribe({
        next: response => {
          const newList = response?.data?.onCreateList;
          if (newList) {
            setLists(prevLists => [newList, ...prevLists]);
          }
        },
        error: error => {
          console.error('Subscription error:', error);
          dispatch({ type: 'ERROR', field: 'error', value: error.message });
        }
      });
  
    return () => subscription.unsubscribe();
  }, []);

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

  return (
    <>
      <MainHeader />
      <Authenticator>
        {({ signOut, user }) => (
          <>
            <Container style={{ height: '100vh' }}>
              <Button
                className='floatingButton'
                onClick={() => dispatch({ type: 'OPEN_MODAL' })}>
                <Icon name='plus' className='floatingButton_icon' />
              </Button>

              <main>
                <h1>Hello {user.username}</h1>
                <button className="fluid ui button" onClick={signOut}>Sign out</button>
                {state.error && <p>Error: {state.error}</p>}
                <Lists lists={lists} />
              </main>

              <Modal open={state.isModalOpen} dimmer='blurring'>
                <Modal.Header>Create your list</Modal.Header>
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
