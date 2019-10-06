import React, { Component } from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl } from '../../util/reactIntl';
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
  const { className, rootClassName, post, renderSizes} = props;
  const classes = classNames(rootClassName || css.root, className);
  const id = post.sys.id;
  const title = post.fields.title;
  
  const convertImage = (rawImage) => {
    return {
      attributes: {
        variants: {
          default : {
            name: "default",
            width: 720,
            height: 540,
            url: rawImage.fields.file.url.replace('//', 'http://') + "?w=720&h=540"
          }
        }
      },
      type: "image",
      id: rawImage.sys.id
    }
    
  };
  //const slug = createSlug(post.title);
  //const author = ensureUser(article.author); 
  //const authorName = author.attributes.profile.displayName;
  const articleImage = convertImage(post.fields.heroImage);

  return (
    <NamedLink className={classes} name="AboutPage" >
      <div
        className={css.threeToTwoWrapper}
      >
        <div className={css.aspectWrapper}>
          <LazyImage
            rootClassName={css.rootForImage}
            alt={title}
            image={articleImage}
            variants={['default']}
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
            {/*<FormattedMessage id="PostCard.byAuthorText" values={{ authorName }} />*/}
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

  // Responsive image sizes hint
  renderSizes: string,
};

export default injectIntl(PostCardComponent);
