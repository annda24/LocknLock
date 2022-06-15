// header.js
window.addEventListener('load',function(){
    {// header_wrap
        var header_wrap = document.querySelector(".header_wrap");
        var srch_wrap = document.querySelector(".srch_wrap");
        var mob = document.querySelector(".mob");
        
        header_wrap.addEventListener('mouseover',function(){
            this.classList.add("on");
        });
        header_wrap.addEventListener('mouseleave',function(){
            if(srch_wrap.classList.contains("on") || mob.classList.contains("on")){
                return false;// 검색창/mob이 열린경우 remove"on"무효
            }
            header_wrap.classList.remove("on");
        });
    }

    const headerWrap_origin_h = 64;
    {// 주메뉴                                           ;        
        var headerWrap = document.querySelector(".header_wrap");
        var gnb_ul = document.querySelector("nav.gnb>ul");
        var gnb_li = document.querySelectorAll("nav.gnb>ul>li");
        var gnb_a = document.querySelectorAll("nav.gnb>ul>li>a");

        gnb_a.forEach(function(gnbLink){
            gnbLink.addEventListener('mouseover',function(){
                if(srch_wrap.classList.contains("on")){return false;}
                var div = this.nextElementSibling;
                var div_height = div.offsetHeight + headerWrap_origin_h;

                gnbLink.classList.remove("on");
                console.log(this.parent);
                this.parentElement.classList.add("on");
                headerWrap.style.height = div_height;
            });
            gnb_ul.addEventListener('mouseleave',function(){
                headerWrap.style.height = headerWrap_origin_h;
                gnbLink.classList.remove("on");
            });
        });
    }
});