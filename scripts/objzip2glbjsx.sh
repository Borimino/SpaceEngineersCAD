name=$1
input=$2
output=$3

unzip $input -d /tmp/$name/

npx obj2gltf -i /tmp/$name/$name.obj -o $output

npx gltfjsx $output