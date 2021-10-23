## What is AMPScript Studio?
This is a web application that communicates with Salesforce Marketing Cloud through standard and custom APIs.

The Code Editor allows executing AMPScript and Server-Side JavaScript (SSJS) code without being logged into the platform thanks to the use of a custom cloudpage for this process.

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

## Technology Stack

### Front End
- [HTML](https://developer.mozilla.org/es/docs/Web/HTML), [CSS](https://developer.mozilla.org/es/docs/Web/CSS), [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [Vue 3](https://v3.vuejs.org/), The Progressive
JavaScript Framework
- [Vuex 4](https://next.vuex.vuejs.org/), state management pattern + library for Vue.js applications
- [Vue Router 4](https://next.router.vuejs.org/), The official router for Vue.js.

### Back End / Infra
- [Supabase](https://supabase.io/), The Open Source
Firebase Alternative, for Auth & Database
- [Netlify](https://www.netlify.com/), Build, deploy,
& scale modern web projects, for hosting

### Others
- [Uptime Robot](https://stats.uptimerobot.com/Dx2vYioj0D), The world's leading uptime monitoring service.

