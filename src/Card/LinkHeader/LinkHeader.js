import React from 'react';
import {node, string} from 'prop-types';
import TextLink from '../../TextLink';
import WixComponent from '../../../src/BaseComponents/WixComponent';
import Header from '../Header';

class LinkHeader extends WixComponent {
  static displayName = 'Card.LinkHeader';

  static propTypes = {
    ...Header.propTypes,
    linkTitle: string.isRequired,
    linkTo: string.isRequired,
    tooltip: node
  };

  static defaultProps = {
    tooltip: null
  };

  render() {
    const {title, subtitle, linkTitle, linkTo, withoutDivider, tooltip} = this.props;

    const linkElement =
      (<div>
        <TextLink dataHook="link" link={linkTo} children={linkTitle}/>
      </div>);

    const tooltipElement = tooltip ?
      React.cloneElement(tooltip, {}, linkElement) :
      null;

    return (
      <Header
        title={title}
        subtitle={subtitle}
        suffix={tooltipElement ? tooltipElement : linkElement}
        withoutDivider={withoutDivider}
        />
    );
  }
}

export default LinkHeader;
