---
layout: default
title: Salesforce Marketing Cloud · Setup
parent: Setup
has_children: false
nav_order: 1
---

# Setup in Salesforce Marketing Cloud (SFMC)

## Build
La construccion de los componentes en SFMC es realmente sencilla.

En una proxima actualizacion, solo será necesario agregar las Credenciales de API para crear los demas componentes automaticamente.

### API Credentials
Por el momento, este paso es opcional y se recomienda omitirlo.

In Setup, create an [Installed Package](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/install-packages.html).

Then, add an [API Integration](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/create-integration-enhanced.html).

Integration Type: Server-to-Server

Permissions: All

### Data Extension
Para el registro de logs se necesita crear una DataExtension.
Esto se puede realizar en Email Studio o Contact Builder.

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

### Code Snipset
Crear un nuevo bloque de tipo Code Snippet.
Esto se puede realizar en Email Studio o Content Builder.

Name: AMPScriptStudio-CodeExecutor

Customer Key: AMPScriptStudio-CodeExecutor

En el contenido, copiar el codigo mostrado en el archivo ![CodeExecutor.ampscript](https://github.com/PabloFacciano/ampscript-studio-public/blob/main/core/CodeExecutor.ampscript) del [repositorio](https://github.com/PabloFacciano/ampscript-studio-public).

Para actualizar el codigo en una proxima actualizacion, solo debe actualizar el bloque anterior.

Si desea siempre usar la ultima version publicada pero no preocuparse por las actualizaciones, use el archivo [CodeExecutorLastRelease.ampscript](https://github.com/PabloFacciano/ampscript-studio-public/blob/main/core/CodeExecutor.ampscript) aunque no lo recomendamos porque la velocidad de ejecucion del codigo se demora un poco más de lo normal (segun pruebas, ~20 segundos extras).

### Cloudpage Code Resource
Crear una nueva Cloudpage en Web Studio.

Name: AMPScriptStudio-CodeExecutor-Cloudpage

Type: Code Resource

Layout: JSON

Content: `%%=ContentBlockByKey("AMPScriptStudio-CodeExecutor")=%%`

Guarde y publique la cloudpage.
Copie la URL generada ya que la necesitará en la configuración dentro de AMPScript Studio.

Proteja esta url como protejeria una contraseña de acceso. No la comparta.

## SuperMessages and API usage

La informacion siguiente corresponde al proceso de facturacion de la plataforma Salesforce Marketing Cloud.

Dependiendo de la version contratada de esta plataforma, tendrá un determinado numero de llamadas API disponible para usar. Esta aplicacion puede usar la API de SFMC si son proporcionadas las credenciales.

Additionally, another point is the cost of super messages. Each super message is used to send an email or to open a Cloudpage.

This is an [illustrative cost document](https://www.salesforce.com/content/dam/web/en_us/www/assets/pdf/misc/super-messages-excluding-sms-mms-august172021.pdf) and [here](https://help.salesforce.com/s/articleView?id=sf.mc_overview_data_usage.htm&type=5) you will find a summary of which elements are registered for billing. 

> Currently, Code Resources are not considered or counted as CloudPages impressions.
[Source: Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.mc_overview_data_usage.htm&type=5#:~:text=Currently%2C%20Code%20Resources%20are%20not%20considered%20or%20counted%20as%20CloudPages%20impressions.)

For more information on how these are billed, refer to your contract; or contact your Salesforce Account Executive.
