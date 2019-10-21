import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import { loadData } from './ContactPage.duck';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import css from './ContactPage.css';

export class ContactPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    const Heading = ({ children }) => <h1 className={css.pageTitle}>{children}</h1>;
    const Text = ({ children }) => <p className={css.pageBody}>{children}</p>;
    const List = ({ children }) => <ul className={css.bodyUnorderedList}>{children}</ul>;

    this.staticPageRenderOptions = {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
          <Text>{children}</Text>
        ),
        [BLOCKS.HEADING_1]: (node, children) => (
          <Heading>{children}</Heading>
        ),
        [BLOCKS.UL_LIST]: (node, children) => (
          <List>{children}</List>
        )
      },
    };
  }

  renderData(documentData, options) {
    let renderedData = documentToReactComponents(documentData, options);

    return renderedData
  }


  render() {
    const pageData = this.props.contactPageData['body'];

    let renderedData = this.renderData(pageData, this.staticPageRenderOptions);
    return (
      <StaticPage
        title="Contact"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ContactPage',
          description: 'Outdoorcoach Kontakt',
          name: 'Contact page',
        }}
      >
        <LayoutSingleColumn className={css.darkTheme}>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>

          <LayoutWrapperMain className={css.staticPageWrapper}>
            <div className={css.contentWrapper}>
              {renderedData}
            </div>
          </LayoutWrapperMain>

          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage>
    );
  }


};

const mapStateToProps = state => {
  const {
    contactPageEntryId,
    contactPageFetched,
    contactPageData,
    contactPageFetchError,
  } = state.ContactPage;

  return {
    contactPageEntryId,
    contactPageFetched,
    contactPageData,
    contactPageFetchError,
  };
};

const ContactPage = compose(
  withRouter,
  connect(
    mapStateToProps
  )
)(ContactPageComponent);

ContactPage.loadData = () => {
  let entryId = "33YClkFFddIfHme2IyeMOc";
  return loadData(entryId);
};


export default ContactPage;