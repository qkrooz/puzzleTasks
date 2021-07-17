import React, {useContext, createContext, useState, useEffect} from 'react';
import {AppContext} from '../../App';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TopTabBar from '../components/TopTabBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Moment from 'moment';
import {
  Container,
  Header,
  Controls,
  ControlButton,
  TabViewContainer,
  BottomButton,
  TaskItemContainer,
} from '../styles/home_styles';
const Tab = createMaterialTopTabNavigator();
const HomeContext = createContext();
export default function Home({navigation}) {
  const {tasks_state} = useContext(AppContext);
  const [, set_tasks] = tasks_state;
  const changeTaskState = (id, checked) => {
    const newStatus = checked ? 'completed' : 'uncompleted';
    let out;
    set_tasks(tasks => {
      const tasks_copy = [...tasks];
      const index = tasks_copy.findIndex(item => item.id === id);
      if (index > -1) {
        tasks_copy[index].status = newStatus;
      }
      out = tasks_copy;
      return tasks_copy;
    });
  };
  return (
    <HomeContext.Provider value={{changeTaskState: changeTaskState}}>
      <Container>
        <Header>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Board</Text>
          <Controls>
            <ControlButton>
              <Icon name="search" size={20} />
            </ControlButton>
            <ControlButton>
              <Icon name="bell" size={20} />
            </ControlButton>
            <ControlButton>
              <Icon name="menu" size={20} />
            </ControlButton>
          </Controls>
        </Header>
        <Tab.Navigator tabBar={props => <TopTabBar {...props} />}>
          <Tab.Screen name="All" component={All} />
          <Tab.Screen name="Completed" component={Completed} />
          <Tab.Screen name="Uncompleted" component={Uncompleted} />
          <Tab.Screen name="Favorite" component={Favorite} />
        </Tab.Navigator>
        <BottomButton>
          <TouchableOpacity
            onPress={() => navigation.navigate('addtask')}
            style={{
              width: '90%',
              backgroundColor: '#5dbd75',
              display: 'flex',
              alignItems: 'center',
              paddingVertical: 15,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white'}}>Add a task</Text>
          </TouchableOpacity>
        </BottomButton>
      </Container>
    </HomeContext.Provider>
  );
}
function All() {
  const {tasks_state} = useContext(AppContext);
  const [tasks] = tasks_state;
  const [sortedArray, set_sortedArray] = useState([]);
  useEffect(() => {
    if (tasks.length !== 0) {
      const copy = [...tasks];
      const sortedArray = copy.sort(
        (a, b) => new Moment(b.created).unix() - new Moment(a.created).unix(),
      );
      set_sortedArray(sortedArray);
    }
  }, [tasks]);
  return (
    <TabViewContainer>
      {tasks.length !== 0 ? (
        sortedArray.map(key => <TaskItem key={key.id} data={key} />)
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
          }}>
          <Text style={{color: 'gray'}}>Tasks will appear here</Text>
        </View>
      )}
      <View style={{height: 100}} />
    </TabViewContainer>
  );
}
function Completed() {
  const {tasks_state} = useContext(AppContext);
  const [tasks] = tasks_state;
  const [sortedArray, set_sortedArray] = useState([]);
  useEffect(() => {
    if (tasks.length !== 0) {
      const copy = [...tasks.filter(item => item.status === 'completed')];
      const sortedArray = copy.sort(
        (a, b) => new Moment(b.created).unix() - new Moment(a.created).unix(),
      );
      set_sortedArray(sortedArray);
    }
  }, [tasks]);
  return (
    <TabViewContainer>
      {tasks.filter(item => item.status === 'completed').length !== 0 ? (
        sortedArray.map(key => <TaskItem key={key.id} data={key} />)
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
          }}>
          <Text style={{color: 'gray'}}>Completed tasks will appear here</Text>
        </View>
      )}
      <View style={{height: 100}} />
    </TabViewContainer>
  );
}
function Uncompleted() {
  const {tasks_state} = useContext(AppContext);
  const [tasks] = tasks_state;
  const [sortedArray, set_sortedArray] = useState([]);
  useEffect(() => {
    if (tasks.length !== 0) {
      const copy = [...tasks.filter(item => item.status === 'uncompleted')];
      const sortedArray = copy.sort(
        (a, b) => new Moment(b.created).unix() - new Moment(a.created).unix(),
      );
      set_sortedArray(sortedArray);
    }
  }, [tasks]);
  return (
    <TabViewContainer>
      {tasks.filter(item => item.status === 'uncompleted').length !== 0 ? (
        sortedArray.map(key => <TaskItem key={key.id} data={key} />)
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
          }}>
          <Text style={{color: 'gray'}}>
            Uncompleted tasks will appear here
          </Text>
        </View>
      )}

      <View style={{height: 100}} />
    </TabViewContainer>
  );
}
function Favorite() {
  return (
    <TabViewContainer
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: 'gray'}}>Favorite tasks will appear here</Text>
      <View style={{height: 100}} />
    </TabViewContainer>
  );
}
const TaskItem = ({data}) => {
  const {changeTaskState} = useContext(HomeContext);
  const [thisColor, setThisColor] = useState();
  const colors = ['#ea5d4f', '#ebc79d', '#f7e296', '#a7caed'];
  useEffect(() => {
    const thisColor = colors[Math.floor(Math.random() * colors.length)];
    setThisColor(thisColor);
  }, []);
  return (
    <TaskItemContainer>
      <BouncyCheckbox
        disableBuiltInState
        onPress={() => {
          changeTaskState(data.id, data.status === 'completed' ? false : true);
        }}
        iconStyle={{borderRadius: 8, borderWidth: 2, borderColor: thisColor}}
        size={30}
        isChecked={data.status === 'completed' ? true : false}
        text={data.title}
        fillColor={thisColor}
        textStyle={{color: 'black', textDecorationLine: 'none'}}
      />
    </TaskItemContainer>
  );
};
