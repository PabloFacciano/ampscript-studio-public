---
layout: default
title: AMPScript Studio
parent: Setup
has_children: false
nav_order: 2
---

# Setup in AMPScript Studio

## Create Account
If you don't have an account, you can [request a new one](../../user-request).

## Workspaces
Workspaces are used to define and choose which SFMC instance will execute the code.
This allows a faster switch between environments.

### Create Workspace
To create a new Workspace, enter [Settings > Marketing Cloud](https://ampscript.netlify.app/#settings) and in the "Create Workspace" section, fill in all the necessary data:

<dl>
  <dt>Name</dt>
  <dd>A name that you will only see in the application.</dd>
  <dt>Cloudpage URL</dt>
  <dd>The URL of the cloudpage created in the previous steps.</dd>
  <dt>Tenant</dt>
  <dd>Custom portion of the AUTH / REST endpoint of your SFMC instance. Visible in an Installed Package.</dd>
  <dt>MID</dt>
  <dd>Business Unit ID in SFMC.</dd>
  <dt>Client ID</dt>
  <dd>API access credentials.</dd>
  <dt>Client Secret</dt>
  <dd>API access credentials.</dd>
</dl>

![Workspace in AMPScript Studio](https://i.ibb.co/T0dDFTk/image.png)