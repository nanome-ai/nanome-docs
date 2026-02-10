---
title: FAQ
---

# FAQ

## What is Nanome?

Nanome is a collaborative virtual-reality molecular modelling tool made for professional researchers working on structures and proteins at the nano scale. Analyze the 3D arrangement of molecules while inside of a protein binding pocket, surround yourself in crystal data, or communicate your ligand design to your colleagues in the same virtual room. No matter what you do, Nanome empowers your research and enhances your understanding like no other tools have before. Whether you are a structural biologist, crystallographer, computational chemist, medicinal chemist, or a protein engineer, you will find your daily workflow much more intriguing and effective in Nanome because of the power of VR.

## What VR headsets does Nanome support?

Check out the full list on our <a href="https://docs.nanome.ai/help/hardwarerequirements.html">hardware requirements page.</a>

## Where can I download Nanome?

Nanome can be downloaded for free from all major Virtual Reality stores including [Oculus](https://nanome.ai/pricing/), [Steam](https://nanome.ai/pricing/), and [VivePort](https://www.viveport.com/apps/0a467f78-2ed2-43eb-ada8-9d677d5acf54/Nanome/), or directly from [https://home.nanome.ai/setup](https://home.nanome.ai/setup). Premium versions with upgraded features are available for purchase from our website at [https://nanome.ai/pricing/](https://nanome.ai/pricing/).

## How do I update Nanome to the latest version?

Please download our [Nanome update guide](https://drive.google.com/file/d/1x6LEc1-kV3yp9XYgSqxnIsU8iv1ou4fk/view?usp=sharing) and follow the instructions to update your Nanome software.

## If I don’t have a VR device, can I still use Nanome?

Yes, Nanome has a 2D desktop mode for users without VR devices. In 2D mode, users may join a Nanome room from a 2D interface. A 2D user moves a camera with their mouse and keyboard, enabling them to spectate and record sessions, but cannot interact with structures. 2D mode can be accessed on [Steam](https://nanome.ai/pricing/) or if Nanome is downloaded on our [website](https://home.nanome.ai/setup). While 2D mode can also be accessed on Oculus, you’ll need to have a headset connected.

## What are the System Requirements to run Nanome in VR?

Please see <a href="https://docs.nanome.ai/help/pchardware.html">minimum and recommended specs here. </a>

## Can I use Nanome on Mac/Linux?

Nanome does not currently support Mac or Linux. Windows is the primary operating system for using VR headsets and represents the best way to use Nanome using a PC. Alternatively, users can use all-in-one headsets such as the Meta Quest Pro, Meta Quest 2, or Vive Focus 3 devices.

## Do I need an Internet connection to use Nanome?

A stable Internet connection is highly recommended when using Nanome, especially when collaborating with other users. Access to the web is also necessary to download structures from databases like RCSB and DrugBank Databases. For solo users with structures stored on their local machines, internet access is not required.

## How many users can join a Nanome session at the same time?

Nanome currently supports up to 20 XR collaborators in a room concurrently. Up to 50 more users can join via Nanome's 2D mode.

## What file formats does Nanome support? How can I import them?

Nanome supports .pdb, .sdf, and features limited compatibility with other atomic coordinate files, like .cif. While .pdb or .sdf format are the most stable formats, we are always improving our parser’s ability to handle anomalies.

An exhaustive list of supported file formats includes: .pdb, .cif, .mmcif, .sdf, .mol, .xyz, .mol2, .ccp4, .dsn6, .dcd, .gro, .pqr, .trr, .xtc, .psf, .pse, .nanome, .png, .jpg, .jpeg, .pdf

Structures may be imported directly from RCSB Protein Data Bank, PubChem, DrugBank, and other online databases from the VR Molecular Loading Menu.

We recommend setting Nanome as your default software for opening .pdb files. Double-clicking on any local .pdb will automatically open the file with the Nanome software.

## What are the supported files and limitations of Trajectory / Molecular Dynamics files (MD)?

| File Type | Description                                      | Source Software      |
| --------- | ------------------------------------------------ | -------------------- |
| PDB/MMCIF | Classical Protein file that supports multi-frame | Most MD Softwares    |
| DCD       | Trajectory File from NAMD                        | NAMD, CHARMM, LAMMPS |
| Desmond   | GRO                                              | GROMOS96             |
| PSF       | Protein Structure File                           | NAMD                 |
| XTC       | Trajectory File (Compressed)                     | Gromacs              |
| TRR       | Trajectory File (Lossless) (XDR backend)         | Gromacs              |

It’s important to note that most molecular dynamics files contain two files to be loaded in parallel, the topology file and the position coordinate file.

These trajectory files are able to be played back in the Advanced Menu of the Entry list for the corresponding loaded trajectory.

Nanome subsamples the number of molecular frames that are a part of the molecular dynamics file to be 500 frames, and the limitation of the number of atom systems depends on the client device’s hardware limitations. In PCVR setups, rather large atomic systems simulated can be played back at 500 frames (e.g., 200k-300k atoms), whereas a standalone headset supports a much smaller atomic system (e.g., 5000-6000 atoms).

Note that the entire trajectory file’s contents need to be both stored in memory and also be networked to other users. This means that for standalone headsets, larger MD files are not able to be loaded on the small amount of system memory on a device equivalent to a smartphone. Since these files also need to be propagated over the network, there is a longer latency for other users to receive all of the molecular dynamics file data and then render it on their device.

In a PCVR system, while you can load much larger molecular dynamics simulations, in a collaborative room, that data still needs to go over the network and be downloaded by each user before rendering, thus there can be scenarios where there is a large latency between the rendering of the structure for the presenter vs. the rest of the guests.

In general, our recommendation is to keep the atomic systems small in terms of only including atoms that are relevant for collaborative inspection as well as keeping the duration of the MD to be low and focusing on frames most relevant to your protein ensemble state.

## Are there any limitations for the Nanome Vault file storage?

While Nanome Vault does not have any particular file size limitations. The limitations come from the Nanome Client Application trying to load files that are either too large in terms of number of atoms/bonds or sheer file size.

Loading from Nanome Vault also has more latency in comparison to loading locally, which is expected.

Nanome Vault only can have files uploaded that are officially supported by the Nanome Client Application.

With respect to OBJ files loaded through the Nanome Vault, some larger files will struggle or fail to load within Nanome. Our recommendation is to keep OBJ files under 100,000 vertices.

## What services do you offer once I purchase a license? [Enterprise Only]

We provide full support for private data security, database integration, computational plugin integration, plugin development and customization.

## Do you have a site subscription license?

Yes, for Nanome site licenses please contact sales@nanome.ai.

## My company and I are looking to incorporate VR technology into our workflow (research, training, presentations, etc.) and we are interested in trying Nanome. Would it be possible to get a free trial so that our team can experiment with your software and see if it meets our needs?

Of course! We understand that integrating new technologies into existing procedures can take some time. Just email us at sales@nanome.ai so that we can initiate a trial for you. If you'd like to schedule a demo with one of our team members, you can submit a request [here](https://nanome.ai/demo/).

## Can I use this for my school?

Yes, please visit [https://home.nanome.ai/academic](https://home.nanome.ai/academic) to learn how.

## Can I use plugins with an Academic License?

Currently, plugins are only available with an Enterprise license. We may open up plugins to early adopters in Academic Institutions. Please email support@nanome.ai to inquire about the Nanome Developer Program

## How does the Nanome licensing system work? Isn’t Nanome free?

A limited version of Nanome is free for all users which can be downloaded at any major Virtual Reality store including [Oculus](https://nanome.ai/pricing/), [Steam](https://nanome.ai/pricing/), and [VivePort](https://www.viveport.com/apps/0a467f78-2ed2-43eb-ada8-9d677d5acf54/Nanome/), or directly from [https://home.nanome.ai/setup](https://home.nanome.ai/setup). Licenses for premium capabilities can be purchased from the Nanome website [https://nanome.ai/pricing/](https://nanome.ai/pricing/).

## If I purchase multiple licenses, how can I administer them in my class or lab?

One workflow we can recommend is the following: you need to have a Nanome account that acts as the "license administrator". This can be your own Nanome account, or maybe an account mutually maintained by your department or lab. This license administrator Nanome account is not required to have a license assigned to it, but it will own all the licenses you intend to use.

You should purchase the licenses from the license administrator Nanome account, or if you need to [request a quote from us](https://home.nanome.ai/quote) then be sure to indicate the email address for the license administrator Nanome account. Once your licenses have been allocated (they will be visible in the Licenses section on [home.nanome.ai](https://home.nanome.ai/)), then follow the instructions [here](https://docs.nanome.ai/home.nanome.ai/licenses.html#assign-licenses) to assign these licenses to other users. One of the licenses will automatically be assigned to this admin account, but it can be re-assigned to another user. If you don't have existing user accounts, you can also create new Nanome accounts (e.g. "student-1", "student-2", etc.) and then assign the licenses to these accounts.

## I have a coupon code. How do I redeem it?

First, create an account or login at [https://nanome.ai/pricing/](https://nanome.ai/pricing/). Once you are logged in, you will notice a sidebar on the right with various options. Click plans and products and you will see our different premium tiers along with annual and monthly plans on top. Select the plan that your coupon covers. On the next menu, you'll see a form for credit card information as well as a blank to type in your coupon. You will have to put in your credit card information, but the coupon should neglect any actual fee. If your card was charged after the transaction, please contact us directly at support@nanome.ai and we will issue a refund immediately.

## How to find the log file (Logs) of Nanome sessions for PC-tethered VR

If you experience an issue with Nanome, please be sure to send us the logs for the event (both messages.txt and details.txt) so that we can investigate the issue. Feel free to email your bug report to support@nanome.ai.

If you are using PC 2D mode or PC-tethered VR headsets, the logs for your session will be on your computer. If you open up your file explorer, please navigate to the following path:

`C:\Users\\[USERNAME]\AppData\LocalLow\Nanome Inc_\Nanome\History`

A log file's name follows the format of "YYYY-MM-DD_HH-MM-SS_details.txt" and is determined by the starting time of the session.

For frequent users of Nanome, we recommend favoriting this path in your Windows File Explorer to quickly come back to later.

## How to find the log file (Logs) of Nanome sessions for All-in-One VR (e.g. Quest 2/Vive Focus 3)

If you experience an issue with Nanome, please be sure to send us the logs for the event (both messages.txt and details.txt) so that we can investigate the issue. Feel free to email your bug report to support@nanome.ai.

### NOTE:

- #### The VR headset needs to be turned on during this process.
- #### The computer you are connecting the headset to does not need to be VR-Ready. It can be a generic low spec computer.

All-in-one VR headsets such as the Quest 2 or the Vive Focus 3 are Android based operating systems and log files are saved directly onto the headset. In order to move them or make a copy, you will need to connect your VR device to your computer via a USB-C cable. After plugging in your headset via USB-C to your computer, make sure to turn on the headset and put it on. You will be prompted in-VR to click "Allow" to let the computer read the headset's files.

Note that some USB-C cables are charging only cables and you will need one that can transmit data.

Now that the computer has access to read the VR headset's storage, there are two methods depending on if you are on Windows or Mac.

### Windows

Open your Windows File Explorer and look to the left panel. There you can see Storage Devices that are connected to your computer. You will see an item to the left that lists the associated File Storage for the VR headset. Sometimes it is named "Quest" or "Oculus".

## I have requests/ideas for new features, where can I send them?

Please email your requests to support@nanome.ai. We take all our users' feedback seriously, and your idea just might turn into the next big feature in Nanome.

## I am from a country with GDPR, How do I request to Delete or Request to View my customer data?

Please contact support@nanome.ai to Request for the deletion of your customer data or a downloadable version. Please note this is a manual process and will take 2-3 weeks to procure.
