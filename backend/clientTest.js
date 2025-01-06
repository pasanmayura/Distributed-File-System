const net = require('net');
const fs = require('fs');

const client = new net.Socket();
const host = '127.0.0.1';  // Server IP address
const port = 65432;  // Server port

client.connect(port, host, () => {
    console.log('Connected to server');

    const filePath = 'test.txt';  // File to send
    const fileName = filePath.split('/').pop();  // Get the file name
    const fileData = fs.readFileSync(filePath);  // Read file content

    // Send the file name followed by a custom delimiter
    client.write(fileName + '\n\n' + fileData);
});

client.on('data', (data) => {
    // Handle server responses if needed
});

client.on('close', () => {
    console.log('Connection closed');
});
