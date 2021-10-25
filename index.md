---
layout: default
title: Home
nav_order: 1
has_children: false
---


## Streamlining code-based tasks
{: .fs-9 }

### **AMPScript Studio** is a web application that communicates with Salesforce Marketing Cloud, through standard and custom APIs, to streamline tasks normally based on code, **helping to reduce development and testing times**.
{: .fs-6 .fw-300 .mb-2 }

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

## Costs in Salesforce Marketing Cloud
Depending on the contracted version of Salesforce Marketing Cloud, you will have a certain number of API calls available to use. This application can use the API if the credentials are provided.

Additionally, another point is the cost of super messages. Each super message is used to send an email or to open a Cloudpage.

This is an [illustrative cost document](https://www.salesforce.com/content/dam/web/en_us/www/assets/pdf/misc/super-messages-excluding-sms-mms-august172021.pdf) and [here](https://help.salesforce.com/s/articleView?id=sf.mc_overview_data_usage.htm&type=5) you will find a summary of which elements are registered for billing. 

For more information on how these are billed, refer to your contract or contact your Salesforce Account Executive.

## How this app works

The execution of AMPScript or ServerSide Javascript must be done in SFMC. For this there are several ways:

- Run a Script Activity in Automation Studio.
- Send or preview an Email.
- Open a published Cloudpage.

This application uses the last option to execute the code remotely, using the result of a cloudpage as if it were an API. Email preview is planned for a new version of this application.

> Currently, Code Resources are not considered or counted as CloudPages impressions.
[Source: Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.mc_overview_data_usage.htm&type=5#:~:text=Currently%2C%20Code%20Resources%20are%20not%20considered%20or%20counted%20as%20CloudPages%20impressions.)

For correct operation and to avoid additional costs, the cloudpage must be of type Code Resource.

## Get Started

### First Installation

1. In Content Builder (Salesforce Marketing Cloud), create a new Code Snipset and add the content of the [CodeExecutor.ampscript](https://github.com/PabloFacciano/ampscript-studio-public/blob/main/core/CodeExecutor.ampscript) file.
2. Don't forget to change the default external key to "CodeExecutor".
3. In Web Studio > Cloudpages (Salesforce Marketing Cloud), open a collection and create a new Code Resource.
4. The content will be: `%%=ContentBlockByKey("CodeExecutor")=%%`
5. Copy the URL, save and publish.
6. Open [AMPScript Studio](https://ampscript.netlify.app/).
7. Login if necesary. Go to [Settings](https://ampscript.netlify.app/#settings) > Marketing Cloud.
8. Add a new Workspace:
    - Set a name
    - Paste the URL
9. Click Save and you are ready to try the Code Editor now!

### Update Installation

In case of an update of the code, you can copy the new script in the Code Snipset and that's all.

