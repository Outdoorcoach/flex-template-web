import React, { Component } from 'react';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { loadData } from './NewsPage.duck';

import routeConfiguration from '../../routeConfiguration';
import { pathByRouteName } from '../../util/routes';

import { propTypes } from '../../util/types';

import { StaticPage, TopbarContainer } from '../../containers';

import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  PostCard,
} from '../../components';

import { } from './NewsPage.duck';
import css from './NewsPage.css';

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 12 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 6;
const MODAL_BREAKPOINT = 768; // Search is in modal on mobile layout
const SEARCH_WITH_MAP_DEBOUNCE = 300; // Little bit of debounce before search is initiated.

export class NewsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    // Panel width relative to the viewport
    
    this.renderPosts = this.renderPosts.bind(this);
    }

  renderPosts(postsData) {
    return 
  }

  render() {
    const articles = this.props.posts;

    const panelMediumWidth = 50;
    const panelLargeWidth = 62.5;
    const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
    ].join(', ');
    
    const isWindowDefined = typeof window !== 'undefined';


    return (
      <StaticPage
        title="Articles"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'Articles',
          description: '',
          name: 'Articles',
        }}
      >
        <LayoutSingleColumn className={css.darkTheme}>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>

          <LayoutWrapperMain className={css.staticPageWrapper}>
            <div className={css.container}>
             
              {articles.map((p) =>
                <PostCard 
                  className={css.postCard}
                  renderSizes={cardRenderSizes}
                  key={p.sys.id}
                  post={p}
                />
              )}
            </div>
          </LayoutWrapperMain>

          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage>
        
      
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

NewsPageComponent.defaultProps = {
  pagination: null,
};

NewsPageComponent.propTypes = {
  pagination: propTypes.pagination,
  // from withRouter
  

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    pagination,
    posts
  } = state.NewsPage;
  

  return {
    pagination,
    posts
  };
};

/*
const mapDispatchToProps = dispatch => ({
  onGetMoreResults: searchParams => dispatch(getMoreResults(searchParams)), 
});*/

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const NewsPage = compose(
  withRouter,
  connect(
    mapStateToProps,
  ),
  injectIntl
)(NewsPageComponent);

NewsPage.loadData = (params, search) => {
  const page = 1;
  
  return loadData();
};

export default NewsPage;
