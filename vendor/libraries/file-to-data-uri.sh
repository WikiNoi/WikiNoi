#!/bin/sh
mimetype=$(file -bN --mime-type "$1")
content=$(base64 -w0 < "$1")
filename=$(basename $1)
echo $filename
temp=$(mktemp)
echo "s~url('$filename')~url('data:$mimetype;base64,$content')~" > ${temp}
sed -i -f ${temp} $2
