<script runat=server>
var ampscript_studio__result = {};
function ampscript_studio__getCurrentDate(){
 return new Date().toLocaleString()
}
ampscript_studio__result.initdate = ampscript_studio__getCurrentDate();
  
Platform.Load("core","1");
HTTPHeader.SetValue("Access-Control-Allow-Methods","GET, POST, OPTIONS");
HTTPHeader.SetValue("Access-Control-Allow-Origin","*");
HTTPHeader.SetValue("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");  

function ampscript_studio__clearDE(externalkey){
  var prox = new Script.Util.WSProxy();
  return data = prox.performItem("DataExtension", { CustomerKey: externalkey }, "ClearData");
}  
function ampscript_studio__ampscript(code) {
    var ampBlock = '\%\%[' + code + ']\%\%';
    Platform.Function.TreatAsContent(ampBlock);
    return Variable.GetValue('@response');
};

//ampscript_studio__clearDE("ampscript_studio__run_history_lines");

var ampscript_studio__jsonpost = Platform.Request.GetPostData();
var ampscript_studio__json = Platform.Function.ParseJSON(ampscript_studio__jsonpost);

ampscript_studio__result.startdate = ampscript_studio__getCurrentDate();
try {
  ampscript_studio__result.result = Platform.Function.TreatAsContent(ampscript_studio__json.code);
  ampscript_studio__result.httpcode = 200;
} catch (e) {
  ampscript_studio__result.error = e;
  ampscript_studio__result.httpcode = 500;
  
}
  

var logsDE = DataExtension.Init("ampscript_studio__run_history_lines");
var logsFilter = {Property:"ExecutionID",SimpleOperator:"equals",Value:ampscript_studio__json.executionId};
var logs = logsDE.Rows.Retrieve(logsFilter);  
ampscript_studio__result.logs = logs;

ampscript_studio__result.enddate = ampscript_studio__getCurrentDate();
  
// HTTPHeader.SetValue("Server-Timing",'db;dur=123;desc="Database", tmpl;dur=56;desc="Template processing"');
Platform.Response.Write(Platform.Function.Stringify(ampscript_studio__result));
</script>