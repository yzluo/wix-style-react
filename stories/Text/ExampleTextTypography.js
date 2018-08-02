import React from 'react';
import Text from 'wix-style-react/Text';
import s from './styles.scss';

export default () =>
  <div>
    <h3>Thin Text</h3>
    <ul className={`ltr ${s.root}`}>
      <li><h4>Medium Text</h4></li>
      <li>
        <span className={s.comp}>{'<Text weight="thin" size="medium" secondary={false} light={false}/>'}</span>
        <span className={s.fonts}><Text weight="thin">Helvetica_45 / 16px / 24px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T1)</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="thin" size="medium" secondary={true} light={false}/>'}</span>
        <span className={s.fonts}><Text secondary weight="thin">Helvetica_45 / 16px / 24px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T1.1)</Text></span>
      </li>
      <li className={s.inverted}>
        <span className={s.comp}>{'<Text weight="thin" size="medium" secondary={false} light={true}/>'}</span>
        <span className={s.fonts}><Text light weight="thin">Helvetica_45 / 16px / 24px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T1.2)</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="thin" size="medium" secondary={true} light={true}/>'}</span>
        <span className={s.fonts}><Text secondary light weight="thin">Helvetica_45 / 16px / 24px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T1.4)</Text></span>
      </li>

      <li><h4>Small Text</h4></li>
      <li>
        <span className={s.comp}>{'<Text weight="thin" size="small" secondary={false} light={false}/>'}</span>
        <span className={s.fonts}><Text size="small" weight="thin">Helvetica_45 / 14px / 18px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T3)</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="thin" size="small" secondary={true} light={false}/>'}</span>
        <span className={s.fonts}><Text size="small" secondary weight="thin">Helvetica_45 / 14px / 18px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T3.1)</Text></span>
      </li>
      <li className={s.inverted}>
        <span className={s.comp}>{'<Text weight="thin" size="small" secondary={false} light={true}/>'}</span>
        <span className={s.fonts}><Text size="small" light weight="thin">Helvetica_45 / 14px / 18px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T3.2)</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="thin" size="small" secondary={true} light={true}/>'}</span>
        <span className={s.fonts}><Text size="small" secondary light weight="thin">Helvetica_45 / 14px / 18px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T3.4)</Text></span>
      </li>
    </ul>


    <h3>Normal Text</h3>
    <ul className={`ltr ${s.root}`}>
      <li><h4>Medium Text</h4></li>
      <li>
        <span className={s.comp}>{'<Text weight="normal" size="medium" secondary={false} light={false}/>'}</span>
        <span className={s.fonts}><Text weight="normal">Helvetica_55 / 16px / 24px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T2)</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="normal" size="medium" secondary={true} light={false}/>'}</span>
        <span className={s.fonts}><Text secondary weight="normal">Helvetica_55 / 16px / 24px</Text></span>
      </li>
      <li className={s.inverted}>
        <span className={s.comp}>{'<Text weight="normal" size="medium" secondary={false} light={true}/>'}</span>
        <span className={s.fonts}><Text light weight="normal">Helvetica_55 / 16px / 24px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T2.2)</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="normal" size="medium" secondary={true} light={true}/>'}</span>
        <span className={s.fonts}><Text secondary light weight="normal">Helvetica_55 / 16px / 24px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T2.1)</Text></span>
      </li>

      <li><h4>Small Text</h4></li>
      <li>
        <span className={s.comp}>{'<Text weight="normal" size="small" secondary={false} light={false}/>'}</span>
        <span className={s.fonts}><Text size="small" weight="normal">Helvetica_55 / 14px / 18px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T4)</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="normal" size="small" secondary={true} light={false}/>'}</span>
        <span className={s.fonts}><Text size="small" secondary weight="normal">Helvetica_55 / 14px / 18px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T4.1)</Text></span>
      </li>
      <li className={s.inverted}>
        <span className={s.comp}>{'<Text weight="normal" size="small" secondary={false} light={true}/>'}</span>
        <span className={s.fonts}><Text size="small" light weight="normal">Helvetica_55 / 14px / 18px</Text></span>
        <span className={s.legacy}><Text skin="premium"> (T4.2)</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="normal" size="small" secondary={true} light={true}/>'}</span>
        <span className={s.fonts}><Text size="small" secondary light weight="normal">Helvetica_55 / 14px / 18px</Text></span>
      </li>

      <li><h4>Tiny Text</h4></li>
      <li>
        <span className={s.comp}>{'<Text weight="normal" size="tiny" secondary={false} light={false}/>'}</span>
        <span className={s.fonts}><Text size="tiny" weight="normal">Helvetica_55 / 12px / 15px</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="normal" size="tiny" secondary={true} light={false}/>'}</span>
        <span className={s.fonts}><Text size="tiny" secondary weight="normal">Helvetica_55 / 12px / 15px</Text></span>
      </li>
      <li className={s.inverted}>
        <span className={s.comp}>{'<Text weight="normal" size="tiny" secondary={false} light={true}/>'}</span>
        <span className={s.fonts}><Text size="tiny" light weight="normal">Helvetica_55 / 12px / 15px</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="normal" size="tiny" secondary={true} light={true}/>'}</span>
        <span className={s.fonts}><Text size="tiny" secondary light weight="normal">Helvetica_55 / 12px / 15px</Text></span>
      </li>
    </ul>

    <h3>Bold Text</h3>
    <ul className={`ltr ${s.root}`}>
      <li><h4>Medium Text</h4></li>
      <li>
        <span className={s.comp}>{'<Text weight="bold" size="medium" secondary={false} light={false}/>'}</span>
        <span className={s.fonts}><Text weight="bold">Helvetica_65 / 16px / 24px</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="bold" size="medium" secondary={true} light={false}/>'}</span>
        <span className={s.fonts}><Text secondary weight="bold">Helvetica_65 / 16px / 24px</Text></span>
      </li>
      <li className={s.inverted}>
        <span className={s.comp}>{'<Text weight="bold" size="medium" secondary={false} light={true}/>'}</span>
        <span className={s.fonts}><Text light weight="bold">Helvetica_65 / 16px / 24px</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="bold" size="medium" secondary={true} light={true}/>'}</span>
        <span className={s.fonts}><Text secondary light weight="bold">Helvetica_65 / 16px / 24px</Text></span>
      </li>

      <li><h4>Small Text</h4></li>
      <li>
        <span className={s.comp}>{'<Text weight="bold" size="small" secondary={false} light={false}/>'}</span>
        <span className={s.fonts}><Text size="small" weight="bold">Helvetica_65 / 14px / 18px</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="bold" size="small" secondary={true} light={false}/>'}</span>
        <span className={s.fonts}><Text size="small" secondary weight="bold">Helvetica_65 / 14px / 18px</Text></span>
      </li>
      <li className={s.inverted}>
        <span className={s.comp}>{'<Text weight="bold" size="small" secondary={false} light={true}/>'}</span>
        <span className={s.fonts}><Text size="small" light weight="bold">Helvetica_65 / 14px / 18px</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="bold" size="small" secondary={true} light={true}/>'}</span>
        <span className={s.fonts}><Text size="small" secondary light weight="bold">Helvetica_65 / 14px / 18px</Text></span>
      </li>

      <li><h4>Tiny Text</h4></li>
      <li>
        <span className={s.comp}>{'<Text weight="bold" size="tiny" secondary={false} light={false}/>'}</span>
        <span className={s.fonts}><Text size="tiny" weight="bold">Helvetica_65 / 12px / 15px</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="bold" size="tiny" secondary={true} light={false}/>'}</span>
        <span className={s.fonts}><Text size="tiny" secondary weight="bold">Helvetica_65 / 12px / 15px</Text></span>
      </li>
      <li className={s.inverted}>
        <span className={s.comp}>{'<Text weight="bold" size="tiny" secondary={false} light={true}/>'}</span>
        <span className={s.fonts}><Text size="tiny" light weight="bold">Helvetica_65 / 12px / 15px</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="bold" size="tiny" secondary={true} light={true}/>'}</span>
        <span className={s.fonts}><Text size="tiny" secondary light weight="bold">Helvetica_65 / 12px / 15px</Text></span>
      </li>
    </ul>


    <h3>Extra Bold Text</h3>
    <ul className={`ltr ${s.root}`}>
      <li><h4>Tiny Text</h4></li>
      <li>
        <span className={s.comp}>{'<Text weight="x-bold" size="tiny" secondary={false} light={false}/>'}</span>
        <span className={s.fonts}><Text size="tiny" weight="x-bold">Helvetica_75 / 12px / 15px</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="x-bold" size="tiny" secondary={true} light={false}/>'}</span>
        <span className={s.fonts}><Text size="tiny" secondary weight="x-bold">Helvetica_75 / 12px / 15px</Text></span>
      </li>
      <li className={s.inverted}>
        <span className={s.comp}>{'<Text weight="x-bold" size="tiny" secondary={false} light={true}/>'}</span>
        <span className={s.fonts}><Text size="tiny" light weight="x-bold">Helvetica_75 / 12px / 15px</Text></span>
      </li>
      <li>
        <span className={s.comp}>{'<Text weight="x-bold" size="tiny" secondary={true} light={true}/>'}</span>
        <span className={s.fonts}><Text size="tiny" secondary light weight="x-bold">Helvetica_75 / 12px / 15px</Text></span>
      </li>
    </ul>
  </div>;

