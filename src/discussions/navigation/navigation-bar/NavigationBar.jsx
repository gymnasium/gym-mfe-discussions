import React, { useContext, useMemo } from 'react';

import { Nav } from '@openedx/paragon';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

import { useIntl } from '@edx/frontend-platform/i18n';

import { Routes } from '../../../data/constants';
import DiscussionContext from '../../common/context';
import { discussionsPath } from '../../utils';
import messages from './messages';
import { slugify } from '@openedx/gym-frontend';

const NavigationBar = () => {
  const intl = useIntl();
  const { courseId } = useContext(DiscussionContext);
  const location = useLocation();
  const isTopicsNavActive = Boolean(matchPath({ path: `${Routes.TOPICS.CATEGORY}/*` }, location.pathname));

  const navLinks = useMemo(() => ([
    {
      route: Routes.POSTS.MY_POSTS,
      labelMessage: messages.myPosts,
      className: slugify(messages.myPosts.defaultMessage),
    },
    {
      route: Routes.POSTS.ALL_POSTS,
      labelMessage: messages.allPosts,
      className: slugify(messages.allPosts.defaultMessage),
    },
    {
      route: Routes.TOPICS.ALL,
      labelMessage: messages.allTopics,
      className: slugify(messages.allTopics.defaultMessage),
    },
    {
      route: Routes.LEARNERS.PATH,
      labelMessage: messages.learners,
      className: slugify(messages.learners.defaultMessage),
    },

  ]), []);

  return (
    <Nav variant="pills" className="py-2 nav-button-group">
      {navLinks.map(link => (
        <Nav.Item className={link.className} key={link.route}>
          <Nav.Link
            key={link.route}
            as={NavLink}
            to={discussionsPath(link.route, { courseId })()}
            className={isTopicsNavActive && link.route === Routes.TOPICS.ALL && 'active'}
          >
            {intl.formatMessage(link.labelMessage)}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default React.memo(NavigationBar);
