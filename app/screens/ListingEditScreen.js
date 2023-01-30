import { Fragment, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  AppImagePicker,
  SubmitButton,
} from '../components/forms';
import Screen from '../components/Screen';
import UploadScreen from './UploadScreen';
import OfflineNotice from '../components/OfflineNotice';
import CategoryPickerItem from '../components/CategoryPickerItem';
import useLocation from '../hooks/useLocation';
import listingsAPI from '../api/listings';

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, 'Please select at least one image'),
  title: Yup.string()
    .matches(/^[A-Za-z\s]*$/, 'Only alphabets are allowed')
    .required()
    .min(1)
    .label('Title'),
  price: Yup.number().required().min(1).max(10000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
});

const categories = [
  {
    backgroundColor: '#fc5c65',
    icon: 'floor-lamp',
    label: 'Furniture',
    value: 1,
  },
  {
    backgroundColor: '#fd9644',
    icon: 'car',
    label: 'Cars',
    value: 2,
  },
  {
    backgroundColor: '#fed330',
    icon: 'camera',
    label: 'Cameras',
    value: 3,
  },
  {
    backgroundColor: '#26de81',
    icon: 'cards',
    label: 'Games',
    value: 4,
  },
  {
    backgroundColor: '#2bcbba',
    icon: 'shoe-heel',
    label: 'Clothing',
    value: 5,
  },
  {
    backgroundColor: '#45aaf2',
    icon: 'basketball',
    label: 'Sports',
    value: 6,
  },
  {
    backgroundColor: '#4b7bec',
    icon: 'headphones',
    label: 'Movies & Music',
    value: 7,
  },
  {
    backgroundColor: '#a55eea',
    icon: 'book-open-variant',
    label: 'Books',
    value: 8,
  },
  {
    backgroundColor: '#778ca3',
    icon: 'application',
    label: 'Other',
    value: 9,
  },
];

const ListingEditScreen = () => {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);

    setUploadVisible(true);
    const response = await listingsAPI.addListing(
      { ...listing, location },
      progress => setProgress(progress)
    );

    if (!response.ok) {
      alert('Could not save the listing.');
      setUploadVisible(false);
    }

    resetForm();
  };

  return (
    <Fragment>
      <OfflineNotice />
      <Screen style={styles.container}>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <AppForm
          initialValues={{
            images: [],
            title: '',
            price: '',
            description: '',
            category: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <AppImagePicker name='images' />
          <AppFormField
            maxLength={255}
            autoCorrect={false}
            placeholder='Title'
            name='title'
          />
          <AppFormField
            width={150}
            autoCorrect={false}
            placeholder='Price'
            name='price'
            keyboardType='numeric'
            maxLength={8}
          />

          <AppFormPicker
            width='50%'
            name='category'
            placeholder='Category'
            items={categories}
            PickerItemComponent={CategoryPickerItem}
            numberOfColumns={3}
          />

          <AppFormField
            placeholder='Description'
            name='description'
            maxLength={255}
            multiline
            numberOfLines={3}
          />

          <SubmitButton title='Post' />
        </AppForm>
      </Screen>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 40,
  },
});

export default ListingEditScreen;
