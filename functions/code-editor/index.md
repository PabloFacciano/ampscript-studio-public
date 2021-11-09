---
layout: default
title: Code Editor
nav_order: 3
parent: Functions
has_children: true
---

# Code Editor

## What is it?

The Code Editor is the main tool of this application.
It allows you to execute AMPScript or SSJS code, as well as HTML and CSS as if it were an execution of a cloudpage (and it actually is!).

![Code Editor in AMPScript Studio](https://github.com/PabloFacciano/ampscript-studio-public/blob/gh-pages/img/CodeEditor.jpg?raw=true)

## Use cases

- ✅ Quick code tests
- ✅ Proof of concept of a solution
- ✅ Checking the operation of the code

## Behind the scenes

The execution of AMPScript or ServerSide Javascript (SSJS) must be done in SFMC. For this there are several ways:

- Run a Script Activity in Automation Studio.
- Send or preview an Email.
- Open a published Cloudpage.

This application uses the last option to execute the code remotely, using the result of a cloudpage as if it were an API. Email preview is planned for a new version of this app.

Remember, SSJS is EcmaScript3. Source: [Salesforce](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-programmatic-content.meta/mc-programmatic-content/ssjs_syntaxGuide.htm).

## Worspaces

As it says in [Setup > AMPScript Studio](../../setup/ampscriptstudio#workspaces):
> *Workspaces are used to define and choose which SFMC instance will execute the code. This allows a faster switch between environments.*

To change the Workspace where the code is executed, you must select an existing one in the upper right corner, next to the user.
The following executions of the code will use the chosen environment.

![Change Workspace in Code Editor](https://github.com/PabloFacciano/ampscript-studio-public/blob/gh-pages/img/workspace.jpg?raw=true)