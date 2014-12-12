window.domain=window.domain||{},domain.level=domain.level||{},domain.level.Ball=function(t){"use strict";var e=function(e){this.transDur=window.NUDUR,this.x=1,this.y=1,this.MAX=3,this.$dom=t(".circle").css({width:e.unit+"px",height:e.unit+"px"}),this.metrics=e,this.locate()},n=e.prototype;return n.appear=function(){return this.$dom.css("visibility","visible"),this.$dom.anim("ball-appear",this.transDur)},n.disappear=function(){return this.$dom.css("visibility","hidden"),this.$dom.anim("ball-disappear",400)},n.move=function(t){return this.setPos(this.posAhead(t))},n.pos=function(){return{x:this.x,y:this.y}},n.posAhead=function(t){switch(t){case"up":return this.relativePos(0,-1);case"down":return this.relativePos(0,1);case"left":return this.relativePos(-1,0);case"right":return this.relativePos(1,0)}},n.relativePos=function(t,e){return{x:(this.x+t+this.MAX)%this.MAX,y:(this.y+e+this.MAX)%this.MAX}},n.setPos=function(t){return this.x=t.x,this.y=t.y,this.locate()},n.locate=function(){return this.$dom.css("top",this.metrics.top+this.y*this.metrics.unit+"px"),this.$dom.css("left",this.metrics.left+this.x*this.metrics.unit+"px"),wait(this.transDur)},n.refuseToMove=function(t){return"up"===t||"down"===t?this.$dom.anim("ball-refuse-y",window.NUDUR):this.$dom.anim("ball-refuse-x",window.NUDUR)},e}(window.jQuery),window.domain=window.domain||{},domain.level=domain.level||{},domain.level.BallMoveMobLeaveService=function(){"use strict";var t=function(t,e,i,s){this.ball=t,this.mobs=new n(e),this.box=i,this.resProcess=s,this.pmds=new domain.level.PossibleMoveDetectionService(this.ball,e)},e=t.prototype;e.ballMoveAndLeaveOne=function(t){var e=this.ball.posAhead(t);return null==this.mobs.find(e)?(this.ball.refuseToMove(t),Promise.reject()):(this.ball.move(t),this.leaveAtPos(e))},e.leaveOne=function(){return this.leaveAtPos(this.ball.pos())},e.leaveAtPos=function(t){var e=this,n=this.mobs.leave(t);return this.pmds.possible()||(console.log("no more move!"),this.pmds.cellRemainsAtBall()?(console.log("last one cell"),wait(600).then(function(){return e.leaveOne()})):(console.log("no cell left"),n.isLastOne=!0)),this.box.take(n).then(this.resProcess)};var n=function(t){this.wanderers=t},i=n.prototype;return i.isEmpty=function(){return this.wanderers.isEmpty()},i.leave=function(t){var e=this.wanderers.select(t);return this.wanderers.filter(e),e=e[0],this.wanderers.selectRange(t).forEach(function(t){t.up()}),e},i.find=function(t){return this.wanderers.find(t)},t}(),NUDUR=300,window.domain=window.domain||{},domain.level=domain.level||{},domain.level.EvalBox=function(){"use strict";var t=function(t){this.metrics=t},e=t.prototype;e.take=function(t){var e={};if(e.isLastOne=t.isLastOne,e.goTrash=[],e.goFusion=[],e.goQueue=[],null==this.leftPromise)return this.leftPromise=this.setToLeft(t),Promise.resolve(e);var i=this.leftPromise;return delete this.leftPromise,this.setToRight(t).then(function(t){return i.then(function(i){return n(i,t,e)})})};var n=function(t,e,n){return n.left=t,n.right=e,t.gender===e.gender?(n.score=10,n.goTrash.push(e),n.goTrash.push(t)):(n.score=100,n.goFusion.push({left:t,right:e})),n};return e.involve=function(t){t.setMetrics(this.metrics.left,this.metrics.top,this.metrics.unit)},e.setToLeft=function(t){var e=800;return this.involve(t),t.x=0,t.y=0,t.setTransitionDuration(e).then(function(){return t.locate()})},e.setToRight=function(t){var e=800;return this.involve(t),t.setTransitionDuration(e),wait(10).then(function(){return t.x=1,t.y=0,t.locate(),wait(e)}).then(function(){return t})},e.reset=function(){null!=this.left&&this.left.remove(),null!=this.right&&this.right.remove(),this.left=null,this.right=null},t}(),window.domain=window.domain||{},domain.level=domain.level||{},domain.level.EvalResultProcessor=function(){"use strict";var t=function(t,e,n){this.trashBox=t,this.fusionBox=e,this.exitQueue=n},e=t.prototype;return e.process=function(t,e){wait().then(function(){e(t)});var n=[],i=this;return t.goTrash.forEach(function(t){n.push(i.trashBox.take(t))}),t.goQueue.forEach(function(t){n.push(i.exitQueue.take(t))}),t.goFusion.forEach(function(t){n.push(i.fusionBox.take(t).then(function(t){return i.exitQueue.take(t)}))}),Promise.all(n)},t}(),window.domain=window.domain||{},domain.level=domain.level||{},domain.level.ExitQueue=function(){"use strict";var t=4,e=function(e){this.metrics=e,this.queue=[],this.queueMax=t},n=e.prototype;return n.take=function(t){var e=this;return this.goForward().then(function(){return e.involve(t)}).then(function(){return t.locate()})},n.goForward=function(){var t=Promise.resolve();return this.queue.forEach(function(e){t=t.then(function(){return e.x+=1,e.locate(),wait(40)})}),t},n.involve=function(t){if(this.queue.push(t),this.queue.length>this.queueMax){var e=this.queue.shift();e.remove()}return t.x=0,t.y=0,t.setMetrics(this.metrics.left,this.metrics.top,this.metrics.unit),t.setTransitionDuration(600)},n.reset=function(){this.queue=[]},e}(),window.domain=window.domain||{},domain.level=domain.level||{},domain.level.Field=function(){"use strict";var t=200,e=function(e){var n=6;this.left=e.left-n,this.top=e.top-n,this.unit=e.unit,this.width=e.width+2*n,this.dur=t},n=e.prototype;return n.appear=function(){var t=this;return loadImage("images/field.svg","field-grid",document.body).then(function(e){return t.$dom=e,e.css("left",t.left+"px"),e.css("top",t.top+"px"),e.css("width",t.width+"px"),e.anim("field-appear",t.dur)})},n.disappear=function(){var t=this;return this.$dom.anim("field-disappear",400).then(function(){t.$dom.remove()})},e}(),window.domain=window.domain||{},domain.level=domain.level||{},domain.level.FusionBox=function(){"use strict";var t=function(t){this.metrics=t},e=t.prototype;return e.take=function(t){var e=this;return this.getToReactor(t).then(function(){return e.fusion(t)})},e.getToReactor=function(t){var e=1e3;return t.left.$dom.animation("get-to-reactor-left "+e+"ms"),t.right.$dom.animation("get-to-reactor-right "+e+"ms"),wait(e).then(function(){t.left.remove(),t.right.remove()})},e.fusion=function(t){var e=600,n=new domain.level.Wanderer(0,0,t.left.gender,this.metrics.left,this.metrics.top,this.metrics.unit);return n.locate(),n.$dom.prependTo("#main"),n.$dom.animation("bom-born "+e+"ms"),wait(e).then(function(){return n})},t}(),window.domain=window.domain||{},domain.level=domain.level||{},domain.level.Map=function(t){"use strict";var e=function(e){this.cells=[],this.$dom=t(document.body),this.top=e.top,this.left=e.left,this.unit=e.unit};e.createFromBomList=function(t){return(new e).loadFromBomList(t)};var n=e.prototype;return n.createCellFromBom=function(t){return new domain.level.Wanderer(t.x,t.y,t.gene,this.left,this.top,this.unit)},n.empty=function(){this.cells.forEach(function(t){t.remove()}),this.cells=[]},n.isEmpty=function(){return 0===this.cells.length},n.loadFromBomList=function(t){return t.forEach(function(t){this.loadOne(this.createCellFromBom(t))},this),this},n.loadList=function(t){return t.forEach(function(t){this.loadOne(t)},this),this},n.loadOne=function(t){return this.cells.push(t),t.locate(),this},n.appear=function(t){var e=Promise.resolve();return this.cells.forEach(function(n){e=e.then(function(){return n.appear(t),wait(40)})}),e},n.commandAll=function(t,e){this.cells.forEach(function(n){n[t](e)})},n.allUp=function(){this.commandAll("up")},n.allDown=function(){this.commandAll("down")},n.allRight=function(){this.commandAll("right")},n.allLeft=function(){this.commandAll("left")},n.select=function(t){return this.cells.filter(function(e){return e.x===t.x&&e.y===t.y})},n.find=function(t){var e=this.select(t);return 0===e.length?null:e[0]},n.selectRange=function(t){return this.cells.filter(function(e){return e.x===t.x&&e.y>t.y})},n.filter=function(t){this.cells=this.cells.filter(function(e){return t.indexOf(e)<0})},e}(window.jQuery),domain.level.PieceOfPaper=function(){"use strict";var t=function(){},e=t.prototype=new domain.common.CharSprite;return e.x=0,e.y=0,e.w=50,e.h=50,e.image="images/paper.svg",e.cssClass="sprite piece-of-paper",e.appearAnim="paper-appear",e.disappearAnim="paper-disappear",t}(),domain.level.PossibleMoveDetectionService=function(){"use strict";var t=function(t,e){this.ball=t,this.map=e},e=t.prototype;return e.possible=function(){return this.map.find(this.ball.posAhead("up"))?!0:this.map.find(this.ball.posAhead("down"))?!0:this.map.find(this.ball.posAhead("left"))?!0:this.map.find(this.ball.posAhead("right"))?!0:!1},e.cellRemainsAtBall=function(){return null!=this.map.find(this.ball.pos())},t}(),domain.level.TrashBox=function(){"use strict";var t=function(t){this.metrics=t},e=t.prototype;return e.take=function(t){var e=1e3,n=800;return t.setMetrics(this.metrics.left,this.metrics.top,this.metrics.unit),t.setTransitionDuration(e),wait(10).then(function(){return t.locate(),wait(e)}).then(function(){return t.$dom.animation("go-to-trash "+n+"ms"),wait(n)}).then(function(){return t.remove()})},t}(),domain.level.Wanderer=function(t){"use strict";var e=function(n,i,s,o,r,u){this.x=n,this.y=i,this.width=Math.floor(u/2),this.gutter=Math.floor(u/4),this.$dom=t("<img />").css({position:"absolute",width:this.width+"px",height:this.width+"px"}),this.setTransitionDuration(window.NUDUR),this.setGender(s),this.setMetrics(o,r,u),e.allList.push(this)};e.allList=[],e.disappear=function(){var t=Promise.resolve();return e.allList.forEach(function(e){t=t.then(function(){return e.disappear(),wait(10)})}),t.then(function(){return wait(500)})};var n=e.prototype;return n.setTransitionDuration=function(t){return this.transDur=t,this.$dom.css("transition-duration",t+"ms"),wait(0,this)},n.setGender=function(t){return this.gender=t,"m"===t?this.setMaleColor():"f"===t?this.setFemaleColor():void 0},n.setFemaleColor=function(){return this.$dom.attr("src","images/neef.svg"),this},n.setMaleColor=function(){return this.$dom.attr("src","images/nim.svg"),this},n.appear=function(t){return this.$dom.prependTo(t||document.body).anim("bom-appear",500)},n.disappear=function(){var t=this;return this.$dom.css("visibility","hidden"),this.$dom.anim("bom-disappear",500).then(function(){t.remove()})},n.setMetrics=function(t,e,n){return this.offsetX=t,this.offsetY=e,this.unit=n,this},n.locate=function(){return this.$dom.css("top",this.offsetY+this.unit*this.y+this.gutter+"px"),this.$dom.css("left",this.offsetX+this.unit*this.x+this.gutter+"px"),wait(this.transDur,this)},n.remove=function(){this.$dom.remove(),e.allList.splice(e.allList.indexOf(this),1)},n.move=function(t,e){return this.x+=t,this.y+=e,this.locate()},n.up=function(){return this.move(0,-1)},n.down=function(){return this.move(0,1)},n.left=function(){return this.move(-1,0)},n.right=function(){return this.move(1,0)},e}(window.jQuery),scene.level.IntroScene=function(){"use strict";var t=function(t){this.level=t,this.gt=new pages.common.GoalTranslator,this.pos=new pages.level.Positioner,this.paper=new domain.level.PieceOfPaper,this.chr=new domain.common.Ma,this.ball=new domain.level.Ball(this.pos.fieldMetrics())},e=t.prototype=new scene.common.Scene;return e.start=function(){var t=this,e=this.pos.paperPos();this.chr.x=e.left,this.chr.y=800,this.chr.put(),this.paper.x=e.left,this.paper.y=e.top,this.paper.put(),pages.common.BackgroundService.turnWhite(),Promise.resolve().then(function(){return t.chr.moveTo("y",e.top,600)}).then(function(){t.paper.disappear(1e3);var e=$("<p />").text(t.gt.translate(t.level.goals));return t.chr.speak(e)}).then(function(e){return t.speechPromise=new Promise(function(t){setTimeout(function(){t(e)},5e3),$(".wrapper").css("z-index",2).one("click",function(){t(e)})}).then(function(t){return $(".wrapper").off("click").css("z-index",""),t.hide()}),t.chr.disappear(1e3),t.ball.appear()}).then(function(){return t.finish()})},t}(),scene.level.OutroScene=function(){"use strict";var t=function(t){this.prevScene=t,this.ball=new n(t.ball),this.chr=t.prevScene.chr,this.field=t.field,this.menuButton=t.menuButton},e=t.prototype=new scene.common.Scene;e.start=function(){var t=this;return Promise.resolve().then(function(){return domain.level.Wanderer.disappear(),t.menuButton.hide(),t.field.disappear()}).then(function(){return t.ball.goCenterX()}).then(function(){return t.ball.goCenterY()}).then(function(){return Promise.all([t.chr.appear(400),t.ball.disappear()])}).then(function(){return t.chr.moveTo("y",800,1e3)}).then(function(){return pages.common.BackgroundService.turnBlack()}).then(function(){t.finish()})};var n=function(t){this.ball=t},i=n.prototype;return i.goCenterX=function(){var t=this.ball.pos();return t.x=1,this.ball.setPos(t)},i.goCenterY=function(){var t=this.ball.pos();return t.y=1,this.ball.setPos(t)},i.disappear=function(){return this.ball.disappear()},t}(),scene.level.PlayScene=function(t){"use strict";var e=function(e){this.prevScene=e;var n=e.pos;this.ball=e.ball,this.level=e.level;var i=n.fieldMetrics(),s=n.evalRoomMetrics(),o=n.leftDoorMetrics(),r=n.queueMetrics(),u=n.fusionBoxMetrics();this.map=new domain.level.Map(i),this.field=new domain.level.Field(i),this.evalBox=new domain.level.EvalBox(s),this.trashBox=new domain.level.TrashBox(o),this.fusionBox=new domain.level.FusionBox(u),this.exitQueue=new domain.level.ExitQueue(r),this.pointBox=debug.PointBox,this.scoreBox=debug.ScoreBox,this.menuButton=t(".menu-button").menuButton(t("#level-menu"))},n=e.prototype=new scene.common.Scene;return n.loadLevel=function(){return this.map.loadFromBomList(this.level.cells),this},n.start=function(){var t=this;this.loadLevel();var e=new domain.level.EvalResultProcessor(this.trashBox,this.fusionBox,this.exitQueue),n=function(n){var i=e.process(n,function(e){console.log("eval result"),console.log(e),e.score&&t.scoreBox.add(e.score),e.left&&e.right&&t.pointBox.countUp(e.left.gender,e.right.gender)});return n.isLastOne&&(i=i.then(function(){t.finish()})),i},i=new domain.level.BallMoveMobLeaveService(this.ball,this.map,this.evalBox,n);return this.bindEvents(function(t){return i.ballMoveAndLeaveOne(t)}),this.menuButton.show(),t.field.appear().then(function(){return t.map.appear("#main")})},n.cease=function(){var t=this;return this.menuButton.hide(),this.unbindEvents(),this.ball.disappear().then(function(){return domain.level.Wanderer.disappear()}).then(function(){return t.field.disappear()}).then(function(){return pages.common.BackgroundService.turnBlack()}).then(function(){return t.map.empty(),t.pointBox.reset(),t.evalBox.reset(),t.scoreBox.reset(),t.exitQueue.reset(),wait(300)}).then(function(){t.finish()})},n.bindEvents=function(e){this.swipe$dom=t(".wrapper").swipeCross().on("swipeup",function(){e("up")}).on("swipedown",function(){e("down")}).on("swipeleft",function(){e("left")}).on("swiperight",function(){e("right")}).on("swipecancel",function(){}),t(document).arrowkeys().on("upkey",function(){e("up")}).on("downkey",function(){e("down")}).on("leftkey",function(){e("left")}).on("rightkey",function(){e("right")})},n.unbindEvents=function(){this.swipe$dom.swipeCrossUnbind().off("swipeup").off("swipedown").off("swipeleft").off("swiperight").off("swipecancel"),t(document).arrowkeysUnbind().off("upkey").off("downkey").off("leftkey").off("rightkey")},e}(window.jQuery),window.pages=window.pages||{},pages.level=pages.level||{},pages.level.PhaseController=function(){"use strict";var t=function(){this.lvRepo=new datadomain.LevelRepository},e=t.prototype;return e.loadCurrentLevel=function(){return this.getLevel(this.getLevelName())},e.getLevelName=function(){return window.location.hash.substring(1)||0},e.getLevel=function(t){return this.lvRepo.loadByLevel(t)},t}(),pages.level.Positioner=function(t){"use strict";var e=50,n=50,i=1.5,s=function(){this.calc()},o=s.prototype;return o.calcAvailableArea=function(){var i=this.width=t(window).width(),s=this.height=t(window).height();this.availableHeight=s-e-n,this.availableWidth=i},o.calcBestArea=function(){this.calcAvailableArea(),this.availableWidth*i>this.availableHeight?(this.bestWidth=this.availableHeight/i,this.bestHeight=this.availableHeight):(this.bestWidth=this.availableWidth,this.bestHeight=this.availableWidth*i)},o.calcLeft=function(){this.left=(this.width-this.bestWidth)/2},o.calc=function(){this.calcBestArea(),this.calcLeft(),this.UNIT=this.bestWidth/4,this.LEFT=this.left+this.UNIT/2,this.TOP=e},o.topUIPosition=function(){return{top:0,left:this.left}},o.gridPosition=function(t,e,n){var i=this.UNIT;return{top:this.TOP+i*e,left:this.LEFT+i*t,unit:i,width:i*n}},o.fieldMetrics=function(){return this.gridPosition(0,2,3)},o.evalRoomMetrics=function(){return this.gridPosition(0,1,2)},o.leftDoorMetrics=function(){return this.gridPosition(0,0,1)},o.rightDoorMetrics=function(){return this.gridPosition(2,1,1)},o.queueMetrics=function(){var t=this.gridPosition(1,0,1);return t.unit/=2,t},o.fusionBoxMetrics=function(){return this.gridPosition(1,1,1)},o.paperPos=function(){return{left:this.width/2,top:this.TOP+4*this.UNIT}},s}(window.jQuery),function(t,e){"use strict";e.fn.arrowkeys=function(){var t=this;return this._arrowkeysHandler=function(e){switch(e.keyCode){case 37:e.preventDefault(),t.trigger("leftkey");break;case 38:e.preventDefault(),t.trigger("upkey");break;case 39:e.preventDefault(),t.trigger("rightkey");break;case 40:e.preventDefault(),t.trigger("downkey")}},this.on("keydown",this._arrowkeysHandler),this},e.fn.arrowkeysUnbind=function(){return this.off("keydown",this._arrowkeysHandler),delete this._arrowkeysHandler,this}}(window,window.$),this.SwipeEvent=function(t,e){"use strict";var n={SWIPE:{CANCEL:"swipecancel",END:"swipeend"}},i=function(t){t=t||{},this.elm=t.elm,this.fingerCount=0,this.touchCurrent=null,this.touchInitial=null,this.bindEvents()};i.isTouchDevice=function(){return"ontouchstart"in t.document.documentElement};var s=i.prototype;return s.dispatchEvent=function(t){this.elm.dispatchEvent(new CustomEvent(t,{detail:{startX:this.touchInitial.pageX,startY:this.touchInitial.pageY,endX:this.touchCurrent.pageX,endY:this.touchCurrent.pageY}}))},s.swipeEnd=function(){return 1!==this.fingerCount?void(this.fingerCount=0):(this.fingerCount=0,void this.dispatchEvent(n.SWIPE.END))},s.touchStart=function(t){this.touchInitial={pageX:t.pageX,pageY:t.pageY},this.touchCurrent=t,this.fingerCount=1},s.touchMove=function(t){this.touchCurrent=t},s.touchEnd=function(){this.swipeEnd()},s.touchCancel=function(){this.fingerCount>0&&(this.fingerCount=0,this.dispatchEvent(n.SWIPE.CANCEL))},s.createHandlers=function(){var t=this;this.handlers={touchStart:function(e){e.preventDefault(),1===e.touches.length?t.touchStart(e.touches[0]):t.touchCancel()},touchMove:function(e){e.preventDefault(),1===t.fingerCount?t.touchMove(e.touches[0]):t.touchCancel()},touchEnd:function(e){e.preventDefault(),1===t.fingerCount?t.touchEnd():t.touchCancel()},touchCancel:function(e){e.preventDefault(),t.touchCancel()},mouseDown:function(e){e.preventDefault(),t.touchStart(e)},mouseMove:function(e){e.preventDefault(),t.touchMove(e)},mouseUp:function(e){e.preventDefault(),t.touchEnd()},mouseOut:function(e){e.preventDefault(),t.touchCancel()}}},s.bindEvents=function(){this.createHandlers(),i.isTouchDevice()?(this.elm.addEventListener("touchstart",this.handlers.touchStart,!1),this.elm.addEventListener("touchmove",this.handlers.touchMove,!1),this.elm.addEventListener("touchend",this.handlers.touchEnd,!1),this.elm.addEventListener("touchcancel",this.handlers.touchCancel,!1)):(this.elm.addEventListener("mousedown",this.handlers.mouseDown,!1),this.elm.addEventListener("mousemove",this.handlers.mouseMove,!1),this.elm.addEventListener("mouseout",this.handlers.mouseOut,!1),this.elm.addEventListener("mouseup",this.handlers.mouseUp,!1))},s.unbindEvents=function(){i.isTouchDevice()?(this.elm.removeEventListener("touchstart",this.handlers.touchStart,!1),this.elm.removeEventListener("touchmove",this.handlers.touchMove,!1),this.elm.removeEventListener("touchend",this.handlers.touchEnd,!1),this.elm.removeEventListener("touchcancel",this.handlers.touchCancel,!1)):(this.elm.removeEventListener("mousedown",this.handlers.mouseDown,!1),this.elm.removeEventListener("mousemove",this.handlers.mouseMove,!1),this.elm.removeEventListener("mouseout",this.handlers.mouseOut,!1),this.elm.removeEventListener("mouseup",this.handlers.mouseUp,!1))},null!=e&&null!=e.fn&&(e.fn.swipeEvent=function(){return this._swipeEvent=new i({elm:this[0]}),this},e.fn.swipeEventUnbind=function(){return null!=this._swipeEvent&&this._swipeEvent.unbindEvents(),this._swipeEvent=null,this}),i}(window,window.$),window.SwipeEvent.SwipeCross=function(t,e){"use strict";var n={THRESHOLD:3},i={UP:0,DOWN:1,RIGHT:2,LEFT:3},s={SWIPE:{UP:"swipeup",RIGHT:"swiperight",DOWN:"swipedown",LEFT:"swipeleft"}},o=function(t){t=t||{},this.elm=t.elm,this.bindEvents()},r=o.prototype;r.createHandlers=function(){var t=this;this.handler=function(e){e.preventDefault();var o=new u(e.detail.startX,e.detail.startY,e.detail.endX,e.detail.endY);if(!(o.distance()<=n.THRESHOLD)){var r=o.direction();t.dispatchEvent(r===i.UP?s.SWIPE.UP:r===i.LEFT?s.SWIPE.LEFT:r===i.RIGHT?s.SWIPE.RIGHT:s.SWIPE.DOWN)}}},r.bindEvents=function(){this.createHandlers(),this.elm.addEventListener("swipeend",this.handler,!1)},r.unbindEvents=function(){this.elm.removeEventListener("swipeend",this.handler,!1)},r.dispatchEvent=function(t){this.elm.dispatchEvent(new CustomEvent(t,{}))};var u=function(t,e,n,i){this.startX=t,this.startY=e,this.endX=n,this.endY=i},a=u.prototype;return a.distance=function(){var t=this.endX-this.startX,e=this.endY-this.startY;return Math.max(Math.abs(t),Math.abs(e))},a.angle=function(){var t=Math.atan2(this.endY-this.startY,this.endX-this.startX);return(Math.floor(180*t/Math.PI)+360)%360},a.direction=function(){var t=this.angle();return 45>t||t>=315?i.RIGHT:t>=45&&135>t?i.DOWN:t>=135&&225>t?i.LEFT:i.UP},null!=e&&null!=e.fn&&(e.fn.swipeCross=function(){return null==this._swipeEvent&&(this._swipeEvent=new t.SwipeEvent({elm:this[0]})),this._swipeCross=new o({elm:this[0]}),this},e.fn.swipeCrossUnbind=function(){return null!=this._swipeEvent&&(this._swipeEvent.unbindEvents(),this._swipeEvent=null),null!=this._swipeCross&&this._swipeCross.unbindEvents(),this._swipeCross=null,this}),o}(window,window.$),window.debug=window.debug||{},debug.PointBox={getCount:function(t,e){"use strict";return parseInt(this.getTarget(t,e).text())},setCount:function(t,e,n){"use strict";this.getTarget(t,e).text(n)},countUp:function(t,e){"use strict";this.setCount(t,e,this.getCount(t,e)+1)},reset:function(){"use strict";this.setCount("f","f",0),this.setCount("m","f",0),this.setCount("f","m",0),this.setCount("m","m",0)},getTarget:function(t,e){"use strict";var n=t+e;return $(".point ."+n)}},window.debug=window.debug||{},debug.ScoreBox={add:function(t){"use strict";this.setScore(this.getScore()+t)},getScore:function(){"use strict";return parseInt(this.getTarget().text())},setScore:function(t){"use strict";this.getTarget().text(t)},reset:function(){"use strict";this.setScore(0)},getTarget:function(){"use strict";return $(".point .level-score")}};