import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

import {
  APP_INIT_ERROR, APP_READY, getConfig, initialize, mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { messages as paragonMessages } from '@edx/paragon';

import { DiscussionsHome } from './discussions';
import appMessages from './i18n';
import store from './store';

import './assets/favicon.ico';
import './index.scss';

import GymSettings, { GymFooter, GymHeader } from './gym-frontend-components/';
const timestamp = Date.now();
const settings = await GymSettings;
const root = settings.urls.root; // should be same as marketing URL
const config = getConfig();
const css = `${root}${settings.css.mfe}?${timestamp}`;
const title = `Discussions | ${getConfig().SITE_NAME}`;

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <Helmet>
        <title>{title}</title>
        <link rel="shortcut icon" href={config.FAVICON_URL} type="image/x-icon" />
        <link rel="stylesheet" href={css} />
      </Helmet>
      <GymHeader secondaryNav="courses" />
      <main id="main" tabIndex="-1">
        <div className="container">
          <DiscussionsHome />
        </div>
      </main>
      <GymFooter />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  requireAuthenticatedUser: true,
  messages: [
    appMessages,
    paragonMessages,
  ],
  handlers: {
    config: () => {
      mergeConfig({
        LEARNING_BASE_URL: process.env.LEARNING_BASE_URL,
        LEARNER_FEEDBACK_URL: process.env.LEARNER_FEEDBACK_URL,
        STAFF_FEEDBACK_URL: process.env.STAFF_FEEDBACK_URL,
      }, 'DiscussionsConfig');
    },
  },
});
