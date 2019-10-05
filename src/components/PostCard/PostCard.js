import React, { Component } from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { propTypes } from '../../util/types';
import { createSlug } from '../../util/urlHelpers';
import { NamedLink, ResponsiveImage } from '../../components';

import css from './PostCard.css';


class PostImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}
const LazyImage = lazyLoadWithDimensions(PostImage, { loadAfterInitialRendering: 3000 });

export const PostCardComponent = props => {
  const { className, rootClassName, article, renderSizes} = props;
  const classes = classNames(rootClassName || css.root, className);
  
  const slug = createSlug(title);
  //const author = ensureUser(article.author); 
  //const authorName = author.attributes.profile.displayName;
  const articleImage = article.mainImage;

  return (
    <NamedLink className={classes} name="ArticlePage" params={{ id, slug }}>
      <div
        className={css.threeToTwoWrapper}
      >
        <div className={css.aspectWrapper}>
          <LazyImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={['landscape-crop', 'landscape-crop2x']}
            sizes={renderSizes}
          />
        </div>
      </div>
      <div className={css.info}>
        <div className={css.mainInfo}>
          <div className={css.title}>
            {title}
          </div>
          <div className={css.authorInfo}>
            <FormattedMessage id="PostCard.byAuthorText" values={{ authorName }} />
          </div>
        </div>
      </div>
    </NamedLink>
  );
};

PostCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
};

PostCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  article: propTypes.article.isRequired,

  // Responsive image sizes hint
  renderSizes: string,
};

export default PostCardComponent;
