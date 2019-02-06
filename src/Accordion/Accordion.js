import React from 'react';
import PropTypes from 'prop-types';
import styles from './Accordion.scss';
import AccordionRow from './AccordionRow';

class Accordion extends React.Component {
  static displayName = 'Accordion';

  static propTypes = {
    dataHook: PropTypes.string,

    /** Row Data: {title: string, icon: node, content: node, expandLabel: string, collapseLabel: string}*/
    data: PropTypes.array,
  };

  state = {
    openId: null,
  };

  toggle = id => {
    this.setState(({ openId }) => {
      if (openId === id) {
        return { openId: -1 };
      }
      return { openId: id };
    });
  };

  render() {
    const { openId } = this.state;
    const { dataHook, data} = this.props;

    return (
      <div className={styles.root} data-hook={dataHook}>
        {data && data.map((row, index) => (
          <div className={styles.rowWrapper} key={index}>
            <AccordionRow
              dataHook={'accordion-row'}
              id={index}
              toggleView={this.toggle}
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
