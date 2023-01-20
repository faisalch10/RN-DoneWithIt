import { Fragment, useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  FlatList,
  Button,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import Screen from './Screen';
import PickerItem from './PickerItem';
import defaultStyles from '../config/styles';

const AppPicker = ({
  numberOfColumns = 1,
  width = '100%',
  icon,
  items,
  onSelectItem,
  selectedItem,
  placeholder,
  setFieldTouched,
  PickerItemComponent = PickerItem,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Fragment>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          <AppText style={selectedItem ? styles.text : styles.placeholder}>
            {selectedItem ? selectedItem.label : placeholder}
          </AppText>
          <MaterialCommunityIcons
            name={'chevron-down'}
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={modalVisible} animationType='slide'>
        <Button
          title='Close'
          onPress={() => {
            if (!selectedItem) {
              setFieldTouched('category');
            }
            setModalVisible(false);
          }}
        />

        <FlatList
          data={items}
          keyExtractor={item => item.value.toString()}
          numColumns={numberOfColumns}
          renderItem={({ item, index }) => (
            <PickerItemComponent
              item={item}
              onPress={() => {
                onSelectItem(item);
                setModalVisible(false);
              }}
            />
          )}
        />
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },
  text: {
    flex: 1,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppPicker;
