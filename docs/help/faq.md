---
title: FAQ
---

# FAQ

<IconGrid label="FAQ topics" :cols="3">
<IconCard icon="info-circle" title="About Nanome" href="#about">What Nanome is, and how many people can join.</IconCard>
<IconCard icon="device-vision-pro" title="Hardware and setup" href="#hardware">Headsets, PC specs, Mac, 2D mode, internet.</IconCard>
<IconCard icon="download" title="Download and updates" href="#download">Where to get Nanome and how to update it.</IconCard>
<IconCard icon="files" title="File formats" href="#file-formats">Supported files, trajectories and Vault limits.</IconCard>
<IconCard icon="license" title="Licenses and purchasing" href="#licenses">Trials, academic use, site licenses and coupons.</IconCard>
<IconCard icon="bug" title="Logs and support" href="#support">Log files, feature requests and your data.</IconCard>
</IconGrid>

<Callout type="note" title="Nanome XR, Nanome Web and Nanome Classic">

Answers tagged **Classic** describe Nanome Classic (v1.24 and v1.26), the older PC VR app. For Nanome XR and Nanome Web, start with [Getting Started](/getting-started).

</Callout>

## <AppIcon name="info-circle" /> About Nanome {#about}

<AccordionGroup label="2 questions">

<Accordion title="What is Nanome?" teaser="Collaborative VR molecular modelling for researchers.">

Nanome is a collaborative virtual-reality molecular modelling tool made for professional researchers working on structures and proteins at the nano scale. You can analyze the 3D arrangement of molecules from inside a protein binding pocket, surround yourself with crystal data, or show your ligand design to colleagues in the same virtual room. It's made for structural biologists, crystallographers, computational chemists, medicinal chemists and protein engineers.

</Accordion>

<Accordion title="How many users can join a Nanome session at the same time?" teaser="In Classic: up to 20 in VR, and 50 more in 2D mode." tag="Classic">

Nanome currently supports up to 20 XR collaborators in a room at once. Up to 50 more users can join through Nanome's 2D mode.

</Accordion>

</AccordionGroup>

## <AppIcon name="device-vision-pro" /> Hardware and setup {#hardware}

<AccordionGroup label="5 questions">

<Accordion title="What VR headsets does Nanome support?" teaser="Meta Quest 3 and 3S, Samsung Galaxy XR, Apple Vision Pro, and Windows PCs over Meta Link.">

Nanome XR runs on Meta Quest 3 and 3S, Samsung Galaxy XR, Apple Vision Pro, and Windows PCs over Meta Link. [Choosing Hardware](/help/choosinghardware) compares them. The older list for Nanome Classic is on [Hardware Requirements](/help/hardwarerequirements).

</Accordion>

<Accordion title="What are the system requirements to run Nanome in VR?" teaser="Minimum and recommended PC specs." tag="Classic">

The minimum and recommended specs are on [PC Hardware](/help/pchardware).

</Accordion>

<Accordion title="Can I use Nanome on Mac or Linux?" teaser="Yes, with Nanome Web in a browser.">

[Nanome Web](/nanome_web/overview) runs in a web browser at app.nanome.ai, so a Mac or Linux computer can open the same workspaces as a headset.

Nanome Classic ran on Windows for PC VR, and on all-in-one headsets such as the Meta Quest Pro, Meta Quest 2 or Vive Focus 3.

</Accordion>

<Accordion title="If I don't have a VR device, can I still use Nanome?" teaser="Yes, with Nanome Web in a browser.">

Yes. [Nanome Web](/nanome_web/overview) at app.nanome.ai opens the same workspaces in a browser, and works alongside people in headsets.

Nanome Classic had a 2D desktop mode for users without VR devices: you joined a room from a 2D interface and moved a camera with the mouse and keyboard, to spectate and record sessions without interacting with structures. It's on Steam, and in Nanome Classic downloaded from our website. It's on Oculus too, but needs a headset connected.

</Accordion>

<Accordion title="Do I need an internet connection to use Nanome?" teaser="Highly recommended, and needed to collaborate or use online databases.">

A stable internet connection is highly recommended, especially when collaborating with other users. You also need the web to download structures from databases like RCSB and DrugBank. Solo users with structures stored on their own machine don't need internet access.

</Accordion>

</AccordionGroup>

## <AppIcon name="download" /> Download and updates {#download}

<AccordionGroup label="2 questions">

<Accordion title="Where can I download Nanome?" teaser="See Download &amp; install in Getting Started.">

