import React from 'react';
import { FlatList, View ,BackHandler, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../../components/Carousel/Carousel';
import CategoryHomeCardTop from '../../components/CategoryHomeCardTop/CategoryHomeCardTop';
import ExtraSection1 from '../../components/ExtraSection1/ExtraSection1';
import ExtraSection2 from '../../components/ExtraSection2/ExtraSection2';
import ExtraSection3 from '../../components/ExtraSection3/ExtraSection3';
import ExtraSection4 from '../../components/ExtraSection4/ExtraSection4';
import ExtraSection5 from '../../components/ExtraSection5/ExtraSection5';
import ExtraSection6 from '../../components/ExtraSection6/ExtraSection6';
import ExtraSection7 from '../../components/ExtraSection7/ExtraSection7';
import CategoryHomeCard from '../../components/CategoryHomeCard/CategoryHomeCard';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useFocusEffect } from 'expo-router';

const Index = () => {
  const handleBackPress = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandlerListener = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        backHandlerListener.remove();
      };
    }, [])
  );

  // Define your sections
  const sections = [
    { key: 'carousel', component: <Carousel /> },
    { key: 'CategoryHomeCardTop', component: <CategoryHomeCardTop /> },
    { key: 'extraSection1', component: <ExtraSection1 /> },
    { key: 'extraSection2', component: <ExtraSection2 /> },
    { key: 'extraSection3', component: <ExtraSection3 /> },
    { key: 'extraSection4', component: <ExtraSection4 /> },
    { key: 'extraSection5', component: <ExtraSection5 /> },
    { key: 'CategoryHomeCard', component: <CategoryHomeCard /> },
    { key: 'extraSection6', component: <ExtraSection6 /> },
    { key: 'extraSection7', component: <ExtraSection7 /> },
  ];

  return (
    <View>
      <Navbar />
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <View>{item.component}</View>}
      // ListHeaderComponent={<Navbar />}  // You can set Navbar as the header of the FlatList, if needed.
      />
    </View>
  );
};

export default Index;
