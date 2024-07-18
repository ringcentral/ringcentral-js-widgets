"use strict";require("core-js/modules/es.symbol");require("core-js/modules/es.symbol.description");require("core-js/modules/es.symbol.iterator");require("core-js/modules/es.array.concat");require("core-js/modules/es.array.every");require("core-js/modules/es.array.filter");require("core-js/modules/es.array.find");require("core-js/modules/es.array.for-each");require("core-js/modules/es.array.from");require("core-js/modules/es.array.index-of");require("core-js/modules/es.array.is-array");require("core-js/modules/es.array.iterator");require("core-js/modules/es.array.join");require("core-js/modules/es.array.last-index-of");require("core-js/modules/es.array.map");require("core-js/modules/es.array.reduce");require("core-js/modules/es.array.reduce-right");require("core-js/modules/es.array.reverse");require("core-js/modules/es.array.slice");require("core-js/modules/es.array.some");require("core-js/modules/es.array.sort");require("core-js/modules/es.array.splice");require("core-js/modules/es.date.to-string");require("core-js/modules/es.function.bind");require("core-js/modules/es.function.name");require("core-js/modules/es.number.constructor");require("core-js/modules/es.number.to-fixed");require("core-js/modules/es.object.define-property");require("core-js/modules/es.object.get-prototype-of");require("core-js/modules/es.object.keys");require("core-js/modules/es.object.to-string");require("core-js/modules/es.parse-float");require("core-js/modules/es.parse-int");require("core-js/modules/es.promise");require("core-js/modules/es.promise.finally");require("core-js/modules/es.regexp.constructor");require("core-js/modules/es.regexp.exec");require("core-js/modules/es.regexp.to-string");require("core-js/modules/es.string.iterator");require("core-js/modules/es.string.match");require("core-js/modules/es.string.repeat");require("core-js/modules/es.string.replace");require("core-js/modules/es.string.search");require("core-js/modules/es.string.split");require("core-js/modules/es.string.starts-with");require("core-js/modules/es.string.trim");require("core-js/modules/es.string.link");require("core-js/modules/web.dom-collections.for-each");require("core-js/modules/web.dom-collections.iterator");require("core-js/modules/web.timers");function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o;}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o;},_typeof(o);}//! api-check version 7.5.5 built with ♥ by Kent C. Dodds <kent@doddsfamily.us> (http://kent.doddsfamily.us) (ó ì_í)=óò=(ì_í ò)
(function webpackUniversalModuleDefinition(root,factory){if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object'&&(typeof module==="undefined"?"undefined":_typeof(module))==='object')module.exports=factory();else if(typeof define==='function'&&define.amd)define(factory);else if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object')exports["apiCheck"]=factory();else root["apiCheck"]=factory();})(void 0,function(){return/******/function(modules){// webpackBootstrap
/******/ // The module cache
/******/var installedModules={};/******/ // The require function
/******/function __webpack_require__(moduleId){/******/ // Check if module is in cache
/******/if(installedModules[moduleId])/******/return installedModules[moduleId].exports;/******/ // Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/exports:{},/******/id:moduleId,/******/loaded:false/******/};/******/ // Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******/ // Flag the module as loaded
/******/module.loaded=true;/******/ // Return the exports of the module
/******/return module.exports;/******/}/******/ // expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******/ // expose the module cache
/******/__webpack_require__.c=installedModules;/******/ // __webpack_public_path__
/******/__webpack_require__.p="";/******/ // Load entry module and return exports
/******/return __webpack_require__(0);/******/}/************************************************************************/ /******/([/* 0 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _apiCheck=__webpack_require__(1);var _apiCheck2=_interopRequireDefault(_apiCheck);exports['default']=_apiCheck2['default'];module.exports=exports['default'];/***/},/* 1 */ /***/function(module,exports,__webpack_require__){'use strict';var stringify=__webpack_require__(2);var apiCheckUtil=__webpack_require__(3);var each=apiCheckUtil.each;var isError=apiCheckUtil.isError;var t=apiCheckUtil.t;var arrayify=apiCheckUtil.arrayify;var getCheckerDisplay=apiCheckUtil.getCheckerDisplay;var typeOf=apiCheckUtil.typeOf;var getError=apiCheckUtil.getError;var checkers=__webpack_require__(4);var apiCheckApis=getApiCheckApis();module.exports=getApiCheckInstance;module.exports.VERSION="7.5.5";module.exports.utils=apiCheckUtil;module.exports.globalConfig={verbose:false,disabled:false};var apiCheckApiCheck=getApiCheckInstance({output:{prefix:'apiCheck'}});module.exports.internalChecker=apiCheckApiCheck;each(checkers,function(checker,name){return module.exports[name]=checker;});function getApiCheckInstance(){var config=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var extraCheckers=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];/* eslint complexity:[2, 6] */if(apiCheckApiCheck&&arguments.length){apiCheckApiCheck['throw'](apiCheckApis.getApiCheckInstanceCheckers,arguments,{prefix:'creating an apiCheck instance'});}var additionalProperties={'throw':getApiCheck(true),warn:getApiCheck(false),getErrorMessage:getErrorMessage,handleErrorMessage:handleErrorMessage,config:{output:config.output||{prefix:'',suffix:'',docsBaseUrl:''},verbose:config.verbose||false,disabled:config.disabled||false},utils:apiCheckUtil};each(additionalProperties,function(wrapper,name){return apiCheck[name]=wrapper;});var disabled=apiCheck.disabled||module.exports.globalConfig.disabled;each(checkers.getCheckers(disabled),function(checker,name){return apiCheck[name]=checker;});each(extraCheckers,function(checker,name){return apiCheck[name]=checker;});return apiCheck;/**
	   * This is the instance function. Other things are attached to this see additional properties above.
	   * @param {Array} api - the checkers to check with
	   * @param {Array} args - the args to check
	   * @param {Object} output - output options
	   * @returns {Object} - if this has a failed = true property, then it failed
	   */function apiCheck(api,args,output){/* eslint complexity:[2, 8] */if(apiCheck.config.disabled||module.exports.globalConfig.disabled){return{apiTypes:{},argTypes:{},passed:true,message:'',failed:false};// empty version of what is normally returned
}checkApiCheckApi(arguments);if(!Array.isArray(api)){api=[api];args=[args];}else{// turn arguments into an array
args=Array.prototype.slice.call(args);}var messages=checkEnoughArgs(api,args);if(!messages.length){// this is where we actually go perform the checks.
messages=checkApiWithArgs(api,args);}var returnObject=getTypes(api,args);returnObject.args=args;if(messages.length){returnObject.message=apiCheck.getErrorMessage(api,args,messages,output);returnObject.failed=true;returnObject.passed=false;}else{returnObject.message='';returnObject.failed=false;returnObject.passed=true;}return returnObject;}/**
	   * checkApiCheckApi, should be read like: check apiCheck api. As in, check the api for apiCheck :-)
	   * @param {Array} checkApiArgs - args provided to apiCheck function
	   */function checkApiCheckApi(checkApiArgs){var api=checkApiArgs[0];var args=checkApiArgs[1];var isArrayOrArgs=Array.isArray(args)||args&&_typeof(args)==='object'&&typeof args.length==='number';if(Array.isArray(api)&&!isArrayOrArgs){throw new Error(getErrorMessage(api,[args],['If an array is provided for the api, an array must be provided for the args as well.'],{prefix:'apiCheck'}));}// dog fooding here
var errors=checkApiWithArgs(apiCheckApis.checkApiCheckApi,checkApiArgs);if(errors.length){var message=apiCheck.getErrorMessage(apiCheckApis.checkApiCheckApi,checkApiArgs,errors,{prefix:'apiCheck'});apiCheck.handleErrorMessage(message,true);}}function getApiCheck(shouldThrow){return function apiCheckWrapper(api,args,output){var result=apiCheck(api,args,output);apiCheck.handleErrorMessage(result.message,shouldThrow);return result;// wont get here if an error is thrown
};}function handleErrorMessage(message,shouldThrow){if(shouldThrow&&message){throw new Error(message);}else if(message){/* eslint no-console:0 */console.warn(message);}}function getErrorMessage(api,args){var messages=arguments.length<=2||arguments[2]===undefined?[]:arguments[2];var output=arguments.length<=3||arguments[3]===undefined?{}:arguments[3];var gOut=apiCheck.config.output||{};var prefix=getPrefix();var suffix=getSuffix();var url=getUrl();var message='apiCheck failed! '+messages.join(', ');var passedAndShouldHavePassed='\n\n'+buildMessageFromApiAndArgs(api,args);return(prefix+' '+message+' '+suffix+' '+(url||'')+passedAndShouldHavePassed).trim();function getPrefix(){var p=output.onlyPrefix;if(!p){p=((gOut.prefix||'')+' '+(output.prefix||'')).trim();}return p;}function getSuffix(){var s=output.onlySuffix;if(!s){s=((output.suffix||'')+' '+(gOut.suffix||'')).trim();}return s;}function getUrl(){var u=output.url;if(!u){u=gOut.docsBaseUrl&&output.urlSuffix&&(''+gOut.docsBaseUrl+output.urlSuffix).trim();}return u;}}function buildMessageFromApiAndArgs(api,args){var _getTypes=getTypes(api,args);var apiTypes=_getTypes.apiTypes;var argTypes=_getTypes.argTypes;var copy=Array.prototype.slice.call(args||[]);var replacedItems=[];replaceFunctionWithName(copy);var passedArgs=getObjectString(copy);argTypes=getObjectString(argTypes);apiTypes=getObjectString(apiTypes);return generateMessage();// functions
function replaceFunctionWithName(obj){each(obj,function(val,name){/* eslint complexity:[2, 6] */if(replacedItems.indexOf(val)===-1){// avoid recursive problems
replacedItems.push(val);if(_typeof(val)==='object'){replaceFunctionWithName(obj);}else if(typeof val==='function'){obj[name]=val.displayName||val.name||'anonymous function';}}});}function getObjectString(types){if(!types||!types.length){return'nothing';}else if(types&&types.length===1){types=types[0];}return stringify(types,null,2);}function generateMessage(){var n='\n';var useS=true;if(args&&args.length===1){if(_typeof(args[0])==='object'&&args[0]!==null){useS=!!Object.keys(args[0]).length;}else{useS=false;}}var types='type'+(useS?'s':'');var newLine=n+n;return'You passed:'+n+passedArgs+newLine+('With the '+types+':'+n+argTypes+newLine)+('The API calls for:'+n+apiTypes);}}function getTypes(api,args){api=arrayify(api);args=arrayify(args);var apiTypes=api.map(function(checker,index){var specified=module.exports.globalConfig.hasOwnProperty('verbose');return getCheckerDisplay(checker,{terse:specified?!module.exports.globalConfig.verbose:!apiCheck.config.verbose,obj:args[index],addHelpers:true});});var argTypes=args.map(function(arg){return getArgDisplay(arg,[]);});return{argTypes:argTypes,apiTypes:apiTypes};}}// STATELESS FUNCTIONS
/**
	 * This is where the magic happens for actually checking the arguments with the api.
	 * @param {Array} api - checkers
	 * @param  {Array} args - and arguments object
	 * @returns {Array} - the error messages
	 */function checkApiWithArgs(api,args){/* eslint complexity:[2, 7] */var messages=[];var failed=false;var checkerIndex=0;var argIndex=0;var arg=undefined,checker=undefined,res=undefined,lastChecker=undefined,argName=undefined,argFailed=undefined,skipPreviousChecker=undefined;/* jshint -W084 */while((checker=api[checkerIndex++])&&argIndex<args.length){arg=args[argIndex++];argName='Argument '+argIndex+(checker.isOptional?' (optional)':'');res=checker(arg,'value',argName);argFailed=isError(res);lastChecker=checkerIndex>=api.length;skipPreviousChecker=checkerIndex>1&&api[checkerIndex-1].isOptional;if(argFailed&&lastChecker||argFailed&&!lastChecker&&!checker.isOptional&&!skipPreviousChecker){failed=true;messages.push(getCheckerErrorMessage(res,checker,arg));}else if(argFailed&&checker.isOptional){argIndex--;}else{messages.push(t(argName)+' passed');}}return failed?messages:[];}checkerTypeType.type='function with __apiCheckData property and `${function.type}` property';function checkerTypeType(checkerType,name,location){var apiCheckDataChecker=checkers.shape({type:checkers.string,optional:checkers.bool});var asFunc=checkers.func.withProperties({__apiCheckData:apiCheckDataChecker});var asShape=checkers.shape({__apiCheckData:apiCheckDataChecker});var wrongShape=checkers.oneOfType([asFunc,asShape])(checkerType,name,location);if(isError(wrongShape)){return wrongShape;}if(typeof checkerType!=='function'&&!checkerType.hasOwnProperty(checkerType.__apiCheckData.type)){return getError(name,location,checkerTypeType.type);}}function getCheckerErrorMessage(res,checker,val){var checkerHelp=getCheckerHelp(checker,val);checkerHelp=checkerHelp?' - '+checkerHelp:'';return res.message+checkerHelp;}function getCheckerHelp(_ref,val){var help=_ref.help;if(!help){return'';}if(typeof help==='function'){help=help(val);}return help;}function checkEnoughArgs(api,args){var requiredArgs=api.filter(function(a){return!a.isOptional;});if(args.length<requiredArgs.length){return['Not enough arguments specified. Requires `'+requiredArgs.length+'`, you passed `'+args.length+'`'];}else{return[];}}function getArgDisplay(arg,gottenArgs){/* eslint complexity:[2, 7] */var cName=arg&&arg.constructor&&arg.constructor.name;var type=typeOf(arg);if(type==='function'){if(hasKeys()){var properties=stringify(getDisplayIfNotGotten());return cName+' (with properties: '+properties+')';}return cName;}if(arg===null){return'null';}if(type!=='array'&&type!=='object'){return type;}if(hasKeys()){return getDisplayIfNotGotten();}return cName;// utility functions
function hasKeys(){return arg&&Object.keys(arg).length;}function getDisplayIfNotGotten(){if(gottenArgs.indexOf(arg)!==-1){return'[Circular]';}gottenArgs.push(arg);return getDisplay(arg,gottenArgs);}}function getDisplay(obj,gottenArgs){var argDisplay={};each(obj,function(v,k){return argDisplay[k]=getArgDisplay(v,gottenArgs);});return argDisplay;}function getApiCheckApis(){var os=checkers.string.optional;var checkerFnChecker=checkers.func.withProperties({type:checkers.oneOfType([checkers.string,checkerTypeType]).optional,displayName:checkers.string.optional,shortType:checkers.string.optional,notOptional:checkers.bool.optional,notRequired:checkers.bool.optional});var getApiCheckInstanceCheckers=[checkers.shape({output:checkers.shape({prefix:checkers.string.optional,suffix:checkers.string.optional,docsBaseUrl:checkers.string.optional}).strict.optional,verbose:checkers.bool.optional,disabled:checkers.bool.optional}).strict.optional,checkers.objectOf(checkerFnChecker).optional];var checkApiCheckApi=[checkers.typeOrArrayOf(checkerFnChecker),checkers.any.optional,checkers.shape({prefix:os,suffix:os,urlSuffix:os,// appended case
onlyPrefix:os,onlySuffix:os,url:os// override case
}).strict.optional];return{checkerFnChecker:checkerFnChecker,getApiCheckInstanceCheckers:getApiCheckInstanceCheckers,checkApiCheckApi:checkApiCheckApi};}/***/},/* 2 */ /***/function(module,exports){module.exports=stringify;function getSerialize(fn,decycle){var seen=[],keys=[];decycle=decycle||function(key,value){return'[Circular '+getPath(value,seen,keys)+']';};return function(key,value){var ret=value;if(_typeof(value)==='object'&&value){if(seen.indexOf(value)!==-1)ret=decycle(key,value);else{seen.push(value);keys.push(key);}}if(fn)ret=fn(key,ret);return ret;};}function getPath(value,seen,keys){var index=seen.indexOf(value);var path=[keys[index]];for(index--;index>=0;index--){if(seen[index][path[0]]===value){value=seen[index];path.unshift(keys[index]);}}return'~'+path.join('.');}function stringify(obj,fn,spaces,decycle){return JSON.stringify(obj,getSerialize(fn,decycle),spaces);}stringify.getSerialize=getSerialize;/***/},/* 3 */ /***/function(module,exports,__webpack_require__){'use strict';function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var stringify=__webpack_require__(2);var checkerHelpers={addOptional:addOptional,getRequiredVersion:getRequiredVersion,setupChecker:setupChecker,addNullable:addNullable};module.exports={each:each,copy:copy,typeOf:typeOf,arrayify:arrayify,getCheckerDisplay:getCheckerDisplay,isError:isError,list:list,getError:getError,nAtL:nAtL,t:t,undef:undef,checkerHelpers:checkerHelpers,noop:noop};function copy(obj){var type=typeOf(obj);var daCopy=undefined;if(type==='array'){daCopy=[];}else if(type==='object'){daCopy={};}else{return obj;}each(obj,function(val,key){daCopy[key]=val;// cannot single-line this because we don't want to abort the each
});return daCopy;}function typeOf(obj){if(Array.isArray(obj)){return'array';}else if(obj instanceof RegExp){return'object';}else{return _typeof(obj);}}function getCheckerDisplay(checker,options){/* eslint complexity:[2, 7] */var display=undefined;var _short=options&&options["short"];if(_short&&checker.shortType){display=checker.shortType;}else if(!_short&&_typeof(checker.type)==='object'||checker.type==='function'){display=getCheckerType(checker,options);}else{display=getCheckerType(checker,options)||checker.displayName||checker.name;}return display;}function getCheckerType(_ref,options){var type=_ref.type;if(typeof type==='function'){var __apiCheckData=type.__apiCheckData;var typeTypes=type(options);type=_defineProperty({__apiCheckData:__apiCheckData},__apiCheckData.type,typeTypes);}return type;}function arrayify(obj){if(!obj){return[];}else if(Array.isArray(obj)){return obj;}else{return[obj];}}function each(obj,iterator,context){if(Array.isArray(obj)){return eachArry(obj,iterator,context);}else{return eachObj(obj,iterator,context);}}function eachObj(obj,iterator,context){var ret=undefined;var hasOwn=Object.prototype.hasOwnProperty;/* eslint prefer-const:0 */ // some weird eslint bug?
for(var key in obj){if(hasOwn.call(obj,key)){ret=iterator.call(context,obj[key],key,obj);if(ret===false){return ret;}}}return true;}function eachArry(obj,iterator,context){var ret=undefined;var length=obj.length;for(var i=0;i<length;i++){ret=iterator.call(context,obj[i],i,obj);if(ret===false){return ret;}}return true;}function isError(obj){return obj instanceof Error;}function list(arry,join,finalJoin){arry=arrayify(arry);var copy=arry.slice();var last=copy.pop();if(copy.length===1){join=' ';}return copy.join(join)+(''+(copy.length?join+finalJoin:'')+last);}function getError(name,location,checkerType){if(typeof checkerType==='function'){checkerType=checkerType({"short":true});}var stringType=_typeof(checkerType)!=='object'?checkerType:stringify(checkerType);return new Error(nAtL(name,location)+' must be '+t(stringType));}function nAtL(name,location){var tName=t(name||'value');var tLocation=!location?'':' at '+t(location);return''+tName+tLocation;}function t(thing){return'`'+thing+'`';}function undef(thing){return typeof thing==='undefined';}/**
	 * This will set up the checker with all of the defaults that most checkers want like required by default and an
	 * optional version
	 *
	 * @param {Function} checker - the checker to setup with properties
	 * @param {Object} properties - properties to add to the checker
	 * @param {boolean} disabled - when set to true, this will set the checker to a no-op function
	 * @returns {Function} checker - the setup checker
	 */function setupChecker(checker,properties,disabled){/* eslint complexity:[2, 9] */if(disabled){// swap out the checker for its own copy of noop
checker=getNoop();checker.isNoop=true;}if(typeof checker.type==='string'){checker.shortType=checker.type;}// assign all properties given
each(properties,function(prop,name){return checker[name]=prop;});if(!checker.displayName){checker.displayName='apiCheck '+t(checker.shortType||checker.type||checker.name)+' type checker';}if(!checker.notRequired){checker=getRequiredVersion(checker,disabled);}if(!checker.notNullable){addNullable(checker,disabled);}if(!checker.notOptional){addOptional(checker,disabled);}return checker;}function getRequiredVersion(checker,disabled){var requiredChecker=disabled?getNoop():function requiredChecker(val,name,location,obj){if(undef(val)&&!checker.isOptional){var tLocation=location?' in '+t(location):'';var type=getCheckerDisplay(checker,{"short":true});var stringType=_typeof(type)!=='object'?type:stringify(type);return new Error('Required '+t(name)+' not specified'+tLocation+'. Must be '+t(stringType));}else{return checker(val,name,location,obj);}};copyProps(checker,requiredChecker);requiredChecker.originalChecker=checker;return requiredChecker;}function addOptional(checker,disabled){var optionalCheck=disabled?getNoop():function optionalCheck(val,name,location,obj){if(!undef(val)){return checker(val,name,location,obj);}};// inherit all properties on the original checker
copyProps(checker,optionalCheck);optionalCheck.isOptional=true;optionalCheck.displayName=checker.displayName+' (optional)';optionalCheck.originalChecker=checker;// the magic line that allows you to add .optional to the end of the checkers
checker.optional=optionalCheck;fixType(checker,checker.optional);}function addNullable(checker,disabled){var nullableCheck=disabled?getNoop():function nullableCheck(val,name,location,obj){if(val!==null){return checker(val,name,location,obj);}};// inherit all properties on the original checker
copyProps(checker,nullableCheck);nullableCheck.isNullable=true;nullableCheck.displayName=checker.displayName+' (nullable)';nullableCheck.originalChecker=checker;// the magic line that allows you to add .nullable to the end of the checkers
checker.nullable=nullableCheck;fixType(checker,checker.nullable);if(!checker.notOptional){addOptional(checker.nullable,disabled);}}function fixType(checker,checkerCopy){// fix type, because it's not a straight copy...
// the reason is we need to specify type.__apiCheckData.optional as true for the terse/verbose option.
// we also want to add "(optional)" to the types with a string
if(_typeof(checkerCopy.type)==='object'){checkerCopy.type=copy(checkerCopy.type);// make our own copy of this
}else if(typeof checkerCopy.type==='function'){checkerCopy.type=function(){return checker.type.apply(checker,arguments);};}else{checkerCopy.type+=' (optional)';return;}checkerCopy.type.__apiCheckData=copy(checker.type.__apiCheckData)||{};// and this
checkerCopy.type.__apiCheckData.optional=true;}// UTILS
function copyProps(src,dest){each(Object.keys(src),function(key){return dest[key]=src[key];});}function noop(){}function getNoop(){/* eslint no-shadow:0 */ /* istanbul ignore next */return function noop(){};}/***/},/* 4 */ /***/function(module,exports,__webpack_require__){'use strict';var stringify=__webpack_require__(2);var _require=__webpack_require__(3);var typeOf=_require.typeOf;var each=_require.each;var copy=_require.copy;var getCheckerDisplay=_require.getCheckerDisplay;var isError=_require.isError;var arrayify=_require.arrayify;var list=_require.list;var getError=_require.getError;var nAtL=_require.nAtL;var t=_require.t;var checkerHelpers=_require.checkerHelpers;var undef=_require.undef;var setupChecker=checkerHelpers.setupChecker;var checkers=module.exports=getCheckers();module.exports.getCheckers=getCheckers;function getCheckers(disabled){return{array:typeOfCheckGetter('Array'),bool:typeOfCheckGetter('Boolean'),number:typeOfCheckGetter('Number'),string:typeOfCheckGetter('String'),func:funcCheckGetter(),object:objectCheckGetter(),emptyObject:emptyObjectCheckGetter(),instanceOf:instanceCheckGetter,oneOf:oneOfCheckGetter,oneOfType:oneOfTypeCheckGetter,arrayOf:arrayOfCheckGetter,objectOf:objectOfCheckGetter,typeOrArrayOf:typeOrArrayOfCheckGetter,range:rangeCheckGetter,lessThan:lessThanCheckGetter,greaterThan:greaterThanCheckGetter,shape:getShapeCheckGetter(),args:argumentsCheckerGetter(),any:anyCheckGetter(),'null':nullCheckGetter()};function typeOfCheckGetter(type){var lType=type.toLowerCase();return setupChecker(function typeOfCheckerDefinition(val,name,location){if(typeOf(val)!==lType){return getError(name,location,type);}},{type:type},disabled);}function funcCheckGetter(){var type='Function';var functionChecker=setupChecker(function functionCheckerDefinition(val,name,location){if(typeOf(val)!=='function'){return getError(name,location,type);}},{type:type},disabled);functionChecker.withProperties=function getWithPropertiesChecker(properties){var apiError=checkers.objectOf(checkers.func)(properties,'properties','apiCheck.func.withProperties');if(isError(apiError)){throw apiError;}var shapeChecker=checkers.shape(properties,true);shapeChecker.type.__apiCheckData.type='func.withProperties';return setupChecker(function functionWithPropertiesChecker(val,name,location){var notFunction=checkers.func(val,name,location);if(isError(notFunction)){return notFunction;}return shapeChecker(val,name,location);},{type:shapeChecker.type,shortType:'func.withProperties'},disabled);};return functionChecker;}function objectCheckGetter(){var type='Object';var nullType='Object (null ok)';var objectNullOkChecker=setupChecker(function objectNullOkCheckerDefinition(val,name,location){if(typeOf(val)!=='object'){return getError(name,location,nullType);}},{type:nullType},disabled);var objectChecker=setupChecker(function objectCheckerDefinition(val,name,location){if(val===null||isError(objectNullOkChecker(val,name,location))){return getError(name,location,objectChecker.type);}},{type:type,nullOk:objectNullOkChecker},disabled);return objectChecker;}function instanceCheckGetter(classToCheck){return setupChecker(function instanceCheckerDefinition(val,name,location){if(!(val instanceof classToCheck)){return getError(name,location,classToCheck.name);}},{type:classToCheck.name},disabled);}function oneOfCheckGetter(enums){var type={__apiCheckData:{optional:false,type:'enum'},'enum':enums};var shortType='oneOf['+enums.map(function(enm){return stringify(enm);}).join(', ')+']';return setupChecker(function oneOfCheckerDefinition(val,name,location){if(!enums.some(function(enm){return enm===val;})){return getError(name,location,shortType);}},{type:type,shortType:shortType},disabled);}function oneOfTypeCheckGetter(typeCheckers){var checkersDisplay=typeCheckers.map(function(checker){return getCheckerDisplay(checker,{"short":true});});var shortType='oneOfType['+checkersDisplay.join(', ')+']';function type(options){if(options&&options["short"]){return shortType;}return typeCheckers.map(function(checker){return getCheckerDisplay(checker,options);});}type.__apiCheckData={optional:false,type:'oneOfType'};return setupChecker(function oneOfTypeCheckerDefinition(val,name,location){if(!typeCheckers.some(function(checker){return!isError(checker(val,name,location));})){return getError(name,location,shortType);}},{type:type,shortType:shortType},disabled);}function arrayOfCheckGetter(checker){var shortCheckerDisplay=getCheckerDisplay(checker,{"short":true});var shortType='arrayOf['+shortCheckerDisplay+']';function type(options){if(options&&options["short"]){return shortType;}return getCheckerDisplay(checker,options);}type.__apiCheckData={optional:false,type:'arrayOf'};return setupChecker(function arrayOfCheckerDefinition(val,name,location){if(isError(checkers.array(val))||!val.every(function(item){return!isError(checker(item));})){return getError(name,location,shortType);}},{type:type,shortType:shortType},disabled);}function objectOfCheckGetter(checker){var checkerDisplay=getCheckerDisplay(checker,{"short":true});var shortType='objectOf['+checkerDisplay+']';function type(options){if(options&&options["short"]){return shortType;}return getCheckerDisplay(checker,options);}type.__apiCheckData={optional:false,type:'objectOf'};return setupChecker(function objectOfCheckerDefinition(val,name,location){var notObject=checkers.object(val,name,location);if(isError(notObject)){return notObject;}var allTypesSuccess=each(val,function(item,key){if(isError(checker(item,key,name))){return false;}});if(!allTypesSuccess){return getError(name,location,shortType);}},{type:type,shortType:shortType},disabled);}function typeOrArrayOfCheckGetter(checker){var checkerDisplay=getCheckerDisplay(checker,{"short":true});var shortType='typeOrArrayOf['+checkerDisplay+']';function type(options){if(options&&options["short"]){return shortType;}return getCheckerDisplay(checker,options);}type.__apiCheckData={optional:false,type:'typeOrArrayOf'};return setupChecker(function typeOrArrayOfDefinition(val,name,location,obj){if(isError(checkers.oneOfType([checker,checkers.arrayOf(checker)])(val,name,location,obj))){return getError(name,location,shortType);}},{type:type,shortType:shortType},disabled);}function getShapeCheckGetter(){function shapeCheckGetter(shape,nonObject){var shapeTypes={};each(shape,function(checker,prop){shapeTypes[prop]=getCheckerDisplay(checker);});function type(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var ret={};var terse=options.terse;var obj=options.obj;var addHelpers=options.addHelpers;var parentRequired=options.required;each(shape,function(checker,prop){/* eslint complexity:[2, 6] */var specified=obj&&obj.hasOwnProperty(prop);var required=undef(parentRequired)?!checker.isOptional:parentRequired;if(!terse||specified||!checker.isOptional){ret[prop]=getCheckerDisplay(checker,{terse:terse,obj:obj&&obj[prop],required:required,addHelpers:addHelpers});}if(addHelpers){modifyTypeDisplayToHelpOut(ret,prop,specified,checker,required);}});return ret;function modifyTypeDisplayToHelpOut(theRet,prop,specified,checker,required){if(!specified&&required&&!checker.isOptional){var item='ITEM';if(checker.type&&checker.type.__apiCheckData){item=checker.type.__apiCheckData.type.toUpperCase();}addHelper('missing','MISSING THIS '+item,' <-- YOU ARE MISSING THIS');}else if(specified){var error=checker(obj[prop],prop,null,obj);if(isError(error)){addHelper('error','THIS IS THE PROBLEM: '+error.message,' <-- THIS IS THE PROBLEM: '+error.message);}}function addHelper(property,objectMessage,stringMessage){if(typeof theRet[prop]==='string'){theRet[prop]+=stringMessage;}else{theRet[prop].__apiCheckData[property]=objectMessage;}}}}type.__apiCheckData={strict:false,optional:false,type:'shape'};var shapeChecker=setupChecker(function shapeCheckerDefinition(val,name,location){/* eslint complexity:[2, 6] */var isObject=!nonObject&&checkers.object(val,name,location);if(isError(isObject)){return isObject;}var shapePropError=undefined;location=location?location+(name?'/':''):'';name=name||'';each(shape,function(checker,prop){if(val.hasOwnProperty(prop)||!checker.isOptional){shapePropError=checker(val[prop],prop,''+location+name,val);return!isError(shapePropError);}});if(isError(shapePropError)){return shapePropError;}},{type:type,shortType:'shape'},disabled);function strictType(){return type.apply(undefined,arguments);}strictType.__apiCheckData=copy(shapeChecker.type.__apiCheckData);strictType.__apiCheckData.strict=true;shapeChecker.strict=setupChecker(function strictShapeCheckerDefinition(val,name,location){var shapeError=shapeChecker(val,name,location);if(isError(shapeError)){return shapeError;}var allowedProperties=Object.keys(shape);var extraProps=Object.keys(val).filter(function(prop){return allowedProperties.indexOf(prop)===-1;});if(extraProps.length){return new Error(nAtL(name,location)+' cannot have extra properties: '+t(extraProps.join('`, `'))+'.'+('It is limited to '+t(allowedProperties.join('`, `'))));}},{type:strictType,shortType:'strict shape'},disabled);return shapeChecker;}shapeCheckGetter.ifNot=function ifNot(otherProps,propChecker){if(!Array.isArray(otherProps)){otherProps=[otherProps];}var description=undefined;if(otherProps.length===1){description='specified only if '+otherProps[0]+' is not specified';}else{description='specified only if none of the following are specified: ['+list(otherProps,', ','and ')+']';}var shortType='ifNot['+otherProps.join(', ')+']';var type=getTypeForShapeChild(propChecker,description,shortType);return setupChecker(function ifNotChecker(prop,propName,location,obj){var propExists=obj&&obj.hasOwnProperty(propName);var otherPropsExist=otherProps.some(function(otherProp){return obj&&obj.hasOwnProperty(otherProp);});if(propExists===otherPropsExist){return getError(propName,location,type);}else if(propExists){return propChecker(prop,propName,location,obj);}},{notRequired:true,type:type,shortType:shortType},disabled);};shapeCheckGetter.onlyIf=function onlyIf(otherProps,propChecker){otherProps=arrayify(otherProps);var description=undefined;if(otherProps.length===1){description='specified only if '+otherProps[0]+' is also specified';}else{description='specified only if all of the following are specified: ['+list(otherProps,', ','and ')+']';}var shortType='onlyIf['+otherProps.join(', ')+']';var type=getTypeForShapeChild(propChecker,description,shortType);return setupChecker(function onlyIfCheckerDefinition(prop,propName,location,obj){var othersPresent=otherProps.every(function(property){return obj.hasOwnProperty(property);});if(!othersPresent){return getError(propName,location,type);}else{return propChecker(prop,propName,location,obj);}},{type:type,shortType:shortType},disabled);};shapeCheckGetter.requiredIfNot=function shapeRequiredIfNot(otherProps,propChecker){if(!Array.isArray(otherProps)){otherProps=[otherProps];}return getRequiredIfNotChecker(false,otherProps,propChecker);};shapeCheckGetter.requiredIfNot.all=function shapeRequiredIfNotAll(otherProps,propChecker){if(!Array.isArray(otherProps)){throw new Error('requiredIfNot.all must be passed an array');}return getRequiredIfNotChecker(true,otherProps,propChecker);};function getRequiredIfNotChecker(all,otherProps,propChecker){var props=t(otherProps.join(', '));var ifProps='if '+(all?'all of':'at least one of');var description='specified '+ifProps+' these are not specified: '+props+' (otherwise it\'s optional)';var shortType='requiredIfNot'+(all?'.all':'')+'['+otherProps.join(', ')+'}]';var type=getTypeForShapeChild(propChecker,description,shortType);return setupChecker(function shapeRequiredIfNotDefinition(prop,propName,location,obj){var propExists=obj&&obj.hasOwnProperty(propName);var iteration=all?'every':'some';var otherPropsExist=otherProps[iteration](function(otherProp){return obj&&obj.hasOwnProperty(otherProp);});if(!otherPropsExist&&!propExists){return getError(propName,location,type);}else if(propExists){return propChecker(prop,propName,location,obj);}},{type:type,notRequired:true},disabled);}return shapeCheckGetter;function getTypeForShapeChild(propChecker,description,shortType){function type(options){if(options&&options["short"]){return shortType;}return getCheckerDisplay(propChecker);}type.__apiCheckData={optional:false,type:'ifNot',description:description};return type;}}function argumentsCheckerGetter(){var type='function arguments';return setupChecker(function argsCheckerDefinition(val,name,location){if(Array.isArray(val)||isError(checkers.object(val))||isError(checkers.number(val.length))){return getError(name,location,type);}},{type:type},disabled);}function anyCheckGetter(){return setupChecker(function anyCheckerDefinition(){// don't do anything
},{type:'any'},disabled);}function nullCheckGetter(){var type='null';return setupChecker(function nullChecker(val,name,location){if(val!==null){return getError(name,location,type);}},{type:type},disabled);}function rangeCheckGetter(min,max){var type='Range ('+min+' - '+max+')';return setupChecker(function rangeChecker(val,name,location){if(typeof val!=='number'||val<min||val>max){return getError(name,location,type);}},{type:type},disabled);}function lessThanCheckGetter(min){var type='lessThan['+min+']';return setupChecker(function lessThanChecker(val,name,location){if(typeof val!=='number'||val>min){return getError(name,location,type);}},{type:type},disabled);}function greaterThanCheckGetter(max){var type='greaterThan['+max+']';return setupChecker(function greaterThanChecker(val,name,location){if(typeof val!=='number'||val<max){return getError(name,location,type);}},{type:type},disabled);}function emptyObjectCheckGetter(){var type='empty object';return setupChecker(function emptyObjectChecker(val,name,location){if(typeOf(val)!=='object'||val===null||Object.keys(val).length){return getError(name,location,type);}},{type:type},disabled);}}/***/}/******/]);});;/**
 * gridstack.js 0.2.6
 * http://troolee.github.io/gridstack.js/
 * (c) 2014-2016 Pavel Reznikov
 * gridstack.js may be freely distributed under the MIT license.
 * @preserve
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','lodash','jquery-ui/data','jquery-ui/disable-selection','jquery-ui/focusable','jquery-ui/form','jquery-ui/ie','jquery-ui/keycode','jquery-ui/labels','jquery-ui/jquery-1-7','jquery-ui/plugin','jquery-ui/safe-active-element','jquery-ui/safe-blur','jquery-ui/scroll-parent','jquery-ui/tabbable','jquery-ui/unique-id','jquery-ui/version','jquery-ui/widget','jquery-ui/widgets/mouse','jquery-ui/widgets/draggable','jquery-ui/widgets/droppable','jquery-ui/widgets/resizable'],factory);}else if(typeof exports!=='undefined'){try{jQuery=require('jquery');}catch(e){}try{_=require('lodash');}catch(e){}factory(jQuery,_);}else{factory(jQuery,_);}})(function($,_){var scope=window;var obsolete=function obsolete(f,oldName,newName){var wrapper=function wrapper(){console.warn('gridstack.js: Function `'+oldName+'` is deprecated as of v0.2.5 and has been replaced '+'with `'+newName+'`. It will be **completely** removed in v1.0.');return f.apply(this,arguments);};wrapper.prototype=f.prototype;return wrapper;};var obsoleteOpts=function obsoleteOpts(oldName,newName){console.warn('gridstack.js: Option `'+oldName+'` is deprecated as of v0.2.5 and has been replaced with `'+newName+'`. It will be **completely** removed in v1.0.');};var Utils={isIntercepted:function isIntercepted(a,b){return!(a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y);},sort:function sort(nodes,dir,width){width=width||_.chain(nodes).map(function(node){return node.x+node.width;}).max().value();dir=dir!=-1?1:-1;return _.sortBy(nodes,function(n){return dir*(n.x+n.y*width);});},createStylesheet:function createStylesheet(id){var style=document.createElement('style');style.setAttribute('type','text/css');style.setAttribute('data-gs-style-id',id);if(style.styleSheet){style.styleSheet.cssText='';}else{style.appendChild(document.createTextNode(''));}document.getElementsByTagName('head')[0].appendChild(style);return style.sheet;},removeStylesheet:function removeStylesheet(id){$('STYLE[data-gs-style-id='+id+']').remove();},insertCSSRule:function insertCSSRule(sheet,selector,rules,index){if(typeof sheet.insertRule==='function'){sheet.insertRule(selector+'{'+rules+'}',index);}else if(typeof sheet.addRule==='function'){sheet.addRule(selector,rules,index);}},toBool:function toBool(v){if(typeof v=='boolean'){return v;}if(typeof v=='string'){v=v.toLowerCase();return!(v===''||v=='no'||v=='false'||v=='0');}return Boolean(v);},_collisionNodeCheck:function _collisionNodeCheck(n){return n!=this.node&&Utils.isIntercepted(n,this.nn);},_didCollide:function _didCollide(bn){return Utils.isIntercepted({x:this.n.x,y:this.newY,width:this.n.width,height:this.n.height},bn);},_isAddNodeIntercepted:function _isAddNodeIntercepted(n){return Utils.isIntercepted({x:this.x,y:this.y,width:this.node.width,height:this.node.height},n);},parseHeight:function parseHeight(val){var height=val;var heightUnit='px';if(height&&_.isString(height)){var match=height.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw)?$/);if(!match){throw new Error('Invalid height');}heightUnit=match[2]||'px';height=parseFloat(match[1]);}return{height:height,unit:heightUnit};}};// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
Utils.is_intercepted=obsolete(Utils.isIntercepted,'is_intercepted','isIntercepted');Utils.create_stylesheet=obsolete(Utils.createStylesheet,'create_stylesheet','createStylesheet');Utils.remove_stylesheet=obsolete(Utils.removeStylesheet,'remove_stylesheet','removeStylesheet');Utils.insert_css_rule=obsolete(Utils.insertCSSRule,'insert_css_rule','insertCSSRule');// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
var idSeq=0;var GridStackEngine=function GridStackEngine(width,onchange,floatMode,height,items){this.width=width;this["float"]=floatMode||false;this.height=height||0;this.nodes=items||[];this.onchange=onchange||function(){};this._updateCounter=0;this._float=this["float"];this._addedNodes=[];this._removedNodes=[];};GridStackEngine.prototype.batchUpdate=function(){this._updateCounter=1;this["float"]=true;};GridStackEngine.prototype.commit=function(){if(this._updateCounter!==0){this._updateCounter=0;this["float"]=this._float;this._packNodes();this._notify();}};// For Meteor support: https://github.com/troolee/gridstack.js/pull/272
GridStackEngine.prototype.getNodeDataByDOMEl=function(el){return _.find(this.nodes,function(n){return el.get(0)===n.el.get(0);});};GridStackEngine.prototype._fixCollisions=function(node){var self=this;this._sortNodes(-1);var nn=node;var hasLocked=Boolean(_.find(this.nodes,function(n){return n.locked;}));if(!this["float"]&&!hasLocked){nn={x:0,y:node.y,width:this.width,height:node.height};}while(true){var collisionNode=_.find(this.nodes,_.bind(Utils._collisionNodeCheck,{node:node,nn:nn}));if(typeof collisionNode=='undefined'){return;}this.moveNode(collisionNode,collisionNode.x,node.y+node.height,collisionNode.width,collisionNode.height,true);}};GridStackEngine.prototype.isAreaEmpty=function(x,y,width,height){var nn={x:x||0,y:y||0,width:width||1,height:height||1};var collisionNode=_.find(this.nodes,_.bind(function(n){return Utils.isIntercepted(n,nn);},this));return collisionNode===null||typeof collisionNode==='undefined';};GridStackEngine.prototype._sortNodes=function(dir){this.nodes=Utils.sort(this.nodes,dir,this.width);};GridStackEngine.prototype._packNodes=function(){this._sortNodes();if(this["float"]){_.each(this.nodes,_.bind(function(n,i){if(n._updating||typeof n._origY=='undefined'||n.y==n._origY){return;}var newY=n.y;while(newY>=n._origY){var collisionNode=_.chain(this.nodes).find(_.bind(Utils._didCollide,{n:n,newY:newY})).value();if(!collisionNode){n._dirty=true;n.y=newY;}--newY;}},this));}else{_.each(this.nodes,_.bind(function(n,i){if(n.locked){return;}while(n.y>0){var newY=n.y-1;var canBeMoved=i===0;if(i>0){var collisionNode=_.chain(this.nodes).take(i).find(_.bind(Utils._didCollide,{n:n,newY:newY})).value();canBeMoved=typeof collisionNode=='undefined';}if(!canBeMoved){break;}n._dirty=n.y!=newY;n.y=newY;}},this));}};GridStackEngine.prototype._prepareNode=function(node,resizing){node=_.defaults(node||{},{width:1,height:1,x:0,y:0});node.x=parseInt(''+node.x);node.y=parseInt(''+node.y);node.width=parseInt(''+node.width);node.height=parseInt(''+node.height);node.autoPosition=node.autoPosition||false;node.noResize=node.noResize||false;node.noMove=node.noMove||false;if(node.width>this.width){node.width=this.width;}else if(node.width<1){node.width=1;}if(node.height<1){node.height=1;}if(node.x<0){node.x=0;}if(node.x+node.width>this.width){if(resizing){node.width=this.width-node.x;}else{node.x=this.width-node.width;}}if(node.y<0){node.y=0;}return node;};GridStackEngine.prototype._notify=function(){var args=Array.prototype.slice.call(arguments,0);args[0]=typeof args[0]==='undefined'?[]:[args[0]];args[1]=typeof args[1]==='undefined'?true:args[1];if(this._updateCounter){return;}var deletedNodes=args[0].concat(this.getDirtyNodes());this.onchange(deletedNodes,args[1]);};GridStackEngine.prototype.cleanNodes=function(){if(this._updateCounter){return;}_.each(this.nodes,function(n){n._dirty=false;});};GridStackEngine.prototype.getDirtyNodes=function(){return _.filter(this.nodes,function(n){return n._dirty;});};GridStackEngine.prototype.addNode=function(node,triggerAddEvent){node=this._prepareNode(node);if(typeof node.maxWidth!='undefined'){node.width=Math.min(node.width,node.maxWidth);}if(typeof node.maxHeight!='undefined'){node.height=Math.min(node.height,node.maxHeight);}if(typeof node.minWidth!='undefined'){node.width=Math.max(node.width,node.minWidth);}if(typeof node.minHeight!='undefined'){node.height=Math.max(node.height,node.minHeight);}node._id=++idSeq;node._dirty=true;if(node.autoPosition){this._sortNodes();for(var i=0;;++i){var x=i%this.width;var y=Math.floor(i/this.width);if(x+node.width>this.width){continue;}if(!_.find(this.nodes,_.bind(Utils._isAddNodeIntercepted,{x:x,y:y,node:node}))){node.x=x;node.y=y;break;}}}this.nodes.push(node);if(typeof triggerAddEvent!='undefined'&&triggerAddEvent){this._addedNodes.push(_.clone(node));}this._fixCollisions(node);this._packNodes();this._notify();return node;};GridStackEngine.prototype.removeNode=function(node,detachNode){detachNode=typeof detachNode==='undefined'?true:detachNode;this._removedNodes.push(_.clone(node));node._id=null;this.nodes=_.without(this.nodes,node);this._packNodes();this._notify(node,detachNode);};GridStackEngine.prototype.canMoveNode=function(node,x,y,width,height){var hasLocked=Boolean(_.find(this.nodes,function(n){return n.locked;}));if(!this.height&&!hasLocked){return true;}var clonedNode;var clone=new GridStackEngine(this.width,null,this["float"],0,_.map(this.nodes,function(n){if(n==node){clonedNode=$.extend({},n);return clonedNode;}return $.extend({},n);}));if(typeof clonedNode==='undefined'){return true;}clone.moveNode(clonedNode,x,y,width,height);var res=true;if(hasLocked){res&=!Boolean(_.find(clone.nodes,function(n){return n!=clonedNode&&Boolean(n.locked)&&Boolean(n._dirty);}));}if(this.height){res&=clone.getGridHeight()<=this.height;}return res;};GridStackEngine.prototype.canBePlacedWithRespectToHeight=function(node){if(!this.height){return true;}var clone=new GridStackEngine(this.width,null,this["float"],0,_.map(this.nodes,function(n){return $.extend({},n);}));clone.addNode(node);return clone.getGridHeight()<=this.height;};GridStackEngine.prototype.moveNode=function(node,x,y,width,height,noPack){if(typeof x!='number'){x=node.x;}if(typeof y!='number'){y=node.y;}if(typeof width!='number'){width=node.width;}if(typeof height!='number'){height=node.height;}if(typeof node.maxWidth!='undefined'){width=Math.min(width,node.maxWidth);}if(typeof node.maxHeight!='undefined'){height=Math.min(height,node.maxHeight);}if(typeof node.minWidth!='undefined'){width=Math.max(width,node.minWidth);}if(typeof node.minHeight!='undefined'){height=Math.max(height,node.minHeight);}if(node.x==x&&node.y==y&&node.width==width&&node.height==height){return node;}var resizing=node.width!=width;node._dirty=true;node.x=x;node.y=y;node.width=width;node.height=height;node=this._prepareNode(node,resizing);this._fixCollisions(node);if(!noPack){this._packNodes();this._notify();}return node;};GridStackEngine.prototype.getGridHeight=function(){return _.reduce(this.nodes,function(memo,n){return Math.max(memo,n.y+n.height);},0);};GridStackEngine.prototype.beginUpdate=function(node){_.each(this.nodes,function(n){n._origY=n.y;});node._updating=true;};GridStackEngine.prototype.endUpdate=function(){_.each(this.nodes,function(n){n._origY=n.y;});var n=_.find(this.nodes,function(n){return n._updating;});if(n){n._updating=false;}};var GridStack=function GridStack(el,opts){var self=this;var oneColumnMode,isAutoCellHeight;opts=opts||{};this.container=$(el);// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
if(typeof opts.handle_class!=='undefined'){opts.handleClass=opts.handle_class;obsoleteOpts('handle_class','handleClass');}if(typeof opts.item_class!=='undefined'){opts.itemClass=opts.item_class;obsoleteOpts('item_class','itemClass');}if(typeof opts.placeholder_class!=='undefined'){opts.placeholderClass=opts.placeholder_class;obsoleteOpts('placeholder_class','placeholderClass');}if(typeof opts.placeholder_text!=='undefined'){opts.placeholderText=opts.placeholder_text;obsoleteOpts('placeholder_text','placeholderText');}if(typeof opts.cell_height!=='undefined'){opts.cellHeight=opts.cell_height;obsoleteOpts('cell_height','cellHeight');}if(typeof opts.vertical_margin!=='undefined'){opts.verticalMargin=opts.vertical_margin;obsoleteOpts('vertical_margin','verticalMargin');}if(typeof opts.min_width!=='undefined'){opts.minWidth=opts.min_width;obsoleteOpts('min_width','minWidth');}if(typeof opts.static_grid!=='undefined'){opts.staticGrid=opts.static_grid;obsoleteOpts('static_grid','staticGrid');}if(typeof opts.is_nested!=='undefined'){opts.isNested=opts.is_nested;obsoleteOpts('is_nested','isNested');}if(typeof opts.always_show_resize_handle!=='undefined'){opts.alwaysShowResizeHandle=opts.always_show_resize_handle;obsoleteOpts('always_show_resize_handle','alwaysShowResizeHandle');}// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
opts.itemClass=opts.itemClass||'grid-stack-item';var isNested=this.container.closest('.'+opts.itemClass).length>0;this.opts=_.defaults(opts||{},{width:parseInt(this.container.attr('data-gs-width'))||12,height:parseInt(this.container.attr('data-gs-height'))||0,itemClass:'grid-stack-item',placeholderClass:'grid-stack-placeholder',placeholderText:'',handle:'.grid-stack-item-content',handleClass:null,cellHeight:60,verticalMargin:20,auto:true,minWidth:768,"float":false,staticGrid:false,_class:'grid-stack-instance-'+(Math.random()*10000).toFixed(0),animate:Boolean(this.container.attr('data-gs-animate'))||false,alwaysShowResizeHandle:opts.alwaysShowResizeHandle||false,resizable:_.defaults(opts.resizable||{},{autoHide:!(opts.alwaysShowResizeHandle||false),handles:'se'}),draggable:_.defaults(opts.draggable||{},{handle:(opts.handleClass?'.'+opts.handleClass:opts.handle?opts.handle:'')||'.grid-stack-item-content',scroll:false,appendTo:'body'}),disableDrag:opts.disableDrag||false,disableResize:opts.disableResize||false,rtl:'auto',removable:false,removeTimeout:2000,verticalMarginUnit:'px',cellHeightUnit:'px'});if(this.opts.rtl==='auto'){this.opts.rtl=this.container.css('direction')==='rtl';}if(this.opts.rtl){this.container.addClass('grid-stack-rtl');}this.opts.isNested=isNested;isAutoCellHeight=this.opts.cellHeight==='auto';if(isAutoCellHeight){self.cellHeight(self.cellWidth(),true);}else{this.cellHeight(this.opts.cellHeight,true);}this.verticalMargin(this.opts.verticalMargin,true);this.container.addClass(this.opts._class);this._setStaticClass();if(isNested){this.container.addClass('grid-stack-nested');}this._initStyles();this.grid=new GridStackEngine(this.opts.width,function(nodes,detachNode){detachNode=typeof detachNode==='undefined'?true:detachNode;var maxHeight=0;_.each(nodes,function(n){if(detachNode&&n._id===null){if(n.el){n.el.remove();}}else{n.el.attr('data-gs-x',n.x).attr('data-gs-y',n.y).attr('data-gs-width',n.width).attr('data-gs-height',n.height);maxHeight=Math.max(maxHeight,n.y+n.height);}});self._updateStyles(maxHeight+10);},this.opts["float"],this.opts.height);if(this.opts.auto){var elements=[];var _this=this;this.container.children('.'+this.opts.itemClass+':not(.'+this.opts.placeholderClass+')').each(function(index,el){el=$(el);elements.push({el:el,i:parseInt(el.attr('data-gs-x'))+parseInt(el.attr('data-gs-y'))*_this.opts.width});});_.chain(elements).sortBy(function(x){return x.i;}).each(function(i){self._prepareElement(i.el);}).value();}this.setAnimation(this.opts.animate);this.placeholder=$('<div class="'+this.opts.placeholderClass+' '+this.opts.itemClass+'">'+'<div class="placeholder-content">'+this.opts.placeholderText+'</div></div>').hide();this._updateContainerHeight();this._updateHeightsOnResize=_.throttle(function(){self.cellHeight(self.cellWidth(),false);},100);this.onResizeHandler=function(){if(isAutoCellHeight){self._updateHeightsOnResize();}if(self._isOneColumnMode()){if(oneColumnMode){return;}oneColumnMode=true;self.grid._sortNodes();_.each(self.grid.nodes,function(node){self.container.append(node.el);if(self.opts.staticGrid){return;}if(node.noMove||self.opts.disableDrag){node.el.draggable('disable');}if(node.noResize||self.opts.disableResize){node.el.resizable('disable');}node.el.trigger('resize');});}else{if(!oneColumnMode){return;}oneColumnMode=false;if(self.opts.staticGrid){return;}_.each(self.grid.nodes,function(node){if(!node.noMove&&!self.opts.disableDrag){node.el.draggable('enable');}if(!node.noResize&&!self.opts.disableResize){node.el.resizable('enable');}node.el.trigger('resize');});}};$(window).resize(this.onResizeHandler);this.onResizeHandler();if(!self.opts.staticGrid&&typeof self.opts.removable==='string'){var trashZone=$(self.opts.removable);if(!trashZone.data('droppable')){trashZone.droppable({accept:'.'+self.opts.itemClass});}trashZone.on('dropover',function(event,ui){var el=$(ui.draggable);var node=el.data('_gridstack_node');if(node._grid!==self){return;}self._setupRemovingTimeout(el);}).on('dropout',function(event,ui){var el=$(ui.draggable);var node=el.data('_gridstack_node');if(node._grid!==self){return;}self._clearRemovingTimeout(el);});}if(!self.opts.staticGrid&&self.opts.acceptWidgets){var draggingElement=null;var onDrag=function onDrag(event,ui){var el=draggingElement;var node=el.data('_gridstack_node');var pos=self.getCellFromPixel(ui.offset,true);var x=Math.max(0,pos.x);var y=Math.max(0,pos.y);if(!node._added){node._added=true;node.el=el;node.x=x;node.y=y;self.grid.cleanNodes();self.grid.beginUpdate(node);self.grid.addNode(node);self.container.append(self.placeholder);self.placeholder.attr('data-gs-x',node.x).attr('data-gs-y',node.y).attr('data-gs-width',node.width).attr('data-gs-height',node.height).show();node.el=self.placeholder;node._beforeDragX=node.x;node._beforeDragY=node.y;self._updateContainerHeight();}else{if(!self.grid.canMoveNode(node,x,y)){return;}self.grid.moveNode(node,x,y);self._updateContainerHeight();}};$(self.container).droppable({accept:function accept(el){el=$(el);var node=el.data('_gridstack_node');if(node&&node._grid===self){return false;}return el.is(self.opts.acceptWidgets===true?'.grid-stack-item':self.opts.acceptWidgets);},over:function over(event,ui){var offset=self.container.offset();var el=$(ui.draggable);var cellWidth=self.cellWidth();var cellHeight=self.cellHeight();var origNode=el.data('_gridstack_node');var width=origNode?origNode.width:Math.ceil(el.outerWidth()/cellWidth);var height=origNode?origNode.height:Math.ceil(el.outerHeight()/cellHeight);draggingElement=el;var node=self.grid._prepareNode({width:width,height:height,_added:false,_temporary:true});el.data('_gridstack_node',node);el.data('_gridstack_node_orig',origNode);el.on('drag',onDrag);},out:function out(event,ui){var el=$(ui.draggable);el.unbind('drag',onDrag);var node=el.data('_gridstack_node');node.el=null;self.grid.removeNode(node);self.placeholder.detach();self._updateContainerHeight();el.data('_gridstack_node',el.data('_gridstack_node_orig'));},drop:function drop(event,ui){self.placeholder.detach();var node=$(ui.draggable).data('_gridstack_node');node._grid=self;var el=$(ui.draggable).clone(false);el.data('_gridstack_node',node);$(ui.draggable).remove();node.el=el;self.placeholder.hide();el.attr('data-gs-x',node.x).attr('data-gs-y',node.y).attr('data-gs-width',node.width).attr('data-gs-height',node.height).addClass(self.opts.itemClass).removeAttr('style').enableSelection().removeData('draggable').removeClass('ui-draggable ui-draggable-dragging ui-draggable-disabled').unbind('drag',onDrag);self.container.append(el);self._prepareElementsByNode(el,node);self._updateContainerHeight();self._triggerChangeEvent();self.grid.endUpdate();}});}};GridStack.prototype._triggerChangeEvent=function(forceTrigger){var elements=this.grid.getDirtyNodes();var hasChanges=false;var eventParams=[];if(elements&&elements.length){eventParams.push(elements);hasChanges=true;}if(hasChanges||forceTrigger===true){this.container.trigger('change',eventParams);}};GridStack.prototype._triggerAddEvent=function(){if(this.grid._addedNodes&&this.grid._addedNodes.length>0){this.container.trigger('added',[_.map(this.grid._addedNodes,_.clone)]);this.grid._addedNodes=[];}};GridStack.prototype._triggerRemoveEvent=function(){if(this.grid._removedNodes&&this.grid._removedNodes.length>0){this.container.trigger('removed',[_.map(this.grid._removedNodes,_.clone)]);this.grid._removedNodes=[];}};GridStack.prototype._initStyles=function(){if(this._stylesId){Utils.removeStylesheet(this._stylesId);}this._stylesId='gridstack-style-'+(Math.random()*100000).toFixed();this._styles=Utils.createStylesheet(this._stylesId);if(this._styles!==null){this._styles._max=0;}};GridStack.prototype._updateStyles=function(maxHeight){if(this._styles===null||typeof this._styles==='undefined'){return;}var prefix='.'+this.opts._class+' .'+this.opts.itemClass;var self=this;var getHeight;if(typeof maxHeight=='undefined'){maxHeight=this._styles._max;this._initStyles();this._updateContainerHeight();}if(!this.opts.cellHeight){// The rest will be handled by CSS
return;}if(this._styles._max!==0&&maxHeight<=this._styles._max){return;}if(!this.opts.verticalMargin||this.opts.cellHeightUnit===this.opts.verticalMarginUnit){getHeight=function getHeight(nbRows,nbMargins){return self.opts.cellHeight*nbRows+self.opts.verticalMargin*nbMargins+self.opts.cellHeightUnit;};}else{getHeight=function getHeight(nbRows,nbMargins){if(!nbRows||!nbMargins){return self.opts.cellHeight*nbRows+self.opts.verticalMargin*nbMargins+self.opts.cellHeightUnit;}return'calc('+(self.opts.cellHeight*nbRows+self.opts.cellHeightUnit)+' + '+(self.opts.verticalMargin*nbMargins+self.opts.verticalMarginUnit)+')';};}if(this._styles._max===0){Utils.insertCSSRule(this._styles,prefix,'min-height: '+getHeight(1,0)+';',0);}if(maxHeight>this._styles._max){for(var i=this._styles._max;i<maxHeight;++i){Utils.insertCSSRule(this._styles,prefix+'[data-gs-height="'+(i+1)+'"]','height: '+getHeight(i+1,i)+';',i);Utils.insertCSSRule(this._styles,prefix+'[data-gs-min-height="'+(i+1)+'"]','min-height: '+getHeight(i+1,i)+';',i);Utils.insertCSSRule(this._styles,prefix+'[data-gs-max-height="'+(i+1)+'"]','max-height: '+getHeight(i+1,i)+';',i);Utils.insertCSSRule(this._styles,prefix+'[data-gs-y="'+i+'"]','top: '+getHeight(i,i)+';',i);}this._styles._max=maxHeight;}};GridStack.prototype._updateContainerHeight=function(){if(this.grid._updateCounter){return;}var height=this.grid.getGridHeight();this.container.attr('data-gs-current-height',height);if(!this.opts.cellHeight){return;}if(!this.opts.verticalMargin){this.container.css('height',height*this.opts.cellHeight+this.opts.cellHeightUnit);}else if(this.opts.cellHeightUnit===this.opts.verticalMarginUnit){this.container.css('height',height*(this.opts.cellHeight+this.opts.verticalMargin)-this.opts.verticalMargin+this.opts.cellHeightUnit);}else{this.container.css('height','calc('+(height*this.opts.cellHeight+this.opts.cellHeightUnit)+' + '+(height*(this.opts.verticalMargin-1)+this.opts.verticalMarginUnit)+')');}};GridStack.prototype._isOneColumnMode=function(){return(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)<=this.opts.minWidth;};GridStack.prototype._setupRemovingTimeout=function(el){var self=this;var node=$(el).data('_gridstack_node');if(node._removeTimeout||!self.opts.removable){return;}node._removeTimeout=setTimeout(function(){el.addClass('grid-stack-item-removing');node._isAboutToRemove=true;},self.opts.removeTimeout);};GridStack.prototype._clearRemovingTimeout=function(el){var node=$(el).data('_gridstack_node');if(!node._removeTimeout){return;}clearTimeout(node._removeTimeout);node._removeTimeout=null;el.removeClass('grid-stack-item-removing');node._isAboutToRemove=false;};GridStack.prototype._prepareElementsByNode=function(el,node){if(typeof $.ui==='undefined'){return;}var self=this;var cellWidth;var cellHeight;var dragOrResize=function dragOrResize(event,ui){var x=Math.round(ui.position.left/cellWidth);var y=Math.floor((ui.position.top+cellHeight/2)/cellHeight);var width;var height;if(event.type!='drag'){width=Math.round(ui.size.width/cellWidth);height=Math.round(ui.size.height/cellHeight);}if(event.type=='drag'){if(x<0||x>=self.grid.width||y<0){if(self.opts.removable===true){self._setupRemovingTimeout(el);}x=node._beforeDragX;y=node._beforeDragY;self.placeholder.detach();self.placeholder.hide();self.grid.removeNode(node);self._updateContainerHeight();node._temporaryRemoved=true;}else{self._clearRemovingTimeout(el);if(node._temporaryRemoved){self.grid.addNode(node);self.placeholder.attr('data-gs-x',x).attr('data-gs-y',y).attr('data-gs-width',width).attr('data-gs-height',height).show();self.container.append(self.placeholder);node.el=self.placeholder;node._temporaryRemoved=false;}}}else if(event.type=='resize'){if(x<0){return;}}if(!self.grid.canMoveNode(node,x,y,width,height)){return;}self.grid.moveNode(node,x,y,width,height);self._updateContainerHeight();};var onStartMoving=function onStartMoving(event,ui){self.container.append(self.placeholder);var o=$(this);self.grid.cleanNodes();self.grid.beginUpdate(node);cellWidth=self.cellWidth();var strictCellHeight=Math.ceil(o.outerHeight()/o.attr('data-gs-height'));cellHeight=self.container.height()/parseInt(self.container.attr('data-gs-current-height'));self.placeholder.attr('data-gs-x',o.attr('data-gs-x')).attr('data-gs-y',o.attr('data-gs-y')).attr('data-gs-width',o.attr('data-gs-width')).attr('data-gs-height',o.attr('data-gs-height')).show();node.el=self.placeholder;node._beforeDragX=node.x;node._beforeDragY=node.y;el.resizable('option','minWidth',cellWidth*(node.minWidth||1));el.resizable('option','minHeight',strictCellHeight*(node.minHeight||1));if(event.type=='resizestart'){o.find('.grid-stack-item').trigger('resizestart');}};var onEndMoving=function onEndMoving(event,ui){var o=$(this);if(!o.data('_gridstack_node')){return;}var forceNotify=false;self.placeholder.detach();node.el=o;self.placeholder.hide();if(node._isAboutToRemove){forceNotify=true;el.removeData('_gridstack_node');el.remove();}else{self._clearRemovingTimeout(el);if(!node._temporaryRemoved){o.attr('data-gs-x',node.x).attr('data-gs-y',node.y).attr('data-gs-width',node.width).attr('data-gs-height',node.height).removeAttr('style');}else{o.attr('data-gs-x',node._beforeDragX).attr('data-gs-y',node._beforeDragY).attr('data-gs-width',node.width).attr('data-gs-height',node.height).removeAttr('style');node.x=node._beforeDragX;node.y=node._beforeDragY;self.grid.addNode(node);}}self._updateContainerHeight();self._triggerChangeEvent(forceNotify);self.grid.endUpdate();var nestedGrids=o.find('.grid-stack');if(nestedGrids.length&&event.type=='resizestop'){nestedGrids.each(function(index,el){$(el).data('gridstack').onResizeHandler();});o.find('.grid-stack-item').trigger('resizestop');}};el.draggable(_.extend({},this.opts.draggable,{containment:this.opts.isNested?this.container.parent():null,start:onStartMoving,stop:onEndMoving,drag:dragOrResize})).resizable(_.extend({},this.opts.resizable,{start:onStartMoving,stop:onEndMoving,resize:dragOrResize}));if(node.noMove||this._isOneColumnMode()||this.opts.disableDrag){el.draggable('disable');}if(node.noResize||this._isOneColumnMode()||this.opts.disableResize){el.resizable('disable');}el.attr('data-gs-locked',node.locked?'yes':null);};GridStack.prototype._prepareElement=function(el,triggerAddEvent){triggerAddEvent=typeof triggerAddEvent!='undefined'?triggerAddEvent:false;var self=this;el=$(el);el.addClass(this.opts.itemClass);var node=self.grid.addNode({x:el.attr('data-gs-x'),y:el.attr('data-gs-y'),width:el.attr('data-gs-width'),height:el.attr('data-gs-height'),maxWidth:el.attr('data-gs-max-width'),minWidth:el.attr('data-gs-min-width'),maxHeight:el.attr('data-gs-max-height'),minHeight:el.attr('data-gs-min-height'),autoPosition:Utils.toBool(el.attr('data-gs-auto-position')),noResize:Utils.toBool(el.attr('data-gs-no-resize')),noMove:Utils.toBool(el.attr('data-gs-no-move')),locked:Utils.toBool(el.attr('data-gs-locked')),el:el,id:el.attr('data-gs-id'),_grid:self},triggerAddEvent);el.data('_gridstack_node',node);this._prepareElementsByNode(el,node);};GridStack.prototype.setAnimation=function(enable){if(enable){this.container.addClass('grid-stack-animate');}else{this.container.removeClass('grid-stack-animate');}};GridStack.prototype.addWidget=function(el,x,y,width,height,autoPosition,minWidth,maxWidth,minHeight,maxHeight,id){el=$(el);if(typeof x!='undefined'){el.attr('data-gs-x',x);}if(typeof y!='undefined'){el.attr('data-gs-y',y);}if(typeof width!='undefined'){el.attr('data-gs-width',width);}if(typeof height!='undefined'){el.attr('data-gs-height',height);}if(typeof autoPosition!='undefined'){el.attr('data-gs-auto-position',autoPosition?'yes':null);}if(typeof minWidth!='undefined'){el.attr('data-gs-min-width',minWidth);}if(typeof maxWidth!='undefined'){el.attr('data-gs-max-width',maxWidth);}if(typeof minHeight!='undefined'){el.attr('data-gs-min-height',minHeight);}if(typeof maxHeight!='undefined'){el.attr('data-gs-max-height',maxHeight);}if(typeof id!='undefined'){el.attr('data-gs-id',id);}this.container.append(el);this._prepareElement(el,true);this._triggerAddEvent();this._updateContainerHeight();this._triggerChangeEvent(true);return el;};GridStack.prototype.makeWidget=function(el){el=$(el);this._prepareElement(el,true);this._triggerAddEvent();this._updateContainerHeight();this._triggerChangeEvent(true);return el;};GridStack.prototype.willItFit=function(x,y,width,height,autoPosition){var node={x:x,y:y,width:width,height:height,autoPosition:autoPosition};return this.grid.canBePlacedWithRespectToHeight(node);};GridStack.prototype.removeWidget=function(el,detachNode){detachNode=typeof detachNode==='undefined'?true:detachNode;el=$(el);var node=el.data('_gridstack_node');// For Meteor support: https://github.com/troolee/gridstack.js/pull/272
if(!node){node=this.grid.getNodeDataByDOMEl(el);}this.grid.removeNode(node,detachNode);el.removeData('_gridstack_node');this._updateContainerHeight();if(detachNode){el.remove();}this._triggerChangeEvent(true);this._triggerRemoveEvent();};GridStack.prototype.removeAll=function(detachNode){_.each(this.grid.nodes,_.bind(function(node){this.removeWidget(node.el,detachNode);},this));this.grid.nodes=[];this._updateContainerHeight();};GridStack.prototype.destroy=function(detachGrid){$(window).off('resize',this.onResizeHandler);this.disable();if(typeof detachGrid!='undefined'&&!detachGrid){this.removeAll(false);this.container.removeData('gridstack');}else{this.container.remove();}Utils.removeStylesheet(this._stylesId);if(this.grid){this.grid=null;}};GridStack.prototype.resizable=function(el,val){var self=this;el=$(el);el.each(function(index,el){el=$(el);var node=el.data('_gridstack_node');if(typeof node=='undefined'||node===null||typeof $.ui==='undefined'){return;}node.noResize=!(val||false);if(node.noResize||self._isOneColumnMode()){el.resizable('disable');}else{el.resizable('enable');}});return this;};GridStack.prototype.movable=function(el,val){var self=this;el=$(el);el.each(function(index,el){el=$(el);var node=el.data('_gridstack_node');if(typeof node=='undefined'||node===null||typeof $.ui==='undefined'){return;}node.noMove=!(val||false);if(node.noMove||self._isOneColumnMode()){el.draggable('disable');el.removeClass('ui-draggable-handle');}else{el.draggable('enable');el.addClass('ui-draggable-handle');}});return this;};GridStack.prototype.enableMove=function(doEnable,includeNewWidgets){this.movable(this.container.children('.'+this.opts.itemClass),doEnable);if(includeNewWidgets){this.opts.disableDrag=!doEnable;}};GridStack.prototype.enableResize=function(doEnable,includeNewWidgets){this.resizable(this.container.children('.'+this.opts.itemClass),doEnable);if(includeNewWidgets){this.opts.disableResize=!doEnable;}};GridStack.prototype.disable=function(){this.movable(this.container.children('.'+this.opts.itemClass),false);this.resizable(this.container.children('.'+this.opts.itemClass),false);this.container.trigger('disable');};GridStack.prototype.enable=function(){this.movable(this.container.children('.'+this.opts.itemClass),true);this.resizable(this.container.children('.'+this.opts.itemClass),true);this.container.trigger('enable');};GridStack.prototype.locked=function(el,val){el=$(el);el.each(function(index,el){el=$(el);var node=el.data('_gridstack_node');if(typeof node=='undefined'||node===null){return;}node.locked=val||false;el.attr('data-gs-locked',node.locked?'yes':null);});return this;};GridStack.prototype.maxHeight=function(el,val){el=$(el);el.each(function(index,el){el=$(el);var node=el.data('_gridstack_node');if(typeof node==='undefined'||node===null){return;}if(!isNaN(val)){node.maxHeight=val||false;el.attr('data-gs-max-height',val);}});return this;};GridStack.prototype.minHeight=function(el,val){el=$(el);el.each(function(index,el){el=$(el);var node=el.data('_gridstack_node');if(typeof node==='undefined'||node===null){return;}if(!isNaN(val)){node.minHeight=val||false;el.attr('data-gs-min-height',val);}});return this;};GridStack.prototype.maxWidth=function(el,val){el=$(el);el.each(function(index,el){el=$(el);var node=el.data('_gridstack_node');if(typeof node==='undefined'||node===null){return;}if(!isNaN(val)){node.maxWidth=val||false;el.attr('data-gs-max-width',val);}});return this;};GridStack.prototype.minWidth=function(el,val){el=$(el);el.each(function(index,el){el=$(el);var node=el.data('_gridstack_node');if(typeof node==='undefined'||node===null){return;}if(!isNaN(val)){node.minWidth=val||false;el.attr('data-gs-min-width',val);}});return this;};GridStack.prototype._updateElement=function(el,callback){el=$(el).first();var node=el.data('_gridstack_node');if(typeof node=='undefined'||node===null){return;}var self=this;self.grid.cleanNodes();self.grid.beginUpdate(node);callback.call(this,el,node);self._updateContainerHeight();self._triggerChangeEvent();self.grid.endUpdate();};GridStack.prototype.resize=function(el,width,height){this._updateElement(el,function(el,node){width=width!==null&&typeof width!='undefined'?width:node.width;height=height!==null&&typeof height!='undefined'?height:node.height;this.grid.moveNode(node,node.x,node.y,width,height);});};GridStack.prototype.move=function(el,x,y){this._updateElement(el,function(el,node){x=x!==null&&typeof x!='undefined'?x:node.x;y=y!==null&&typeof y!='undefined'?y:node.y;this.grid.moveNode(node,x,y,node.width,node.height);});};GridStack.prototype.update=function(el,x,y,width,height){this._updateElement(el,function(el,node){x=x!==null&&typeof x!='undefined'?x:node.x;y=y!==null&&typeof y!='undefined'?y:node.y;width=width!==null&&typeof width!='undefined'?width:node.width;height=height!==null&&typeof height!='undefined'?height:node.height;this.grid.moveNode(node,x,y,width,height);});};GridStack.prototype.verticalMargin=function(val,noUpdate){if(typeof val=='undefined'){return this.opts.verticalMargin;}var heightData=Utils.parseHeight(val);if(this.opts.verticalMarginUnit===heightData.unit&&this.opts.height===heightData.height){return;}this.opts.verticalMarginUnit=heightData.unit;this.opts.verticalMargin=heightData.height;if(!noUpdate){this._updateStyles();}};GridStack.prototype.cellHeight=function(val,noUpdate){if(typeof val=='undefined'){if(this.opts.cellHeight){return this.opts.cellHeight;}var o=this.container.children('.'+this.opts.itemClass).first();return Math.ceil(o.outerHeight()/o.attr('data-gs-height'));}var heightData=Utils.parseHeight(val);if(this.opts.cellHeightUnit===heightData.heightUnit&&this.opts.height===heightData.height){return;}this.opts.cellHeightUnit=heightData.unit;this.opts.cellHeight=heightData.height;if(!noUpdate){this._updateStyles();}};GridStack.prototype.cellWidth=function(){return Math.round(this.container.outerWidth()/this.opts.width);};GridStack.prototype.getCellFromPixel=function(position,useOffset){var containerPos=typeof useOffset!='undefined'&&useOffset?this.container.offset():this.container.position();var relativeLeft=position.left-containerPos.left;var relativeTop=position.top-containerPos.top;var columnWidth=Math.floor(this.container.width()/this.opts.width);var rowHeight=Math.floor(this.container.height()/parseInt(this.container.attr('data-gs-current-height')));return{x:Math.floor(relativeLeft/columnWidth),y:Math.floor(relativeTop/rowHeight)};};GridStack.prototype.batchUpdate=function(){this.grid.batchUpdate();};GridStack.prototype.commit=function(){this.grid.commit();this._updateContainerHeight();};GridStack.prototype.isAreaEmpty=function(x,y,width,height){return this.grid.isAreaEmpty(x,y,width,height);};GridStack.prototype.setStatic=function(staticValue){this.opts.staticGrid=staticValue===true;this.enableMove(!staticValue);this.enableResize(!staticValue);this._setStaticClass();};GridStack.prototype._setStaticClass=function(){var staticClassName='grid-stack-static';if(this.opts.staticGrid===true){this.container.addClass(staticClassName);}else{this.container.removeClass(staticClassName);}};GridStack.prototype._updateNodeWidths=function(oldWidth,newWidth){this.grid._sortNodes();this.grid.batchUpdate();var node={};for(var i=0;i<this.grid.nodes.length;i++){node=this.grid.nodes[i];this.update(node.el,Math.round(node.x*newWidth/oldWidth),undefined,Math.round(node.width*newWidth/oldWidth),undefined);}this.grid.commit();};GridStack.prototype.setGridWidth=function(gridWidth,doNotPropagate){this.container.removeClass('grid-stack-'+this.opts.width);if(doNotPropagate!==true){this._updateNodeWidths(this.opts.width,gridWidth);}this.opts.width=gridWidth;this.grid.width=gridWidth;this.container.addClass('grid-stack-'+gridWidth);};// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
GridStackEngine.prototype.batch_update=obsolete(GridStackEngine.prototype.batchUpdate);GridStackEngine.prototype._fix_collisions=obsolete(GridStackEngine.prototype._fixCollisions,'_fix_collisions','_fixCollisions');GridStackEngine.prototype.is_area_empty=obsolete(GridStackEngine.prototype.isAreaEmpty,'is_area_empty','isAreaEmpty');GridStackEngine.prototype._sort_nodes=obsolete(GridStackEngine.prototype._sortNodes,'_sort_nodes','_sortNodes');GridStackEngine.prototype._pack_nodes=obsolete(GridStackEngine.prototype._packNodes,'_pack_nodes','_packNodes');GridStackEngine.prototype._prepare_node=obsolete(GridStackEngine.prototype._prepareNode,'_prepare_node','_prepareNode');GridStackEngine.prototype.clean_nodes=obsolete(GridStackEngine.prototype.cleanNodes,'clean_nodes','cleanNodes');GridStackEngine.prototype.get_dirty_nodes=obsolete(GridStackEngine.prototype.getDirtyNodes,'get_dirty_nodes','getDirtyNodes');GridStackEngine.prototype.add_node=obsolete(GridStackEngine.prototype.addNode,'add_node','addNode, ');GridStackEngine.prototype.remove_node=obsolete(GridStackEngine.prototype.removeNode,'remove_node','removeNode');GridStackEngine.prototype.can_move_node=obsolete(GridStackEngine.prototype.canMoveNode,'can_move_node','canMoveNode');GridStackEngine.prototype.move_node=obsolete(GridStackEngine.prototype.moveNode,'move_node','moveNode');GridStackEngine.prototype.get_grid_height=obsolete(GridStackEngine.prototype.getGridHeight,'get_grid_height','getGridHeight');GridStackEngine.prototype.begin_update=obsolete(GridStackEngine.prototype.beginUpdate,'begin_update','beginUpdate');GridStackEngine.prototype.end_update=obsolete(GridStackEngine.prototype.endUpdate,'end_update','endUpdate');GridStackEngine.prototype.can_be_placed_with_respect_to_height=obsolete(GridStackEngine.prototype.canBePlacedWithRespectToHeight,'can_be_placed_with_respect_to_height','canBePlacedWithRespectToHeight');GridStack.prototype._trigger_change_event=obsolete(GridStack.prototype._triggerChangeEvent,'_trigger_change_event','_triggerChangeEvent');GridStack.prototype._init_styles=obsolete(GridStack.prototype._initStyles,'_init_styles','_initStyles');GridStack.prototype._update_styles=obsolete(GridStack.prototype._updateStyles,'_update_styles','_updateStyles');GridStack.prototype._update_container_height=obsolete(GridStack.prototype._updateContainerHeight,'_update_container_height','_updateContainerHeight');GridStack.prototype._is_one_column_mode=obsolete(GridStack.prototype._isOneColumnMode,'_is_one_column_mode','_isOneColumnMode');GridStack.prototype._prepare_element=obsolete(GridStack.prototype._prepareElement,'_prepare_element','_prepareElement');GridStack.prototype.set_animation=obsolete(GridStack.prototype.setAnimation,'set_animation','setAnimation');GridStack.prototype.add_widget=obsolete(GridStack.prototype.addWidget,'add_widget','addWidget');GridStack.prototype.make_widget=obsolete(GridStack.prototype.makeWidget,'make_widget','makeWidget');GridStack.prototype.will_it_fit=obsolete(GridStack.prototype.willItFit,'will_it_fit','willItFit');GridStack.prototype.remove_widget=obsolete(GridStack.prototype.removeWidget,'remove_widget','removeWidget');GridStack.prototype.remove_all=obsolete(GridStack.prototype.removeAll,'remove_all','removeAll');GridStack.prototype.min_height=obsolete(GridStack.prototype.minHeight,'min_height','minHeight');GridStack.prototype.min_width=obsolete(GridStack.prototype.minWidth,'min_width','minWidth');GridStack.prototype._update_element=obsolete(GridStack.prototype._updateElement,'_update_element','_updateElement');GridStack.prototype.cell_height=obsolete(GridStack.prototype.cellHeight,'cell_height','cellHeight');GridStack.prototype.cell_width=obsolete(GridStack.prototype.cellWidth,'cell_width','cellWidth');GridStack.prototype.get_cell_from_pixel=obsolete(GridStack.prototype.getCellFromPixel,'get_cell_from_pixel','getCellFromPixel');GridStack.prototype.batch_update=obsolete(GridStack.prototype.batchUpdate,'batch_update','batchUpdate');GridStack.prototype.is_area_empty=obsolete(GridStack.prototype.isAreaEmpty,'is_area_empty','isAreaEmpty');GridStack.prototype.set_static=obsolete(GridStack.prototype.setStatic,'set_static','setStatic');GridStack.prototype._set_static_class=obsolete(GridStack.prototype._setStaticClass,'_set_static_class','_setStaticClass');// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
scope.GridStackUI=GridStack;scope.GridStackUI.Utils=Utils;scope.GridStackUI.Engine=GridStackEngine;$.fn.gridstack=function(opts){return this.each(function(){var o=$(this);if(!o.data('gridstack')){o.data('gridstack',new GridStack(this,opts));}});};return scope.GridStackUI;});/**
 * gridstack-angular - Angular Gridstack.js directive
 * @version v0.5.0
 * @author Kevin Dietrich
 * @link https://github.com/kdietrich/gridstack-angular#readme
 * @license MIT
 */(function(){'use strict';angular.module('gridstack-angular',[]);var app=angular.module('gridstack-angular');app.controller('GridstackController',['$scope',function($scope){var gridstack=null;this.init=function(element,options){gridstack=element.gridstack(options).data('gridstack');return gridstack;};this.removeItem=function(element){if(gridstack){return gridstack.removeWidget(element,false);}return null;};this.addItem=function(element){if(gridstack){gridstack.makeWidget(element);return element;}return null;};}]);})();(function(){'use strict';var app=angular.module('gridstack-angular');app.directive('gridstack',['$timeout',function($timeout){return{restrict:'A',controller:'GridstackController',scope:{onChange:'&',onDragStart:'&',onDragStop:'&',onResizeStart:'&',onResizeStop:'&',gridstackHandler:'=?',options:'='},link:function link(scope,element,attrs,controller,ngModel){var gridstack=controller.init(element,scope.options);scope.gridstackHandler=gridstack;element.on('change',function(e,items){$timeout(function(){scope.$apply();scope.onChange({event:e,items:items});});});element.on('dragstart',function(e,ui){scope.onDragStart({event:e,ui:ui});});element.on('dragstop',function(e,ui){$timeout(function(){scope.$apply();scope.onDragStop({event:e,ui:ui});});});element.on('resizestart',function(e,ui){scope.onResizeStart({event:e,ui:ui});});element.on('resizestop',function(e,ui){$timeout(function(){scope.$apply();scope.onResizeStop({event:e,ui:ui});});});}};}]);})();(function(){'use strict';var app=angular.module('gridstack-angular');app.directive('gridstackItem',['$timeout',function($timeout){return{restrict:'A',controller:'GridstackController',require:'^gridstack',scope:{gridstackItem:'=',onItemAdded:'&',onItemRemoved:'&',gsItemId:'=?',gsItemX:'=',gsItemY:'=',gsItemWidth:'=',gsItemHeight:'=',gsItemAutopos:'='},link:function link(scope,element,attrs,controller){if(scope.gsItemId){$(element).attr('data-gs-id',scope.gsItemId);}$(element).attr('data-gs-x',scope.gsItemX);$(element).attr('data-gs-y',scope.gsItemY);$(element).attr('data-gs-width',scope.gsItemWidth);$(element).attr('data-gs-height',scope.gsItemHeight);$(element).attr('data-gs-auto-position',scope.gsItemAutopos);var widget=controller.addItem(element);var item=element.data('_gridstack_node');$timeout(function(){scope.onItemAdded({item:item});});scope.$watch(function(){return $(element).attr('data-gs-id');},function(val){scope.gsItemId=val;});scope.$watch(function(){return $(element).attr('data-gs-x');},function(val){scope.gsItemX=Number(val);});scope.$watch(function(){return $(element).attr('data-gs-y');},function(val){scope.gsItemY=Number(val);});scope.$watch(function(){return $(element).attr('data-gs-width');},function(val){scope.gsItemWidth=Number(val);});scope.$watch(function(){return $(element).attr('data-gs-height');},function(val){scope.gsItemHeight=Number(val);});element.bind('$destroy',function(){var item=element.data('_gridstack_node');scope.onItemRemoved({item:item});controller.removeItem(element);});}};}]);})();/*!
* angular-formly JavaScript Library v8.3.0
*
* @license MIT (http://license.angular-formly.com)
*
* built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us>
* (ó ì_í)=óò=(ì_í ò)
*/(function webpackUniversalModuleDefinition(root,factory){if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object'&&(typeof module==="undefined"?"undefined":_typeof(module))==='object')module.exports=factory(require("angular"),require("api-check"));else if(typeof define==='function'&&define.amd)define(["angular","api-check"],factory);else if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object')exports["ngFormly"]=factory(require("angular"),require("api-check"));else root["ngFormly"]=factory(root["angular"],root["apiCheck"]);})(void 0,function(__WEBPACK_EXTERNAL_MODULE_3__,__WEBPACK_EXTERNAL_MODULE_5__){return/******/function(modules){// webpackBootstrap
/******/ // The module cache
/******/var installedModules={};/******/ // The require function
/******/function __webpack_require__(moduleId){/******/ // Check if module is in cache
/******/if(installedModules[moduleId])/******/return installedModules[moduleId].exports;/******/ // Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/exports:{},/******/id:moduleId,/******/loaded:false/******/};/******/ // Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******/ // Flag the module as loaded
/******/module.loaded=true;/******/ // Return the exports of the module
/******/return module.exports;/******/}/******/ // expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******/ // expose the module cache
/******/__webpack_require__.c=installedModules;/******/ // __webpack_public_path__
/******/__webpack_require__.p="";/******/ // Load entry module and return exports
/******/return __webpack_require__(0);/******/}/************************************************************************/ /******/([/* 0 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _indexCommon=__webpack_require__(1);var _indexCommon2=_interopRequireDefault(_indexCommon);exports['default']=_indexCommon2['default'];module.exports=exports['default'];/***/},/* 1 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);var _providersFormlyApiCheck=__webpack_require__(4);var _providersFormlyApiCheck2=_interopRequireDefault(_providersFormlyApiCheck);var _otherDocsBaseUrl=__webpack_require__(6);var _otherDocsBaseUrl2=_interopRequireDefault(_otherDocsBaseUrl);var _providersFormlyUsability=__webpack_require__(7);var _providersFormlyUsability2=_interopRequireDefault(_providersFormlyUsability);var _providersFormlyConfig=__webpack_require__(8);var _providersFormlyConfig2=_interopRequireDefault(_providersFormlyConfig);var _providersFormlyValidationMessages=__webpack_require__(10);var _providersFormlyValidationMessages2=_interopRequireDefault(_providersFormlyValidationMessages);var _servicesFormlyUtil=__webpack_require__(11);var _servicesFormlyUtil2=_interopRequireDefault(_servicesFormlyUtil);var _servicesFormlyWarn=__webpack_require__(12);var _servicesFormlyWarn2=_interopRequireDefault(_servicesFormlyWarn);var _directivesFormlyCustomValidation=__webpack_require__(13);var _directivesFormlyCustomValidation2=_interopRequireDefault(_directivesFormlyCustomValidation);var _directivesFormlyField=__webpack_require__(14);var _directivesFormlyField2=_interopRequireDefault(_directivesFormlyField);var _directivesFormlyFocus=__webpack_require__(15);var _directivesFormlyFocus2=_interopRequireDefault(_directivesFormlyFocus);var _directivesFormlyForm=__webpack_require__(16);var _directivesFormlyForm2=_interopRequireDefault(_directivesFormlyForm);var _directivesFormlyFormController=__webpack_require__(17);var _directivesFormlyFormController2=_interopRequireDefault(_directivesFormlyFormController);var _runFormlyNgModelAttrsManipulator=__webpack_require__(18);var _runFormlyNgModelAttrsManipulator2=_interopRequireDefault(_runFormlyNgModelAttrsManipulator);var _runFormlyCustomTags=__webpack_require__(19);var _runFormlyCustomTags2=_interopRequireDefault(_runFormlyCustomTags);var ngModuleName='formly';exports['default']=ngModuleName;var ngModule=_angularFix2['default'].module(ngModuleName,[]);ngModule.constant('formlyApiCheck',_providersFormlyApiCheck2['default']);ngModule.constant('formlyErrorAndWarningsUrlPrefix',_otherDocsBaseUrl2['default']);ngModule.constant('formlyVersion',"8.3.0");// <-- webpack variable
ngModule.provider('formlyUsability',_providersFormlyUsability2['default']);ngModule.provider('formlyConfig',_providersFormlyConfig2['default']);ngModule.factory('formlyValidationMessages',_providersFormlyValidationMessages2['default']);ngModule.factory('formlyUtil',_servicesFormlyUtil2['default']);ngModule.factory('formlyWarn',_servicesFormlyWarn2['default']);ngModule.directive('formlyCustomValidation',_directivesFormlyCustomValidation2['default']);ngModule.directive('formlyField',_directivesFormlyField2['default']);ngModule.directive('formlyFocus',_directivesFormlyFocus2['default']);ngModule.directive('formlyForm',_directivesFormlyForm2['default']);ngModule.controller('FormlyFormController',_directivesFormlyFormController2['default']);ngModule.run(_runFormlyNgModelAttrsManipulator2['default']);ngModule.run(_runFormlyCustomTags2['default']);module.exports=exports['default'];/***/},/* 2 */ /***/function(module,exports,__webpack_require__){// some versions of angular don't export the angular module properly,
// so we get it from window in this case.
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var angular=__webpack_require__(3);/* istanbul ignore next */if(!angular.version){angular=window.angular;}exports['default']=angular;module.exports=exports['default'];/***/},/* 3 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_3__;/***/},/* 4 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);var _apiCheck=__webpack_require__(5);var _apiCheck2=_interopRequireDefault(_apiCheck);var apiCheck=(0,_apiCheck2['default'])({output:{prefix:'angular-formly:',docsBaseUrl:__webpack_require__(6)}});function shapeRequiredIfNot(otherProps,propChecker){if(!_angularFix2['default'].isArray(otherProps)){otherProps=[otherProps];}var type='specified if these are not specified: `'+otherProps.join(', ')+'` (otherwise it\'s optional)';function shapeRequiredIfNotDefinition(prop,propName,location,obj){var propExists=obj&&obj.hasOwnProperty(propName);var otherPropsExist=otherProps.some(function(otherProp){return obj&&obj.hasOwnProperty(otherProp);});if(!otherPropsExist&&!propExists){return apiCheck.utils.getError(propName,location,type);}else if(propExists){return propChecker(prop,propName,location,obj);}}shapeRequiredIfNotDefinition.type=type;return apiCheck.utils.checkerHelpers.setupChecker(shapeRequiredIfNotDefinition);}var formlyExpression=apiCheck.oneOfType([apiCheck.string,apiCheck.func]);var specifyWrapperType=apiCheck.typeOrArrayOf(apiCheck.string).nullable;var apiCheckProperty=apiCheck.func;var apiCheckInstanceProperty=apiCheck.shape.onlyIf('apiCheck',apiCheck.func.withProperties({warn:apiCheck.func,'throw':apiCheck.func,shape:apiCheck.func}));var apiCheckFunctionProperty=apiCheck.shape.onlyIf('apiCheck',apiCheck.oneOf(['throw','warn']));var formlyWrapperType=apiCheck.shape({name:shapeRequiredIfNot('types',apiCheck.string).optional,template:apiCheck.shape.ifNot('templateUrl',apiCheck.string).optional,templateUrl:apiCheck.shape.ifNot('template',apiCheck.string).optional,types:apiCheck.typeOrArrayOf(apiCheck.string).optional,overwriteOk:apiCheck.bool.optional,apiCheck:apiCheckProperty.optional,apiCheckInstance:apiCheckInstanceProperty.optional,apiCheckFunction:apiCheckFunctionProperty.optional,apiCheckOptions:apiCheck.object.optional}).strict;var expressionProperties=apiCheck.objectOf(apiCheck.oneOfType([formlyExpression,apiCheck.shape({expression:formlyExpression,message:formlyExpression.optional}).strict]));var modelChecker=apiCheck.oneOfType([apiCheck.string,apiCheck.object]);var templateManipulators=apiCheck.shape({preWrapper:apiCheck.arrayOf(apiCheck.func).nullable.optional,postWrapper:apiCheck.arrayOf(apiCheck.func).nullable.optional}).strict.nullable;var validatorChecker=apiCheck.objectOf(apiCheck.oneOfType([formlyExpression,apiCheck.shape({expression:formlyExpression,message:formlyExpression.optional}).strict]));var watcherChecker=apiCheck.typeOrArrayOf(apiCheck.shape({expression:formlyExpression.optional,listener:formlyExpression.optional,runFieldExpressions:apiCheck.bool.optional}));var fieldOptionsApiShape={$$hashKey:apiCheck.any.optional,type:apiCheck.shape.ifNot(['template','templateUrl'],apiCheck.string).optional,template:apiCheck.shape.ifNot(['type','templateUrl'],apiCheck.oneOfType([apiCheck.string,apiCheck.func])).optional,templateUrl:apiCheck.shape.ifNot(['type','template'],apiCheck.oneOfType([apiCheck.string,apiCheck.func])).optional,key:apiCheck.oneOfType([apiCheck.string,apiCheck.number]).optional,model:modelChecker.optional,originalModel:modelChecker.optional,className:apiCheck.string.optional,id:apiCheck.string.optional,name:apiCheck.string.optional,expressionProperties:expressionProperties.optional,extras:apiCheck.shape({validateOnModelChange:apiCheck.bool.optional,skipNgModelAttrsManipulator:apiCheck.oneOfType([apiCheck.string,apiCheck.bool]).optional}).strict.optional,data:apiCheck.object.optional,templateOptions:apiCheck.object.optional,wrapper:specifyWrapperType.optional,modelOptions:apiCheck.shape({updateOn:apiCheck.string.optional,debounce:apiCheck.oneOfType([apiCheck.objectOf(apiCheck.number),apiCheck.number]).optional,allowInvalid:apiCheck.bool.optional,getterSetter:apiCheck.bool.optional,timezone:apiCheck.string.optional}).optional,watcher:watcherChecker.optional,validators:validatorChecker.optional,asyncValidators:validatorChecker.optional,parsers:apiCheck.arrayOf(formlyExpression).optional,formatters:apiCheck.arrayOf(formlyExpression).optional,noFormControl:apiCheck.bool.optional,hide:apiCheck.bool.optional,hideExpression:formlyExpression.optional,ngModelElAttrs:apiCheck.objectOf(apiCheck.string).optional,ngModelAttrs:apiCheck.objectOf(apiCheck.shape({statement:apiCheck.shape.ifNot(['value','attribute','bound','boolean'],apiCheck.any).optional,value:apiCheck.shape.ifNot('statement',apiCheck.any).optional,attribute:apiCheck.shape.ifNot('statement',apiCheck.any).optional,bound:apiCheck.shape.ifNot('statement',apiCheck.any).optional,"boolean":apiCheck.shape.ifNot('statement',apiCheck.any).optional}).strict).optional,elementAttributes:apiCheck.objectOf(apiCheck.string).optional,optionsTypes:apiCheck.typeOrArrayOf(apiCheck.string).optional,link:apiCheck.func.optional,controller:apiCheck.oneOfType([apiCheck.string,apiCheck.func,apiCheck.array]).optional,validation:apiCheck.shape({show:apiCheck.bool.nullable.optional,messages:apiCheck.objectOf(formlyExpression).optional,errorExistsAndShouldBeVisible:apiCheck.bool.optional}).optional,formControl:apiCheck.typeOrArrayOf(apiCheck.object).optional,value:apiCheck.func.optional,runExpressions:apiCheck.func.optional,templateManipulators:templateManipulators.optional,resetModel:apiCheck.func.optional,updateInitialValue:apiCheck.func.optional,initialValue:apiCheck.any.optional,defaultValue:apiCheck.any.optional};var formlyFieldOptions=apiCheck.shape(fieldOptionsApiShape).strict;var formOptionsApi=apiCheck.shape({formState:apiCheck.object.optional,resetModel:apiCheck.func.optional,updateInitialValue:apiCheck.func.optional,removeChromeAutoComplete:apiCheck.bool.optional,templateManipulators:templateManipulators.optional,manualModelWatcher:apiCheck.oneOfType([apiCheck.bool,apiCheck.func]).optional,watchAllExpressions:apiCheck.bool.optional,wrapper:specifyWrapperType.optional,fieldTransform:apiCheck.oneOfType([apiCheck.func,apiCheck.array]).optional,data:apiCheck.object.optional}).strict;var fieldGroup=apiCheck.shape({$$hashKey:apiCheck.any.optional,key:apiCheck.oneOfType([apiCheck.string,apiCheck.number]).optional,// danger. Nested field groups wont get api-checked...
fieldGroup:apiCheck.arrayOf(apiCheck.oneOfType([formlyFieldOptions,apiCheck.object])),className:apiCheck.string.optional,options:formOptionsApi.optional,templateOptions:apiCheck.object.optional,wrapper:specifyWrapperType.optional,watcher:watcherChecker.optional,hide:apiCheck.bool.optional,hideExpression:formlyExpression.optional,data:apiCheck.object.optional,model:modelChecker.optional,form:apiCheck.object.optional,elementAttributes:apiCheck.objectOf(apiCheck.string).optional}).strict;var typeOptionsDefaultOptions=_angularFix2['default'].copy(fieldOptionsApiShape);typeOptionsDefaultOptions.key=apiCheck.string.optional;var formlyTypeOptions=apiCheck.shape({name:apiCheck.string,template:apiCheck.shape.ifNot('templateUrl',apiCheck.oneOfType([apiCheck.string,apiCheck.func])).optional,templateUrl:apiCheck.shape.ifNot('template',apiCheck.oneOfType([apiCheck.string,apiCheck.func])).optional,controller:apiCheck.oneOfType([apiCheck.func,apiCheck.string,apiCheck.array]).optional,link:apiCheck.func.optional,defaultOptions:apiCheck.oneOfType([apiCheck.func,apiCheck.shape(typeOptionsDefaultOptions)]).optional,'extends':apiCheck.string.optional,wrapper:specifyWrapperType.optional,data:apiCheck.object.optional,apiCheck:apiCheckProperty.optional,apiCheckInstance:apiCheckInstanceProperty.optional,apiCheckFunction:apiCheckFunctionProperty.optional,apiCheckOptions:apiCheck.object.optional,overwriteOk:apiCheck.bool.optional}).strict;_angularFix2['default'].extend(apiCheck,{formlyTypeOptions:formlyTypeOptions,formlyFieldOptions:formlyFieldOptions,formlyExpression:formlyExpression,formlyWrapperType:formlyWrapperType,fieldGroup:fieldGroup,formOptionsApi:formOptionsApi});exports['default']=apiCheck;module.exports=exports['default'];/***/},/* 5 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_5__;/***/},/* 6 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]="https://github.com/formly-js/angular-formly/blob/"+"8.3.0"+"/other/ERRORS_AND_WARNINGS.md#";module.exports=exports["default"];/***/},/* 7 */ /***/function(module,exports,__webpack_require__){'use strict';formlyUsability.$inject=["formlyApiCheck","formlyErrorAndWarningsUrlPrefix"];Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);exports['default']=formlyUsability;// @ngInject
function formlyUsability(formlyApiCheck,formlyErrorAndWarningsUrlPrefix){var _this=this;_angularFix2['default'].extend(this,{getFormlyError:getFormlyError,getFieldError:getFieldError,checkWrapper:checkWrapper,checkWrapperTemplate:checkWrapperTemplate,getErrorMessage:getErrorMessage,$get:function $get(){return _this;}});function getFieldError(errorInfoSlug,message,field){if(arguments.length<3){field=message;message=errorInfoSlug;errorInfoSlug=null;}return new Error(getErrorMessage(errorInfoSlug,message)+(' Field definition: '+_angularFix2['default'].toJson(field)));}function getFormlyError(errorInfoSlug,message){if(!message){message=errorInfoSlug;errorInfoSlug=null;}return new Error(getErrorMessage(errorInfoSlug,message));}function getErrorMessage(errorInfoSlug,message){var url='';if(errorInfoSlug!==null){url=''+formlyErrorAndWarningsUrlPrefix+errorInfoSlug;}return'Formly Error: '+message+'. '+url;}function checkWrapper(wrapper){formlyApiCheck['throw'](formlyApiCheck.formlyWrapperType,wrapper,{prefix:'formlyConfig.setWrapper',urlSuffix:'setwrapper-validation-failed'});}function checkWrapperTemplate(template,additionalInfo){var formlyTransclude='<formly-transclude></formly-transclude>';if(template.indexOf(formlyTransclude)===-1){throw getFormlyError('Template wrapper templates must use "'+formlyTransclude+'" somewhere in them. '+('This one does not have "<formly-transclude></formly-transclude>" in it: '+template)+'\n'+('Additional information: '+JSON.stringify(additionalInfo)));}}}module.exports=exports['default'];/***/},/* 8 */ /***/function(module,exports,__webpack_require__){'use strict';formlyConfig.$inject=["formlyUsabilityProvider","formlyErrorAndWarningsUrlPrefix","formlyApiCheck"];Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);var _otherUtils=__webpack_require__(9);var _otherUtils2=_interopRequireDefault(_otherUtils);exports['default']=formlyConfig;// @ngInject
function formlyConfig(formlyUsabilityProvider,formlyErrorAndWarningsUrlPrefix,formlyApiCheck){var _this2=this;var typeMap={};var templateWrappersMap={};var defaultWrapperName='default';var _this=this;var getError=formlyUsabilityProvider.getFormlyError;_angularFix2['default'].extend(this,{setType:setType,getType:getType,getTypes:getTypes,getTypeHeritage:getTypeHeritage,setWrapper:setWrapper,getWrapper:getWrapper,getWrapperByType:getWrapperByType,removeWrapperByName:removeWrapperByName,removeWrappersForType:removeWrappersForType,disableWarnings:false,extras:{disableNgModelAttrsManipulator:false,fieldTransform:[],ngModelAttrsManipulatorPreferUnbound:false,removeChromeAutoComplete:false,defaultHideDirective:'ng-if',getFieldId:null},templateManipulators:{preWrapper:[],postWrapper:[]},$get:function $get(){return _this2;}});function setType(options){if(_angularFix2['default'].isArray(options)){var _ret=function(){var allTypes=[];_angularFix2['default'].forEach(options,function(item){allTypes.push(setType(item));});return{v:allTypes};}();if(_typeof(_ret)==='object')return _ret.v;}else if(_angularFix2['default'].isObject(options)){checkType(options);if(options['extends']){extendTypeOptions(options);}typeMap[options.name]=options;return typeMap[options.name];}else{throw getError('You must provide an object or array for setType. You provided: '+JSON.stringify(arguments));}}function checkType(options){formlyApiCheck['throw'](formlyApiCheck.formlyTypeOptions,options,{prefix:'formlyConfig.setType',url:'settype-validation-failed'});if(!options.overwriteOk){checkOverwrite(options.name,typeMap,options,'types');}else{options.overwriteOk=undefined;}}function extendTypeOptions(options){var extendsType=getType(options['extends'],true,options);extendTypeControllerFunction(options,extendsType);extendTypeLinkFunction(options,extendsType);extendTypeDefaultOptions(options,extendsType);_otherUtils2['default'].reverseDeepMerge(options,extendsType);extendTemplate(options,extendsType);}function extendTemplate(options,extendsType){if(options.template&&extendsType.templateUrl){delete options.templateUrl;}else if(options.templateUrl&&extendsType.template){delete options.template;}}function extendTypeControllerFunction(options,extendsType){var extendsCtrl=extendsType.controller;if(!_angularFix2['default'].isDefined(extendsCtrl)){return;}var optionsCtrl=options.controller;if(_angularFix2['default'].isDefined(optionsCtrl)){options.controller=function($scope,$controller){$controller(extendsCtrl,{$scope:$scope});$controller(optionsCtrl,{$scope:$scope});};options.controller.$inject=['$scope','$controller'];}else{options.controller=extendsCtrl;}}function extendTypeLinkFunction(options,extendsType){var extendsFn=extendsType.link;if(!_angularFix2['default'].isDefined(extendsFn)){return;}var optionsFn=options.link;if(_angularFix2['default'].isDefined(optionsFn)){options.link=function(){extendsFn.apply(undefined,arguments);optionsFn.apply(undefined,arguments);};}else{options.link=extendsFn;}}function extendTypeDefaultOptions(options,extendsType){var extendsDO=extendsType.defaultOptions;if(!_angularFix2['default'].isDefined(extendsDO)){return;}var optionsDO=options.defaultOptions||{};var optionsDOIsFn=_angularFix2['default'].isFunction(optionsDO);var extendsDOIsFn=_angularFix2['default'].isFunction(extendsDO);if(extendsDOIsFn){options.defaultOptions=function defaultOptions(opts,scope){var extendsDefaultOptions=extendsDO(opts,scope);var mergedDefaultOptions={};_otherUtils2['default'].reverseDeepMerge(mergedDefaultOptions,opts,extendsDefaultOptions);var extenderOptionsDefaultOptions=optionsDO;if(optionsDOIsFn){extenderOptionsDefaultOptions=extenderOptionsDefaultOptions(mergedDefaultOptions,scope);}_otherUtils2['default'].reverseDeepMerge(extenderOptionsDefaultOptions,extendsDefaultOptions);return extenderOptionsDefaultOptions;};}else if(optionsDOIsFn){options.defaultOptions=function defaultOptions(opts,scope){var newDefaultOptions={};_otherUtils2['default'].reverseDeepMerge(newDefaultOptions,opts,extendsDO);return optionsDO(newDefaultOptions,scope);};}}function getType(name,throwError,errorContext){if(!name){return undefined;}var type=typeMap[name];if(!type&&throwError===true){throw getError('There is no type by the name of "'+name+'": '+JSON.stringify(errorContext));}else{return type;}}function getTypes(){return typeMap;}function getTypeHeritage(parent){var heritage=[];var type=parent;if(_angularFix2['default'].isString(type)){type=getType(parent);}parent=type['extends'];while(parent){type=getType(parent);heritage.push(type);parent=type['extends'];}return heritage;}function setWrapper(_x,_x2){var _again=true;_function:while(_again){var options=_x,name=_x2;_again=false;if(_angularFix2['default'].isArray(options)){return options.map(function(wrapperOptions){return setWrapper(wrapperOptions);});}else if(_angularFix2['default'].isObject(options)){options.types=getOptionsTypes(options);options.name=getOptionsName(options,name);checkWrapperAPI(options);templateWrappersMap[options.name]=options;return options;}else if(_angularFix2['default'].isString(options)){_x={template:options,name:name};_x2=undefined;_again=true;continue _function;}}}function getOptionsTypes(options){if(_angularFix2['default'].isString(options.types)){return[options.types];}if(!_angularFix2['default'].isDefined(options.types)){return[];}else{return options.types;}}function getOptionsName(options,name){return options.name||name||options.types.join(' ')||defaultWrapperName;}function checkWrapperAPI(options){formlyUsabilityProvider.checkWrapper(options);if(options.template){formlyUsabilityProvider.checkWrapperTemplate(options.template,options);}if(!options.overwriteOk){checkOverwrite(options.name,templateWrappersMap,options,'templateWrappers');}else{delete options.overwriteOk;}checkWrapperTypes(options);}function checkWrapperTypes(options){var shouldThrow=!_angularFix2['default'].isArray(options.types)||!options.types.every(_angularFix2['default'].isString);if(shouldThrow){throw getError('Attempted to create a template wrapper with types that is not a string or an array of strings');}}function checkOverwrite(property,object,newValue,objectName){if(object.hasOwnProperty(property)){warn('overwriting-types-or-wrappers',['Attempting to overwrite '+property+' on '+objectName+' which is currently',JSON.stringify(object[property])+' with '+JSON.stringify(newValue),'To supress this warning, specify the property "overwriteOk: true"'].join(' '));}}function getWrapper(name){return templateWrappersMap[name||defaultWrapperName];}function getWrapperByType(type){/* eslint prefer-const:0 */var wrappers=[];for(var _name in templateWrappersMap){if(templateWrappersMap.hasOwnProperty(_name)){if(templateWrappersMap[_name].types&&templateWrappersMap[_name].types.indexOf(type)!==-1){wrappers.push(templateWrappersMap[_name]);}}}return wrappers;}function removeWrapperByName(name){var wrapper=templateWrappersMap[name];delete templateWrappersMap[name];return wrapper;}function removeWrappersForType(type){var wrappers=getWrapperByType(type);if(!wrappers){return undefined;}if(!_angularFix2['default'].isArray(wrappers)){return removeWrapperByName(wrappers.name);}else{wrappers.forEach(function(wrapper){return removeWrapperByName(wrapper.name);});return wrappers;}}function warn(){if(!_this.disableWarnings&&console.warn){/* eslint no-console:0 */var args=Array.prototype.slice.call(arguments);var warnInfoSlug=args.shift();args.unshift('Formly Warning:');args.push(''+formlyErrorAndWarningsUrlPrefix+warnInfoSlug);console.warn.apply(console,_toConsumableArray(args));}}}module.exports=exports['default'];/***/},/* 9 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);exports['default']={containsSelector:containsSelector,containsSpecialChar:containsSpecialChar,formlyEval:formlyEval,getFieldId:getFieldId,reverseDeepMerge:reverseDeepMerge,findByNodeName:findByNodeName,arrayify:arrayify,extendFunction:extendFunction,extendArray:extendArray,startsWith:startsWith,contains:contains};function containsSelector(string){return containsSpecialChar(string,'.')||containsSpecialChar(string,'[')&&containsSpecialChar(string,']');}function containsSpecialChar(a,b){if(!a||!a.indexOf){return false;}return a.indexOf(b)!==-1;}function formlyEval(scope,expression,$modelValue,$viewValue,extraLocals){if(_angularFix2['default'].isFunction(expression)){return expression($viewValue,$modelValue,scope,extraLocals);}else{return scope.$eval(expression,_angularFix2['default'].extend({$viewValue:$viewValue,$modelValue:$modelValue},extraLocals));}}function getFieldId(formId,options,index){if(options.id){return options.id;}var type=options.type;if(!type&&options.template){type='template';}else if(!type&&options.templateUrl){type='templateUrl';}return[formId,type,options.key,index].join('_');}function reverseDeepMerge(dest){_angularFix2['default'].forEach(arguments,function(src,index){if(!index){return;}_angularFix2['default'].forEach(src,function(val,prop){if(!_angularFix2['default'].isDefined(dest[prop])){dest[prop]=_angularFix2['default'].copy(val);}else if(objAndSameType(dest[prop],val)){reverseDeepMerge(dest[prop],val);}});});return dest;}function objAndSameType(obj1,obj2){return _angularFix2['default'].isObject(obj1)&&_angularFix2['default'].isObject(obj2)&&Object.getPrototypeOf(obj1)===Object.getPrototypeOf(obj2);}// recurse down a node tree to find a node with matching nodeName, for custom tags jQuery.find doesn't work in IE8
function findByNodeName(el,nodeName){if(!el.prop){// not a jQuery or jqLite object -> wrap it
el=_angularFix2['default'].element(el);}if(el.prop('nodeName')===nodeName.toUpperCase()){return el;}var c=el.children();for(var i=0;c&&i<c.length;i++){var node=findByNodeName(c[i],nodeName);if(node){return node;}}}function arrayify(obj){if(obj&&!_angularFix2['default'].isArray(obj)){obj=[obj];}else if(!obj){obj=[];}return obj;}function extendFunction(){for(var _len=arguments.length,fns=Array(_len),_key=0;_key<_len;_key++){fns[_key]=arguments[_key];}return function extendedFunction(){var args=arguments;fns.forEach(function(fn){return fn.apply(null,args);});};}function extendArray(primary,secondary,property){if(property){primary=primary[property];secondary=secondary[property];}if(secondary&&primary){_angularFix2['default'].forEach(secondary,function(item){if(primary.indexOf(item)===-1){primary.push(item);}});return primary;}else if(secondary){return secondary;}else{return primary;}}function startsWith(str,search){if(_angularFix2['default'].isString(str)&&_angularFix2['default'].isString(search)){return str.length>=search.length&&str.substring(0,search.length)===search;}else{return false;}}function contains(str,search){if(_angularFix2['default'].isString(str)&&_angularFix2['default'].isString(search)){return str.length>=search.length&&str.indexOf(search)!==-1;}else{return false;}}module.exports=exports['default'];/***/},/* 10 */ /***/function(module,exports){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=formlyValidationMessages;// @ngInject
function formlyValidationMessages(){var validationMessages={addTemplateOptionValueMessage:addTemplateOptionValueMessage,addStringMessage:addStringMessage,messages:{}};return validationMessages;function addTemplateOptionValueMessage(name,prop,prefix,suffix,alternate){validationMessages.messages[name]=templateOptionValue(prop,prefix,suffix,alternate);}function addStringMessage(name,string){validationMessages.messages[name]=function(){return string;};}function templateOptionValue(prop,prefix,suffix,alternate){return function getValidationMessage(viewValue,modelValue,scope){if(typeof scope.options.templateOptions[prop]!=='undefined'){return prefix+' '+scope.options.templateOptions[prop]+' '+suffix;}else{return alternate;}};}}module.exports=exports['default'];/***/},/* 11 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _otherUtils=__webpack_require__(9);var _otherUtils2=_interopRequireDefault(_otherUtils);exports['default']=formlyUtil;// @ngInject
function formlyUtil(){return _otherUtils2['default'];}module.exports=exports['default'];/***/},/* 12 */ /***/function(module,exports){'use strict';formlyWarn.$inject=["formlyConfig","formlyErrorAndWarningsUrlPrefix","$log"];Object.defineProperty(exports,'__esModule',{value:true});function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}exports['default']=formlyWarn;// @ngInject
function formlyWarn(formlyConfig,formlyErrorAndWarningsUrlPrefix,$log){return function warn(){if(!formlyConfig.disableWarnings){var args=Array.prototype.slice.call(arguments);var warnInfoSlug=args.shift();args.unshift('Formly Warning:');args.push(''+formlyErrorAndWarningsUrlPrefix+warnInfoSlug);$log.warn.apply($log,_toConsumableArray(args));}};}module.exports=exports['default'];/***/},/* 13 */ /***/function(module,exports,__webpack_require__){'use strict';formlyCustomValidation.$inject=["formlyUtil"];Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);exports['default']=formlyCustomValidation;// @ngInject
function formlyCustomValidation(formlyUtil){return{restrict:'A',require:'ngModel',link:function formlyCustomValidationLink(scope,el,attrs,ctrl){var opts=scope.options;opts.validation.messages=opts.validation.messages||{};_angularFix2['default'].forEach(opts.validation.messages,function(message,key){opts.validation.messages[key]=function(){return formlyUtil.formlyEval(scope,message,ctrl.$modelValue,ctrl.$viewValue);};});var useNewValidatorsApi=ctrl.hasOwnProperty('$validators')&&!attrs.hasOwnProperty('useParsers');_angularFix2['default'].forEach(opts.validators,_angularFix2['default'].bind(null,addValidatorToPipeline,false));_angularFix2['default'].forEach(opts.asyncValidators,_angularFix2['default'].bind(null,addValidatorToPipeline,true));function addValidatorToPipeline(isAsync,validator,name){setupMessage(validator,name);validator=_angularFix2['default'].isObject(validator)?validator.expression:validator;if(useNewValidatorsApi){setupWithValidators(validator,name,isAsync);}else{setupWithParsers(validator,name,isAsync);}}function setupMessage(validator,name){var message=validator.message;if(message){opts.validation.messages[name]=function(){return formlyUtil.formlyEval(scope,message,ctrl.$modelValue,ctrl.$viewValue);};}}function setupWithValidators(validator,name,isAsync){var validatorCollection=isAsync?'$asyncValidators':'$validators';ctrl[validatorCollection][name]=function evalValidity(modelValue,viewValue){return formlyUtil.formlyEval(scope,validator,modelValue,viewValue);};}function setupWithParsers(validator,name,isAsync){var inFlightValidator=undefined;ctrl.$parsers.unshift(function evalValidityOfParser(viewValue){var isValid=formlyUtil.formlyEval(scope,validator,ctrl.$modelValue,viewValue);if(isAsync){ctrl.$pending=ctrl.$pending||{};ctrl.$pending[name]=true;inFlightValidator=isValid;isValid.then(function(){if(inFlightValidator===isValid){ctrl.$setValidity(name,true);}})['catch'](function(){if(inFlightValidator===isValid){ctrl.$setValidity(name,false);}})['finally'](function(){var $pending=ctrl.$pending||{};if(Object.keys($pending).length===1){delete ctrl.$pending;}else{delete ctrl.$pending[name];}});}else{ctrl.$setValidity(name,isValid);}return viewValue;});}}};}module.exports=exports['default'];/***/},/* 14 */ /***/function(module,exports,__webpack_require__){'use strict';formlyField.$inject=["$http","$q","$compile","$templateCache","$interpolate","formlyConfig","formlyApiCheck","formlyUtil","formlyUsability","formlyWarn"];Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);var _apiCheck=__webpack_require__(5);var _apiCheck2=_interopRequireDefault(_apiCheck);exports['default']=formlyField;/**
	 * @ngdoc directive
	 * @name formlyField
	 * @restrict AE
	 */ // @ngInject
function formlyField($http,$q,$compile,$templateCache,$interpolate,formlyConfig,formlyApiCheck,formlyUtil,formlyUsability,formlyWarn){FormlyFieldController.$inject=["$scope","$timeout","$parse","$controller","formlyValidationMessages"];var arrayify=formlyUtil.arrayify;return{restrict:'AE',transclude:true,require:'?^formlyForm',scope:{options:'=',model:'=',originalModel:'=?',formId:'@',// TODO: remove formId in a breaking release
index:'=?',fields:'=?',formState:'=?',formOptions:'=?',form:'=?'},// TODO: require form in a breaking release
controller:FormlyFieldController,link:fieldLink};// @ngInject
function FormlyFieldController($scope,$timeout,$parse,$controller,formlyValidationMessages){/* eslint max-statements:[2, 34] */if($scope.options.fieldGroup){setupFieldGroup();return;}var fieldType=getFieldType($scope.options);simplifyLife($scope.options);mergeFieldOptionsWithTypeDefaults($scope.options,fieldType);extendOptionsWithDefaults($scope.options,$scope.index);checkApi($scope.options);// set field id to link labels and fields
// initalization
setFieldIdAndName();setDefaultValue();setInitialValue();runExpressions();watchExpressions();addValidationMessages($scope.options);invokeControllers($scope,$scope.options,fieldType);// function definitions
function runExpressions(){var deferred=$q.defer();// must run on next tick to make sure that the current value is correct.
$timeout(function runExpressionsOnNextTick(){var promises=[];var field=$scope.options;var currentValue=valueGetterSetter();_angularFix2['default'].forEach(field.expressionProperties,function runExpression(expression,prop){var setter=$parse(prop).assign;var promise=$q.when(formlyUtil.formlyEval($scope,expression,currentValue,currentValue)).then(function setFieldValue(value){setter(field,value);});promises.push(promise);});$q.all(promises).then(function(){deferred.resolve();});},0,false);return deferred.promise;}function watchExpressions(){if($scope.formOptions.watchAllExpressions){(function(){var field=$scope.options;var currentValue=valueGetterSetter();_angularFix2['default'].forEach(field.expressionProperties,function watchExpression(expression,prop){var setter=$parse(prop).assign;$scope.$watch(function expressionPropertyWatcher(){return formlyUtil.formlyEval($scope,expression,currentValue,currentValue);},function expressionPropertyListener(value){setter(field,value);},true);});})();}}function valueGetterSetter(newVal){if(!$scope.model||!$scope.options.key){return undefined;}if(_angularFix2['default'].isDefined(newVal)){parseSet($scope.options.key,$scope.model,newVal);}return parseGet($scope.options.key,$scope.model);}function shouldNotUseParseKey(key){return _angularFix2['default'].isNumber(key)||!formlyUtil.containsSelector(key);}function parseSet(key,model,newVal){// If either of these are null/undefined then just return undefined
if(!key&&key!==0||!model){return;}// If we are working with a number then $parse wont work, default back to the old way for now
if(shouldNotUseParseKey(key)){// TODO: Fix this so we can get several levels instead of just one with properties that are numeric
model[key]=newVal;}else{var setter=$parse($scope.options.key).assign;if(setter){setter($scope.model,newVal);}}}function parseGet(key,model){// If either of these are null/undefined then just return undefined
if(!key&&key!==0||!model){return undefined;}// If we are working with a number then $parse wont work, default back to the old way for now
if(shouldNotUseParseKey(key)){// TODO: Fix this so we can get several levels instead of just one with properties that are numeric
return model[key];}else{return $parse(key)(model);}}function simplifyLife(options){// add a few empty objects (if they don't already exist) so you don't have to undefined check everywhere
formlyUtil.reverseDeepMerge(options,{originalModel:options.model,extras:{},data:{},templateOptions:{},validation:{}});// create $scope.to so template authors can reference to instead of $scope.options.templateOptions
$scope.to=$scope.options.templateOptions;$scope.formOptions=$scope.formOptions||{};}function setFieldIdAndName(){if(_angularFix2['default'].isFunction(formlyConfig.extras.getFieldId)){$scope.id=formlyConfig.extras.getFieldId($scope.options,$scope.model,$scope);}else{var formName=$scope.form&&$scope.form.$name||$scope.formId;$scope.id=formlyUtil.getFieldId(formName,$scope.options,$scope.index);}$scope.options.id=$scope.id;$scope.name=$scope.options.name||$scope.options.id;$scope.options.name=$scope.name;}function setDefaultValue(){if(_angularFix2['default'].isDefined($scope.options.defaultValue)&&!_angularFix2['default'].isDefined(parseGet($scope.options.key,$scope.model))){parseSet($scope.options.key,$scope.model,$scope.options.defaultValue);}}function setInitialValue(){$scope.options.initialValue=$scope.model&&parseGet($scope.options.key,$scope.model);}function mergeFieldOptionsWithTypeDefaults(options,type){if(type){mergeOptions(options,type.defaultOptions);}var properOrder=arrayify(options.optionsTypes).reverse();// so the right things are overridden
_angularFix2['default'].forEach(properOrder,function(typeName){mergeOptions(options,formlyConfig.getType(typeName,true,options).defaultOptions);});}function mergeOptions(options,extraOptions){if(extraOptions){if(_angularFix2['default'].isFunction(extraOptions)){extraOptions=extraOptions(options,$scope);}formlyUtil.reverseDeepMerge(options,extraOptions);}}function extendOptionsWithDefaults(options,index){var key=options.key||index||0;_angularFix2['default'].extend(options,{// attach the key in case the formly-field directive is used directly
key:key,value:options.value||valueGetterSetter,runExpressions:runExpressions,resetModel:resetModel,updateInitialValue:updateInitialValue});}function resetModel(){parseSet($scope.options.key,$scope.model,$scope.options.initialValue);if($scope.options.formControl){if(_angularFix2['default'].isArray($scope.options.formControl)){_angularFix2['default'].forEach($scope.options.formControl,function(formControl){resetFormControl(formControl,true);});}else{resetFormControl($scope.options.formControl);}}if($scope.form){$scope.form.$setUntouched&&$scope.form.$setUntouched();$scope.form.$setPristine();}}function resetFormControl(formControl,isMultiNgModel){if(!isMultiNgModel){formControl.$setViewValue(parseGet($scope.options.key,$scope.model));}formControl.$render();formControl.$setUntouched&&formControl.$setUntouched();formControl.$setPristine();// To prevent breaking change requiring a digest to reset $viewModel
if(!$scope.$root.$$phase){$scope.$digest();}}function updateInitialValue(){$scope.options.initialValue=parseGet($scope.options.key,$scope.model);}function addValidationMessages(options){options.validation.messages=options.validation.messages||{};_angularFix2['default'].forEach(formlyValidationMessages.messages,function createFunctionForMessage(expression,name){if(!options.validation.messages[name]){options.validation.messages[name]=function evaluateMessage(viewValue,modelValue,scope){return formlyUtil.formlyEval(scope,expression,modelValue,viewValue);};}});}function invokeControllers(scope){var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var type=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];_angularFix2['default'].forEach([type.controller,options.controller],function(controller){if(controller){$controller(controller,{$scope:scope});}});}function setupFieldGroup(){$scope.options.options=$scope.options.options||{};$scope.options.options.formState=$scope.formState;$scope.to=$scope.options.templateOptions;}}// link function
function fieldLink(scope,el,attrs,formlyFormCtrl){if(scope.options.fieldGroup){setFieldGroupTemplate();return;}// watch the field model (if exists) if there is no parent formly-form directive (that would watch it instead)
if(!formlyFormCtrl&&scope.options.model){scope.$watch('options.model',function(){return scope.options.runExpressions();},true);}addAttributes();addClasses();var type=getFieldType(scope.options);var args=arguments;var thusly=this;var fieldCount=0;var fieldManipulators=getManipulators(scope.options,scope.formOptions);getFieldTemplate(scope.options).then(runManipulators(fieldManipulators.preWrapper)).then(transcludeInWrappers(scope.options,scope.formOptions)).then(runManipulators(fieldManipulators.postWrapper)).then(setElementTemplate).then(watchFormControl).then(callLinkFunctions)['catch'](function(error){formlyWarn('there-was-a-problem-setting-the-template-for-this-field','There was a problem setting the template for this field ',scope.options,error);});function setFieldGroupTemplate(){checkFieldGroupApi(scope.options);el.addClass('formly-field-group');var extraAttributes='';if(scope.options.elementAttributes){extraAttributes=Object.keys(scope.options.elementAttributes).map(function(key){return key+'="'+scope.options.elementAttributes[key]+'"';}).join(' ');}var modelValue='model';scope.options.form=scope.form;if(scope.options.key){modelValue='model[\''+scope.options.key+'\']';}getTemplate('\n          <formly-form model="'+modelValue+'"\n                       fields="options.fieldGroup"\n                       options="options.options"\n                       form="options.form"\n                       class="'+scope.options.className+'"\n                       '+extraAttributes+'\n                       is-field-group>\n          </formly-form>\n        ').then(transcludeInWrappers(scope.options,scope.formOptions)).then(setElementTemplate);}function addAttributes(){if(scope.options.elementAttributes){el.attr(scope.options.elementAttributes);}}function addClasses(){if(scope.options.className){el.addClass(scope.options.className);}if(scope.options.type){el.addClass('formly-field-'+scope.options.type);}}function setElementTemplate(templateString){el.html(asHtml(templateString));$compile(el.contents())(scope);return templateString;}function watchFormControl(templateString){var stopWatchingShowError=_angularFix2['default'].noop;if(scope.options.noFormControl){return;}var templateEl=_angularFix2['default'].element('<div>'+templateString+'</div>');var ngModelNodes=templateEl[0].querySelectorAll('[ng-model],[data-ng-model]');if(ngModelNodes.length){_angularFix2['default'].forEach(ngModelNodes,function(ngModelNode){fieldCount++;watchFieldNameOrExistence(ngModelNode.getAttribute('name'));});}function watchFieldNameOrExistence(name){var nameExpressionRegex=/\{\{(.*?)}}/;var nameExpression=nameExpressionRegex.exec(name);if(nameExpression){name=$interpolate(name)(scope);}watchFieldExistence(name);}function watchFieldExistence(name){scope.$watch('form["'+name+'"]',function formControlChange(formControl){if(formControl){if(fieldCount>1){if(!scope.options.formControl){scope.options.formControl=[];}scope.options.formControl.push(formControl);}else{scope.options.formControl=formControl;}scope.fc=scope.options.formControl;// shortcut for template authors
stopWatchingShowError();addShowMessagesWatcher();addParsers();addFormatters();}});}function addShowMessagesWatcher(){stopWatchingShowError=scope.$watch(function watchShowValidationChange(){var customExpression=formlyConfig.extras.errorExistsAndShouldBeVisibleExpression;var options=scope.options;var formControls=arrayify(scope.fc);if(!formControls.some(function(fc){return fc.$invalid;})){return false;}else if(typeof options.validation.show==='boolean'){return options.validation.show;}else if(customExpression){return formControls.some(function(fc){return formlyUtil.formlyEval(scope,customExpression,fc.$modelValue,fc.$viewValue);});}else{return formControls.some(function(fc){var noTouchedButDirty=_angularFix2['default'].isUndefined(fc.$touched)&&fc.$dirty;return fc.$touched||noTouchedButDirty;});}},function onShowValidationChange(show){scope.options.validation.errorExistsAndShouldBeVisible=show;scope.showError=show;// shortcut for template authors
});}function addParsers(){setParsersOrFormatters('parsers');}function addFormatters(){setParsersOrFormatters('formatters');var ctrl=scope.fc;var formWasPristine=scope.form.$pristine;if(scope.options.formatters){(function(){var value=ctrl.$modelValue;ctrl.$formatters.forEach(function(formatter){value=formatter(value);});ctrl.$setViewValue(value);ctrl.$render();ctrl.$setPristine();if(formWasPristine){scope.form.$setPristine();}})();}}function setParsersOrFormatters(which){var originalThingProp='originalParser';if(which==='formatters'){originalThingProp='originalFormatter';}// init with type's parsers
var things=getThingsFromType(type);// get optionsTypes things
things=formlyUtil.extendArray(things,getThingsFromOptionsTypes(scope.options.optionsTypes));// get field's things
things=formlyUtil.extendArray(things,scope.options[which]);// convert things into formlyExpression things
_angularFix2['default'].forEach(things,function(thing,index){things[index]=getFormlyExpressionThing(thing);});var ngModelCtrls=scope.fc;if(!_angularFix2['default'].isArray(ngModelCtrls)){ngModelCtrls=[ngModelCtrls];}_angularFix2['default'].forEach(ngModelCtrls,function(ngModelCtrl){var _ngModelCtrl;ngModelCtrl['$'+which]=(_ngModelCtrl=ngModelCtrl['$'+which]).concat.apply(_ngModelCtrl,_toConsumableArray(things));});function getThingsFromType(theType){if(!theType){return[];}if(_angularFix2['default'].isString(theType)){theType=formlyConfig.getType(theType,true,scope.options);}var typeThings=[];// get things from parent
if(theType['extends']){typeThings=formlyUtil.extendArray(typeThings,getThingsFromType(theType['extends']));}// get own type's things
typeThings=formlyUtil.extendArray(typeThings,getDefaultOptionsProperty(theType,which,[]));// get things from optionsTypes
typeThings=formlyUtil.extendArray(typeThings,getThingsFromOptionsTypes(getDefaultOptionsOptionsTypes(theType)));return typeThings;}function getThingsFromOptionsTypes(){var optionsTypes=arguments.length<=0||arguments[0]===undefined?[]:arguments[0];var optionsTypesThings=[];_angularFix2['default'].forEach(_angularFix2['default'].copy(arrayify(optionsTypes)).reverse(),function(optionsTypeName){optionsTypesThings=formlyUtil.extendArray(optionsTypesThings,getThingsFromType(optionsTypeName));});return optionsTypesThings;}function getFormlyExpressionThing(thing){formlyExpressionParserOrFormatterFunction[originalThingProp]=thing;return formlyExpressionParserOrFormatterFunction;function formlyExpressionParserOrFormatterFunction($viewValue){var $modelValue=scope.options.value();return formlyUtil.formlyEval(scope,thing,$modelValue,$viewValue);}}}}function callLinkFunctions(){if(type&&type.link){type.link.apply(thusly,args);}if(scope.options.link){scope.options.link.apply(thusly,args);}}function runManipulators(manipulators){return function runManipulatorsOnTemplate(templateToManipulate){var chain=$q.when(templateToManipulate);_angularFix2['default'].forEach(manipulators,function(manipulator){chain=chain.then(function(template){return $q.when(manipulator(template,scope.options,scope)).then(function(newTemplate){return _angularFix2['default'].isString(newTemplate)?newTemplate:asHtml(newTemplate);});});});return chain;};}}// sort-of stateless util functions
function asHtml(el){var wrapper=_angularFix2['default'].element('<a></a>');return wrapper.append(el).html();}function getFieldType(options){return options.type&&formlyConfig.getType(options.type);}function getManipulators(options,formOptions){var preWrapper=[];var postWrapper=[];addManipulators(options.templateManipulators);addManipulators(formOptions.templateManipulators);addManipulators(formlyConfig.templateManipulators);return{preWrapper:preWrapper,postWrapper:postWrapper};function addManipulators(manipulators){/* eslint-disable */ // it doesn't understand this :-(
var _ref=manipulators||{};var _ref$preWrapper=_ref.preWrapper;var pre=_ref$preWrapper===undefined?[]:_ref$preWrapper;var _ref$postWrapper=_ref.postWrapper;var post=_ref$postWrapper===undefined?[]:_ref$postWrapper;preWrapper=preWrapper.concat(pre);postWrapper=postWrapper.concat(post);/* eslint-enable */}}function getFieldTemplate(options){function fromOptionsOrType(key,fieldType){if(_angularFix2['default'].isDefined(options[key])){return options[key];}else if(fieldType&&_angularFix2['default'].isDefined(fieldType[key])){return fieldType[key];}}var type=formlyConfig.getType(options.type,true,options);var template=fromOptionsOrType('template',type);var templateUrl=fromOptionsOrType('templateUrl',type);if(_angularFix2['default'].isUndefined(template)&&!templateUrl){throw formlyUsability.getFieldError('type-type-has-no-template','Type \''+options.type+'\' has no template. On element:',options);}return getTemplate(templateUrl||template,_angularFix2['default'].isUndefined(template),options);}function getTemplate(template,isUrl,options){var templatePromise=undefined;if(_angularFix2['default'].isFunction(template)){templatePromise=$q.when(template(options));}else{templatePromise=$q.when(template);}if(!isUrl){return templatePromise;}else{var _ret3=function(){var httpOptions={cache:$templateCache};return{v:templatePromise.then(function(url){return $http.get(url,httpOptions);}).then(function(response){return response.data;})['catch'](function handleErrorGettingATemplate(error){formlyWarn('problem-loading-template-for-templateurl','Problem loading template for '+template,error);})};}();if(_typeof(_ret3)==='object')return _ret3.v;}}function transcludeInWrappers(options,formOptions){var wrapper=getWrapperOption(options,formOptions);return function transcludeTemplate(template){if(!wrapper.length){return $q.when(template);}wrapper.forEach(function(aWrapper){formlyUsability.checkWrapper(aWrapper,options);runApiCheck(aWrapper,options);});var promises=wrapper.map(function(w){return getTemplate(w.template||w.templateUrl,!w.template);});return $q.all(promises).then(function(wrappersTemplates){wrappersTemplates.forEach(function(wrapperTemplate,index){formlyUsability.checkWrapperTemplate(wrapperTemplate,wrapper[index]);});wrappersTemplates.reverse();// wrapper 0 is wrapped in wrapper 1 and so on...
var totalWrapper=wrappersTemplates.shift();wrappersTemplates.forEach(function(wrapperTemplate){totalWrapper=doTransclusion(totalWrapper,wrapperTemplate);});return doTransclusion(totalWrapper,template);});};}function doTransclusion(wrapper,template){var superWrapper=_angularFix2['default'].element('<a></a>');// this allows people not have to have a single root in wrappers
superWrapper.append(wrapper);var transcludeEl=superWrapper.find('formly-transclude');if(!transcludeEl.length){// try it using our custom find function
transcludeEl=formlyUtil.findByNodeName(superWrapper,'formly-transclude');}transcludeEl.replaceWith(template);return superWrapper.html();}function getWrapperOption(options,formOptions){/* eslint complexity:[2, 6] */var wrapper=options.wrapper;// explicit null means no wrapper
if(wrapper===null){return[];}// nothing specified means use the default wrapper for the type
if(!wrapper){// get all wrappers that specify they apply to this type
wrapper=arrayify(formlyConfig.getWrapperByType(options.type));}else{wrapper=arrayify(wrapper).map(formlyConfig.getWrapper);}// get all wrappers for that the type specified that it uses.
var type=formlyConfig.getType(options.type,true,options);if(type&&type.wrapper){var typeWrappers=arrayify(type.wrapper).map(formlyConfig.getWrapper);wrapper=wrapper.concat(typeWrappers);}// add form wrappers
if(formOptions.wrapper){var formWrappers=arrayify(formOptions.wrapper).map(formlyConfig.getWrapper);wrapper=wrapper.concat(formWrappers);}// add the default wrapper last
var defaultWrapper=formlyConfig.getWrapper();if(defaultWrapper){wrapper.push(defaultWrapper);}return wrapper;}function checkApi(options){formlyApiCheck['throw'](formlyApiCheck.formlyFieldOptions,options,{prefix:'formly-field directive',url:'formly-field-directive-validation-failed'});// validate with the type
var type=options.type&&formlyConfig.getType(options.type);if(type){runApiCheck(type,options,true);}if(options.expressionProperties&&options.expressionProperties.hide){formlyWarn('dont-use-expressionproperties.hide-use-hideexpression-instead','You have specified `hide` in `expressionProperties`. Use `hideExpression` instead',options);}}function checkFieldGroupApi(options){formlyApiCheck['throw'](formlyApiCheck.fieldGroup,options,{prefix:'formly-field directive',url:'formly-field-directive-validation-failed'});}function runApiCheck(_ref2,options,forType){var apiCheck=_ref2.apiCheck;var apiCheckInstance=_ref2.apiCheckInstance;var apiCheckFunction=_ref2.apiCheckFunction;var apiCheckOptions=_ref2.apiCheckOptions;runApiCheckForType(apiCheck,apiCheckInstance,apiCheckFunction,apiCheckOptions,options);if(forType&&options.type){_angularFix2['default'].forEach(formlyConfig.getTypeHeritage(options.type),function(type){runApiCheckForType(type.apiCheck,type.apiCheckInstance,type.apiCheckFunction,type.apiCheckOptions,options);});}}function runApiCheckForType(apiCheck,apiCheckInstance,apiCheckFunction,apiCheckOptions,options){/* eslint complexity:[2, 9] */if(!apiCheck){return;}var instance=apiCheckInstance||formlyConfig.extras.apiCheckInstance||formlyApiCheck;if(instance.config.disabled||_apiCheck2['default'].globalConfig.disabled){return;}var fn=apiCheckFunction||'warn';// this is the new API
var checkerObjects=apiCheck(instance);_angularFix2['default'].forEach(checkerObjects,function(shape,name){var checker=instance.shape(shape);var checkOptions=_angularFix2['default'].extend({prefix:'formly-field type '+options.type+' for property '+name,url:formlyApiCheck.config.output.docsBaseUrl+'formly-field-type-apicheck-failed'},apiCheckOptions);instance[fn](checker,options[name],checkOptions);});}}// Stateless util functions
function getDefaultOptionsOptionsTypes(type){return getDefaultOptionsProperty(type,'optionsTypes',[]);}function getDefaultOptionsProperty(type,prop,defaultValue){return type.defaultOptions&&type.defaultOptions[prop]||defaultValue;}module.exports=exports['default'];/***/},/* 15 */ /***/function(module,exports){'use strict';formlyFocus.$inject=["$timeout","$document"];Object.defineProperty(exports,'__esModule',{value:true});exports['default']=formlyFocus;// @ngInject
function formlyFocus($timeout,$document){return{restrict:'A',link:function formlyFocusLink(scope,element,attrs){var previousEl=null;var el=element[0];var doc=$document[0];attrs.$observe('formlyFocus',function respondToFocusExpressionChange(value){/* eslint no-bitwise:0 */ // I know what I'm doing. I promise...
if(value==='true'){$timeout(function setElementFocus(){previousEl=doc.activeElement;el.focus();},~~attrs.focusWait);}else if(value==='false'){if(doc.activeElement===el){el.blur();if(attrs.hasOwnProperty('refocus')&&previousEl){previousEl.focus();}}}});}};}module.exports=exports['default'];/***/},/* 16 */ /***/function(module,exports,__webpack_require__){'use strict';formlyForm.$inject=["formlyUsability","formlyWarn","$parse","formlyConfig","$interpolate"];Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);exports['default']=formlyForm;/**
	 * @ngdoc directive
	 * @name formlyForm
	 * @restrict AE
	 */ // @ngInject
function formlyForm(formlyUsability,formlyWarn,$parse,formlyConfig,$interpolate){var currentFormId=1;return{restrict:'AE',template:formlyFormGetTemplate,replace:true,transclude:true,scope:{fields:'=',model:'=',form:'=?',options:'=?'},controller:'FormlyFormController',link:formlyFormLink};function formlyFormGetTemplate(el,attrs){var rootEl=getRootEl();var fieldRootEl=getFieldRootEl();var formId='formly_'+currentFormId++;var parentFormAttributes='';if(attrs.hasOwnProperty('isFieldGroup')&&el.parent().parent().hasClass('formly')){parentFormAttributes=copyAttributes(el.parent().parent()[0].attributes);}return'\n        <'+rootEl+' class="formly"\n                 name="'+getFormName()+'"\n                 role="form" '+parentFormAttributes+'>\n          <'+fieldRootEl+' formly-field\n               ng-repeat="field in fields '+getTrackBy()+'"\n               '+getHideDirective()+'="!field.hide"\n               class="formly-field"\n               options="field"\n               model="field.model || model"\n               original-model="model"\n               fields="fields"\n               form="theFormlyForm"\n               form-id="'+getFormName()+'"\n               form-state="options.formState"\n               form-options="options"\n               index="$index">\n          </'+fieldRootEl+'>\n          <div ng-transclude class="'+getTranscludeClass()+'"></div>\n        </'+rootEl+'>\n      ';function getRootEl(){return attrs.rootEl||'ng-form';}function getFieldRootEl(){return attrs.fieldRootEl||'div';}function getHideDirective(){return attrs.hideDirective||formlyConfig.extras.defaultHideDirective||'ng-if';}function getTrackBy(){if(!attrs.trackBy){return'';}else{return'track by '+attrs.trackBy;}}function getFormName(){var formName=formId;var bindName=attrs.bindName;if(bindName){if(_angularFix2['default'].version.minor<3){throw formlyUsability.getFormlyError('bind-name attribute on formly-form not allowed in < angular 1.3');}// we can do a one-time binding here because we know we're in 1.3.x territory
formName=$interpolate.startSymbol()+'::\'formly_\' + '+bindName+$interpolate.endSymbol();}return formName;}function getTranscludeClass(){return attrs.transcludeClass||'';}function copyAttributes(attributes){var excluded=['model','form','fields','options','name','role','class','data-model','data-form','data-fields','data-options','data-name'];var arrayAttrs=[];_angularFix2['default'].forEach(attributes,function(_ref){var nodeName=_ref.nodeName;var value=_ref.value;if(nodeName!=='undefined'&&excluded.indexOf(nodeName)===-1){arrayAttrs.push(toKebabCase(nodeName)+'="'+value+'"');}});return arrayAttrs.join(' ');}}function formlyFormLink(scope,el,attrs){setFormController();fixChromeAutocomplete();function setFormController(){var formId=attrs.name;scope.formId=formId;scope.theFormlyForm=scope[formId];if(attrs.form){var getter=$parse(attrs.form);var setter=getter.assign;var parentForm=getter(scope.$parent);if(parentForm){scope.theFormlyForm=parentForm;if(scope[formId]){scope.theFormlyForm.$removeControl(scope[formId]);}// this next line is probably one of the more dangerous things that angular-formly does to improve the
// API for angular-formly forms. It ensures that the NgModelControllers inside of formly-form will be
// attached to the form that is passed to formly-form rather than the one that formly-form creates
// this is necessary because it's confusing to have a step between the form you pass in
// and the fields in that form. It also is because angular doesn't propagate properties like $submitted down
// to children forms :-( This line was added to solve this issue:
// https://github.com/formly-js/angular-formly/issues/287
// luckily, this is how the formController has been accessed by the NgModelController since angular 1.0.0
// so I expect it will remain this way for the life of angular 1.x
el.removeData('$formController');}else{setter(scope.$parent,scope[formId]);}}if(!scope.theFormlyForm&&!formlyConfig.disableWarnings){/* eslint no-console:0 */formlyWarn('formly-form-has-no-formcontroller','Your formly-form does not have a `form` property. Many functions of the form (like validation) may not work',el,scope);}}/*
	     * chrome autocomplete lameness
	     * see https://code.google.com/p/chromium/issues/detail?id=468153#c14
	     * ლ(ಠ益ಠლ)   (╯°□°)╯︵ ┻━┻    (◞‸◟；)
	     */function fixChromeAutocomplete(){var global=formlyConfig.extras.removeChromeAutoComplete===true;var offInstance=scope.options&&scope.options.removeChromeAutoComplete===false;var onInstance=scope.options&&scope.options.removeChromeAutoComplete===true;if(global&&!offInstance||onInstance){var input=document.createElement('input');input.setAttribute('autocomplete','address-level4');input.setAttribute('hidden','true');el[0].appendChild(input);}}}// stateless util functions
function toKebabCase(string){if(string){return string.replace(/([A-Z])/g,function($1){return'-'+$1.toLowerCase();});}else{return'';}}}module.exports=exports['default'];/***/},/* 17 */ /***/function(module,exports,__webpack_require__){'use strict';FormlyFormController.$inject=["formlyUsability","formlyWarn","formlyConfig","$parse","$scope","formlyApiCheck","formlyUtil"];Object.defineProperty(exports,'__esModule',{value:true});var _slice=Array.prototype.slice;exports['default']=FormlyFormController;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);function isFieldGroup(field){return field&&!!field.fieldGroup;}// @ngInject
function FormlyFormController(formlyUsability,formlyWarn,formlyConfig,$parse,$scope,formlyApiCheck,formlyUtil){setupOptions();$scope.model=$scope.model||{};setupFields();// watch the model and evaluate watch expressions that depend on it.
if(!$scope.options.manualModelWatcher){$scope.$watch('model',onModelOrFormStateChange,true);}else if(_angularFix2['default'].isFunction($scope.options.manualModelWatcher)){$scope.$watch($scope.options.manualModelWatcher,onModelOrFormStateChange,true);}if($scope.options.formState){$scope.$watch('options.formState',onModelOrFormStateChange,true);}function onModelOrFormStateChange(){_angularFix2['default'].forEach($scope.fields,runFieldExpressionProperties);}function validateFormControl(formControl,promise){var validate=formControl.$validate;if(promise){promise.then(validate);}else{validate();}}function runFieldExpressionProperties(field,index){var model=field.model||$scope.model;var promise=field.runExpressions&&field.runExpressions();if(field.hideExpression){// can't use hide with expressionProperties reliably
var val=model[field.key];field.hide=evalCloseToFormlyExpression(field.hideExpression,val,field,index,{model:model});}if(field.extras&&field.extras.validateOnModelChange&&field.formControl){if(_angularFix2['default'].isArray(field.formControl)){_angularFix2['default'].forEach(field.formControl,function(formControl){validateFormControl(formControl,promise);});}else{validateFormControl(field.formControl,promise);}}}function setupFields(){$scope.fields=$scope.fields||[];checkDeprecatedOptions($scope.options);var fieldTransforms=$scope.options.fieldTransform||formlyConfig.extras.fieldTransform;if(!_angularFix2['default'].isArray(fieldTransforms)){fieldTransforms=[fieldTransforms];}_angularFix2['default'].forEach(fieldTransforms,function transformFields(fieldTransform){if(fieldTransform){$scope.fields=fieldTransform($scope.fields,$scope.model,$scope.options,$scope.form);if(!$scope.fields){throw formlyUsability.getFormlyError('fieldTransform must return an array of fields');}}});setupModels();if($scope.options.watchAllExpressions){_angularFix2['default'].forEach($scope.fields,setupHideExpressionWatcher);}_angularFix2['default'].forEach($scope.fields,attachKey);// attaches a key based on the index if a key isn't specified
_angularFix2['default'].forEach($scope.fields,setupWatchers);// setup watchers for all fields
}function checkDeprecatedOptions(options){if(formlyConfig.extras.fieldTransform&&_angularFix2['default'].isFunction(formlyConfig.extras.fieldTransform)){formlyWarn('fieldtransform-as-a-function-deprecated','fieldTransform as a function has been deprecated.','Attempted for formlyConfig.extras: '+formlyConfig.extras.fieldTransform.name,formlyConfig.extras);}else if(options.fieldTransform&&_angularFix2['default'].isFunction(options.fieldTransform)){formlyWarn('fieldtransform-as-a-function-deprecated','fieldTransform as a function has been deprecated.','Attempted for form',options);}}function setupOptions(){formlyApiCheck['throw']([formlyApiCheck.formOptionsApi.optional],[$scope.options],{prefix:'formly-form options check'});$scope.options=$scope.options||{};$scope.options.formState=$scope.options.formState||{};_angularFix2['default'].extend($scope.options,{updateInitialValue:updateInitialValue,resetModel:resetModel});}function updateInitialValue(){_angularFix2['default'].forEach($scope.fields,function(field){if(isFieldGroup(field)&&field.options){field.options.updateInitialValue();}else{field.updateInitialValue();}});}function resetModel(){_angularFix2['default'].forEach($scope.fields,function(field){if(isFieldGroup(field)&&field.options){field.options.resetModel();}else if(field.resetModel){field.resetModel();}});}function setupModels(){// a set of field models that are already watched (the $scope.model will have its own watcher)
var watchedModels=[$scope.model];// we will not set up automatic model watchers if manual mode is set
var manualModelWatcher=$scope.options.manualModelWatcher;if($scope.options.formState){// $scope.options.formState will have its own watcher
watchedModels.push($scope.options.formState);}_angularFix2['default'].forEach($scope.fields,function(field){var isNewModel=initModel(field);if(field.model&&isNewModel&&watchedModels.indexOf(field.model)===-1&&!manualModelWatcher){$scope.$watch(function(){return field.model;},onModelOrFormStateChange,true);watchedModels.push(field.model);}});}function setupHideExpressionWatcher(field,index){if(field.hideExpression){(function(){// can't use hide with expressionProperties reliably
var model=field.model||$scope.model;$scope.$watch(function hideExpressionWatcher(){var val=model[field.key];return evalCloseToFormlyExpression(field.hideExpression,val,field,index,{model:model});},function(hide){return field.hide=hide;},true);})();}}function initModel(field){var isNewModel=true;if(_angularFix2['default'].isString(field.model)){(function(){var expression=field.model;isNewModel=!referencesCurrentlyWatchedModel(expression);field.model=resolveStringModel(expression);$scope.$watch(function(){return resolveStringModel(expression);},function(model){return field.model=model;});})();}return isNewModel;function resolveStringModel(expression){var index=$scope.fields.indexOf(field);var model=evalCloseToFormlyExpression(expression,undefined,field,index,{model:$scope.model});if(!model){throw formlyUsability.getFieldError('field-model-must-be-initialized','Field model must be initialized. When specifying a model as a string for a field, the result of the'+' expression must have been initialized ahead of time.',field);}return model;}}function referencesCurrentlyWatchedModel(expression){return['model','formState'].some(function(item){return formlyUtil.startsWith(expression,item+'.')||formlyUtil.startsWith(expression,item+'[');});}function attachKey(field,index){if(!isFieldGroup(field)){field.key=field.key||index||0;}}function setupWatchers(field,index){if(!_angularFix2['default'].isDefined(field.watcher)){return;}var watchers=field.watcher;if(!_angularFix2['default'].isArray(watchers)){watchers=[watchers];}_angularFix2['default'].forEach(watchers,function setupWatcher(watcher){if(!_angularFix2['default'].isDefined(watcher.listener)&&!watcher.runFieldExpressions){throw formlyUsability.getFieldError('all-field-watchers-must-have-a-listener','All field watchers must have a listener',field);}var watchExpression=getWatchExpression(watcher,field,index);var watchListener=getWatchListener(watcher,field,index);var type=watcher.type||'$watch';watcher.stopWatching=$scope[type](watchExpression,watchListener,watcher.watchDeep);});}function getWatchExpression(watcher,field,index){var watchExpression=undefined;if(!_angularFix2['default'].isUndefined(watcher.expression)){watchExpression=watcher.expression;}else if(field.key){watchExpression='model[\''+field.key.toString().split('.').join('\'][\'')+'\']';}if(_angularFix2['default'].isFunction(watchExpression)){(function(){// wrap the field's watch expression so we can call it with the field as the first arg
// and the stop function as the last arg as a helper
var originalExpression=watchExpression;watchExpression=function formlyWatchExpression(){var args=modifyArgs.apply(undefined,[watcher,index].concat(_slice.call(arguments)));return originalExpression.apply(undefined,_toConsumableArray(args));};watchExpression.displayName='Formly Watch Expression for field for '+field.key;})();}else if(field.model){watchExpression=$parse(watchExpression).bind(null,$scope,{model:field.model});}return watchExpression;}function getWatchListener(watcher,field,index){var watchListener=watcher.listener;if(_angularFix2['default'].isFunction(watchListener)||watcher.runFieldExpressions){(function(){// wrap the field's watch listener so we can call it with the field as the first arg
// and the stop function as the last arg as a helper
var originalListener=watchListener;watchListener=function formlyWatchListener(){var value=undefined;if(originalListener){var args=modifyArgs.apply(undefined,[watcher,index].concat(_slice.call(arguments)));value=originalListener.apply(undefined,_toConsumableArray(args));}if(watcher.runFieldExpressions){runFieldExpressionProperties(field,index);}return value;};watchListener.displayName='Formly Watch Listener for field for '+field.key;})();}return watchListener;}function modifyArgs(watcher,index){for(var _len=arguments.length,originalArgs=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){originalArgs[_key-2]=arguments[_key];}return[$scope.fields[index]].concat(originalArgs,[watcher.stopWatching]);}function evalCloseToFormlyExpression(expression,val,field,index){var extraLocals=arguments.length<=4||arguments[4]===undefined?{}:arguments[4];extraLocals=_angularFix2['default'].extend(getFormlyFieldLikeLocals(field,index),extraLocals);return formlyUtil.formlyEval($scope,expression,val,val,extraLocals);}function getFormlyFieldLikeLocals(field,index){// this makes it closer to what a regular formlyExpression would be
return{model:field.model,options:field,index:index,formState:$scope.options.formState,originalModel:$scope.model,formOptions:$scope.options,formId:$scope.formId};}}module.exports=exports['default'];/***/},/* 18 */ /***/function(module,exports,__webpack_require__){'use strict';addFormlyNgModelAttrsManipulator.$inject=["formlyConfig","$interpolate"];Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);var _otherUtils=__webpack_require__(9);exports['default']=addFormlyNgModelAttrsManipulator;// @ngInject
function addFormlyNgModelAttrsManipulator(formlyConfig,$interpolate){if(formlyConfig.extras.disableNgModelAttrsManipulator){return;}formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);function ngModelAttrsManipulator(template,options,scope){var node=document.createElement('div');var skip=options.extras&&options.extras.skipNgModelAttrsManipulator;if(skip===true){return template;}node.innerHTML=template;var modelNodes=getNgModelNodes(node,skip);if(!modelNodes||!modelNodes.length){return template;}addIfNotPresent(modelNodes,'id',scope.id);addIfNotPresent(modelNodes,'name',scope.name||scope.id);addValidation();alterNgModelAttr();addModelOptions();addTemplateOptionsAttrs();addNgModelElAttrs();return node.innerHTML;function addValidation(){if(_angularFix2['default'].isDefined(options.validators)||_angularFix2['default'].isDefined(options.validation.messages)){addIfNotPresent(modelNodes,'formly-custom-validation','');}}function alterNgModelAttr(){if(isPropertyAccessor(options.key)){addRegardlessOfPresence(modelNodes,'ng-model','model.'+options.key);}}function addModelOptions(){if(_angularFix2['default'].isDefined(options.modelOptions)){addIfNotPresent(modelNodes,'ng-model-options','options.modelOptions');if(options.modelOptions.getterSetter){addRegardlessOfPresence(modelNodes,'ng-model','options.value');}}}function addTemplateOptionsAttrs(){if(!options.templateOptions&&!options.expressionProperties){// no need to run these if there are no templateOptions or expressionProperties
return;}var to=options.templateOptions||{};var ep=options.expressionProperties||{};var ngModelAttributes=getBuiltInAttributes();// extend with the user's specifications winning
_angularFix2['default'].extend(ngModelAttributes,options.ngModelAttrs);// Feel free to make this more simple :-)
_angularFix2['default'].forEach(ngModelAttributes,function(val,name){/* eslint complexity:[2, 14] */var attrVal=undefined,attrName=undefined;var ref='options.templateOptions[\''+name+'\']';var toVal=to[name];var epVal=getEpValue(ep,name);var inTo=_angularFix2['default'].isDefined(toVal);var inEp=_angularFix2['default'].isDefined(epVal);if(val.value){// I realize this looks backwards, but it's right, trust me...
attrName=val.value;attrVal=name;}else if(val.statement&&inTo){attrName=val.statement;if(_angularFix2['default'].isString(to[name])){attrVal='$eval('+ref+')';}else if(_angularFix2['default'].isFunction(to[name])){attrVal=ref+'(model[options.key], options, this, $event)';}else{throw new Error('options.templateOptions.'+name+' must be a string or function: '+JSON.stringify(options));}}else if(val.bound&&inEp){attrName=val.bound;attrVal=ref;}else if((val.attribute||val["boolean"])&&inEp){attrName=val.attribute||val["boolean"];attrVal=''+$interpolate.startSymbol()+ref+$interpolate.endSymbol();}else if(val.attribute&&inTo){attrName=val.attribute;attrVal=toVal;}else if(val["boolean"]){if(inTo&&!inEp&&toVal){attrName=val["boolean"];attrVal=true;}else{/* eslint no-empty:0 */ // empty to illustrate that a boolean will not be added via val.bound
// if you want it added via val.bound, then put it in expressionProperties
}}else if(val.bound&&inTo){attrName=val.bound;attrVal=ref;}if(_angularFix2['default'].isDefined(attrName)&&_angularFix2['default'].isDefined(attrVal)){addIfNotPresent(modelNodes,attrName,attrVal);}});}function addNgModelElAttrs(){_angularFix2['default'].forEach(options.ngModelElAttrs,function(val,name){addRegardlessOfPresence(modelNodes,name,val);});}}// Utility functions
function getNgModelNodes(node,skip){var selectorNot=_angularFix2['default'].isString(skip)?':not('+skip+')':'';var skipNot=':not([formly-skip-ng-model-attrs-manipulator])';var query='[ng-model]'+selectorNot+skipNot+', [data-ng-model]'+selectorNot+skipNot;try{return node.querySelectorAll(query);}catch(e){//this code is needed for IE8, as it does not support the CSS3 ':not' selector
//it should be removed when IE8 support is dropped
return getNgModelNodesFallback(node,skip);}}function getNgModelNodesFallback(node,skip){var allNgModelNodes=node.querySelectorAll('[ng-model], [data-ng-model]');var matchingNgModelNodes=[];//make sure this array is compatible with NodeList type by adding an 'item' function
matchingNgModelNodes.item=function(i){return this[i];};for(var i=0;i<allNgModelNodes.length;i++){var ngModelNode=allNgModelNodes[i];if(!ngModelNode.hasAttribute('formly-skip-ng-model-attrs-manipulator')&&!(_angularFix2['default'].isString(skip)&&nodeMatches(ngModelNode,skip))){matchingNgModelNodes.push(ngModelNode);}}return matchingNgModelNodes;}function nodeMatches(node,selector){var div=document.createElement('div');div.innerHTML=node.outerHTML;return div.querySelector(selector);}function getBuiltInAttributes(){var ngModelAttributes={focus:{attribute:'formly-focus'}};var boundOnly=[];var bothBooleanAndBound=['required','disabled'];var bothAttributeAndBound=['pattern','minlength'];var statementOnly=['change','keydown','keyup','keypress','click','focus','blur'];var attributeOnly=['placeholder','min','max','step','tabindex','type'];if(formlyConfig.extras.ngModelAttrsManipulatorPreferUnbound){bothAttributeAndBound.push('maxlength');}else{boundOnly.push('maxlength');}_angularFix2['default'].forEach(boundOnly,function(item){ngModelAttributes[item]={bound:'ng-'+item};});_angularFix2['default'].forEach(bothBooleanAndBound,function(item){ngModelAttributes[item]={"boolean":item,bound:'ng-'+item};});_angularFix2['default'].forEach(bothAttributeAndBound,function(item){ngModelAttributes[item]={attribute:item,bound:'ng-'+item};});_angularFix2['default'].forEach(statementOnly,function(item){var propName='on'+item.substr(0,1).toUpperCase()+item.substr(1);ngModelAttributes[propName]={statement:'ng-'+item};});_angularFix2['default'].forEach(attributeOnly,function(item){ngModelAttributes[item]={attribute:item};});return ngModelAttributes;}function getEpValue(ep,name){return ep['templateOptions.'+name]||ep['templateOptions[\''+name+'\']']||ep['templateOptions["'+name+'"]'];}function addIfNotPresent(nodes,attr,val){_angularFix2['default'].forEach(nodes,function(node){if(!node.getAttribute(attr)){node.setAttribute(attr,val);}});}function addRegardlessOfPresence(nodes,attr,val){_angularFix2['default'].forEach(nodes,function(node){node.setAttribute(attr,val);});}function isPropertyAccessor(key){return(0,_otherUtils.contains)(key,'.')||(0,_otherUtils.contains)(key,'[')&&(0,_otherUtils.contains)(key,']');}}module.exports=exports['default'];/***/},/* 19 */ /***/function(module,exports,__webpack_require__){'use strict';addCustomTags.$inject=["$document"];Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _angularFix=__webpack_require__(2);var _angularFix2=_interopRequireDefault(_angularFix);exports['default']=addCustomTags;// @ngInject
function addCustomTags($document){// IE8 check ->
// https://msdn.microsoft.com/en-us/library/cc196988(v=vs.85).aspx
if($document&&$document.documentMode<9){(function(){var document=$document.get(0);// add the custom elements that we need for formly
var customElements=['formly-field','formly-form'];_angularFix2['default'].forEach(customElements,function(el){document.createElement(el);});})();}}module.exports=exports['default'];/***/}/******/]);});;//! angular-formly-templates-bootstrap version 6.3.2 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)
(function webpackUniversalModuleDefinition(root,factory){if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object'&&(typeof module==="undefined"?"undefined":_typeof(module))==='object')module.exports=factory(require("angular"),require("angular-formly"),require("api-check"));else if(typeof define==='function'&&define.amd)define(["angular","angular-formly","api-check"],factory);else if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object')exports["ngFormlyTemplatesBootstrap"]=factory(require("angular"),require("angular-formly"),require("api-check"));else root["ngFormlyTemplatesBootstrap"]=factory(root["angular"],root["ngFormly"],root["apiCheck"]);})(void 0,function(__WEBPACK_EXTERNAL_MODULE_3__,__WEBPACK_EXTERNAL_MODULE_4__,__WEBPACK_EXTERNAL_MODULE_5__){return/******/function(modules){// webpackBootstrap
/******/ // The module cache
/******/var installedModules={};/******/ // The require function
/******/function __webpack_require__(moduleId){/******/ // Check if module is in cache
/******/if(installedModules[moduleId])/******/return installedModules[moduleId].exports;/******/ // Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/exports:{},/******/id:moduleId,/******/loaded:false/******/};/******/ // Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******/ // Flag the module as loaded
/******/module.loaded=true;/******/ // Return the exports of the module
/******/return module.exports;/******/}/******/ // expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******/ // expose the module cache
/******/__webpack_require__.c=installedModules;/******/ // __webpack_public_path__
/******/__webpack_require__.p="";/******/ // Load entry module and return exports
/******/return __webpack_require__(0);/******/}/************************************************************************/ /******/([/* 0 */ /***/function(module,exports,__webpack_require__){'use strict';module.exports=__webpack_require__(1);/***/},/* 1 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});var ngModuleName='formlyBootstrap';var angular=__webpack_require__(2);var ngModule=angular.module(ngModuleName,[__webpack_require__(4)]);ngModule.constant('formlyBootstrapApiCheck',__webpack_require__(5)({output:{prefix:'angular-formly-bootstrap'}}));ngModule.constant('formlyBootstrapVersion',"6.3.2");__webpack_require__(6)(ngModule);__webpack_require__(9)(ngModule);__webpack_require__(19)(ngModule);exports['default']=ngModuleName;module.exports=exports['default'];/***/},/* 2 */ /***/function(module,exports,__webpack_require__){// some versions of angular don't export the angular module properly,
// so we get it from window in this case.
'use strict';var angular=__webpack_require__(3);if(!angular.version){angular=window.angular;}module.exports=angular;/***/},/* 3 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_3__;/***/},/* 4 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_4__;/***/},/* 5 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_5__;/***/},/* 6 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=function(ngModule){ngModule.config(addWrappers);function addWrappers(formlyConfigProvider){formlyConfigProvider.setWrapper([{name:'bootstrapLabel',template:__webpack_require__(7),apiCheck:function apiCheck(check){return{templateOptions:{label:check.string.optional,required:check.bool.optional,labelSrOnly:check.bool.optional}};}},{name:'bootstrapHasError',template:__webpack_require__(8)}]);}addWrappers.$inject=["formlyConfigProvider"];};module.exports=exports['default'];/***/},/* 7 */ /***/function(module,exports){module.exports="<div>\n  <label for=\"{{id}}\" class=\"control-label {{to.labelSrOnly ? 'sr-only' : ''}}\" ng-if=\"to.label\">\n    {{to.label}}\n    {{to.required ? '*' : ''}}\n  </label>\n  <formly-transclude></formly-transclude>\n</div>\n";/***/},/* 8 */ /***/function(module,exports){module.exports="<div class=\"form-group\" ng-class=\"{'has-error': showError}\">\n  <formly-transclude></formly-transclude>\n</div>\n";/***/},/* 9 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=function(ngModule){__webpack_require__(10)(ngModule);__webpack_require__(12)(ngModule);__webpack_require__(14)(ngModule);__webpack_require__(15)(ngModule);__webpack_require__(17)(ngModule);__webpack_require__(18)(ngModule);};module.exports=exports['default'];/***/},/* 10 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=function(ngModule){ngModule.config(addCheckboxType);function addCheckboxType(formlyConfigProvider){formlyConfigProvider.setType({name:'checkbox',template:__webpack_require__(11),wrapper:['bootstrapHasError'],apiCheck:function apiCheck(check){return{templateOptions:{label:check.string}};}});}addCheckboxType.$inject=["formlyConfigProvider"];};module.exports=exports['default'];/***/},/* 11 */ /***/function(module,exports){module.exports="<div class=\"checkbox\">\n\t<label>\n\t\t<input type=\"checkbox\"\n           class=\"formly-field-checkbox\"\n\t\t       ng-model=\"model[options.key]\">\n\t\t{{to.label}}\n\t\t{{to.required ? '*' : ''}}\n\t</label>\n</div>\n";/***/},/* 12 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=function(ngModule){ngModule.config(addCheckboxType);function addCheckboxType(formlyConfigProvider){formlyConfigProvider.setType({name:'multiCheckbox',template:__webpack_require__(13),wrapper:['bootstrapLabel','bootstrapHasError'],apiCheck:function apiCheck(check){return{templateOptions:{options:check.arrayOf(check.object),labelProp:check.string.optional,valueProp:check.string.optional}};},defaultOptions:{noFormControl:false,ngModelAttrs:{required:{attribute:'',bound:''}}},controller:/* @ngInject */["$scope",function controller($scope){var to=$scope.to;var opts=$scope.options;$scope.multiCheckbox={checked:[],change:setModel};// initialize the checkboxes check property
$scope.$watch('model',function modelWatcher(newModelValue){var modelValue,valueProp;if(Object.keys(newModelValue).length){modelValue=newModelValue[opts.key];$scope.$watch('to.options',function optionsWatcher(newOptionsValues){if(newOptionsValues&&Array.isArray(newOptionsValues)&&Array.isArray(modelValue)){valueProp=to.valueProp||'value';for(var index=0;index<newOptionsValues.length;index++){$scope.multiCheckbox.checked[index]=modelValue.indexOf(newOptionsValues[index][valueProp])!==-1;}}});}},true);function checkValidity(expressionValue){var valid;if($scope.to.required){valid=angular.isArray($scope.model[opts.key])&&$scope.model[opts.key].length>0&&expressionValue;$scope.fc.$setValidity('required',valid);}}function setModel(){$scope.model[opts.key]=[];angular.forEach($scope.multiCheckbox.checked,function(checkbox,index){if(checkbox){$scope.model[opts.key].push(to.options[index][to.valueProp||'value']);}});// Must make sure we mark as touched because only the last checkbox due to a bug in angular.
$scope.fc.$setTouched();checkValidity(true);if($scope.to.onChange){$scope.to.onChange();}}if(opts.expressionProperties&&opts.expressionProperties['templateOptions.required']){$scope.$watch(function(){return $scope.to.required;},function(newValue){checkValidity(newValue);});}if($scope.to.required){var unwatchFormControl=$scope.$watch('fc',function(newValue){if(!newValue){return;}checkValidity(true);unwatchFormControl();});}}]});}addCheckboxType.$inject=["formlyConfigProvider"];};module.exports=exports['default'];/***/},/* 13 */ /***/function(module,exports){module.exports="<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"checkbox\">\n    <label>\n      <input type=\"checkbox\"\n             id=\"{{id + '_'+ $index}}\"\n             ng-model=\"multiCheckbox.checked[$index]\"\n             ng-change=\"multiCheckbox.change()\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n";/***/},/* 14 */ /***/function(module,exports){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=function(ngModule){ngModule.config(addInputType);function addInputType(formlyConfigProvider){formlyConfigProvider.setType({name:'input',template:'<input class="form-control" ng-model="model[options.key]">',wrapper:['bootstrapLabel','bootstrapHasError']});}addInputType.$inject=["formlyConfigProvider"];};module.exports=exports['default'];/***/},/* 15 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=function(ngModule){ngModule.config(addRadioType);function addRadioType(formlyConfigProvider){formlyConfigProvider.setType({name:'radio',template:__webpack_require__(16),wrapper:['bootstrapLabel','bootstrapHasError'],defaultOptions:{noFormControl:false},apiCheck:function apiCheck(check){return{templateOptions:{options:check.arrayOf(check.object),labelProp:check.string.optional,valueProp:check.string.optional}};}});}addRadioType.$inject=["formlyConfigProvider"];};module.exports=exports['default'];/***/},/* 16 */ /***/function(module,exports){module.exports="<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"radio\">\n    <label>\n      <input type=\"radio\"\n             id=\"{{id + '_'+ $index}}\"\n             tabindex=\"0\"\n             ng-value=\"option[to.valueProp || 'value']\"\n             ng-model=\"model[options.key]\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n";/***/},/* 17 */ /***/function(module,exports){'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}exports['default']=function(ngModule){ngModule.config(addSelectType);var template='<select class="form-control" ng-model="model[options.key]"></select>';function addSelectType(formlyConfigProvider){formlyConfigProvider.setType({name:'select',template:template,wrapper:['bootstrapLabel','bootstrapHasError'],defaultOptions:function defaultOptions(options){/* jshint maxlen:195 */var ngOptions=options.templateOptions.ngOptions||'option[to.valueProp || \'value\'] as option[to.labelProp || \'name\'] group by option[to.groupProp || \'group\'] for option in to.options';return{ngModelAttrs:_defineProperty({},ngOptions,{value:options.templateOptions.optionsAttr||'ng-options'})};},apiCheck:function apiCheck(check){return{templateOptions:{options:check.arrayOf(check.object),optionsAttr:check.string.optional,labelProp:check.string.optional,valueProp:check.string.optional,groupProp:check.string.optional}};}});}addSelectType.$inject=["formlyConfigProvider"];};module.exports=exports['default'];/***/},/* 18 */ /***/function(module,exports){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=function(ngModule){ngModule.config(addTextareaType);function addTextareaType(formlyConfigProvider){formlyConfigProvider.setType({name:'textarea',template:'<textarea class="form-control" ng-model="model[options.key]"></textarea>',wrapper:['bootstrapLabel','bootstrapHasError'],defaultOptions:{ngModelAttrs:{rows:{attribute:'rows'},cols:{attribute:'cols'}}},apiCheck:function apiCheck(check){return{templateOptions:{rows:check.number.optional,cols:check.number.optional}};}});}addTextareaType.$inject=["formlyConfigProvider"];};module.exports=exports['default'];/***/},/* 19 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _addons=__webpack_require__(20);var _addons2=_interopRequireDefault(_addons);var _description=__webpack_require__(22);var _description2=_interopRequireDefault(_description);exports['default']=function(ngModule){(0,_addons2['default'])(ngModule);(0,_description2['default'])(ngModule);};module.exports=exports['default'];/***/},/* 20 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=function(ngModule){ngModule.run(addAddonsManipulator);function addAddonsManipulator(formlyConfig,formlyBootstrapApiCheck){var addonTemplate=__webpack_require__(21);var addonChecker=formlyBootstrapApiCheck.shape({'class':formlyBootstrapApiCheck.string.optional,text:formlyBootstrapApiCheck.string.optional,onClick:formlyBootstrapApiCheck.func.optional}).strict.optional;var api=formlyBootstrapApiCheck.shape({templateOptions:formlyBootstrapApiCheck.shape({addonLeft:addonChecker,addonRight:addonChecker})});formlyConfig.templateManipulators.preWrapper.push(function(template,options){if(!options.templateOptions.addonLeft&&!options.templateOptions.addonRight){return template;}formlyBootstrapApiCheck.warn([api],[options]);return addonTemplate.replace('<formly-transclude></formly-transclude>',template);});}addAddonsManipulator.$inject=["formlyConfig","formlyBootstrapApiCheck"];};module.exports=exports['default'];/***/},/* 21 */ /***/function(module,exports){module.exports="<div ng-class=\"{'input-group': to.addonLeft || to.addonRight}\">\n    <div class=\"input-group-addon\"\n         ng-if=\"to.addonLeft\"\n         ng-style=\"{cursor: to.addonLeft.onClick ? 'pointer' : 'inherit'}\"\n         ng-click=\"to.addonLeft.onClick(options, this, $event)\">\n        <i class=\"{{to.addonLeft.class}}\" ng-if=\"to.addonLeft.class\"></i>\n        <span ng-if=\"to.addonLeft.text\">{{to.addonLeft.text}}</span>\n    </div>\n    <formly-transclude></formly-transclude>\n    <div class=\"input-group-addon\"\n         ng-if=\"to.addonRight\"\n         ng-style=\"{cursor: to.addonRight.onClick ? 'pointer' : 'inherit'}\"\n         ng-click=\"to.addonRight.onClick(options, this, $event)\">\n        <i class=\"{{to.addonRight.class}}\" ng-if=\"to.addonRight.class\"></i>\n        <span ng-if=\"to.addonRight.text\">{{to.addonRight.text}}</span>\n    </div>\n</div>\n";/***/},/* 22 */ /***/function(module,exports){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=function(ngModule){ngModule.run(addDescriptionManipulator);function addDescriptionManipulator(formlyConfig){formlyConfig.templateManipulators.preWrapper.push(function ariaDescribedBy(template,options,scope){if(angular.isDefined(options.templateOptions.description)){var el=document.createElement('div');el.appendChild(angular.element(template)[0]);el.appendChild(angular.element('<p id="'+scope.id+'_description"'+'class="help-block"'+'ng-if="to.description">'+'{{to.description}}'+'</p>')[0]);var modelEls=angular.element(el.querySelectorAll('[ng-model]'));if(modelEls){modelEls.attr('aria-describedby',scope.id+'_description');}return el.innerHTML;}else{return template;}});}addDescriptionManipulator.$inject=["formlyConfig"];};module.exports=exports['default'];/***/}/******/]);});;!function(a){"use strict";if("function"==typeof define&&define.amd)define(["jquery","moment"],a);else if("object"==(typeof exports==="undefined"?"undefined":_typeof(exports)))module.exports=a(require("jquery"),require("moment"));else{if("undefined"==typeof jQuery)throw"bootstrap-datetimepicker requires jQuery to be loaded first";if("undefined"==typeof moment)throw"bootstrap-datetimepicker requires Moment.js to be loaded first";a(jQuery,moment);}}(function(a,b){"use strict";if(!b)throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");var c=function c(_c,d){var e,f,g,h,i,j,k,l={},m=!0,n=!1,o=!1,p=0,q=[{clsName:"days",navFnc:"M",navStep:1},{clsName:"months",navFnc:"y",navStep:1},{clsName:"years",navFnc:"y",navStep:10},{clsName:"decades",navFnc:"y",navStep:100}],r=["days","months","years","decades"],s=["top","bottom","auto"],t=["left","right","auto"],u=["default","top","bottom"],v={up:38,38:"up",down:40,40:"down",left:37,37:"left",right:39,39:"right",tab:9,9:"tab",escape:27,27:"escape",enter:13,13:"enter",pageUp:33,33:"pageUp",pageDown:34,34:"pageDown",shift:16,16:"shift",control:17,17:"control",space:32,32:"space",t:84,84:"t","delete":46,46:"delete"},w={},x=function x(){return void 0!==b.tz&&void 0!==d.timeZone&&null!==d.timeZone&&""!==d.timeZone;},y=function y(a){var c;return c=void 0===a||null===a?b():b.isDate(a)||b.isMoment(a)?b(a):x()?b.tz(a,j,d.useStrict,d.timeZone):b(a,j,d.useStrict),x()&&c.tz(d.timeZone),c;},z=function z(a){if("string"!=typeof a||a.length>1)throw new TypeError("isEnabled expects a single character string parameter");switch(a){case"y":return i.indexOf("Y")!==-1;case"M":return i.indexOf("M")!==-1;case"d":return i.toLowerCase().indexOf("d")!==-1;case"h":case"H":return i.toLowerCase().indexOf("h")!==-1;case"m":return i.indexOf("m")!==-1;case"s":return i.indexOf("s")!==-1;default:return!1;}},A=function A(){return z("h")||z("m")||z("s");},B=function B(){return z("y")||z("M")||z("d");},C=function C(){var b=a("<thead>").append(a("<tr>").append(a("<th>").addClass("prev").attr("data-action","previous").append(a("<span>").addClass(d.icons.previous))).append(a("<th>").addClass("picker-switch").attr("data-action","pickerSwitch").attr("colspan",d.calendarWeeks?"6":"5")).append(a("<th>").addClass("next").attr("data-action","next").append(a("<span>").addClass(d.icons.next)))),c=a("<tbody>").append(a("<tr>").append(a("<td>").attr("colspan",d.calendarWeeks?"8":"7")));return[a("<div>").addClass("datepicker-days").append(a("<table>").addClass("table-condensed").append(b).append(a("<tbody>"))),a("<div>").addClass("datepicker-months").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone())),a("<div>").addClass("datepicker-years").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone())),a("<div>").addClass("datepicker-decades").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone()))];},D=function D(){var b=a("<tr>"),c=a("<tr>"),e=a("<tr>");return z("h")&&(b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementHour}).addClass("btn").attr("data-action","incrementHours").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-hour").attr({"data-time-component":"hours",title:d.tooltips.pickHour}).attr("data-action","showHours"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementHour}).addClass("btn").attr("data-action","decrementHours").append(a("<span>").addClass(d.icons.down))))),z("m")&&(z("h")&&(b.append(a("<td>").addClass("separator")),c.append(a("<td>").addClass("separator").html(":")),e.append(a("<td>").addClass("separator"))),b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementMinute}).addClass("btn").attr("data-action","incrementMinutes").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-minute").attr({"data-time-component":"minutes",title:d.tooltips.pickMinute}).attr("data-action","showMinutes"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementMinute}).addClass("btn").attr("data-action","decrementMinutes").append(a("<span>").addClass(d.icons.down))))),z("s")&&(z("m")&&(b.append(a("<td>").addClass("separator")),c.append(a("<td>").addClass("separator").html(":")),e.append(a("<td>").addClass("separator"))),b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementSecond}).addClass("btn").attr("data-action","incrementSeconds").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-second").attr({"data-time-component":"seconds",title:d.tooltips.pickSecond}).attr("data-action","showSeconds"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementSecond}).addClass("btn").attr("data-action","decrementSeconds").append(a("<span>").addClass(d.icons.down))))),h||(b.append(a("<td>").addClass("separator")),c.append(a("<td>").append(a("<button>").addClass("btn btn-primary").attr({"data-action":"togglePeriod",tabindex:"-1",title:d.tooltips.togglePeriod}))),e.append(a("<td>").addClass("separator"))),a("<div>").addClass("timepicker-picker").append(a("<table>").addClass("table-condensed").append([b,c,e]));},E=function E(){var b=a("<div>").addClass("timepicker-hours").append(a("<table>").addClass("table-condensed")),c=a("<div>").addClass("timepicker-minutes").append(a("<table>").addClass("table-condensed")),d=a("<div>").addClass("timepicker-seconds").append(a("<table>").addClass("table-condensed")),e=[D()];return z("h")&&e.push(b),z("m")&&e.push(c),z("s")&&e.push(d),e;},F=function F(){var b=[];return d.showTodayButton&&b.push(a("<td>").append(a("<a>").attr({"data-action":"today",title:d.tooltips.today}).append(a("<span>").addClass(d.icons.today)))),!d.sideBySide&&B()&&A()&&b.push(a("<td>").append(a("<a>").attr({"data-action":"togglePicker",title:d.tooltips.selectTime}).append(a("<span>").addClass(d.icons.time)))),d.showClear&&b.push(a("<td>").append(a("<a>").attr({"data-action":"clear",title:d.tooltips.clear}).append(a("<span>").addClass(d.icons.clear)))),d.showClose&&b.push(a("<td>").append(a("<a>").attr({"data-action":"close",title:d.tooltips.close}).append(a("<span>").addClass(d.icons.close)))),a("<table>").addClass("table-condensed").append(a("<tbody>").append(a("<tr>").append(b)));},G=function G(){var b=a("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),c=a("<div>").addClass("datepicker").append(C()),e=a("<div>").addClass("timepicker").append(E()),f=a("<ul>").addClass("list-unstyled"),g=a("<li>").addClass("picker-switch"+(d.collapse?" accordion-toggle":"")).append(F());return d.inline&&b.removeClass("dropdown-menu"),h&&b.addClass("usetwentyfour"),z("s")&&!h&&b.addClass("wider"),d.sideBySide&&B()&&A()?(b.addClass("timepicker-sbs"),"top"===d.toolbarPlacement&&b.append(g),b.append(a("<div>").addClass("row").append(c.addClass("col-md-6")).append(e.addClass("col-md-6"))),"bottom"===d.toolbarPlacement&&b.append(g),b):("top"===d.toolbarPlacement&&f.append(g),B()&&f.append(a("<li>").addClass(d.collapse&&A()?"collapse in":"").append(c)),"default"===d.toolbarPlacement&&f.append(g),A()&&f.append(a("<li>").addClass(d.collapse&&B()?"collapse":"").append(e)),"bottom"===d.toolbarPlacement&&f.append(g),b.append(f));},H=function H(){var b,e={};return b=_c.is("input")||d.inline?_c.data():_c.find("input").data(),b.dateOptions&&b.dateOptions instanceof Object&&(e=a.extend(!0,e,b.dateOptions)),a.each(d,function(a){var c="date"+a.charAt(0).toUpperCase()+a.slice(1);void 0!==b[c]&&(e[a]=b[c]);}),e;},I=function I(){var b,e=(n||_c).position(),f=(n||_c).offset(),g=d.widgetPositioning.vertical,h=d.widgetPositioning.horizontal;if(d.widgetParent)b=d.widgetParent.append(o);else if(_c.is("input"))b=_c.after(o).parent();else{if(d.inline)return void(b=_c.append(o));b=_c,_c.children().first().after(o);}if("auto"===g&&(g=f.top+1.5*o.height()>=a(window).height()+a(window).scrollTop()&&o.height()+_c.outerHeight()<f.top?"top":"bottom"),"auto"===h&&(h=b.width()<f.left+o.outerWidth()/2&&f.left+o.outerWidth()>a(window).width()?"right":"left"),"top"===g?o.addClass("top").removeClass("bottom"):o.addClass("bottom").removeClass("top"),"right"===h?o.addClass("pull-right"):o.removeClass("pull-right"),"static"===b.css("position")&&(b=b.parents().filter(function(){return"static"!==a(this).css("position");}).first()),0===b.length)throw new Error("datetimepicker component should be placed within a non-static positioned container");o.css({top:"top"===g?"auto":e.top+_c.outerHeight(),bottom:"top"===g?b.outerHeight()-(b===_c?0:e.top):"auto",left:"left"===h?b===_c?0:e.left:"auto",right:"left"===h?"auto":b.outerWidth()-_c.outerWidth()-(b===_c?0:e.left)});},J=function J(a){"dp.change"===a.type&&(a.date&&a.date.isSame(a.oldDate)||!a.date&&!a.oldDate)||_c.trigger(a);},K=function K(a){"y"===a&&(a="YYYY"),J({type:"dp.update",change:a,viewDate:f.clone()});},L=function L(a){o&&(a&&(k=Math.max(p,Math.min(3,k+a))),o.find(".datepicker > div").hide().filter(".datepicker-"+q[k].clsName).show());},M=function M(){var b=a("<tr>"),c=f.clone().startOf("w").startOf("d");for(d.calendarWeeks===!0&&b.append(a("<th>").addClass("cw").text("#"));c.isBefore(f.clone().endOf("w"));){b.append(a("<th>").addClass("dow").text(c.format("dd"))),c.add(1,"d");}o.find(".datepicker-days thead").append(b);},N=function N(a){return d.disabledDates[a.format("YYYY-MM-DD")]===!0;},O=function O(a){return d.enabledDates[a.format("YYYY-MM-DD")]===!0;},P=function P(a){return d.disabledHours[a.format("H")]===!0;},Q=function Q(a){return d.enabledHours[a.format("H")]===!0;},R=function R(b,c){if(!b.isValid())return!1;if(d.disabledDates&&"d"===c&&N(b))return!1;if(d.enabledDates&&"d"===c&&!O(b))return!1;if(d.minDate&&b.isBefore(d.minDate,c))return!1;if(d.maxDate&&b.isAfter(d.maxDate,c))return!1;if(d.daysOfWeekDisabled&&"d"===c&&d.daysOfWeekDisabled.indexOf(b.day())!==-1)return!1;if(d.disabledHours&&("h"===c||"m"===c||"s"===c)&&P(b))return!1;if(d.enabledHours&&("h"===c||"m"===c||"s"===c)&&!Q(b))return!1;if(d.disabledTimeIntervals&&("h"===c||"m"===c||"s"===c)){var e=!1;if(a.each(d.disabledTimeIntervals,function(){if(b.isBetween(this[0],this[1]))return e=!0,!1;}),e)return!1;}return!0;},S=function S(){for(var b=[],c=f.clone().startOf("y").startOf("d");c.isSame(f,"y");){b.push(a("<span>").attr("data-action","selectMonth").addClass("month").text(c.format("MMM"))),c.add(1,"M");}o.find(".datepicker-months td").empty().append(b);},T=function T(){var b=o.find(".datepicker-months"),c=b.find("th"),g=b.find("tbody").find("span");c.eq(0).find("span").attr("title",d.tooltips.prevYear),c.eq(1).attr("title",d.tooltips.selectYear),c.eq(2).find("span").attr("title",d.tooltips.nextYear),b.find(".disabled").removeClass("disabled"),R(f.clone().subtract(1,"y"),"y")||c.eq(0).addClass("disabled"),c.eq(1).text(f.year()),R(f.clone().add(1,"y"),"y")||c.eq(2).addClass("disabled"),g.removeClass("active"),e.isSame(f,"y")&&!m&&g.eq(e.month()).addClass("active"),g.each(function(b){R(f.clone().month(b),"M")||a(this).addClass("disabled");});},U=function U(){var a=o.find(".datepicker-years"),b=a.find("th"),c=f.clone().subtract(5,"y"),g=f.clone().add(6,"y"),h="";for(b.eq(0).find("span").attr("title",d.tooltips.prevDecade),b.eq(1).attr("title",d.tooltips.selectDecade),b.eq(2).find("span").attr("title",d.tooltips.nextDecade),a.find(".disabled").removeClass("disabled"),d.minDate&&d.minDate.isAfter(c,"y")&&b.eq(0).addClass("disabled"),b.eq(1).text(c.year()+"-"+g.year()),d.maxDate&&d.maxDate.isBefore(g,"y")&&b.eq(2).addClass("disabled");!c.isAfter(g,"y");){h+='<span data-action="selectYear" class="year'+(c.isSame(e,"y")&&!m?" active":"")+(R(c,"y")?"":" disabled")+'">'+c.year()+"</span>",c.add(1,"y");}a.find("td").html(h);},V=function V(){var a,c=o.find(".datepicker-decades"),g=c.find("th"),h=b({y:f.year()-f.year()%100-1}),i=h.clone().add(100,"y"),j=h.clone(),k=!1,l=!1,m="";for(g.eq(0).find("span").attr("title",d.tooltips.prevCentury),g.eq(2).find("span").attr("title",d.tooltips.nextCentury),c.find(".disabled").removeClass("disabled"),(h.isSame(b({y:1900}))||d.minDate&&d.minDate.isAfter(h,"y"))&&g.eq(0).addClass("disabled"),g.eq(1).text(h.year()+"-"+i.year()),(h.isSame(b({y:2e3}))||d.maxDate&&d.maxDate.isBefore(i,"y"))&&g.eq(2).addClass("disabled");!h.isAfter(i,"y");){a=h.year()+12,k=d.minDate&&d.minDate.isAfter(h,"y")&&d.minDate.year()<=a,l=d.maxDate&&d.maxDate.isAfter(h,"y")&&d.maxDate.year()<=a,m+='<span data-action="selectDecade" class="decade'+(e.isAfter(h)&&e.year()<=a?" active":"")+(R(h,"y")||k||l?"":" disabled")+'" data-selection="'+(h.year()+6)+'">'+(h.year()+1)+" - "+(h.year()+12)+"</span>",h.add(12,"y");}m+="<span></span><span></span><span></span>",c.find("td").html(m),g.eq(1).text(j.year()+1+"-"+h.year());},W=function W(){var b,c,g,h=o.find(".datepicker-days"),i=h.find("th"),j=[],k=[];if(B()){for(i.eq(0).find("span").attr("title",d.tooltips.prevMonth),i.eq(1).attr("title",d.tooltips.selectMonth),i.eq(2).find("span").attr("title",d.tooltips.nextMonth),h.find(".disabled").removeClass("disabled"),i.eq(1).text(f.format(d.dayViewHeaderFormat)),R(f.clone().subtract(1,"M"),"M")||i.eq(0).addClass("disabled"),R(f.clone().add(1,"M"),"M")||i.eq(2).addClass("disabled"),b=f.clone().startOf("M").startOf("w").startOf("d"),g=0;g<42;g++){0===b.weekday()&&(c=a("<tr>"),d.calendarWeeks&&c.append('<td class="cw">'+b.week()+"</td>"),j.push(c)),k=["day"],b.isBefore(f,"M")&&k.push("old"),b.isAfter(f,"M")&&k.push("new"),b.isSame(e,"d")&&!m&&k.push("active"),R(b,"d")||k.push("disabled"),b.isSame(y(),"d")&&k.push("today"),0!==b.day()&&6!==b.day()||k.push("weekend"),J({type:"dp.classify",date:b,classNames:k}),c.append('<td data-action="selectDay" data-day="'+b.format("L")+'" class="'+k.join(" ")+'">'+b.date()+"</td>"),b.add(1,"d");}h.find("tbody").empty().append(j),T(),U(),V();}},X=function X(){var b=o.find(".timepicker-hours table"),c=f.clone().startOf("d"),d=[],e=a("<tr>");for(f.hour()>11&&!h&&c.hour(12);c.isSame(f,"d")&&(h||f.hour()<12&&c.hour()<12||f.hour()>11);){c.hour()%4===0&&(e=a("<tr>"),d.push(e)),e.append('<td data-action="selectHour" class="hour'+(R(c,"h")?"":" disabled")+'">'+c.format(h?"HH":"hh")+"</td>"),c.add(1,"h");}b.empty().append(d);},Y=function Y(){for(var b=o.find(".timepicker-minutes table"),c=f.clone().startOf("h"),e=[],g=a("<tr>"),h=1===d.stepping?5:d.stepping;f.isSame(c,"h");){c.minute()%(4*h)===0&&(g=a("<tr>"),e.push(g)),g.append('<td data-action="selectMinute" class="minute'+(R(c,"m")?"":" disabled")+'">'+c.format("mm")+"</td>"),c.add(h,"m");}b.empty().append(e);},Z=function Z(){for(var b=o.find(".timepicker-seconds table"),c=f.clone().startOf("m"),d=[],e=a("<tr>");f.isSame(c,"m");){c.second()%20===0&&(e=a("<tr>"),d.push(e)),e.append('<td data-action="selectSecond" class="second'+(R(c,"s")?"":" disabled")+'">'+c.format("ss")+"</td>"),c.add(5,"s");}b.empty().append(d);},$=function $(){var a,b,c=o.find(".timepicker span[data-time-component]");h||(a=o.find(".timepicker [data-action=togglePeriod]"),b=e.clone().add(e.hours()>=12?-12:12,"h"),a.text(e.format("A")),R(b,"h")?a.removeClass("disabled"):a.addClass("disabled")),c.filter("[data-time-component=hours]").text(e.format(h?"HH":"hh")),c.filter("[data-time-component=minutes]").text(e.format("mm")),c.filter("[data-time-component=seconds]").text(e.format("ss")),X(),Y(),Z();},_=function _(){o&&(W(),$());},aa=function aa(a){var b=m?null:e;if(!a)return m=!0,g.val(""),_c.data("date",""),J({type:"dp.change",date:!1,oldDate:b}),void _();if(a=a.clone().locale(d.locale),x()&&a.tz(d.timeZone),1!==d.stepping)for(a.minutes(Math.round(a.minutes()/d.stepping)*d.stepping).seconds(0);d.minDate&&a.isBefore(d.minDate);){a.add(d.stepping,"minutes");}R(a)?(e=a,f=e.clone(),g.val(e.format(i)),_c.data("date",e.format(i)),m=!1,_(),J({type:"dp.change",date:e.clone(),oldDate:b})):(d.keepInvalid?J({type:"dp.change",date:a,oldDate:b}):g.val(m?"":e.format(i)),J({type:"dp.error",date:a,oldDate:b}));},ba=function ba(){var b=!1;return o?(o.find(".collapse").each(function(){var c=a(this).data("collapse");return!c||!c.transitioning||(b=!0,!1);}),b?l:(n&&n.hasClass("btn")&&n.toggleClass("active"),o.hide(),a(window).off("resize",I),o.off("click","[data-action]"),o.off("mousedown",!1),o.remove(),o=!1,J({type:"dp.hide",date:e.clone()}),g.blur(),f=e.clone(),l)):l;},ca=function ca(){aa(null);},da=function da(a){return void 0===d.parseInputDate?(!b.isMoment(a)||a instanceof Date)&&(a=y(a)):a=d.parseInputDate(a),a;},ea={next:function next(){var a=q[k].navFnc;f.add(q[k].navStep,a),W(),K(a);},previous:function previous(){var a=q[k].navFnc;f.subtract(q[k].navStep,a),W(),K(a);},pickerSwitch:function pickerSwitch(){L(1);},selectMonth:function selectMonth(b){var c=a(b.target).closest("tbody").find("span").index(a(b.target));f.month(c),k===p?(aa(e.clone().year(f.year()).month(f.month())),d.inline||ba()):(L(-1),W()),K("M");},selectYear:function selectYear(b){var c=parseInt(a(b.target).text(),10)||0;f.year(c),k===p?(aa(e.clone().year(f.year())),d.inline||ba()):(L(-1),W()),K("YYYY");},selectDecade:function selectDecade(b){var c=parseInt(a(b.target).data("selection"),10)||0;f.year(c),k===p?(aa(e.clone().year(f.year())),d.inline||ba()):(L(-1),W()),K("YYYY");},selectDay:function selectDay(b){var c=f.clone();a(b.target).is(".old")&&c.subtract(1,"M"),a(b.target).is(".new")&&c.add(1,"M"),aa(c.date(parseInt(a(b.target).text(),10))),A()||d.keepOpen||d.inline||ba();},incrementHours:function incrementHours(){var a=e.clone().add(1,"h");R(a,"h")&&aa(a);},incrementMinutes:function incrementMinutes(){var a=e.clone().add(d.stepping,"m");R(a,"m")&&aa(a);},incrementSeconds:function incrementSeconds(){var a=e.clone().add(1,"s");R(a,"s")&&aa(a);},decrementHours:function decrementHours(){var a=e.clone().subtract(1,"h");R(a,"h")&&aa(a);},decrementMinutes:function decrementMinutes(){var a=e.clone().subtract(d.stepping,"m");R(a,"m")&&aa(a);},decrementSeconds:function decrementSeconds(){var a=e.clone().subtract(1,"s");R(a,"s")&&aa(a);},togglePeriod:function togglePeriod(){aa(e.clone().add(e.hours()>=12?-12:12,"h"));},togglePicker:function togglePicker(b){var c,e=a(b.target),f=e.closest("ul"),g=f.find(".in"),h=f.find(".collapse:not(.in)");if(g&&g.length){if(c=g.data("collapse"),c&&c.transitioning)return;g.collapse?(g.collapse("hide"),h.collapse("show")):(g.removeClass("in"),h.addClass("in")),e.is("span")?e.toggleClass(d.icons.time+" "+d.icons.date):e.find("span").toggleClass(d.icons.time+" "+d.icons.date);}},showPicker:function showPicker(){o.find(".timepicker > div:not(.timepicker-picker)").hide(),o.find(".timepicker .timepicker-picker").show();},showHours:function showHours(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-hours").show();},showMinutes:function showMinutes(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-minutes").show();},showSeconds:function showSeconds(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-seconds").show();},selectHour:function selectHour(b){var c=parseInt(a(b.target).text(),10);h||(e.hours()>=12?12!==c&&(c+=12):12===c&&(c=0)),aa(e.clone().hours(c)),ea.showPicker.call(l);},selectMinute:function selectMinute(b){aa(e.clone().minutes(parseInt(a(b.target).text(),10))),ea.showPicker.call(l);},selectSecond:function selectSecond(b){aa(e.clone().seconds(parseInt(a(b.target).text(),10))),ea.showPicker.call(l);},clear:ca,today:function today(){var a=y();R(a,"d")&&aa(a);},close:ba},fa=function fa(b){return!a(b.currentTarget).is(".disabled")&&(ea[a(b.currentTarget).data("action")].apply(l,arguments),!1);},ga=function ga(){var b,c={year:function year(a){return a.month(0).date(1).hours(0).seconds(0).minutes(0);},month:function month(a){return a.date(1).hours(0).seconds(0).minutes(0);},day:function day(a){return a.hours(0).seconds(0).minutes(0);},hour:function hour(a){return a.seconds(0).minutes(0);},minute:function minute(a){return a.seconds(0);}};return g.prop("disabled")||!d.ignoreReadonly&&g.prop("readonly")||o?l:(void 0!==g.val()&&0!==g.val().trim().length?aa(da(g.val().trim())):m&&d.useCurrent&&(d.inline||g.is("input")&&0===g.val().trim().length)&&(b=y(),"string"==typeof d.useCurrent&&(b=c[d.useCurrent](b)),aa(b)),o=G(),M(),S(),o.find(".timepicker-hours").hide(),o.find(".timepicker-minutes").hide(),o.find(".timepicker-seconds").hide(),_(),L(),a(window).on("resize",I),o.on("click","[data-action]",fa),o.on("mousedown",!1),n&&n.hasClass("btn")&&n.toggleClass("active"),I(),o.show(),d.focusOnShow&&!g.is(":focus")&&g.focus(),J({type:"dp.show"}),l);},ha=function ha(){return o?ba():ga();},ia=function ia(a){var b,c,e,f,g=null,h=[],i={},j=a.which,k="p";w[j]=k;for(b in w){w.hasOwnProperty(b)&&w[b]===k&&(h.push(b),parseInt(b,10)!==j&&(i[b]=!0));}for(b in d.keyBinds){if(d.keyBinds.hasOwnProperty(b)&&"function"==typeof d.keyBinds[b]&&(e=b.split(" "),e.length===h.length&&v[j]===e[e.length-1])){for(f=!0,c=e.length-2;c>=0;c--){if(!(v[e[c]]in i)){f=!1;break;}}if(f){g=d.keyBinds[b];break;}}}g&&(g.call(l,o),a.stopPropagation(),a.preventDefault());},ja=function ja(a){w[a.which]="r",a.stopPropagation(),a.preventDefault();},ka=function ka(b){var c=a(b.target).val().trim(),d=c?da(c):null;return aa(d),b.stopImmediatePropagation(),!1;},la=function la(){g.on({change:ka,blur:d.debug?"":ba,keydown:ia,keyup:ja,focus:d.allowInputToggle?ga:""}),_c.is("input")?g.on({focus:ga}):n&&(n.on("click",ha),n.on("mousedown",!1));},ma=function ma(){g.off({change:ka,blur:blur,keydown:ia,keyup:ja,focus:d.allowInputToggle?ba:""}),_c.is("input")?g.off({focus:ga}):n&&(n.off("click",ha),n.off("mousedown",!1));},na=function na(b){var c={};return a.each(b,function(){var a=da(this);a.isValid()&&(c[a.format("YYYY-MM-DD")]=!0);}),!!Object.keys(c).length&&c;},oa=function oa(b){var c={};return a.each(b,function(){c[this]=!0;}),!!Object.keys(c).length&&c;},pa=function pa(){var a=d.format||"L LT";i=a.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(a){var b=e.localeData().longDateFormat(a)||a;return b.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(a){return e.localeData().longDateFormat(a)||a;});}),j=d.extraFormats?d.extraFormats.slice():[],j.indexOf(a)<0&&j.indexOf(i)<0&&j.push(i),h=i.toLowerCase().indexOf("a")<1&&i.replace(/\[.*?\]/g,"").indexOf("h")<1,z("y")&&(p=2),z("M")&&(p=1),z("d")&&(p=0),k=Math.max(p,k),m||aa(e);};if(l.destroy=function(){ba(),ma(),_c.removeData("DateTimePicker"),_c.removeData("date");},l.toggle=ha,l.show=ga,l.hide=ba,l.disable=function(){return ba(),n&&n.hasClass("btn")&&n.addClass("disabled"),g.prop("disabled",!0),l;},l.enable=function(){return n&&n.hasClass("btn")&&n.removeClass("disabled"),g.prop("disabled",!1),l;},l.ignoreReadonly=function(a){if(0===arguments.length)return d.ignoreReadonly;if("boolean"!=typeof a)throw new TypeError("ignoreReadonly () expects a boolean parameter");return d.ignoreReadonly=a,l;},l.options=function(b){if(0===arguments.length)return a.extend(!0,{},d);if(!(b instanceof Object))throw new TypeError("options() options parameter should be an object");return a.extend(!0,d,b),a.each(d,function(a,b){if(void 0===l[a])throw new TypeError("option "+a+" is not recognized!");l[a](b);}),l;},l.date=function(a){if(0===arguments.length)return m?null:e.clone();if(!(null===a||"string"==typeof a||b.isMoment(a)||a instanceof Date))throw new TypeError("date() parameter must be one of [null, string, moment or Date]");return aa(null===a?null:da(a)),l;},l.format=function(a){if(0===arguments.length)return d.format;if("string"!=typeof a&&("boolean"!=typeof a||a!==!1))throw new TypeError("format() expects a string or boolean:false parameter "+a);return d.format=a,i&&pa(),l;},l.timeZone=function(a){if(0===arguments.length)return d.timeZone;if("string"!=typeof a)throw new TypeError("newZone() expects a string parameter");return d.timeZone=a,l;},l.dayViewHeaderFormat=function(a){if(0===arguments.length)return d.dayViewHeaderFormat;if("string"!=typeof a)throw new TypeError("dayViewHeaderFormat() expects a string parameter");return d.dayViewHeaderFormat=a,l;},l.extraFormats=function(a){if(0===arguments.length)return d.extraFormats;if(a!==!1&&!(a instanceof Array))throw new TypeError("extraFormats() expects an array or false parameter");return d.extraFormats=a,j&&pa(),l;},l.disabledDates=function(b){if(0===arguments.length)return d.disabledDates?a.extend({},d.disabledDates):d.disabledDates;if(!b)return d.disabledDates=!1,_(),l;if(!(b instanceof Array))throw new TypeError("disabledDates() expects an array parameter");return d.disabledDates=na(b),d.enabledDates=!1,_(),l;},l.enabledDates=function(b){if(0===arguments.length)return d.enabledDates?a.extend({},d.enabledDates):d.enabledDates;if(!b)return d.enabledDates=!1,_(),l;if(!(b instanceof Array))throw new TypeError("enabledDates() expects an array parameter");return d.enabledDates=na(b),d.disabledDates=!1,_(),l;},l.daysOfWeekDisabled=function(a){if(0===arguments.length)return d.daysOfWeekDisabled.splice(0);if("boolean"==typeof a&&!a)return d.daysOfWeekDisabled=!1,_(),l;if(!(a instanceof Array))throw new TypeError("daysOfWeekDisabled() expects an array parameter");if(d.daysOfWeekDisabled=a.reduce(function(a,b){return b=parseInt(b,10),b>6||b<0||isNaN(b)?a:(a.indexOf(b)===-1&&a.push(b),a);},[]).sort(),d.useCurrent&&!d.keepInvalid){for(var b=0;!R(e,"d");){if(e.add(1,"d"),31===b)throw"Tried 31 times to find a valid date";b++;}aa(e);}return _(),l;},l.maxDate=function(a){if(0===arguments.length)return d.maxDate?d.maxDate.clone():d.maxDate;if("boolean"==typeof a&&a===!1)return d.maxDate=!1,_(),l;"string"==typeof a&&("now"!==a&&"moment"!==a||(a=y()));var b=da(a);if(!b.isValid())throw new TypeError("maxDate() Could not parse date parameter: "+a);if(d.minDate&&b.isBefore(d.minDate))throw new TypeError("maxDate() date parameter is before options.minDate: "+b.format(i));return d.maxDate=b,d.useCurrent&&!d.keepInvalid&&e.isAfter(a)&&aa(d.maxDate),f.isAfter(b)&&(f=b.clone().subtract(d.stepping,"m")),_(),l;},l.minDate=function(a){if(0===arguments.length)return d.minDate?d.minDate.clone():d.minDate;if("boolean"==typeof a&&a===!1)return d.minDate=!1,_(),l;"string"==typeof a&&("now"!==a&&"moment"!==a||(a=y()));var b=da(a);if(!b.isValid())throw new TypeError("minDate() Could not parse date parameter: "+a);if(d.maxDate&&b.isAfter(d.maxDate))throw new TypeError("minDate() date parameter is after options.maxDate: "+b.format(i));return d.minDate=b,d.useCurrent&&!d.keepInvalid&&e.isBefore(a)&&aa(d.minDate),f.isBefore(b)&&(f=b.clone().add(d.stepping,"m")),_(),l;},l.defaultDate=function(a){if(0===arguments.length)return d.defaultDate?d.defaultDate.clone():d.defaultDate;if(!a)return d.defaultDate=!1,l;"string"==typeof a&&(a="now"===a||"moment"===a?y():y(a));var b=da(a);if(!b.isValid())throw new TypeError("defaultDate() Could not parse date parameter: "+a);if(!R(b))throw new TypeError("defaultDate() date passed is invalid according to component setup validations");return d.defaultDate=b,(d.defaultDate&&d.inline||""===g.val().trim())&&aa(d.defaultDate),l;},l.locale=function(a){if(0===arguments.length)return d.locale;if(!b.localeData(a))throw new TypeError("locale() locale "+a+" is not loaded from moment locales!");return d.locale=a,e.locale(d.locale),f.locale(d.locale),i&&pa(),o&&(ba(),ga()),l;},l.stepping=function(a){return 0===arguments.length?d.stepping:(a=parseInt(a,10),(isNaN(a)||a<1)&&(a=1),d.stepping=a,l);},l.useCurrent=function(a){var b=["year","month","day","hour","minute"];if(0===arguments.length)return d.useCurrent;if("boolean"!=typeof a&&"string"!=typeof a)throw new TypeError("useCurrent() expects a boolean or string parameter");if("string"==typeof a&&b.indexOf(a.toLowerCase())===-1)throw new TypeError("useCurrent() expects a string parameter of "+b.join(", "));return d.useCurrent=a,l;},l.collapse=function(a){if(0===arguments.length)return d.collapse;if("boolean"!=typeof a)throw new TypeError("collapse() expects a boolean parameter");return d.collapse===a?l:(d.collapse=a,o&&(ba(),ga()),l);},l.icons=function(b){if(0===arguments.length)return a.extend({},d.icons);if(!(b instanceof Object))throw new TypeError("icons() expects parameter to be an Object");return a.extend(d.icons,b),o&&(ba(),ga()),l;},l.tooltips=function(b){if(0===arguments.length)return a.extend({},d.tooltips);if(!(b instanceof Object))throw new TypeError("tooltips() expects parameter to be an Object");return a.extend(d.tooltips,b),o&&(ba(),ga()),l;},l.useStrict=function(a){if(0===arguments.length)return d.useStrict;if("boolean"!=typeof a)throw new TypeError("useStrict() expects a boolean parameter");return d.useStrict=a,l;},l.sideBySide=function(a){if(0===arguments.length)return d.sideBySide;if("boolean"!=typeof a)throw new TypeError("sideBySide() expects a boolean parameter");return d.sideBySide=a,o&&(ba(),ga()),l;},l.viewMode=function(a){if(0===arguments.length)return d.viewMode;if("string"!=typeof a)throw new TypeError("viewMode() expects a string parameter");if(r.indexOf(a)===-1)throw new TypeError("viewMode() parameter must be one of ("+r.join(", ")+") value");return d.viewMode=a,k=Math.max(r.indexOf(a),p),L(),l;},l.toolbarPlacement=function(a){if(0===arguments.length)return d.toolbarPlacement;if("string"!=typeof a)throw new TypeError("toolbarPlacement() expects a string parameter");if(u.indexOf(a)===-1)throw new TypeError("toolbarPlacement() parameter must be one of ("+u.join(", ")+") value");return d.toolbarPlacement=a,o&&(ba(),ga()),l;},l.widgetPositioning=function(b){if(0===arguments.length)return a.extend({},d.widgetPositioning);if("[object Object]"!=={}.toString.call(b))throw new TypeError("widgetPositioning() expects an object variable");if(b.horizontal){if("string"!=typeof b.horizontal)throw new TypeError("widgetPositioning() horizontal variable must be a string");if(b.horizontal=b.horizontal.toLowerCase(),t.indexOf(b.horizontal)===-1)throw new TypeError("widgetPositioning() expects horizontal parameter to be one of ("+t.join(", ")+")");d.widgetPositioning.horizontal=b.horizontal;}if(b.vertical){if("string"!=typeof b.vertical)throw new TypeError("widgetPositioning() vertical variable must be a string");if(b.vertical=b.vertical.toLowerCase(),s.indexOf(b.vertical)===-1)throw new TypeError("widgetPositioning() expects vertical parameter to be one of ("+s.join(", ")+")");d.widgetPositioning.vertical=b.vertical;}return _(),l;},l.calendarWeeks=function(a){if(0===arguments.length)return d.calendarWeeks;if("boolean"!=typeof a)throw new TypeError("calendarWeeks() expects parameter to be a boolean value");return d.calendarWeeks=a,_(),l;},l.showTodayButton=function(a){if(0===arguments.length)return d.showTodayButton;if("boolean"!=typeof a)throw new TypeError("showTodayButton() expects a boolean parameter");return d.showTodayButton=a,o&&(ba(),ga()),l;},l.showClear=function(a){if(0===arguments.length)return d.showClear;if("boolean"!=typeof a)throw new TypeError("showClear() expects a boolean parameter");return d.showClear=a,o&&(ba(),ga()),l;},l.widgetParent=function(b){if(0===arguments.length)return d.widgetParent;if("string"==typeof b&&(b=a(b)),null!==b&&"string"!=typeof b&&!(b instanceof a))throw new TypeError("widgetParent() expects a string or a jQuery object parameter");return d.widgetParent=b,o&&(ba(),ga()),l;},l.keepOpen=function(a){if(0===arguments.length)return d.keepOpen;if("boolean"!=typeof a)throw new TypeError("keepOpen() expects a boolean parameter");return d.keepOpen=a,l;},l.focusOnShow=function(a){if(0===arguments.length)return d.focusOnShow;if("boolean"!=typeof a)throw new TypeError("focusOnShow() expects a boolean parameter");return d.focusOnShow=a,l;},l.inline=function(a){if(0===arguments.length)return d.inline;if("boolean"!=typeof a)throw new TypeError("inline() expects a boolean parameter");return d.inline=a,l;},l.clear=function(){return ca(),l;},l.keyBinds=function(a){return 0===arguments.length?d.keyBinds:(d.keyBinds=a,l);},l.getMoment=function(a){return y(a);},l.debug=function(a){if("boolean"!=typeof a)throw new TypeError("debug() expects a boolean parameter");return d.debug=a,l;},l.allowInputToggle=function(a){if(0===arguments.length)return d.allowInputToggle;if("boolean"!=typeof a)throw new TypeError("allowInputToggle() expects a boolean parameter");return d.allowInputToggle=a,l;},l.showClose=function(a){if(0===arguments.length)return d.showClose;if("boolean"!=typeof a)throw new TypeError("showClose() expects a boolean parameter");return d.showClose=a,l;},l.keepInvalid=function(a){if(0===arguments.length)return d.keepInvalid;if("boolean"!=typeof a)throw new TypeError("keepInvalid() expects a boolean parameter");return d.keepInvalid=a,l;},l.datepickerInput=function(a){if(0===arguments.length)return d.datepickerInput;if("string"!=typeof a)throw new TypeError("datepickerInput() expects a string parameter");return d.datepickerInput=a,l;},l.parseInputDate=function(a){if(0===arguments.length)return d.parseInputDate;if("function"!=typeof a)throw new TypeError("parseInputDate() sholud be as function");return d.parseInputDate=a,l;},l.disabledTimeIntervals=function(b){if(0===arguments.length)return d.disabledTimeIntervals?a.extend({},d.disabledTimeIntervals):d.disabledTimeIntervals;if(!b)return d.disabledTimeIntervals=!1,_(),l;if(!(b instanceof Array))throw new TypeError("disabledTimeIntervals() expects an array parameter");return d.disabledTimeIntervals=b,_(),l;},l.disabledHours=function(b){if(0===arguments.length)return d.disabledHours?a.extend({},d.disabledHours):d.disabledHours;if(!b)return d.disabledHours=!1,_(),l;if(!(b instanceof Array))throw new TypeError("disabledHours() expects an array parameter");if(d.disabledHours=oa(b),d.enabledHours=!1,d.useCurrent&&!d.keepInvalid){for(var c=0;!R(e,"h");){if(e.add(1,"h"),24===c)throw"Tried 24 times to find a valid date";c++;}aa(e);}return _(),l;},l.enabledHours=function(b){if(0===arguments.length)return d.enabledHours?a.extend({},d.enabledHours):d.enabledHours;if(!b)return d.enabledHours=!1,_(),l;if(!(b instanceof Array))throw new TypeError("enabledHours() expects an array parameter");if(d.enabledHours=oa(b),d.disabledHours=!1,d.useCurrent&&!d.keepInvalid){for(var c=0;!R(e,"h");){if(e.add(1,"h"),24===c)throw"Tried 24 times to find a valid date";c++;}aa(e);}return _(),l;},l.viewDate=function(a){if(0===arguments.length)return f.clone();if(!a)return f=e.clone(),l;if(!("string"==typeof a||b.isMoment(a)||a instanceof Date))throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");return f=da(a),K(),l;},_c.is("input"))g=_c;else if(g=_c.find(d.datepickerInput),0===g.length)g=_c.find("input");else if(!g.is("input"))throw new Error('CSS class "'+d.datepickerInput+'" cannot be applied to non input element');if(_c.hasClass("input-group")&&(n=0===_c.find(".datepickerbutton").length?_c.find(".input-group-addon"):_c.find(".datepickerbutton")),!d.inline&&!g.is("input"))throw new Error("Could not initialize DateTimePicker without an input element");return e=y(),f=e.clone(),a.extend(!0,d,H()),l.options(d),pa(),la(),g.prop("disabled")&&l.disable(),g.is("input")&&0!==g.val().trim().length?aa(da(g.val().trim())):d.defaultDate&&void 0===g.attr("placeholder")&&aa(d.defaultDate),d.inline&&ga(),l;};return a.fn.datetimepicker=function(b){b=b||{};var d,e=Array.prototype.slice.call(arguments,1),f=!0,g=["destroy","hide","show","toggle"];if("object"==_typeof(b))return this.each(function(){var d,e=a(this);e.data("DateTimePicker")||(d=a.extend(!0,{},a.fn.datetimepicker.defaults,b),e.data("DateTimePicker",c(e,d)));});if("string"==typeof b)return this.each(function(){var c=a(this),g=c.data("DateTimePicker");if(!g)throw new Error('bootstrap-datetimepicker("'+b+'") method was called on an element that is not using DateTimePicker');d=g[b].apply(g,e),f=d===g;}),f||a.inArray(b,g)>-1?this:d;throw new TypeError("Invalid arguments for DateTimePicker: "+b);},a.fn.datetimepicker.defaults={timeZone:"",format:!1,dayViewHeaderFormat:"MMMM YYYY",extraFormats:!1,stepping:1,minDate:!1,maxDate:!1,useCurrent:!0,collapse:!0,locale:b.locale(),defaultDate:!1,disabledDates:!1,enabledDates:!1,icons:{time:"glyphicon glyphicon-time",date:"glyphicon glyphicon-calendar",up:"glyphicon glyphicon-chevron-up",down:"glyphicon glyphicon-chevron-down",previous:"glyphicon glyphicon-chevron-left",next:"glyphicon glyphicon-chevron-right",today:"glyphicon glyphicon-screenshot",clear:"glyphicon glyphicon-trash",close:"glyphicon glyphicon-remove"},tooltips:{today:"Go to today",clear:"Clear selection",close:"Close the picker",selectMonth:"Select Month",prevMonth:"Previous Month",nextMonth:"Next Month",selectYear:"Select Year",prevYear:"Previous Year",nextYear:"Next Year",selectDecade:"Select Decade",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevCentury:"Previous Century",nextCentury:"Next Century",pickHour:"Pick Hour",incrementHour:"Increment Hour",decrementHour:"Decrement Hour",pickMinute:"Pick Minute",incrementMinute:"Increment Minute",decrementMinute:"Decrement Minute",pickSecond:"Pick Second",incrementSecond:"Increment Second",decrementSecond:"Decrement Second",togglePeriod:"Toggle Period",selectTime:"Select Time"},useStrict:!1,sideBySide:!1,daysOfWeekDisabled:!1,calendarWeeks:!1,viewMode:"days",toolbarPlacement:"default",showTodayButton:!1,showClear:!1,showClose:!1,widgetPositioning:{horizontal:"auto",vertical:"auto"},widgetParent:null,ignoreReadonly:!1,keepOpen:!1,focusOnShow:!0,inline:!1,keepInvalid:!1,datepickerInput:".datepickerinput",keyBinds:{up:function up(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().subtract(7,"d")):this.date(b.clone().add(this.stepping(),"m"));}},down:function down(a){if(!a)return void this.show();var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().add(7,"d")):this.date(b.clone().subtract(this.stepping(),"m"));},"control up":function controlUp(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().subtract(1,"y")):this.date(b.clone().add(1,"h"));}},"control down":function controlDown(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().add(1,"y")):this.date(b.clone().subtract(1,"h"));}},left:function left(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().subtract(1,"d"));}},right:function right(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().add(1,"d"));}},pageUp:function pageUp(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().subtract(1,"M"));}},pageDown:function pageDown(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().add(1,"M"));}},enter:function enter(){this.hide();},escape:function escape(){this.hide();},"control space":function controlSpace(a){a&&a.find(".timepicker").is(":visible")&&a.find('.btn[data-action="togglePeriod"]').click();},t:function t(){this.date(this.getMoment());},"delete":function _delete(){this.clear();}},debug:!1,allowInputToggle:!1,disabledTimeIntervals:!1,disabledHours:!1,enabledHours:!1,viewDate:!1},a.fn.datetimepicker;});(function(){'use strict';angular.module('ngMask',[]);})();(function(){'use strict';angular.module('ngMask').directive('mask',['$log','$timeout','MaskService',function($log,$timeout,MaskService){return{restrict:'A',require:'ngModel',compile:function compile($element,$attrs){if(!$attrs.mask||!$attrs.ngModel){$log.info('Mask and ng-model attributes are required!');return;}var maskService=MaskService.create();var timeout;var promise;function setSelectionRange(selectionStart){if(typeof selectionStart!=='number'){return;}// using $timeout:
// it should run after the DOM has been manipulated by Angular
// and after the browser renders (which may cause flicker in some cases)
$timeout.cancel(timeout);timeout=$timeout(function(){var selectionEnd=selectionStart+1;var input=$element[0];if(input.setSelectionRange){input.focus();input.setSelectionRange(selectionStart,selectionEnd);}else if(input.createTextRange){var range=input.createTextRange();range.collapse(true);range.moveEnd('character',selectionEnd);range.moveStart('character',selectionStart);range.select();}});}return{pre:function pre($scope,$element,$attrs,controller){promise=maskService.generateRegex({mask:$attrs.mask,// repeat mask expression n times
repeat:$attrs.repeat||$attrs.maskRepeat,// clean model value - without divisors
clean:($attrs.clean||$attrs.maskClean)==='true',// limit length based on mask length
limit:($attrs.limit||$attrs.maskLimit||'true')==='true',// how to act with a wrong value
restrict:$attrs.restrict||$attrs.maskRestrict||'select',//select, reject, accept
// set validity mask
validate:($attrs.validate||$attrs.maskValidate||'true')==='true',// default model value
model:$attrs.ngModel,// default input value
value:$attrs.ngValue});},post:function post($scope,$element,$attrs,controller){var timeout;var options=maskService.getOptions();function parseViewValue(value){var untouchedValue=value;options=maskService.getOptions();// set default value equal 0
value=value||'';// get view value object
var viewValue=maskService.getViewValue(value);// get mask without question marks
var maskWithoutOptionals=options['maskWithoutOptionals']||'';// get view values capped
// used on view
var viewValueWithDivisors=viewValue.withDivisors(true);// used on model
var viewValueWithoutDivisors=viewValue.withoutDivisors(true);try{// get current regex
var regex=maskService.getRegex(viewValueWithDivisors.length-1);var fullRegex=maskService.getRegex(maskWithoutOptionals.length-1);// current position is valid
var validCurrentPosition=regex.test(viewValueWithDivisors)||fullRegex.test(viewValueWithDivisors);// difference means for select option
var diffValueAndViewValueLengthIsOne=value.length-viewValueWithDivisors.length===1;var diffMaskAndViewValueIsGreaterThanZero=maskWithoutOptionals.length-viewValueWithDivisors.length>0;if(options.restrict!=='accept'){if(options.restrict==='select'&&(!validCurrentPosition||diffValueAndViewValueLengthIsOne)){var lastCharInputed=value[value.length-1];var lastCharGenerated=viewValueWithDivisors[viewValueWithDivisors.length-1];if(lastCharInputed!==lastCharGenerated&&diffMaskAndViewValueIsGreaterThanZero){viewValueWithDivisors=viewValueWithDivisors+lastCharInputed;}var wrongPosition=maskService.getFirstWrongPosition(viewValueWithDivisors);if(angular.isDefined(wrongPosition)){setSelectionRange(wrongPosition);}}else if(options.restrict==='reject'&&!validCurrentPosition){viewValue=maskService.removeWrongPositions(viewValueWithDivisors);viewValueWithDivisors=viewValue.withDivisors(true);viewValueWithoutDivisors=viewValue.withoutDivisors(true);// setSelectionRange(viewValueWithDivisors.length);
}}if(!options.limit){viewValueWithDivisors=viewValue.withDivisors(false);viewValueWithoutDivisors=viewValue.withoutDivisors(false);}// Set validity
if(options.validate&&controller.$dirty){if(fullRegex.test(viewValueWithDivisors)||controller.$isEmpty(untouchedValue)){controller.$setValidity('mask',true);}else{controller.$setValidity('mask',false);}}// Update view and model values
if(value!==viewValueWithDivisors){controller.$setViewValue(angular.copy(viewValueWithDivisors),'input');controller.$render();}}catch(e){$log.error('[mask - parseViewValue]');throw e;}// Update model, can be different of view value
if(options.clean){return viewValueWithoutDivisors;}else{return viewValueWithDivisors;}}var callParseViewValue=function callParseViewValue(){parseViewValue();controller.$parsers.push(parseViewValue);// $evalAsync from a directive
// it should run after the DOM has been manipulated by Angular
// but before the browser renders
if(options.value){$scope.$evalAsync(function($scope){controller.$setViewValue(angular.copy(options.value),'input');controller.$render();});}};$element.on('click input paste keyup',function(){timeout=$timeout(function(){// Manual debounce to prevent multiple execution
$timeout.cancel(timeout);parseViewValue($element.val());$scope.$apply();},100);});// Register the watch to observe remote loading or promised data
// Deregister calling returned function
var watcher=$scope.$watch($attrs.ngModel,function(newValue,oldValue){if(angular.isDefined(newValue)){parseViewValue(newValue);watcher();}});$scope.$watch(function(){return[$attrs.mask];},function(){promise=maskService.generateRegex({mask:$attrs.mask,// repeat mask expression n times
repeat:$attrs.repeat||$attrs.maskRepeat,// clean model value - without divisors
clean:($attrs.clean||$attrs.maskClean)==='true',// limit length based on mask length
limit:($attrs.limit||$attrs.maskLimit||'true')==='true',// how to act with a wrong value
restrict:$attrs.restrict||$attrs.maskRestrict||'select',//select, reject, accept
// set validity mask
validate:($attrs.validate||$attrs.maskValidate||'true')==='true',// default model value
model:$attrs.ngModel,// default input value
value:$attrs.ngValue}).then(function(){$element.triggerHandler('click');});promise.then(callParseViewValue);},true);promise.then(callParseViewValue);}};}};}]);})();(function(){'use strict';angular.module('ngMask').factory('MaskService',['$q','OptionalService','UtilService',function($q,OptionalService,UtilService){function create(){var options;var maskWithoutOptionals;var maskWithoutOptionalsLength=0;var maskWithoutOptionalsAndDivisorsLength=0;var optionalIndexes=[];var optionalDivisors={};var optionalDivisorsCombinations=[];var divisors=[];var divisorElements={};var regex=[];var patterns={'9':/[0-9]/,'8':/[0-8]/,'7':/[0-7]/,'6':/[0-6]/,'5':/[0-5]/,'4':/[0-4]/,'3':/[0-3]/,'2':/[0-2]/,'1':/[0-1]/,'0':/[0]/,'*':/./,'w':/\w/,'W':/\W/,'d':/\d/,'D':/\D/,'s':/\s/,'S':/\S/,'b':/\b/,'A':/[A-Z]/,'a':/[a-z]/,'Z':/[A-ZÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,'z':/[a-zçáàãâéèêẽíìĩîóòôõúùũüû]/,'@':/[a-zA-Z]/,'#':/[a-zA-ZçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,'%':/[0-9a-zA-ZçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/};// REGEX
function generateIntermetiateElementRegex(i,forceOptional){var charRegex;try{var element=maskWithoutOptionals[i];var elementRegex=patterns[element];var hasOptional=isOptional(i);if(elementRegex){charRegex='('+elementRegex.source+')';}else{// is a divisor
if(!isDivisor(i)){divisors.push(i);divisorElements[i]=element;}charRegex='('+'\\'+element+')';}}catch(e){throw e;}if(hasOptional||forceOptional){charRegex+='?';}return new RegExp(charRegex);}function generateIntermetiateRegex(i,forceOptional){var _elementRegex;var _elementOptionalRegex;try{var intermetiateElementRegex=generateIntermetiateElementRegex(i,forceOptional);_elementRegex=intermetiateElementRegex;var hasOptional=isOptional(i);var currentRegex=intermetiateElementRegex.source;if(hasOptional&&i+1<maskWithoutOptionalsLength){var intermetiateRegex=generateIntermetiateRegex(i+1,true).elementOptionalRegex();currentRegex+=intermetiateRegex.source;}_elementOptionalRegex=new RegExp(currentRegex);}catch(e){throw e;}return{elementRegex:function elementRegex(){return _elementRegex;},elementOptionalRegex:function elementOptionalRegex(){// from element regex, gets the flow of regex until first not optional
return _elementOptionalRegex;}};}function generateRegex(opts){var deferred=$q.defer();maskWithoutOptionals=null;maskWithoutOptionalsLength=0;maskWithoutOptionalsAndDivisorsLength=0;optionalIndexes=[];optionalDivisors={};optionalDivisorsCombinations=[];divisors=[];divisorElements={};regex=[];options=opts;try{var mask=opts['mask'];var repeat=opts['repeat'];if(!mask)return;if(repeat){mask=Array(parseInt(repeat)+1).join(mask);}optionalIndexes=OptionalService.getOptionals(mask).fromMaskWithoutOptionals();options['maskWithoutOptionals']=maskWithoutOptionals=OptionalService.removeOptionals(mask);maskWithoutOptionalsLength=maskWithoutOptionals.length;var cumulativeRegex;for(var i=0;i<maskWithoutOptionalsLength;i++){var charRegex=generateIntermetiateRegex(i);var elementRegex=charRegex.elementRegex();var elementOptionalRegex=charRegex.elementOptionalRegex();var newRegex=cumulativeRegex?cumulativeRegex.source+elementOptionalRegex.source:elementOptionalRegex.source;newRegex=new RegExp(newRegex);cumulativeRegex=cumulativeRegex?cumulativeRegex.source+elementRegex.source:elementRegex.source;cumulativeRegex=new RegExp(cumulativeRegex);regex.push(newRegex);}generateOptionalDivisors();maskWithoutOptionalsAndDivisorsLength=removeDivisors(maskWithoutOptionals).length;deferred.resolve({options:options,divisors:divisors,divisorElements:divisorElements,optionalIndexes:optionalIndexes,optionalDivisors:optionalDivisors,optionalDivisorsCombinations:optionalDivisorsCombinations});}catch(e){deferred.reject(e);throw e;}return deferred.promise;}function getRegex(index){var currentRegex;try{currentRegex=regex[index]?regex[index].source:'';}catch(e){throw e;}return new RegExp('^'+currentRegex+'$');}// DIVISOR
function isOptional(currentPos){return UtilService.inArray(currentPos,optionalIndexes);}function isDivisor(currentPos){return UtilService.inArray(currentPos,divisors);}function generateOptionalDivisors(){function sortNumber(a,b){return a-b;}var sortedDivisors=divisors.sort(sortNumber);var sortedOptionals=optionalIndexes.sort(sortNumber);for(var i=0;i<sortedDivisors.length;i++){var divisor=sortedDivisors[i];for(var j=1;j<=sortedOptionals.length;j++){var optional=sortedOptionals[j-1];if(optional>=divisor){break;}if(optionalDivisors[divisor]){optionalDivisors[divisor]=optionalDivisors[divisor].concat(divisor-j);}else{optionalDivisors[divisor]=[divisor-j];}// get the original divisor for alternative divisor
divisorElements[divisor-j]=divisorElements[divisor];}}}function removeDivisors(value){value=value.toString();try{if(divisors.length>0&&value){var keys=Object.keys(divisorElements);var elments=[];for(var i=keys.length-1;i>=0;i--){var divisor=divisorElements[keys[i]];if(divisor){elments.push(divisor);}}elments=UtilService.uniqueArray(elments);// remove if it is not pattern
var regex=new RegExp('['+'\\'+elments.join('\\')+']','g');return value.replace(regex,'');}else{return value;}}catch(e){throw e;}}function insertDivisors(array,combination){function insert(array,output){var out=output;for(var i=0;i<array.length;i++){var divisor=array[i];if(divisor<out.length){out.splice(divisor,0,divisorElements[divisor]);}}return out;}var output=array;var divs=divisors.filter(function(it){var optionalDivisorsKeys=Object.keys(optionalDivisors).map(function(it){return parseInt(it);});return!UtilService.inArray(it,combination)&&!UtilService.inArray(it,optionalDivisorsKeys);});if(!angular.isArray(array)||!angular.isArray(combination)){return output;}// insert not optional divisors
output=insert(divs,output);// insert optional divisors
output=insert(combination,output);return output;}function tryDivisorConfiguration(value){var output=value.split('');var defaultDivisors=true;// has optional?
if(optionalIndexes.length>0){var lazyArguments=[];var optionalDivisorsKeys=Object.keys(optionalDivisors);// get all optional divisors as array of arrays [[], [], []...]
for(var i=0;i<optionalDivisorsKeys.length;i++){var val=optionalDivisors[optionalDivisorsKeys[i]];lazyArguments.push(val);}// generate all possible configurations
if(optionalDivisorsCombinations.length===0){UtilService.lazyProduct(lazyArguments,function(){// convert arguments to array
optionalDivisorsCombinations.push(Array.prototype.slice.call(arguments));});}for(var i=optionalDivisorsCombinations.length-1;i>=0;i--){var outputClone=angular.copy(output);outputClone=insertDivisors(outputClone,optionalDivisorsCombinations[i]);// try validation
var viewValueWithDivisors=outputClone.join('');var regex=getRegex(maskWithoutOptionals.length-1);if(regex.test(viewValueWithDivisors)){defaultDivisors=false;output=outputClone;break;}}}if(defaultDivisors){output=insertDivisors(output,divisors);}return output.join('');}// MASK
function getOptions(){return options;}function getViewValue(value){try{var outputWithoutDivisors=removeDivisors(value);var output=tryDivisorConfiguration(outputWithoutDivisors);return{withDivisors:function withDivisors(capped){if(capped){return output.substr(0,maskWithoutOptionalsLength);}else{return output;}},withoutDivisors:function withoutDivisors(capped){if(capped){return outputWithoutDivisors.substr(0,maskWithoutOptionalsAndDivisorsLength);}else{return outputWithoutDivisors;}}};}catch(e){throw e;}}// SELECTOR
function getWrongPositions(viewValueWithDivisors,onlyFirst){var pos=[];if(!viewValueWithDivisors){return 0;}for(var i=0;i<viewValueWithDivisors.length;i++){var pattern=getRegex(i);var value=viewValueWithDivisors.substr(0,i+1);if(pattern&&!pattern.test(value)){pos.push(i);if(onlyFirst){break;}}}return pos;}function getFirstWrongPosition(viewValueWithDivisors){return getWrongPositions(viewValueWithDivisors,true)[0];}function removeWrongPositions(viewValueWithDivisors){var wrongPositions=getWrongPositions(viewValueWithDivisors,false);var newViewValue=viewValueWithDivisors;for(var i=0;i<wrongPositions.length;i++){var wrongPosition=wrongPositions[i];var viewValueArray=viewValueWithDivisors.split('');viewValueArray.splice(wrongPosition,1);newViewValue=viewValueArray.join('');}return getViewValue(newViewValue);}return{getViewValue:getViewValue,generateRegex:generateRegex,getRegex:getRegex,getOptions:getOptions,removeDivisors:removeDivisors,getFirstWrongPosition:getFirstWrongPosition,removeWrongPositions:removeWrongPositions};}return{create:create};}]);})();(function(){'use strict';angular.module('ngMask').factory('OptionalService',[function(){function getOptionalsIndexes(mask){var indexes=[];try{var regexp=/\?/g;var match=[];while((match=regexp.exec(mask))!=null){// Save the optional char
indexes.push(match.index-1);}}catch(e){throw e;}return{fromMask:function fromMask(){return indexes;},fromMaskWithoutOptionals:function fromMaskWithoutOptionals(){return getOptionalsRelativeMaskWithoutOptionals(indexes);}};}function getOptionalsRelativeMaskWithoutOptionals(optionals){var indexes=[];for(var i=0;i<optionals.length;i++){indexes.push(optionals[i]-i);}return indexes;}function removeOptionals(mask){var newMask;try{newMask=mask.replace(/\?/g,'');}catch(e){throw e;}return newMask;}return{removeOptionals:removeOptionals,getOptionals:getOptionalsIndexes};}]);})();(function(){'use strict';angular.module('ngMask').factory('UtilService',[function(){// sets: an array of arrays
// f: your callback function
// context: [optional] the `this` to use for your callback
// http://phrogz.net/lazy-cartesian-product
function lazyProduct(sets,f,context){if(!context){context=this;}var p=[];var max=sets.length-1;var lens=[];for(var i=sets.length;i--;){lens[i]=sets[i].length;}function dive(d){var a=sets[d];var len=lens[d];if(d===max){for(var i=0;i<len;++i){p[d]=a[i];f.apply(context,p);}}else{for(var i=0;i<len;++i){p[d]=a[i];dive(d+1);}}p.pop();}dive(0);}function inArray(i,array){var output;try{output=array.indexOf(i)>-1;}catch(e){throw e;}return output;}function uniqueArray(array){var u={};var a=[];for(var i=0,l=array.length;i<l;++i){if(u.hasOwnProperty(array[i])){continue;}a.push(array[i]);u[array[i]]=1;}return a;}return{lazyProduct:lazyProduct,inArray:inArray,uniqueArray:uniqueArray};}]);})();/**
 * angular-growl-v2 - v0.7.8 - 2015-10-25
 * http://janstevens.github.io/angular-growl-2
 * Copyright (c) 2015 Marco Rinck,Jan Stevens,Silvan van Leeuwen; Licensed MIT
 */angular.module('angular-growl',[]);angular.module('angular-growl').directive('growl',[function(){'use strict';return{restrict:'A',templateUrl:'templates/growl/growl.html',replace:false,scope:{reference:'@',inline:'=',limitMessages:'='},controller:['$scope','$interval','growl','growlMessages',function($scope,$interval,growl,growlMessages){$scope.referenceId=$scope.reference||0;growlMessages.initDirective($scope.referenceId,$scope.limitMessages);$scope.growlMessages=growlMessages;$scope.inlineMessage=angular.isDefined($scope.inline)?$scope.inline:growl.inlineMessages();$scope.$watch('limitMessages',function(limitMessages){var directive=growlMessages.directives[$scope.referenceId];if(!angular.isUndefined(limitMessages)&&!angular.isUndefined(directive)){directive.limitMessages=limitMessages;}});$scope.stopTimeoutClose=function(message){if(!message.clickToClose){angular.forEach(message.promises,function(promise){$interval.cancel(promise);});if(message.close){growlMessages.deleteMessage(message);}else{message.close=true;}}};$scope.alertClasses=function(message){return{'alert-success':message.severity==='success','alert-error':message.severity==='error','alert-danger':message.severity==='error','alert-info':message.severity==='info','alert-warning':message.severity==='warning','icon':message.disableIcons===false,'alert-dismissable':!message.disableCloseButton};};$scope.showCountDown=function(message){return!message.disableCountDown&&message.ttl>0;};$scope.wrapperClasses=function(){var classes={};classes['growl-fixed']=!$scope.inlineMessage;classes[growl.position()]=true;return classes;};$scope.computeTitle=function(message){var ret={'success':'Success','error':'Error','info':'Information','warn':'Warning'};return ret[message.severity];};}]};}]);angular.module('angular-growl').run(['$templateCache',function($templateCache){'use strict';if($templateCache.get('templates/growl/growl.html')===undefined){$templateCache.put('templates/growl/growl.html','<div class="growl-container" ng-class="wrapperClasses()">'+'<div class="growl-item alert" ng-repeat="message in growlMessages.directives[referenceId].messages" ng-class="alertClasses(message)" ng-click="stopTimeoutClose(message)">'+'<button type="button" class="close" data-dismiss="alert" aria-hidden="true" ng-click="growlMessages.deleteMessage(message)" ng-show="!message.disableCloseButton">&times;</button>'+'<button type="button" class="close" aria-hidden="true" ng-show="showCountDown(message)">{{message.countdown}}</button>'+'<h4 class="growl-title" ng-show="message.title" ng-bind="message.title"></h4>'+'<div class="growl-message" ng-bind-html="message.text"></div>'+'</div>'+'</div>');}}]);angular.module('angular-growl').provider('growl',function(){'use strict';var _ttl={success:null,error:null,warning:null,info:null},_messagesKey='messages',_messageTextKey='text',_messageTitleKey='title',_messageSeverityKey='severity',_messageTTLKey='ttl',_onlyUniqueMessages=true,_messageVariableKey='variables',_referenceId=0,_inline=false,_position='top-right',_disableCloseButton=false,_disableIcons=false,_reverseOrder=false,_disableCountDown=false,_translateMessages=true;this.globalTimeToLive=function(ttl){if(_typeof(ttl)==='object'){for(var k in ttl){if(ttl.hasOwnProperty(k)){_ttl[k]=ttl[k];}}}else{for(var severity in _ttl){if(_ttl.hasOwnProperty(severity)){_ttl[severity]=ttl;}}}return this;};this.globalTranslateMessages=function(translateMessages){_translateMessages=translateMessages;return this;};this.globalDisableCloseButton=function(disableCloseButton){_disableCloseButton=disableCloseButton;return this;};this.globalDisableIcons=function(disableIcons){_disableIcons=disableIcons;return this;};this.globalReversedOrder=function(reverseOrder){_reverseOrder=reverseOrder;return this;};this.globalDisableCountDown=function(countDown){_disableCountDown=countDown;return this;};this.messageVariableKey=function(messageVariableKey){_messageVariableKey=messageVariableKey;return this;};this.globalInlineMessages=function(inline){_inline=inline;return this;};this.globalPosition=function(position){_position=position;return this;};this.messagesKey=function(messagesKey){_messagesKey=messagesKey;return this;};this.messageTextKey=function(messageTextKey){_messageTextKey=messageTextKey;return this;};this.messageTitleKey=function(messageTitleKey){_messageTitleKey=messageTitleKey;return this;};this.messageSeverityKey=function(messageSeverityKey){_messageSeverityKey=messageSeverityKey;return this;};this.messageTTLKey=function(messageTTLKey){_messageTTLKey=messageTTLKey;return this;};this.onlyUniqueMessages=function(onlyUniqueMessages){_onlyUniqueMessages=onlyUniqueMessages;return this;};this.serverMessagesInterceptor=['$q','growl',function($q,growl){function checkResponse(response){if(response!==undefined&&response.data&&response.data[_messagesKey]&&response.data[_messagesKey].length>0){growl.addServerMessages(response.data[_messagesKey]);}}return{'response':function response(_response){checkResponse(_response);return _response;},'responseError':function responseError(rejection){checkResponse(rejection);return $q.reject(rejection);}};}];this.$get=['$rootScope','$interpolate','$sce','$filter','$interval','growlMessages',function($rootScope,$interpolate,$sce,$filter,$interval,growlMessages){var translate;growlMessages.onlyUnique=_onlyUniqueMessages;growlMessages.reverseOrder=_reverseOrder;try{translate=$filter('translate');}catch(e){}function broadcastMessage(message){if(translate&&message.translateMessage){message.text=translate(message.text,message.variables)||message.text;message.title=translate(message.title)||message.title;}else{var polation=$interpolate(message.text);message.text=polation(message.variables);}var addedMessage=growlMessages.addMessage(message);$rootScope.$broadcast('growlMessage',message);$interval(function(){},0,1);return addedMessage;}function sendMessage(text,config,severity){var _config=config||{},message;message={text:text,title:_config.title,severity:severity,ttl:_config.ttl||_ttl[severity],variables:_config.variables||{},disableCloseButton:_config.disableCloseButton===undefined?_disableCloseButton:_config.disableCloseButton,disableIcons:_config.disableIcons===undefined?_disableIcons:_config.disableIcons,disableCountDown:_config.disableCountDown===undefined?_disableCountDown:_config.disableCountDown,position:_config.position||_position,referenceId:_config.referenceId||_referenceId,translateMessage:_config.translateMessage===undefined?_translateMessages:_config.translateMessage,destroy:function destroy(){growlMessages.deleteMessage(message);},setText:function setText(newText){message.text=$sce.trustAsHtml(String(newText));},onclose:_config.onclose,onopen:_config.onopen};return broadcastMessage(message);}function warning(text,config){return sendMessage(text,config,'warning');}function error(text,config){return sendMessage(text,config,'error');}function info(text,config){return sendMessage(text,config,'info');}function success(text,config){return sendMessage(text,config,'success');}function general(text,config,severity){severity=(severity||'error').toLowerCase();return sendMessage(text,config,severity);}function addServerMessages(messages){if(!messages||!messages.length){return;}var i,message,severity,length;length=messages.length;for(i=0;i<length;i++){message=messages[i];if(message[_messageTextKey]){severity=(message[_messageSeverityKey]||'error').toLowerCase();var config={};config.variables=message[_messageVariableKey]||{};config.title=message[_messageTitleKey];if(message[_messageTTLKey]){config.ttl=message[_messageTTLKey];}sendMessage(message[_messageTextKey],config,severity);}}}function onlyUnique(){return _onlyUniqueMessages;}function reverseOrder(){return _reverseOrder;}function inlineMessages(){return _inline;}function position(){return _position;}return{warning:warning,error:error,info:info,success:success,general:general,addServerMessages:addServerMessages,onlyUnique:onlyUnique,reverseOrder:reverseOrder,inlineMessages:inlineMessages,position:position};}];});angular.module('angular-growl').service('growlMessages',['$sce','$interval',function($sce,$interval){'use strict';var self=this;this.directives={};var preloadDirectives={};function preLoad(referenceId){var directive;if(preloadDirectives[referenceId]){directive=preloadDirectives[referenceId];}else{directive=preloadDirectives[referenceId]={messages:[]};}return directive;}function directiveForRefId(referenceId){var refId=referenceId||0;return self.directives[refId]||preloadDirectives[refId];}this.initDirective=function(referenceId,limitMessages){if(preloadDirectives[referenceId]){this.directives[referenceId]=preloadDirectives[referenceId];this.directives[referenceId].limitMessages=limitMessages;}else{this.directives[referenceId]={messages:[],limitMessages:limitMessages};}return this.directives[referenceId];};this.getAllMessages=function(referenceId){referenceId=referenceId||0;var messages;if(directiveForRefId(referenceId)){messages=directiveForRefId(referenceId).messages;}else{messages=[];}return messages;};this.destroyAllMessages=function(referenceId){var messages=this.getAllMessages(referenceId);for(var i=messages.length-1;i>=0;i--){messages[i].destroy();}var directive=directiveForRefId(referenceId);if(directive){directive.messages=[];}};this.addMessage=function(message){var directive,messages,found,msgText;if(this.directives[message.referenceId]){directive=this.directives[message.referenceId];}else{directive=preLoad(message.referenceId);}messages=directive.messages;if(this.onlyUnique){angular.forEach(messages,function(msg){msgText=$sce.getTrustedHtml(msg.text);if(message.text===msgText&&message.severity===msg.severity&&message.title===msg.title){found=true;}});if(found){return;}}message.text=$sce.trustAsHtml(String(message.text));if(message.ttl&&message.ttl!==-1){message.countdown=message.ttl/1000;message.promises=[];message.close=false;message.countdownFunction=function(){if(message.countdown>1){message.countdown--;message.promises.push($interval(message.countdownFunction,1000,1,1));}else{message.countdown--;}};}if(angular.isDefined(directive.limitMessages)){var diff=messages.length-(directive.limitMessages-1);if(diff>0){messages.splice(directive.limitMessages-1,diff);}}if(this.reverseOrder){messages.unshift(message);}else{messages.push(message);}if(typeof message.onopen==='function'){message.onopen();}if(message.ttl&&message.ttl!==-1){var self=this;message.promises.push($interval(angular.bind(this,function(){self.deleteMessage(message);}),message.ttl,1,1));message.promises.push($interval(message.countdownFunction,1000,1,1));}return message;};this.deleteMessage=function(message){var messages=this.getAllMessages(message.referenceId),index=-1;for(var i in messages){if(messages.hasOwnProperty(i)){index=messages[i]===message?i:index;}}if(index>-1){messages[index].close=true;messages.splice(index,1);}if(typeof message.onclose==='function'){message.onclose();}};}]);/*! DataTables 1.10.16
 * ©2008-2017 SpryMedia Ltd - datatables.net/license
 */ /**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.10.16
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   Copyright 2008-2017 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */ /*jslint evil: true, undef: true, browser: true */ /*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/(function(factory){"use strict";if(typeof define==='function'&&define.amd){// AMD
define(['jquery'],function($){return factory($,window,document);});}else if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object'){// CommonJS
module.exports=function(root,$){if(!root){// CommonJS environments without a window global must pass a
// root. This will give an error otherwise
root=window;}if(!$){$=typeof window!=='undefined'?// jQuery's factory checks for a global window
require('jquery'):require('jquery')(root);}return factory($,root,root.document);};}else{// Browser
factory(jQuery,window,document);}})(function($,window,document,undefined){"use strict";/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */var DataTable=function DataTable(options){/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */this.$=function(sSelector,oOpts){return this.api(true).$(sSelector,oOpts);};/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */this._=function(sSelector,oOpts){return this.api(true).rows(sSelector,oOpts).data();};/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */this.api=function(traditional){return traditional?new _Api2(_fnSettingsFromNode(this[_ext.iApiIndex])):new _Api2(this);};/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */this.fnAddData=function(data,redraw){var api=this.api(true);/* Check if we want to add multiple rows or not */var rows=$.isArray(data)&&($.isArray(data[0])||$.isPlainObject(data[0]))?api.rows.add(data):api.row.add(data);if(redraw===undefined||redraw){api.draw();}return rows.flatten().toArray();};/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */this.fnAdjustColumnSizing=function(bRedraw){var api=this.api(true).columns.adjust();var settings=api.settings()[0];var scroll=settings.oScroll;if(bRedraw===undefined||bRedraw){api.draw(false);}else if(scroll.sX!==""||scroll.sY!==""){/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */_fnScrollDraw(settings);}};/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */this.fnClearTable=function(bRedraw){var api=this.api(true).clear();if(bRedraw===undefined||bRedraw){api.draw();}};/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */this.fnClose=function(nTr){this.api(true).row(nTr).child.hide();};/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */this.fnDeleteRow=function(target,callback,redraw){var api=this.api(true);var rows=api.rows(target);var settings=rows.settings()[0];var data=settings.aoData[rows[0][0]];rows.remove();if(callback){callback.call(this,settings,data);}if(redraw===undefined||redraw){api.draw();}return data;};/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */this.fnDestroy=function(remove){this.api(true).destroy(remove);};/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */this.fnDraw=function(complete){// Note that this isn't an exact match to the old call to _fnDraw - it takes
// into account the new data, but can hold position.
this.api(true).draw(complete);};/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */this.fnFilter=function(sInput,iColumn,bRegex,bSmart,bShowGlobal,bCaseInsensitive){var api=this.api(true);if(iColumn===null||iColumn===undefined){api.search(sInput,bRegex,bSmart,bCaseInsensitive);}else{api.column(iColumn).search(sInput,bRegex,bSmart,bCaseInsensitive);}api.draw();};/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */this.fnGetData=function(src,col){var api=this.api(true);if(src!==undefined){var type=src.nodeName?src.nodeName.toLowerCase():'';return col!==undefined||type=='td'||type=='th'?api.cell(src,col).data():api.row(src).data()||null;}return api.data().toArray();};/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */this.fnGetNodes=function(iRow){var api=this.api(true);return iRow!==undefined?api.row(iRow).node():api.rows().nodes().flatten().toArray();};/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */this.fnGetPosition=function(node){var api=this.api(true);var nodeName=node.nodeName.toUpperCase();if(nodeName=='TR'){return api.row(node).index();}else if(nodeName=='TD'||nodeName=='TH'){var cell=api.cell(node).index();return[cell.row,cell.columnVisible,cell.column];}return null;};/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */this.fnIsOpen=function(nTr){return this.api(true).row(nTr).child.isShown();};/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */this.fnOpen=function(nTr,mHtml,sClass){return this.api(true).row(nTr).child(mHtml,sClass).show().child()[0];};/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */this.fnPageChange=function(mAction,bRedraw){var api=this.api(true).page(mAction);if(bRedraw===undefined||bRedraw){api.draw(false);}};/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */this.fnSetColumnVis=function(iCol,bShow,bRedraw){var api=this.api(true).column(iCol).visible(bShow);if(bRedraw===undefined||bRedraw){api.columns.adjust().draw();}};/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */this.fnSettings=function(){return _fnSettingsFromNode(this[_ext.iApiIndex]);};/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */this.fnSort=function(aaSort){this.api(true).order(aaSort).draw();};/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */this.fnSortListener=function(nNode,iColumn,fnCallback){this.api(true).order.listener(nNode,iColumn,fnCallback);};/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */this.fnUpdate=function(mData,mRow,iColumn,bRedraw,bAction){var api=this.api(true);if(iColumn===undefined||iColumn===null){api.row(mRow).data(mData);}else{api.cell(mRow,iColumn).data(mData);}if(bAction===undefined||bAction){api.columns.adjust();}if(bRedraw===undefined||bRedraw){api.draw();}return 0;};/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */this.fnVersionCheck=_ext.fnVersionCheck;var _that=this;var emptyInit=options===undefined;var len=this.length;if(emptyInit){options={};}this.oApi=this.internal=_ext.internal;// Extend with old style plug-in API methods
for(var fn in DataTable.ext.internal){if(fn){this[fn]=_fnExternApiFunc(fn);}}this.each(function(){// For each initialisation we want to give it a clean initialisation
// object that can be bashed around
var o={};var oInit=len>1?// optimisation for single table case
_fnExtend(o,options,true):options;/*global oInit,_that,emptyInit*/var i=0,iLen,j,jLen,k,kLen;var sId=this.getAttribute('id');var bInitHandedOff=false;var defaults=DataTable.defaults;var $this=$(this);/* Sanity check */if(this.nodeName.toLowerCase()!='table'){_fnLog(null,0,'Non-table node initialisation ('+this.nodeName+')',2);return;}/* Backwards compatibility for the defaults */_fnCompatOpts(defaults);_fnCompatCols(defaults.column);/* Convert the camel-case defaults to Hungarian */_fnCamelToHungarian(defaults,defaults,true);_fnCamelToHungarian(defaults.column,defaults.column,true);/* Setting up the initialisation object */_fnCamelToHungarian(defaults,$.extend(oInit,$this.data()));/* Check to see if we are re-initialising a table */var allSettings=DataTable.settings;for(i=0,iLen=allSettings.length;i<iLen;i++){var s=allSettings[i];/* Base check on table node */if(s.nTable==this||s.nTHead.parentNode==this||s.nTFoot&&s.nTFoot.parentNode==this){var bRetrieve=oInit.bRetrieve!==undefined?oInit.bRetrieve:defaults.bRetrieve;var bDestroy=oInit.bDestroy!==undefined?oInit.bDestroy:defaults.bDestroy;if(emptyInit||bRetrieve){return s.oInstance;}else if(bDestroy){s.oInstance.fnDestroy();break;}else{_fnLog(s,0,'Cannot reinitialise DataTable',3);return;}}/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */if(s.sTableId==this.id){allSettings.splice(i,1);break;}}/* Ensure the table has an ID - required for accessibility */if(sId===null||sId===""){sId="DataTables_Table_"+DataTable.ext._unique++;this.id=sId;}/* Create the settings object for this table and set some of the default parameters */var oSettings=$.extend(true,{},DataTable.models.oSettings,{"sDestroyWidth":$this[0].style.width,"sInstance":sId,"sTableId":sId});oSettings.nTable=this;oSettings.oApi=_that.internal;oSettings.oInit=oInit;allSettings.push(oSettings);// Need to add the instance after the instance after the settings object has been added
// to the settings array, so we can self reference the table instance if more than one
oSettings.oInstance=_that.length===1?_that:$this.dataTable();// Backwards compatibility, before we apply all the defaults
_fnCompatOpts(oInit);if(oInit.oLanguage){_fnLanguageCompat(oInit.oLanguage);}// If the length menu is given, but the init display length is not, use the length menu
if(oInit.aLengthMenu&&!oInit.iDisplayLength){oInit.iDisplayLength=$.isArray(oInit.aLengthMenu[0])?oInit.aLengthMenu[0][0]:oInit.aLengthMenu[0];}// Apply the defaults and init options to make a single init object will all
// options defined from defaults and instance options.
oInit=_fnExtend($.extend(true,{},defaults),oInit);// Map the initialisation options onto the settings object
_fnMap(oSettings.oFeatures,oInit,["bPaginate","bLengthChange","bFilter","bSort","bSortMulti","bInfo","bProcessing","bAutoWidth","bSortClasses","bServerSide","bDeferRender"]);_fnMap(oSettings,oInit,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],// backwards compat
["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"]]);_fnMap(oSettings.oScroll,oInit,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);_fnMap(oSettings.oLanguage,oInit,"fnInfoCallback");/* Callback functions which are array driven */_fnCallbackReg(oSettings,'aoDrawCallback',oInit.fnDrawCallback,'user');_fnCallbackReg(oSettings,'aoServerParams',oInit.fnServerParams,'user');_fnCallbackReg(oSettings,'aoStateSaveParams',oInit.fnStateSaveParams,'user');_fnCallbackReg(oSettings,'aoStateLoadParams',oInit.fnStateLoadParams,'user');_fnCallbackReg(oSettings,'aoStateLoaded',oInit.fnStateLoaded,'user');_fnCallbackReg(oSettings,'aoRowCallback',oInit.fnRowCallback,'user');_fnCallbackReg(oSettings,'aoRowCreatedCallback',oInit.fnCreatedRow,'user');_fnCallbackReg(oSettings,'aoHeaderCallback',oInit.fnHeaderCallback,'user');_fnCallbackReg(oSettings,'aoFooterCallback',oInit.fnFooterCallback,'user');_fnCallbackReg(oSettings,'aoInitComplete',oInit.fnInitComplete,'user');_fnCallbackReg(oSettings,'aoPreDrawCallback',oInit.fnPreDrawCallback,'user');oSettings.rowIdFn=_fnGetObjectDataFn(oInit.rowId);/* Browser support detection */_fnBrowserDetect(oSettings);var oClasses=oSettings.oClasses;$.extend(oClasses,DataTable.ext.classes,oInit.oClasses);$this.addClass(oClasses.sTable);if(oSettings.iInitDisplayStart===undefined){/* Display start point, taking into account the save saving */oSettings.iInitDisplayStart=oInit.iDisplayStart;oSettings._iDisplayStart=oInit.iDisplayStart;}if(oInit.iDeferLoading!==null){oSettings.bDeferLoading=true;var tmp=$.isArray(oInit.iDeferLoading);oSettings._iRecordsDisplay=tmp?oInit.iDeferLoading[0]:oInit.iDeferLoading;oSettings._iRecordsTotal=tmp?oInit.iDeferLoading[1]:oInit.iDeferLoading;}/* Language definitions */var oLanguage=oSettings.oLanguage;$.extend(true,oLanguage,oInit.oLanguage);if(oLanguage.sUrl){/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */$.ajax({dataType:'json',url:oLanguage.sUrl,success:function success(json){_fnLanguageCompat(json);_fnCamelToHungarian(defaults.oLanguage,json);$.extend(true,oLanguage,json);_fnInitialise(oSettings);},error:function error(){// Error occurred loading language file, continue on as best we can
_fnInitialise(oSettings);}});bInitHandedOff=true;}/*
			 * Stripes
			 */if(oInit.asStripeClasses===null){oSettings.asStripeClasses=[oClasses.sStripeOdd,oClasses.sStripeEven];}/* Remove row stripe classes if they are already on the table row */var stripeClasses=oSettings.asStripeClasses;var rowOne=$this.children('tbody').find('tr').eq(0);if($.inArray(true,$.map(stripeClasses,function(el,i){return rowOne.hasClass(el);}))!==-1){$('tbody tr',this).removeClass(stripeClasses.join(' '));oSettings.asDestroyStripes=stripeClasses.slice();}/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */var anThs=[];var aoColumnsInit;var nThead=this.getElementsByTagName('thead');if(nThead.length!==0){_fnDetectHeader(oSettings.aoHeader,nThead[0]);anThs=_fnGetUniqueThs(oSettings);}/* If not given a column array, generate one with nulls */if(oInit.aoColumns===null){aoColumnsInit=[];for(i=0,iLen=anThs.length;i<iLen;i++){aoColumnsInit.push(null);}}else{aoColumnsInit=oInit.aoColumns;}/* Add the columns */for(i=0,iLen=aoColumnsInit.length;i<iLen;i++){_fnAddColumn(oSettings,anThs?anThs[i]:null);}/* Apply the column definitions */_fnApplyColumnDefs(oSettings,oInit.aoColumnDefs,aoColumnsInit,function(iCol,oDef){_fnColumnOptions(oSettings,iCol,oDef);});/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */if(rowOne.length){var a=function a(cell,name){return cell.getAttribute('data-'+name)!==null?name:null;};$(rowOne[0]).children('th, td').each(function(i,cell){var col=oSettings.aoColumns[i];if(col.mData===i){var sort=a(cell,'sort')||a(cell,'order');var filter=a(cell,'filter')||a(cell,'search');if(sort!==null||filter!==null){col.mData={_:i+'.display',sort:sort!==null?i+'.@data-'+sort:undefined,type:sort!==null?i+'.@data-'+sort:undefined,filter:filter!==null?i+'.@data-'+filter:undefined};_fnColumnOptions(oSettings,i);}}});}var features=oSettings.oFeatures;var loadedInit=function loadedInit(){/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */ // If aaSorting is not defined, then we use the first indicator in asSorting
// in case that has been altered, so the default sort reflects that option
if(oInit.aaSorting===undefined){var sorting=oSettings.aaSorting;for(i=0,iLen=sorting.length;i<iLen;i++){sorting[i][1]=oSettings.aoColumns[i].asSorting[0];}}/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */_fnSortingClasses(oSettings);if(features.bSort){_fnCallbackReg(oSettings,'aoDrawCallback',function(){if(oSettings.bSorted){var aSort=_fnSortFlatten(oSettings);var sortedColumns={};$.each(aSort,function(i,val){sortedColumns[val.src]=val.dir;});_fnCallbackFire(oSettings,null,'order',[oSettings,aSort,sortedColumns]);_fnSortAria(oSettings);}});}_fnCallbackReg(oSettings,'aoDrawCallback',function(){if(oSettings.bSorted||_fnDataSource(oSettings)==='ssp'||features.bDeferRender){_fnSortingClasses(oSettings);}},'sc');/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */ // Work around for Webkit bug 83867 - store the caption-side before removing from doc
var captions=$this.children('caption').each(function(){this._captionSide=$(this).css('caption-side');});var thead=$this.children('thead');if(thead.length===0){thead=$('<thead/>').appendTo($this);}oSettings.nTHead=thead[0];var tbody=$this.children('tbody');if(tbody.length===0){tbody=$('<tbody/>').appendTo($this);}oSettings.nTBody=tbody[0];var tfoot=$this.children('tfoot');if(tfoot.length===0&&captions.length>0&&(oSettings.oScroll.sX!==""||oSettings.oScroll.sY!=="")){// If we are a scrolling table, and no footer has been given, then we need to create
// a tfoot element for the caption element to be appended to
tfoot=$('<tfoot/>').appendTo($this);}if(tfoot.length===0||tfoot.children().length===0){$this.addClass(oClasses.sNoFooter);}else if(tfoot.length>0){oSettings.nTFoot=tfoot[0];_fnDetectHeader(oSettings.aoFooter,oSettings.nTFoot);}/* Check if there is data passing into the constructor */if(oInit.aaData){for(i=0;i<oInit.aaData.length;i++){_fnAddData(oSettings,oInit.aaData[i]);}}else if(oSettings.bDeferLoading||_fnDataSource(oSettings)=='dom'){/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */_fnAddTr(oSettings,$(oSettings.nTBody).children('tr'));}/* Copy the data index array */oSettings.aiDisplay=oSettings.aiDisplayMaster.slice();/* Initialisation complete - table can be drawn */oSettings.bInitialised=true;/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */if(bInitHandedOff===false){_fnInitialise(oSettings);}};/* Must be done after everything which can be overridden by the state saving! */if(oInit.bStateSave){features.bStateSave=true;_fnCallbackReg(oSettings,'aoDrawCallback',_fnSaveState,'state_save');_fnLoadState(oSettings,oInit,loadedInit);}else{loadedInit();}});_that=null;return this;};/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */ // Defined else where
//  _selector_run
//  _selector_opts
//  _selector_first
//  _selector_row_indexes
var _ext;// DataTable.ext
var _Api2;// DataTable.Api
var _api_register;// DataTable.Api.register
var _api_registerPlural;// DataTable.Api.registerPlural
var _re_dic={};var _re_new_lines=/[\r\n]/g;var _re_html=/<.*?>/g;// This is not strict ISO8601 - Date.parse() is quite lax, although
// implementations differ between browsers.
var _re_date=/^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;// Escape regular expression special characters
var _re_escape_regex=new RegExp('(\\'+['/','.','*','+','?','|','(',')','[',']','{','}','\\','$','^','-'].join('|\\')+')','g');// http://en.wikipedia.org/wiki/Foreign_exchange_market
// - \u20BD - Russian ruble.
// - \u20a9 - South Korean Won
// - \u20BA - Turkish Lira
// - \u20B9 - Indian Rupee
// - R - Brazil (R$) and South Africa
// - fr - Swiss Franc
// - kr - Swedish krona, Norwegian krone and Danish krone
// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
//   standards as thousands separators.
var _re_formatted_numeric=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi;var _empty=function _empty(d){return!d||d===true||d==='-'?true:false;};var _intVal=function _intVal(s){var integer=parseInt(s,10);return!isNaN(integer)&&isFinite(s)?integer:null;};// Convert from a formatted number with characters other than `.` as the
// decimal place, to a Javascript number
var _numToDecimal=function _numToDecimal(num,decimalPoint){// Cache created regular expressions for speed as this function is called often
if(!_re_dic[decimalPoint]){_re_dic[decimalPoint]=new RegExp(_fnEscapeRegex(decimalPoint),'g');}return typeof num==='string'&&decimalPoint!=='.'?num.replace(/\./g,'').replace(_re_dic[decimalPoint],'.'):num;};var _isNumber=function _isNumber(d,decimalPoint,formatted){var strType=typeof d==='string';// If empty return immediately so there must be a number if it is a
// formatted string (this stops the string "k", or "kr", etc being detected
// as a formatted number for currency
if(_empty(d)){return true;}if(decimalPoint&&strType){d=_numToDecimal(d,decimalPoint);}if(formatted&&strType){d=d.replace(_re_formatted_numeric,'');}return!isNaN(parseFloat(d))&&isFinite(d);};// A string without HTML in it can be considered to be HTML still
var _isHtml=function _isHtml(d){return _empty(d)||typeof d==='string';};var _htmlNumeric=function _htmlNumeric(d,decimalPoint,formatted){if(_empty(d)){return true;}var html=_isHtml(d);return!html?null:_isNumber(_stripHtml(d),decimalPoint,formatted)?true:null;};var _pluck=function _pluck(a,prop,prop2){var out=[];var i=0,ien=a.length;// Could have the test in the loop for slightly smaller code, but speed
// is essential here
if(prop2!==undefined){for(;i<ien;i++){if(a[i]&&a[i][prop]){out.push(a[i][prop][prop2]);}}}else{for(;i<ien;i++){if(a[i]){out.push(a[i][prop]);}}}return out;};// Basically the same as _pluck, but rather than looping over `a` we use `order`
// as the indexes to pick from `a`
var _pluck_order=function _pluck_order(a,order,prop,prop2){var out=[];var i=0,ien=order.length;// Could have the test in the loop for slightly smaller code, but speed
// is essential here
if(prop2!==undefined){for(;i<ien;i++){if(a[order[i]][prop]){out.push(a[order[i]][prop][prop2]);}}}else{for(;i<ien;i++){out.push(a[order[i]][prop]);}}return out;};var _range=function _range(len,start){var out=[];var end;if(start===undefined){start=0;end=len;}else{end=start;start=len;}for(var i=start;i<end;i++){out.push(i);}return out;};var _removeEmpty=function _removeEmpty(a){var out=[];for(var i=0,ien=a.length;i<ien;i++){if(a[i]){// careful - will remove all falsy values!
out.push(a[i]);}}return out;};var _stripHtml=function _stripHtml(d){return d.replace(_re_html,'');};/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */var _areAllUnique=function _areAllUnique(src){if(src.length<2){return true;}var sorted=src.slice().sort();var last=sorted[0];for(var i=1,ien=sorted.length;i<ien;i++){if(sorted[i]===last){return false;}last=sorted[i];}return true;};/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */var _unique=function _unique(src){if(_areAllUnique(src)){return src.slice();}// A faster unique method is to use object keys to identify used values,
// but this doesn't work with arrays or objects, which we must also
// consider. See jsperf.com/compare-array-unique-versions/4 for more
// information.
var out=[],val,i,ien=src.length,j,k=0;again:for(i=0;i<ien;i++){val=src[i];for(j=0;j<k;j++){if(out[j]===val){continue again;}}out.push(val);k++;}return out;};/**
	 * DataTables utility methods
	 * 
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */DataTable.util={/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */throttle:function throttle(fn,freq){var frequency=freq!==undefined?freq:200,last,timer;return function(){var that=this,now=+new Date(),args=arguments;if(last&&now<last+frequency){clearTimeout(timer);timer=setTimeout(function(){last=undefined;fn.apply(that,args);},frequency);}else{last=now;fn.apply(that,args);}};},/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */escapeRegex:function escapeRegex(val){return val.replace(_re_escape_regex,'\\$1');}};/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */function _fnHungarianMap(o){var hungarian='a aa ai ao as b fn i m o s ',match,newKey,map={};$.each(o,function(key,val){match=key.match(/^([^A-Z]+?)([A-Z])/);if(match&&hungarian.indexOf(match[1]+' ')!==-1){newKey=key.replace(match[0],match[2].toLowerCase());map[newKey]=key;if(match[1]==='o'){_fnHungarianMap(o[key]);}}});o._hungarianMap=map;}/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */function _fnCamelToHungarian(src,user,force){if(!src._hungarianMap){_fnHungarianMap(src);}var hungarianKey;$.each(user,function(key,val){hungarianKey=src._hungarianMap[key];if(hungarianKey!==undefined&&(force||user[hungarianKey]===undefined)){// For objects, we need to buzz down into the object to copy parameters
if(hungarianKey.charAt(0)==='o'){// Copy the camelCase options over to the hungarian
if(!user[hungarianKey]){user[hungarianKey]={};}$.extend(true,user[hungarianKey],user[key]);_fnCamelToHungarian(src[hungarianKey],user[hungarianKey],force);}else{user[hungarianKey]=user[key];}}});}/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnLanguageCompat(lang){var defaults=DataTable.defaults.oLanguage;var zeroRecords=lang.sZeroRecords;/* Backwards compatibility - if there is no sEmptyTable given, then use the same as
		 * sZeroRecords - assuming that is given.
		 */if(!lang.sEmptyTable&&zeroRecords&&defaults.sEmptyTable==="No data available in table"){_fnMap(lang,lang,'sZeroRecords','sEmptyTable');}/* Likewise with loading records */if(!lang.sLoadingRecords&&zeroRecords&&defaults.sLoadingRecords==="Loading..."){_fnMap(lang,lang,'sZeroRecords','sLoadingRecords');}// Old parameter name of the thousands separator mapped onto the new
if(lang.sInfoThousands){lang.sThousands=lang.sInfoThousands;}var decimal=lang.sDecimal;if(decimal){_addNumericSort(decimal);}}/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */var _fnCompatMap=function _fnCompatMap(o,knew,old){if(o[knew]!==undefined){o[old]=o[knew];}};/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */function _fnCompatOpts(init){_fnCompatMap(init,'ordering','bSort');_fnCompatMap(init,'orderMulti','bSortMulti');_fnCompatMap(init,'orderClasses','bSortClasses');_fnCompatMap(init,'orderCellsTop','bSortCellsTop');_fnCompatMap(init,'order','aaSorting');_fnCompatMap(init,'orderFixed','aaSortingFixed');_fnCompatMap(init,'paging','bPaginate');_fnCompatMap(init,'pagingType','sPaginationType');_fnCompatMap(init,'pageLength','iDisplayLength');_fnCompatMap(init,'searching','bFilter');// Boolean initialisation of x-scrolling
if(typeof init.sScrollX==='boolean'){init.sScrollX=init.sScrollX?'100%':'';}if(typeof init.scrollX==='boolean'){init.scrollX=init.scrollX?'100%':'';}// Column search objects are in an array, so it needs to be converted
// element by element
var searchCols=init.aoSearchCols;if(searchCols){for(var i=0,ien=searchCols.length;i<ien;i++){if(searchCols[i]){_fnCamelToHungarian(DataTable.models.oSearch,searchCols[i]);}}}}/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */function _fnCompatCols(init){_fnCompatMap(init,'orderable','bSortable');_fnCompatMap(init,'orderData','aDataSort');_fnCompatMap(init,'orderSequence','asSorting');_fnCompatMap(init,'orderDataType','sortDataType');// orderData can be given as an integer
var dataSort=init.aDataSort;if(typeof dataSort==='number'&&!$.isArray(dataSort)){init.aDataSort=[dataSort];}}/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnBrowserDetect(settings){// We don't need to do this every time DataTables is constructed, the values
// calculated are specific to the browser and OS configuration which we
// don't expect to change between initialisations
if(!DataTable.__browser){var browser={};DataTable.__browser=browser;// Scrolling feature / quirks detection
var n=$('<div/>').css({position:'fixed',top:0,left:$(window).scrollLeft()*-1,// allow for scrolling
height:1,width:1,overflow:'hidden'}).append($('<div/>').css({position:'absolute',top:1,left:1,width:100,overflow:'scroll'}).append($('<div/>').css({width:'100%',height:10}))).appendTo('body');var outer=n.children();var inner=outer.children();// Numbers below, in order, are:
// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
//
// IE6 XP:                           100 100 100  83
// IE7 Vista:                        100 100 100  83
// IE 8+ Windows:                     83  83 100  83
// Evergreen Windows:                 83  83 100  83
// Evergreen Mac with scrollbars:     85  85 100  85
// Evergreen Mac without scrollbars: 100 100 100 100
// Get scrollbar width
browser.barWidth=outer[0].offsetWidth-outer[0].clientWidth;// IE6/7 will oversize a width 100% element inside a scrolling element, to
// include the width of the scrollbar, while other browsers ensure the inner
// element is contained without forcing scrolling
browser.bScrollOversize=inner[0].offsetWidth===100&&outer[0].clientWidth!==100;// In rtl text layout, some browsers (most, but not all) will place the
// scrollbar on the left, rather than the right.
browser.bScrollbarLeft=Math.round(inner.offset().left)!==1;// IE8- don't provide height and width for getBoundingClientRect
browser.bBounding=n[0].getBoundingClientRect().width?true:false;n.remove();}$.extend(settings.oBrowser,DataTable.__browser);settings.oScroll.iBarWidth=DataTable.__browser.barWidth;}/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnReduce(that,fn,init,start,end,inc){var i=start,value,isSet=false;if(init!==undefined){value=init;isSet=true;}while(i!==end){if(!that.hasOwnProperty(i)){continue;}value=isSet?fn(value,that[i],i,that):that[i];isSet=true;i+=inc;}return value;}/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */function _fnAddColumn(oSettings,nTh){// Add column to aoColumns array
var oDefaults=DataTable.defaults.column;var iCol=oSettings.aoColumns.length;var oCol=$.extend({},DataTable.models.oColumn,oDefaults,{"nTh":nTh?nTh:document.createElement('th'),"sTitle":oDefaults.sTitle?oDefaults.sTitle:nTh?nTh.innerHTML:'',"aDataSort":oDefaults.aDataSort?oDefaults.aDataSort:[iCol],"mData":oDefaults.mData?oDefaults.mData:iCol,idx:iCol});oSettings.aoColumns.push(oCol);// Add search object for column specific search. Note that the `searchCols[ iCol ]`
// passed into extend can be undefined. This allows the user to give a default
// with only some of the parameters defined, and also not give a default
var searchCols=oSettings.aoPreSearchCols;searchCols[iCol]=$.extend({},DataTable.models.oSearch,searchCols[iCol]);// Use the default column options function to initialise classes etc
_fnColumnOptions(oSettings,iCol,$(nTh).data());}/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */function _fnColumnOptions(oSettings,iCol,oOptions){var oCol=oSettings.aoColumns[iCol];var oClasses=oSettings.oClasses;var th=$(oCol.nTh);// Try to get width information from the DOM. We can't get it from CSS
// as we'd need to parse the CSS stylesheet. `width` option can override
if(!oCol.sWidthOrig){// Width attribute
oCol.sWidthOrig=th.attr('width')||null;// Style attribute
var t=(th.attr('style')||'').match(/width:\s*(\d+[pxem%]+)/);if(t){oCol.sWidthOrig=t[1];}}/* User specified column options */if(oOptions!==undefined&&oOptions!==null){// Backwards compatibility
_fnCompatCols(oOptions);// Map camel case parameters to their Hungarian counterparts
_fnCamelToHungarian(DataTable.defaults.column,oOptions);/* Backwards compatibility for mDataProp */if(oOptions.mDataProp!==undefined&&!oOptions.mData){oOptions.mData=oOptions.mDataProp;}if(oOptions.sType){oCol._sManualType=oOptions.sType;}// `class` is a reserved word in Javascript, so we need to provide
// the ability to use a valid name for the camel case input
if(oOptions.className&&!oOptions.sClass){oOptions.sClass=oOptions.className;}if(oOptions.sClass){th.addClass(oOptions.sClass);}$.extend(oCol,oOptions);_fnMap(oCol,oOptions,"sWidth","sWidthOrig");/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */if(oOptions.iDataSort!==undefined){oCol.aDataSort=[oOptions.iDataSort];}_fnMap(oCol,oOptions,"aDataSort");}/* Cache the data get and set functions for speed */var mDataSrc=oCol.mData;var mData=_fnGetObjectDataFn(mDataSrc);var mRender=oCol.mRender?_fnGetObjectDataFn(oCol.mRender):null;var attrTest=function attrTest(src){return typeof src==='string'&&src.indexOf('@')!==-1;};oCol._bAttrSrc=$.isPlainObject(mDataSrc)&&(attrTest(mDataSrc.sort)||attrTest(mDataSrc.type)||attrTest(mDataSrc.filter));oCol._setter=null;oCol.fnGetData=function(rowData,type,meta){var innerData=mData(rowData,type,undefined,meta);return mRender&&type?mRender(innerData,type,rowData,meta):innerData;};oCol.fnSetData=function(rowData,val,meta){return _fnSetObjectDataFn(mDataSrc)(rowData,val,meta);};// Indicate if DataTables should read DOM data as an object or array
// Used in _fnGetRowElements
if(typeof mDataSrc!=='number'){oSettings._rowReadObject=true;}/* Feature sorting overrides column specific when off */if(!oSettings.oFeatures.bSort){oCol.bSortable=false;th.addClass(oClasses.sSortableNone);// Have to add class here as order event isn't called
}/* Check that the class assignment is correct for sorting */var bAsc=$.inArray('asc',oCol.asSorting)!==-1;var bDesc=$.inArray('desc',oCol.asSorting)!==-1;if(!oCol.bSortable||!bAsc&&!bDesc){oCol.sSortingClass=oClasses.sSortableNone;oCol.sSortingClassJUI="";}else if(bAsc&&!bDesc){oCol.sSortingClass=oClasses.sSortableAsc;oCol.sSortingClassJUI=oClasses.sSortJUIAscAllowed;}else if(!bAsc&&bDesc){oCol.sSortingClass=oClasses.sSortableDesc;oCol.sSortingClassJUI=oClasses.sSortJUIDescAllowed;}else{oCol.sSortingClass=oClasses.sSortable;oCol.sSortingClassJUI=oClasses.sSortJUI;}}/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnAdjustColumnSizing(settings){/* Not interested in doing column width calculation if auto-width is disabled */if(settings.oFeatures.bAutoWidth!==false){var columns=settings.aoColumns;_fnCalculateColumnWidths(settings);for(var i=0,iLen=columns.length;i<iLen;i++){columns[i].nTh.style.width=columns[i].sWidth;}}var scroll=settings.oScroll;if(scroll.sY!==''||scroll.sX!==''){_fnScrollDraw(settings);}_fnCallbackFire(settings,null,'column-sizing',[settings]);}/**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */function _fnVisibleToColumnIndex(oSettings,iMatch){var aiVis=_fnGetColumns(oSettings,'bVisible');return typeof aiVis[iMatch]==='number'?aiVis[iMatch]:null;}/**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */function _fnColumnIndexToVisible(oSettings,iMatch){var aiVis=_fnGetColumns(oSettings,'bVisible');var iPos=$.inArray(iMatch,aiVis);return iPos!==-1?iPos:null;}/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */function _fnVisbleColumns(oSettings){var vis=0;// No reduce in IE8, use a loop for now
$.each(oSettings.aoColumns,function(i,col){if(col.bVisible&&$(col.nTh).css('display')!=='none'){vis++;}});return vis;}/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */function _fnGetColumns(oSettings,sParam){var a=[];$.map(oSettings.aoColumns,function(val,i){if(val[sParam]){a.push(i);}});return a;}/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnColumnTypes(settings){var columns=settings.aoColumns;var data=settings.aoData;var types=DataTable.ext.type.detect;var i,ien,j,jen,k,ken;var col,cell,detectedType,cache;// For each column, spin over the 
for(i=0,ien=columns.length;i<ien;i++){col=columns[i];cache=[];if(!col.sType&&col._sManualType){col.sType=col._sManualType;}else if(!col.sType){for(j=0,jen=types.length;j<jen;j++){for(k=0,ken=data.length;k<ken;k++){// Use a cache array so we only need to get the type data
// from the formatter once (when using multiple detectors)
if(cache[k]===undefined){cache[k]=_fnGetCellData(settings,k,i,'type');}detectedType=types[j](cache[k],settings);// If null, then this type can't apply to this column, so
// rather than testing all cells, break out. There is an
// exception for the last type which is `html`. We need to
// scan all rows since it is possible to mix string and HTML
// types
if(!detectedType&&j!==types.length-1){break;}// Only a single match is needed for html type since it is
// bottom of the pile and very similar to string
if(detectedType==='html'){break;}}// Type is valid for all data points in the column - use this
// type
if(detectedType){col.sType=detectedType;break;}}// Fall back - if no type was detected, always use string
if(!col.sType){col.sType='string';}}}}/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */function _fnApplyColumnDefs(oSettings,aoColDefs,aoCols,fn){var i,iLen,j,jLen,k,kLen,def;var columns=oSettings.aoColumns;// Column definitions with aTargets
if(aoColDefs){/* Loop over the definitions array - loop in reverse so first instance has priority */for(i=aoColDefs.length-1;i>=0;i--){def=aoColDefs[i];/* Each definition can target multiple columns, as it is an array */var aTargets=def.targets!==undefined?def.targets:def.aTargets;if(!$.isArray(aTargets)){aTargets=[aTargets];}for(j=0,jLen=aTargets.length;j<jLen;j++){if(typeof aTargets[j]==='number'&&aTargets[j]>=0){/* Add columns that we don't yet know about */while(columns.length<=aTargets[j]){_fnAddColumn(oSettings);}/* Integer, basic index */fn(aTargets[j],def);}else if(typeof aTargets[j]==='number'&&aTargets[j]<0){/* Negative integer, right to left column counting */fn(columns.length+aTargets[j],def);}else if(typeof aTargets[j]==='string'){/* Class name matching on TH element */for(k=0,kLen=columns.length;k<kLen;k++){if(aTargets[j]=="_all"||$(columns[k].nTh).hasClass(aTargets[j])){fn(k,def);}}}}}}// Statically defined columns array
if(aoCols){for(i=0,iLen=aoCols.length;i<iLen;i++){fn(i,aoCols[i]);}}}/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */function _fnAddData(oSettings,aDataIn,nTr,anTds){/* Create the object for storing information about this new row */var iRow=oSettings.aoData.length;var oData=$.extend(true,{},DataTable.models.oRow,{src:nTr?'dom':'data',idx:iRow});oData._aData=aDataIn;oSettings.aoData.push(oData);/* Create the cells */var nTd,sThisType;var columns=oSettings.aoColumns;// Invalidate the column types as the new data needs to be revalidated
for(var i=0,iLen=columns.length;i<iLen;i++){columns[i].sType=null;}/* Add to the display array */oSettings.aiDisplayMaster.push(iRow);var id=oSettings.rowIdFn(aDataIn);if(id!==undefined){oSettings.aIds[id]=oData;}/* Create the DOM information, or register it if already present */if(nTr||!oSettings.oFeatures.bDeferRender){_fnCreateTr(oSettings,iRow,nTr,anTds);}return iRow;}/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */function _fnAddTr(settings,trs){var row;// Allow an individual node to be passed in
if(!(trs instanceof $)){trs=$(trs);}return trs.map(function(i,el){row=_fnGetRowElements(settings,el);return _fnAddData(settings,row.data,el,row.cells);});}/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */function _fnNodeToDataIndex(oSettings,n){return n._DT_RowIndex!==undefined?n._DT_RowIndex:null;}/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */function _fnNodeToColumnIndex(oSettings,iRow,n){return $.inArray(n,oSettings.aoData[iRow].anCells);}/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */function _fnGetCellData(settings,rowIdx,colIdx,type){var draw=settings.iDraw;var col=settings.aoColumns[colIdx];var rowData=settings.aoData[rowIdx]._aData;var defaultContent=col.sDefaultContent;var cellData=col.fnGetData(rowData,type,{settings:settings,row:rowIdx,col:colIdx});if(cellData===undefined){if(settings.iDrawError!=draw&&defaultContent===null){_fnLog(settings,0,"Requested unknown parameter "+(typeof col.mData=='function'?'{function}':"'"+col.mData+"'")+" for row "+rowIdx+", column "+colIdx,4);settings.iDrawError=draw;}return defaultContent;}// When the data source is null and a specific data type is requested (i.e.
// not the original data), we can use default column data
if((cellData===rowData||cellData===null)&&defaultContent!==null&&type!==undefined){cellData=defaultContent;}else if(typeof cellData==='function'){// If the data source is a function, then we run it and use the return,
// executing in the scope of the data object (for instances)
return cellData.call(rowData);}if(cellData===null&&type=='display'){return'';}return cellData;}/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */function _fnSetCellData(settings,rowIdx,colIdx,val){var col=settings.aoColumns[colIdx];var rowData=settings.aoData[rowIdx]._aData;col.fnSetData(rowData,val,{settings:settings,row:rowIdx,col:colIdx});}// Private variable that is used to match action syntax in the data property object
var __reArray=/\[.*?\]$/;var __reFn=/\(\)$/;/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */function _fnSplitObjNotation(str){return $.map(str.match(/(\\.|[^\.])+/g)||[''],function(s){return s.replace(/\\\./g,'.');});}/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */function _fnGetObjectDataFn(mSource){if($.isPlainObject(mSource)){/* Build an object of get functions, and wrap them in a single call */var o={};$.each(mSource,function(key,val){if(val){o[key]=_fnGetObjectDataFn(val);}});return function(data,type,row,meta){var t=o[type]||o._;return t!==undefined?t(data,type,row,meta):data;};}else if(mSource===null){/* Give an empty string for rendering / sorting etc */return function(data){// type, row and meta also passed, but not used
return data;};}else if(typeof mSource==='function'){return function(data,type,row,meta){return mSource(data,type,row,meta);};}else if(typeof mSource==='string'&&(mSource.indexOf('.')!==-1||mSource.indexOf('[')!==-1||mSource.indexOf('(')!==-1)){/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */var fetchData=function fetchData(data,type,src){var arrayNotation,funcNotation,out,innerSrc;if(src!==""){var a=_fnSplitObjNotation(src);for(var i=0,iLen=a.length;i<iLen;i++){// Check if we are dealing with special notation
arrayNotation=a[i].match(__reArray);funcNotation=a[i].match(__reFn);if(arrayNotation){// Array notation
a[i]=a[i].replace(__reArray,'');// Condition allows simply [] to be passed in
if(a[i]!==""){data=data[a[i]];}out=[];// Get the remainder of the nested object to get
a.splice(0,i+1);innerSrc=a.join('.');// Traverse each entry in the array getting the properties requested
if($.isArray(data)){for(var j=0,jLen=data.length;j<jLen;j++){out.push(fetchData(data[j],type,innerSrc));}}// If a string is given in between the array notation indicators, that
// is used to join the strings together, otherwise an array is returned
var join=arrayNotation[0].substring(1,arrayNotation[0].length-1);data=join===""?out:out.join(join);// The inner call to fetchData has already traversed through the remainder
// of the source requested, so we exit from the loop
break;}else if(funcNotation){// Function call
a[i]=a[i].replace(__reFn,'');data=data[a[i]]();continue;}if(data===null||data[a[i]]===undefined){return undefined;}data=data[a[i]];}}return data;};return function(data,type){// row and meta also passed, but not used
return fetchData(data,type,mSource);};}else{/* Array or flat object mapping */return function(data,type){// row and meta also passed, but not used
return data[mSource];};}}/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */function _fnSetObjectDataFn(mSource){if($.isPlainObject(mSource)){/* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */return _fnSetObjectDataFn(mSource._);}else if(mSource===null){/* Nothing to do when the data source is null */return function(){};}else if(typeof mSource==='function'){return function(data,val,meta){mSource(data,'set',val,meta);};}else if(typeof mSource==='string'&&(mSource.indexOf('.')!==-1||mSource.indexOf('[')!==-1||mSource.indexOf('(')!==-1)){/* Like the get, we need to get data from a nested object */var setData=function setData(data,val,src){var a=_fnSplitObjNotation(src),b;var aLast=a[a.length-1];var arrayNotation,funcNotation,o,innerSrc;for(var i=0,iLen=a.length-1;i<iLen;i++){// Check if we are dealing with an array notation request
arrayNotation=a[i].match(__reArray);funcNotation=a[i].match(__reFn);if(arrayNotation){a[i]=a[i].replace(__reArray,'');data[a[i]]=[];// Get the remainder of the nested object to set so we can recurse
b=a.slice();b.splice(0,i+1);innerSrc=b.join('.');// Traverse each entry in the array setting the properties requested
if($.isArray(val)){for(var j=0,jLen=val.length;j<jLen;j++){o={};setData(o,val[j],innerSrc);data[a[i]].push(o);}}else{// We've been asked to save data to an array, but it
// isn't array data to be saved. Best that can be done
// is to just save the value.
data[a[i]]=val;}// The inner call to setData has already traversed through the remainder
// of the source and has set the data, thus we can exit here
return;}else if(funcNotation){// Function call
a[i]=a[i].replace(__reFn,'');data=data[a[i]](val);}// If the nested object doesn't currently exist - since we are
// trying to set the value - create it
if(data[a[i]]===null||data[a[i]]===undefined){data[a[i]]={};}data=data[a[i]];}// Last item in the input - i.e, the actual set
if(aLast.match(__reFn)){// Function call
data=data[aLast.replace(__reFn,'')](val);}else{// If array notation is used, we just want to strip it and use the property name
// and assign the value. If it isn't used, then we get the result we want anyway
data[aLast.replace(__reArray,'')]=val;}};return function(data,val){// meta is also passed in, but not used
return setData(data,val,mSource);};}else{/* Array or flat object mapping */return function(data,val){// meta is also passed in, but not used
data[mSource]=val;};}}/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */function _fnGetDataMaster(settings){return _pluck(settings.aoData,'_aData');}/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnClearTable(settings){settings.aoData.length=0;settings.aiDisplayMaster.length=0;settings.aiDisplay.length=0;settings.aIds={};}/**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */function _fnDeleteIndex(a,iTarget,splice){var iTargetIndex=-1;for(var i=0,iLen=a.length;i<iLen;i++){if(a[i]==iTarget){iTargetIndex=i;}else if(a[i]>iTarget){a[i]--;}}if(iTargetIndex!=-1&&splice===undefined){a.splice(iTargetIndex,1);}}/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */function _fnInvalidate(settings,rowIdx,src,colIdx){var row=settings.aoData[rowIdx];var i,ien;var cellWrite=function cellWrite(cell,col){// This is very frustrating, but in IE if you just write directly
// to innerHTML, and elements that are overwritten are GC'ed,
// even if there is a reference to them elsewhere
while(cell.childNodes.length){cell.removeChild(cell.firstChild);}cell.innerHTML=_fnGetCellData(settings,rowIdx,col,'display');};// Are we reading last data from DOM or the data object?
if(src==='dom'||(!src||src==='auto')&&row.src==='dom'){// Read the data from the DOM
row._aData=_fnGetRowElements(settings,row,colIdx,colIdx===undefined?undefined:row._aData).data;}else{// Reading from data object, update the DOM
var cells=row.anCells;if(cells){if(colIdx!==undefined){cellWrite(cells[colIdx],colIdx);}else{for(i=0,ien=cells.length;i<ien;i++){cellWrite(cells[i],i);}}}}// For both row and cell invalidation, the cached data for sorting and
// filtering is nulled out
row._aSortData=null;row._aFilterData=null;// Invalidate the type for a specific column (if given) or all columns since
// the data might have changed
var cols=settings.aoColumns;if(colIdx!==undefined){cols[colIdx].sType=null;}else{for(i=0,ien=cols.length;i<ien;i++){cols[i].sType=null;}// Update DataTables special `DT_*` attributes for the row
_fnRowAttributes(settings,row);}}/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */function _fnGetRowElements(settings,row,colIdx,d){var tds=[],td=row.firstChild,name,col,o,i=0,contents,columns=settings.aoColumns,objectRead=settings._rowReadObject;// Allow the data object to be passed in, or construct
d=d!==undefined?d:objectRead?{}:[];var attr=function attr(str,td){if(typeof str==='string'){var idx=str.indexOf('@');if(idx!==-1){var attr=str.substring(idx+1);var setter=_fnSetObjectDataFn(str);setter(d,td.getAttribute(attr));}}};// Read data from a cell and store into the data object
var cellProcess=function cellProcess(cell){if(colIdx===undefined||colIdx===i){col=columns[i];contents=$.trim(cell.innerHTML);if(col&&col._bAttrSrc){var setter=_fnSetObjectDataFn(col.mData._);setter(d,contents);attr(col.mData.sort,cell);attr(col.mData.type,cell);attr(col.mData.filter,cell);}else{// Depending on the `data` option for the columns the data can
// be read to either an object or an array.
if(objectRead){if(!col._setter){// Cache the setter function
col._setter=_fnSetObjectDataFn(col.mData);}col._setter(d,contents);}else{d[i]=contents;}}}i++;};if(td){// `tr` element was passed in
while(td){name=td.nodeName.toUpperCase();if(name=="TD"||name=="TH"){cellProcess(td);tds.push(td);}td=td.nextSibling;}}else{// Existing row object passed in
tds=row.anCells;for(var j=0,jen=tds.length;j<jen;j++){cellProcess(tds[j]);}}// Read the ID from the DOM if present
var rowNode=row.firstChild?row:row.nTr;if(rowNode){var id=rowNode.getAttribute('id');if(id){_fnSetObjectDataFn(settings.rowId)(d,id);}}return{data:d,cells:tds};}/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */function _fnCreateTr(oSettings,iRow,nTrIn,anTds){var row=oSettings.aoData[iRow],rowData=row._aData,cells=[],nTr,nTd,oCol,i,iLen;if(row.nTr===null){nTr=nTrIn||document.createElement('tr');row.nTr=nTr;row.anCells=cells;/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */nTr._DT_RowIndex=iRow;/* Special parameters can be given by the data source to be used on the row */_fnRowAttributes(oSettings,row);/* Process each column */for(i=0,iLen=oSettings.aoColumns.length;i<iLen;i++){oCol=oSettings.aoColumns[i];nTd=nTrIn?anTds[i]:document.createElement(oCol.sCellType);nTd._DT_CellIndex={row:iRow,column:i};cells.push(nTd);// Need to create the HTML if new, or if a rendering function is defined
if((!nTrIn||oCol.mRender||oCol.mData!==i)&&(!$.isPlainObject(oCol.mData)||oCol.mData._!==i+'.display')){nTd.innerHTML=_fnGetCellData(oSettings,iRow,i,'display');}/* Add user defined class */if(oCol.sClass){nTd.className+=' '+oCol.sClass;}// Visibility - add or remove as required
if(oCol.bVisible&&!nTrIn){nTr.appendChild(nTd);}else if(!oCol.bVisible&&nTrIn){nTd.parentNode.removeChild(nTd);}if(oCol.fnCreatedCell){oCol.fnCreatedCell.call(oSettings.oInstance,nTd,_fnGetCellData(oSettings,iRow,i),rowData,iRow,i);}}_fnCallbackFire(oSettings,'aoRowCreatedCallback',null,[nTr,rowData,iRow]);}// Remove once webkit bug 131819 and Chromium bug 365619 have been resolved
// and deployed
row.nTr.setAttribute('role','row');}/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */function _fnRowAttributes(settings,row){var tr=row.nTr;var data=row._aData;if(tr){var id=settings.rowIdFn(data);if(id){tr.id=id;}if(data.DT_RowClass){// Remove any classes added by DT_RowClass before
var a=data.DT_RowClass.split(' ');row.__rowc=row.__rowc?_unique(row.__rowc.concat(a)):a;$(tr).removeClass(row.__rowc.join(' ')).addClass(data.DT_RowClass);}if(data.DT_RowAttr){$(tr).attr(data.DT_RowAttr);}if(data.DT_RowData){$(tr).data(data.DT_RowData);}}}/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnBuildHead(oSettings){var i,ien,cell,row,column;var thead=oSettings.nTHead;var tfoot=oSettings.nTFoot;var createHeader=$('th, td',thead).length===0;var classes=oSettings.oClasses;var columns=oSettings.aoColumns;if(createHeader){row=$('<tr/>').appendTo(thead);}for(i=0,ien=columns.length;i<ien;i++){column=columns[i];cell=$(column.nTh).addClass(column.sClass);if(createHeader){cell.appendTo(row);}// 1.11 move into sorting
if(oSettings.oFeatures.bSort){cell.addClass(column.sSortingClass);if(column.bSortable!==false){cell.attr('tabindex',oSettings.iTabIndex).attr('aria-controls',oSettings.sTableId);_fnSortAttachListener(oSettings,column.nTh,i);}}if(column.sTitle!=cell[0].innerHTML){cell.html(column.sTitle);}_fnRenderer(oSettings,'header')(oSettings,cell,column,classes);}if(createHeader){_fnDetectHeader(oSettings.aoHeader,thead);}/* ARIA role for the rows */$(thead).find('>tr').attr('role','row');/* Deal with the footer - add classes if required */$(thead).find('>tr>th, >tr>td').addClass(classes.sHeaderTH);$(tfoot).find('>tr>th, >tr>td').addClass(classes.sFooterTH);// Cache the footer cells. Note that we only take the cells from the first
// row in the footer. If there is more than one row the user wants to
// interact with, they need to use the table().foot() method. Note also this
// allows cells to be used for multiple columns using colspan
if(tfoot!==null){var cells=oSettings.aoFooter[0];for(i=0,ien=cells.length;i<ien;i++){column=columns[i];column.nTf=cells[i].cell;if(column.sClass){$(column.nTf).addClass(column.sClass);}}}}/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */function _fnDrawHead(oSettings,aoSource,bIncludeHidden){var i,iLen,j,jLen,k,kLen,n,nLocalTr;var aoLocal=[];var aApplied=[];var iColumns=oSettings.aoColumns.length;var iRowspan,iColspan;if(!aoSource){return;}if(bIncludeHidden===undefined){bIncludeHidden=false;}/* Make a copy of the master layout array, but without the visible columns in it */for(i=0,iLen=aoSource.length;i<iLen;i++){aoLocal[i]=aoSource[i].slice();aoLocal[i].nTr=aoSource[i].nTr;/* Remove any columns which are currently hidden */for(j=iColumns-1;j>=0;j--){if(!oSettings.aoColumns[j].bVisible&&!bIncludeHidden){aoLocal[i].splice(j,1);}}/* Prep the applied array - it needs an element for each row */aApplied.push([]);}for(i=0,iLen=aoLocal.length;i<iLen;i++){nLocalTr=aoLocal[i].nTr;/* All cells are going to be replaced, so empty out the row */if(nLocalTr){while(n=nLocalTr.firstChild){nLocalTr.removeChild(n);}}for(j=0,jLen=aoLocal[i].length;j<jLen;j++){iRowspan=1;iColspan=1;/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */if(aApplied[i][j]===undefined){nLocalTr.appendChild(aoLocal[i][j].cell);aApplied[i][j]=1;/* Expand the cell to cover as many rows as needed */while(aoLocal[i+iRowspan]!==undefined&&aoLocal[i][j].cell==aoLocal[i+iRowspan][j].cell){aApplied[i+iRowspan][j]=1;iRowspan++;}/* Expand the cell to cover as many columns as needed */while(aoLocal[i][j+iColspan]!==undefined&&aoLocal[i][j].cell==aoLocal[i][j+iColspan].cell){/* Must update the applied array over the rows for the columns */for(k=0;k<iRowspan;k++){aApplied[i+k][j+iColspan]=1;}iColspan++;}/* Do the actual expansion in the DOM */$(aoLocal[i][j].cell).attr('rowspan',iRowspan).attr('colspan',iColspan);}}}}/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnDraw(oSettings){/* Provide a pre-callback function which can be used to cancel the draw is false is returned */var aPreDraw=_fnCallbackFire(oSettings,'aoPreDrawCallback','preDraw',[oSettings]);if($.inArray(false,aPreDraw)!==-1){_fnProcessingDisplay(oSettings,false);return;}var i,iLen,n;var anRows=[];var iRowCount=0;var asStripeClasses=oSettings.asStripeClasses;var iStripes=asStripeClasses.length;var iOpenRows=oSettings.aoOpenRows.length;var oLang=oSettings.oLanguage;var iInitDisplayStart=oSettings.iInitDisplayStart;var bServerSide=_fnDataSource(oSettings)=='ssp';var aiDisplay=oSettings.aiDisplay;oSettings.bDrawing=true;/* Check and see if we have an initial draw position from state saving */if(iInitDisplayStart!==undefined&&iInitDisplayStart!==-1){oSettings._iDisplayStart=bServerSide?iInitDisplayStart:iInitDisplayStart>=oSettings.fnRecordsDisplay()?0:iInitDisplayStart;oSettings.iInitDisplayStart=-1;}var iDisplayStart=oSettings._iDisplayStart;var iDisplayEnd=oSettings.fnDisplayEnd();/* Server-side processing draw intercept */if(oSettings.bDeferLoading){oSettings.bDeferLoading=false;oSettings.iDraw++;_fnProcessingDisplay(oSettings,false);}else if(!bServerSide){oSettings.iDraw++;}else if(!oSettings.bDestroying&&!_fnAjaxUpdate(oSettings)){return;}if(aiDisplay.length!==0){var iStart=bServerSide?0:iDisplayStart;var iEnd=bServerSide?oSettings.aoData.length:iDisplayEnd;for(var j=iStart;j<iEnd;j++){var iDataIndex=aiDisplay[j];var aoData=oSettings.aoData[iDataIndex];if(aoData.nTr===null){_fnCreateTr(oSettings,iDataIndex);}var nRow=aoData.nTr;/* Remove the old striping classes and then add the new one */if(iStripes!==0){var sStripe=asStripeClasses[iRowCount%iStripes];if(aoData._sRowStripe!=sStripe){$(nRow).removeClass(aoData._sRowStripe).addClass(sStripe);aoData._sRowStripe=sStripe;}}// Row callback functions - might want to manipulate the row
// iRowCount and j are not currently documented. Are they at all
// useful?
_fnCallbackFire(oSettings,'aoRowCallback',null,[nRow,aoData._aData,iRowCount,j]);anRows.push(nRow);iRowCount++;}}else{/* Table is empty - create a row with an empty message in it */var sZero=oLang.sZeroRecords;if(oSettings.iDraw==1&&_fnDataSource(oSettings)=='ajax'){sZero=oLang.sLoadingRecords;}else if(oLang.sEmptyTable&&oSettings.fnRecordsTotal()===0){sZero=oLang.sEmptyTable;}anRows[0]=$('<tr/>',{'class':iStripes?asStripeClasses[0]:''}).append($('<td />',{'valign':'top','colSpan':_fnVisbleColumns(oSettings),'class':oSettings.oClasses.sRowEmpty}).html(sZero))[0];}/* Header and footer callbacks */_fnCallbackFire(oSettings,'aoHeaderCallback','header',[$(oSettings.nTHead).children('tr')[0],_fnGetDataMaster(oSettings),iDisplayStart,iDisplayEnd,aiDisplay]);_fnCallbackFire(oSettings,'aoFooterCallback','footer',[$(oSettings.nTFoot).children('tr')[0],_fnGetDataMaster(oSettings),iDisplayStart,iDisplayEnd,aiDisplay]);var body=$(oSettings.nTBody);body.children().detach();body.append($(anRows));/* Call all required callback functions for the end of a draw */_fnCallbackFire(oSettings,'aoDrawCallback','draw',[oSettings]);/* Draw is complete, sorting and filtering must be as well */oSettings.bSorted=false;oSettings.bFiltered=false;oSettings.bDrawing=false;}/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */function _fnReDraw(settings,holdPosition){var features=settings.oFeatures,sort=features.bSort,filter=features.bFilter;if(sort){_fnSort(settings);}if(filter){_fnFilterComplete(settings,settings.oPreviousSearch);}else{// No filtering, so we want to just use the display master
settings.aiDisplay=settings.aiDisplayMaster.slice();}if(holdPosition!==true){settings._iDisplayStart=0;}// Let any modules know about the draw hold position state (used by
// scrolling internally)
settings._drawHold=holdPosition;_fnDraw(settings);settings._drawHold=false;}/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnAddOptionsHtml(oSettings){var classes=oSettings.oClasses;var table=$(oSettings.nTable);var holding=$('<div/>').insertBefore(table);// Holding element for speed
var features=oSettings.oFeatures;// All DataTables are wrapped in a div
var insert=$('<div/>',{id:oSettings.sTableId+'_wrapper','class':classes.sWrapper+(oSettings.nTFoot?'':' '+classes.sNoFooter)});oSettings.nHolding=holding[0];oSettings.nTableWrapper=insert[0];oSettings.nTableReinsertBefore=oSettings.nTable.nextSibling;/* Loop over the user set positioning and place the elements as needed */var aDom=oSettings.sDom.split('');var featureNode,cOption,nNewNode,cNext,sAttr,j;for(var i=0;i<aDom.length;i++){featureNode=null;cOption=aDom[i];if(cOption=='<'){/* New container div */nNewNode=$('<div/>')[0];/* Check to see if we should append an id and/or a class name to the container */cNext=aDom[i+1];if(cNext=="'"||cNext=='"'){sAttr="";j=2;while(aDom[i+j]!=cNext){sAttr+=aDom[i+j];j++;}/* Replace jQuery UI constants @todo depreciated */if(sAttr=="H"){sAttr=classes.sJUIHeader;}else if(sAttr=="F"){sAttr=classes.sJUIFooter;}/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */if(sAttr.indexOf('.')!=-1){var aSplit=sAttr.split('.');nNewNode.id=aSplit[0].substr(1,aSplit[0].length-1);nNewNode.className=aSplit[1];}else if(sAttr.charAt(0)=="#"){nNewNode.id=sAttr.substr(1,sAttr.length-1);}else{nNewNode.className=sAttr;}i+=j;/* Move along the position array */}insert.append(nNewNode);insert=$(nNewNode);}else if(cOption=='>'){/* End container div */insert=insert.parent();}// @todo Move options into their own plugins?
else if(cOption=='l'&&features.bPaginate&&features.bLengthChange){/* Length */featureNode=_fnFeatureHtmlLength(oSettings);}else if(cOption=='f'&&features.bFilter){/* Filter */featureNode=_fnFeatureHtmlFilter(oSettings);}else if(cOption=='r'&&features.bProcessing){/* pRocessing */featureNode=_fnFeatureHtmlProcessing(oSettings);}else if(cOption=='t'){/* Table */featureNode=_fnFeatureHtmlTable(oSettings);}else if(cOption=='i'&&features.bInfo){/* Info */featureNode=_fnFeatureHtmlInfo(oSettings);}else if(cOption=='p'&&features.bPaginate){/* Pagination */featureNode=_fnFeatureHtmlPaginate(oSettings);}else if(DataTable.ext.feature.length!==0){/* Plug-in features */var aoFeatures=DataTable.ext.feature;for(var k=0,kLen=aoFeatures.length;k<kLen;k++){if(cOption==aoFeatures[k].cFeature){featureNode=aoFeatures[k].fnInit(oSettings);break;}}}/* Add to the 2D features array */if(featureNode){var aanFeatures=oSettings.aanFeatures;if(!aanFeatures[cOption]){aanFeatures[cOption]=[];}aanFeatures[cOption].push(featureNode);insert.append(featureNode);}}/* Built our DOM structure - replace the holding div with what we want */holding.replaceWith(insert);oSettings.nHolding=null;}/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */function _fnDetectHeader(aLayout,nThead){var nTrs=$(nThead).children('tr');var nTr,nCell;var i,k,l,iLen,jLen,iColShifted,iColumn,iColspan,iRowspan;var bUnique;var fnShiftCol=function fnShiftCol(a,i,j){var k=a[i];while(k[j]){j++;}return j;};aLayout.splice(0,aLayout.length);/* We know how many rows there are in the layout - so prep it */for(i=0,iLen=nTrs.length;i<iLen;i++){aLayout.push([]);}/* Calculate a layout array */for(i=0,iLen=nTrs.length;i<iLen;i++){nTr=nTrs[i];iColumn=0;/* For every cell in the row... */nCell=nTr.firstChild;while(nCell){if(nCell.nodeName.toUpperCase()=="TD"||nCell.nodeName.toUpperCase()=="TH"){/* Get the col and rowspan attributes from the DOM and sanitise them */iColspan=nCell.getAttribute('colspan')*1;iRowspan=nCell.getAttribute('rowspan')*1;iColspan=!iColspan||iColspan===0||iColspan===1?1:iColspan;iRowspan=!iRowspan||iRowspan===0||iRowspan===1?1:iRowspan;/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */iColShifted=fnShiftCol(aLayout,i,iColumn);/* Cache calculation for unique columns */bUnique=iColspan===1?true:false;/* If there is col / rowspan, copy the information into the layout grid */for(l=0;l<iColspan;l++){for(k=0;k<iRowspan;k++){aLayout[i+k][iColShifted+l]={"cell":nCell,"unique":bUnique};aLayout[i+k].nTr=nTr;}}}nCell=nCell.nextSibling;}}}/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */function _fnGetUniqueThs(oSettings,nHeader,aLayout){var aReturn=[];if(!aLayout){aLayout=oSettings.aoHeader;if(nHeader){aLayout=[];_fnDetectHeader(aLayout,nHeader);}}for(var i=0,iLen=aLayout.length;i<iLen;i++){for(var j=0,jLen=aLayout[i].length;j<jLen;j++){if(aLayout[i][j].unique&&(!aReturn[j]||!oSettings.bSortCellsTop)){aReturn[j]=aLayout[i][j].cell;}}}return aReturn;}/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */function _fnBuildAjax(oSettings,data,fn){// Compatibility with 1.9-, allow fnServerData and event to manipulate
_fnCallbackFire(oSettings,'aoServerParams','serverParams',[data]);// Convert to object based for 1.10+ if using the old array scheme which can
// come from server-side processing or serverParams
if(data&&$.isArray(data)){var tmp={};var rbracket=/(.*?)\[\]$/;$.each(data,function(key,val){var match=val.name.match(rbracket);if(match){// Support for arrays
var name=match[0];if(!tmp[name]){tmp[name]=[];}tmp[name].push(val.value);}else{tmp[val.name]=val.value;}});data=tmp;}var ajaxData;var ajax=oSettings.ajax;var instance=oSettings.oInstance;var callback=function callback(json){_fnCallbackFire(oSettings,null,'xhr',[oSettings,json,oSettings.jqXHR]);fn(json);};if($.isPlainObject(ajax)&&ajax.data){ajaxData=ajax.data;var newData=$.isFunction(ajaxData)?ajaxData(data,oSettings):// fn can manipulate data or return
ajaxData;// an object object or array to merge
// If the function returned something, use that alone
data=$.isFunction(ajaxData)&&newData?newData:$.extend(true,data,newData);// Remove the data property as we've resolved it already and don't want
// jQuery to do it again (it is restored at the end of the function)
delete ajax.data;}var baseAjax={"data":data,"success":function success(json){var error=json.error||json.sError;if(error){_fnLog(oSettings,0,error);}oSettings.json=json;callback(json);},"dataType":"json","cache":false,"type":oSettings.sServerMethod,"error":function error(xhr,_error,thrown){var ret=_fnCallbackFire(oSettings,null,'xhr',[oSettings,null,oSettings.jqXHR]);if($.inArray(true,ret)===-1){if(_error=="parsererror"){_fnLog(oSettings,0,'Invalid JSON response',1);}else if(xhr.readyState===4){_fnLog(oSettings,0,'Ajax error',7);}}_fnProcessingDisplay(oSettings,false);}};// Store the data submitted for the API
oSettings.oAjaxData=data;// Allow plug-ins and external processes to modify the data
_fnCallbackFire(oSettings,null,'preXhr',[oSettings,data]);if(oSettings.fnServerData){// DataTables 1.9- compatibility
oSettings.fnServerData.call(instance,oSettings.sAjaxSource,$.map(data,function(val,key){// Need to convert back to 1.9 trad format
return{name:key,value:val};}),callback,oSettings);}else if(oSettings.sAjaxSource||typeof ajax==='string'){// DataTables 1.9- compatibility
oSettings.jqXHR=$.ajax($.extend(baseAjax,{url:ajax||oSettings.sAjaxSource}));}else if($.isFunction(ajax)){// Is a function - let the caller define what needs to be done
oSettings.jqXHR=ajax.call(instance,data,callback,oSettings);}else{// Object to extend the base settings
oSettings.jqXHR=$.ajax($.extend(baseAjax,ajax));// Restore for next time around
ajax.data=ajaxData;}}/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */function _fnAjaxUpdate(settings){if(settings.bAjaxDataGet){settings.iDraw++;_fnProcessingDisplay(settings,true);_fnBuildAjax(settings,_fnAjaxParameters(settings),function(json){_fnAjaxUpdateDraw(settings,json);});return false;}return true;}/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */function _fnAjaxParameters(settings){var columns=settings.aoColumns,columnCount=columns.length,features=settings.oFeatures,preSearch=settings.oPreviousSearch,preColSearch=settings.aoPreSearchCols,i,data=[],dataProp,column,columnSearch,sort=_fnSortFlatten(settings),displayStart=settings._iDisplayStart,displayLength=features.bPaginate!==false?settings._iDisplayLength:-1;var param=function param(name,value){data.push({'name':name,'value':value});};// DataTables 1.9- compatible method
param('sEcho',settings.iDraw);param('iColumns',columnCount);param('sColumns',_pluck(columns,'sName').join(','));param('iDisplayStart',displayStart);param('iDisplayLength',displayLength);// DataTables 1.10+ method
var d={draw:settings.iDraw,columns:[],order:[],start:displayStart,length:displayLength,search:{value:preSearch.sSearch,regex:preSearch.bRegex}};for(i=0;i<columnCount;i++){column=columns[i];columnSearch=preColSearch[i];dataProp=typeof column.mData=="function"?'function':column.mData;d.columns.push({data:dataProp,name:column.sName,searchable:column.bSearchable,orderable:column.bSortable,search:{value:columnSearch.sSearch,regex:columnSearch.bRegex}});param("mDataProp_"+i,dataProp);if(features.bFilter){param('sSearch_'+i,columnSearch.sSearch);param('bRegex_'+i,columnSearch.bRegex);param('bSearchable_'+i,column.bSearchable);}if(features.bSort){param('bSortable_'+i,column.bSortable);}}if(features.bFilter){param('sSearch',preSearch.sSearch);param('bRegex',preSearch.bRegex);}if(features.bSort){$.each(sort,function(i,val){d.order.push({column:val.col,dir:val.dir});param('iSortCol_'+i,val.col);param('sSortDir_'+i,val.dir);});param('iSortingCols',sort.length);}// If the legacy.ajax parameter is null, then we automatically decide which
// form to use, based on sAjaxSource
var legacy=DataTable.ext.legacy.ajax;if(legacy===null){return settings.sAjaxSource?data:d;}// Otherwise, if legacy has been specified then we use that to decide on the
// form
return legacy?data:d;}/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */function _fnAjaxUpdateDraw(settings,json){// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
// Support both
var compat=function compat(old,modern){return json[old]!==undefined?json[old]:json[modern];};var data=_fnAjaxDataSrc(settings,json);var draw=compat('sEcho','draw');var recordsTotal=compat('iTotalRecords','recordsTotal');var recordsFiltered=compat('iTotalDisplayRecords','recordsFiltered');if(draw){// Protect against out of sequence returns
if(draw*1<settings.iDraw){return;}settings.iDraw=draw*1;}_fnClearTable(settings);settings._iRecordsTotal=parseInt(recordsTotal,10);settings._iRecordsDisplay=parseInt(recordsFiltered,10);for(var i=0,ien=data.length;i<ien;i++){_fnAddData(settings,data[i]);}settings.aiDisplay=settings.aiDisplayMaster.slice();settings.bAjaxDataGet=false;_fnDraw(settings);if(!settings._bInitComplete){_fnInitComplete(settings,json);}settings.bAjaxDataGet=true;_fnProcessingDisplay(settings,false);}/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */function _fnAjaxDataSrc(oSettings,json){var dataSrc=$.isPlainObject(oSettings.ajax)&&oSettings.ajax.dataSrc!==undefined?oSettings.ajax.dataSrc:oSettings.sAjaxDataProp;// Compatibility with 1.9-.
// Compatibility with 1.9-. In order to read from aaData, check if the
// default has been changed, if not, check for aaData
if(dataSrc==='data'){return json.aaData||json[dataSrc];}return dataSrc!==""?_fnGetObjectDataFn(dataSrc)(json):json;}/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnFeatureHtmlFilter(settings){var classes=settings.oClasses;var tableId=settings.sTableId;var language=settings.oLanguage;var previousSearch=settings.oPreviousSearch;var features=settings.aanFeatures;var input='<input type="search" class="'+classes.sFilterInput+'"/>';var str=language.sSearch;str=str.match(/_INPUT_/)?str.replace('_INPUT_',input):str+input;var filter=$('<div/>',{'id':!features.f?tableId+'_filter':null,'class':classes.sFilter}).append($('<label/>').append(str));var searchFn=function searchFn(){/* Update all other filter input elements for the new display */var n=features.f;var val=!this.value?"":this.value;// mental IE8 fix :-(
/* Now do the filter */if(val!=previousSearch.sSearch){_fnFilterComplete(settings,{"sSearch":val,"bRegex":previousSearch.bRegex,"bSmart":previousSearch.bSmart,"bCaseInsensitive":previousSearch.bCaseInsensitive});// Need to redraw, without resorting
settings._iDisplayStart=0;_fnDraw(settings);}};var searchDelay=settings.searchDelay!==null?settings.searchDelay:_fnDataSource(settings)==='ssp'?400:0;var jqFilter=$('input',filter).val(previousSearch.sSearch).attr('placeholder',language.sSearchPlaceholder).on('keyup.DT search.DT input.DT paste.DT cut.DT',searchDelay?_fnThrottle(searchFn,searchDelay):searchFn).on('keypress.DT',function(e){/* Prevent form submission */if(e.keyCode==13){return false;}}).attr('aria-controls',tableId);// Update the input elements whenever the table is filtered
$(settings.nTable).on('search.dt.DT',function(ev,s){if(settings===s){// IE9 throws an 'unknown error' if document.activeElement is used
// inside an iframe or frame...
try{if(jqFilter[0]!==document.activeElement){jqFilter.val(previousSearch.sSearch);}}catch(e){}}});return filter[0];}/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */function _fnFilterComplete(oSettings,oInput,iForce){var oPrevSearch=oSettings.oPreviousSearch;var aoPrevSearch=oSettings.aoPreSearchCols;var fnSaveFilter=function fnSaveFilter(oFilter){/* Save the filtering values */oPrevSearch.sSearch=oFilter.sSearch;oPrevSearch.bRegex=oFilter.bRegex;oPrevSearch.bSmart=oFilter.bSmart;oPrevSearch.bCaseInsensitive=oFilter.bCaseInsensitive;};var fnRegex=function fnRegex(o){// Backwards compatibility with the bEscapeRegex option
return o.bEscapeRegex!==undefined?!o.bEscapeRegex:o.bRegex;};// Resolve any column types that are unknown due to addition or invalidation
// @todo As per sort - can this be moved into an event handler?
_fnColumnTypes(oSettings);/* In server-side processing all filtering is done by the server, so no point hanging around here */if(_fnDataSource(oSettings)!='ssp'){/* Global filter */_fnFilter(oSettings,oInput.sSearch,iForce,fnRegex(oInput),oInput.bSmart,oInput.bCaseInsensitive);fnSaveFilter(oInput);/* Now do the individual column filter */for(var i=0;i<aoPrevSearch.length;i++){_fnFilterColumn(oSettings,aoPrevSearch[i].sSearch,i,fnRegex(aoPrevSearch[i]),aoPrevSearch[i].bSmart,aoPrevSearch[i].bCaseInsensitive);}/* Custom filtering */_fnFilterCustom(oSettings);}else{fnSaveFilter(oInput);}/* Tell the draw function we have been filtering */oSettings.bFiltered=true;_fnCallbackFire(oSettings,null,'search',[oSettings]);}/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnFilterCustom(settings){var filters=DataTable.ext.search;var displayRows=settings.aiDisplay;var row,rowIdx;for(var i=0,ien=filters.length;i<ien;i++){var rows=[];// Loop over each row and see if it should be included
for(var j=0,jen=displayRows.length;j<jen;j++){rowIdx=displayRows[j];row=settings.aoData[rowIdx];if(filters[i](settings,row._aFilterData,rowIdx,row._aData,j)){rows.push(rowIdx);}}// So the array reference doesn't break set the results into the
// existing array
displayRows.length=0;$.merge(displayRows,rows);}}/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */function _fnFilterColumn(settings,searchStr,colIdx,regex,smart,caseInsensitive){if(searchStr===''){return;}var data;var out=[];var display=settings.aiDisplay;var rpSearch=_fnFilterCreateSearch(searchStr,regex,smart,caseInsensitive);for(var i=0;i<display.length;i++){data=settings.aoData[display[i]]._aFilterData[colIdx];if(rpSearch.test(data)){out.push(display[i]);}}settings.aiDisplay=out;}/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */function _fnFilter(settings,input,force,regex,smart,caseInsensitive){var rpSearch=_fnFilterCreateSearch(input,regex,smart,caseInsensitive);var prevSearch=settings.oPreviousSearch.sSearch;var displayMaster=settings.aiDisplayMaster;var display,invalidated,i;var filtered=[];// Need to take account of custom filtering functions - always filter
if(DataTable.ext.search.length!==0){force=true;}// Check if any of the rows were invalidated
invalidated=_fnFilterData(settings);// If the input is blank - we just want the full data set
if(input.length<=0){settings.aiDisplay=displayMaster.slice();}else{// New search - start from the master array
if(invalidated||force||prevSearch.length>input.length||input.indexOf(prevSearch)!==0||settings.bSorted// On resort, the display master needs to be
// re-filtered since indexes will have changed
){settings.aiDisplay=displayMaster.slice();}// Search the display array
display=settings.aiDisplay;for(i=0;i<display.length;i++){if(rpSearch.test(settings.aoData[display[i]]._sFilterRow)){filtered.push(display[i]);}}settings.aiDisplay=filtered;}}/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */function _fnFilterCreateSearch(search,regex,smart,caseInsensitive){search=regex?search:_fnEscapeRegex(search);if(smart){/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 * 
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */var a=$.map(search.match(/"[^"]+"|[^ ]+/g)||[''],function(word){if(word.charAt(0)==='"'){var m=word.match(/^"(.*)"$/);word=m?m[1]:word;}return word.replace('"','');});search='^(?=.*?'+a.join(')(?=.*?')+').*$';}return new RegExp(search,caseInsensitive?'i':'');}/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */var _fnEscapeRegex=DataTable.util.escapeRegex;var __filter_div=$('<div>')[0];var __filter_div_textContent=__filter_div.textContent!==undefined;// Update the filtering data for each row if needed (by invalidation or first run)
function _fnFilterData(settings){var columns=settings.aoColumns;var column;var i,j,ien,jen,filterData,cellData,row;var fomatters=DataTable.ext.type.search;var wasInvalidated=false;for(i=0,ien=settings.aoData.length;i<ien;i++){row=settings.aoData[i];if(!row._aFilterData){filterData=[];for(j=0,jen=columns.length;j<jen;j++){column=columns[j];if(column.bSearchable){cellData=_fnGetCellData(settings,i,j,'filter');if(fomatters[column.sType]){cellData=fomatters[column.sType](cellData);}// Search in DataTables 1.10 is string based. In 1.11 this
// should be altered to also allow strict type checking.
if(cellData===null){cellData='';}if(typeof cellData!=='string'&&cellData.toString){cellData=cellData.toString();}}else{cellData='';}// If it looks like there is an HTML entity in the string,
// attempt to decode it so sorting works as expected. Note that
// we could use a single line of jQuery to do this, but the DOM
// method used here is much faster http://jsperf.com/html-decode
if(cellData.indexOf&&cellData.indexOf('&')!==-1){__filter_div.innerHTML=cellData;cellData=__filter_div_textContent?__filter_div.textContent:__filter_div.innerText;}if(cellData.replace){cellData=cellData.replace(/[\r\n]/g,'');}filterData.push(cellData);}row._aFilterData=filterData;row._sFilterRow=filterData.join('  ');wasInvalidated=true;}}return wasInvalidated;}/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */function _fnSearchToCamel(obj){return{search:obj.sSearch,smart:obj.bSmart,regex:obj.bRegex,caseInsensitive:obj.bCaseInsensitive};}/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */function _fnSearchToHung(obj){return{sSearch:obj.search,bSmart:obj.smart,bRegex:obj.regex,bCaseInsensitive:obj.caseInsensitive};}/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */function _fnFeatureHtmlInfo(settings){var tid=settings.sTableId,nodes=settings.aanFeatures.i,n=$('<div/>',{'class':settings.oClasses.sInfo,'id':!nodes?tid+'_info':null});if(!nodes){// Update display on each draw
settings.aoDrawCallback.push({"fn":_fnUpdateInfo,"sName":"information"});n.attr('role','status').attr('aria-live','polite');// Table is described by our info div
$(settings.nTable).attr('aria-describedby',tid+'_info');}return n[0];}/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnUpdateInfo(settings){/* Show information about the table */var nodes=settings.aanFeatures.i;if(nodes.length===0){return;}var lang=settings.oLanguage,start=settings._iDisplayStart+1,end=settings.fnDisplayEnd(),max=settings.fnRecordsTotal(),total=settings.fnRecordsDisplay(),out=total?lang.sInfo:lang.sInfoEmpty;if(total!==max){/* Record set after filtering */out+=' '+lang.sInfoFiltered;}// Convert the macros
out+=lang.sInfoPostFix;out=_fnInfoMacros(settings,out);var callback=lang.fnInfoCallback;if(callback!==null){out=callback.call(settings.oInstance,settings,start,end,max,total,out);}$(nodes).html(out);}function _fnInfoMacros(settings,str){// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
// internally
var formatter=settings.fnFormatNumber,start=settings._iDisplayStart+1,len=settings._iDisplayLength,vis=settings.fnRecordsDisplay(),all=len===-1;return str.replace(/_START_/g,formatter.call(settings,start)).replace(/_END_/g,formatter.call(settings,settings.fnDisplayEnd())).replace(/_MAX_/g,formatter.call(settings,settings.fnRecordsTotal())).replace(/_TOTAL_/g,formatter.call(settings,vis)).replace(/_PAGE_/g,formatter.call(settings,all?1:Math.ceil(start/len))).replace(/_PAGES_/g,formatter.call(settings,all?1:Math.ceil(vis/len)));}/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnInitialise(settings){var i,iLen,iAjaxStart=settings.iInitDisplayStart;var columns=settings.aoColumns,column;var features=settings.oFeatures;var deferLoading=settings.bDeferLoading;// value modified by the draw
/* Ensure that the table data is fully initialised */if(!settings.bInitialised){setTimeout(function(){_fnInitialise(settings);},200);return;}/* Show the display HTML options */_fnAddOptionsHtml(settings);/* Build and draw the header / footer for the table */_fnBuildHead(settings);_fnDrawHead(settings,settings.aoHeader);_fnDrawHead(settings,settings.aoFooter);/* Okay to show that something is going on now */_fnProcessingDisplay(settings,true);/* Calculate sizes for columns */if(features.bAutoWidth){_fnCalculateColumnWidths(settings);}for(i=0,iLen=columns.length;i<iLen;i++){column=columns[i];if(column.sWidth){column.nTh.style.width=_fnStringToCss(column.sWidth);}}_fnCallbackFire(settings,null,'preInit',[settings]);// If there is default sorting required - let's do it. The sort function
// will do the drawing for us. Otherwise we draw the table regardless of the
// Ajax source - this allows the table to look initialised for Ajax sourcing
// data (show 'loading' message possibly)
_fnReDraw(settings);// Server-side processing init complete is done by _fnAjaxUpdateDraw
var dataSrc=_fnDataSource(settings);if(dataSrc!='ssp'||deferLoading){// if there is an ajax source load the data
if(dataSrc=='ajax'){_fnBuildAjax(settings,[],function(json){var aData=_fnAjaxDataSrc(settings,json);// Got the data - add it to the table
for(i=0;i<aData.length;i++){_fnAddData(settings,aData[i]);}// Reset the init display for cookie saving. We've already done
// a filter, and therefore cleared it before. So we need to make
// it appear 'fresh'
settings.iInitDisplayStart=iAjaxStart;_fnReDraw(settings);_fnProcessingDisplay(settings,false);_fnInitComplete(settings,json);},settings);}else{_fnProcessingDisplay(settings,false);_fnInitComplete(settings);}}}/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */function _fnInitComplete(settings,json){settings._bInitComplete=true;// When data was added after the initialisation (data or Ajax) we need to
// calculate the column sizing
if(json||settings.oInit.aaData){_fnAdjustColumnSizing(settings);}_fnCallbackFire(settings,null,'plugin-init',[settings,json]);_fnCallbackFire(settings,'aoInitComplete','init',[settings,json]);}function _fnLengthChange(settings,val){var len=parseInt(val,10);settings._iDisplayLength=len;_fnLengthOverflow(settings);// Fire length change event
_fnCallbackFire(settings,null,'length',[settings,len]);}/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */function _fnFeatureHtmlLength(settings){var classes=settings.oClasses,tableId=settings.sTableId,menu=settings.aLengthMenu,d2=$.isArray(menu[0]),lengths=d2?menu[0]:menu,language=d2?menu[1]:menu;var select=$('<select/>',{'name':tableId+'_length','aria-controls':tableId,'class':classes.sLengthSelect});for(var i=0,ien=lengths.length;i<ien;i++){select[0][i]=new Option(typeof language[i]==='number'?settings.fnFormatNumber(language[i]):language[i],lengths[i]);}var div=$('<div><label/></div>').addClass(classes.sLength);if(!settings.aanFeatures.l){div[0].id=tableId+'_length';}div.children().append(settings.oLanguage.sLengthMenu.replace('_MENU_',select[0].outerHTML));// Can't use `select` variable as user might provide their own and the
// reference is broken by the use of outerHTML
$('select',div).val(settings._iDisplayLength).on('change.DT',function(e){_fnLengthChange(settings,$(this).val());_fnDraw(settings);});// Update node value whenever anything changes the table's length
$(settings.nTable).on('length.dt.DT',function(e,s,len){if(settings===s){$('select',div).val(len);}});return div[0];}/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */ /**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */function _fnFeatureHtmlPaginate(settings){var type=settings.sPaginationType,plugin=DataTable.ext.pager[type],modern=typeof plugin==='function',redraw=function redraw(settings){_fnDraw(settings);},node=$('<div/>').addClass(settings.oClasses.sPaging+type)[0],features=settings.aanFeatures;if(!modern){plugin.fnInit(settings,node,redraw);}/* Add a draw callback for the pagination on first instance, to update the paging display */if(!features.p){node.id=settings.sTableId+'_paginate';settings.aoDrawCallback.push({"fn":function fn(settings){if(modern){var start=settings._iDisplayStart,len=settings._iDisplayLength,visRecords=settings.fnRecordsDisplay(),all=len===-1,page=all?0:Math.ceil(start/len),pages=all?1:Math.ceil(visRecords/len),buttons=plugin(page,pages),i,ien;for(i=0,ien=features.p.length;i<ien;i++){_fnRenderer(settings,'pageButton')(settings,features.p[i],i,buttons,page,pages);}}else{plugin.fnUpdate(settings,redraw);}},"sName":"pagination"});}return node;}/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */function _fnPageChange(settings,action,redraw){var start=settings._iDisplayStart,len=settings._iDisplayLength,records=settings.fnRecordsDisplay();if(records===0||len===-1){start=0;}else if(typeof action==="number"){start=action*len;if(start>records){start=0;}}else if(action=="first"){start=0;}else if(action=="previous"){start=len>=0?start-len:0;if(start<0){start=0;}}else if(action=="next"){if(start+len<records){start+=len;}}else if(action=="last"){start=Math.floor((records-1)/len)*len;}else{_fnLog(settings,0,"Unknown paging action: "+action,5);}var changed=settings._iDisplayStart!==start;settings._iDisplayStart=start;if(changed){_fnCallbackFire(settings,null,'page',[settings]);if(redraw){_fnDraw(settings);}}return changed;}/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */function _fnFeatureHtmlProcessing(settings){return $('<div/>',{'id':!settings.aanFeatures.r?settings.sTableId+'_processing':null,'class':settings.oClasses.sProcessing}).html(settings.oLanguage.sProcessing).insertBefore(settings.nTable)[0];}/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */function _fnProcessingDisplay(settings,show){if(settings.oFeatures.bProcessing){$(settings.aanFeatures.r).css('display',show?'block':'none');}_fnCallbackFire(settings,null,'processing',[settings,show]);}/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */function _fnFeatureHtmlTable(settings){var table=$(settings.nTable);// Add the ARIA grid role to the table
table.attr('role','grid');// Scrolling from here on in
var scroll=settings.oScroll;if(scroll.sX===''&&scroll.sY===''){return settings.nTable;}var scrollX=scroll.sX;var scrollY=scroll.sY;var classes=settings.oClasses;var caption=table.children('caption');var captionSide=caption.length?caption[0]._captionSide:null;var headerClone=$(table[0].cloneNode(false));var footerClone=$(table[0].cloneNode(false));var footer=table.children('tfoot');var _div='<div/>';var size=function size(s){return!s?null:_fnStringToCss(s);};if(!footer.length){footer=null;}/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */var scroller=$(_div,{'class':classes.sScrollWrapper}).append($(_div,{'class':classes.sScrollHead}).css({overflow:'hidden',position:'relative',border:0,width:scrollX?size(scrollX):'100%'}).append($(_div,{'class':classes.sScrollHeadInner}).css({'box-sizing':'content-box',width:scroll.sXInner||'100%'}).append(headerClone.removeAttr('id').css('margin-left',0).append(captionSide==='top'?caption:null).append(table.children('thead'))))).append($(_div,{'class':classes.sScrollBody}).css({position:'relative',overflow:'auto',width:size(scrollX)}).append(table));if(footer){scroller.append($(_div,{'class':classes.sScrollFoot}).css({overflow:'hidden',border:0,width:scrollX?size(scrollX):'100%'}).append($(_div,{'class':classes.sScrollFootInner}).append(footerClone.removeAttr('id').css('margin-left',0).append(captionSide==='bottom'?caption:null).append(table.children('tfoot')))));}var children=scroller.children();var scrollHead=children[0];var scrollBody=children[1];var scrollFoot=footer?children[2]:null;// When the body is scrolled, then we also want to scroll the headers
if(scrollX){$(scrollBody).on('scroll.DT',function(e){var scrollLeft=this.scrollLeft;scrollHead.scrollLeft=scrollLeft;if(footer){scrollFoot.scrollLeft=scrollLeft;}});}$(scrollBody).css(scrollY&&scroll.bCollapse?'max-height':'height',scrollY);settings.nScrollHead=scrollHead;settings.nScrollBody=scrollBody;settings.nScrollFoot=scrollFoot;// On redraw - align columns
settings.aoDrawCallback.push({"fn":_fnScrollDraw,"sName":"scrolling"});return scroller[0];}/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnScrollDraw(settings){// Given that this is such a monster function, a lot of variables are use
// to try and keep the minimised size as small as possible
var scroll=settings.oScroll,scrollX=scroll.sX,scrollXInner=scroll.sXInner,scrollY=scroll.sY,barWidth=scroll.iBarWidth,divHeader=$(settings.nScrollHead),divHeaderStyle=divHeader[0].style,divHeaderInner=divHeader.children('div'),divHeaderInnerStyle=divHeaderInner[0].style,divHeaderTable=divHeaderInner.children('table'),divBodyEl=settings.nScrollBody,divBody=$(divBodyEl),divBodyStyle=divBodyEl.style,divFooter=$(settings.nScrollFoot),divFooterInner=divFooter.children('div'),divFooterTable=divFooterInner.children('table'),header=$(settings.nTHead),table=$(settings.nTable),tableEl=table[0],tableStyle=tableEl.style,footer=settings.nTFoot?$(settings.nTFoot):null,browser=settings.oBrowser,ie67=browser.bScrollOversize,dtHeaderCells=_pluck(settings.aoColumns,'nTh'),headerTrgEls,footerTrgEls,headerSrcEls,footerSrcEls,headerCopy,footerCopy,headerWidths=[],footerWidths=[],headerContent=[],footerContent=[],idx,correction,sanityWidth,zeroOut=function zeroOut(nSizer){var style=nSizer.style;style.paddingTop="0";style.paddingBottom="0";style.borderTopWidth="0";style.borderBottomWidth="0";style.height=0;};// If the scrollbar visibility has changed from the last draw, we need to
// adjust the column sizes as the table width will have changed to account
// for the scrollbar
var scrollBarVis=divBodyEl.scrollHeight>divBodyEl.clientHeight;if(settings.scrollBarVis!==scrollBarVis&&settings.scrollBarVis!==undefined){settings.scrollBarVis=scrollBarVis;_fnAdjustColumnSizing(settings);return;// adjust column sizing will call this function again
}else{settings.scrollBarVis=scrollBarVis;}/*
		 * 1. Re-create the table inside the scrolling div
		 */ // Remove the old minimised thead and tfoot elements in the inner table
table.children('thead, tfoot').remove();if(footer){footerCopy=footer.clone().prependTo(table);footerTrgEls=footer.find('tr');// the original tfoot is in its own table and must be sized
footerSrcEls=footerCopy.find('tr');}// Clone the current header and footer elements and then place it into the inner table
headerCopy=header.clone().prependTo(table);headerTrgEls=header.find('tr');// original header is in its own table
headerSrcEls=headerCopy.find('tr');headerCopy.find('th, td').removeAttr('tabindex');/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */ // Remove old sizing and apply the calculated column widths
// Get the unique column headers in the newly created (cloned) header. We want to apply the
// calculated sizes to this header
if(!scrollX){divBodyStyle.width='100%';divHeader[0].style.width='100%';}$.each(_fnGetUniqueThs(settings,headerCopy),function(i,el){idx=_fnVisibleToColumnIndex(settings,i);el.style.width=settings.aoColumns[idx].sWidth;});if(footer){_fnApplyToChildren(function(n){n.style.width="";},footerSrcEls);}// Size the table as a whole
sanityWidth=table.outerWidth();if(scrollX===""){// No x scrolling
tableStyle.width="100%";// IE7 will make the width of the table when 100% include the scrollbar
// - which is shouldn't. When there is a scrollbar we need to take this
// into account.
if(ie67&&(table.find('tbody').height()>divBodyEl.offsetHeight||divBody.css('overflow-y')=="scroll")){tableStyle.width=_fnStringToCss(table.outerWidth()-barWidth);}// Recalculate the sanity width
sanityWidth=table.outerWidth();}else if(scrollXInner!==""){// legacy x scroll inner has been given - use it
tableStyle.width=_fnStringToCss(scrollXInner);// Recalculate the sanity width
sanityWidth=table.outerWidth();}// Hidden header should have zero height, so remove padding and borders. Then
// set the width based on the real headers
// Apply all styles in one pass
_fnApplyToChildren(zeroOut,headerSrcEls);// Read all widths in next pass
_fnApplyToChildren(function(nSizer){headerContent.push(nSizer.innerHTML);headerWidths.push(_fnStringToCss($(nSizer).css('width')));},headerSrcEls);// Apply all widths in final pass
_fnApplyToChildren(function(nToSize,i){// Only apply widths to the DataTables detected header cells - this
// prevents complex headers from having contradictory sizes applied
if($.inArray(nToSize,dtHeaderCells)!==-1){nToSize.style.width=headerWidths[i];}},headerTrgEls);$(headerSrcEls).height(0);/* Same again with the footer if we have one */if(footer){_fnApplyToChildren(zeroOut,footerSrcEls);_fnApplyToChildren(function(nSizer){footerContent.push(nSizer.innerHTML);footerWidths.push(_fnStringToCss($(nSizer).css('width')));},footerSrcEls);_fnApplyToChildren(function(nToSize,i){nToSize.style.width=footerWidths[i];},footerTrgEls);$(footerSrcEls).height(0);}/*
		 * 3. Apply the measurements
		 */ // "Hide" the header and footer that we used for the sizing. We need to keep
// the content of the cell so that the width applied to the header and body
// both match, but we want to hide it completely. We want to also fix their
// width to what they currently are
_fnApplyToChildren(function(nSizer,i){nSizer.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+headerContent[i]+'</div>';nSizer.style.width=headerWidths[i];},headerSrcEls);if(footer){_fnApplyToChildren(function(nSizer,i){nSizer.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+footerContent[i]+'</div>';nSizer.style.width=footerWidths[i];},footerSrcEls);}// Sanity check that the table is of a sensible width. If not then we are going to get
// misalignment - try to prevent this by not allowing the table to shrink below its min width
if(table.outerWidth()<sanityWidth){// The min width depends upon if we have a vertical scrollbar visible or not */
correction=divBodyEl.scrollHeight>divBodyEl.offsetHeight||divBody.css('overflow-y')=="scroll"?sanityWidth+barWidth:sanityWidth;// IE6/7 are a law unto themselves...
if(ie67&&(divBodyEl.scrollHeight>divBodyEl.offsetHeight||divBody.css('overflow-y')=="scroll")){tableStyle.width=_fnStringToCss(correction-barWidth);}// And give the user a warning that we've stopped the table getting too small
if(scrollX===""||scrollXInner!==""){_fnLog(settings,1,'Possible column misalignment',6);}}else{correction='100%';}// Apply to the container elements
divBodyStyle.width=_fnStringToCss(correction);divHeaderStyle.width=_fnStringToCss(correction);if(footer){settings.nScrollFoot.style.width=_fnStringToCss(correction);}/*
		 * 4. Clean up
		 */if(!scrollY){/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */if(ie67){divBodyStyle.height=_fnStringToCss(tableEl.offsetHeight+barWidth);}}/* Finally set the width's of the header and footer tables */var iOuterWidth=table.outerWidth();divHeaderTable[0].style.width=_fnStringToCss(iOuterWidth);divHeaderInnerStyle.width=_fnStringToCss(iOuterWidth);// Figure out if there are scrollbar present - if so then we need a the header and footer to
// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
var bScrolling=table.height()>divBodyEl.clientHeight||divBody.css('overflow-y')=="scroll";var padding='padding'+(browser.bScrollbarLeft?'Left':'Right');divHeaderInnerStyle[padding]=bScrolling?barWidth+"px":"0px";if(footer){divFooterTable[0].style.width=_fnStringToCss(iOuterWidth);divFooterInner[0].style.width=_fnStringToCss(iOuterWidth);divFooterInner[0].style[padding]=bScrolling?barWidth+"px":"0px";}// Correct DOM ordering for colgroup - comes before the thead
table.children('colgroup').insertBefore(table.children('thead'));/* Adjust the position of the header in case we loose the y-scrollbar */divBody.scroll();// If sorting or filtering has occurred, jump the scrolling back to the top
// only if we aren't holding the position
if((settings.bSorted||settings.bFiltered)&&!settings._drawHold){divBodyEl.scrollTop=0;}}/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */function _fnApplyToChildren(fn,an1,an2){var index=0,i=0,iLen=an1.length;var nNode1,nNode2;while(i<iLen){nNode1=an1[i].firstChild;nNode2=an2?an2[i].firstChild:null;while(nNode1){if(nNode1.nodeType===1){if(an2){fn(nNode1,nNode2,index);}else{fn(nNode1,index);}index++;}nNode1=nNode1.nextSibling;nNode2=an2?nNode2.nextSibling:null;}i++;}}var __re_html_remove=/<.*?>/g;/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnCalculateColumnWidths(oSettings){var table=oSettings.nTable,columns=oSettings.aoColumns,scroll=oSettings.oScroll,scrollY=scroll.sY,scrollX=scroll.sX,scrollXInner=scroll.sXInner,columnCount=columns.length,visibleColumns=_fnGetColumns(oSettings,'bVisible'),headerCells=$('th',oSettings.nTHead),tableWidthAttr=table.getAttribute('width'),// from DOM element
tableContainer=table.parentNode,userInputs=false,i,column,columnIdx,width,outerWidth,browser=oSettings.oBrowser,ie67=browser.bScrollOversize;var styleWidth=table.style.width;if(styleWidth&&styleWidth.indexOf('%')!==-1){tableWidthAttr=styleWidth;}/* Convert any user input sizes into pixel sizes */for(i=0;i<visibleColumns.length;i++){column=columns[visibleColumns[i]];if(column.sWidth!==null){column.sWidth=_fnConvertToWidth(column.sWidthOrig,tableContainer);userInputs=true;}}/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */if(ie67||!userInputs&&!scrollX&&!scrollY&&columnCount==_fnVisbleColumns(oSettings)&&columnCount==headerCells.length){for(i=0;i<columnCount;i++){var colIdx=_fnVisibleToColumnIndex(oSettings,i);if(colIdx!==null){columns[colIdx].sWidth=_fnStringToCss(headerCells.eq(i).width());}}}else{// Otherwise construct a single row, worst case, table with the widest
// node in the data, assign any user defined widths, then insert it into
// the DOM and allow the browser to do all the hard work of calculating
// table widths
var tmpTable=$(table).clone()// don't use cloneNode - IE8 will remove events on the main table
.css('visibility','hidden').removeAttr('id');// Clean up the table body
tmpTable.find('tbody tr').remove();var tr=$('<tr/>').appendTo(tmpTable.find('tbody'));// Clone the table header and footer - we can't use the header / footer
// from the cloned table, since if scrolling is active, the table's
// real header and footer are contained in different table tags
tmpTable.find('thead, tfoot').remove();tmpTable.append($(oSettings.nTHead).clone()).append($(oSettings.nTFoot).clone());// Remove any assigned widths from the footer (from scrolling)
tmpTable.find('tfoot th, tfoot td').css('width','');// Apply custom sizing to the cloned header
headerCells=_fnGetUniqueThs(oSettings,tmpTable.find('thead')[0]);for(i=0;i<visibleColumns.length;i++){column=columns[visibleColumns[i]];headerCells[i].style.width=column.sWidthOrig!==null&&column.sWidthOrig!==''?_fnStringToCss(column.sWidthOrig):'';// For scrollX we need to force the column width otherwise the
// browser will collapse it. If this width is smaller than the
// width the column requires, then it will have no effect
if(column.sWidthOrig&&scrollX){$(headerCells[i]).append($('<div/>').css({width:column.sWidthOrig,margin:0,padding:0,border:0,height:1}));}}// Find the widest cell for each column and put it into the table
if(oSettings.aoData.length){for(i=0;i<visibleColumns.length;i++){columnIdx=visibleColumns[i];column=columns[columnIdx];$(_fnGetWidestNode(oSettings,columnIdx)).clone(false).append(column.sContentPadding).appendTo(tr);}}// Tidy the temporary table - remove name attributes so there aren't
// duplicated in the dom (radio elements for example)
$('[name]',tmpTable).removeAttr('name');// Table has been built, attach to the document so we can work with it.
// A holding element is used, positioned at the top of the container
// with minimal height, so it has no effect on if the container scrolls
// or not. Otherwise it might trigger scrolling when it actually isn't
// needed
var holder=$('<div/>').css(scrollX||scrollY?{position:'absolute',top:0,left:0,height:1,right:0,overflow:'hidden'}:{}).append(tmpTable).appendTo(tableContainer);// When scrolling (X or Y) we want to set the width of the table as 
// appropriate. However, when not scrolling leave the table width as it
// is. This results in slightly different, but I think correct behaviour
if(scrollX&&scrollXInner){tmpTable.width(scrollXInner);}else if(scrollX){tmpTable.css('width','auto');tmpTable.removeAttr('width');// If there is no width attribute or style, then allow the table to
// collapse
if(tmpTable.width()<tableContainer.clientWidth&&tableWidthAttr){tmpTable.width(tableContainer.clientWidth);}}else if(scrollY){tmpTable.width(tableContainer.clientWidth);}else if(tableWidthAttr){tmpTable.width(tableWidthAttr);}// Get the width of each column in the constructed table - we need to
// know the inner width (so it can be assigned to the other table's
// cells) and the outer width so we can calculate the full width of the
// table. This is safe since DataTables requires a unique cell for each
// column, but if ever a header can span multiple columns, this will
// need to be modified.
var total=0;for(i=0;i<visibleColumns.length;i++){var cell=$(headerCells[i]);var border=cell.outerWidth()-cell.width();// Use getBounding... where possible (not IE8-) because it can give
// sub-pixel accuracy, which we then want to round up!
var bounding=browser.bBounding?Math.ceil(headerCells[i].getBoundingClientRect().width):cell.outerWidth();// Total is tracked to remove any sub-pixel errors as the outerWidth
// of the table might not equal the total given here (IE!).
total+=bounding;// Width for each column to use
columns[visibleColumns[i]].sWidth=_fnStringToCss(bounding-border);}table.style.width=_fnStringToCss(total);// Finished with the table - ditch it
holder.remove();}// If there is a width attr, we want to attach an event listener which
// allows the table sizing to automatically adjust when the window is
// resized. Use the width attr rather than CSS, since we can't know if the
// CSS is a relative value or absolute - DOM read is always px.
if(tableWidthAttr){table.style.width=_fnStringToCss(tableWidthAttr);}if((tableWidthAttr||scrollX)&&!oSettings._reszEvt){var bindResize=function bindResize(){$(window).on('resize.DT-'+oSettings.sInstance,_fnThrottle(function(){_fnAdjustColumnSizing(oSettings);}));};// IE6/7 will crash if we bind a resize event handler on page load.
// To be removed in 1.11 which drops IE6/7 support
if(ie67){setTimeout(bindResize,1000);}else{bindResize();}oSettings._reszEvt=true;}}/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */var _fnThrottle=DataTable.util.throttle;/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */function _fnConvertToWidth(width,parent){if(!width){return 0;}var n=$('<div/>').css('width',_fnStringToCss(width)).appendTo(parent||document.body);var val=n[0].offsetWidth;n.remove();return val;}/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */function _fnGetWidestNode(settings,colIdx){var idx=_fnGetMaxLenString(settings,colIdx);if(idx<0){return null;}var data=settings.aoData[idx];return!data.nTr?// Might not have been created when deferred rendering
$('<td/>').html(_fnGetCellData(settings,idx,colIdx,'display'))[0]:data.anCells[colIdx];}/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */function _fnGetMaxLenString(settings,colIdx){var s,max=-1,maxIdx=-1;for(var i=0,ien=settings.aoData.length;i<ien;i++){s=_fnGetCellData(settings,i,colIdx,'display')+'';s=s.replace(__re_html_remove,'');s=s.replace(/&nbsp;/g,' ');if(s.length>max){max=s.length;maxIdx=i;}}return maxIdx;}/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */function _fnStringToCss(s){if(s===null){return'0px';}if(typeof s=='number'){return s<0?'0px':s+'px';}// Check it has a unit character already
return s.match(/\d$/)?s+'px':s;}function _fnSortFlatten(settings){var i,iLen,k,kLen,aSort=[],aiOrig=[],aoColumns=settings.aoColumns,aDataSort,iCol,sType,srcCol,fixed=settings.aaSortingFixed,fixedObj=$.isPlainObject(fixed),nestedSort=[],add=function add(a){if(a.length&&!$.isArray(a[0])){// 1D array
nestedSort.push(a);}else{// 2D array
$.merge(nestedSort,a);}};// Build the sort array, with pre-fix and post-fix options if they have been
// specified
if($.isArray(fixed)){add(fixed);}if(fixedObj&&fixed.pre){add(fixed.pre);}add(settings.aaSorting);if(fixedObj&&fixed.post){add(fixed.post);}for(i=0;i<nestedSort.length;i++){srcCol=nestedSort[i][0];aDataSort=aoColumns[srcCol].aDataSort;for(k=0,kLen=aDataSort.length;k<kLen;k++){iCol=aDataSort[k];sType=aoColumns[iCol].sType||'string';if(nestedSort[i]._idx===undefined){nestedSort[i]._idx=$.inArray(nestedSort[i][1],aoColumns[iCol].asSorting);}aSort.push({src:srcCol,col:iCol,dir:nestedSort[i][1],index:nestedSort[i]._idx,type:sType,formatter:DataTable.ext.type.order[sType+"-pre"]});}}return aSort;}/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */function _fnSort(oSettings){var i,ien,iLen,j,jLen,k,kLen,sDataType,nTh,aiOrig=[],oExtSort=DataTable.ext.type.order,aoData=oSettings.aoData,aoColumns=oSettings.aoColumns,aDataSort,data,iCol,sType,oSort,formatters=0,sortCol,displayMaster=oSettings.aiDisplayMaster,aSort;// Resolve any column types that are unknown due to addition or invalidation
// @todo Can this be moved into a 'data-ready' handler which is called when
//   data is going to be used in the table?
_fnColumnTypes(oSettings);aSort=_fnSortFlatten(oSettings);for(i=0,ien=aSort.length;i<ien;i++){sortCol=aSort[i];// Track if we can use the fast sort algorithm
if(sortCol.formatter){formatters++;}// Load the data needed for the sort, for each cell
_fnSortData(oSettings,sortCol.col);}/* No sorting required if server-side or no sorting array */if(_fnDataSource(oSettings)!='ssp'&&aSort.length!==0){// Create a value - key array of the current row positions such that we can use their
// current position during the sort, if values match, in order to perform stable sorting
for(i=0,iLen=displayMaster.length;i<iLen;i++){aiOrig[displayMaster[i]]=i;}/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */if(formatters===aSort.length){// All sort types have formatting functions
displayMaster.sort(function(a,b){var x,y,k,test,sort,len=aSort.length,dataA=aoData[a]._aSortData,dataB=aoData[b]._aSortData;for(k=0;k<len;k++){sort=aSort[k];x=dataA[sort.col];y=dataB[sort.col];test=x<y?-1:x>y?1:0;if(test!==0){return sort.dir==='asc'?test:-test;}}x=aiOrig[a];y=aiOrig[b];return x<y?-1:x>y?1:0;});}else{// Depreciated - remove in 1.11 (providing a plug-in option)
// Not all sort types have formatting methods, so we have to call their sorting
// methods.
displayMaster.sort(function(a,b){var x,y,k,l,test,sort,fn,len=aSort.length,dataA=aoData[a]._aSortData,dataB=aoData[b]._aSortData;for(k=0;k<len;k++){sort=aSort[k];x=dataA[sort.col];y=dataB[sort.col];fn=oExtSort[sort.type+"-"+sort.dir]||oExtSort["string-"+sort.dir];test=fn(x,y);if(test!==0){return test;}}x=aiOrig[a];y=aiOrig[b];return x<y?-1:x>y?1:0;});}}/* Tell the draw function that we have sorted the data */oSettings.bSorted=true;}function _fnSortAria(settings){var label;var nextSort;var columns=settings.aoColumns;var aSort=_fnSortFlatten(settings);var oAria=settings.oLanguage.oAria;// ARIA attributes - need to loop all columns, to update all (removing old
// attributes as needed)
for(var i=0,iLen=columns.length;i<iLen;i++){var col=columns[i];var asSorting=col.asSorting;var sTitle=col.sTitle.replace(/<.*?>/g,"");var th=col.nTh;// IE7 is throwing an error when setting these properties with jQuery's
// attr() and removeAttr() methods...
th.removeAttribute('aria-sort');/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */if(col.bSortable){if(aSort.length>0&&aSort[0].col==i){th.setAttribute('aria-sort',aSort[0].dir=="asc"?"ascending":"descending");nextSort=asSorting[aSort[0].index+1]||asSorting[0];}else{nextSort=asSorting[0];}label=sTitle+(nextSort==="asc"?oAria.sSortAscending:oAria.sSortDescending);}else{label=sTitle;}th.setAttribute('aria-label',label);}}/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */function _fnSortListener(settings,colIdx,append,callback){var col=settings.aoColumns[colIdx];var sorting=settings.aaSorting;var asSorting=col.asSorting;var nextSortIdx;var next=function next(a,overflow){var idx=a._idx;if(idx===undefined){idx=$.inArray(a[1],asSorting);}return idx+1<asSorting.length?idx+1:overflow?null:0;};// Convert to 2D array if needed
if(typeof sorting[0]==='number'){sorting=settings.aaSorting=[sorting];}// If appending the sort then we are multi-column sorting
if(append&&settings.oFeatures.bSortMulti){// Are we already doing some kind of sort on this column?
var sortIdx=$.inArray(colIdx,_pluck(sorting,'0'));if(sortIdx!==-1){// Yes, modify the sort
nextSortIdx=next(sorting[sortIdx],true);if(nextSortIdx===null&&sorting.length===1){nextSortIdx=0;// can't remove sorting completely
}if(nextSortIdx===null){sorting.splice(sortIdx,1);}else{sorting[sortIdx][1]=asSorting[nextSortIdx];sorting[sortIdx]._idx=nextSortIdx;}}else{// No sort on this column yet
sorting.push([colIdx,asSorting[0],0]);sorting[sorting.length-1]._idx=0;}}else if(sorting.length&&sorting[0][0]==colIdx){// Single column - already sorting on this column, modify the sort
nextSortIdx=next(sorting[0]);sorting.length=1;sorting[0][1]=asSorting[nextSortIdx];sorting[0]._idx=nextSortIdx;}else{// Single column - sort only on this column
sorting.length=0;sorting.push([colIdx,asSorting[0]]);sorting[0]._idx=0;}// Run the sort by calling a full redraw
_fnReDraw(settings);// callback used for async user interaction
if(typeof callback=='function'){callback(settings);}}/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */function _fnSortAttachListener(settings,attachTo,colIdx,callback){var col=settings.aoColumns[colIdx];_fnBindAction(attachTo,{},function(e){/* If the column is not sortable - don't to anything */if(col.bSortable===false){return;}// If processing is enabled use a timeout to allow the processing
// display to be shown - otherwise to it synchronously
if(settings.oFeatures.bProcessing){_fnProcessingDisplay(settings,true);setTimeout(function(){_fnSortListener(settings,colIdx,e.shiftKey,callback);// In server-side processing, the draw callback will remove the
// processing display
if(_fnDataSource(settings)!=='ssp'){_fnProcessingDisplay(settings,false);}},0);}else{_fnSortListener(settings,colIdx,e.shiftKey,callback);}});}/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnSortingClasses(settings){var oldSort=settings.aLastSort;var sortClass=settings.oClasses.sSortColumn;var sort=_fnSortFlatten(settings);var features=settings.oFeatures;var i,ien,colIdx;if(features.bSort&&features.bSortClasses){// Remove old sorting classes
for(i=0,ien=oldSort.length;i<ien;i++){colIdx=oldSort[i].src;// Remove column sorting
$(_pluck(settings.aoData,'anCells',colIdx)).removeClass(sortClass+(i<2?i+1:3));}// Add new column sorting
for(i=0,ien=sort.length;i<ien;i++){colIdx=sort[i].src;$(_pluck(settings.aoData,'anCells',colIdx)).addClass(sortClass+(i<2?i+1:3));}}settings.aLastSort=sort;}// Get the data to sort a column, be it from cache, fresh (populating the
// cache), or from a sort formatter
function _fnSortData(settings,idx){// Custom sorting function - provided by the sort data type
var column=settings.aoColumns[idx];var customSort=DataTable.ext.order[column.sSortDataType];var customData;if(customSort){customData=customSort.call(settings.oInstance,settings,idx,_fnColumnIndexToVisible(settings,idx));}// Use / populate cache
var row,cellData;var formatter=DataTable.ext.type.order[column.sType+"-pre"];for(var i=0,ien=settings.aoData.length;i<ien;i++){row=settings.aoData[i];if(!row._aSortData){row._aSortData=[];}if(!row._aSortData[idx]||customSort){cellData=customSort?customData[i]:// If there was a custom sort function, use data from there
_fnGetCellData(settings,i,idx,'sort');row._aSortData[idx]=formatter?formatter(cellData):cellData;}}}/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */function _fnSaveState(settings){if(!settings.oFeatures.bStateSave||settings.bDestroying){return;}/* Store the interesting variables */var state={time:+new Date(),start:settings._iDisplayStart,length:settings._iDisplayLength,order:$.extend(true,[],settings.aaSorting),search:_fnSearchToCamel(settings.oPreviousSearch),columns:$.map(settings.aoColumns,function(col,i){return{visible:col.bVisible,search:_fnSearchToCamel(settings.aoPreSearchCols[i])};})};_fnCallbackFire(settings,"aoStateSaveParams",'stateSaveParams',[settings,state]);settings.oSavedState=state;settings.fnStateSaveCallback.call(settings.oInstance,settings,state);}/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */function _fnLoadState(settings,oInit,callback){var i,ien;var columns=settings.aoColumns;var loaded=function loaded(s){if(!s||!s.time){callback();return;}// Allow custom and plug-in manipulation functions to alter the saved data set and
// cancelling of loading by returning false
var abStateLoad=_fnCallbackFire(settings,'aoStateLoadParams','stateLoadParams',[settings,s]);if($.inArray(false,abStateLoad)!==-1){callback();return;}// Reject old data
var duration=settings.iStateDuration;if(duration>0&&s.time<+new Date()-duration*1000){callback();return;}// Number of columns have changed - all bets are off, no restore of settings
if(s.columns&&columns.length!==s.columns.length){callback();return;}// Store the saved state so it might be accessed at any time
settings.oLoadedState=$.extend(true,{},s);// Restore key features - todo - for 1.11 this needs to be done by
// subscribed events
if(s.start!==undefined){settings._iDisplayStart=s.start;settings.iInitDisplayStart=s.start;}if(s.length!==undefined){settings._iDisplayLength=s.length;}// Order
if(s.order!==undefined){settings.aaSorting=[];$.each(s.order,function(i,col){settings.aaSorting.push(col[0]>=columns.length?[0,col[1]]:col);});}// Search
if(s.search!==undefined){$.extend(settings.oPreviousSearch,_fnSearchToHung(s.search));}// Columns
//
if(s.columns){for(i=0,ien=s.columns.length;i<ien;i++){var col=s.columns[i];// Visibility
if(col.visible!==undefined){columns[i].bVisible=col.visible;}// Search
if(col.search!==undefined){$.extend(settings.aoPreSearchCols[i],_fnSearchToHung(col.search));}}}_fnCallbackFire(settings,'aoStateLoaded','stateLoaded',[settings,s]);callback();};if(!settings.oFeatures.bStateSave){callback();return;}var state=settings.fnStateLoadCallback.call(settings.oInstance,settings,loaded);if(state!==undefined){loaded(state);}// otherwise, wait for the loaded callback to be executed
}/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */function _fnSettingsFromNode(table){var settings=DataTable.settings;var idx=$.inArray(table,_pluck(settings,'nTable'));return idx!==-1?settings[idx]:null;}/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */function _fnLog(settings,level,msg,tn){msg='DataTables warning: '+(settings?'table id='+settings.sTableId+' - ':'')+msg;if(tn){msg+='. For more information about this error, please see '+'http://datatables.net/tn/'+tn;}if(!level){// Backwards compatibility pre 1.10
var ext=DataTable.ext;var type=ext.sErrMode||ext.errMode;if(settings){_fnCallbackFire(settings,null,'error',[settings,tn,msg]);}if(type=='alert'){alert(msg);}else if(type=='throw'){throw new Error(msg);}else if(typeof type=='function'){type(settings,tn,msg);}}else if(window.console&&console.log){console.log(msg);}}/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */function _fnMap(ret,src,name,mappedName){if($.isArray(name)){$.each(name,function(i,val){if($.isArray(val)){_fnMap(ret,src,val[0],val[1]);}else{_fnMap(ret,src,val);}});return;}if(mappedName===undefined){mappedName=name;}if(src[name]!==undefined){ret[mappedName]=src[name];}}/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */function _fnExtend(out,extender,breakRefs){var val;for(var prop in extender){if(extender.hasOwnProperty(prop)){val=extender[prop];if($.isPlainObject(val)){if(!$.isPlainObject(out[prop])){out[prop]={};}$.extend(true,out[prop],val);}else if(breakRefs&&prop!=='data'&&prop!=='aaData'&&$.isArray(val)){out[prop]=val.slice();}else{out[prop]=val;}}}return out;}/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */function _fnBindAction(n,oData,fn){$(n).on('click.DT',oData,function(e){n.blur();// Remove focus outline for mouse users
fn(e);}).on('keypress.DT',oData,function(e){if(e.which===13){e.preventDefault();fn(e);}}).on('selectstart.DT',function(){/* Take the brutal approach to cancelling text selection */return false;});}/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */function _fnCallbackReg(oSettings,sStore,fn,sName){if(fn){oSettings[sStore].push({"fn":fn,"sName":sName});}}/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */function _fnCallbackFire(settings,callbackArr,eventName,args){var ret=[];if(callbackArr){ret=$.map(settings[callbackArr].slice().reverse(),function(val,i){return val.fn.apply(settings.oInstance,args);});}if(eventName!==null){var e=$.Event(eventName+'.dt');$(settings.nTable).trigger(e,args);ret.push(e.result);}return ret;}function _fnLengthOverflow(settings){var start=settings._iDisplayStart,end=settings.fnDisplayEnd(),len=settings._iDisplayLength;/* If we have space to show extra rows (backing up from the end point - then do so */if(start>=end){start=end-len;}// Keep the start record on the current page
start-=start%len;if(len===-1||start<0){start=0;}settings._iDisplayStart=start;}function _fnRenderer(settings,type){var renderer=settings.renderer;var host=DataTable.ext.renderer[type];if($.isPlainObject(renderer)&&renderer[type]){// Specific renderer for this type. If available use it, otherwise use
// the default.
return host[renderer[type]]||host._;}else if(typeof renderer==='string'){// Common renderer - if there is one available for this type use it,
// otherwise use the default
return host[renderer]||host._;}// Use the default
return host._;}/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */function _fnDataSource(settings){if(settings.oFeatures.bServerSide){return'ssp';}else if(settings.ajax||settings.sAjaxSource){return'ajax';}return'dom';}/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */var __apiStruct=[];/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */var __arrayProto=Array.prototype;/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */var _toSettings=function _toSettings(mixed){var idx,jq;var settings=DataTable.settings;var tables=$.map(settings,function(el,i){return el.nTable;});if(!mixed){return[];}else if(mixed.nTable&&mixed.oApi){// DataTables settings object
return[mixed];}else if(mixed.nodeName&&mixed.nodeName.toLowerCase()==='table'){// Table node
idx=$.inArray(mixed,tables);return idx!==-1?[settings[idx]]:null;}else if(mixed&&typeof mixed.settings==='function'){return mixed.settings().toArray();}else if(typeof mixed==='string'){// jQuery selector
jq=$(mixed);}else if(mixed instanceof $){// jQuery object (also DataTables instance)
jq=mixed;}if(jq){return jq.map(function(i){idx=$.inArray(this,tables);return idx!==-1?settings[idx]:null;}).toArray();}};/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */_Api2=function _Api(context,data){if(!(this instanceof _Api2)){return new _Api2(context,data);}var settings=[];var ctxSettings=function ctxSettings(o){var a=_toSettings(o);if(a){settings=settings.concat(a);}};if($.isArray(context)){for(var i=0,ien=context.length;i<ien;i++){ctxSettings(context[i]);}}else{ctxSettings(context);}// Remove duplicates
this.context=_unique(settings);// Initial data
if(data){$.merge(this,data);}// selector
this.selector={rows:null,cols:null,opts:null};_Api2.extend(this,this,__apiStruct);};DataTable.Api=_Api2;// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
// isPlainObject.
$.extend(_Api2.prototype,{any:function any(){return this.count()!==0;},concat:__arrayProto.concat,context:[],// array of table settings objects
count:function count(){return this.flatten().length;},each:function each(fn){for(var i=0,ien=this.length;i<ien;i++){fn.call(this,this[i],i,this);}return this;},eq:function eq(idx){var ctx=this.context;return ctx.length>idx?new _Api2(ctx[idx],this[idx]):null;},filter:function filter(fn){var a=[];if(__arrayProto.filter){a=__arrayProto.filter.call(this,fn,this);}else{// Compatibility for browsers without EMCA-252-5 (JS 1.6)
for(var i=0,ien=this.length;i<ien;i++){if(fn.call(this,this[i],i,this)){a.push(this[i]);}}}return new _Api2(this.context,a);},flatten:function flatten(){var a=[];return new _Api2(this.context,a.concat.apply(a,this.toArray()));},join:__arrayProto.join,indexOf:__arrayProto.indexOf||function(obj,start){for(var i=start||0,ien=this.length;i<ien;i++){if(this[i]===obj){return i;}}return-1;},iterator:function iterator(flatten,type,fn,alwaysNew){var a=[],ret,i,ien,j,jen,context=this.context,rows,items,item,selector=this.selector;// Argument shifting
if(typeof flatten==='string'){alwaysNew=fn;fn=type;type=flatten;flatten=false;}for(i=0,ien=context.length;i<ien;i++){var apiInst=new _Api2(context[i]);if(type==='table'){ret=fn.call(apiInst,context[i],i);if(ret!==undefined){a.push(ret);}}else if(type==='columns'||type==='rows'){// this has same length as context - one entry for each table
ret=fn.call(apiInst,context[i],this[i],i);if(ret!==undefined){a.push(ret);}}else if(type==='column'||type==='column-rows'||type==='row'||type==='cell'){// columns and rows share the same structure.
// 'this' is an array of column indexes for each context
items=this[i];if(type==='column-rows'){rows=_selector_row_indexes(context[i],selector.opts);}for(j=0,jen=items.length;j<jen;j++){item=items[j];if(type==='cell'){ret=fn.call(apiInst,context[i],item.row,item.column,i,j);}else{ret=fn.call(apiInst,context[i],item,i,j,rows);}if(ret!==undefined){a.push(ret);}}}}if(a.length||alwaysNew){var api=new _Api2(context,flatten?a.concat.apply([],a):a);var apiSelector=api.selector;apiSelector.rows=selector.rows;apiSelector.cols=selector.cols;apiSelector.opts=selector.opts;return api;}return this;},lastIndexOf:__arrayProto.lastIndexOf||function(obj,start){// Bit cheeky...
return this.indexOf.apply(this.toArray.reverse(),arguments);},length:0,map:function map(fn){var a=[];if(__arrayProto.map){a=__arrayProto.map.call(this,fn,this);}else{// Compatibility for browsers without EMCA-252-5 (JS 1.6)
for(var i=0,ien=this.length;i<ien;i++){a.push(fn.call(this,this[i],i));}}return new _Api2(this.context,a);},pluck:function pluck(prop){return this.map(function(el){return el[prop];});},pop:__arrayProto.pop,push:__arrayProto.push,// Does not return an API instance
reduce:__arrayProto.reduce||function(fn,init){return _fnReduce(this,fn,init,0,this.length,1);},reduceRight:__arrayProto.reduceRight||function(fn,init){return _fnReduce(this,fn,init,this.length-1,-1,-1);},reverse:__arrayProto.reverse,// Object with rows, columns and opts
selector:null,shift:__arrayProto.shift,slice:function slice(){return new _Api2(this.context,this);},sort:__arrayProto.sort,// ? name - order?
splice:__arrayProto.splice,toArray:function toArray(){return __arrayProto.slice.call(this);},to$:function to$(){return $(this);},toJQuery:function toJQuery(){return $(this);},unique:function unique(){return new _Api2(this.context,_unique(this));},unshift:__arrayProto.unshift});_Api2.extend=function(scope,obj,ext){// Only extend API instances and static properties of the API
if(!ext.length||!obj||!(obj instanceof _Api2)&&!obj.__dt_wrapper){return;}var i,ien,j,jen,struct,inner,methodScoping=function methodScoping(scope,fn,struc){return function(){var ret=fn.apply(scope,arguments);// Method extension
_Api2.extend(ret,ret,struc.methodExt);return ret;};};for(i=0,ien=ext.length;i<ien;i++){struct=ext[i];// Value
obj[struct.name]=typeof struct.val==='function'?methodScoping(scope,struct.val,struct):$.isPlainObject(struct.val)?{}:struct.val;obj[struct.name].__dt_wrapper=true;// Property extension
_Api2.extend(scope,obj[struct.name],struct.propExt);}};// @todo - Is there need for an augment function?
// _Api.augment = function ( inst, name )
// {
// 	// Find src object in the structure from the name
// 	var parts = name.split('.');
// 	_Api.extend( inst, obj );
// };
//     [
//       {
//         name:      'data'                -- string   - Property name
//         val:       function () {},       -- function - Api method (or undefined if just an object
//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
//       },
//       {
//         name:     'row'
//         val:       {},
//         methodExt: [ ... ],
//         propExt:   [
//           {
//             name:      'data'
//             val:       function () {},
//             methodExt: [ ... ],
//             propExt:   [ ... ]
//           },
//           ...
//         ]
//       }
//     ]
_Api2.register=_api_register=function _api_register(name,val){if($.isArray(name)){for(var j=0,jen=name.length;j<jen;j++){_Api2.register(name[j],val);}return;}var i,ien,heir=name.split('.'),struct=__apiStruct,key,method;var find=function find(src,name){for(var i=0,ien=src.length;i<ien;i++){if(src[i].name===name){return src[i];}}return null;};for(i=0,ien=heir.length;i<ien;i++){method=heir[i].indexOf('()')!==-1;key=method?heir[i].replace('()',''):heir[i];var src=find(struct,key);if(!src){src={name:key,val:{},methodExt:[],propExt:[]};struct.push(src);}if(i===ien-1){src.val=val;}else{struct=method?src.methodExt:src.propExt;}}};_Api2.registerPlural=_api_registerPlural=function _api_registerPlural(pluralName,singularName,val){_Api2.register(pluralName,val);_Api2.register(singularName,function(){var ret=val.apply(this,arguments);if(ret===this){// Returned item is the API instance that was passed in, return it
return this;}else if(ret instanceof _Api2){// New API instance returned, want the value from the first item
// in the returned array for the singular result.
return ret.length?$.isArray(ret[0])?new _Api2(ret.context,ret[0]):// Array results are 'enhanced'
ret[0]:undefined;}// Non-API return - just fire it back
return ret;});};/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */var __table_selector=function __table_selector(selector,a){// Integer is used to pick out a table by index
if(typeof selector==='number'){return[a[selector]];}// Perform a jQuery selector on the table nodes
var nodes=$.map(a,function(el,i){return el.nTable;});return $(nodes).filter(selector).map(function(i){// Need to translate back from the table node to the settings
var idx=$.inArray(this,nodes);return a[idx];}).toArray();};/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */_api_register('tables()',function(selector){// A new instance is created if there was a selector specified
return selector?new _Api2(__table_selector(selector,this.context)):this;});_api_register('table()',function(selector){var tables=this.tables(selector);var ctx=tables.context;// Truncate to the first matched table
return ctx.length?new _Api2(ctx[0]):tables;});_api_registerPlural('tables().nodes()','table().node()',function(){return this.iterator('table',function(ctx){return ctx.nTable;},1);});_api_registerPlural('tables().body()','table().body()',function(){return this.iterator('table',function(ctx){return ctx.nTBody;},1);});_api_registerPlural('tables().header()','table().header()',function(){return this.iterator('table',function(ctx){return ctx.nTHead;},1);});_api_registerPlural('tables().footer()','table().footer()',function(){return this.iterator('table',function(ctx){return ctx.nTFoot;},1);});_api_registerPlural('tables().containers()','table().container()',function(){return this.iterator('table',function(ctx){return ctx.nTableWrapper;},1);});/**
	 * Redraw the tables in the current context.
	 */_api_register('draw()',function(paging){return this.iterator('table',function(settings){if(paging==='page'){_fnDraw(settings);}else{if(typeof paging==='string'){paging=paging==='full-hold'?false:true;}_fnReDraw(settings,paging===false);}});});/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 */ /**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */_api_register('page()',function(action){if(action===undefined){return this.page.info().page;// not an expensive call
}// else, have an action to take on all tables
return this.iterator('table',function(settings){_fnPageChange(settings,action);});});/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */_api_register('page.info()',function(action){if(this.context.length===0){return undefined;}var settings=this.context[0],start=settings._iDisplayStart,len=settings.oFeatures.bPaginate?settings._iDisplayLength:-1,visRecords=settings.fnRecordsDisplay(),all=len===-1;return{"page":all?0:Math.floor(start/len),"pages":all?1:Math.ceil(visRecords/len),"start":start,"end":settings.fnDisplayEnd(),"length":len,"recordsTotal":settings.fnRecordsTotal(),"recordsDisplay":visRecords,"serverSide":_fnDataSource(settings)==='ssp'};});/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 */ /**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */_api_register('page.len()',function(len){// Note that we can't call this function 'length()' because `length`
// is a Javascript property of functions which defines how many arguments
// the function expects.
if(len===undefined){return this.context.length!==0?this.context[0]._iDisplayLength:undefined;}// else, set the page length
return this.iterator('table',function(settings){_fnLengthChange(settings,len);});});var __reload=function __reload(settings,holdPosition,callback){// Use the draw event to trigger a callback
if(callback){var api=new _Api2(settings);api.one('draw',function(){callback(api.ajax.json());});}if(_fnDataSource(settings)=='ssp'){_fnReDraw(settings,holdPosition);}else{_fnProcessingDisplay(settings,true);// Cancel an existing request
var xhr=settings.jqXHR;if(xhr&&xhr.readyState!==4){xhr.abort();}// Trigger xhr
_fnBuildAjax(settings,[],function(json){_fnClearTable(settings);var data=_fnAjaxDataSrc(settings,json);for(var i=0,ien=data.length;i<ien;i++){_fnAddData(settings,data[i]);}_fnReDraw(settings,holdPosition);_fnProcessingDisplay(settings,false);});}};/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */_api_register('ajax.json()',function(){var ctx=this.context;if(ctx.length>0){return ctx[0].json;}// else return undefined;
});/**
	 * Get the data submitted in the last Ajax request
	 */_api_register('ajax.params()',function(){var ctx=this.context;if(ctx.length>0){return ctx[0].oAjaxData;}// else return undefined;
});/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */_api_register('ajax.reload()',function(callback,resetPaging){return this.iterator('table',function(settings){__reload(settings,resetPaging===false,callback);});});/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 */ /**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */_api_register('ajax.url()',function(url){var ctx=this.context;if(url===undefined){// get
if(ctx.length===0){return undefined;}ctx=ctx[0];return ctx.ajax?$.isPlainObject(ctx.ajax)?ctx.ajax.url:ctx.ajax:ctx.sAjaxSource;}// set
return this.iterator('table',function(settings){if($.isPlainObject(settings.ajax)){settings.ajax.url=url;}else{settings.ajax=url;}// No need to consider sAjaxSource here since DataTables gives priority
// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
// value of `sAjaxSource` redundant.
});});/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */_api_register('ajax.url().load()',function(callback,resetPaging){// Same as a reload, but makes sense to present it for easy access after a
// url change
return this.iterator('table',function(ctx){__reload(ctx,resetPaging===false,callback);});});var _selector_run=function _selector_run(type,selector,selectFn,settings,opts){var out=[],res,a,i,ien,j,jen,selectorType=_typeof(selector);// Can't just check for isArray here, as an API or jQuery instance might be
// given with their array like look
if(!selector||selectorType==='string'||selectorType==='function'||selector.length===undefined){selector=[selector];}for(i=0,ien=selector.length;i<ien;i++){// Only split on simple strings - complex expressions will be jQuery selectors
a=selector[i]&&selector[i].split&&!selector[i].match(/[\[\(:]/)?selector[i].split(','):[selector[i]];for(j=0,jen=a.length;j<jen;j++){res=selectFn(typeof a[j]==='string'?$.trim(a[j]):a[j]);if(res&&res.length){out=out.concat(res);}}}// selector extensions
var ext=_ext.selector[type];if(ext.length){for(i=0,ien=ext.length;i<ien;i++){out=ext[i](settings,opts,out);}}return _unique(out);};var _selector_opts=function _selector_opts(opts){if(!opts){opts={};}// Backwards compatibility for 1.9- which used the terminology filter rather
// than search
if(opts.filter&&opts.search===undefined){opts.search=opts.filter;}return $.extend({search:'none',order:'current',page:'all'},opts);};var _selector_first=function _selector_first(inst){// Reduce the API instance to the first item found
for(var i=0,ien=inst.length;i<ien;i++){if(inst[i].length>0){// Assign the first element to the first item in the instance
// and truncate the instance and context
inst[0]=inst[i];inst[0].length=1;inst.length=1;inst.context=[inst.context[i]];return inst;}}// Not found - return an empty instance
inst.length=0;return inst;};var _selector_row_indexes=function _selector_row_indexes(settings,opts){var i,ien,tmp,a=[],displayFiltered=settings.aiDisplay,displayMaster=settings.aiDisplayMaster;var search=opts.search,// none, applied, removed
order=opts.order,// applied, current, index (original - compatibility with 1.9)
page=opts.page;// all, current
if(_fnDataSource(settings)=='ssp'){// In server-side processing mode, most options are irrelevant since
// rows not shown don't exist and the index order is the applied order
// Removed is a special case - for consistency just return an empty
// array
return search==='removed'?[]:_range(0,displayMaster.length);}else if(page=='current'){// Current page implies that order=current and fitler=applied, since it is
// fairly senseless otherwise, regardless of what order and search actually
// are
for(i=settings._iDisplayStart,ien=settings.fnDisplayEnd();i<ien;i++){a.push(displayFiltered[i]);}}else if(order=='current'||order=='applied'){a=search=='none'?displayMaster.slice():// no search
search=='applied'?displayFiltered.slice():// applied search
$.map(displayMaster,function(el,i){// removed search
return $.inArray(el,displayFiltered)===-1?el:null;});}else if(order=='index'||order=='original'){for(i=0,ien=settings.aoData.length;i<ien;i++){if(search=='none'){a.push(i);}else{// applied | removed
tmp=$.inArray(i,displayFiltered);if(tmp===-1&&search=='removed'||tmp>=0&&search=='applied'){a.push(i);}}}}return a;};/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */var __row_selector=function __row_selector(settings,selector,opts){var rows;var run=function run(sel){var selInt=_intVal(sel);var i,ien;// Short cut - selector is a number and no options provided (default is
// all records, so no need to check if the index is in there, since it
// must be - dev error if the index doesn't exist).
if(selInt!==null&&!opts){return[selInt];}if(!rows){rows=_selector_row_indexes(settings,opts);}if(selInt!==null&&$.inArray(selInt,rows)!==-1){// Selector - integer
return[selInt];}else if(sel===null||sel===undefined||sel===''){// Selector - none
return rows;}// Selector - function
if(typeof sel==='function'){return $.map(rows,function(idx){var row=settings.aoData[idx];return sel(idx,row._aData,row.nTr)?idx:null;});}// Get nodes in the order from the `rows` array with null values removed
var nodes=_removeEmpty(_pluck_order(settings.aoData,rows,'nTr'));// Selector - node
if(sel.nodeName){if(sel._DT_RowIndex!==undefined){return[sel._DT_RowIndex];// Property added by DT for fast lookup
}else if(sel._DT_CellIndex){return[sel._DT_CellIndex.row];}else{var host=$(sel).closest('*[data-dt-row]');return host.length?[host.data('dt-row')]:[];}}// ID selector. Want to always be able to select rows by id, regardless
// of if the tr element has been created or not, so can't rely upon
// jQuery here - hence a custom implementation. This does not match
// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
// but to select it using a CSS selector engine (like Sizzle or
// querySelect) it would need to need to be escaped for some characters.
// DataTables simplifies this for row selectors since you can select
// only a row. A # indicates an id any anything that follows is the id -
// unescaped.
if(typeof sel==='string'&&sel.charAt(0)==='#'){// get row index from id
var rowObj=settings.aIds[sel.replace(/^#/,'')];if(rowObj!==undefined){return[rowObj.idx];}// need to fall through to jQuery in case there is DOM id that
// matches
}// Selector - jQuery selector string, array of nodes or jQuery object/
// As jQuery's .filter() allows jQuery objects to be passed in filter,
// it also allows arrays, so this will cope with all three options
return $(nodes).filter(sel).map(function(){return this._DT_RowIndex;}).toArray();};return _selector_run('row',selector,run,settings,opts);};_api_register('rows()',function(selector,opts){// argument shifting
if(selector===undefined){selector='';}else if($.isPlainObject(selector)){opts=selector;selector='';}opts=_selector_opts(opts);var inst=this.iterator('table',function(settings){return __row_selector(settings,selector,opts);},1);// Want argument shifting here and in __row_selector?
inst.selector.rows=selector;inst.selector.opts=opts;return inst;});_api_register('rows().nodes()',function(){return this.iterator('row',function(settings,row){return settings.aoData[row].nTr||undefined;},1);});_api_register('rows().data()',function(){return this.iterator(true,'rows',function(settings,rows){return _pluck_order(settings.aoData,rows,'_aData');},1);});_api_registerPlural('rows().cache()','row().cache()',function(type){return this.iterator('row',function(settings,row){var r=settings.aoData[row];return type==='search'?r._aFilterData:r._aSortData;},1);});_api_registerPlural('rows().invalidate()','row().invalidate()',function(src){return this.iterator('row',function(settings,row){_fnInvalidate(settings,row,src);});});_api_registerPlural('rows().indexes()','row().index()',function(){return this.iterator('row',function(settings,row){return row;},1);});_api_registerPlural('rows().ids()','row().id()',function(hash){var a=[];var context=this.context;// `iterator` will drop undefined values, but in this case we want them
for(var i=0,ien=context.length;i<ien;i++){for(var j=0,jen=this[i].length;j<jen;j++){var id=context[i].rowIdFn(context[i].aoData[this[i][j]]._aData);a.push((hash===true?'#':'')+id);}}return new _Api2(context,a);});_api_registerPlural('rows().remove()','row().remove()',function(){var that=this;this.iterator('row',function(settings,row,thatIdx){var data=settings.aoData;var rowData=data[row];var i,ien,j,jen;var loopRow,loopCells;data.splice(row,1);// Update the cached indexes
for(i=0,ien=data.length;i<ien;i++){loopRow=data[i];loopCells=loopRow.anCells;// Rows
if(loopRow.nTr!==null){loopRow.nTr._DT_RowIndex=i;}// Cells
if(loopCells!==null){for(j=0,jen=loopCells.length;j<jen;j++){loopCells[j]._DT_CellIndex.row=i;}}}// Delete from the display arrays
_fnDeleteIndex(settings.aiDisplayMaster,row);_fnDeleteIndex(settings.aiDisplay,row);_fnDeleteIndex(that[thatIdx],row,false);// maintain local indexes
// For server-side processing tables - subtract the deleted row from the count
if(settings._iRecordsDisplay>0){settings._iRecordsDisplay--;}// Check for an 'overflow' they case for displaying the table
_fnLengthOverflow(settings);// Remove the row's ID reference if there is one
var id=settings.rowIdFn(rowData._aData);if(id!==undefined){delete settings.aIds[id];}});this.iterator('table',function(settings){for(var i=0,ien=settings.aoData.length;i<ien;i++){settings.aoData[i].idx=i;}});return this;});_api_register('rows.add()',function(rows){var newRows=this.iterator('table',function(settings){var row,i,ien;var out=[];for(i=0,ien=rows.length;i<ien;i++){row=rows[i];if(row.nodeName&&row.nodeName.toUpperCase()==='TR'){out.push(_fnAddTr(settings,row)[0]);}else{out.push(_fnAddData(settings,row));}}return out;},1);// Return an Api.rows() extended instance, so rows().nodes() etc can be used
var modRows=this.rows(-1);modRows.pop();$.merge(modRows,newRows);return modRows;});/**
	 *
	 */_api_register('row()',function(selector,opts){return _selector_first(this.rows(selector,opts));});_api_register('row().data()',function(data){var ctx=this.context;if(data===undefined){// Get
return ctx.length&&this.length?ctx[0].aoData[this[0]]._aData:undefined;}// Set
ctx[0].aoData[this[0]]._aData=data;// Automatically invalidate
_fnInvalidate(ctx[0],this[0],'data');return this;});_api_register('row().node()',function(){var ctx=this.context;return ctx.length&&this.length?ctx[0].aoData[this[0]].nTr||null:null;});_api_register('row.add()',function(row){// Allow a jQuery object to be passed in - only a single row is added from
// it though - the first element in the set
if(row instanceof $&&row.length){row=row[0];}var rows=this.iterator('table',function(settings){if(row.nodeName&&row.nodeName.toUpperCase()==='TR'){return _fnAddTr(settings,row)[0];}return _fnAddData(settings,row);});// Return an Api.rows() extended instance, with the newly added row selected
return this.row(rows[0]);});var __details_add=function __details_add(ctx,row,data,klass){// Convert to array of TR elements
var rows=[];var addRow=function addRow(r,k){// Recursion to allow for arrays of jQuery objects
if($.isArray(r)||r instanceof $){for(var i=0,ien=r.length;i<ien;i++){addRow(r[i],k);}return;}// If we get a TR element, then just add it directly - up to the dev
// to add the correct number of columns etc
if(r.nodeName&&r.nodeName.toLowerCase()==='tr'){rows.push(r);}else{// Otherwise create a row with a wrapper
var created=$('<tr><td/></tr>').addClass(k);$('td',created).addClass(k).html(r)[0].colSpan=_fnVisbleColumns(ctx);rows.push(created[0]);}};addRow(data,klass);if(row._details){row._details.detach();}row._details=$(rows);// If the children were already shown, that state should be retained
if(row._detailsShow){row._details.insertAfter(row.nTr);}};var __details_remove=function __details_remove(api,idx){var ctx=api.context;if(ctx.length){var row=ctx[0].aoData[idx!==undefined?idx:api[0]];if(row&&row._details){row._details.remove();row._detailsShow=undefined;row._details=undefined;}}};var __details_display=function __details_display(api,show){var ctx=api.context;if(ctx.length&&api.length){var row=ctx[0].aoData[api[0]];if(row._details){row._detailsShow=show;if(show){row._details.insertAfter(row.nTr);}else{row._details.detach();}__details_events(ctx[0]);}}};var __details_events=function __details_events(settings){var api=new _Api2(settings);var namespace='.dt.DT_details';var drawEvent='draw'+namespace;var colvisEvent='column-visibility'+namespace;var destroyEvent='destroy'+namespace;var data=settings.aoData;api.off(drawEvent+' '+colvisEvent+' '+destroyEvent);if(_pluck(data,'_details').length>0){// On each draw, insert the required elements into the document
api.on(drawEvent,function(e,ctx){if(settings!==ctx){return;}api.rows({page:'current'}).eq(0).each(function(idx){// Internal data grab
var row=data[idx];if(row._detailsShow){row._details.insertAfter(row.nTr);}});});// Column visibility change - update the colspan
api.on(colvisEvent,function(e,ctx,idx,vis){if(settings!==ctx){return;}// Update the colspan for the details rows (note, only if it already has
// a colspan)
var row,visible=_fnVisbleColumns(ctx);for(var i=0,ien=data.length;i<ien;i++){row=data[i];if(row._details){row._details.children('td[colspan]').attr('colspan',visible);}}});// Table destroyed - nuke any child rows
api.on(destroyEvent,function(e,ctx){if(settings!==ctx){return;}for(var i=0,ien=data.length;i<ien;i++){if(data[i]._details){__details_remove(api,i);}}});}};// Strings for the method names to help minification
var _emp='';var _child_obj=_emp+'row().child';var _child_mth=_child_obj+'()';// data can be:
//  tr
//  string
//  jQuery or array of any of the above
_api_register(_child_mth,function(data,klass){var ctx=this.context;if(data===undefined){// get
return ctx.length&&this.length?ctx[0].aoData[this[0]]._details:undefined;}else if(data===true){// show
this.child.show();}else if(data===false){// remove
__details_remove(this);}else if(ctx.length&&this.length){// set
__details_add(ctx[0],ctx[0].aoData[this[0]],data,klass);}return this;});_api_register([_child_obj+'.show()',_child_mth+'.show()'// only when `child()` was called with parameters (without
],function(show){// it returns an object and this method is not executed)
__details_display(this,true);return this;});_api_register([_child_obj+'.hide()',_child_mth+'.hide()'// only when `child()` was called with parameters (without
],function(){// it returns an object and this method is not executed)
__details_display(this,false);return this;});_api_register([_child_obj+'.remove()',_child_mth+'.remove()'// only when `child()` was called with parameters (without
],function(){// it returns an object and this method is not executed)
__details_remove(this);return this;});_api_register(_child_obj+'.isShown()',function(){var ctx=this.context;if(ctx.length&&this.length){// _detailsShown as false or undefined will fall through to return false
return ctx[0].aoData[this[0]]._detailsShow||false;}return false;});/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */ // can be an array of these items, comma separated list, or an array of comma
// separated lists
var __re_column_selector=/^([^:]+):(name|visIdx|visible)$/;// r1 and r2 are redundant - but it means that the parameters match for the
// iterator callback in columns().data()
var __columnData=function __columnData(settings,column,r1,r2,rows){var a=[];for(var row=0,ien=rows.length;row<ien;row++){a.push(_fnGetCellData(settings,rows[row],column));}return a;};var __column_selector=function __column_selector(settings,selector,opts){var columns=settings.aoColumns,names=_pluck(columns,'sName'),nodes=_pluck(columns,'nTh');var run=function run(s){var selInt=_intVal(s);// Selector - all
if(s===''){return _range(columns.length);}// Selector - index
if(selInt!==null){return[selInt>=0?selInt:// Count from left
columns.length+selInt// Count from right (+ because its a negative value)
];}// Selector = function
if(typeof s==='function'){var rows=_selector_row_indexes(settings,opts);return $.map(columns,function(col,idx){return s(idx,__columnData(settings,idx,0,0,rows),nodes[idx])?idx:null;});}// jQuery or string selector
var match=typeof s==='string'?s.match(__re_column_selector):'';if(match){switch(match[2]){case'visIdx':case'visible':var idx=parseInt(match[1],10);// Visible index given, convert to column index
if(idx<0){// Counting from the right
var visColumns=$.map(columns,function(col,i){return col.bVisible?i:null;});return[visColumns[visColumns.length+idx]];}// Counting from the left
return[_fnVisibleToColumnIndex(settings,idx)];case'name':// match by name. `names` is column index complete and in order
return $.map(names,function(name,i){return name===match[1]?i:null;});default:return[];}}// Cell in the table body
if(s.nodeName&&s._DT_CellIndex){return[s._DT_CellIndex.column];}// jQuery selector on the TH elements for the columns
var jqResult=$(nodes).filter(s).map(function(){return $.inArray(this,nodes);// `nodes` is column index complete and in order
}).toArray();if(jqResult.length||!s.nodeName){return jqResult;}// Otherwise a node which might have a `dt-column` data attribute, or be
// a child or such an element
var host=$(s).closest('*[data-dt-column]');return host.length?[host.data('dt-column')]:[];};return _selector_run('column',selector,run,settings,opts);};var __setColumnVis=function __setColumnVis(settings,column,vis){var cols=settings.aoColumns,col=cols[column],data=settings.aoData,row,cells,i,ien,tr;// Get
if(vis===undefined){return col.bVisible;}// Set
// No change
if(col.bVisible===vis){return;}if(vis){// Insert column
// Need to decide if we should use appendChild or insertBefore
var insertBefore=$.inArray(true,_pluck(cols,'bVisible'),column+1);for(i=0,ien=data.length;i<ien;i++){tr=data[i].nTr;cells=data[i].anCells;if(tr){// insertBefore can act like appendChild if 2nd arg is null
tr.insertBefore(cells[column],cells[insertBefore]||null);}}}else{// Remove column
$(_pluck(settings.aoData,'anCells',column)).detach();}// Common actions
col.bVisible=vis;_fnDrawHead(settings,settings.aoHeader);_fnDrawHead(settings,settings.aoFooter);_fnSaveState(settings);};_api_register('columns()',function(selector,opts){// argument shifting
if(selector===undefined){selector='';}else if($.isPlainObject(selector)){opts=selector;selector='';}opts=_selector_opts(opts);var inst=this.iterator('table',function(settings){return __column_selector(settings,selector,opts);},1);// Want argument shifting here and in _row_selector?
inst.selector.cols=selector;inst.selector.opts=opts;return inst;});_api_registerPlural('columns().header()','column().header()',function(selector,opts){return this.iterator('column',function(settings,column){return settings.aoColumns[column].nTh;},1);});_api_registerPlural('columns().footer()','column().footer()',function(selector,opts){return this.iterator('column',function(settings,column){return settings.aoColumns[column].nTf;},1);});_api_registerPlural('columns().data()','column().data()',function(){return this.iterator('column-rows',__columnData,1);});_api_registerPlural('columns().dataSrc()','column().dataSrc()',function(){return this.iterator('column',function(settings,column){return settings.aoColumns[column].mData;},1);});_api_registerPlural('columns().cache()','column().cache()',function(type){return this.iterator('column-rows',function(settings,column,i,j,rows){return _pluck_order(settings.aoData,rows,type==='search'?'_aFilterData':'_aSortData',column);},1);});_api_registerPlural('columns().nodes()','column().nodes()',function(){return this.iterator('column-rows',function(settings,column,i,j,rows){return _pluck_order(settings.aoData,rows,'anCells',column);},1);});_api_registerPlural('columns().visible()','column().visible()',function(vis,calc){var ret=this.iterator('column',function(settings,column){if(vis===undefined){return settings.aoColumns[column].bVisible;}// else
__setColumnVis(settings,column,vis);});// Group the column visibility changes
if(vis!==undefined){// Second loop once the first is done for events
this.iterator('column',function(settings,column){_fnCallbackFire(settings,null,'column-visibility',[settings,column,vis,calc]);});if(calc===undefined||calc){this.columns.adjust();}}return ret;});_api_registerPlural('columns().indexes()','column().index()',function(type){return this.iterator('column',function(settings,column){return type==='visible'?_fnColumnIndexToVisible(settings,column):column;},1);});_api_register('columns.adjust()',function(){return this.iterator('table',function(settings){_fnAdjustColumnSizing(settings);},1);});_api_register('column.index()',function(type,idx){if(this.context.length!==0){var ctx=this.context[0];if(type==='fromVisible'||type==='toData'){return _fnVisibleToColumnIndex(ctx,idx);}else if(type==='fromData'||type==='toVisible'){return _fnColumnIndexToVisible(ctx,idx);}}});_api_register('column()',function(selector,opts){return _selector_first(this.columns(selector,opts));});var __cell_selector=function __cell_selector(settings,selector,opts){var data=settings.aoData;var rows=_selector_row_indexes(settings,opts);var cells=_removeEmpty(_pluck_order(data,rows,'anCells'));var allCells=$([].concat.apply([],cells));var row;var columns=settings.aoColumns.length;var a,i,ien,j,o,host;var run=function run(s){var fnSelector=typeof s==='function';if(s===null||s===undefined||fnSelector){// All cells and function selectors
a=[];for(i=0,ien=rows.length;i<ien;i++){row=rows[i];for(j=0;j<columns;j++){o={row:row,column:j};if(fnSelector){// Selector - function
host=data[row];if(s(o,_fnGetCellData(settings,row,j),host.anCells?host.anCells[j]:null)){a.push(o);}}else{// Selector - all
a.push(o);}}}return a;}// Selector - index
if($.isPlainObject(s)){return[s];}// Selector - jQuery filtered cells
var jqResult=allCells.filter(s).map(function(i,el){return{// use a new object, in case someone changes the values
row:el._DT_CellIndex.row,column:el._DT_CellIndex.column};}).toArray();if(jqResult.length||!s.nodeName){return jqResult;}// Otherwise the selector is a node, and there is one last option - the
// element might be a child of an element which has dt-row and dt-column
// data attributes
host=$(s).closest('*[data-dt-row]');return host.length?[{row:host.data('dt-row'),column:host.data('dt-column')}]:[];};return _selector_run('cell',selector,run,settings,opts);};_api_register('cells()',function(rowSelector,columnSelector,opts){// Argument shifting
if($.isPlainObject(rowSelector)){// Indexes
if(rowSelector.row===undefined){// Selector options in first parameter
opts=rowSelector;rowSelector=null;}else{// Cell index objects in first parameter
opts=columnSelector;columnSelector=null;}}if($.isPlainObject(columnSelector)){opts=columnSelector;columnSelector=null;}// Cell selector
if(columnSelector===null||columnSelector===undefined){return this.iterator('table',function(settings){return __cell_selector(settings,rowSelector,_selector_opts(opts));});}// Row + column selector
var columns=this.columns(columnSelector,opts);var rows=this.rows(rowSelector,opts);var a,i,ien,j,jen;var cells=this.iterator('table',function(settings,idx){a=[];for(i=0,ien=rows[idx].length;i<ien;i++){for(j=0,jen=columns[idx].length;j<jen;j++){a.push({row:rows[idx][i],column:columns[idx][j]});}}return a;},1);$.extend(cells.selector,{cols:columnSelector,rows:rowSelector,opts:opts});return cells;});_api_registerPlural('cells().nodes()','cell().node()',function(){return this.iterator('cell',function(settings,row,column){var data=settings.aoData[row];return data&&data.anCells?data.anCells[column]:undefined;},1);});_api_register('cells().data()',function(){return this.iterator('cell',function(settings,row,column){return _fnGetCellData(settings,row,column);},1);});_api_registerPlural('cells().cache()','cell().cache()',function(type){type=type==='search'?'_aFilterData':'_aSortData';return this.iterator('cell',function(settings,row,column){return settings.aoData[row][type][column];},1);});_api_registerPlural('cells().render()','cell().render()',function(type){return this.iterator('cell',function(settings,row,column){return _fnGetCellData(settings,row,column,type);},1);});_api_registerPlural('cells().indexes()','cell().index()',function(){return this.iterator('cell',function(settings,row,column){return{row:row,column:column,columnVisible:_fnColumnIndexToVisible(settings,column)};},1);});_api_registerPlural('cells().invalidate()','cell().invalidate()',function(src){return this.iterator('cell',function(settings,row,column){_fnInvalidate(settings,row,src,column);});});_api_register('cell()',function(rowSelector,columnSelector,opts){return _selector_first(this.cells(rowSelector,columnSelector,opts));});_api_register('cell().data()',function(data){var ctx=this.context;var cell=this[0];if(data===undefined){// Get
return ctx.length&&cell.length?_fnGetCellData(ctx[0],cell[0].row,cell[0].column):undefined;}// Set
_fnSetCellData(ctx[0],cell[0].row,cell[0].column,data);_fnInvalidate(ctx[0],cell[0].row,'data',cell[0].column);return this;});/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 */ /**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 */ /**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 */ /**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */_api_register('order()',function(order,dir){var ctx=this.context;if(order===undefined){// get
return ctx.length!==0?ctx[0].aaSorting:undefined;}// set
if(typeof order==='number'){// Simple column / direction passed in
order=[[order,dir]];}else if(order.length&&!$.isArray(order[0])){// Arguments passed in (list of 1D arrays)
order=Array.prototype.slice.call(arguments);}// otherwise a 2D array was passed in
return this.iterator('table',function(settings){settings.aaSorting=order.slice();});});/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */_api_register('order.listener()',function(node,column,callback){return this.iterator('table',function(settings){_fnSortAttachListener(settings,node,column,callback);});});_api_register('order.fixed()',function(set){if(!set){var ctx=this.context;var fixed=ctx.length?ctx[0].aaSortingFixed:undefined;return $.isArray(fixed)?{pre:fixed}:fixed;}return this.iterator('table',function(settings){settings.aaSortingFixed=$.extend(true,{},set);});});// Order by the selected column(s)
_api_register(['columns().order()','column().order()'],function(dir){var that=this;return this.iterator('table',function(settings,i){var sort=[];$.each(that[i],function(j,col){sort.push([col,dir]);});settings.aaSorting=sort;});});_api_register('search()',function(input,regex,smart,caseInsen){var ctx=this.context;if(input===undefined){// get
return ctx.length!==0?ctx[0].oPreviousSearch.sSearch:undefined;}// set
return this.iterator('table',function(settings){if(!settings.oFeatures.bFilter){return;}_fnFilterComplete(settings,$.extend({},settings.oPreviousSearch,{"sSearch":input+"","bRegex":regex===null?false:regex,"bSmart":smart===null?true:smart,"bCaseInsensitive":caseInsen===null?true:caseInsen}),1);});});_api_registerPlural('columns().search()','column().search()',function(input,regex,smart,caseInsen){return this.iterator('column',function(settings,column){var preSearch=settings.aoPreSearchCols;if(input===undefined){// get
return preSearch[column].sSearch;}// set
if(!settings.oFeatures.bFilter){return;}$.extend(preSearch[column],{"sSearch":input+"","bRegex":regex===null?false:regex,"bSmart":smart===null?true:smart,"bCaseInsensitive":caseInsen===null?true:caseInsen});_fnFilterComplete(settings,settings.oPreviousSearch,1);});});/*
	 * State API methods
	 */_api_register('state()',function(){return this.context.length?this.context[0].oSavedState:null;});_api_register('state.clear()',function(){return this.iterator('table',function(settings){// Save an empty object
settings.fnStateSaveCallback.call(settings.oInstance,settings,{});});});_api_register('state.loaded()',function(){return this.context.length?this.context[0].oLoadedState:null;});_api_register('state.save()',function(){return this.iterator('table',function(settings){_fnSaveState(settings);});});/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */DataTable.versionCheck=DataTable.fnVersionCheck=function(version){var aThis=DataTable.version.split('.');var aThat=version.split('.');var iThis,iThat;for(var i=0,iLen=aThat.length;i<iLen;i++){iThis=parseInt(aThis[i],10)||0;iThat=parseInt(aThat[i],10)||0;// Parts are the same, keep comparing
if(iThis===iThat){continue;}// Parts are different, return immediately
return iThis>iThat;}return true;};/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */DataTable.isDataTable=DataTable.fnIsDataTable=function(table){var t=$(table).get(0);var is=false;if(table instanceof DataTable.Api){return true;}$.each(DataTable.settings,function(i,o){var head=o.nScrollHead?$('table',o.nScrollHead)[0]:null;var foot=o.nScrollFoot?$('table',o.nScrollFoot)[0]:null;if(o.nTable===t||head===t||foot===t){is=true;}});return is;};/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */DataTable.tables=DataTable.fnTables=function(visible){var api=false;if($.isPlainObject(visible)){api=visible.api;visible=visible.visible;}var a=$.map(DataTable.settings,function(o){if(!visible||visible&&$(o.nTable).is(':visible')){return o.nTable;}});return api?new _Api2(a):a;};/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */DataTable.camelToHungarian=_fnCamelToHungarian;/**
	 *
	 */_api_register('$()',function(selector,opts){var rows=this.rows(opts).nodes(),// Get all rows
jqRows=$(rows);return $([].concat(jqRows.filter(selector).toArray(),jqRows.find(selector).toArray()));});// jQuery functions to operate on the tables
$.each(['on','one','off'],function(i,key){_api_register(key+'()',function/* event, handler */(){var args=Array.prototype.slice.call(arguments);// Add the `dt` namespace automatically if it isn't already present
args[0]=$.map(args[0].split(/\s/),function(e){return!e.match(/\.dt\b/)?e+'.dt':e;}).join(' ');var inst=$(this.tables().nodes());inst[key].apply(inst,args);return this;});});_api_register('clear()',function(){return this.iterator('table',function(settings){_fnClearTable(settings);});});_api_register('settings()',function(){return new _Api2(this.context,this.context);});_api_register('init()',function(){var ctx=this.context;return ctx.length?ctx[0].oInit:null;});_api_register('data()',function(){return this.iterator('table',function(settings){return _pluck(settings.aoData,'_aData');}).flatten();});_api_register('destroy()',function(remove){remove=remove||false;return this.iterator('table',function(settings){var orig=settings.nTableWrapper.parentNode;var classes=settings.oClasses;var table=settings.nTable;var tbody=settings.nTBody;var thead=settings.nTHead;var tfoot=settings.nTFoot;var jqTable=$(table);var jqTbody=$(tbody);var jqWrapper=$(settings.nTableWrapper);var rows=$.map(settings.aoData,function(r){return r.nTr;});var i,ien;// Flag to note that the table is currently being destroyed - no action
// should be taken
settings.bDestroying=true;// Fire off the destroy callbacks for plug-ins etc
_fnCallbackFire(settings,"aoDestroyCallback","destroy",[settings]);// If not being removed from the document, make all columns visible
if(!remove){new _Api2(settings).columns().visible(true);}// Blitz all `DT` namespaced events (these are internal events, the
// lowercase, `dt` events are user subscribed and they are responsible
// for removing them
jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');$(window).off('.DT-'+settings.sInstance);// When scrolling we had to break the table up - restore it
if(table!=thead.parentNode){jqTable.children('thead').detach();jqTable.append(thead);}if(tfoot&&table!=tfoot.parentNode){jqTable.children('tfoot').detach();jqTable.append(tfoot);}settings.aaSorting=[];settings.aaSortingFixed=[];_fnSortingClasses(settings);$(rows).removeClass(settings.asStripeClasses.join(' '));$('th, td',thead).removeClass(classes.sSortable+' '+classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone);// Add the TR elements back into the table in their original order
jqTbody.children().detach();jqTbody.append(rows);// Remove the DataTables generated nodes, events and classes
var removedMethod=remove?'remove':'detach';jqTable[removedMethod]();jqWrapper[removedMethod]();// If we need to reattach the table to the document
if(!remove&&orig){// insertBefore acts like appendChild if !arg[1]
orig.insertBefore(table,settings.nTableReinsertBefore);// Restore the width of the original table - was read from the style property,
// so we can restore directly to that
jqTable.css('width',settings.sDestroyWidth).removeClass(classes.sTable);// If the were originally stripe classes - then we add them back here.
// Note this is not fool proof (for example if not all rows had stripe
// classes - but it's a good effort without getting carried away
ien=settings.asDestroyStripes.length;if(ien){jqTbody.children().each(function(i){$(this).addClass(settings.asDestroyStripes[i%ien]);});}}/* Remove the settings object from the settings array */var idx=$.inArray(settings,DataTable.settings);if(idx!==-1){DataTable.settings.splice(idx,1);}});});// Add the `every()` method for rows, columns and cells in a compact form
$.each(['column','row','cell'],function(i,type){_api_register(type+'s().every()',function(fn){var opts=this.selector.opts;var api=this;return this.iterator(type,function(settings,arg1,arg2,arg3,arg4){// Rows and columns:
//  arg1 - index
//  arg2 - table counter
//  arg3 - loop counter
//  arg4 - undefined
// Cells:
//  arg1 - row index
//  arg2 - column index
//  arg3 - table counter
//  arg4 - loop counter
fn.call(api[type](arg1,type==='cell'?arg2:opts,type==='cell'?opts:undefined),arg1,arg2,arg3,arg4);});});});// i18n method for extensions to be able to use the language object from the
// DataTable
_api_register('i18n()',function(token,def,plural){var ctx=this.context[0];var resolved=_fnGetObjectDataFn(token)(ctx.oLanguage);if(resolved===undefined){resolved=def;}if(plural!==undefined&&$.isPlainObject(resolved)){resolved=resolved[plural]!==undefined?resolved[plural]:resolved._;}return resolved.replace('%d',plural);// nb: plural might be undefined,
});/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */DataTable.version="1.10.16";/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */DataTable.settings=[];/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */DataTable.models={};/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */DataTable.models.oSearch={/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */"bCaseInsensitive":true,/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */"sSearch":"",/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */"bRegex":false,/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */"bSmart":true};/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */DataTable.models.oRow={/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */"nTr":null,/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */"anCells":null,/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */"_aData":[],/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */"_aSortData":null,/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */"_aFilterData":null,/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */"_sFilterRow":null,/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */"_sRowStripe":"",/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */"src":null,/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */"idx":-1};/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */DataTable.models.oColumn={/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */"idx":null,/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */"aDataSort":null,/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */"asSorting":null,/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */"bSearchable":null,/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */"bSortable":null,/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */"bVisible":null,/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */"_sManualType":null,/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */"_bAttrSrc":false,/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */"fnCreatedCell":null,/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */"fnGetData":null,/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */"fnSetData":null,/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */"mData":null,/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */"mRender":null,/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */"nTh":null,/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */"nTf":null,/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */"sClass":null,/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */"sContentPadding":null,/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */"sDefaultContent":null,/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */"sName":null,/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */"sSortDataType":'std',/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */"sSortingClass":null,/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */"sSortingClassJUI":null,/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */"sTitle":null,/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */"sType":null,/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */"sWidth":null,/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */"sWidthOrig":null};/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would at around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit.
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */ /**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */DataTable.defaults={/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */"aaData":null,/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */"aaSorting":[[0,'asc']],/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */"aaSortingFixed":[],/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */"ajax":null,/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */"aLengthMenu":[10,25,50,100],/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */"aoColumns":null,/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */"aoColumnDefs":null,/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */"aoSearchCols":[],/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */"asStripeClasses":null,/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */"bAutoWidth":true,/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */"bDeferRender":false,/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */"bDestroy":false,/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */"bFilter":true,/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */"bInfo":true,/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */"bLengthChange":true,/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */"bPaginate":true,/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */"bProcessing":false,/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */"bRetrieve":false,/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */"bScrollCollapse":false,/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */"bServerSide":false,/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */"bSort":true,/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */"bSortMulti":true,/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */"bSortCellsTop":false,/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */"bSortClasses":true,/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */"bStateSave":false,/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */"fnCreatedRow":null,/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */"fnDrawCallback":null,/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */"fnFooterCallback":null,/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */"fnFormatNumber":function fnFormatNumber(toFormat){return toFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands);},/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */"fnHeaderCallback":null,/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */"fnInfoCallback":null,/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */"fnInitComplete":null,/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */"fnPreDrawCallback":null,/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */"fnRowCallback":null,/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */"fnServerData":null,/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */"fnServerParams":null,/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */"fnStateLoadCallback":function fnStateLoadCallback(settings){try{return JSON.parse((settings.iStateDuration===-1?sessionStorage:localStorage).getItem('DataTables_'+settings.sInstance+'_'+location.pathname));}catch(e){}},/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */"fnStateLoadParams":null,/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */"fnStateLoaded":null,/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */"fnStateSaveCallback":function fnStateSaveCallback(settings,data){try{(settings.iStateDuration===-1?sessionStorage:localStorage).setItem('DataTables_'+settings.sInstance+'_'+location.pathname,JSON.stringify(data));}catch(e){}},/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */"fnStateSaveParams":null,/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */"iStateDuration":7200,/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */"iDeferLoading":null,/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */"iDisplayLength":10,/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */"iDisplayStart":0,/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */"iTabIndex":0,/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */"oClasses":{},/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */"oLanguage":{/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */"oAria":{/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */"sSortAscending":": activate to sort column ascending",/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */"sSortDescending":": activate to sort column descending"},/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */"oPaginate":{/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */"sFirst":"First",/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */"sLast":"Last",/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */"sNext":"Next",/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */"sPrevious":"Previous"},/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */"sEmptyTable":"No data available in table",/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */"sInfo":"Showing _START_ to _END_ of _TOTAL_ entries",/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */"sInfoEmpty":"Showing 0 to 0 of 0 entries",/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */"sInfoFiltered":"(filtered from _MAX_ total entries)",/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */"sInfoPostFix":"",/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */"sDecimal":"",/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */"sThousands":",",/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */"sLengthMenu":"Show _MENU_ entries",/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */"sLoadingRecords":"Loading...",/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *  @default Processing...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */"sProcessing":"Processing...",/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */"sSearch":"Search:",/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */"sSearchPlaceholder":"",/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */"sUrl":"",/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */"sZeroRecords":"No matching records found"},/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */"oSearch":$.extend({},DataTable.models.oSearch),/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */"sAjaxDataProp":"data",/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */"sAjaxSource":null,/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */"sDom":"lfrtip",/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */"searchDelay":null,/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *  
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */"sPaginationType":"simple_numbers",/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */"sScrollX":"",/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */"sScrollXInner":"",/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */"sScrollY":"",/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */"sServerMethod":"GET",/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */"renderer":null,/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */"rowId":"DT_RowId"};_fnHungarianMap(DataTable.defaults);/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */ /**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */DataTable.defaults.column={/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */"aDataSort":null,"iDataSort":-1,/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */"asSorting":['asc','desc'],/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */"bSearchable":true,/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */"bSortable":true,/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */"bVisible":true,/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */"fnCreatedCell":null,/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */ /**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "platform.details.0" },
		 *          { "data": "platform.details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed dislay and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */"mData":null,/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */"mRender":null,/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */"sCellType":"td",/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */"sClass":"",/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */"sContentPadding":"",/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */"sDefaultContent":null,/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */"sName":"",/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */"sSortDataType":"std",/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */"sTitle":null,/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */"sType":null,/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */"sWidth":null};_fnHungarianMap(DataTable.defaults.column);/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */DataTable.models.oSettings={/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */"oFeatures":{/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bAutoWidth":null,/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all fro DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bDeferRender":null,/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bFilter":null,/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bInfo":null,/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bLengthChange":null,/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bPaginate":null,/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bProcessing":null,/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bServerSide":null,/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bSort":null,/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bSortMulti":null,/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bSortClasses":null,/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bStateSave":null},/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */"oScroll":{/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */"bCollapse":null,/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */"iBarWidth":0,/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */"sX":null,/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */"sXInner":null,/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */"sY":null},/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */"oLanguage":{/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */"fnInfoCallback":null},/**
		 * Browser support parameters
		 *  @namespace
		 */"oBrowser":{/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */"bScrollOversize":false,/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */"bScrollbarLeft":false,/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */"bBounding":false,/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */"barWidth":0},"ajax":null,/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */"aanFeatures":[],/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */"aoData":[],/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */"aiDisplay":[],/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */"aiDisplayMaster":[],/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */"aIds":{},/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */"aoColumns":[],/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */"aoHeader":[],/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */"aoFooter":[],/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */"oPreviousSearch":{},/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */"aoPreSearchCols":[],/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */"aaSorting":null,/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */"aaSortingFixed":[],/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */"asStripeClasses":null,/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */"asDestroyStripes":[],/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */"sDestroyWidth":0,/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */"aoRowCallback":[],/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */"aoHeaderCallback":[],/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */"aoFooterCallback":[],/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */"aoDrawCallback":[],/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */"aoRowCreatedCallback":[],/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */"aoPreDrawCallback":[],/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */"aoInitComplete":[],/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */"aoStateSaveParams":[],/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */"aoStateLoadParams":[],/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */"aoStateLoaded":[],/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */"sTableId":"",/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */"nTable":null,/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */"nTHead":null,/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */"nTFoot":null,/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */"nTBody":null,/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */"nTableWrapper":null,/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */"bDeferLoading":false,/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */"bInitialised":false,/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */"aoOpenRows":[],/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */"sDom":null,/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */"searchDelay":null,/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */"sPaginationType":"two_button",/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */"iStateDuration":0,/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */"aoStateSave":[],/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */"aoStateLoad":[],/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */"oSavedState":null,/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */"oLoadedState":null,/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */"sAjaxSource":null,/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */"sAjaxDataProp":null,/**
		 * Note if draw should be blocked while getting data
		 *  @type boolean
		 *  @default true
		 */"bAjaxDataGet":true,/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */"jqXHR":null,/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */"json":undefined,/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */"oAjaxData":undefined,/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */"fnServerData":null,/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */"aoServerParams":[],/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */"sServerMethod":null,/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */"fnFormatNumber":null,/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */"aLengthMenu":null,/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */"iDraw":0,/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */"bDrawing":false,/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */"iDrawError":-1,/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */"_iDisplayLength":10,/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */"_iDisplayStart":0,/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */"_iRecordsTotal":0,/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */"_iRecordsDisplay":0,/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */"oClasses":{},/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */"bFiltered":false,/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */"bSorted":false,/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */"bSortCellsTop":null,/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */"oInit":null,/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */"aoDestroyCallback":[],/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */"fnRecordsTotal":function fnRecordsTotal(){return _fnDataSource(this)=='ssp'?this._iRecordsTotal*1:this.aiDisplayMaster.length;},/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */"fnRecordsDisplay":function fnRecordsDisplay(){return _fnDataSource(this)=='ssp'?this._iRecordsDisplay*1:this.aiDisplay.length;},/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */"fnDisplayEnd":function fnDisplayEnd(){var len=this._iDisplayLength,start=this._iDisplayStart,calc=start+len,records=this.aiDisplay.length,features=this.oFeatures,paginate=features.bPaginate;if(features.bServerSide){return paginate===false||len===-1?start+records:Math.min(start+len,this._iRecordsDisplay);}else{return!paginate||calc>records||len===-1?records:calc;}},/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */"oInstance":null,/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */"sInstance":null,/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */"iTabIndex":0,/**
		 * DIV container for the footer scrolling table if scrolling
		 */"nScrollHead":null,/**
		 * DIV container for the footer scrolling table if scrolling
		 */"nScrollFoot":null,/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */"aLastSort":[],/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */"oPlugins":{},/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */"rowIdFn":null,/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */"rowId":null};/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */ /**
	 * DataTables extensions
	 * 
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */DataTable.ext=_ext={/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */buttons:{},/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */classes:{},/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */builder:"-source-",/**
		 * Error reporting.
		 * 
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */errMode:"alert",/**
		 * Feature plug-ins.
		 * 
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 * 
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 * 
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 * 
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */feature:[],/**
		 * Row searching.
		 * 
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */search:[],/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */selector:{cell:[],column:[],row:[]},/**
		 * Internal functions, exposed for used in plug-ins.
		 * 
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */internal:{},/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */legacy:{/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */ajax:null},/**
		 * Pagination plug-in methods.
		 * 
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */pager:{},renderer:{pageButton:{},header:{}},/**
		 * Ordering plug-ins - custom data source
		 * 
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 * 
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 * 
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */order:{},/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */type:{/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! $.isNumeric( data.substring(1) ) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */detect:[],/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 * 
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */search:{},/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 * 
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */order:{}},/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */_unique:0,//
// Depreciated
// The following properties are retained for backwards compatiblity only.
// The should not be used in new projects and will be removed in a future
// version
//
/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */fnVersionCheck:DataTable.fnVersionCheck,/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */iApiIndex:0,/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */oJUIClasses:{},/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */sVersion:DataTable.version};//
// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
//
$.extend(_ext,{afnFiltering:_ext.search,aTypes:_ext.type.detect,ofnSearch:_ext.type.search,oSort:_ext.type.order,afnSortData:_ext.order,aoFeatures:_ext.feature,oApi:_ext.internal,oStdClasses:_ext.classes,oPagination:_ext.pager});$.extend(DataTable.ext.classes,{"sTable":"dataTable","sNoFooter":"no-footer",/* Paging buttons */"sPageButton":"paginate_button","sPageButtonActive":"current","sPageButtonDisabled":"disabled",/* Striping classes */"sStripeOdd":"odd","sStripeEven":"even",/* Empty row */"sRowEmpty":"dataTables_empty",/* Features */"sWrapper":"dataTables_wrapper","sFilter":"dataTables_filter","sInfo":"dataTables_info","sPaging":"dataTables_paginate paging_",/* Note that the type is postfixed */"sLength":"dataTables_length","sProcessing":"dataTables_processing",/* Sorting */"sSortAsc":"sorting_asc","sSortDesc":"sorting_desc","sSortable":"sorting",/* Sortable in both directions */"sSortableAsc":"sorting_asc_disabled","sSortableDesc":"sorting_desc_disabled","sSortableNone":"sorting_disabled","sSortColumn":"sorting_",/* Note that an int is postfixed for the sorting order */ /* Filtering */"sFilterInput":"",/* Page length */"sLengthSelect":"",/* Scrolling */"sScrollWrapper":"dataTables_scroll","sScrollHead":"dataTables_scrollHead","sScrollHeadInner":"dataTables_scrollHeadInner","sScrollBody":"dataTables_scrollBody","sScrollFoot":"dataTables_scrollFoot","sScrollFootInner":"dataTables_scrollFootInner",/* Misc */"sHeaderTH":"","sFooterTH":"",// Deprecated
"sSortJUIAsc":"","sSortJUIDesc":"","sSortJUI":"","sSortJUIAscAllowed":"","sSortJUIDescAllowed":"","sSortJUIWrapper":"","sSortIcon":"","sJUIHeader":"","sJUIFooter":""});var extPagination=DataTable.ext.pager;function _numbers(page,pages){var numbers=[],buttons=extPagination.numbers_length,half=Math.floor(buttons/2),i=1;if(pages<=buttons){numbers=_range(0,pages);}else if(page<=half){numbers=_range(0,buttons-2);numbers.push('ellipsis');numbers.push(pages-1);}else if(page>=pages-1-half){numbers=_range(pages-(buttons-2),pages);numbers.splice(0,0,'ellipsis');// no unshift in ie6
numbers.splice(0,0,0);}else{numbers=_range(page-half+2,page+half-1);numbers.push('ellipsis');numbers.push(pages-1);numbers.splice(0,0,'ellipsis');numbers.splice(0,0,0);}numbers.DT_el='span';return numbers;}$.extend(extPagination,{simple:function simple(page,pages){return['previous','next'];},full:function full(page,pages){return['first','previous','next','last'];},numbers:function numbers(page,pages){return[_numbers(page,pages)];},simple_numbers:function simple_numbers(page,pages){return['previous',_numbers(page,pages),'next'];},full_numbers:function full_numbers(page,pages){return['first','previous',_numbers(page,pages),'next','last'];},first_last_numbers:function first_last_numbers(page,pages){return['first',_numbers(page,pages),'last'];},// For testing and plug-ins to use
_numbers:_numbers,// Number of number buttons (including ellipsis) to show. _Must be odd!_
numbers_length:7});$.extend(true,DataTable.ext.renderer,{pageButton:{_:function _(settings,host,idx,buttons,page,pages){var classes=settings.oClasses;var lang=settings.oLanguage.oPaginate;var aria=settings.oLanguage.oAria.paginate||{};var btnDisplay,btnClass,counter=0;var attach=function attach(container,buttons){var i,ien,node,button;var clickHandler=function clickHandler(e){_fnPageChange(settings,e.data.action,true);};for(i=0,ien=buttons.length;i<ien;i++){button=buttons[i];if($.isArray(button)){var inner=$('<'+(button.DT_el||'div')+'/>').appendTo(container);attach(inner,button);}else{btnDisplay=null;btnClass='';switch(button){case'ellipsis':container.append('<span class="ellipsis">&#x2026;</span>');break;case'first':btnDisplay=lang.sFirst;btnClass=button+(page>0?'':' '+classes.sPageButtonDisabled);break;case'previous':btnDisplay=lang.sPrevious;btnClass=button+(page>0?'':' '+classes.sPageButtonDisabled);break;case'next':btnDisplay=lang.sNext;btnClass=button+(page<pages-1?'':' '+classes.sPageButtonDisabled);break;case'last':btnDisplay=lang.sLast;btnClass=button+(page<pages-1?'':' '+classes.sPageButtonDisabled);break;default:btnDisplay=button+1;btnClass=page===button?classes.sPageButtonActive:'';break;}if(btnDisplay!==null){node=$('<a>',{'class':classes.sPageButton+' '+btnClass,'aria-controls':settings.sTableId,'aria-label':aria[button],'data-dt-idx':counter,'tabindex':settings.iTabIndex,'id':idx===0&&typeof button==='string'?settings.sTableId+'_'+button:null}).html(btnDisplay).appendTo(container);_fnBindAction(node,{action:button},clickHandler);counter++;}}}};// IE9 throws an 'unknown error' if document.activeElement is used
// inside an iframe or frame. Try / catch the error. Not good for
// accessibility, but neither are frames.
var activeEl;try{// Because this approach is destroying and recreating the paging
// elements, focus is lost on the select button which is bad for
// accessibility. So we want to restore focus once the draw has
// completed
activeEl=$(host).find(document.activeElement).data('dt-idx');}catch(e){}attach($(host).empty(),buttons);if(activeEl!==undefined){$(host).find('[data-dt-idx='+activeEl+']').focus();}}}});// Built in type detection. See model.ext.aTypes for information about
// what is required from this methods.
$.extend(DataTable.ext.type.detect,[// Plain numbers - first since V8 detects some plain numbers as dates
// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
function(d,settings){var decimal=settings.oLanguage.sDecimal;return _isNumber(d,decimal)?'num'+decimal:null;},// Dates (only those recognised by the browser's Date.parse)
function(d,settings){// V8 tries _very_ hard to make a string passed into `Date.parse()`
// valid, so we need to use a regex to restrict date formats. Use a
// plug-in for anything other than ISO8601 style strings
if(d&&!(d instanceof Date)&&!_re_date.test(d)){return null;}var parsed=Date.parse(d);return parsed!==null&&!isNaN(parsed)||_empty(d)?'date':null;},// Formatted numbers
function(d,settings){var decimal=settings.oLanguage.sDecimal;return _isNumber(d,decimal,true)?'num-fmt'+decimal:null;},// HTML numeric
function(d,settings){var decimal=settings.oLanguage.sDecimal;return _htmlNumeric(d,decimal)?'html-num'+decimal:null;},// HTML numeric, formatted
function(d,settings){var decimal=settings.oLanguage.sDecimal;return _htmlNumeric(d,decimal,true)?'html-num-fmt'+decimal:null;},// HTML (this is strict checking - there must be html)
function(d,settings){return _empty(d)||typeof d==='string'&&d.indexOf('<')!==-1?'html':null;}]);// Filter formatting functions. See model.ext.ofnSearch for information about
// what is required from these methods.
// 
// Note that additional search methods are added for the html numbers and
// html formatted numbers by `_addNumericSort()` when we know what the decimal
// place is
$.extend(DataTable.ext.type.search,{html:function html(data){return _empty(data)?data:typeof data==='string'?data.replace(_re_new_lines," ").replace(_re_html,""):'';},string:function string(data){return _empty(data)?data:typeof data==='string'?data.replace(_re_new_lines," "):data;}});var __numericReplace=function __numericReplace(d,decimalPlace,re1,re2){if(d!==0&&(!d||d==='-')){return-Infinity;}// If a decimal place other than `.` is used, it needs to be given to the
// function so we can detect it and replace with a `.` which is the only
// decimal place Javascript recognises - it is not locale aware.
if(decimalPlace){d=_numToDecimal(d,decimalPlace);}if(d.replace){if(re1){d=d.replace(re1,'');}if(re2){d=d.replace(re2,'');}}return d*1;};// Add the numeric 'deformatting' functions for sorting and search. This is done
// in a function to provide an easy ability for the language options to add
// additional methods if a non-period decimal place is used.
function _addNumericSort(decimalPlace){$.each({// Plain numbers
"num":function num(d){return __numericReplace(d,decimalPlace);},// Formatted numbers
"num-fmt":function numFmt(d){return __numericReplace(d,decimalPlace,_re_formatted_numeric);},// HTML numeric
"html-num":function htmlNum(d){return __numericReplace(d,decimalPlace,_re_html);},// HTML numeric, formatted
"html-num-fmt":function htmlNumFmt(d){return __numericReplace(d,decimalPlace,_re_html,_re_formatted_numeric);}},function(key,fn){// Add the ordering method
_ext.type.order[key+decimalPlace+'-pre']=fn;// For HTML types add a search formatter that will strip the HTML
if(key.match(/^html\-/)){_ext.type.search[key+decimalPlace]=_ext.type.search.html;}});}// Default sort methods
$.extend(_ext.type.order,{// Dates
"date-pre":function datePre(d){return Date.parse(d)||-Infinity;},// html
"html-pre":function htmlPre(a){return _empty(a)?'':a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+'';},// string
"string-pre":function stringPre(a){// This is a little complex, but faster than always calling toString,
// http://jsperf.com/tostring-v-check
return _empty(a)?'':typeof a==='string'?a.toLowerCase():!a.toString?'':a.toString();},// string-asc and -desc are retained only for compatibility with the old
// sort methods
"string-asc":function stringAsc(x,y){return x<y?-1:x>y?1:0;},"string-desc":function stringDesc(x,y){return x<y?1:x>y?-1:0;}});// Numeric sorting types - order doesn't matter here
_addNumericSort('');$.extend(true,DataTable.ext.renderer,{header:{_:function _(settings,cell,column,classes){// No additional mark-up required
// Attach a sort listener to update on sort - note that using the
// `DT` namespace will allow the event to be removed automatically
// on destroy, while the `dt` namespaced event is the one we are
// listening for
$(settings.nTable).on('order.dt.DT',function(e,ctx,sorting,columns){if(settings!==ctx){// need to check this this is the host
return;// table, not a nested one
}var colIdx=column.idx;cell.removeClass(column.sSortingClass+' '+classes.sSortAsc+' '+classes.sSortDesc).addClass(columns[colIdx]=='asc'?classes.sSortAsc:columns[colIdx]=='desc'?classes.sSortDesc:column.sSortingClass);});},jqueryui:function jqueryui(settings,cell,column,classes){$('<div/>').addClass(classes.sSortJUIWrapper).append(cell.contents()).append($('<span/>').addClass(classes.sSortIcon+' '+column.sSortingClassJUI)).appendTo(cell);// Attach a sort listener to update on sort
$(settings.nTable).on('order.dt.DT',function(e,ctx,sorting,columns){if(settings!==ctx){return;}var colIdx=column.idx;cell.removeClass(classes.sSortAsc+" "+classes.sSortDesc).addClass(columns[colIdx]=='asc'?classes.sSortAsc:columns[colIdx]=='desc'?classes.sSortDesc:column.sSortingClass);cell.find('span.'+classes.sSortIcon).removeClass(classes.sSortJUIAsc+" "+classes.sSortJUIDesc+" "+classes.sSortJUI+" "+classes.sSortJUIAscAllowed+" "+classes.sSortJUIDescAllowed).addClass(columns[colIdx]=='asc'?classes.sSortJUIAsc:columns[colIdx]=='desc'?classes.sSortJUIDesc:column.sSortingClassJUI);});}}});/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */var __htmlEscapeEntities=function __htmlEscapeEntities(d){return typeof d==='string'?d.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'):d;};/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */DataTable.render={number:function number(thousands,decimal,precision,prefix,postfix){return{display:function display(d){if(typeof d!=='number'&&typeof d!=='string'){return d;}var negative=d<0?'-':'';var flo=parseFloat(d);// If NaN then there isn't much formatting that we can do - just
// return immediately, escaping any HTML (this was supposed to
// be a number after all)
if(isNaN(flo)){return __htmlEscapeEntities(d);}flo=flo.toFixed(precision);d=Math.abs(flo);var intPart=parseInt(d,10);var floatPart=precision?decimal+(d-intPart).toFixed(precision).substring(2):'';return negative+(prefix||'')+intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g,thousands)+floatPart+(postfix||'');}};},text:function text(){return{display:__htmlEscapeEntities};}};/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */ /**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */function _fnExternApiFunc(fn){return function(){var args=[_fnSettingsFromNode(this[DataTable.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return DataTable.ext.internal[fn].apply(this,args);};}/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */$.extend(DataTable.ext.internal,{_fnExternApiFunc:_fnExternApiFunc,_fnBuildAjax:_fnBuildAjax,_fnAjaxUpdate:_fnAjaxUpdate,_fnAjaxParameters:_fnAjaxParameters,_fnAjaxUpdateDraw:_fnAjaxUpdateDraw,_fnAjaxDataSrc:_fnAjaxDataSrc,_fnAddColumn:_fnAddColumn,_fnColumnOptions:_fnColumnOptions,_fnAdjustColumnSizing:_fnAdjustColumnSizing,_fnVisibleToColumnIndex:_fnVisibleToColumnIndex,_fnColumnIndexToVisible:_fnColumnIndexToVisible,_fnVisbleColumns:_fnVisbleColumns,_fnGetColumns:_fnGetColumns,_fnColumnTypes:_fnColumnTypes,_fnApplyColumnDefs:_fnApplyColumnDefs,_fnHungarianMap:_fnHungarianMap,_fnCamelToHungarian:_fnCamelToHungarian,_fnLanguageCompat:_fnLanguageCompat,_fnBrowserDetect:_fnBrowserDetect,_fnAddData:_fnAddData,_fnAddTr:_fnAddTr,_fnNodeToDataIndex:_fnNodeToDataIndex,_fnNodeToColumnIndex:_fnNodeToColumnIndex,_fnGetCellData:_fnGetCellData,_fnSetCellData:_fnSetCellData,_fnSplitObjNotation:_fnSplitObjNotation,_fnGetObjectDataFn:_fnGetObjectDataFn,_fnSetObjectDataFn:_fnSetObjectDataFn,_fnGetDataMaster:_fnGetDataMaster,_fnClearTable:_fnClearTable,_fnDeleteIndex:_fnDeleteIndex,_fnInvalidate:_fnInvalidate,_fnGetRowElements:_fnGetRowElements,_fnCreateTr:_fnCreateTr,_fnBuildHead:_fnBuildHead,_fnDrawHead:_fnDrawHead,_fnDraw:_fnDraw,_fnReDraw:_fnReDraw,_fnAddOptionsHtml:_fnAddOptionsHtml,_fnDetectHeader:_fnDetectHeader,_fnGetUniqueThs:_fnGetUniqueThs,_fnFeatureHtmlFilter:_fnFeatureHtmlFilter,_fnFilterComplete:_fnFilterComplete,_fnFilterCustom:_fnFilterCustom,_fnFilterColumn:_fnFilterColumn,_fnFilter:_fnFilter,_fnFilterCreateSearch:_fnFilterCreateSearch,_fnEscapeRegex:_fnEscapeRegex,_fnFilterData:_fnFilterData,_fnFeatureHtmlInfo:_fnFeatureHtmlInfo,_fnUpdateInfo:_fnUpdateInfo,_fnInfoMacros:_fnInfoMacros,_fnInitialise:_fnInitialise,_fnInitComplete:_fnInitComplete,_fnLengthChange:_fnLengthChange,_fnFeatureHtmlLength:_fnFeatureHtmlLength,_fnFeatureHtmlPaginate:_fnFeatureHtmlPaginate,_fnPageChange:_fnPageChange,_fnFeatureHtmlProcessing:_fnFeatureHtmlProcessing,_fnProcessingDisplay:_fnProcessingDisplay,_fnFeatureHtmlTable:_fnFeatureHtmlTable,_fnScrollDraw:_fnScrollDraw,_fnApplyToChildren:_fnApplyToChildren,_fnCalculateColumnWidths:_fnCalculateColumnWidths,_fnThrottle:_fnThrottle,_fnConvertToWidth:_fnConvertToWidth,_fnGetWidestNode:_fnGetWidestNode,_fnGetMaxLenString:_fnGetMaxLenString,_fnStringToCss:_fnStringToCss,_fnSortFlatten:_fnSortFlatten,_fnSort:_fnSort,_fnSortAria:_fnSortAria,_fnSortListener:_fnSortListener,_fnSortAttachListener:_fnSortAttachListener,_fnSortingClasses:_fnSortingClasses,_fnSortData:_fnSortData,_fnSaveState:_fnSaveState,_fnLoadState:_fnLoadState,_fnSettingsFromNode:_fnSettingsFromNode,_fnLog:_fnLog,_fnMap:_fnMap,_fnBindAction:_fnBindAction,_fnCallbackReg:_fnCallbackReg,_fnCallbackFire:_fnCallbackFire,_fnLengthOverflow:_fnLengthOverflow,_fnRenderer:_fnRenderer,_fnDataSource:_fnDataSource,_fnRowAttributes:_fnRowAttributes,_fnCalculateEnd:function _fnCalculateEnd(){}// Used by a lot of plug-ins, but redundant
// in 1.10, so this dead-end function is
// added to prevent errors
});// jQuery access
$.fn.dataTable=DataTable;// Provide access to the host jQuery object (circular reference)
DataTable.$=$;// Legacy aliases
$.fn.dataTableSettings=DataTable.settings;$.fn.dataTableExt=DataTable.ext;// With a capital `D` we return a DataTables API instance rather than a
// jQuery object
$.fn.DataTable=function(opts){return $(this).dataTable(opts).api();};// All properties that are available to $.fn.dataTable should also be
// available on $.fn.DataTable
$.each(DataTable,function(prop,val){$.fn.DataTable[prop]=val;});// Information about events fired by DataTables - for documentation.
/**
	 * Draw event, fired whenever the table is redrawn on the page, at the same
	 * point as fnDrawCallback. This may be useful for binding events or
	 * performing calculations when the table is altered at all.
	 *  @name DataTable#draw.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */ /**
	 * Search event, fired when the searching applied to the table (using the
	 * built-in global search, or column filters) is altered.
	 *  @name DataTable#search.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */ /**
	 * Page change event, fired when the paging of the table is altered.
	 *  @name DataTable#page.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */ /**
	 * Order event, fired when the ordering applied to the table is altered.
	 *  @name DataTable#order.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */ /**
	 * DataTables initialisation complete event, fired when the table is fully
	 * drawn, including Ajax data loaded, if Ajax data is required.
	 *  @name DataTable#init.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The JSON object request from the server - only
	 *    present if client-side Ajax sourced data is used</li></ol>
	 */ /**
	 * State save event, fired when the table has changed state a new state save
	 * is required. This event allows modification of the state saving object
	 * prior to actually doing the save, including addition or other state
	 * properties (for plug-ins) or modification of a DataTables core property.
	 *  @name DataTable#stateSaveParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The state information to be saved
	 */ /**
	 * State load event, fired when the table is loading state from the stored
	 * data, but prior to the settings object being modified by the saved state
	 * - allowing modification of the saved state is required or loading of
	 * state for a plug-in.
	 *  @name DataTable#stateLoadParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */ /**
	 * State loaded event, fired when state has been loaded from stored data and
	 * the settings object has been modified by the loaded data.
	 *  @name DataTable#stateLoaded.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */ /**
	 * Processing event, fired when DataTables is doing some kind of processing
	 * (be it, order, searcg or anything else). It can be used to indicate to
	 * the end user that there is something happening, or that something has
	 * finished.
	 *  @name DataTable#processing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
	 */ /**
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
	 * request to made to the server for new data. This event is called before
	 * DataTables processed the returned data, so it can also be used to pre-
	 * process the data returned from the server, if needed.
	 *
	 * Note that this trigger is called in `fnServerData`, if you override
	 * `fnServerData` and which to use this event, you need to trigger it in you
	 * success function.
	 *  @name DataTable#xhr.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {object} json JSON returned from the server
	 *
	 *  @example
	 *     // Use a custom property returned from the server in another DOM element
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       $('#status').html( json.status );
	 *     } );
	 *
	 *  @example
	 *     // Pre-process the data returned from the server
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
	 *       }
	 *       // Note no return - manipulate the data directly in the JSON object.
	 *     } );
	 */ /**
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
	 * or passing the bDestroy:true parameter in the initialisation object. This
	 * can be used to remove bound events, added DOM nodes, etc.
	 *  @name DataTable#destroy.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */ /**
	 * Page length change event, fired when number of records to show on each
	 * page (the length) is changed.
	 *  @name DataTable#length.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {integer} len New length
	 */ /**
	 * Column sizing has changed.
	 *  @name DataTable#column-sizing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */ /**
	 * Column visibility has changed.
	 *  @name DataTable#column-visibility.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {int} column Column index
	 *  @param {bool} vis `false` if column now hidden, or `true` if visible
	 */return $.fn.dataTable;});/*! DataTables Bootstrap 3 integration
 * ©2011-2015 SpryMedia Ltd - datatables.net/license
 */ /**
 * DataTables integration for Bootstrap 3. This requires Bootstrap 3 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */(function(factory){if(typeof define==='function'&&define.amd){// AMD
define(['jquery','datatables.net'],function($){return factory($,window,document);});}else if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object'){// CommonJS
module.exports=function(root,$){if(!root){root=window;}if(!$||!$.fn.dataTable){// Require DataTables, which attaches to jQuery, including
// jQuery if needed and have a $ property so we can access the
// jQuery object that is used
$=require('datatables.net')(root,$).$;}return factory($,root,root.document);};}else{// Browser
factory(jQuery,window,document);}})(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;/* Set the defaults for DataTables initialisation */$.extend(true,DataTable.defaults,{dom:"<'row'<'col-sm-6'l><'col-sm-6'f>>"+"<'row'<'col-sm-12'tr>>"+"<'row'<'col-sm-5'i><'col-sm-7'p>>",renderer:'bootstrap'});/* Default class modification */$.extend(DataTable.ext.classes,{sWrapper:"dataTables_wrapper form-inline dt-bootstrap",sFilterInput:"form-control input-sm",sLengthSelect:"form-control input-sm",sProcessing:"dataTables_processing panel panel-default"});/* Bootstrap paging button renderer */DataTable.ext.renderer.pageButton.bootstrap=function(settings,host,idx,buttons,page,pages){var api=new DataTable.Api(settings);var classes=settings.oClasses;var lang=settings.oLanguage.oPaginate;var aria=settings.oLanguage.oAria.paginate||{};var btnDisplay,btnClass,counter=0;var attach=function attach(container,buttons){var i,ien,node,button;var clickHandler=function clickHandler(e){e.preventDefault();if(!$(e.currentTarget).hasClass('disabled')&&api.page()!=e.data.action){api.page(e.data.action).draw('page');}};for(i=0,ien=buttons.length;i<ien;i++){button=buttons[i];if($.isArray(button)){attach(container,button);}else{btnDisplay='';btnClass='';switch(button){case'ellipsis':btnDisplay='&#x2026;';btnClass='disabled';break;case'first':btnDisplay=lang.sFirst;btnClass=button+(page>0?'':' disabled');break;case'previous':btnDisplay=lang.sPrevious;btnClass=button+(page>0?'':' disabled');break;case'next':btnDisplay=lang.sNext;btnClass=button+(page<pages-1?'':' disabled');break;case'last':btnDisplay=lang.sLast;btnClass=button+(page<pages-1?'':' disabled');break;default:btnDisplay=button+1;btnClass=page===button?'active':'';break;}if(btnDisplay){node=$('<li>',{'class':classes.sPageButton+' '+btnClass,'id':idx===0&&typeof button==='string'?settings.sTableId+'_'+button:null}).append($('<a>',{'href':'#','aria-controls':settings.sTableId,'aria-label':aria[button],'data-dt-idx':counter,'tabindex':settings.iTabIndex}).html(btnDisplay)).appendTo(container);settings.oApi._fnBindAction(node,{action:button},clickHandler);counter++;}}}};// IE9 throws an 'unknown error' if document.activeElement is used
// inside an iframe or frame. 
var activeEl;try{// Because this approach is destroying and recreating the paging
// elements, focus is lost on the select button which is bad for
// accessibility. So we want to restore focus once the draw has
// completed
activeEl=$(host).find(document.activeElement).data('dt-idx');}catch(e){}attach($(host).empty().html('<ul class="pagination"/>').children('ul'),buttons);if(activeEl!==undefined){$(host).find('[data-dt-idx='+activeEl+']').focus();}};return DataTable;});/*! Select for DataTables 1.2.3
 * 2015-2017 SpryMedia Ltd - datatables.net/license/mit
 */ /**
 * @summary     Select for DataTables
 * @description A collection of API methods, events and buttons for DataTables
 *   that provides selection options of the items in a DataTable
 * @version     1.2.3
 * @file        dataTables.select.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     datatables.net/forums
 * @copyright   Copyright 2015-2017 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net/extensions/select
 */(function(factory){if(typeof define==='function'&&define.amd){// AMD
define(['jquery','datatables.net'],function($){return factory($,window,document);});}else if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object'){// CommonJS
module.exports=function(root,$){if(!root){root=window;}if(!$||!$.fn.dataTable){$=require('datatables.net')(root,$).$;}return factory($,root,root.document);};}else{// Browser
factory(jQuery,window,document);}})(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;// Version information for debugger
DataTable.select={};DataTable.select.version='1.2.3';DataTable.select.init=function(dt){var ctx=dt.settings()[0];var init=ctx.oInit.select;var defaults=DataTable.defaults.select;var opts=init===undefined?defaults:init;// Set defaults
var items='row';var style='api';var blurable=false;var info=true;var selector='td, th';var className='selected';var setStyle=false;ctx._select={};// Initialisation customisations
if(opts===true){style='os';setStyle=true;}else if(typeof opts==='string'){style=opts;setStyle=true;}else if($.isPlainObject(opts)){if(opts.blurable!==undefined){blurable=opts.blurable;}if(opts.info!==undefined){info=opts.info;}if(opts.items!==undefined){items=opts.items;}if(opts.style!==undefined){style=opts.style;setStyle=true;}if(opts.selector!==undefined){selector=opts.selector;}if(opts.className!==undefined){className=opts.className;}}dt.select.selector(selector);dt.select.items(items);dt.select.style(style);dt.select.blurable(blurable);dt.select.info(info);ctx._select.className=className;// Sort table based on selected rows. Requires Select Datatables extension
$.fn.dataTable.ext.order['select-checkbox']=function(settings,col){return this.api().column(col,{order:'index'}).nodes().map(function(td){if(settings._select.items==='row'){return $(td).parent().hasClass(settings._select.className);}else if(settings._select.items==='cell'){return $(td).hasClass(settings._select.className);}return false;});};// If the init options haven't enabled select, but there is a selectable
// class name, then enable
if(!setStyle&&$(dt.table().node()).hasClass('selectable')){dt.select.style('os');}};/*

Select is a collection of API methods, event handlers, event emitters and
buttons (for the `Buttons` extension) for DataTables. It provides the following
features, with an overview of how they are implemented:

## Selection of rows, columns and cells. Whether an item is selected or not is
   stored in:

* rows: a `_select_selected` property which contains a boolean value of the
  DataTables' `aoData` object for each row
* columns: a `_select_selected` property which contains a boolean value of the
  DataTables' `aoColumns` object for each column
* cells: a `_selected_cells` property which contains an array of boolean values
  of the `aoData` object for each row. The array is the same length as the
  columns array, with each element of it representing a cell.

This method of using boolean flags allows Select to operate when nodes have not
been created for rows / cells (DataTables' defer rendering feature).

## API methods

A range of API methods are available for triggering selection and de-selection
of rows. Methods are also available to configure the selection events that can
be triggered by an end user (such as which items are to be selected). To a large
extent, these of API methods *is* Select. It is basically a collection of helper
functions that can be used to select items in a DataTable.

Configuration of select is held in the object `_select` which is attached to the
DataTables settings object on initialisation. Select being available on a table
is not optional when Select is loaded, but its default is for selection only to
be available via the API - so the end user wouldn't be able to select rows
without additional configuration.

The `_select` object contains the following properties:

```
{
	items:string     - Can be `rows`, `columns` or `cells`. Defines what item 
	                   will be selected if the user is allowed to activate row
	                   selection using the mouse.
	style:string     - Can be `none`, `single`, `multi` or `os`. Defines the
	                   interaction style when selecting items
	blurable:boolean - If row selection can be cleared by clicking outside of
	                   the table
	info:boolean     - If the selection summary should be shown in the table
	                   information elements
}
```

In addition to the API methods, Select also extends the DataTables selector
options for rows, columns and cells adding a `selected` option to the selector
options object, allowing the developer to select only selected items or
unselected items.

## Mouse selection of items

Clicking on items can be used to select items. This is done by a simple event
handler that will select the items using the API methods.

 */ /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Local functions
 */ /**
 * Add one or more cells to the selection when shift clicking in OS selection
 * style cell selection.
 *
 * Cell range is more complicated than row and column as we want to select
 * in the visible grid rather than by index in sequence. For example, if you
 * click first in cell 1-1 and then shift click in 2-2 - cells 1-2 and 2-1
 * should also be selected (and not 1-3, 1-4. etc)
 * 
 * @param  {DataTable.Api} dt   DataTable
 * @param  {object}        idx  Cell index to select to
 * @param  {object}        last Cell index to select from
 * @private
 */function cellRange(dt,idx,last){var indexes;var columnIndexes;var rowIndexes;var selectColumns=function selectColumns(start,end){if(start>end){var tmp=end;end=start;start=tmp;}var record=false;return dt.columns(':visible').indexes().filter(function(i){if(i===start){record=true;}if(i===end){// not else if, as start might === end
record=false;return true;}return record;});};var selectRows=function selectRows(start,end){var indexes=dt.rows({search:'applied'}).indexes();// Which comes first - might need to swap
if(indexes.indexOf(start)>indexes.indexOf(end)){var tmp=end;end=start;start=tmp;}var record=false;return indexes.filter(function(i){if(i===start){record=true;}if(i===end){record=false;return true;}return record;});};if(!dt.cells({selected:true}).any()&&!last){// select from the top left cell to this one
columnIndexes=selectColumns(0,idx.column);rowIndexes=selectRows(0,idx.row);}else{// Get column indexes between old and new
columnIndexes=selectColumns(last.column,idx.column);rowIndexes=selectRows(last.row,idx.row);}indexes=dt.cells(rowIndexes,columnIndexes).flatten();if(!dt.cells(idx,{selected:true}).any()){// Select range
dt.cells(indexes).select();}else{// Deselect range
dt.cells(indexes).deselect();}}/**
 * Disable mouse selection by removing the selectors
 *
 * @param {DataTable.Api} dt DataTable to remove events from
 * @private
 */function disableMouseSelection(dt){var ctx=dt.settings()[0];var selector=ctx._select.selector;$(dt.table().container()).off('mousedown.dtSelect',selector).off('mouseup.dtSelect',selector).off('click.dtSelect',selector);$('body').off('click.dtSelect'+dt.table().node().id);}/**
 * Attach mouse listeners to the table to allow mouse selection of items
 *
 * @param {DataTable.Api} dt DataTable to remove events from
 * @private
 */function enableMouseSelection(dt){var container=$(dt.table().container());var ctx=dt.settings()[0];var selector=ctx._select.selector;container.on('mousedown.dtSelect',selector,function(e){// Disallow text selection for shift clicking on the table so multi
// element selection doesn't look terrible!
if(e.shiftKey||e.metaKey||e.ctrlKey){container.css('-moz-user-select','none').one('selectstart.dtSelect',selector,function(){return false;});}}).on('mouseup.dtSelect',selector,function(){// Allow text selection to occur again, Mozilla style (tested in FF
// 35.0.1 - still required)
container.css('-moz-user-select','');}).on('click.dtSelect',selector,function(e){var items=dt.select.items();var idx;// If text was selected (click and drag), then we shouldn't change
// the row's selected state
if(window.getSelection&&$.trim(window.getSelection().toString())){return;}var ctx=dt.settings()[0];// Ignore clicks inside a sub-table
if($(e.target).closest('div.dataTables_wrapper')[0]!=dt.table().container()){return;}var cell=dt.cell($(e.target).closest('td, th'));// Check the cell actually belongs to the host DataTable (so child
// rows, etc, are ignored)
if(!cell.any()){return;}var event=$.Event('user-select.dt');eventTrigger(dt,event,[items,cell,e]);if(event.isDefaultPrevented()){return;}var cellIndex=cell.index();if(items==='row'){idx=cellIndex.row;typeSelect(e,dt,ctx,'row',idx);}else if(items==='column'){idx=cell.index().column;typeSelect(e,dt,ctx,'column',idx);}else if(items==='cell'){idx=cell.index();typeSelect(e,dt,ctx,'cell',idx);}ctx._select_lastCell=cellIndex;});// Blurable
$('body').on('click.dtSelect'+dt.table().node().id,function(e){if(ctx._select.blurable){// If the click was inside the DataTables container, don't blur
if($(e.target).parents().filter(dt.table().container()).length){return;}// Ignore elements which have been removed from the DOM (i.e. paging
// buttons)
if($(e.target).parents('html').length===0){return;}// Don't blur in Editor form
if($(e.target).parents('div.DTE').length){return;}clear(ctx,true);}});}/**
 * Trigger an event on a DataTable
 *
 * @param {DataTable.Api} api      DataTable to trigger events on
 * @param  {boolean}      selected true if selected, false if deselected
 * @param  {string}       type     Item type acting on
 * @param  {boolean}      any      Require that there are values before
 *     triggering
 * @private
 */function eventTrigger(api,type,args,any){if(any&&!api.flatten().length){return;}if(typeof type==='string'){type=type+'.dt';}args.unshift(api);$(api.table().node()).trigger(type,args);}/**
 * Update the information element of the DataTable showing information about the
 * items selected. This is done by adding tags to the existing text
 * 
 * @param {DataTable.Api} api DataTable to update
 * @private
 */function info(api){var ctx=api.settings()[0];if(!ctx._select.info||!ctx.aanFeatures.i){return;}if(api.select.style()==='api'){return;}var rows=api.rows({selected:true}).flatten().length;var columns=api.columns({selected:true}).flatten().length;var cells=api.cells({selected:true}).flatten().length;var add=function add(el,name,num){el.append($('<span class="select-item"/>').append(api.i18n('select.'+name+'s',{_:'%d '+name+'s selected',0:'',1:'1 '+name+' selected'},num)));};// Internal knowledge of DataTables to loop over all information elements
$.each(ctx.aanFeatures.i,function(i,el){el=$(el);var output=$('<span class="select-info"/>');add(output,'row',rows);add(output,'column',columns);add(output,'cell',cells);var exisiting=el.children('span.select-info');if(exisiting.length){exisiting.remove();}if(output.text()!==''){el.append(output);}});}/**
 * Initialisation of a new table. Attach event handlers and callbacks to allow
 * Select to operate correctly.
 *
 * This will occur _after_ the initial DataTables initialisation, although
 * before Ajax data is rendered, if there is ajax data
 *
 * @param  {DataTable.settings} ctx Settings object to operate on
 * @private
 */function init(ctx){var api=new DataTable.Api(ctx);// Row callback so that classes can be added to rows and cells if the item
// was selected before the element was created. This will happen with the
// `deferRender` option enabled.
// 
// This method of attaching to `aoRowCreatedCallback` is a hack until
// DataTables has proper events for row manipulation If you are reviewing
// this code to create your own plug-ins, please do not do this!
ctx.aoRowCreatedCallback.push({fn:function fn(row,data,index){var i,ien;var d=ctx.aoData[index];// Row
if(d._select_selected){$(row).addClass(ctx._select.className);}// Cells and columns - if separated out, we would need to do two
// loops, so it makes sense to combine them into a single one
for(i=0,ien=ctx.aoColumns.length;i<ien;i++){if(ctx.aoColumns[i]._select_selected||d._selected_cells&&d._selected_cells[i]){$(d.anCells[i]).addClass(ctx._select.className);}}},sName:'select-deferRender'});// On Ajax reload we want to reselect all rows which are currently selected,
// if there is an rowId (i.e. a unique value to identify each row with)
api.on('preXhr.dt.dtSelect',function(){// note that column selection doesn't need to be cached and then
// reselected, as they are already selected
var rows=api.rows({selected:true}).ids(true).filter(function(d){return d!==undefined;});var cells=api.cells({selected:true}).eq(0).map(function(cellIdx){var id=api.row(cellIdx.row).id(true);return id?{row:id,column:cellIdx.column}:undefined;}).filter(function(d){return d!==undefined;});// On the next draw, reselect the currently selected items
api.one('draw.dt.dtSelect',function(){api.rows(rows).select();// `cells` is not a cell index selector, so it needs a loop
if(cells.any()){cells.each(function(id){api.cells(id.row,id.column).select();});}});});// Update the table information element with selected item summary
api.on('draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt',function(){info(api);});// Clean up and release
api.on('destroy.dtSelect',function(){disableMouseSelection(api);api.off('.dtSelect');});}/**
 * Add one or more items (rows or columns) to the selection when shift clicking
 * in OS selection style
 *
 * @param  {DataTable.Api} dt   DataTable
 * @param  {string}        type Row or column range selector
 * @param  {object}        idx  Item index to select to
 * @param  {object}        last Item index to select from
 * @private
 */function rowColumnRange(dt,type,idx,last){// Add a range of rows from the last selected row to this one
var indexes=dt[type+'s']({search:'applied'}).indexes();var idx1=$.inArray(last,indexes);var idx2=$.inArray(idx,indexes);if(!dt[type+'s']({selected:true}).any()&&idx1===-1){// select from top to here - slightly odd, but both Windows and Mac OS
// do this
indexes.splice($.inArray(idx,indexes)+1,indexes.length);}else{// reverse so we can shift click 'up' as well as down
if(idx1>idx2){var tmp=idx2;idx2=idx1;idx1=tmp;}indexes.splice(idx2+1,indexes.length);indexes.splice(0,idx1);}if(!dt[type](idx,{selected:true}).any()){// Select range
dt[type+'s'](indexes).select();}else{// Deselect range - need to keep the clicked on row selected
indexes.splice($.inArray(idx,indexes),1);dt[type+'s'](indexes).deselect();}}/**
 * Clear all selected items
 *
 * @param  {DataTable.settings} ctx Settings object of the host DataTable
 * @param  {boolean} [force=false] Force the de-selection to happen, regardless
 *     of selection style
 * @private
 */function clear(ctx,force){if(force||ctx._select.style==='single'){var api=new DataTable.Api(ctx);api.rows({selected:true}).deselect();api.columns({selected:true}).deselect();api.cells({selected:true}).deselect();}}/**
 * Select items based on the current configuration for style and items.
 *
 * @param  {object}             e    Mouse event object
 * @param  {DataTables.Api}     dt   DataTable
 * @param  {DataTable.settings} ctx  Settings object of the host DataTable
 * @param  {string}             type Items to select
 * @param  {int|object}         idx  Index of the item to select
 * @private
 */function typeSelect(e,dt,ctx,type,idx){var style=dt.select.style();var isSelected=dt[type](idx,{selected:true}).any();if(style==='os'){if(e.ctrlKey||e.metaKey){// Add or remove from the selection
dt[type](idx).select(!isSelected);}else if(e.shiftKey){if(type==='cell'){cellRange(dt,idx,ctx._select_lastCell||null);}else{rowColumnRange(dt,type,idx,ctx._select_lastCell?ctx._select_lastCell[type]:null);}}else{// No cmd or shift click - deselect if selected, or select
// this row only
var selected=dt[type+'s']({selected:true});if(isSelected&&selected.flatten().length===1){dt[type](idx).deselect();}else{selected.deselect();dt[type](idx).select();}}}else if(style=='multi+shift'){if(e.shiftKey){if(type==='cell'){cellRange(dt,idx,ctx._select_lastCell||null);}else{rowColumnRange(dt,type,idx,ctx._select_lastCell?ctx._select_lastCell[type]:null);}}else{dt[type](idx).select(!isSelected);}}else{dt[type](idx).select(!isSelected);}}/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables selectors
 */ // row and column are basically identical just assigned to different properties
// and checking a different array, so we can dynamically create the functions to
// reduce the code size
$.each([{type:'row',prop:'aoData'},{type:'column',prop:'aoColumns'}],function(i,o){DataTable.ext.selector[o.type].push(function(settings,opts,indexes){var selected=opts.selected;var data;var out=[];if(selected===undefined){return indexes;}for(var i=0,ien=indexes.length;i<ien;i++){data=settings[o.prop][indexes[i]];if(selected===true&&data._select_selected===true||selected===false&&!data._select_selected){out.push(indexes[i]);}}return out;});});DataTable.ext.selector.cell.push(function(settings,opts,cells){var selected=opts.selected;var rowData;var out=[];if(selected===undefined){return cells;}for(var i=0,ien=cells.length;i<ien;i++){rowData=settings.aoData[cells[i].row];if(selected===true&&rowData._selected_cells&&rowData._selected_cells[cells[i].column]===true||selected===false&&(!rowData._selected_cells||!rowData._selected_cells[cells[i].column])){out.push(cells[i]);}}return out;});/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */ // Local variables to improve compression
var apiRegister=DataTable.Api.register;var apiRegisterPlural=DataTable.Api.registerPlural;apiRegister('select()',function(){return this.iterator('table',function(ctx){DataTable.select.init(new DataTable.Api(ctx));});});apiRegister('select.blurable()',function(flag){if(flag===undefined){return this.context[0]._select.blurable;}return this.iterator('table',function(ctx){ctx._select.blurable=flag;});});apiRegister('select.info()',function(flag){if(info===undefined){return this.context[0]._select.info;}return this.iterator('table',function(ctx){ctx._select.info=flag;});});apiRegister('select.items()',function(items){if(items===undefined){return this.context[0]._select.items;}return this.iterator('table',function(ctx){ctx._select.items=items;eventTrigger(new DataTable.Api(ctx),'selectItems',[items]);});});// Takes effect from the _next_ selection. None disables future selection, but
// does not clear the current selection. Use the `deselect` methods for that
apiRegister('select.style()',function(style){if(style===undefined){return this.context[0]._select.style;}return this.iterator('table',function(ctx){ctx._select.style=style;if(!ctx._select_init){init(ctx);}// Add / remove mouse event handlers. They aren't required when only
// API selection is available
var dt=new DataTable.Api(ctx);disableMouseSelection(dt);if(style!=='api'){enableMouseSelection(dt);}eventTrigger(new DataTable.Api(ctx),'selectStyle',[style]);});});apiRegister('select.selector()',function(selector){if(selector===undefined){return this.context[0]._select.selector;}return this.iterator('table',function(ctx){disableMouseSelection(new DataTable.Api(ctx));ctx._select.selector=selector;if(ctx._select.style!=='api'){enableMouseSelection(new DataTable.Api(ctx));}});});apiRegisterPlural('rows().select()','row().select()',function(select){var api=this;if(select===false){return this.deselect();}this.iterator('row',function(ctx,idx){clear(ctx);ctx.aoData[idx]._select_selected=true;$(ctx.aoData[idx].nTr).addClass(ctx._select.className);});this.iterator('table',function(ctx,i){eventTrigger(api,'select',['row',api[i]],true);});return this;});apiRegisterPlural('columns().select()','column().select()',function(select){var api=this;if(select===false){return this.deselect();}this.iterator('column',function(ctx,idx){clear(ctx);ctx.aoColumns[idx]._select_selected=true;var column=new DataTable.Api(ctx).column(idx);$(column.header()).addClass(ctx._select.className);$(column.footer()).addClass(ctx._select.className);column.nodes().to$().addClass(ctx._select.className);});this.iterator('table',function(ctx,i){eventTrigger(api,'select',['column',api[i]],true);});return this;});apiRegisterPlural('cells().select()','cell().select()',function(select){var api=this;if(select===false){return this.deselect();}this.iterator('cell',function(ctx,rowIdx,colIdx){clear(ctx);var data=ctx.aoData[rowIdx];if(data._selected_cells===undefined){data._selected_cells=[];}data._selected_cells[colIdx]=true;if(data.anCells){$(data.anCells[colIdx]).addClass(ctx._select.className);}});this.iterator('table',function(ctx,i){eventTrigger(api,'select',['cell',api[i]],true);});return this;});apiRegisterPlural('rows().deselect()','row().deselect()',function(){var api=this;this.iterator('row',function(ctx,idx){ctx.aoData[idx]._select_selected=false;$(ctx.aoData[idx].nTr).removeClass(ctx._select.className);});this.iterator('table',function(ctx,i){eventTrigger(api,'deselect',['row',api[i]],true);});return this;});apiRegisterPlural('columns().deselect()','column().deselect()',function(){var api=this;this.iterator('column',function(ctx,idx){ctx.aoColumns[idx]._select_selected=false;var api=new DataTable.Api(ctx);var column=api.column(idx);$(column.header()).removeClass(ctx._select.className);$(column.footer()).removeClass(ctx._select.className);// Need to loop over each cell, rather than just using
// `column().nodes()` as cells which are individually selected should
// not have the `selected` class removed from them
api.cells(null,idx).indexes().each(function(cellIdx){var data=ctx.aoData[cellIdx.row];var cellSelected=data._selected_cells;if(data.anCells&&(!cellSelected||!cellSelected[cellIdx.column])){$(data.anCells[cellIdx.column]).removeClass(ctx._select.className);}});});this.iterator('table',function(ctx,i){eventTrigger(api,'deselect',['column',api[i]],true);});return this;});apiRegisterPlural('cells().deselect()','cell().deselect()',function(){var api=this;this.iterator('cell',function(ctx,rowIdx,colIdx){var data=ctx.aoData[rowIdx];data._selected_cells[colIdx]=false;// Remove class only if the cells exist, and the cell is not column
// selected, in which case the class should remain (since it is selected
// in the column)
if(data.anCells&&!ctx.aoColumns[colIdx]._select_selected){$(data.anCells[colIdx]).removeClass(ctx._select.className);}});this.iterator('table',function(ctx,i){eventTrigger(api,'deselect',['cell',api[i]],true);});return this;});/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Buttons
 */function i18n(label,def){return function(dt){return dt.i18n('buttons.'+label,def);};}// Common events with suitable namespaces
function namespacedEvents(config){var unique=config._eventNamespace;return'draw.dt.DT'+unique+' select.dt.DT'+unique+' deselect.dt.DT'+unique;}var _buttonNamespace=0;$.extend(DataTable.ext.buttons,{selected:{text:i18n('selected','Selected'),className:'buttons-selected',init:function init(dt,node,config){var that=this;config._eventNamespace='.select'+_buttonNamespace++;// .DT namespace listeners are removed by DataTables automatically
// on table destroy
dt.on(namespacedEvents(config),function(){var enable=that.rows({selected:true}).any()||that.columns({selected:true}).any()||that.cells({selected:true}).any();that.enable(enable);});this.disable();},destroy:function destroy(dt,node,config){dt.off(config._eventNamespace);}},selectedSingle:{text:i18n('selectedSingle','Selected single'),className:'buttons-selected-single',init:function init(dt,node,config){var that=this;config._eventNamespace='.select'+_buttonNamespace++;dt.on(namespacedEvents(config),function(){var count=dt.rows({selected:true}).flatten().length+dt.columns({selected:true}).flatten().length+dt.cells({selected:true}).flatten().length;that.enable(count===1);});this.disable();},destroy:function destroy(dt,node,config){dt.off(config._eventNamespace);}},selectAll:{text:i18n('selectAll','Select all'),className:'buttons-select-all',action:function action(){var items=this.select.items();this[items+'s']().select();}},selectNone:{text:i18n('selectNone','Deselect all'),className:'buttons-select-none',action:function action(){clear(this.settings()[0],true);},init:function init(dt,node,config){var that=this;config._eventNamespace='.select'+_buttonNamespace++;dt.on(namespacedEvents(config),function(){var count=dt.rows({selected:true}).flatten().length+dt.columns({selected:true}).flatten().length+dt.cells({selected:true}).flatten().length;that.enable(count>0);});this.disable();},destroy:function destroy(dt,node,config){dt.off(config._eventNamespace);}}});$.each(['Row','Column','Cell'],function(i,item){var lc=item.toLowerCase();DataTable.ext.buttons['select'+item+'s']={text:i18n('select'+item+'s','Select '+lc+'s'),className:'buttons-select-'+lc+'s',action:function action(){this.select.items(lc);},init:function init(dt){var that=this;dt.on('selectItems.dt.DT',function(e,ctx,items){that.active(items===lc);});}};});/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 */ // DataTables creation - check if select has been defined in the options. Note
// this required that the table be in the document! If it isn't then something
// needs to trigger this method unfortunately. The next major release of
// DataTables will rework the events and address this.
$(document).on('preInit.dt.dtSelect',function(e,ctx){if(e.namespace!=='dt'){return;}DataTable.select.init(new DataTable.Api(ctx));});return DataTable.select;});
//# sourceMappingURL=vendor.js.map
