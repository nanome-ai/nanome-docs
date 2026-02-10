---
title: Quick Drop
---

# Quick Drop

Nanome Quick Drop is a powerful feature of Nanome that simplifies the process of loading files into the Nanome application. With Quick Drop, users can conveniently drag and drop files onto the home.nanome.ai webpage, and the files will automatically load the next time they open Nanome on their headset or computer. Third-party applications can utilize Quick Drop via Nanome's API to allow users to open files directly from their application into Nanome.

## Third-Party Integration

By default, Quick Drop is only available on the home.nanome.ai webpage. However, third-party applications can integrate Quick Drop into their own applications by using Nanome's API. The following sections describe how to integrate Quick Drop into your application.

Nanome has created a PyMOL plugin using Quick Drop, available [here.](https://github.com/nanome-ai/Pymol-plugin-Nanome-Quickdrop)

As of Nanome 1.24.4, Quick Drop has both a Nanome-hosted and a self-hosted version of Quick Drop. The APIs for these slightly differ, so please refer to the appropriate section below.

### Nanome-hosted Quick Drop

The basic flow for uploading files to Nanome-hosted Quick Drop is as follows:
- Get user login token
- Send filenames to Nanome API to get S3 upload URLs
- Upload files to S3
- Notify Nanome that files are uploaded

The following code snippet demonstrates this flow:
```js
const NANOME_API = 'https://api.nanome.ai'

// array of File or Blob objects from <input type="file" />
// or manually contructed from file data with new File() constructor
const files = [file1, file2]

// get user login token
const loginRes = await fetch(`${NANOME_API}/user/login`, {
    method: 'POST',
    body: JSON.stringify({
        login: 'username',
        pass: 'password'
    })
}).then(res => res.json())

const token = loginRes.results.token.value
const headers = { 'Authorization': 'Bearer ' + token }

// get S3 upload URLs
const addRes = await fetch(`${NANOME_API}/quickdrop/add`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
        filenames: files.map(f => f.name)
    })
}).then(res => res.json())

const urls = addRes.results
let done = 0

const onFileUploaded = async () => {
    if (done != files.length) return

    // notify Nanome API that all files are uploaded
    await fetch(`${NANOME_API}/quickdrop/update`, {
        method: 'POST',
        headers
    })
}

// upload files to S3
for (const file of files) {
    fetch(urls[file.name], {
        method: 'PUT',
        body: file
    }).then(onFileUploaded)
}
```

### Self-hosted Quick Drop

Self-hosted Quick Drop is slightly simplified compared to Nanome-hosted Quick Drop. Instead of uploading files to S3, the files are uploaded directly to the Quick Drop server.

The basic flow for uploading files to self-hosted Quick Drop is as follows:
- Get user unique ID from Nanome API
- Upload files to Quick Drop server
- Notify Quick Drop server that files are uploaded

The following code snippet demonstrates this flow:
```js
const NANOME_API = 'https://api.nanome.ai'
const QUICKDROP_API = 'https://quickdrop.example.com'

// array of File or Blob objects from <input type="file" />
// or manually contructed from file data with new File() constructor
const files = [file1, file2]

// get user unique ID
const loginRes = await fetch(`${NANOME_API}/user/login`, {
    method: 'POST',
    body: JSON.stringify({
        login: 'username',
        pass: 'password'
    })
}).then(res => res.json())

const unique = loginRes.results.user.unique
let done = 0

const onFileUploaded = async () => {
    if (done != files.length) return

    // notify Quick Drop server that all files are uploaded
    await fetch(`${NANOME_API}/quickdrop/${unique}/update`, {
        method: 'POST'
    })
}

// upload files to Quick Drop server
for (const file of files) {
    fetch(`${QUICKDROP_API}/quickdrop/${unique}/upload/${file.name}`, {
        method: 'POST',
        body: file
    }).then(onFileUploaded)
}
```
