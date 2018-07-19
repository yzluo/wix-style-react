import React from 'react';
import Text from 'wix-style-react/Text';
import s from './styles.scss';

export default () =>
  <div>
    <h3>Text</h3>
    <ul className={`ltr ${s.root}`}>
      <li><span className={s.boundedLeft}><Text weight="thin">Helvetica_45 / 16px / 24px</Text></span><span className={s.boundedRight}><Text skin="premium"> (T1)</Text></span></li>
      <li><span className={s.boundedLeft}><Text secondary weight="thin">secondary - Helvetica_45 / 16px / 24px</Text></span><span className={s.boundedRight}><Text skin="premium"> (T1.1)</Text></span></li>
      <li className={s.inverted}>
        <span className={s.boundedLeft}><Text light weight="thin">light - Helvetica_45 / 16px / 24px</Text></span>
        <span className={s.boundedRight}><Text skin="premium"> (T1.2)</Text></span>
      </li>
      <li><span className={s.boundedLeft}><Text secondary light weight="thin">secondary light - Helvetica_45 / 16px / 24px</Text></span><span className={s.boundedRight}><Text skin="premium"> (T1.4)</Text></span></li>
    </ul>

    <h3>Bold Text</h3>
    <ul className={`ltr ${s.root}`}>
      <li><span className={s.boundedLeft}><Text>bold - Helvetica_55 / 16px / 24px</Text></span><span className={s.boundedRight}><Text skin="premium"> (T2)</Text></span></li>
      <li><span className={s.boundedLeft}><Text secondary>bold secondary - Helvetica_55 / 16px / 24px</Text></span></li>
      <li className={s.inverted}>
        <span className={s.boundedLeft}><Text light>bold light - Helvetica_55 / 16px / 24px</Text></span>
        <span className={s.boundedRight}><Text skin="premium"> (T2.2)</Text></span>
      </li>
      <li><span className={s.boundedLeft}><Text secondary light>bold secondary light - Helvetica_55 / 16px / 24px</Text></span><span className={s.boundedLeft}><Text skin="premium"> (T2.1)</Text></span></li>
    </ul>

    <h3>Small Text</h3>
    <ul className={`ltr ${s.root}`}>
      <li><span className={s.boundedLeft}><Text size="small" weight="thin">small - Helvetica_45 / 14px / 18px</Text></span><span className={s.boundedRight}><Text skin="premium"> (T3)</Text></span></li>
      <li><span className={s.boundedLeft}><Text size="small" secondary weight="thin">small secondary - Helvetica_45 / 14px / 18px</Text></span><span className={s.boundedRight}><Text skin="premium"> (T3.1)</Text></span></li>
      <li className={s.inverted}>
        <span className={s.boundedLeft}><Text size="small" light weight="thin">small light - Helvetica_45 / 14px / 18px</Text></span>
        <span className={s.boundedRight}><Text skin="premium"> (T3.2)</Text></span>
      </li>
      <li><span className={s.boundedLeft}><Text size="small" secondary light weight="thin">small secondary light - Helvetica_45 / 14px / 18px</Text></span><span className={s.boundedRight}><Text skin="premium"> (T3.4)</Text></span></li>
    </ul>

    <h3>Small Bold Text</h3>
    <ul className={`ltr ${s.root}`}>
      <li><span className={s.boundedLeft}><Text size="small">small bold - Helvetica_55 / 14px / 18px</Text></span><span className={s.boundedRight}><Text skin="premium"> (T4)</Text></span></li>
      <li><span className={s.boundedLeft}><Text size="small" secondary>small secondary bold - Helvetica_55 / 14px / 18px</Text></span><span className={s.boundedRight}><Text skin="premium"> (T4.1)</Text></span></li>
      <li className={s.inverted}>
        <span className={s.boundedLeft}><Text size="small" light>small + bold + light - Helvetica_55 / 14px / 18px</Text></span>
        <span className={s.boundedRight}><Text skin="premium"> (T4.2)</Text></span>
      </li>
      <li><span className={s.boundedLeft}><Text size="small" secondary light>small secondary bold light - Helvetica_55 / 14px / 18px</Text></span></li>
    </ul>
  </div>;

