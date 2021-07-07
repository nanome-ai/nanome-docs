---
title: Deep Linking
---

# Deep Linking

Deep linking (also known as application protocol) enables 3rd party applications to construct a URL to automatically launch Nanome with various parameters, files, and scripts programatically.

An example of this would be having an Molecular Database Partner or  customer's internal web application that could have button to "Open in Nanome" for a single or specific set of molecules. Clicking on the button would then prompt the user to launch the pre-installed Nanome Application and to immediately load the files into the corresponding Nanome room seamlessly. 

Please note that:

1. the deep linking/app protocol requires the Nanome application to be downloaded and requires Windows registry binding. Thus, users who want to use this method will needed to have installed Nanome using the  Windows Setup Installer located on the [nanome.ai/setup](https://nanome.ai/setup) page.

2. All-in-one headsets do not yet have support for this deeplinking protocol unless invoked through the Nanome in-VR web browser.

## Use cases

- Loading a single file 
        
>A scientist visits a web page that is showing a single molecule or project with information about it. Clicking the "Open in Nanome" button would launch Nanome and automatically load in a PDB, Nanome/Pymol session file, or any of our supported file types.

<a href="nanome://eyJjb21tYW5kcyI6W3siam9pbiI6InRoaXMgaXMgbXkgcm9vbSJ9XX0=
    " class="btn">Open a single file in Nanome</a>

- Loading Multiple files 

> A scientist visits a web page that has many ligands and a protein. The scientist could then select several compounds and click "Open in Nanome". The Nanome application launches automatically loading in the ligands aligned to the protein.

<a href="nanome://eyJjb21tYW5kcyI6W3siam9pbiI6InRoaXMgaXMgbXkgcm9vbSJ9XX0=
" class="btn">Open multiple files in Nanome</a>


- Run a script

> A scientist can click a button in the web browser and it would would load and run a Nanome Macro (written in LUA) in the room and apply changes such as changing the molecular representation for the secondary structure, doing modifying molecular operations

<a href="nanome://eyJjb21tYW5kcyI6W3siam9pbiI6InRoaXMgaXMgbXkgcm9vbSJ9XX0=" class="btn">Run a script in Nanome</a>

- Load molecule(s) and run a script (example code)

> A scientist visits a web page for a project, selects multiple ligands and a protein, changes some aspect of the molecular representation (e.g. specific surface coloring) and  clicks *Open in Nanome*. The Nanome application launches automatically loading in the ligands, aligning them to the protein and rendering a specific surface coloring.

<a href="nanome://eyJjb21tYW5kcyI6W3siam9pbiI6InRoaXMgaXMgbXkgcm9vbSJ9XX0=
" class="btn">Open files and run a script in Nanome</a>

## Usage


### Constructing the the URL

Each URL contains a JSON stringified, base64 encoded JSON object and is appended to the "nanome" web data/type. 

An example URL looks like:
    
     nanome://eyJjb21tYW5kcyI6W3siam9pbiI6InRoaXMgaXMgbXkgcm9vbSJ9XX0=

Entering this url in the browser would automatically launch Nanome from the Windows Registry (PC Setup Installer) or the in-VR web browser would automatically handle the commands.

To create the URL, first create the commands JSON. This one is to load the Protein MMCIF file of PDB: 6LU7 (Covid19 Main Protease) 


    const deep_link_commands = [
        {
            "type": "load",
            "sources": [
                {
                    "type": "http",
                    "path": "https://files.rcsb.org/download/6LU7.cif"
                }
            ]
        }
    ];

Now the JSON needs stringified and base64 encoded (btoa) then executed using the window.open() function: 

    const deep_link = "nanome://" + btoa(JSON.stringify(deep_link_commands));
    window.open(deep_link);

Wrapping this entire thing into a function to be triggered on a button press in javascript would enable your web platform to automatically push data to Nanome as described.

Example button:

<a href="nanome://eyJjb21tYW5kcyI6W3siam9pbiI6InRoaXMgaXMgbXkgcm9vbSJ9XX0=
" class="btn">Open in Nanome Example Button</a>


## Code Examples

### Loading multiple files (one from local and one from a direct link)

```
function testLoad() {
    const load = [
        {
            "type": "load",
            "sources": [
                {
                    "type": "file",
                    "path": "C:\\Users\\<User>\\<PATH>\\6LU7.cif"
                },
                {
                    "type": "http",
                    "path": "https://files.rcsb.org/download/6LU7.cif"
                }
            ]
        }
    ];

    const deep_link = "nanome://" + btoa(JSON.stringify(load));
    window.open(deep_link);
}

```

### Run script functions (LUA) directly

Runs a Nanome Macro (Lua) commands directly in the JSON. See the [Nanome Macro documentation](https://github.com/nanome-ai/nanome-macros/blob/master/Documentation/API.md) for supported Macro Script commands.

```
function SampleScript() {
    const script = [
        {
            "type": "script",
            "script":`
                function main()
                Selection_All();
                end;`
        }
    ]

    const deep_link = "nanome://" + btoa(JSON.stringify(script));
    window.open(deep_link);
}

```

### Load a molecule and run a script

```
function testHybrid() {
    const hybrid = [
        {
            "type": "load",
            "sources": [
                {
                    "type": "file",
                    "path": "C:\\Users\\<User>\\<PATH>\\1a9l.cif"
                },
                {
                    "type": "http",
                    "path": "https://files.rcsb.org/download/6LU7.cif"
                }
            ]
        },
        {
            "type": "script",
            "script":`
                function main()
                Selection_All();
                end;`
        }
    ]

    const deep_link = "nanome://" + btoa(JSON.stringify(hybrid));
    window.open(deep_link);
}
```

## Additional Notes

- The Nanome in-VR web browser catches the data/type and handles it so this works on All-in-one devices. This does not work on the all-in-one VR/AR devices' native browser due to them not exposing the necessary browser APIs. 
- Sequential commands are stored in a collection that implies order
- Opening a Session file (Nanome, Pymol, MOE, Maestro) or Spatial recording will prompt to clear your existing room if you already have Nanome open
