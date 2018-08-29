import React from 'react';
import {bool, node} from 'prop-types';

import Divider from '../Divider';
import styles from './Header.scss';
import WixComponent from '../../BaseComponents/WixComponent';
import Heading from '../../Heading';
import Text from '../../Text';

const isString = a => typeof a === 'string';

class Header extends WixComponent {
  static displayName = 'Card.Header';

  static propTypes = {
    /** required card title */
    title: node.isRequired,

    /** any string to be rendered below title */
    subtitle: node,

    suffix: node,

    /** define whether header border on the bottom is visible
     * deprecated! use <Card.Divider/> instead
     * @deprecated
    * */
    withoutDivider: bool
  };

  static defaultProps = {
    subtitle: null,
    suffix: null,
    withoutDivider: false
  };

  render() {
    const {title, subtitle, withoutDivider, suffix} = this.props;

    return (
      <div>
        <div className={styles.wrapper}>
          <div>
            { isString(title) ?
              <Heading
                dataHook="title"
                appearance="H3"
                children={title}
                /> :
                title
            }

            {subtitle &&
              isString(subtitle) ?
                <Text
                  dataHook="subtitle"
                  children={subtitle}
                  secondary
                  /> :
                subtitle
            }
          </div>

          { suffix &&
            <div
              data-hook="suffix"
              className={styles.suffix}
              children={suffix}
              />
          }
        </div>

        { !withoutDivider && <Divider/> }
      </div>
    );
  }
}

export default Header;
