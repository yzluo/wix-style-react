import React from 'react';
import PropTypes from 'prop-types';
import styles from './Accordion.scss';
import AccordionItem from './AccordionItem';

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
    this.setState({
      openId: this.state.openId !== id ? id : -1,
    });
  };

  render() {
    const { openId } = this.state;
    const { dataHook, data } = this.props;

    return (
      <div className={styles.root} data-hook={dataHook}>
        {data &&
          data.map((row, index) => (
            <div className={styles.rowWrapper} key={index}>
              <AccordionItem
                dataHook="accordion-row"
                id={index}
                toggleOpenClose={this.toggle}
                {...row}
                isOpen={openId === index}
              />
            </div>
          ))}
      </div>
    );
  }
}

export default Accordion;
