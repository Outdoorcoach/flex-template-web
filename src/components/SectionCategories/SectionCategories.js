import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionCategories.css';

import xcSkiImage from './images/cover-img-xc.jpg';
import trailRunningImage from './images/cover-img-trail.jpg';
import alpineSkiImage from './images/cover-img-alpine.jpg';
import OrienteeringImage from './images/Orienteering.jpg';
import RunningImage from './images/Running.jpg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionCategories.listingsByCategory"
          values={{ category: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionCategories.listingsByCategoryText" />
      </div>
      <div className={css.locations}>
      {locationLink(
          'Längdåkning',
          xcSkiImage,
          '?address=Sverige&bounds=66.92051817%2C27.09540066%2C55.02371294%2C6.64228397&pub_category=xcski'
        )}
        {locationLink(
          'Alpint',
          alpineSkiImage,
          '?address=Sverige&bounds=66.92051817%2C27.09540066%2C55.02371294%2C6.64228397&pub_category=alpine'
        )}
        {locationLink(
          'Traillöpning',
          trailRunningImage,
          '?address=Sverige&bounds=66.92051817%2C27.09540066%2C55.02371294%2C6.64228397&pub_category=Trailrun'
        )}
        {locationLink(
          'Löpning',
          RunningImage,
          '?address=Sverige&bounds=66.92051817%2C27.09540066%2C55.02371294%2C6.64228397&pub_category=running'
        )}
        {locationLink(
          'Orientering',
          OrienteeringImage,
          '?address=Sverige&bounds=66.92051817%2C27.09540066%2C55.02371294%2C6.64228397&pub_category=Orienteering'
        )}
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
