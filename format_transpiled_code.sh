#!/bin/bash -e
# Formats the transpiled code better than TypeScript does (though not perfectly).

# run from this script's own directory
script_dir=`dirname "$0"`
cd -- "$script_dir"

# remove unneeded semicolons from the JS (esformatter doesn't handle them well), then format with esformatter
node_modules/.bin/eslint --no-eslintrc --rule '{"semi": [2, "never"]}' --fix lib/*.js
node_modules/.bin/esformatter -i lib/*.js

# tweak the JS a bit more
perl -0777 -pi -e 's/^}[\(\)]+$/$&\n/mg' lib/*.js  # add blank lines before & after class definition

#regex='s/}\n{2,}( +)}/}\n$1}/g'  # remove blank lines between lines containing only closing braces
perl -0777 -pi -e "$regex; $regex" lib/*.js

# add some blank lines in the type declaration
perl -0777 -pi -e 's/;(\s+\/\*\*)/;\n$1/g' types/*.d.ts
perl -0777 -pi -e 's/}/}\n/g' types/*.d.ts
