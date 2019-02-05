import React from 'react';
import PropTypes from 'prop-types';
import styles from './Accordion.scss';
import Row from './Row';
import AccordionHeader from './AccordionHeader';

class Accordion extends React.PureComponent {
  static displayName = 'Accordion';

  static propTypes = {
    dataHook: PropTypes.string,

    /** Title for the Collapse */
    title: PropTypes.string,
    /** Row Data */
    data: PropTypes.array,
  };

  static defaultProps = {
    title: 'Accordion title',
  };

  state = {
    openId: null,
  };

  toggleDisplay = id => {
    this.setState(({ openId }) => {
      if (openId === id) {
        return { openId: -1 };
      }
      return { openId: id };
    });
  };

  hasIcon = () => {
    const { data } = this.props;
    return data && data.filter(row => row.icon).length !== 0;
  };

  render() {
    const { openId } = this.state;
    const { dataHook, data, title } = this.props;

    return (
      <div className={styles.root} data-hook={dataHook}>
        {title && <AccordionHeader title={title} withIcon={this.hasIcon()} />}
        {data && data.map((row, index) => (
          <div className={styles.rowWrapper} key={index}>
            <Row
              dataHook={'accordion-row'}
              id={index}
              toggleView={this.toggleDisplay}
              {...row}
              open={openId === index}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Accordion;
