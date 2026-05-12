#!/bin/bash -e
# Formats the transpiled code better than TypeScript does (though not perfectly).

# run from this script's own directory
script_dir="$(dirname "$0")"
cd -- "$script_dir"

# add some blank lines in the transpiled source
perl -0777 -pi -e 's/(\s*\/\*\*\n)/\n$1/g' lib/*.js           # before block comments
perl -0777 -pi -e 's/(\n\s*(if|while))/\n$1/g' lib/*.js       # before `if` and `while` statements
perl -0777 -pi -e 's/(\n\s*export)/\n$1/g' lib/*.js           # before `export` statements
perl -0777 -pi -e 's/}(\n\s*(const|let))/}\n$1/g' lib/*.js    # before `const` and `let` following closing brace
perl -0777 -pi -e 's/}(;?)(\n\s*return)/}$1\n$2/g' lib/*.js   # before `return` following closing brace

# add some blank lines in the type declaration
perl -0777 -pi -e 's/;(\s+\/\*\*)/;\n$1/g' types/*.d.ts
perl -0777 -pi -e 's/}/}\n/g' types/*.d.ts
