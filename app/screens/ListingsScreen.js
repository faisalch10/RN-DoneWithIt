import { FlatList } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';

const listings = [
  {
    id: 1,
    title: 'Red jacket for sale',
    price: 300,
    image: require('../assets/jacket.jpg'),
  },
  {
    id: 2,
    title: 'Couch in great condition',
    price: 400,
    image: require('../assets/couch.jpg'),
  },
];

import { StyleSheet } from 'react-native';
import colors from '../config/colors';

const ListingsScreen = () => {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <Card
            title={item.title}
            subTitle={'$' + item.price}
            image={item.image}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
