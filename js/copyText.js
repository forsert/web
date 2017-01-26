// copyText init(点击元素id, 文本元素id) 
;(function(window){
   function CopyText(){
            this.coord={
                viewW:document.documentElement.clientWidth,
                viewH:document.documentElement.clientHeight
            };
            this.count=true;
            this.tips=null;//提示框
            
        };
        CopyText.prototype.init=function(btn,text){
          this.btnid=document.getElementById(btn);
          this.text=document.getElementById(text);
          var This=this;
          this.judge();
          this.copy();
          this.btnid.onclick=function(e){
              var e=e ||window.event;
              This.copy(e);
              This.coord.disx=e.clientX;
              This.coord.disy=e.clientY;
              This.creaettips();
              This.setTime();
          };
        };
        CopyText.prototype.judge=function(){
            if(this.text.innerHTML){
                this.createinput();
            }
        };
        CopyText.prototype.createinput=function(){
            var innerHTML=this.text.innerHTML;
            this.text=document.createElement("input");
            this.text.type="text";
            this.text.style.cssText="opacity:0;filter:alpha(opacity:0);position:fixed;left:-999900px;z-index:-9";
            this.text.value=innerHTML;
            document.body.appendChild(this.text)
        };
        CopyText.prototype.copy=function(e){
            this.text.select();
            document.execCommand("Copy");
            
        };
        CopyText.prototype.creaettips=function(){
            if(!this.count){return};
            this.tips=document.createElement("p");
            this.tips.style.cssText="position:fixed;background:#000;color:#fff;font-size:14px;line-height:24px;padding:0 5px;left:"+(this.coord.disx+20)+"px;top:"+(this.coord.disy+20)+"px;white-space:nowrap;"
             if(document.execCommand){
                this.tips.innerHTML="复制成功";
               }else{
                 this.tips.innerHTML="复制失败,请手动复制";
               }
             document.body.appendChild(this.tips);
             if(this.tips.offsetLeft+this.tips.offsetWidth>this.coord.viewW){
                this.tips.style.left=this.coord.disx-this.tips.offsetWidth+"px";
             };
             if(this.tips.offsetTop+this.tips.offsetHeight>this.coord.viewH){
               this.tips.style.top=this.coord.disy-this.tips.offsetHeight+"px";
             }
        };
        CopyText.prototype.setTime=function(){
            var This=this;
            This.timer=setTimeout(function(){
                document.body.removeChild(This.tips);
                count=1;
                this.timer=null;
             },2000)
        }
        window.copyText=new CopyText();
})(window)