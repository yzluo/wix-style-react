import 'regenerator-runtime/runtime';
import {puppeteerTestkitFactoryCreator} from '../src/test-common';

import inputDriverFactory from '../src/Input/Input.puppeteer.driver';
export const inputTestkitFactory = puppeteerTestkitFactoryCreator(inputDriverFactory);

import buttonDriverFactory from '../src/Backoffice/Button/Button.puppeteer.driver';
export const buttonTestkitFactory = puppeteerTestkitFactoryCreator(buttonDriverFactory);

import formFieldDriverFactory from '../src/FormField/FormField.puppeteer.driver';
export const formFieldTestkitFactory = puppeteerTestkitFactoryCreator(formFieldDriverFactory);
