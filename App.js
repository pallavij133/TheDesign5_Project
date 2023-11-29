import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from './FeedScreen';
import AddPostScreen from './AddPostScreen';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

//Two screen Created first one is feed to display a searchable list of posts fetched from an API and second one is add a new post, and ensure that the submitted post is saved to local storage.

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Add Post" component={AddPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




