var dice=function(o){return Math.floor(Math.random()*o)},coinToss=function(){return dice(2)},sample=function(){return arguments[dice(arguments.length)]},_console={log:function(){}},swipe$dom,bindEvents=function(o,n,e,i,t,s){swipe$dom=$(".wrapper").swipeCross().on("swipeup",function(){_console.log("swipeup"),o()}).on("swiperight",function(){_console.log("swiperight"),i()}).on("swipeleft",function(){_console.log("swipeleft"),e()}).on("swipedown",function(){_console.log("swipedown"),n()}).on("swipecancel",function(){_console.log("swipecancel")}),$(document).arrowkeys().on("upkey",function(){_console.log("upkey"),o()}).on("rightkey",function(){_console.log("rightkey"),i()}).on("leftkey",function(){_console.log("leftkey"),e()}).on("downkey",function(){_console.log("downkey"),n()}).on("score",function(o,n){console.log("score"),s(o,n)}),$(".reset").on("click",function(){console.log("=== reset ==="),unbindEvents(),t()})},unbindEvents=function(){swipe$dom.swipeCrossUnbind().off("swipeup").off("swipedown").off("swipeleft").off("swiperight").off("swipecancel"),$(document).arrowkeysUnbind().off("upkey").off("rightkey").off("leftkey").off("downkey").off("score"),$(".reset").off("click")},wait=function(o){return new Promise(function(n){setTimeout(n,o)})},loadImage=function(o,n,e){return new Promise(function(i){var t=$("<img />").attr("src",o).addClass(n).appendTo(e).on("load",function(){i(t)})})};$.fn.animation=function(o){return this.css("-webkit-animation","").reflow().css("-webkit-animation",o),this},$.fn.reflow=function(){return this[0].offsetWidth=this[0].offsetWidth,this};