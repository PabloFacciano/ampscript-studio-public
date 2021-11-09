---
layout: default
title: Settings
parent: Functions
nav_order: 1
has_children: false
---

# Settings

![Settings in AMPScript Studio](https://i.ibb.co/QkfbcF3/image.png)

## Run As

When the AMPScript or SSJS is run in SFMC, there is something called *[Execution Context](https://help.salesforce.com/s/articleView?id=sf.mc_es_available_personalization_strings.htm&type=5)*.

There are several types of *Execution Contexts*. A better explanation obtained from [ampscript.guide](https://ampscript.guide/system-strings/):

The result of `%%_messagecontext%%` would be:

<dl>
  <dt>SEND</dt>
  <dd>an email that is sent to a Subscriber.</dd>
  <dt>PREVIEW</dt>
  <dd>an email that is previewed within the email editor.</dd>
  <dt>VAWP</dt>
  <dd>an email opened as “view as web page” (from a view_email_url link in an email).</dd>
  <dt>FTAF</dt>
  <dd>an email that is sent as a “Forward to a Friend” message.</dd>
  <dt>LANDINGPAGE</dt>
  <dd>content is viewed on a landing page, microsite page or CloudPage code resource.</dd>
  <dt>VALIDATION</dt>
  <dd>email is validated using the validation option in Marketing Cloud.</dd>
  <dt>LINKRESOLUTION</dt>
  <dd>a URL in an email that is resolved as a click-through link.</dd>
  <dt>SMS</dt>
  <dd>an SMS message that is sent to a Subscriber.</dd>
  <dt>SOCIAL</dt>
  <dd>email content that is shared using the Social Forward feature.</dd>
</dl>

We must bear in mind that when we execute the code in a Code Editor, it will be executed in a Cloudpage, therefore the execution context will always be *LANDINGPAGE*.

Also, it may happen that some functions are not available outside of the context of a send. For example, the function *[InsertDE()](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-programmatic-content.meta/mc-programmatic-content/insertde.htm)* from AMPScript only works during email sending. In the case of Cloudpages or SMS, you should use *[InsertData()](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-programmatic-content.meta/mc-programmatic-content/insertdata.htm)*.

## Query Param

This is the addition to the url of the cloudpage, after the `?`.

For example, `qs=RWFzdGVyRWdnSW5BTVBTY3JpcHRTdHVkaW9Eb2Nz&customParam=123` is a valid value.

The url where the page opens would be like this: `https://yourWorkspaceCloudpage.com?qs=RWFzdGVyRWdnSW5BTVBTY3JpcHRTdHVkaW9Eb2Nz&customParam=123`.

This allows you to use functions like [RequestParameter()](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-programmatic-content.meta/mc-programmatic-content/requestparameter.htm) within your code.

![Edit Query Param](https://i.ibb.co/n7QmWtx/image.png)

## Live Preview

This functionality serves to execute the code automatically.
It can be turned on or off in [Settings > Code Editor](https://ampscript.netlify.app/#home).
The default value and the recommended one is `Only HTML`.

<dl>
  <dt>Disabled</dt>
  <dd>When selected, you will have a button to execute the code.</dd>
  <dt>Only HTML</dt>
  <dd>Editing and previewing in real time. (just HTML and CSS).<br>You will have a button to execute the AMPScript/SSJS, because it won't run automatically.</dd>
  <dt>Near real-time</dt>
  <dd>All the code (HTML/CSS and AMPScript/SSJS) will execute after a few seconds after you stop typing.</dd>
</dl>

