import { Text, View, Image, SafeAreaView, useWindowDimensions } from 'react-native';
import { useContext, useState} from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


import { ColorContext } from '../styles/colorContext';

import NewActivityScreen from './nested/create_screens/new_activity';
import NewTaskScreen from './nested/create_screens/new_task';
import { barHeight } from '../styles/style';

const renderScene = SceneMap({
  first: NewTaskScreen,
  second: NewActivityScreen,
});

export default function TasksScreen({navigation}) {
    const color = useContext(ColorContext);
    const layout = useWindowDimensions();


    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Create Task' },
      { key: 'second', title: 'Create Activity' },
    ]);

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: color.primary, paddingTop: barHeight}}
      />
    );
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    );
  }