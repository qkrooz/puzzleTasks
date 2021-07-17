import React, {useEffect, createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// screens
import Home from './@src/screens/Home';
import AddTask from './@src/screens/AddTask';
const Stack = createStackNavigator();
export const AppContext = createContext();
export default function App() {
  const [tasks, set_tasks] = useState([]);
  // reading async storage
  useEffect(async () => {
    try {
      const jsonTasks = await AsyncStorage.getItem('tasks');
      if (jsonTasks) {
        set_tasks(JSON.parse(jsonTasks));
      } else set_tasks([]);
    } catch (err) {}
  }, []);
  // writting async storage on global variable change
  useEffect(async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);
  return (
    <AppContext.Provider value={{tasks_state: [tasks, set_tasks]}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="addtask"
            component={AddTask}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
