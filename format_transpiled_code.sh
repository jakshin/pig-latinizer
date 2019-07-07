#!/bin/bash -e
# Formats the transpiled code better than TypeScript does (though not perfectly).

# run from this script's own directory
script_dir=`dirname "$0"`
cd -- "$script_dir"

# add some blank lines in the transpiled source
perl -0777 -pi -e 's/(\s*\/\*\*\n)/\n$1/g' lib/*.js           # before block comments
perl -0777 -pi -e 's/(\n\s*if)/\n$1/g' lib/*.js               # before `if` statements
perl -0777 -pi -e 's/(\n\s*while)/\n$1/g' lib/*.js            # before `while` statements
perl -0777 -pi -e 's/(\n\s*exports)/\n$1/g' lib/*.js          # before `exports` statements
perl -0777 -pi -e 's/}(\n\s*var)/}\n$1/g' lib/*.js            # before `var` following closing brace
perl -0777 -pi -e 's/}(;?)(\n\s*return)/}$1\n$2/g' lib/*.js   # before `return` following closing brace

# add some blank lines in the type declaration
perl -0777 -pi -e 's/;(\s+\/\*\*)/;\n$1/g' types/*.d.ts
perl -0777 -pi -e 's/}/}\n/g' types/*.d.ts
