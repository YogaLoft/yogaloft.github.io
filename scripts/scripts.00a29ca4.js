"use strict";angular.module("ylngApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngIcal","hc.marked"]).run(["$window",function(t){var e,s,a,n;t.fbAsyncInit=function(){FB.init({appId:"1434342883499221",status:!0,cookie:!0,xfbml:!0,version:"v2.5"})},e=document,s="facebook-jssdk",n=e.getElementsByTagName("script")[0],e.getElementById(s)||((a=e.createElement("script")).id=s,a.async=!0,a.src="//connect.facebook.net/en_GB/sdk.js",n.parentNode.insertBefore(a,n))}]).config(["$routeProvider",function(t){t.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/teachers/:instructor",{templateUrl:"views/teachers.html",controller:"TeachersCtrl",controllerAs:"teachers"}).otherwise({redirectTo:"/"})}]),angular.module("ylngApp").controller("MainCtrl",["$scope","classCalendar",function(e,t){t.banner().then(function(t){e.banner=t});var s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],a=new Date;a.setDate(a.getDate()-1);var n=new Date;n.setDate(n.getDate()+4),t.query().then(function(t){e.upcomingClasses=t.filter(function(t){return t.start<n&&t.start>a}).map(function(t){return{sort:t.start,day:s[t.start.getDay()],start:t.start.toTimeString().substring(0,5),end:t.end.toTimeString().substring(0,5),class:{url:"#!/classes/"+s[t.start.getDay()]+"/"+t.class.replace(/ /g,"-"),name:t.class},instructor:{name:t.instructor,url:"#!/teachers/"+t.instructor.replace(/ /g,"-"),image:"https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/"+t.instructor.replace(/ /g,"-")+"/24x24.png"},location:t.location}}),e.upcomingClasses.sort(function(t,e){return t.sort-e.sort})},function(t){console.log(t.statusText)}),e.days=[];for(var r=new Date,o=0;o<3;o++)0<o&&r.setDate(r.getDate()+1),0===r.getDay()&&r.setDate(r.getDate()+1),e.days.push(s[r.getDay()])}]),angular.module("ylngApp").controller("AboutCtrl",function(){}),angular.module("ylngApp").controller("TeachersCtrl",["$scope","$routeParams","$http","classCalendar",function(s,a,n,r){r.teachers().then(function(t){var e=t.find(function(t){return t.id===a.instructor});n.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/"+e.id+"/profile.md").then(function(t){s.teacher={id:e.id,name:e.name,markdown:t.data,image:{source:"https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/"+e.id+"/220x220.jpg",alt:"Profile photo of "+e.name},facebook:!!e.facebook&&e.facebook}}),r.index().then(function(t){for(var e in t)t.hasOwnProperty(e)&&(t[e]=t[e].filter(function(t){return t.instructor.id===a.instructor}));s.ci=t},function(t){console.log(t.statusText)})},function(t){console.log(t.statusText)})}]),angular.module("ylngApp").service("classCalendar",["$http","ical",function(t,e){this.query=function(){return t.get("https://crossorigin.me/http://yogaloft.tulasoftware.com/calendar/feed.ics").then(function(t){return new e.Component(e.parse(t.data)).getAllSubcomponents("vevent").map(function(t){var e=t.getFirstPropertyValue("dtstart"),s=t.getFirstPropertyValue("dtend"),a=t.getFirstPropertyValue("summary").split(" - ");return{start:new Date(e.year,e.month-1,e.day,e.hour,e.minute),end:new Date(e.year,s.month-1,s.day,s.hour,s.minute),class:a[0],instructor:a[1],location:t.getFirstPropertyValue("location")}})},function(t){throw t.status+" : "+t.data})},this.index=function(){return t.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/classes/index.json?"+Math.random()).then(function(t){return t.data},function(t){throw t.status+" : "+t.data})},this.faq=function(){return t.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/faq/index.json?"+Math.random()).then(function(t){return t.data},function(t){throw t.status+" : "+t.data})},this.teachers=function(){return t.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/index.json?"+Math.random()).then(function(t){return t.data},function(t){throw t.status+" : "+t.data})},this.banner=function(){return t.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/banner.json?"+Math.random()).then(function(t){var e=new Date;return{notes:t.data.notes.filter(function(t){return new Date(t.from)<e&&new Date(t.to)>e}).map(function(t){return t.message}),warnings:t.data.warnings.filter(function(t){return new Date(t.from)<e&&new Date(t.to)>e}).map(function(t){return t.message}),alerts:t.data.alerts.filter(function(t){return new Date(t.from)<e&&new Date(t.to)>e}).map(function(t){return t.message})}},function(t){throw t.status+" : "+t.data})},this.workshops=function(){return t.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/workshops/index.json?"+Math.random()).then(function(t){return t.data},function(t){throw t.status+" : "+t.data})}}]),angular.module("ylngApp").controller("TestCtrl",["$scope","classCalendar",function(e,t){t.query().then(function(t){e.calendar=t},function(t){console.log(t.statusText)})}]),angular.module("ylngApp").controller("TimetableCtrl",["$scope","classCalendar",function(e,t){t.banner().then(function(t){e.banner=t})}]),angular.module("ylngApp").controller("NavCtrl",["$scope","$location","classCalendar",function(e,s,t){e.instructors=["Charlotte-Levy","Gavin-Tilstone","Georgie-Crickmere","Jo-Thyssen","Jules-Laville","Nic-Sharpe","Peter-Hughes","Venita-Botha"],e.isActive=function(t){return"/"===s.path()&&"/"===t||"/"!==s.path()&&"/"!==t&&s.path().startsWith(t)},t.index().then(function(t){e.ci=t},function(t){console.log(t.statusText)})}]),angular.module("ylngApp").controller("AccountCtrl",function(){}),angular.module("ylngApp").controller("MapCtrl",["$scope","$http",function(e,t){t.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/directions.md").then(function(t){e.markdown=t.data})}]),angular.module("ylngApp").controller("ClassesCtrl",["$scope","$routeParams","$http","classCalendar",function(s,a,t,e){s.weekday=void 0!==a.weekday&&a.weekday,e.index().then(function(t){if(s.weekday){var e=t[a.weekday].find(function(t){return t.id===a.class});e.passes&&e.passes.length&&(s.passes="https://yogaloft.tulasoftware.com/external_form?",e.passes.forEach(function(t){s.passes+="&p[]="+t})),s.class=e}},function(t){console.log(t.statusText)}),s.weekday?t.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/classes/"+s.weekday+"/"+a.class+".md").then(function(t){s.markdown=t.data}):t.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/classes/"+a.class+".md").then(function(t){s.markdown=t.data})}]),angular.module("ylngApp").controller("PricesCtrl",function(){}),angular.module("ylngApp").controller("FaqCtrl",["$scope","classCalendar",function(e,t){t.faq().then(function(t){e.faq=t},function(t){console.log(t.statusText)})}]),angular.module("ylngApp").controller("WorkshopsCtrl",["$scope","$routeParams","$http","classCalendar",function(s,t,a,e){s.workshopId=void 0!==t.workshop&&t.workshop,e.workshops().then(function(t){if(s.workshopId){var e=t.find(function(t){return t.id===s.workshopId});e.passes&&e.passes.length&&(s.passes="https://yogaloft.tulasoftware.com/external_form?",e.passes.forEach(function(t){s.passes+="&p[]="+t})),s.workshop=e,a.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/workshops/"+s.workshopId+".md").then(function(t){s.markdown=t.data})}else s.workshops=t.filter(function(t){return new Date(t.display.from)<new Date&&new Date(t.display.to)>new Date})},function(t){console.log(t.statusText)})}]),angular.module("ylngApp").run(["$templateCache",function(t){t.put("views/about.html","<p>This is the about view.</p> "),t.put("views/account.html",'<script type="text/javascript" async src="https://yogaloft.tulasoftware.com/assets/student-widget.js"><\/script><a class="tulasoftware-student-widget" href="https://yogaloft.tulasoftware.com/student/account/summary">My Account</a>'),t.put("views/classes.html",'<div class="alert alert-info" ng-show="class.notes && class.notes.length"> <span ng-repeat="note in class.notes" marked="note"></span> </div> <div class="alert alert-warning" ng-show="class.warnings && class.warnings.length"> <span ng-repeat="warning in class.warnings" marked="warning"></span> </div> <div class="alert alert-danger" ng-show="class.alerts && class.alerts.length"> <span ng-repeat="alert in class.alerts" marked="alert"></span> </div> <div class="clearfix content-heading"> <a href="#!/teachers/{{class.instructor.id}}" ng-show="weekday"> <img class="pull-left" style="border-radius: 50%; width: 64px; height: 64px; margin-right: 20px" ng-src="https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/{{class.instructor.id}}/128x128.png"> </a> <h1>{{class.name}}</h1> </div> <h2 ng-show="weekday"> <i class="fa fa-clock-o"></i> {{weekday}} {{class.start}} - {{class.end}} </h2> <h3 ng-show="weekday">with <a href="#!/teachers/{{class.instructor.id}}">{{class.instructor.name}}</a></h3> <div marked="markdown"></div> <div ng-if="class && passes && passes.length"> <script type="text/javascript" async src="https://yogaloft.tulasoftware.com/assets/purchase-widget.js"><\/script><a class="tulasoftware-purchase-widget" href="{{passes}}">Purchase</a> </div>'),t.put("views/faq.html",'<h1>frequently asked questions</h1> <div ng-repeat="category in faq"> <h2>{{category.category}}</h2> <div class="panel panel-default" ng-repeat="question in category.items"> <div class="panel-heading" ng-click="question.show=!question.show"> <h3 class="panel-title">{{question.question}}</h3> </div> <div class="panel-body" ng-show="question.show"> <span ng-repeat="answer in question.answer.text" marked="answer"></span> <blockquote ng-if="question.answer.quote.text"> <span ng-repeat="quote in question.answer.quote.text" marked="quote"></span> <footer ng-if="question.answer.quote.cite"> <cite> <a ng-if="question.answer.quote.cite.url" href="{{question.answer.quote.cite.url}}"> {{question.answer.quote.cite.text}} </a> <span ng-if="!question.answer.quote.cite.url"> {{question.answer.quote.cite.text}} </span> </cite> </footer> </blockquote> </div> </div> </div> <div id="disqus_thread"></div> <script> var disqus_config = function () {\n  this.page.url = \'http://yogaloft.co.uk/#!/faq\';\n  this.page.identifier = \'faq\';\n};\n(function() {\nvar d = document, s = d.createElement(\'script\');\ns.src = \'//yogaloft.disqus.com/embed.js\';\ns.setAttribute(\'data-timestamp\', +new Date());\n(d.head || d.body).appendChild(s);\n})(); <\/script>'),t.put("views/main.html",'<div class="alert alert-info" ng-show="banner.notes && banner.notes.length && !banner.hidenotes"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidenotes = !banner.hidenotes"></span> </span> <span class="pull-left glyphicon glyphicon-info-sign" style="margin-right: 10px"></span> <span ng-repeat="item in banner.notes" marked="item"></span> </div> <div class="alert alert-warning" ng-show="banner.warnings && banner.warnings.length && !banner.hidewarnings"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidewarnings = !banner.hidewarnings"></span> </span> <span class="pull-left glyphicon glyphicon-warning-sign" style="margin-right: 10px"></span> <span ng-repeat="item in banner.warnings" marked="item"></span> </div> <div class="alert alert-danger" ng-show="banner.alerts && banner.alerts.length && !banner.hidealerts"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidealerts = !banner.hidealerts"></span> </span> <span class="pull-left glyphicon glyphicon-alert" style="margin-right: 10px"></span> <span ng-repeat="item in banner.alerts" marked="item"></span> </div> <div id="slides"> <div> <img src="images/P1010859.jpg" alt="Yoga Blocks."> </div> <div> <img src="images/meditation.025e4424.jpg" alt="Yoga students in a meditative moment."> </div> <div> <img src="images/side-stretch-warm-up.JPG" alt="Our new location."> </div> </div> <div> <h2>The Central Yoga Loft - Coming Soooon! </h2> <p>Get Involved</p> </div> <div> <div class="col-md-3"> <div class="fb-page" data-href="https://www.facebook.com/YogaLoftPlymouth" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"></div> </div> <div class="clearfix"></div> </div> <script type="text/javascript"> $(document).ready(function () {\n    $("#slides > div:gt(0)").hide();\n    setInterval(function () {\n'+"      $('#slides > div:first').fadeOut(1000).next().fadeIn(1000).end().appendTo('#slides');\n    }, 6000);\n  }); <\/script> "),t.put("views/map.html",'<h1>How to find us</h1> <h2>in the heart of Plymouth city centre</h2> <div id="map_canvas" style="height: 400px"> <noscript> <img src="/Images/map.png" alt="Map to Yoga Loft, 11 Whimple Street, Plymouth, PL1 2DH"> </noscript> </div> <div marked="markdown"></div> <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?v=3.exp&amp;callback=init_map"><\/script> <script type="text/javascript"> function init_map() {\n    var coordinates = new google.maps.LatLng(50.369754, -4.139047);\n    var options = { center: coordinates, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP };\n    var map = new google.maps.Map(document.getElementById("map_canvas"), options);\n    var marker = new google.maps.Marker({ title: \'The Yoga Loft\', position: coordinates, map: map, icon: \'images/marker.19cf6c5e.png\', shadow: \'images/shadow.png\' });\n    var bubble = new google.maps.InfoWindow({ content: \'<div style="width: 280px;"><p><img src="images/cafe-rouge.jpg" style="float: left; margin-right: 20px;" /><strong>The Yoga Loft</strong><br />11 Whimple Street<br />Plymouth PL1 2DH</p></div>\' });\n    google.maps.event.addListener(marker, \'click\', function() { bubble.open(map, marker); });\n  } <\/script>'),t.put("views/prices.html",'<h1>Class rates</h1> <div class="row-fluid"> <p>You are welcome to drop-in anytime or you may book ahead. Membership is <strong>not</strong> required. You can use the form below to pay in advance for your session passes. You can also pay in cash or with a card at the Loft but it\'s nice if you can do it here in advance, so that your instructor is free to concentrate on Yoga rather than taking payments.</p> <table class="table table-hover table-striped"> <thead> <tr> <th></th> <th colspan="3" class="text-center" style="border-left: 1px solid #dddddd"> full sessions (1&frac12; ~ 2 hours) </th> <th colspan="3" class="text-center" style="border-left: 1px solid #dddddd"> short sessions (1 hour) </th> </tr> <tr> <th></th> <th class="text-right" style="border-left: 1px solid #dddddd"> 1 class </th> <th class="text-right"> 5 classes </th> <th class="text-right"> 10 classes </th> <th class="text-right" style="border-left: 1px solid #dddddd"> 1 class </th> <th class="text-right"> 5 classes </th> <th class="text-right"> 10 classes </th> </tr> </thead> <tbody> <tr> <th>Anyone</th> <td class="text-right" style="border-left: 1px solid #dddddd"> &pound;8.00 </td> <td class="text-right"> &pound;40.00 </td> <td class="text-right"> &pound;72.00 </td> <td class="text-right" style="border-left: 1px solid #dddddd"> &pound;6.00 </td> <td class="text-right"> &pound;30.00 </td> <td class="text-right"> &pound;60.00 </td> </tr> <tr> <th>Concessions</th> <td class="text-right" style="border-left: 1px solid #dddddd"> &pound;7.00 </td> <td class="text-right"> &pound;35.00 </td> <td class="text-right"> &pound;63.00 </td> <td class="text-right" style="border-left: 1px solid #dddddd"> </td> <td class="text-right"> </td> <td class="text-right"> </td> </tr> <tr> <th>Children</th> <td class="text-right text-muted" style="border-left: 1px solid #dddddd"></td> <td class="text-right text-muted"></td> <td class="text-right text-muted"></td> <td class="text-right" style="border-left: 1px solid #dddddd"> &pound;5.00 </td> <td class="text-right text-muted"></td> <td class="text-right text-muted"></td> </tr> <tr> <th>Freestyle &amp; Acroyoga</th> <td class="text-right" style="border-left: 1px solid #dddddd"> &pound;5.00 </td> <td class="text-right text-muted"></td> <td class="text-right text-muted"></td> <td class="text-right text-muted" style="border-left: 1px solid #dddddd"></td> <td class="text-right text-muted"></td> <td class="text-right text-muted"></td> </tr> </tbody> </table> \x3c!--\n  <h3>Monthly Memberships</h3>\n  <p>There is no minimum membership period and you can cancel with immediate effect at any time, by cancelling your recurring payment.</p>\n\n  <table class="table table-hover table-striped">\n    <thead>\n      <tr>\n        <th></th>\n        <th class="text-right">\n          up to 5 classes per month\n        </th>\n        <th class="text-right">\n          unlimited classes\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <th>Anyone</th>\n        <td class="text-right">\n          &pound;32.00\n        </td>\n        <td class="text-right">\n          &pound;60.00\n        </td>\n      </tr>\n      <tr>\n        <th>Concessions, Students, Seniors, Services</th>\n        <td class="text-right">\n          &pound;28.00\n        </td>\n        <td class="text-right">\n          &pound;54.00\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  --\x3e </div> <div class="row-fluid"> <script type="text/javascript" async src="https://yogaloft.tulasoftware.com/assets/purchase-widget.js"><\/script><a class="tulasoftware-purchase-widget" href="https://yogaloft.tulasoftware.com/external_form">Purchase</a> </div> <div class="row-fluid"> <h2>Pricing and online purchase policy</h2> <h3>Timetabled class passes</h3> <ul> <li>All timetabled class pass sessions bought online, <strong>never expire</strong> and are valid until used. There is no time limit.</li> <li>Passes can be used for <strong>any class</strong> with the same, or shorter, session length. They are not tied to a specific class.</li> <li>You may also buy passes to give away to your friends or family (ask at the studio, to have passes transfered to someone else).</li> <li>If pass prices go up in the future, we will continue to accept passes purchased previously at the lower price.</li> </ul> <h3><a name="Concessions" style="text-decoration: none; color: #000000">Concessions</a></h3> <p>We offer discounted rates on the evening classes for:</p> <ul> <li>Students</li> <li>Seniors</li> <li>Services Personnel (past or present)</li> <li>NHS Staff &amp; Care Workers</li> </ul> <p>On your first visit, we may ask to see ID showing your entitlement and make a note on your account. On subsequent visits, there is no need to show ID. Just select the discount passes in the payment form.</p> <p>If you need a concession for reasons not listed here, just ask. All requests will receive due consideration.</p> <p>There is also a Monday <a href="#!/classes/Monday/Community-Class">Community Class</a>, where admission is donation based. You may give whatever you can afford, attend free of charge if you need to, or make a contribution that isn\'t money, like making a "pay it forward" donation of your time to a charitable cause or doing something selfless and heroic for someone who needs you.</p> <h3><a name="Freestyle" style="text-decoration: none; color: #000000">Freestyle</a></h3> <p>Freestyle passes are used for personal practice time at the loft. They cover a pre-booked, pre-paid, personal practice session of up to 2 hours without an instructor present. We also use them for some special-offer classes, Acroyoga and Community class (which is donation based).</p> \x3c!--\n  <h3>Membership passes</h3>\n  <p>Membership passes are valid for one month from the date of purchase.</p>\n  <p>Membership passes will automatically renew each month unless cancelled or payment fails.</p>\n  <p>Membership passes are non-refundable and non-transferable. Please use them while they are valid.</p>\n  --\x3e </div> <hr> '),t.put("views/teachers.html",'<img src="{{teacher.image.source}}" alt="{{teacher.image.alt}}" class="img-rounded pull-left" style="margin-right: 1em; margin-bottom: 0.5em"> <div marked="teacher.markdown"></div> <div class="clearfix" style="margin: 10px"></div> <div ng-if="teacher.facebook"> <div class="fb-page pull-left" data-href="https://www.facebook.com/{{teacher.facebook}}" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"></div> </div> <div class="col-md-6"> <h4>Classes with {{teacher.name.split(\' \')[0]}} at the Yoga Loft</h4> <ul ng-repeat="(day, classes) in ci" class="list-unstyled"> <li ng-repeat="class in classes"> {{day}}, {{class.start}}: <a href="#!/classes/{{day}}/{{class.id}}">{{class.name}}</a> </li> </ul> </div> <div class="clearfix" style="margin: 10px"></div>'),t.put("views/test.html","<pre>{{calendar | json}}</pre> "),t.put("views/timetable.html",'<div class="alert alert-info" ng-show="banner.notes && banner.notes.length && !banner.hidenotes"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidenotes = !banner.hidenotes"></span> </span> <span class="pull-left glyphicon glyphicon-info-sign" style="margin-right: 10px"></span> <span ng-repeat="item in banner.notes" marked="item"></span> </div> <div class="alert alert-warning" ng-show="banner.warnings && banner.warnings.length && !banner.hidewarnings"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidewarnings = !banner.hidewarnings"></span> </span> <span class="pull-left glyphicon glyphicon-warning-sign" style="margin-right: 10px"></span> <span ng-repeat="item in banner.warnings" marked="item"></span> </div> <div class="alert alert-danger" ng-show="banner.alerts && banner.alerts.length && !banner.hidealerts"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidealerts = !banner.hidealerts"></span> </span> <span class="pull-left glyphicon glyphicon-alert" style="margin-right: 10px"></span> <span ng-repeat="item in banner.alerts" marked="item"></span> </div> <script type="text/javascript" async src="https://yogaloft.tulasoftware.com/assets/calendar-widget.js"><\/script><a class="tulasoftware-calendar-widget" href="https://yogaloft.tulasoftware.com/calendar/embed">Studio Calendar</a> '),t.put("views/workshops.html",'<div class="alert alert-info" ng-show="workshop.notes && workshop.notes.length"> <span ng-repeat="note in workshop.notes" marked="note"></span> </div> <div class="alert alert-warning" ng-show="workshop.warnings && workshop.warnings.length"> <span ng-repeat="warning in workshop.warnings" marked="warning"></span> </div> <div class="alert alert-danger" ng-show="workshop.alerts && workshop.alerts.length"> <span ng-repeat="alert in workshop.alerts" marked="alert"></span> </div> <div ng-show="workshopId"> <div class="clearfix content-heading"> <a href="#!/teachers/{{instructor.id}}" ng-repeat="instructor in workshop.instructors"> <img class="pull-left" style="border-radius: 50%; width: 64px; height: 64px; margin-right: 20px" ng-src="https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/{{instructor.id}}/128x128.png"> </a> <h1>{{workshop.name}}</h1> </div> <ul ng-show="workshop.dates"> <li ng-repeat="d in workshop.dates"> {{d.date | date:\'EEEE MMMM d, yyyy\'}} {{d.start}} - {{d.end}} </li> </ul> <h3> with <span ng-repeat="instructor in workshop.instructors"><span ng-show="$last && !$first"> &amp; </span><span ng-show="$middle">, </span><a href="#!/teachers/{{workshop.instructor.id}}">{{instructor.name}}</a></span> </h3> <div marked="markdown"></div> <div ng-if="passes && passes.length"> <script type="text/javascript" async src="https://yogaloft.tulasoftware.com/assets/purchase-widget.js"><\/script><a class="tulasoftware-purchase-widget" href="{{passes}}">Purchase</a> </div> </div> <ul ng-show="workshops"> <li ng-repeat="workshop in workshops"> <a href="#!/workshops/{{workshop.id}}"> {{workshop.name}} </a> </li> </ul> <div ng-hide="workshops || workshopId"> <p>There are no upcoming workshops. :(</p> </div> ')}]);