import { Fragment } from 'react';
import { useFormikContext } from 'formik';

import AppPicker from '../AppPicker';
import ErrorMessage from './ErrorMessage';

const AppFormPicker = ({
  numberOfColumns,
  name,
  items,
  width,
  PickerItemComponent,
  ...otherProps
}) => {
  const { setFieldValue, values, errors, touched, setFieldTouched } =
    useFormikContext();

  return (
    <Fragment>
      <AppPicker
        PickerItemComponent={PickerItemComponent}
        width={width}
        items={items}
        onSelectItem={category => setFieldValue(name, category)}
        selectedItem={values[name]}
        setFieldTouched={setFieldTouched}
        numberOfColumns={numberOfColumns}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Fragment>
  );
};

export default AppFormPicker;
