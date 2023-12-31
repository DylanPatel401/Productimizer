import { Text, View, Image, SafeAreaView, useWindowDimensions } from 'react-native';
import { useContext, useState} from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


import { ColorContext } from '../styles/colorContext';

import TodayScreen from './nested/main_screens/today';
import PastdueScreen from './nested/main_screens/pastdue';
import CompletedScreen from './nested/main_screens/completed';
import { barHeight } from '../styles/style';

const renderScene = SceneMap({
  first: TodayScreen,
  second: PastdueScreen,
  third: CompletedScreen
});

export default function MainScreen({navigation}) {
    const color = useContext(ColorContext);
    const layout = useWindowDimensions();


    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Today' },
      { key: 'second', title: 'Past due' },
      { key: 'third', title: 'Completed'}
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
        style={{}}
        renderTabBar={renderTabBar}
      />
    );
  }
  
