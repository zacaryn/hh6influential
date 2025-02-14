import React from 'react';
import { Helmet } from 'react-helmet';

function PageHead({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
    </Helmet>
  );
}

export default PageHead; 