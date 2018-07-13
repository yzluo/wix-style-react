
# babel
## Questions

"babel": { "presets": ["yoshi"] }

OR

"es2015","react","stage-2","yoshi"

## eslint

### Rules we have in WSR that I chose to Remove:
 "comma-dangle": [
        "error",
        "never"
      ],

### Rules that are in yoshi, that cause error/warn, and we should consider to fix or override:
- [warning ] react/forbid-foreign-prop-types

# Yoshi issues 
## `npx yoshi lint --fix myFileName.js`
Doesn't run only on the file, but rather on all files.
> TODO: open bug issue