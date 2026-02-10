---
title: Deep Linking
---

# Deep Linking

Deep linking (also known as application protocol) enables 3rd party applications to construct a URL to automatically launch Nanome with various parameters, files, and scripts programatically.

An example of this would be having a Molecular Database Partner or customer's internal web application that could have a button to "Open in Nanome" for a single or specific set of molecules. Clicking the button would prompt the user to launch the pre-installed Nanome Application and immediately load the files into the corresponding Nanome room seamlessly.

Please note that:

1. the deep linking/app protocol requires the Nanome application to be downloaded and requires Windows registry binding. Thus, users who want to use this method will need to have installed Nanome using the Windows Setup Installer located on the [nanome.ai/setup](https://nanome.ai/setup) page.

2. All-in-one headsets do not yet have support for this deeplinking protocol unless invoked through the Nanome in-VR web browser.

## Use cases

- Loading a single file

> A scientist visits a web page that is showing a single molecule or project with information about it. Clicking the "Open in Nanome" button would launch Nanome and automatically load in a PDB, Nanome/Pymol session file, or any of our supported file types.

<a href="https://open.nanome.ai/#/W3sidHlwZSI6ImxvYWQiLCJzb3VyY2VzIjpbeyJ0eXBlIjoiaHR0cCIsInBhdGgiOiJodHRwczovL2ZpbGVzLnJjc2Iub3JnL2Rvd25sb2FkLzZMVTcuY2lmIn1dfV0=" class="btn">Open a single file in Nanome</a>

- Loading Multiple files

> A scientist visits a web page that has many ligands and a protein. The scientist could then select several compounds and click "Open in Nanome". The Nanome application launches automatically loading in the ligands aligned to the protein.

<a href="https://open.nanome.ai/#/W3sidHlwZSI6ImxvYWQiLCJzb3VyY2VzIjpbeyJ0eXBlIjoiaHR0cCIsInBhdGgiOiJodHRwczovL2ZpbGVzLnJjc2Iub3JnL2Rvd25sb2FkLzZMVTcuY2lmIn0seyJ0eXBlIjoiaHR0cCIsInBhdGgiOiJodHRwczovL2ZpbGVzLnJjc2Iub3JnL2Rvd25sb2FkLzVDRU8uY2lmIn1dfV0=" class="btn">Open multiple files in Nanome</a>

- Run a script

> A scientist can click a button in the web browser and it would load and run a Nanome Macro (written in LUA) in the room and apply changes such as changing the molecular representation for the secondary structure, doing modifying molecular operations. [(See Lua Script here)](#run-script-functions-lua-directly)

<a href="https://open.nanome.ai/#/W3sidHlwZSI6InNjcmlwdCIsInNjcmlwdCI6IlxuICAgICAgICAgICAgZnVuY3Rpb24gbWFpbiAoKVxuICAgICAgICAgICAgICAgIGlmIExpc3RfTGVuZ3RoKFNlbGVjdGlvbl9HZXRDb21wbGV4ZXMoKSkgPD0gMCB0aGVuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBObyBTdHJ1Y3R1cmUgU2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgIGVuZFxuICAgICAgICAgICAgICAgIENvbW1hbmRfU2V0UmliYm9uc1JlbmRlcihcInNlY29uZGFyeS1zdHJ1Y3R1cmVzXCIpXG4gICAgICAgICAgICAgICAgQ29tbWFuZF9TZXRTdXJmYWNlc1RyYW5zcGFyZW5jeSgwLjUpXG4gICAgICAgICAgICAgICAgQ29tbWFuZF9Db2xvcmluZ0F0b21zQm9uZHMoXCJkZWZhdWx0XCIsIG5pbCwgbmlsLCB0cnVlKVxuICAgICAgICAgICAgICAgIENvbW1hbmRfQ29sb3JpbmdSaWJib25zKFwiZGVmYXVsdFwiKVxuICAgICAgICAgICAgICAgIENvbW1hbmRfQ29sb3JpbmdTdXJmYWNlcyhcImRlZmF1bHRcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJTdWNjZXNzXCJcbiAgICAgICAgICAgIGVuZCJ9XQ==" class="btn">Run a script in Nanome</a>


## Usage

### Constructing the URL

Each URL contains a JSON stringified, base64 encoded JSON object and is appended to the "nanome" web data/type.

An example URL looks like:

    nanome:///<base64-payload>

Entering this URL in the browser would automatically launch Nanome from the Windows Registry (PC Setup Installer) or the in-VR web browser would automatically handle the commands.

Note: the 3rd forward-slash (`/`) in the URL is intentional and important.

To create the URL, first create the commands JSON. This one is to load the Protein MMCIF file of PDB: 6LU7 (Covid19 Main Protease)

```js
const commands = [
    {
        type: "load",
        sources: [
            {
                type: "http",
                path: "https://files.rcsb.org/download/6LU7.cif"
            }
        ]
    }
]
```

Now the JSON needs stringified and base64 encoded (btoa) then executed using the window.open() function:

```js
const deepLink = "nanome:///" + btoa(JSON.stringify(commands))
window.open(deepLink)
```

Wrapping this entire thing into a function to be triggered on a button press in javascript would enable your web platform to automatically push data to Nanome as described.

If you are accessing the button from inside the Nanome in-VR web browser, then it will be useful to only have the linking. You can detect if the source of the request is coming from the Nanome in-VR web browser by looking at the UserAgent for the website requests and seeing the Nanome version.

Example button:

<a href="nanome:///W3sidHlwZSI6ImxvYWQiLCJzb3VyY2VzIjpbeyJ0eXBlIjoiaHR0cCIsInBhdGgiOiJodHRwczovL2ZpbGVzLnJjc2Iub3JnL2Rvd25sb2FkLzZMVTcuY2lmIn1dfV0=" class="btn">Open in Nanome Example Button</a>

Alternatively, you can pass it through Nanome's deep linking landing page by adding your URL to the end of this URL "https://open.nanome.ai/#/"

An example is below:

<a href="https://open.nanome.ai/#/W3sidHlwZSI6ImxvYWQiLCJzb3VyY2VzIjpbeyJ0eXBlIjoiaHR0cCIsInBhdGgiOiJodHRwczovL2ZpbGVzLnJjc2Iub3JnL2Rvd25sb2FkLzZMVTcuY2lmIn1dfV0=" class="btn">Open using Nanome landing page</a>


## Code Examples

### Loading multiple files (one from local and one from a direct link)

```js
const commands = [
    {
        type: "load",
        sources: [
            {
                type: "file",
                path: "C:\\Users\\<User>\\<PATH>\\6LU7.cif"
            },
            {
                type: "http",
                path: "https://files.rcsb.org/download/6LU7.cif"
            }
        ]
    }
]

const deepLink = "nanome:///" + btoa(JSON.stringify(commands))
window.open(deepLink)
```

### Run script functions (LUA) directly

Runs a Nanome Macro (Lua) commands directly in the JSON. See the [Nanome Macro documentation](https://github.com/nanome-ai/nanome-macros/blob/master/Documentation/API.md) for supported Macro Script commands.

```js
const commands = [
    {
        type: "script",
        script: `
            function main ()
                if List_Length(Selection_GetComplexes()) <= 0 then
                    return "Error: No Structure Selected"
                end
                Command_SetRibbonsRender("secondary-structures")
                Command_SetSurfacesTransparency(0.5)
                Command_ColoringAtomsBonds("default", nil, nil, true)
                Command_ColoringRibbons("default")
                Command_ColoringSurfaces("default")
                return "Success"
            end`,
    }
]

const deepLink = "nanome:///" + btoa(JSON.stringify(commands))
window.open(deepLink)
```

### Load a molecule and run a script

```js
const commands = [
    {
        type: "load",
        sources: [
            {
                type: "file",
                path: "C:\\Users\\<User>\\<PATH>\\1a9l.cif"
            },
            {
                type: "http",
                path: "https://files.rcsb.org/download/6LU7.cif"
            }
        ]
    },
    {
        type: "script",
        script:`
            function main()
                Selection_All()
            end`
    }
]

const deepLink = "nanome:///" + btoa(JSON.stringify(commands))
window.open(deepLink)
```

## Additional Notes

- The Nanome in-VR web browser catches the data/type and handles it so this works on All-in-one devices. This does not work on the all-in-one VR/AR devices' native browser due to them not exposing the necessary browser APIs.
- Sequential commands are stored in a collection that implies order
- Opening a Session file (Nanome, Pymol, MOE, Maestro) or Spatial recording will prompt to clear your existing room if you already have Nanome open
