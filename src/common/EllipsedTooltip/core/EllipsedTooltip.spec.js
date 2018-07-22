// import {mount} from 'enzyme';
// import React from 'react';
// import {withEllipsedTooltip} from '.';

// const defaultComponent = () => <div>Hello</div>;

// const renderWrapped = (component = defaultComponent) => {
//   const WrappedComponent = withEllipsedTooltip()(component);
//   return mount(
//     <WrappedComponent/>,
//     {attachTo: document.createElement('div')}
//   );
// };

// describe('EllipsedTooltip', () => {
//   let wrapper;

//   afterEach(() => wrapper.detach());

//   it('should render the text', () => {
//     wrapper = renderWrapped();
//     expect(wrapper.html()).toBe('<div>Hello</div>');
//   });

//   it('should get ellipsed', () => {
//     const component = () => <span style={{width: '10px'}}>very very long text</span>;
//     wrapper = renderWrapped(component);
//     console.log(wrapper.html());
//   });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
// //   it('should be initialize the state with the correct styles', () => {
// //     wrapper = renderWrapped();
// //     expect(wixSdk.Styles.getStyleParams()).toBe(wrapper.state().tpaStyles);
// //   });

// //   it('should add event listeners', () => {
// //     Object.keys(wixSdk.getEventHandlers()).forEach(event =>
// //       expect(wixSdk.getEventHandlers()[event]).toHaveLength(0)
// //     );

// //     wrapper = renderWrapped();

// //     Object.keys(wixSdk.getEventHandlers()).forEach(event =>
// //       expect(wixSdk.getEventHandlers()[event]).toHaveLength(1)
// //     );
// //   });

// //   it('should render the children prop', () => {
// //     wrapper = renderWrapped(<div>Hello</div>);
// //     expect(wrapper.html()).toBe('<div>Hello</div>');
// //   });

// //   it('should update the state when colors changed', () => {
// //     wrapper = renderWrapped(<Component/>);

// //     wixSdk.setColorParam('color', 'green');
// //     expect(wrapper.state().tpaStyles.colors.color).toBe('green');
// //   });

// //   it('should update the state when fonts changed', () => {
// //     wrapper = renderWrapped(<Component/>);

// //     wixSdk.setFontParam('bold', true);
// //     expect(wrapper.state().tpaStyles.fonts.bold).toBe(true);
// //   });

// //   describe('withTpaStyles function', () => {
// //     const component = ({wixBindings, colors, fonts}) => (
// //       <div>
// //         {`color is ${colors.color} and font size is ${fonts.buttonFonts.size}`}
// //       </div>
// //     );

// //     const StyledComponent = withTpaStyles(component);

// //     it('should pass the colors and fonts on the context', () => {
// //       wrapper = renderWrapped(<StyledComponent/>);
// //       expect(wrapper.html()).toBe('<div>color is green and font size is 16px</div>');
// //     });

// //     it('should not allow to render a component outside the provider', () => {
// //       expect(() => wrapper = mount(<StyledComponent/>))
// //         .toThrow('wix-ui-tpa components must be wrapped by TpaStylesProvider');
// //     });
// //   });
// // });

// // it('TpaStylesProvider should removeEventListeners when unmounts', () => {
// //   wixSdk = new WixSdk();
// //   const wrapper = renderWrapped();
// //   wrapper.unmount();

// //   Object.keys(wixSdk.Events).forEach(event =>
// //     expect(wixSdk.getEventHandlers()[event]).toHaveLength(0)
// //   );
// });