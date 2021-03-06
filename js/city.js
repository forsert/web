 function Address(){
        this.bank='http://www.huanghanlian.com/data_location/list.json';
        this.shi=0;
        this.qu=0;
        this.ip=null;
        this.load=0;
        this.default={
            province:"安徽",
            town:"芜湖"
            
        };
    };
    Address.prototype={
        init:function(opt){
            var This=this;
            this.el=document.getElementById(opt.id).getElementsByTagName('select');
            extend(this.default,opt);
            ajax({type:"get",url:this.bank},function(msg){
                This.province(JSON.parse(msg))
            });
            this.change();
        },
        province:function(msg){
            this.msg=msg;
            var html="",
                reg=new RegExp(this.default.province),
                content=this.msg;
              this.el[0].innerHTML="";  
            for(var i=0,j=content.length;i<j;i++){
                if(reg.test(content[i].name)){
                    this.el[0].innerHTML="<option index="+i+">"+content[i].name+"</option>";
                    this.shi=i;
                }else{
                    html+="<option index="+i+">"+content[i].name+"</option>"
                }
            };
            this.el[0].innerHTML+=html;
            this.city();
        },
        city:function(){
            this.el[1].innerHTML="";
            var html="",
                reg=new RegExp(this.default.town),
                content=this.msg[this.shi].city;
            for(var i=0,j=content.length;i<j;i++){
                if(reg.test(content[i].name)){
                    this.el[1].innerHTML="<option index="+i+">"+content[i].name+"</option>";
                    this.qu=i;
                }else{
                    html+="<option index="+i+">"+content[i].name+"</option>"
                }
            };
            this.el[1].innerHTML+=html;
            this.region();
        },
        region:function(){
            this.el[2].innerHTML="";
            var html="",
            content=this.msg[this.shi].city[this.qu].area;
            for(var i=0,j=content.length;i<j;i++){
                html+="<option index="+i+">"+content[i]+"</option>";
            };
            this.el[2].innerHTML=html;
                        
        },
        change:function(){
            var This=this;
            this.el[0].onchange=function(){
                This.shi=this.options[this.options.selectedIndex].getAttribute("index");
                This.qu=0;
                This.city()
            };
            this.el[1].onchange=function(){
                This.qu=this.options[this.options.selectedIndex].getAttribute("index");
                This.region();
            }
        }
        
    };
    function extend(obj1,obj2){
        for(var attr in obj2){
            obj1[attr]=obj2[attr]
        }
    };
    
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