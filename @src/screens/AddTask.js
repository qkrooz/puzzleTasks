import React, {useState, useContext} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import {AppContext} from '../../App';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
// styles
import {
  Field,
  FieldHeader,
  FieldInput,
  FakeFieldInput,
} from '../styles/addtask_styles';
import {Container, Header, BottomButton} from '../styles/home_styles';
import {Picker} from '@react-native-picker/picker';
export default function AddTask({navigation}) {
  // context
  const {tasks_state} = useContext(AppContext);
  const [, set_tasks] = tasks_state;
  // states
  const [formInfo, setFormInfo] = useState({
    title: '',
    deadline: '2021-07-15',
    start_date: '10:00 am',
    end_date: '10:00 pm',
    remind: '',
    repeat: '',
    status: 'uncompleted',
    created: '',
    id: '',
  });
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [property, set_property] = useState('');
  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let out;
    if (property === 'deadline') {
      out = moment(selectedDate).format('YYYY-MM-DD');
    } else if (property === 'start_date' || property === 'end_date') {
      out = moment(selectedDate).format('H:mm a');
    }
    setFormInfo(formInfo => ({...formInfo, [property]: out}));
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const submit = () => {
    const out = {...formInfo};
    out.created = moment().format();
    out.id = Date.now();
    if (out.title) {
      set_tasks(tasks => [...tasks, out]);
      navigation.navigate('home');
    }
  };
  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={20} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 25}}>
          Add Task
        </Text>
      </Header>
      <ScrollView style={{backgroundColor: 'white', paddingTop: 15}}>
        <Field>
          <FieldHeader>Title</FieldHeader>
          <FieldInput
            placeholder="Design team meeting"
            value={formInfo.title}
            onChangeText={text =>
              setFormInfo(formInfo => ({...formInfo, title: text}))
            }
          />
        </Field>
        <Field>
          <FieldHeader>Deadline</FieldHeader>
          <TouchableWithoutFeedback
            onPress={() => {
              showDatepicker();
              set_property('deadline');
            }}>
            <FakeFieldInput>
              <Text style={{color: '#B5B5B5'}}>{formInfo.deadline}</Text>
            </FakeFieldInput>
          </TouchableWithoutFeedback>
        </Field>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Field>
            <FieldHeader>Start time</FieldHeader>
            <TouchableWithoutFeedback
              onPress={() => {
                showTimepicker();
                set_property('start_date');
              }}>
              <FakeFieldInput>
                <Text style={{color: '#B5B5B5'}}>{formInfo.start_date}</Text>
              </FakeFieldInput>
            </TouchableWithoutFeedback>
          </Field>
          <Field>
            <FieldHeader>End time</FieldHeader>
            <TouchableWithoutFeedback
              onPress={() => {
                showTimepicker();
                set_property('end_date');
              }}>
              <FakeFieldInput>
                <Text style={{color: '#B5B5B5'}}>{formInfo.end_date}</Text>
              </FakeFieldInput>
            </TouchableWithoutFeedback>
          </Field>
        </View>
        <Field>
          <FieldHeader>Remind</FieldHeader>
          <View
            style={{
              backgroundColor: '#f9f9f8',
              borderRadius: 10,
            }}>
            <Picker
              selectedValue={formInfo.remind}
              onValueChange={(itemValue, itemIndex) =>
                setFormInfo(formInfo => ({...formInfo, remind: itemValue}))
              }
              style={{color: '#B5B5B5'}}>
              <Picker.Item label="10 minutes early" value="10" />
              <Picker.Item label="20 minutes early" value="20" />
            </Picker>
          </View>
        </Field>
        <Field>
          <FieldHeader>Repeat</FieldHeader>
          <View style={{backgroundColor: '#f9f9f8', borderRadius: 10}}>
            <Picker
              selectedValue={formInfo.repeat}
              style={{color: '#B5B5B5'}}
              onValueChange={(itemValue, itemIndex) =>
                setFormInfo(formInfo => ({...formInfo, repeat: itemValue}))
              }>
              <Picker.Item label="Daly" value="daly" />
              <Picker.Item label="Weekly" value="weekly" />
            </Picker>
          </View>
        </Field>
        <View style={{height: 100}} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>
      <BottomButton>
        <TouchableOpacity
          onPress={submit}
          style={{
            width: '90%',
            backgroundColor: '#5dbd75',
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 15,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Create a task</Text>
        </TouchableOpacity>
      </BottomButton>
    </Container>
  );
}
