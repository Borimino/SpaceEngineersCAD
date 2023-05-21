name=$1
input="/home/markus/Downloads/${name}_objFiles.zip"
output="src/Resources/${name}.glb"

unzip $input -d /tmp/$name/

npx obj2gltf -i /tmp/$name/$name.obj -o $output

npx gltfjsx $output