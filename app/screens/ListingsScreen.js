import { useEffect, Fragment } from 'react';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import routes from '../navigation/routes';
import colors from '../config/colors';
import listingsAPI from '../api/listings';
import useHttp from '../hooks/useHttp';

const ListingsScreen = ({ navigation }) => {
  const {
    loading,
    data: listings,
    error,
    request: loadListings,
  } = useHttp(listingsAPI.getListings);

  const { LISTING_DETAILS } = routes;

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <Fragment>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <Fragment>
            <AppText>Couldn't retrieve the listings</AppText>
            <AppButton title='Retry' onPress={loadListings} />
          </Fragment>
        )}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={listings}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <Card
              title={item.title}
              subTitle={'$' + item.price}
              imageUrl={item.images[0].url}
              thumbnailUrl={item.images[0].thumbnailUrl}
              onPress={() => {
                navigation.navigate(LISTING_DETAILS, item);
              }}
            />
          )}
        />
      </Screen>
    </Fragment>
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
