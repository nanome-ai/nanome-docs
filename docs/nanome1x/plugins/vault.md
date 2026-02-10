---
title: Vault
---

# Nanome Vault

Nanome Vault is a plugin that enables easy cloud upload, download and storage from VR headsets and your web browser. This allows users to drag and drop a file to/from their web browser and make it instantly available in their Nanome session.

With the rise of all-in-one headsets like the Oculus Quest 2 and the Vive Focus 3, the barrier to entry to store and retrieve files has increased considerably due to the need to plug the headset into a computer and use Android File transfer manually. Nanome Vault allows users to open up a web browser on any computer to access cloud storage that is integrated directly into their Nanome session and linked to your Nanome account. You can visit the Nanome-hosted Vault Plugin at https://vault.nanome.ai. _Note that if you are an Enterprise customer, your Organization will have a different web address for the private-cloud deployment of the Nanome Vault, please contact your Nanome administrator for the correct URL_.

There are three primary folders in the Nanome Vault:
- Shared: A public shared folder for everyone
- MyOrg: A shared folder only accessible for users in your organization (requires Organization to be configured in https://home.nanome.ai)
- MyAccount: A folder only accessible to you

Inside of your MyAccount folder, there a few preset folders such as Pictures, Workspaces, Molecules. Users can create new folders, move files around, and even encrypt folders.

When accessing Vault from the web browser (at https://vault.nanome.ai), it will prompt you to login using your Nanome credentials.

<vimg src="plugins-page/nanome-vault/web.png" />

<vimg src="plugins-page/nanome-vault/web-login.png" />
<vimg src="plugins-page/nanome-vault/web-account.png" />

From here you can drag and drop files into the web browser as well as rename, move, and delete them.

<vimg src="plugins-page/nanome-vault/web-upload.png" />


After you launch Nanome, open up the Load Menu and go to the "Stacks" tab. This will show Nanome Vault that you can now click and navigate through the Nanome Vault and see what you have uploaded.
<vimg src="plugins-page/nanome-vault/plugin-shared.png" />

Additionally, users can upload from inside a Nanome Session to the Nanome Vault to use for other applications or come back to later. 

Whenever you have a prompt to export (e.g. Workspace Session File, Molecule, Image, etc), there is a "where" field on the destination you would like to save your file to. Each of these file destination dropdowns contain a "Vault - Browse" option that lets you navigate through the Nanome vault and select a specific file save location. 

This is particularly useful if you have made several ligand design iterations and wanted to upload them to share with other colleagues.

You can also access the Scene Viewer from Vault, which allows you to arrange content in Nanome. More information on the Scene Viewer can be found [here](https://docs.nanome.ai/plugins/sceneviewer.html).
