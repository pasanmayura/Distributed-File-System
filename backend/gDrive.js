const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const KEYFILEPATH = path.join(__dirname, 'apikey.json');

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  const authClient = await auth.getClient();
  return authClient;
}

async function uploadFile(authClient, file) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth: authClient });
    const fileMetadata = {
      name: file.originalname,
      parents: ['1HUbVWr8JZnWij8X-qP5-8n075WSFrnPG'] // Replace with your folder ID
    };
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path)
    };
    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink'
    }, (err, file) => {
      if (err) {
        console.error('Error uploading file:', err);
        reject(err);
      } else {
        console.log('File uploaded successfully, File ID:', file.data.id);
        resolve(file.data);
      }
    });
  });
}

module.exports = { authorize, uploadFile };