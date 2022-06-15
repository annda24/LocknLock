/* main_vanila_js.js */
window.addEventListener('load',function(){
    var Screen_w = window.innerWidth;
    var scroll = window.scrollY;
    var content = document.querySelectorAll("#container>div");

    // RESIZE FUNCTION
    var topMenu_mall = document.querySelector(".topMenu>dd:nth-of-type(1)");
    var slide_wrap_mainVisual = document.querySelector(".main_visual .slide_wrap");
    var slide_mainVisual = document.querySelectorAll(".main_visual .slide");

    // resize action
    function content_resize_action(nowWidth){
        // 1105px 이하에서 topMenu>locknlock몰 숨기기
        if(nowWidth <= 1105){
            topMenu_mall.style.display = "none";
        }else{
            topMenu_mall.style.display = "block";
        }

        // content 항상 가운데
        if (nowWidth > 1200){
            var content_w = Math.min( (nowWidth - 96), 1130);
            var padding = (nowWidth - content_w) / 2;
            content.forEach(function(item){
                item.style.paddingLeft = padding+"px";
                item.style.paddingRight = padding+"px";
            });
        }// if~

        // main visual : slide_wrap width = li ea * Screen_w
        slide_wrap_mainVisual.style.width = nowWidth*(lastNum_mainVisual+1)+"px";
        slide_mainVisual.forEach(function(item){
            item.style.width = nowWidth+"px";
        });
    }
  
    // scroll action을 위한 content별 scroll 위치값 수집
    var contArray = [];
    var contentHeight = [];
    var contentTopPos = document.querySelector(".main_visual").offsetHeight;
    var contentTop = [contentTopPos];
    function scroll_collection(){
        // content element, content1:0 ~ Now:8, 9ea
        content.forEach(function(item){// 
            contArray.push(item);
        });

        // content height, 각각 content의 높이
        contArray.forEach(function(item){// 
            contentHeight.push(item.offsetHeight);
        });

        // content 상단 scrollTop
        for (i=0;i<contArray.length;i++){
            contentTopPos += contentHeight[i];
            contentTop.push(contentTopPos);
        }

        // console.log(contArray);
        // console.log(contentHeight);
        // console.log(contentTop);
    }

    // scroll action
    function content_scroll_action(nowScroll){
        // 스크롤 위치에 따라 .on
        for (var i=0;i<contArray.length;i++){
            if(contentTop[i]-500 < nowScroll){
                contArray[i].classList.add("on");
            }
        }
    }

    {// 로딩시 기본 적용 
        // main_visaul.on / 그 외 컨텐츠 대기
        document.querySelector(".main_visual").classList.add("on");
        document.querySelector("#container>div").classList.remove("on");
        // 화면 가로폭에 따른 action
        content_resize_action(Screen_w);
        // scroll action을 위한 content별 scroll 위치값 수집
        scroll_collection();
        // 스크롤 위치에 따른 action
        content_scroll_action(scroll);
    }

    {// li 순서별로 지연시간 설정
        var NewsLi = document.querySelectorAll(".News>ul>li");//console.log(NewsLi);
        var LoungeLi = document.querySelectorAll(".Lounge>ul>li");//console.log(LoungeLi);
        var CareerContactUsLi = document.querySelectorAll(".CareerContactUs>ul>li");//console.log(CareerContactUsLi);
        var NowLi = document.querySelectorAll(".Now>ul>li");//console.log(NowLi);

        for (var k=0;k<NewsLi.length;k++){
            NewsLi[k].style.transitionDelay = 0.5+k*0.4 +"s";
        }
        for (var k=0;k<LoungeLi.length;k++){
            LoungeLi[k].style.transitionDelay = 0.5+k*0.4 +"s";
        }
        for (var k=0;k<CareerContactUsLi.length;k++){
            CareerContactUsLi[k].style.transitionDelay = 0.5+k*0.4 +"s";
        }
        for (var k=0;k<NowLi.length;k++){
            NowLi[k].style.transitionDelay = 0.5+k*0.4 +"s";
        }
    }

    window.addEventListener('resize', function(){
        var Screen_w = window.innerWidth;       // console.log(Screen_w);
        content_resize_action(Screen_w);
    });
    window.addEventListener('scroll', function(){
        var scroll = window.scrollY;            // console.log(scroll);
        content_scroll_action(scroll);
    });

    {// header_wrap
        var headerWrap = document.querySelector(".header_wrap");
        var srch_wrap = document.querySelector(".srch_wrap");
        var mob = document.querySelector(".mob");

        {// header_wrap mouseover/mouseleave
            headerWrap.addEventListener('mouseover',function(){
                this.classList.add("on");
            });
            headerWrap.addEventListener('mouseleave',function(){
                if(srch_wrap.classList.contains("on") || mob.classList.contains("on")){
                    // 검색창/mob 가 열린경우 remove"on"무효
                    return false;
                }else{
                    headerWrap.classList.remove("on");
                }
                
                // topMenu kor-eng 닫기
                lang.classList.remove("on");
            });
        }

        const headerWrap_origin_h = 64;
        {// 주메뉴
            var gnb_ul = document.querySelector("nav.gnb>ul");
            var gnb_li = document.querySelectorAll("nav.gnb>ul>li");
            var gnb_a = document.querySelectorAll("nav.gnb>ul>li>a");
    
            gnb_a.forEach(function(gnbLink){
                gnbLink.addEventListener('mouseover',function(){
                    // 1. 검색창이 열린 경우 실행X
                    if(srch_wrap.classList.contains("on")){return false;}
    
                    // 2. 모든 li remove.on
                    gnb_li.forEach(function(gnbLi){
                        gnbLi.classList.remove("on");
                    });
                    
                    // 3. 선택한 li만 add.on
                    this.parentElement.classList.add("on"); //li
                    
                    // 4. headerWrap height
                    var div = this.nextElementSibling;
                    var div_h = window.getComputedStyle(div).height;
                    var div_height = Number(div_h.substring(0,div_h.length-2))+headerWrap_origin_h;
                    // console.log(div_height);
                    headerWrap.style.height = div_height+"px";
                });
                gnb_ul.addEventListener('mouseleave',function(){
                    gnb_li.forEach(function(gnbLi){
                        gnbLi.classList.remove("on");
                    });
    
                    headerWrap.style.height = headerWrap_origin_h;
                });
            });
        }
    
        {// 모바일 주메뉴
            var flag_mogGnb = true;

            var mobBtn = document.querySelector(".mobBtn");
            var mobBtn_a = mobBtn.querySelector("a");
            var logo = document.querySelector("h1.logo");
            var mobGnb_w = window.getComputedStyle(document.querySelector(".mob_gnb")).width;
    
            // 주메뉴 on/off
            mobBtn.addEventListener('click',function(){
                if(flag_mogGnb){//off->on
                    mob.classList.add("on");
                    mobBtn.classList.add("close");
                    mobBtn_a.setAttribute("title","전체메뉴 닫기");
                    document.body.style.overflowY = "hidden";
    
                    logo.style.color = "#000";
                    headerWrap.classList.add("on");
                    btn_srch.classList.add("off");
    
                    if (Screen_w < 961 && Screen_w > 719) {
                        headerWrap.style.display = "none";
                        headerWrap.style.width = mobGnb_w+"px";
                    }
                    headerWrap.style.display = "block";
    
                    flag_mogGnb = false;
                }else {// on->off
                    mob.classList.remove("on");
                    mobBtn.classList.remove("close");
                    mobBtn_a.setAttribute("title","전체메뉴 열기");
                    document.body.style.overflowY = "auto";
    
                    logo.style.color = "#fff";
                    btn_srch.classList.remove("off");
    
                    if (Screen_w < 961 && Screen_w > 719) {
                        headerWrap.style.display = "none";
                        headerWrap.style.width = "100%";
                    }
                    headerWrap.style.display = "block";
    
                    flag_mogGnb = true;
                }
            });
    
            // window.resize - mob.on, headerwrap길이
            window.addEventListener('resize',function(){
                if (mob.classList.contains("on")){
                    headerWrap.style.widht = mobGnb_w+"px";
                }
            });
    
            // list1 클릭 event -> li.open/close
            document.querySelectorAll(".mob_gnb > .list_1 > li").forEach(function(item){
                item.addEventListener('click',function(e){
                    e.preventDefault();
    
                    // 현재 열린 ul 갯수 확인
                    mobGnb_li_on = document.querySelectorAll(".mob_gnb > .list_1 > li.open"); // console.log(mobGnb_li_on);
                    mobGnb_li_on_ea = mobGnb_li_on.length;
    
                    if (mobGnb_li_on_ea == 0){
                        item.classList.add("open");
                    }else if (item.classList.contains("open")){
                        item.classList.remove("open");
                    }else {
                        mobGnb_li_on.forEach(function(open_li){
                            open_li.classList.remove("open");
                            item.classList.add("open");
                        });
                    }
                });
            });
        }

        {// topMenu > kor-eng
            var lang = document.querySelector(".topMenu>dd:nth-of-type(2)");
            lang.addEventListener('click',function(){
                lang.classList.toggle("on");
            });
        }
    
        {// srch_wrap
            var btn_srch = document.querySelector(".btn_srch");
            var btn_srch_close = document.querySelector(".btn_srch_close");
            var srchWrap = document.querySelector(".srch_wrap");
            
            btn_srch.querySelector("a").addEventListener('click',function(){
                srchWrap.classList.add("on");
                btn_srch.classList.add("off");
                
                var srchWrap_h = srchWrap.clientHeight;     // console.log(srchWrap_h);
                headerWrap.style.height = srchWrap_h+"px";
                headerWrap.classList.add("on");
                document.querySelector("dl.topMenu").style.display = "none";
    
                if(Screen_w < 960){
                    // 960px 이하 -> .mobBtn none
                    mobBtn.style.display = "none";
                }else{
                    // 960px 초과 -> nav.gnb none
                    document.querySelector("nav.gnb").style.display = "none";
                }
            });
    
            btn_srch_close.querySelector("a").addEventListener('click',function(){
                srchWrap.classList.remove("on");
                btn_srch.classList.remove("off");
    
                headerWrap.style.height = headerWrap_origin_h+"px";
                headerWrap.classList.remove("on");
    
                if(Screen_w < 960){
                    // 960px 이하 -> .mobBtn block
                    mobBtn.style.display = "block";
                }else{
                    // 960px 초과 -> nav.gnb, .topMenu block
                    document.querySelector("nav.gnb").style.display = "block";
                    document.querySelector("dl.topMenu").style.display = "block";
                }
            });
        }
    }

    {// main visual
        var slide_wrap_mainVisual = document.querySelector(".main_visual .slide_wrap");
        var slide_mainVisual = document.querySelectorAll(".main_visual .slide");
        var lastNum_mainVisual = slide_mainVisual.length-1; // 3개, 0~2;
        
        // slide_wrap width = li ea * Screen_w -> 로딩시 기본 적용
        slide_wrap_mainVisual.style.width = Screen_w*(lastNum_mainVisual+1)+"px";
        slide_mainVisual.forEach(function(item){
            item.style.width=Screen_w+"px";
        });
        
        // slide_roll li 클릭 event
        var mainRoll = document.querySelectorAll(".main_visual .slide_roll li");
        mainRoll.forEach(function(item){
            function RollAction(clickRoll, slideWrap){
                Roll_ul = clickRoll.parentElement;                       //연결된 엘리먼트의 부모, ul
                Roll_li_all = Roll_ul.querySelectorAll("li");       //부모 엘리먼트의 자식 엘리먼트들, li
                bnnNum = Array.from(Roll_li_all).indexOf(clickRoll);     //연결된 엘리먼트의 인덱스
                slide = slideWrap.querySelectorAll("li");
                
                console.log(Roll_ul);               //.slide_roll ul
                console.log(Roll_li_all);           //.slide_roll ul li = mainRoll과 동일
                console.log(bnnNum);

                // 페이지에 따른 roll li.on
                Roll_li_all.forEach(function(clickRoll){
                    clickRoll.classList.remove("on");
                });
                clickRoll.classList.add("on");
    

                // slide animate
                slideWrap.animate([
                    {left:-(bnnNum*Screen_w)+"px"}
                ],{
                    duration:300,
                    fill:"forwards"
                });
                
                // slide.active
                slide.forEach(function(slide){
                    slide.classList.remove("active");
                });
                slide[bnnNum].classList.add("active");
            }

            item.addEventListener('click',function(e){
                e.preventDefault();
                RollAction(item,slide_wrap_mainVisual);
            });

            // item.addEventListener('click',RollAction(item));
        });
    }

    {// Lounge
        // next & prev
        next_Lounge = document.querySelector(".LoungePage li a.next");
        prev_Lounge = document.querySelector(".LoungePage li a.prev");

        slide_Lounge = document.querySelectorAll(".Lounge>ul>li");                          // console.log(slide_Lounge);
        slide_wrap_Lounge = document.querySelector(".Lounge>ul");                           // console.log(slide_wrap_Lounge);
        
        slide_w = window.getComputedStyle(document.querySelector(".Lounge>ul>li")).width;   // console.log(slide_w);
        slide_w_Lounge = Number(slide_w.substr(0,slide_w.length-2))+60;                     // console.log(slide_w_Lounge);

        viewPage_Lounge = document.querySelector(".LoungePage li.viewPage");
        pageBar_Lounge = document.querySelector(".LoungePageBar>span");

        slide_wrap_left = 0+"px";
        slide_wrap_left_Lounge = Number(slide_wrap_left.substr(0,slide_wrap_left.length-2));
        pageNum_Lounge = 0;
        lastNum_Lounge = slide_Lounge.length-1;                                             // console.log(lastNum_Lounge);  // 0~2번, 3개

        function btn_Lounge(pageNum,nextBtn,prevBtn){
            if(pageNum == 0){
                nextBtn.style.backgroundImage = "url(../images/btn_scroll_next_on.png)";
                prevBtn.style.backgroundImage = "url(../images/btn_scroll_prev.png)";
            }else if (pageNum == lastNum_Lounge){
                nextBtn.style.backgroundImage = "url(../images/btn_scroll_next.png)";
                prevBtn.style.backgroundImage = "url(../images/btn_scroll_prev_on.png)";
            }else{
                nextBtn.style.backgroundImage = "url(../images/btn_scroll_next_on.png)";
                prevBtn.style.backgroundImage = "url(../images/btn_scroll_prev_on.png)";
            }
        }

        next_Lounge.addEventListener('click',function(e){
            // 1. 링크X
            e.preventDefault();

            // 2. pageNum 변경
            pageNum_Lounge++;
            if(pageNum_Lounge > lastNum_Lounge){pageNum_Lounge = 0} console.log(pageNum_Lounge);
            viewPage_Lounge.innerText = pageNum_Lounge+1;

            // 3. slide animate
            slide_wrap_Lounge.animate([
                {left:slide_wrap_left_Lounge - slide_w_Lounge +"px"}
            ],{
                duration:300,
                fill:"forwards"
            });
            slide_wrap_left_Lounge -= slide_w_Lounge;

            // 3.1 last->first에서 animate
            if(pageNum_Lounge == 0){
                slide_wrap_Lounge.animate([
                    {left:"0px"}
                ],{
                    duration:300,
                    fill:"forwards"
                });
                slide_wrap_left_Lounge = 0;
            }

            // 4. pagebar scaleX
            pageBar_Lounge.style.transform = "scaleX("+ ((pageNum_Lounge+1) / 3) +")";

            // 5. prev/next button on/off
            btn_Lounge(pageNum_Lounge,next_Lounge,prev_Lounge);

        });
        prev_Lounge.addEventListener('click',function(e){
            // 1. 링크X
            e.preventDefault();

            // 2. pageNum 변경
            pageNum_Lounge--;
            if(pageNum_Lounge < 0){pageNum_Lounge = lastNum_Lounge} console.log(pageNum_Lounge);
            viewPage_Lounge.innerText = pageNum_Lounge+1;

            // 3. slide animate
            slide_wrap_Lounge.animate([
                {left:slide_wrap_left_Lounge + slide_w_Lounge +"px"}
            ],{
                duration:300,
                fill:"forwards"
            });
            slide_wrap_left_Lounge += slide_w_Lounge;

            // 3.1 first->last에서 animate
            if(pageNum_Lounge == lastNum_Lounge){
                slide_wrap_Lounge.animate([
                    {left:(-lastNum_Lounge)*slide_w_Lounge +"px"}
                ],{
                    duration:300,
                    fill:"forwards"
                });
                slide_wrap_left_Lounge = (-lastNum_Lounge)*slide_w_Lounge;
            }

            // 4. pagebar scaleX
            pageBar_Lounge.style.transform = "scaleX("+ ((pageNum_Lounge+1) / 3) +")";

            // 5. prev/next button on/off
            btn_Lounge(pageNum_Lounge,next_Lounge,prev_Lounge);
        });
    }

    {// footer
        function click_footer(item){
            item.classList.toggle("on");
            item.querySelector(".btnArrow").classList.toggle("on");
        }

        {// topBtn
            btn_top = document.querySelectorAll(".btn_top");
            btn_top.forEach(function(item){
                item.addEventListener('click',function(e){
                    e.preventDefault();
                    window.scroll({left:0,top:0,behavior:'smooth'});
                });
            });
        }

        {// family site
            familySite_title = document.querySelectorAll(".family_site");

            // family site on/off 공통사항
            familySite_title.forEach(function(item){
                item.addEventListener('click',function(){
                    click_footer(this);
    
                    // @media ~ 959px 일 때 family site toggle -> 스크롤 맨 밑으로(작동안됨), copyright-address와 동일
                    if (Screen_w >= 959){
                        console.log(document.body.scrollHeight);
                        window.scrollTo(0,document.body.scrollHeight);
                    }
                });
            });
            

        }

        {// sitemap list_2 open/close
            sitemap_li_on = [];
            document.querySelectorAll("footer>#mob>.sitemap>ul>li").forEach(function(item){
                item.addEventListener('click',function(e){
                    e.preventDefault();

                    // 현재 열린 ul 갯수 확인
                    sitemap_li_on = document.querySelectorAll("footer>#mob>.sitemap>ul>li.on"); // console.log(sitemap_li_on);
                    li_on_ea = sitemap_li_on.length;

                    if (li_on_ea == 0){
                        item.classList.add("on");
                    }else if (item.classList.contains("on")){
                        item.classList.remove("on");
                    }else {
                        sitemap_li_on.forEach(function(open_li){
                            open_li.classList.remove("on");
                            item.classList.add("on");
                        });
                    }
                });
            });  
        }

        {// copyright의 버튼 클릭시 address open
            var copyright_footer = document.querySelector("footer>#mob>.copyright>span");   // console.log(copyright_footer);
            var address_footer = document.querySelector("footer>#mob>.copyright>address");  // console.log(address_footer);

            copyright_footer.addEventListener('click',function(){
                // copyrihgt on/off
                click_footer(this);

                // address on/off
                if(this.classList.contains("on")){
                    address_footer.animate([
                        {height:"88.8px",padding:"15px 20px"}
                    ],{
                        duration:400,
                        fill:"forwards"
                    });
                }else{
                    address_footer.animate([
                        {height:"0",padding:"0 20px"}
                    ],{
                        duration:400,
                        fill:"forwards"
                    });
                }
            });
        }

    }
});

