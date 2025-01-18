import React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../../components/Carousel/Carousel';
import ExtraSection1 from '../../components/ExtraSection1/ExtraSection1';
import ExtraSection2 from '../../components/ExtraSection2/ExtraSection2';
import ExtraSection3 from '../../components/ExtraSection3/ExtraSection3';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // Define your sections
  const sections = [
    { key: 'carousel', component: <Carousel /> },
    { key: 'extraSection1', component: <ExtraSection1 /> },
    { key: 'extraSection2', component: <ExtraSection2 /> },
    { key: 'extraSection3', component: <ExtraSection3 /> },
  ];

  return (
    <View>
      <Navbar/>
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
