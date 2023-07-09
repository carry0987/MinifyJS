# MinifyJS
This is a code minification tool based on Docker and Node.js, suitable for JavaScript files. The project leverages uglify-js library for file minification.

## Features
- Accepts JavaScript files through API for minification.
- Outputs the minified files directly or saves them to a specific directory.
- Configured with docker-compose as an easy deployment and for persistence.

## Installation
1. Download or clone this repository to your local machine.
2. Navigate to the directory of the repository and run the `docker-compose up -d` command to create and start the service.

## Usage
Send the JavaScript file you wish to compress to `/compress` API, the file will be compressed accordingly and returned based on the request.

For example:
```
curl -X POST -F 'file=@/path/to/your/js/file.js' "http://localhost:3000/compress?request=file"
```
In this example, `request=file` means you wish to save the compressed JavaScript file to a specified `compressed` directory and return the metadata of the file. If you wish to return the content of compressed file directly, you can use `request=content` or completely ignore the `request` parameter.

For example:
```
curl -X POST -F 'file=@/path/to/your/js/file.js' "http://localhost:3000/compress?request=content"
curl -X POST -F 'file=@/path/to/your/js/file.js' "http://localhost:3000/compress"
```

## Note
If no path is specified, files will be saved in the `compressed` directory.

## License
This project is licensed under the terms of the MIT license.
