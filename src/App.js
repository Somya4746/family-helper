import 'semantic-ui-css/semantic.min.css';
import './App.css';
import React, { useState, useEffect, useReducer, useMemo } from 'react';
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
import { onCreateList ,onDeleteList, onUpdateList} from './graphql/subscriptions';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import ListModal from './components/modals/ListModal';


Amplify.configure(awsExports);

const initialState = {
  id: '',
  title: '',
  description: '',
  isModalOpen: false,
  error: null,
  deletingListId: null ,// New state property for tracking deletion
  modalType:''
};


function listReducer(state, action) {
  switch (action.type) {
    case 'DESCRIPTION_CHANGED':
    case 'TITLE_CHANGED':
    case 'ERROR':
      return { ...state, [action.field]: action.value };
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true ,modalType:'add'};
    case 'CLOSE_MODAL':
  // Preserve the id when closing the modal if it's an edit action
  const newState = { ...initialState };
  if (state.modalType === 'edit') {
    newState.id = state.id;
  }
  return newState;

    case 'DELETE_LIST':
      // Set the ID of the list to be deleted
      return { ...state, deletingListId: action.value };
    case 'EDIT_LIST':{
      const newValue = {...action.value}
      delete newValue.dispatch;
      console.log(newValue);
      return { ...state ,isModalOpen: true,modalType:'edit' ,id: newValue.id ,title: newValue.title , description: newValue.description};
    }
    default:
      console.error('Unhandled action type:', action.type);
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(listReducer, initialState);
  const [lists, setLists] = useState([]);

  const client = useMemo(() => generateClient(), []);

  async function deleteListById(id) {
    try {
      await client.graphql(graphqlOperation(mutations.deleteList, { input: { id } }));
      console.log('List deleted:', id);
      // Remove the list from the state
      setLists(lists.filter(list => list.id !== id));
    } catch (error) {
      console.error('Error deleting list:', error);
      dispatch({ type: 'ERROR', field: 'error', value: error.message });
    }
  }

  useEffect(() => {
    async function fetchList() {
      try {
        const listData = await client.graphql({ query: queries.listLists });
        setLists(listData.data.listLists.items);
      } catch (error) {
        console.error('Error fetching lists:', error);
        dispatch({ type: 'ERROR', field: 'error', value: error.message });
      }
    }

    fetchList();
  }, [client]);

  useEffect(() => {
    const subscription = client.graphql(graphqlOperation(onCreateList)).subscribe({
      next: response => {
        const newList = response?.data?.onCreateList;
        if (newList) {
          setLists(prevLists => [newList, ...prevLists]);
        }
      },
      error: error => {
        console.error('The create subscription error:', error);
        dispatch({ type: 'ERROR', field: 'error', value: error.message });
      },
    });

    return () => subscription.unsubscribe();
  }, [client]);

  useEffect(() => {
    const updateSubscription = client.graphql(graphqlOperation(onUpdateList)).subscribe({
      next: response => {
        const updatedList = response?.data?.onUpdateList;
        if (updatedList) {
          // Update the lists state to reflect the changes
          setLists(prevLists => prevLists.map(list => {
            return list.id === updatedList.id ? updatedList : list;
          }));
        }
      },
      error: error => {
        console.error('The update subscription error:', error);
        dispatch({ type: 'ERROR', field: 'error', value: error.message });
      },
    });
  
    return () => updateSubscription.unsubscribe();
  }, [client]);
  

  useEffect(() => {
    const deleteSubscription = client.graphql(graphqlOperation(onDeleteList)).subscribe({
      next: response => {
        const deletedListId = response?.data?.onDeleteList?.id;
        if (deletedListId) {
          setLists(prevLists => prevLists.filter(list => list.id !== deletedListId));
        }
      },
      error: error => {
        console.error('The delete subscription error:', error);
        dispatch({ type: 'ERROR', field: 'error', value: error.message });
      },
    });

    return () => deleteSubscription.unsubscribe();
  }, [client]);

  useEffect(() => {
    // Handle deletion when the deletingListId changes
    if (state.deletingListId) {
      deleteListById(state.deletingListId);
      dispatch({ type: 'DELETE_LIST', value: null }); // Reset the deletingListId after deletion
    }
  }, [state.deletingListId]);



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
                <Lists lists={lists} dispatch={dispatch} />
              </main>

    
            </Container>
            <ListModal state={state} dispatch={dispatch} client={client} />
          </>
          
        )}
      </Authenticator>
    </>
  );
}
