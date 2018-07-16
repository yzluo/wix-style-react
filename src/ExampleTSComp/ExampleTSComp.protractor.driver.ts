import {ElementFinder} from "../../node_modules/protractor";

export interface ExampleTSCompDriver {
  element: ()=> ElementFinder;
}
export const exampleTSCompDriverFactory = (component: ElementFinder) => ({
  element: () => component
});
