
// ajax({type:"",url:"",function(){}})
 function ajax(opt,fn){
    var xhr=window.XMLHttpRequest?new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            if(xhr.status===200){
                var response=null;
                var type=xhr.getResponseHeader("Content-type");
                if(type.indexOf("xml")!==-1 && xhr.responseXML){
                    response=xhr.responseXML;
                }else(type=="application/json"){
                    response=JSON.parse(xhr.responseText);
                }else{
                    response=xhr.responseText;
                };
                if(fn){
                    fn(response);
                }
            }
        }
    };
     xhr.open(opt.type,opt.url,true);
     xhr.send(null);
 }
