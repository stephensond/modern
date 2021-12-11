// Created by Zack Sheppard (@zackdotcomputer) on 1/19/2021
// Freely available under MIT License
// Workaround for https://github.com/vercel/next.js/issues/5533

import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

/// A unified component for the next/link <Link> and a standard <a> anchor.
/// Will lift href and all other props from Link up to the Link.
/// Will automatically make an <a> tag containing the children and pass it remaining props.
function LinkTo({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  locale,
  ...anchorProps
}) {
  return (
    // These props are lifted up to the `Link` element. All others are passed to the `<a>`
    <Link {...{
      href, as, replace, scroll, shallow, locale,
    }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <a {...anchorProps}>{children}</a>
    </Link>
  );
}

export default LinkTo;

LinkTo.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
  locale: PropTypes.bool,
};

LinkTo.defaultProps = {
  as: null,
  replace: false,
  scroll: true,
  shallow: false,
  locale: false,
};
