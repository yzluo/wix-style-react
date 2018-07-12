# Build
## Issues
### Blocking Issues
- `allowJs` + `decalaration` - not  allowed   - WORKAROUND:  currently disabled declarations
  See https://github.com/Microsoft/TypeScript/issues/7546
- node_modules/wix-ui-test-utils/dist/src/puppeteer/puppeteer.d.ts(1,37): error TS2307: Cannot find module 'puppeteer'.   - WORKAROUND: skipLibChecks
## TODO:
- [ ] tslint & eslint ?
- package.json:
 Should I remove babel config:
 ```
 "babel": {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ]
  },
 ```


## Status:
- npm run build - passes
- run storybook working

# Storybook
## MAke ts story work
## TODO:
 - [ ] storybook - webpack.config.js : is
  `context: path.resolve(__dirname, '../src'),` needed?


# spec tests (jest)
## package.json
Added:
```
"transform": {
      "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
```

Isn't that taken care of by yoshi?

Added:
```
"moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
```

Is this needed? what does it do?

Added: 
`"testRegex": "/src/.*\\.spec\\.(t|j)(s|sx)$",`
NOw it can find my tsx test.


### NOw my ts spec test works !


## E2E test
- protractor.conf
- WixComponent -> TS

- Add ExampleTSComp
 ### Storybook static & HMR is working

- Add tsconfig: esModuleInterop
  - Refactor all `import React, {(.*)} from 'react' -> separate imports.

### Now e2e tests seem to run, pushing ot see that all e2e run.