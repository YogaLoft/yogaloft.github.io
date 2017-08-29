"use strict";angular.module("ylngApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngIcal","hc.marked"]).run(["$window",function(a){a.fbAsyncInit=function(){FB.init({appId:"1434342883499221",status:!0,cookie:!0,xfbml:!0,version:"v2.5"})},function(a,b){var c,d=a.getElementsByTagName("script")[0];a.getElementById(b)||(c=a.createElement("script"),c.id=b,c.async=!0,c.src="//connect.facebook.net/en_GB/sdk.js",d.parentNode.insertBefore(c,d))}(document,"facebook-jssdk")}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/teachers/:instructor",{templateUrl:"views/teachers.html",controller:"TeachersCtrl",controllerAs:"teachers"}).otherwise({redirectTo:"/"})}]),angular.module("ylngApp").controller("MainCtrl",["$scope","classCalendar",function(a,b){b.banner().then(function(b){a.banner=b});var c=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d=new Date;d.setDate(d.getDate()-1);var e=new Date;e.setDate(e.getDate()+4),b.query().then(function(b){a.upcomingClasses=b.filter(function(a){return a.start<e&&a.start>d}).map(function(a){return{sort:a.start,day:c[a.start.getDay()],start:a.start.toTimeString().substring(0,5),end:a.end.toTimeString().substring(0,5),class:{url:"#!/classes/"+c[a.start.getDay()]+"/"+a.class.replace(/ /g,"-"),name:a.class},instructor:{name:a.instructor,url:"#!/teachers/"+a.instructor.replace(/ /g,"-"),image:"https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/"+a.instructor.replace(/ /g,"-")+"/24x24.png"},location:a.location}}),a.upcomingClasses.sort(function(a,b){return a.sort-b.sort})},function(a){console.log(a.statusText)}),a.days=[];for(var f=new Date,g=0;g<3;g++)g>0&&f.setDate(f.getDate()+1),0===f.getDay()&&f.setDate(f.getDate()+1),a.days.push(c[f.getDay()])}]),angular.module("ylngApp").controller("AboutCtrl",function(){}),angular.module("ylngApp").controller("TeachersCtrl",["$scope","$routeParams","$http","classCalendar",function(a,b,c,d){d.teachers().then(function(e){var f=e.find(function(a){return a.id===b.instructor});c.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/"+f.id+"/profile.md").then(function(b){a.teacher={id:f.id,name:f.name,markdown:b.data,image:{source:"https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/"+f.id+"/220x220.jpg",alt:"Profile photo of "+f.name},facebook:!!f.facebook&&f.facebook}}),d.index().then(function(c){for(var d in c)c.hasOwnProperty(d)&&(c[d]=c[d].filter(function(a){return a.instructor.id===b.instructor}));a.ci=c},function(a){console.log(a.statusText)})},function(a){console.log(a.statusText)})}]),angular.module("ylngApp").service("classCalendar",["$http","ical",function(a,b){this.query=function(){return a.get("https://crossorigin.me/http://yogaloft.tulasoftware.com/calendar/feed.ics").then(function(a){return new b.Component(b.parse(a.data)).getAllSubcomponents("vevent").map(function(a){var b=a.getFirstPropertyValue("dtstart"),c=a.getFirstPropertyValue("dtend"),d=a.getFirstPropertyValue("summary").split(" - ");return{start:new Date(b.year,b.month-1,b.day,b.hour,b.minute),end:new Date(b.year,c.month-1,c.day,c.hour,c.minute),class:d[0],instructor:d[1],location:a.getFirstPropertyValue("location")}})},function(a){throw a.status+" : "+a.data})},this.index=function(){return a.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/classes/index.json?"+Math.random()).then(function(a){return a.data},function(a){throw a.status+" : "+a.data})},this.faq=function(){return a.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/faq/index.json?"+Math.random()).then(function(a){return a.data},function(a){throw a.status+" : "+a.data})},this.teachers=function(){return a.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/index.json?"+Math.random()).then(function(a){return a.data},function(a){throw a.status+" : "+a.data})},this.banner=function(){return a.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/banner.json?"+Math.random()).then(function(a){var b=new Date;return{notes:a.data.notes.filter(function(a){return new Date(a.from)<b&&new Date(a.to)>b}).map(function(a){return a.message}),warnings:a.data.warnings.filter(function(a){return new Date(a.from)<b&&new Date(a.to)>b}).map(function(a){return a.message}),alerts:a.data.alerts.filter(function(a){return new Date(a.from)<b&&new Date(a.to)>b}).map(function(a){return a.message})}},function(a){throw a.status+" : "+a.data})},this.workshops=function(){return a.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/workshops/index.json?"+Math.random()).then(function(a){return a.data},function(a){throw a.status+" : "+a.data})}}]),angular.module("ylngApp").controller("TestCtrl",["$scope","classCalendar",function(a,b){b.query().then(function(b){a.calendar=b},function(a){console.log(a.statusText)})}]),angular.module("ylngApp").controller("TimetableCtrl",["$scope","classCalendar",function(a,b){b.banner().then(function(b){a.banner=b})}]),angular.module("ylngApp").controller("AccountCtrl",function(){}),angular.module("ylngApp").controller("MapCtrl",["$scope","$http",function(a,b){b.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/directions.md").then(function(b){a.markdown=b.data})}]),angular.module("ylngApp").controller("ClassesCtrl",["$scope","$routeParams","$http","classCalendar",function(a,b,c,d){a.weekday=void 0!==b.weekday&&b.weekday,d.index().then(function(c){if(a.weekday){var d=c[b.weekday].find(function(a){return a.id===b.class});d.passes&&d.passes.length&&(a.passes="https://yogaloft.tulasoftware.com/external_form?",d.passes.forEach(function(b){a.passes+="&p[]="+b})),a.class=d}},function(a){console.log(a.statusText)}),a.weekday?c.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/classes/"+a.weekday+"/"+b.class+".md").then(function(b){a.markdown=b.data}):c.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/classes/"+b.class+".md").then(function(b){a.markdown=b.data})}]),angular.module("ylngApp").controller("PricesCtrl",function(){}),angular.module("ylngApp").controller("FaqCtrl",["$scope","classCalendar",function(a,b){b.faq().then(function(b){a.faq=b},function(a){console.log(a.statusText)})}]),angular.module("ylngApp").controller("WorkshopsCtrl",["$scope","$routeParams","$http","classCalendar",function(a,b,c,d){a.workshopId=void 0!==b.workshop&&b.workshop,d.workshops().then(function(b){if(a.workshopId){var d=b.find(function(b){return b.id===a.workshopId});d.passes&&d.passes.length&&(a.passes="https://yogaloft.tulasoftware.com/external_form?",d.passes.forEach(function(b){a.passes+="&p[]="+b})),a.workshop=d,c.get("https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/workshops/"+a.workshopId+".md").then(function(b){a.markdown=b.data})}else a.workshops=b.filter(function(a){return new Date(a.display.from)<new Date&&new Date(a.display.to)>new Date})},function(a){console.log(a.statusText)})}]),angular.module("ylngApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/account.html",'<script type="text/javascript" async src="https://yogaloft.tulasoftware.com/assets/student-widget.js"><\/script><a class="tulasoftware-student-widget" href="https://yogaloft.tulasoftware.com/student/account/summary">My Account</a>'),a.put("views/classes.html",'<div class="alert alert-info" ng-show="class.notes && class.notes.length"> <span ng-repeat="note in class.notes" marked="note"></span> </div> <div class="alert alert-warning" ng-show="class.warnings && class.warnings.length"> <span ng-repeat="warning in class.warnings" marked="warning"></span> </div> <div class="alert alert-danger" ng-show="class.alerts && class.alerts.length"> <span ng-repeat="alert in class.alerts" marked="alert"></span> </div> <div class="clearfix content-heading"> <a href="#!/teachers/{{class.instructor.id}}" ng-show="weekday"> <img class="pull-left" style="border-radius: 50%; width: 64px; height: 64px; margin-right: 20px" ng-src="https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/{{class.instructor.id}}/128x128.png"> </a> <h1>{{class.name}}</h1> </div> <h2 ng-show="weekday"> <i class="fa fa-clock-o"></i> {{weekday}} {{class.start}} - {{class.end}} </h2> <h3 ng-show="weekday">with <a href="#!/teachers/{{class.instructor.id}}">{{class.instructor.name}}</a></h3> <div marked="markdown"></div> <div ng-if="class && passes && passes.length"> <script type="text/javascript" async src="https://yogaloft.tulasoftware.com/assets/purchase-widget.js"><\/script><a class="tulasoftware-purchase-widget" href="{{passes}}">Purchase</a> </div>'),a.put("views/faq.html",'<h1>frequently asked questions</h1> <div ng-repeat="category in faq"> <h2>{{category.category}}</h2> <div class="panel panel-default" ng-repeat="question in category.items"> <div class="panel-heading" ng-click="question.show=!question.show"> <h3 class="panel-title">{{question.question}}</h3> </div> <div class="panel-body" ng-show="question.show"> <span ng-repeat="answer in question.answer.text" marked="answer"></span> <blockquote ng-if="question.answer.quote.text"> <span ng-repeat="quote in question.answer.quote.text" marked="quote"></span> <footer ng-if="question.answer.quote.cite"> <cite> <a ng-if="question.answer.quote.cite.url" href="{{question.answer.quote.cite.url}}"> {{question.answer.quote.cite.text}} </a> <span ng-if="!question.answer.quote.cite.url"> {{question.answer.quote.cite.text}} </span> </cite> </footer> </blockquote> </div> </div> </div> <div id="disqus_thread"></div> <script>var disqus_config = function () {\n  this.page.url = \'http://yogaloft.co.uk/#!/faq\';\n  this.page.identifier = \'faq\';\n};\n(function() {\nvar d = document, s = d.createElement(\'script\');\ns.src = \'//yogaloft.disqus.com/embed.js\';\ns.setAttribute(\'data-timestamp\', +new Date());\n(d.head || d.body).appendChild(s);\n})();<\/script>'),a.put("views/main.html",'<div class="alert alert-info" ng-show="banner.notes && banner.notes.length && !banner.hidenotes"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidenotes = !banner.hidenotes"></span> </span> <span class="pull-left glyphicon glyphicon-info-sign" style="margin-right: 10px"></span> <span ng-repeat="item in banner.notes" marked="item"></span> </div> <div class="alert alert-warning" ng-show="banner.warnings && banner.warnings.length && !banner.hidewarnings"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidewarnings = !banner.hidewarnings"></span> </span> <span class="pull-left glyphicon glyphicon-warning-sign" style="margin-right: 10px"></span> <span ng-repeat="item in banner.warnings" marked="item"></span> </div> <div class="alert alert-danger" ng-show="banner.alerts && banner.alerts.length && !banner.hidealerts"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidealerts = !banner.hidealerts"></span> </span> <span class="pull-left glyphicon glyphicon-alert" style="margin-right: 10px"></span> <span ng-repeat="item in banner.alerts" marked="item"></span> </div> <div id="slides"> <div> <img src="images/crescent-moon-lunge.1faa45e5.jpg" alt="Yoga students in a crescent moon lunge."> </div> <div> <img src="images/meditation.025e4424.jpg" alt="Yoga students in a meditative moment."> </div> <div> <img src="images/side-stretch-warm-up.b92a25e4.jpg" alt="Yoga students doing side stretches as part of a warm up."> </div> </div> <div> <h2>Classes at the Yoga Loft, Whimple Street suspended</h2> <p>Due to circumstances beyond our control, timetabled classes are currently suspended. Please see the <a href="https://www.facebook.com/YogaLoftPlymouth">facebook page</a> for further details and updates.</p> </div> <div> <div class="col-md-3"> <div class="fb-page" data-href="https://www.facebook.com/YogaLoftPlymouth" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"></div> </div> <div class="clearfix"></div> </div> <script type="text/javascript">$(document).ready(function () {\n    $("#slides > div:gt(0)").hide();\n    setInterval(function () {\n'+"      $('#slides > div:first').fadeOut(1000).next().fadeIn(1000).end().appendTo('#slides');\n    }, 6000);\n  });<\/script>"),a.put("views/map.html",'<h1>How to find us</h1> <h2>in the heart of Plymouth city centre</h2> <div id="map_canvas" style="height: 400px"> <noscript><img src="/Images/map.png" alt="Map to Yoga Loft, 11 Whimple Street, Plymouth, PL1 2DH"/></noscript> </div> <div marked="markdown"></div> <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?v=3.exp&amp;callback=init_map"><\/script> <script type="text/javascript">function init_map() {\n    var coordinates = new google.maps.LatLng(50.369754, -4.139047);\n    var options = { center: coordinates, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP };\n    var map = new google.maps.Map(document.getElementById("map_canvas"), options);\n    var marker = new google.maps.Marker({ title: \'The Yoga Loft\', position: coordinates, map: map, icon: \'images/marker.19cf6c5e.png\', shadow: \'images/shadow.png\' });\n    var bubble = new google.maps.InfoWindow({ content: \'<div style="width: 280px;"><p><img src="images/cafe-rouge.jpg" style="float: left; margin-right: 20px;" /><strong>The Yoga Loft</strong><br />11 Whimple Street<br />Plymouth PL1 2DH</p></div>\' });\n    google.maps.event.addListener(marker, \'click\', function() { bubble.open(map, marker); });\n  }<\/script>'),a.put("views/prices.html",'<h1>Class rates</h1> <div class="row-fluid"> <p>You are welcome to drop-in anytime or you may book ahead. Membership is <strong>not</strong> required. You can use the form below to pay in advance for your session passes. You can also pay in cash or with a card at the Loft but it\'s nice if you can do it here in advance, so that your instructor is free to concentrate on Yoga rather than taking payments.</p> <table class="table table-hover table-striped"> <thead> <tr> <th></th> <th colspan="3" class="text-center" style="border-left: 1px solid #dddddd"> full sessions (1&frac12; ~ 2 hours) </th> <th colspan="3" class="text-center" style="border-left: 1px solid #dddddd"> short sessions (1 hour) </th> </tr> <tr> <th></th> <th class="text-right" style="border-left: 1px solid #dddddd"> 1 class </th> <th class="text-right"> 5 classes </th> <th class="text-right"> 10 classes </th> <th class="text-right" style="border-left: 1px solid #dddddd"> 1 class </th> <th class="text-right"> 5 classes </th> <th class="text-right"> 10 classes </th> </tr> </thead> <tbody> <tr> <th>Anyone</th> <td class="text-right" style="border-left: 1px solid #dddddd"> &pound;8.00 </td> <td class="text-right"> &pound;40.00 </td> <td class="text-right"> &pound;72.00 </td> <td class="text-right" style="border-left: 1px solid #dddddd"> &pound;6.00 </td> <td class="text-right"> &pound;30.00 </td> <td class="text-right"> &pound;60.00 </td> </tr> <tr> <th>Concessions</th> <td class="text-right" style="border-left: 1px solid #dddddd"> &pound;7.00 </td> <td class="text-right"> &pound;35.00 </td> <td class="text-right"> &pound;63.00 </td> <td class="text-right" style="border-left: 1px solid #dddddd"> </td> <td class="text-right"> </td> <td class="text-right"> </td> </tr> <tr> <th>Children</th> <td class="text-right text-muted" style="border-left: 1px solid #dddddd"></td> <td class="text-right text-muted"></td> <td class="text-right text-muted"></td> <td class="text-right" style="border-left: 1px solid #dddddd"> &pound;5.00 </td> <td class="text-right text-muted"></td> <td class="text-right text-muted"></td> </tr> <tr> <th>Freestyle &amp; Acroyoga</th> <td class="text-right" style="border-left: 1px solid #dddddd"> &pound;5.00 </td> <td class="text-right text-muted"></td> <td class="text-right text-muted"></td> <td class="text-right text-muted" style="border-left: 1px solid #dddddd"></td> <td class="text-right text-muted"></td> <td class="text-right text-muted"></td> </tr> </tbody> </table> \x3c!--\n  <h3>Monthly Memberships</h3>\n  <p>There is no minimum membership period and you can cancel with immediate effect at any time, by cancelling your recurring payment.</p>\n\n  <table class="table table-hover table-striped">\n    <thead>\n      <tr>\n        <th></th>\n        <th class="text-right">\n          up to 5 classes per month\n        </th>\n        <th class="text-right">\n          unlimited classes\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <th>Anyone</th>\n        <td class="text-right">\n          &pound;32.00\n        </td>\n        <td class="text-right">\n          &pound;60.00\n        </td>\n      </tr>\n      <tr>\n        <th>Concessions, Students, Seniors, Services</th>\n        <td class="text-right">\n          &pound;28.00\n        </td>\n        <td class="text-right">\n          &pound;54.00\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  --\x3e </div> <div class="row-fluid"> <script type="text/javascript" async src="https://yogaloft.tulasoftware.com/assets/purchase-widget.js"><\/script><a class="tulasoftware-purchase-widget" href="https://yogaloft.tulasoftware.com/external_form">Purchase</a> </div> <div class="row-fluid"> <h2>Pricing and online purchase policy</h2> <h3>Timetabled class passes</h3> <ul> <li>All timetabled class pass sessions bought online, <strong>never expire</strong> and are valid until used. There is no time limit.</li> <li>Passes can be used for <strong>any class</strong> with the same, or shorter, session length. They are not tied to a specific class.</li> <li>You may also buy passes to give away to your friends or family (ask at the studio, to have passes transfered to someone else).</li> <li>If pass prices go up in the future, we will continue to accept passes purchased previously at the lower price.</li> </ul> <h3><a name="Concessions" style="text-decoration: none; color: #000000">Concessions</a></h3> <p>We offer discounted rates on the evening classes for:</p> <ul> <li>Students</li> <li>Seniors</li> <li>Services Personnel (past or present)</li> <li>NHS Staff &amp; Care Workers</li> </ul> <p>On your first visit, we may ask to see ID showing your entitlement and make a note on your account. On subsequent visits, there is no need to show ID. Just select the discount passes in the payment form.</p> <p>If you need a concession for reasons not listed here, just ask. All requests will receive due consideration.</p> <p>There is also a Monday <a href="#!/classes/Monday/Community-Class">Community Class</a>, where admission is donation based. You may give whatever you can afford, attend free of charge if you need to, or make a contribution that isn\'t money, like making a "pay it forward" donation of your time to a charitable cause or doing something selfless and heroic for someone who needs you.</p> <h3><a name="Freestyle" style="text-decoration: none; color: #000000">Freestyle</a></h3> <p>Freestyle passes are used for personal practice time at the loft. They cover a pre-booked, pre-paid, personal practice session of up to 2 hours without an instructor present. We also use them for some special-offer classes, Acroyoga and Community class (which is donation based).</p> \x3c!--\n  <h3>Membership passes</h3>\n  <p>Membership passes are valid for one month from the date of purchase.</p>\n  <p>Membership passes will automatically renew each month unless cancelled or payment fails.</p>\n  <p>Membership passes are non-refundable and non-transferable. Please use them while they are valid.</p>\n  --\x3e </div> <hr>'),a.put("views/teachers.html",'<img src="{{teacher.image.source}}" alt="{{teacher.image.alt}}" class="img-rounded pull-left" style="margin-right: 1em; margin-bottom: 0.5em"> <div marked="teacher.markdown"></div> <div class="clearfix" style="margin: 10px"></div> <div ng-if="teacher.facebook"> <div class="fb-page pull-left" data-href="https://www.facebook.com/{{teacher.facebook}}" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"></div> </div> <div class="col-md-6"> <h4>Classes with {{teacher.name.split(\' \')[0]}} at the Yoga Loft</h4> <ul ng-repeat="(day, classes) in ci" class="list-unstyled"> <li ng-repeat="class in classes"> {{day}}, {{class.start}}: <a href="#!/classes/{{day}}/{{class.id}}">{{class.name}}</a> </li> </ul> </div> <div class="clearfix" style="margin: 10px"></div>'),a.put("views/test.html","<pre>{{calendar | json}}</pre>"),a.put("views/timetable.html",'<div class="alert alert-info" ng-show="banner.notes && banner.notes.length && !banner.hidenotes"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidenotes = !banner.hidenotes"></span> </span> <span class="pull-left glyphicon glyphicon-info-sign" style="margin-right: 10px"></span> <span ng-repeat="item in banner.notes" marked="item"></span> </div> <div class="alert alert-warning" ng-show="banner.warnings && banner.warnings.length && !banner.hidewarnings"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidewarnings = !banner.hidewarnings"></span> </span> <span class="pull-left glyphicon glyphicon-warning-sign" style="margin-right: 10px"></span> <span ng-repeat="item in banner.warnings" marked="item"></span> </div> <div class="alert alert-danger" ng-show="banner.alerts && banner.alerts.length && !banner.hidealerts"> <span class="pull-right"> <span class="glyphicon glyphicon-remove" ng-click="banner.hidealerts = !banner.hidealerts"></span> </span> <span class="pull-left glyphicon glyphicon-alert" style="margin-right: 10px"></span> <span ng-repeat="item in banner.alerts" marked="item"></span> </div> <script type="text/javascript" async src="https://yogaloft.tulasoftware.com/assets/calendar-widget.js"><\/script><a class="tulasoftware-calendar-widget" href="https://yogaloft.tulasoftware.com/calendar/embed">Studio Calendar</a>'),a.put("views/workshops.html",'<div class="alert alert-info" ng-show="workshop.notes && workshop.notes.length"> <span ng-repeat="note in workshop.notes" marked="note"></span> </div> <div class="alert alert-warning" ng-show="workshop.warnings && workshop.warnings.length"> <span ng-repeat="warning in workshop.warnings" marked="warning"></span> </div> <div class="alert alert-danger" ng-show="workshop.alerts && workshop.alerts.length"> <span ng-repeat="alert in workshop.alerts" marked="alert"></span> </div> <div ng-show="workshopId"> <div class="clearfix content-heading"> <a href="#!/teachers/{{instructor.id}}" ng-repeat="instructor in workshop.instructors"> <img class="pull-left" style="border-radius: 50%; width: 64px; height: 64px; margin-right: 20px" ng-src="https://raw.githubusercontent.com/YogaLoft/yogaloft-content/master/teachers/{{instructor.id}}/128x128.png"> </a> <h1>{{workshop.name}}</h1> </div> <ul ng-show="workshop.dates"> <li ng-repeat="d in workshop.dates"> {{d.date | date:\'EEEE MMMM d, yyyy\'}} {{d.start}} - {{d.end}} </li> </ul> <h3> with <span ng-repeat="instructor in workshop.instructors"><span ng-show="$last && !$first"> &amp; </span><span ng-show="$middle">, </span><a href="#!/teachers/{{workshop.instructor.id}}">{{instructor.name}}</a></span> </h3> <div marked="markdown"></div> <div ng-if="passes && passes.length"> <script type="text/javascript" async src="https://yogaloft.tulasoftware.com/assets/purchase-widget.js"><\/script><a class="tulasoftware-purchase-widget" href="{{passes}}">Purchase</a> </div> </div> <ul ng-show="workshops"> <li ng-repeat="workshop in workshops"> <a href="#!/workshops/{{workshop.id}}"> {{workshop.name}} </a> </li> </ul> <div ng-hide="workshops || workshopId"> <p>There are no upcoming workshops. :(</p> </div>')}]);