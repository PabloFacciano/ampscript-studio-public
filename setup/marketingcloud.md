---
layout: default
title: Salesforce Marketing Cloud · Setup
parent: Setup
has_children: false
nav_order: 1
---

# Setup in Salesforce Marketing Cloud (SFMC)

## Build
Building the components in SFMC is really simple.

In a next update, it will only be necessary to add the API Credentials to create the other components automatically.

### 👉 API Credentials
At the moment, this step is optional and it is recommended to skip it.

In Setup, create an [Installed Package](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/install-packages.html).

Then, add an [API Integration](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/create-integration-enhanced.html).

Integration Type: Server-to-Server

Permissions: All

### 👉 Data Extension
To record logs you need to create a DataExtension.
This can be done in Email Studio or Contact Builder.

Name: ampscript_studio__run_history_lines

External Key: ampscript_studio__run_history_lines

Used for sending: No

Data Retention Policy: ON

Delete: Individual Records

Period: After 1 Day

Fields:

| Name | Data Type | Length | Nullable | Primary Key | Default Value |
|:---|:---|:---|:---|:---|:---|
| Code | Text | 300 | Yes | No | - |
| Line Number | Number | - | Yes | No | - |
| RealLineNumber | Number | - | Yes | No | - |
| RunDateOnServer | Date | - | Yes | No | - |
| RunDateOnClient | Text | 50 | Yes | No | - |
| ExecutionID | Text | 50 | Yes | No | - |
| LineID | Text | 50 | Yes | No | - |

### 👉 Code Snipset
Create a new block of type Code Snippet.
This can be done in Email Studio or Content Builder.

Name: AMPScriptStudio-CodeExecutor

Customer Key: AMPScriptStudio-CodeExecutor

In the content, copy the code shown in the file [CodeExecutor.ampscript](https://github.com/PabloFacciano/ampscript-studio-public/blob/main/core/CodeExecutor.ampscript) from the [repository](https://github.com/PabloFacciano/ampscript-studio-public).

To update the code in a next update, you only need to update the previous block.

If you want to always use the latest released version but not worry about updates, use the [CodeExecutorLastRelease.ampscript](https://github.com/PabloFacciano/ampscript-studio-public/blob/main/core/CodeExecutor.ampscript) file although we do not recommend it because the code execution speed takes a little longer than normal (according to tests, ~ 20 extra seconds).

### 👉 Cloudpage Code Resource
Create a new Cloudpage in Web Studio.

Name: AMPScriptStudio-CodeExecutor-Cloudpage

Type: Code Resource

Layout: JSON

Content: `%%=ContentBlockByKey("AMPScriptStudio-CodeExecutor")=%%`

Save and publish the cloudpage.
Copy the generated URL as you will need it in the settings within AMPScript Studio.

Protect this url as you would protect an access password. Don't share it.

## SuperMessages and API usage

The following information corresponds to the billing process of the Salesforce Marketing Cloud platform.

Depending on the contracted version of this platform, you will have a certain number of API calls available to use. This application can use the SFMC API if the credentials are provided.

Additionally, another point is the cost of super messages. Each super message is used to send an email or to open a Cloudpage.

This is an [illustrative cost document](https://www.salesforce.com/content/dam/web/en_us/www/assets/pdf/misc/super-messages-excluding-sms-mms-august172021.pdf) and [here](https://help.salesforce.com/s/articleView?id=sf.mc_overview_data_usage.htm&type=5) you will find a summary of which elements are registered for billing. 

> Currently, Code Resources are not considered or counted as CloudPages impressions.
[Source: Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.mc_overview_data_usage.htm&type=5#:~:text=Currently%2C%20Code%20Resources%20are%20not%20considered%20or%20counted%20as%20CloudPages%20impressions.)

For more information on how these are billed, refer to your contract; or contact your Salesforce Account Executive.
