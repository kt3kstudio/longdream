Ext.data.JsonP.domain_map_CharLocateService({"tagname":"class","name":"domain.map.CharLocateService","autodetected":{},"files":[{"filename":"CharLocateService.js","href":"CharLocateService.html#domain-map-CharLocateService"}],"members":[{"name":"constructor","tagname":"method","owner":"domain.map.CharLocateService","id":"method-constructor","meta":{}},{"name":"charAppear","tagname":"method","owner":"domain.map.CharLocateService","id":"method-charAppear","meta":{}},{"name":"getIntoDoor","tagname":"method","owner":"domain.map.CharLocateService","id":"method-getIntoDoor","meta":{}},{"name":"load","tagname":"method","owner":"domain.map.CharLocateService","id":"method-load","meta":{}},{"name":"moveToWallObject","tagname":"method","owner":"domain.map.CharLocateService","id":"method-moveToWallObject","meta":{}},{"name":"moveToWallObjectByName","tagname":"method","owner":"domain.map.CharLocateService","id":"method-moveToWallObjectByName","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-domain.map.CharLocateService","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/CharLocateService.html#domain-map-CharLocateService' target='_blank'>CharLocateService.js</a></div></pre><div class='doc-contents'><p>MaLocateService class provide the functionality to move character among the doors in a floor.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='domain.map.CharLocateService'>domain.map.CharLocateService</span><br/><a href='source/CharLocateService.html#domain-map-CharLocateService-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/domain.map.CharLocateService-method-constructor' class='name expandable'>domain.map.CharLocateService</a>( <span class='pre'>wall, chr</span> ) : <a href=\"#!/api/domain.map.CharLocateService\" rel=\"domain.map.CharLocateService\" class=\"docClass\">domain.map.CharLocateService</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>wall</span> : <a href=\"#!/api/domain.map.Wall\" rel=\"domain.map.Wall\" class=\"docClass\">domain.map.Wall</a><div class='sub-desc'>\n</div></li><li><span class='pre'>chr</span> : <a href=\"#!/api/domain.common.CharSprite\" rel=\"domain.common.CharSprite\" class=\"docClass\">domain.common.CharSprite</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/domain.map.CharLocateService\" rel=\"domain.map.CharLocateService\" class=\"docClass\">domain.map.CharLocateService</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-charAppear' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='domain.map.CharLocateService'>domain.map.CharLocateService</span><br/><a href='source/CharLocateService.html#domain-map-CharLocateService-method-charAppear' target='_blank' class='view-source'>view source</a></div><a href='#!/api/domain.map.CharLocateService-method-charAppear' class='name expandable'>charAppear</a>( <span class='pre'></span> ) : Promise<span class=\"signature\"></span></div><div class='description'><div class='short'>Makes the character appear in the scene ...</div><div class='long'><p>Makes the character appear in the scene</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Promise</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getIntoDoor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='domain.map.CharLocateService'>domain.map.CharLocateService</span><br/><a href='source/CharLocateService.html#domain-map-CharLocateService-method-getIntoDoor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/domain.map.CharLocateService-method-getIntoDoor' class='name expandable'>getIntoDoor</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the character into the door. ...</div><div class='long'><p>Gets the character into the door.</p>\n</div></div></div><div id='method-load' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='domain.map.CharLocateService'>domain.map.CharLocateService</span><br/><a href='source/CharLocateService.html#domain-map-CharLocateService-method-load' target='_blank' class='view-source'>view source</a></div><a href='#!/api/domain.map.CharLocateService-method-load' class='name expandable'>load</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Loads the character's position. ...</div><div class='long'><p>Loads the character's position.</p>\n</div></div></div><div id='method-moveToWallObject' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='domain.map.CharLocateService'>domain.map.CharLocateService</span><br/><a href='source/CharLocateService.html#domain-map-CharLocateService-method-moveToWallObject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/domain.map.CharLocateService-method-moveToWallObject' class='name expandable'>moveToWallObject</a>( <span class='pre'>wo</span> ) : Promise<span class=\"signature\"></span></div><div class='description'><div class='short'>Moves the character sprite to wall object ...</div><div class='long'><p>Moves the character sprite to wall object</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>wo</span> : <a href=\"#!/api/domain.map.WallObject\" rel=\"domain.map.WallObject\" class=\"docClass\">domain.map.WallObject</a><div class='sub-desc'><p>The wall object to go to</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Promise</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-moveToWallObjectByName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='domain.map.CharLocateService'>domain.map.CharLocateService</span><br/><a href='source/CharLocateService.html#domain-map-CharLocateService-method-moveToWallObjectByName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/domain.map.CharLocateService-method-moveToWallObjectByName' class='name expandable'>moveToWallObjectByName</a>( <span class='pre'>name</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>TODO: this should be changed to id</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});