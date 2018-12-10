import React from 'react';
import styles from './ItemPickerOptionBuilder.scss';
import Avatar from '../Avatar/Avatar';
import Text from '../Text/ProxyText';
import { dataHooks, itemPickerOptionsConfig as configs } from './utils';

export const ItemPickerOption = props => {
  const renderTitle = () => (
    <div>
      <Text
        ellipsis
        size={configs.titleSize}
        weight={configs.titleWeight}
        secondary={false}
        light={false}
        dataHook={dataHooks.pickerOptionTitle}
      >
        {props.title}
      </Text>
    </div>
  );

  const renderSubtitle = () =>
    props.subtitle ? (
      <div>
        <Text
          ellipsis
          size={configs.subtitleSize}
          weight={configs.subtitleWeight}
          secondary
          light={false}
          dataHook={dataHooks.pickerOptionSubtitle}
        >
          {props.subtitle}
        </Text>
      </div>
    ) : null;

  const renderAvatar = () => (
    <div>
      <Avatar
        className={styles.avatar}
        name={props.title || ' '}
        size={configs.avatarSize}
        imgProps={{ src: props.imageUrl }}
        data-hook={dataHooks.pickerOptionAvatar}
      />
    </div>
  );

  return (
    <div className={styles.itemPickerOption} data-hook={dataHooks.pickerOption}>
      {renderAvatar()}
      <div>
        {renderTitle()}
        {renderSubtitle()}
      </div>
    </div>
  );
};

export const ItemPickerOptionBuilder = ({ id, title, subtitle, imageUrl }) => ({
  id,
  value: (
    <ItemPickerOption title={title} subtitle={subtitle} imageUrl={imageUrl} />
  ),
});
