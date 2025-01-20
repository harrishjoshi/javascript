# Protoc compile
1. npm install google-protobuf
2. npm install protoc-gen-js 
3. protoc --js_out=import_style=commonjs,binary:. customers.proto
