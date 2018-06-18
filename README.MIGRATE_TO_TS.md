## Issues
### Blocking Issues
- `allowJs` + `decalaration` - not  allowed   - WORKAROUND:  currently disabled declarations
  See https://github.com/Microsoft/TypeScript/issues/7546
- node_modules/wix-ui-test-utils/dist/src/puppeteer/puppeteer.d.ts(1,37): error TS2307: Cannot find module 'puppeteer'.   - WORKAROUND: skipLibChecks
## TODO:
- [ ] tslint & eslint ?


## Status:
- npm run build - passes
- run storybook working

## MAke ts story work
## TODO:
 - [ ] storybook - webpack.config.js : is
  `context: path.resolve(__dirname, '../src'),` needed?


