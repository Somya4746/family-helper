// Import necessary Amplify and React components
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify'; // Named import for Amplify
import { graphqlOperation } from '@aws-amplify/api-graphql'; // Import graphqlOperation from '@aws-amplify/api-graphql'
import { listLists } from './graphql/queries'; // Make sure this is the correct query
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import MainHeader from './components/Headers/MainHeader';
import Lists from './components/Lists/Lists';
import { Button, Container, Icon } from 'semantic-ui-react';



// Configure Amplify with your aws-exports
Amplify.configure(awsExports);

export default function App() {
  const [lists, setLists] = useState([]);

  // Fetch list from the API using Amplify.API
  async function fetchList() {
    try {
      const listData = await Amplify.API.graphql(graphqlOperation(listLists));
      const lists = listData.data.listLists.items;
      setLists(lists);
    } catch (error) {
      console.error('Error fetching lists', error);
    }
  }

  // Use useEffect to fetch the list when the component mounts
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <Button className='floatingButton'>
        <Icon name = 'plus' className='floatingButton_icon'/>
      </Button>
      <MainHeader />

      <Authenticator>

        {({ signOut, user }) => (

          <Container>

            <main>
              <h1>Hello {user.username}</h1>
              <button className="fluid ui button" onClick={signOut}>Sign out</button>

              {/* Render fetched lists */}
              <Lists lists={lists} />
            </main>
          </Container>
        )}
      </Authenticator>

    </>
  );
}
