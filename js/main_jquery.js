/* main_jquery.js */
window.addEventListener('load',function(){
// $(document).ready(function(){
    $Screen_w = window.innerWidth;
    $scroll = $(window).scrollTop();

    var topMenu_mall = $(".topMenu > dd").eq(0);    // console.log(topMenu_mall);
    
    var slide_wrap_mainVisual = $(".main_visual .slide_wrap");  // console.log(slide_wrap_mainVisual);
    var slide_mainVisual = slide_wrap_mainVisual.children();    // console.log(slide_mainVisual);
    var lastNum_mainVisual = slide_mainVisual.size()-1;         // console.log(lastNum_mainVisual);

    // resize action
    function content_resize_action(nowWidth){
        // 1105px 이하에서 topMenu>locknlock몰 숨기기
        if (nowWidth <= 1105){
            topMenu_mall.hide();
        }else {
            topMenu_mall.show();
        }

        // content 항상 가운데
        if (nowWidth > 1200){
            // console.log(nowWidth);
            var content = $("#container").children();
            var content_w = Math.min( (nowWidth - 96), 1130);
            var padding = (nowWidth - content_w) / 2;
            content.css({"padding-left":padding+"px","padding-right":padding+"px"});
            $(".Lounge > ul").css({"transform":"translateX("+ padding +")"});
            // console.log(content_w);
        }

        // main visual : slide_wrap width = li ea * $Screen_w
        slide_wrap_mainVisual.css("width",nowWidth*(lastNum_mainVisual+1)+"px");
        slide_mainVisual.css("width",nowWidth+"px");
    }
    
    // scroll action을 위한 scroll값 수집
    var cont = $("#container>div");
    var contArray = [];
    var contentHeight = [];
    var contentTopPos = $(".main_visual").height();
    var contentTop = [contentTopPos];

    function scroll_collection() {
        for (i=0;i<cont.length;i++){// 0content1 ~ 8Now, 9ea
            contArray.push(cont.eq(i));
        }// for
        
        for(i=0;i<contArray.length;i++){
            contentHeight.push( contArray[i].height() );
        }// for
        
        // content top값 확인
        for (i=0;i<contentHeight.length;i++){// content 높이값으로 y좌표값 입력
            contentTopPos += contentHeight[i];
            contentTop.push(contentTopPos);
        }// for

        // console.log(contArray);
        // console.log(contentHeight);
        // console.log(contentTop);
    }
    
    function content_scroll_action(nowScroll){
        for(i=0;i<contArray.length;i++){
            // console.log(contArray.length);
            if(contentTop[i]-500 < nowScroll){
                // console.log(i);console.log(contentTop[i]+"~"+contentTop[i+1]);
                for (k=0;k<=i;k++){
                    contArray[k].addClass("on");
                }
            }// if
        }// for

        // console.log(nowScroll);
        // console.log(contArray);console.log(contArray.length);
        // console.log(contentHeight);
        // console.log(contentTop);
        // console.log(contentTop.length);

    }

    {// 로딩시 기본 적용
        // main_visaul.on / 그 외 컨텐츠 대기
        $(".main_visual").addClass("on");
        $("#container>div").removeClass("on");

        // 화면 가로폭에 따른 action
        content_resize_action($Screen_w);
        // scroll action을 위한 content별 scroll 위치값 수집
        scroll_collection();
        // 스크롤 위치에 따른 action
        content_scroll_action($scroll);
    }

    {// li 순서별로 지연시간 설정
        var NewsLi = $(".News>ul>li");//console.log(NewsLi);
        var LoungeLi = $(".Lounge>ul>li");//console.log(LoungeLi);
        var CareerContactUsLi = $(".CareerContactUs>ul>li");//console.log(CareerContactUsLi);
        var NowLi = $(".Now>ul>li");//console.log(NowLi);

        for (var k=0;k<NewsLi.length;k++){
            NewsLi.eq(k).css({"transition-delay":0.5+k*0.4 +"s"});
        }
        for (var k=0;k<LoungeLi.length;k++){
            LoungeLi.eq(k).css({"transitionDelay":0.5+k*0.4 +"s"});
        }
        for (var k=0;k<CareerContactUsLi.length;k++){
            CareerContactUsLi.eq(k).css({"transition-delay":0.5+k*0.4 +"s"});
        }
        for (var k=0;k<NowLi.length;k++){
            NowLi.eq(k).css({"transition-delay":0.5+k*0.4 +"s"});
        }

    }// li 순서별로 지연시간 설정

    $(window).resize(function(){
        $Screen_w = window.innerWidth;
        $devWidth = $("body").width();
        // console.log($Screen_w);

        content_resize_action($Screen_w);
        scroll_collection();
    });

    $(window).scroll(function(){
        $scroll = $(window).scrollTop();
        // console.log($scroll);

        content_scroll_action($scroll);
    });
    
    {// header_wrap
        var headerWrap_origin_h = 64;
        {// header_wrap hover
            $(".header_wrap").hover(function(){
                $(".header_wrap").addClass("on");
            }, function(){
                if ( $(".srch_wrap").hasClass("on") ){// 검색창이 열린 경우 removeClass 무효
                    return false;
                }else if ( $(".mob").hasClass("on") ){// .mob이 열린 경우 removeClass 무효
                    return false;
                }else{
                    $(".header_wrap").removeClass("on");    
                }
                $(".header_wrap").removeClass("on");
            });
        }

        {// 주메뉴
            $("nav.gnb>ul>li>a").mouseover(function(){
                if ( $(".srch_wrap").hasClass("on") ){return false;}

                var $gnb_H = $(this).next().height() + headerWrap_origin_h;

                $("nav.gnb>ul>li").removeClass("on");
                $(this).parent().addClass("on");
                $(".header_wrap").stop().animate({"height":$gnb_H},500,"linear");
            });
            $("nav.gnb>ul").mouseleave(function(){
                $(".header_wrap").stop().animate({"height":headerWrap_origin_h},500,"linear");
                $("nav.gnb>ul>li").removeClass("on");
            });
        }

        {// 모바일 주메뉴
            var flag_mogGnb = true;    
            $(".mobBtn").click(function(){
                if( flag_mogGnb){
                    // console.log("off->on");
                    $(".mob").addClass("on");
                    $(".mobBtn").addClass("close");
                    $(".mobBtn>a").attr("title","전체메뉴 닫기");
                    $("body").css("overflow-y","hidden");
                    // header
                    $("h1.logo").css("color","#000");
                    $(".header_wrap").addClass("on");
                    $(".btn_srch").addClass("off");  
                    
                    if($Screen_w < 961 && $Screen_w > 719){
                        $(".header_wrap").hide();
                        $(".header_wrap").width($(".mob_gnb").width());
                    }
                    $(".header_wrap").show();
    
                    // flag
                    flag_mogGnb = false;
                }else {
                    // console.log("on->off");
                    $(".mob").removeClass("on");
                    $(".mobBtn").removeClass("close");
                    $(".mobBtn>a").attr("title","전체메뉴 열기");
                    $("body").css("overflow-y","auto");
                    // header
                    $("h1.logo").css("color","#fff");                   
                    $(".btn_srch").removeClass("off");
                    
                    if($Screen_w < 961 && $Screen_w > 719){
                        $(".header_wrap").hide();
                        $(".header_wrap").width("100%");
                    }
                    $(".header_wrap").show();

                    // flag
                    flag_mogGnb = true; 
                }// if~else~
            });//mobBtn.click
    
            // window.resize - mob.on, headerwrap길이
            $(window).resize(function(){
                if($(".mob").hasClass("on")){
                    $(".header_wrap").width($(".mob_gnb").width());
                }
            });
            
            // list_2 show/hide - 미완성, 애니메이션x
            // var mobGnb_list1_h = $(".mob_gnb > .list_1 > li").height(); 
            for (var i=0;i<5;i++){
                $(".mob_gnb > .list_1 > li").eq(i).click(function(){           
                    if($(this).hasClass("open")){// 열린 li.click -> 닫기
                        $(this).removeClass("open");
                    }else{// 닫힌 li.click -> 열기
                        $(".mob_gnb > .list_1 > li").removeClass("open");
                        $(this).addClass("open");
                    }                   
                });// list_1 li.click
            }
        }

        {// topMenu > kor-eng
            $(".topMenu > dd").eq(1).children().click(function(){
                $(this).parent().toggleClass("on"); 
            });
            $(".header_wrap").mouseleave(function(){
                $(".topMenu > dd").eq(1).removeClass("on");
            });
        }

        {// srch_wrap
            var srchWrap_h = $(".srch_wrap").innerHeight(); // console.log(srchWrap_h);

            $(".btn_srch > a").click(function(){// srch_wrap open            
                $(".srch_wrap").addClass("on");
                $(".btn_srch").addClass("off");

                $("dl.topMenu").css("display","none");
                $(".header_wrap").stop().animate({"height":srchWrap_h+headerWrap_origin_h+"px"},400,"linear");

                if($Screen_w < 960){
                    $(".mobBtn").hide();
                }else{
                    $("nav.gnb").css("display","none");
                }
            });// open.click
            $(".btn_srch_close > a").click(function(){// srch_wrap close
                $(".srch_wrap").removeClass("on");
                $(".btn_srch").removeClass("off");

                $(".header_wrap").stop().animate({"height":headerWrap_origin_h+"px"},400,"linear");

                if($Screen_w < 960){
                    $(".mobBtn").show();
                }else{
                    $("nav.gnb").css("display","block");
                    $("dl.topMenu").css("display","block");
                }
            });// close.click
        }        
    }// header_wrap

    {// main_visual
        $(".main_visual .slide_roll li").bind('click focus', function(e){
            e.preventDefault();

            // slide active
            $bnnNum = $(".main_visual .slide_roll li").index(this);
            $(".slide").removeClass("active");
            $(".slide").eq($bnnNum).addClass("active");

            // slide_roll li on
            $(".main_visual .slide_roll li").removeClass("on");
            $(this).addClass("on");

            // slide_wrap animate
            $(".main_visual .slide_wrap").stop().animate({"left":-($bnnNum*$Screen_w)+"px"},400,"swing");
        });
    }// main_visual

    {// Lounge
        var $PageNum_Lounge = 0;
        var $lastNum_Lounge = $(".Lounge>ul>li").size()-1;
        var $LoungePage_w = $(".Lounge>ul>li").width();
        var $nextBtn_Lounge = $(".LoungePage .next");
        var $prevBtn_Lounge = $(".LoungePage .prev");

        // page에 따른 btn 디테일
        function btn_Lounge(pageNum,lastNum,nextBtn,prevBtn){
            console.log(pageNum +" / "+ lastNum);
            if (pageNum == 0) {
                nextBtn.css({"backgroundImage":"url(../images/btn_scroll_next_on.png)"});
                prevBtn.css({"backgroundImage":"url(../images/btn_scroll_prev.png)"});
            } else if (pageNum == lastNum) {
                nextBtn.css({"backgroundImage":"url(../images/btn_scroll_next.png)"});
                prevBtn.css({"backgroundImage":"url(../images/btn_scroll_prev_on.png)"});
            } else {
                nextBtn.css({"backgroundImage":"url(../images/btn_scroll_next_on.png)"});
                prevBtn.css({"backgroundImage":"url(../images/btn_scroll_prev_on.png)"});
            }
        }

        $nextBtn_Lounge.click(function(e){
            e.preventDefault();
            $PageNum_Lounge++;
            if($PageNum_Lounge>$lastNum_Lounge){$PageNum_Lounge=0;}

            $(".Lounge>ul").stop().animate({"left":$PageNum_Lounge*(-$LoungePage_w-60)},300,"swing");
            $(".LoungePageBar span").css({"transform":"scaleX("+ (($PageNum_Lounge+1) / 3) +")"});
            $(".LoungePage .viewPage").text($PageNum_Lounge+1);
            // console.log("num : "+$PageNum_Lounge+", left : "+$PageNum_Lounge*(-$LoungePage_w-60));

            btn_Lounge($PageNum_Lounge,$lastNum_Lounge,$nextBtn_Lounge,$prevBtn_Lounge);
        });
        
        $prevBtn_Lounge.click(function(e){
            e.preventDefault();
            $PageNum_Lounge--;
            if($PageNum_Lounge<0){$PageNum_Lounge=$lastNum_Lounge;}

            $(".Lounge>ul").stop().animate({"left":$PageNum_Lounge*(-$LoungePage_w-60)},300,"swing");
            $(".LoungePageBar span").css({"transform":"scaleX("+ (($PageNum_Lounge+1) / 3) +")"});
            $(".LoungePage .viewPage").text($PageNum_Lounge+1);

            console.log($PageNum_Lounge +","+(($PageNum_Lounge+1) / 3));
            // console.log("num : "+$PageNum_Lounge+", left : "+$PageNum_Lounge*(-$LoungePage_w-60));

            btn_Lounge($PageNum_Lounge,$lastNum_Lounge,$nextBtn_Lounge,$prevBtn_Lounge);
        });
    }// Lounge

    {// footer
        {// topBtn
            $(".btn_top").click(function(e){
                e.preventDefault();
                $("html,body").stop().animate({"scrollTop":"0"},1400,"swing");
            });
        }

        {// family site
            $(".family_site").click(function(){
                $(".family_site").toggleClass("on"); 
                $(".family_site .btnArrow").toggleClass("on"); 

                // 기존에 Address가 열려있다면 닫기
                if( $(".copyright span").hasClass("on")){
                    $(".copyright span").removeClass("on");
                    $(".copyright address").stop().animate({"height":"0","padding":"0 20px"},400,"linear");
                }
            });
        }

        {// sitemap list_2 open/close
            var Sitemap_li_on = [];
            $(".sitemap > ul > li").click(function(e){
                e.preventDefault();
                
                // 현재 열린 ul 갯수 확인 
                Sitemap_li_on =  $(".sitemap > ul > li.on");
                var li_on_ea = Sitemap_li_on.size();
                // console.log(li_on_ea);

                // 열린 ul 갯수 확인 후 toggleClass on
                if(li_on_ea == 0){// 초기상태일때 클릭한 li.on
                    $(this).addClass("on");
                }else if($(this).hasClass("on")){// 클릭한 li가 이미 .on일 때
                    $(this).removeClass("on");
                }else {// 다른 li가 .on일때
                    $(".sitemap > ul > li.on").removeClass("on");
                    $(this).addClass("on");
                }    
            }); 
        }

        {// copyright의 버튼 클릭시 address open
            $(".copyright span").click(function(){                
                $(this).toggleClass("on");
                $(".copyright .btnArrow").toggleClass("on");

                // address open
                if($(this).hasClass("on")){//open
                    $(".copyright address").stop().animate({"height":"88.8px","padding":"15px 20px"},400,"linear");
                }else{//close
                    $(".copyright address").stop().animate({"height":"0","padding":"0 20px"},400,"linear");
                }// if~ else~ 
                
                // 기존에 family_site가 열려있다면 닫기
                if($(".family_site").hasClass("on")){
                    $(".family_site").removeClass("on");
                    $(".family_site .btnArrow").removeClass("on");
                }
            });
        }
    }// footer

});//document.ready
