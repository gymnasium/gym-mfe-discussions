import React from 'react';
import PropTypes from 'prop-types';

import { Avatar } from '@openedx/paragon';

const LearnerAvatar = ({ username }) => (
  <div className="mr-3 mt-1">
    <Avatar
      size="sm"
      alt={username}
    />
  </div>
);

LearnerAvatar.propTypes = {
  username: PropTypes.string.isRequired,
};

export default React.memo(LearnerAvatar);
