import React from 'react';

export const navigationRef = React.createRef(null);

const navigate = (name, params) => {
  navigationRef?.current?.navigate(name, params);
};

export default {
  navigate,
};
