---
layout: default
title: Home
nav_order: 1
has_children: false
---


## Streamlining code-based tasks
{: .fs-9 }

### **AMPScript Studio** is a web application that communicates with Salesforce Marketing Cloud, through standard and custom APIs, to streamline tasks normally based on code, **helping to reduce development and testing times**.
{: .fs-6 .fw-300 .mb-3 }

[Open AMPScript Studio](https://ampscript.netlify.app/){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/PabloFacciano/ampscript-studio-public){: .btn .fs-5 .mb-4 .mb-md-0 }

---

![AMPScript Studio Home](https://i.ibb.co/txvKkmN/asdf.png)

## Features

### 💻 Code Editor

It allows you to run AMPScript and Server-Side JavaScript (SSJS) code, ideal for quick tests or proof-of-concept scripts before using them in production.

### 📄 Run History

Specially designed to keep track of the executions made in the Code Editor, generating logs effortlessly to analyze and understand errors.

### 👉 Did you want something else?

Nice to hear from you, please send your suggestions or ideas in this form.

## Roadmap and Releases

💙 Coming soon.


___________________________________________

## How this app works

The execution of AMPScript or ServerSide Javascript must be done in SFMC. For this there are several ways:

- Run a Script Activity in Automation Studio.
- Send or preview an Email.
- Open a published Cloudpage.

This application uses the last option to execute the code remotely, using the result of a cloudpage as if it were an API. Email preview is planned for a new version of this application.

### First Installation

6. Open [AMPScript Studio](https://ampscript.netlify.app/).
7. Login if necesary. Go to [Settings](https://ampscript.netlify.app/#settings) > Marketing Cloud.
8. Add a new Workspace:
    - Set a name
    - Paste the URL
9. Click Save and you are ready to try the Code Editor now!
