import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import Text from '../Text';
import Avatar from '../Avatar';
import styles from './ItemPickerOption.scss';
import PropTypes from 'prop-types';

export class ItemPickerOption extends WixComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    imageUrl: PropTypes.string,
  };

  render() {
    return (
      <div data-hook="item-picker-option">
        <div className={styles.itemPickerOption}>
          {this.renderAvatar()}
          <div>
            {this.renderTitle()}
            {this.renderSubtitle()
            }
          </div>
        </div>
      </div>
    );
  }

  renderAvatar() {
    return <div>
      <Avatar className={styles.avatar}
              name={this.props.title || ' '}
              size={'size30'}
              imgProps={{ src: this.props.imageUrl }}
              data-hook="item-picker-option-avatar"
      />
    </div>;
  }

  renderTitle() {
    return <div>
      <Text
        ellipsis
        size="medium"
        weight="thin"
        secondary={false}
        light={false}
        dataHook="item-picker-option-title"
      >
        {this.props.title}
      </Text>
    </div>;
  }

  renderSubtitle() {
    return this.props.subtitle ?
      <div>
        <Text
          ellipsis
          size="small"
          weight="thin"
          secondary
          light={false}
          dataHook="item-picker-option-subtitle"
        >
          {this.props.subtitle}
        </Text>
      </div>
      :
      null;
  }
}
