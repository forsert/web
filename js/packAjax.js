
// ajax({type:"",url:"",function(){}})
 function ajax(opt,fn){
    var xhr=window.XMLHttpRequest?new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            if(xhr.status===200){
                if(fn){
                    fn(xhr.responseText)
                }
            }
        }
    };
     xhr.open(opt.type,opt.url,true);
     xhr.send(null);
 }