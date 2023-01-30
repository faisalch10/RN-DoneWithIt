import { Fragment } from 'react';
import { useFormikContext } from 'formik';

import ImageInputList from '../ImageInputList';
import ErrorMessage from './ErrorMessage';

const AppImagePicker = ({ name }) => {
  const { errors, values, touched, setFieldValue } = useFormikContext();

  const handleAdd = uri => {
    setFieldValue(name, [...values[name], uri]);
  };

  const handleRemove = uri => {
    setFieldValue(
      name,
      values[name].filter(imageUri => imageUri !== uri)
    );
  };

  return (
    <Fragment>
      <ImageInputList
        imageUris={values[name]}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Fragment>
  );
};

export default AppImagePicker;
