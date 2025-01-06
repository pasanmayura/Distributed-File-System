const net = require('net');
const fs = require('fs');

const server = net.createServer((socket) => {
    console.log('Client connected');

    let fileName = '';
    let fileData = Buffer.alloc(0);  // To store the file data

    socket.on('data', (data) => {
        // Check if we have received the file name and the delimiter
        if (!fileName) {
            // Split the data into file name and file content
            const parts = data.toString().split('\n\n');
            fileName = parts[0];  // Get the file name
            fileData = Buffer.concat([fileData, Buffer.from(parts[1])]);  // Start receiving file content

            // If there is more data after the delimiter, continue receiving it
            if (parts.length > 2) {
                fileData = Buffer.concat([fileData, Buffer.from(parts[2])]);
            }
        } else {
            fileData = Buffer.concat([fileData, data]);  // Keep receiving file content
        }

        // Once all data has been received, save the file
        if (fileData.length > 0) {
            fs.writeFile(fileName, fileData, (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log('File saved as:', fileName);
                }
                socket.end();  // Close the connection
            });
        }
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

const port = 65432;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