[Download &amp; install](/getting-started#install) covers Nanome XR on each headset.

Nanome Classic is free to download from all major VR stores, including Oculus, Steam and VivePort, or directly from the [Versions page](https://nanome.ai/versions). Premium versions with upgraded features are for sale on our website.

</Accordion>

<Accordion title="How do I update Nanome to the latest version?" teaser="Follow the Nanome update guide.">

Download the [Nanome update guide](https://drive.google.com/file/d/1x6LEc1-kV3yp9XYgSqxnIsU8iv1ou4fk/view?usp=sharing) and follow its instructions.

</Accordion>

</AccordionGroup>

## <AppIcon name="files" /> File formats {#file-formats}

<AccordionGroup label="4 questions">

<Accordion title="What file formats does Nanome v2 support?" teaser="Structures, session files, trajectories and DX maps.">

In short, v2 imports structures (PDB, mmCIF, SDF, SMILES, XYZ, PQR, PDBQT, and MOL/MOL2 through a MARA tool), session files (MAE, MOE, PSE), trajectories (GRO, XTC, TRR, DCD), and DX electrostatic maps. Molecule export is single-frame, to PDB, SDF, or SMILES.

The full per-format list, with import and export capability, trajectory playback and per-release changes, is on [Supported File Formats](/nanome_web/fileformats).

</Accordion>

<Accordion title="What file formats does Nanome support, and how do I import them?" teaser="PDB and SDF are the most stable, plus many more." tag="v1.26">

*This answer describes Nanome 1.26 (Classic).*

Nanome supports .pdb and .sdf, and has limited compatibility with other atomic coordinate files, like .cif. The .pdb and .sdf formats are the most stable, and we keep improving the parser's handling of anomalies.

The full list of supported file formats: .pdb, .cif, .mmcif, .sdf, .mol, .xyz, .mol2, .ccp4, .dsn6, .dcd, .gro, .pqr, .trr, .xtc, .psf, .pse, .nanome, .png, .jpg, .jpeg, .pdf

Structures can be imported directly from the RCSB Protein Data Bank, PubChem, DrugBank and other online databases from the VR Molecular Loading Menu.

We recommend making Nanome the default software for .pdb files. Double-clicking a local .pdb then opens it in Nanome.

</Accordion>

<Accordion title="What are the supported files and limits for trajectory (MD) files?" teaser="Formats, the 500-frame subsample, and atom counts by device." tag="v1.26">

*This answer describes Nanome 1.26 (Classic). For trajectories in Nanome XR and Nanome Web, see [Supported File Formats](/nanome_web/fileformats#trajectory-molecular-dynamics).*

| File Type | Description                                      | Source Software      |
| --------- | ------------------------------------------------ | -------------------- |
| PDB/MMCIF | Classical Protein file that supports multi-frame | Most MD Softwares    |
| DCD       | Trajectory File from NAMD                        | NAMD, CHARMM, LAMMPS |
| GRO       | GROMACS coordinate file                          | GROMACS              |
| PSF       | Protein Structure File                           | NAMD                 |
| XTC       | Trajectory File (Compressed)                     | Gromacs              |
| TRR       | Trajectory File (Lossless) (XDR backend)         | Gromacs              |

Most molecular dynamics data comes as 2 files loaded in parallel: the topology file and the position coordinate file. Trajectories play back from the Advanced Menu of the Entry list for the loaded trajectory.

Nanome subsamples a molecular dynamics file to 500 frames. How many atoms a system can have depends on the device's hardware. A PCVR setup can play back rather large simulated systems at 500 frames (e.g., 200k-300k atoms), while a standalone headset supports a much smaller system (e.g., 5000-6000 atoms).

The whole trajectory has to be stored in memory and also sent over the network to other users. So on standalone headsets, larger MD files can't load into the small amount of memory of a device equivalent to a smartphone, and other users wait longer to receive all of the data and render it.

A PCVR system can load much larger simulations, but in a collaborative room that data still goes over the network and each user downloads it before rendering. There can be a large delay between the structure rendering for the presenter and for the rest of the guests.

We recommend keeping systems small, with only the atoms relevant to the collaborative inspection, and keeping the MD short, focused on the frames most relevant to your protein ensemble state.

</Accordion>

<Accordion title="Are there any limitations for Nanome Vault file storage?" teaser="No file size limit, but the client has to load what you store.">

Nanome Vault has no particular file size limit. The limits come from the Nanome client loading files that are too large, in number of atoms and bonds or in sheer file size.

- Loading from Nanome Vault has more latency than loading locally, which is expected.
- Only files the Nanome client officially supports can be uploaded to Nanome Vault.
- Some larger OBJ files loaded through Nanome Vault struggle or fail to load. We recommend keeping OBJ files under 100,000 vertices.

</Accordion>

</AccordionGroup>

## <AppIcon name="license" /> Licenses and purchasing {#licenses}

<AccordionGroup label="8 questions">

<Accordion title="How does the Nanome licensing system work? Isn't Nanome free?" teaser="The browser is free. Headsets take a Collab or Full seat.">

A free license covers Nanome in the browser at app.nanome.ai, with 1 owned project, 3 owned workspaces and 5 structures per workspace. Working in a headset takes a Collab or Full seat, and every new account starts with a 14-day Full license trial. Seats and prices are on the [Nanome website](https://nanome.ai/pricing/).

</Accordion>

<Accordion title="Can my team get a free trial?" teaser="Yes. Every new account starts with a 14-day trial.">

Every new account at app.nanome.ai starts with a 14-day Full license trial. For a trial for your team, whether for research, training or presentations, email sales@nanome.ai. To schedule a demo with one of our team, [request one here](https://nanome.ai/demo/).

</Accordion>

<Accordion title="Can I use this for my school?" teaser="Yes, through the academic program.">

Yes. [home.nanome.ai/academic](https://home.nanome.ai/academic) explains how.

</Accordion>

<Accordion title="Do you have a site subscription license?" teaser="Yes. Contact sales@nanome.ai.">

Yes. For Nanome site licenses, contact sales@nanome.ai.

</Accordion>

<Accordion title="What services do you offer once I purchase a license?" teaser="Security, integration and plugin support." tag="Enterprise">

We provide full support for private data security, database integration, computational plugin integration, plugin development and customization.

</Accordion>

<Accordion title="Can I use plugins with an Academic License?" teaser="Plugins are Enterprise only for now.">

Plugins are only available with an Enterprise license for now. We may open them up to early adopters in academic institutions. To ask about the Nanome Developer Program, email support@nanome.ai.

</Accordion>

<Accordion title="If I purchase multiple licenses, how can I administer them in my class or lab?" teaser="Use one license administrator account that owns them all.">

One workflow we recommend:

<Steps>

1. Choose a Nanome account to act as the "license administrator". It can be your own account, or one your department or lab maintains together. It doesn't need a license assigned to it, but it will own all the licenses you intend to use.
2. Buy the licenses from that account. If you [request a quote](https://home.nanome.ai/quote), give the email address of the license administrator account.
3. Once the licenses are allocated, they show in the Licenses section on home.nanome.ai. [Assign them to other users](/home.nanome.ai/licenses#assign-licenses).

</Steps>

One of the licenses is assigned to the admin account automatically, but you can reassign it. If you don't have user accounts yet, you can create new Nanome accounts (e.g. "student-1", "student-2", etc.) and assign the licenses to them.

</Accordion>

<Accordion title="I have a coupon code. How do I redeem it?" teaser="Choose the plan your coupon covers, then enter the code at checkout.">

<Steps>

1. Create an account or log in at [nanome.ai/pricing](https://nanome.ai/pricing/).
2. In the sidebar on the right, click plans and products. The premium tiers show, with annual and monthly plans on top.
3. Select the plan your coupon covers.
4. On the next menu, enter your credit card information and type your coupon in the blank. You have to enter card details, but the coupon should cancel any actual fee.

</Steps>

If your card was charged after the transaction, contact us at support@nanome.ai and we'll issue a refund immediately.

</Accordion>

</AccordionGroup>

## <AppIcon name="bug" /> Logs and support {#support}

When something goes wrong in Nanome, send us the logs for the event (both messages.txt and details.txt) so we can investigate. Email your bug report to support@nanome.ai.

<AccordionGroup label="4 questions">

<Accordion title="Where are the log files for PC-tethered VR?" teaser="In AppData on your computer.">

With PC 2D mode or a PC-tethered VR headset, the logs for your session are on your computer. In File Explorer, go to:

`C:\Users\[USERNAME]\AppData\LocalLow\Nanome Inc_\Nanome\History`

A log file is named "YYYY-MM-DD_HH-MM-SS_details.txt", after the time the session started. If you use Nanome often, add this path to your favorites in Windows File Explorer.

</Accordion>

<Accordion title="Where are the log files for all-in-one VR (e.g. Quest 2 or Vive Focus 3)?" teaser="On the headset. Copy them over a USB-C data cable.">

All-in-one headsets such as the Quest 2 and Vive Focus 3 run Android-based operating systems and save log files on the headset. To move or copy them, connect the headset to your computer with a USB-C cable.

<Callout type="note" title="Before you start">

- The headset needs to be turned on during this process.
- The computer doesn't need to be VR-ready. A generic low-spec computer works.
- Some USB-C cables only charge. You need one that transmits data.

</Callout>

<Steps>

1. Plug the headset into your computer with the USB-C cable.
2. Turn on the headset and put it on.
3. In VR, click "Allow" to let the computer read the headset's files.

</Steps>

The computer can now read the headset's storage. The next step depends on whether you're on Windows or Mac.

On Windows, open File Explorer and look at the left panel, which lists the storage devices connected to your computer. One of them is the headset's file storage, sometimes named "Quest" or "Oculus".

</Accordion>

<Accordion title="I have requests or ideas for new features. Where can I send them?" teaser="Email support@nanome.ai.">

Email your requests to support@nanome.ai. We take all our users' feedback seriously.

</Accordion>

<Accordion title="I'm in a country with GDPR. How do I ask to delete or view my customer data?" teaser="Email support@nanome.ai. It takes 2-3 weeks.">

Contact support@nanome.ai to request the deletion of your customer data, or a downloadable copy. This is a manual process and takes 2-3 weeks.

</Accordion>

</AccordionGroup>
