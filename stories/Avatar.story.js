import Avatar from 'wix-style-react/Avatar';

const children = 'lm';

export default {
  category: '12. Other',
  storyName: '12.6 Avatar',
  component: Avatar,
  componentPath: '../src/Avatar',
  componentProps: {
    children,
    dataHook: 'storybook-avatar',
    size: 'medium',
    color: 'blue',
    state: 'initials',
    customColor: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
    imageUrl: 'https://static.wixstatic.com/media/c4cf9e_65ea68f64cda485196adb20f06802fd1~mv2_d_3836_3750_s_4_2.jpg/v1/fill/w_398,h_386,al_c,q_80,usm_0.66_1.00_0.01/c4cf9e_65ea68f64cda485196adb20f06802fd1~mv2_d_3836_3750_s_4_2.webp'
  }
};
