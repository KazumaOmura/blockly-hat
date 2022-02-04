(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// const HatInterpreter=(function( ){
var HatInterpreter=(function( ){
    /** 繝�ヰ繝�げ逕ｨ **/

    let ua = window.navigator.userAgent.toLowerCase();
    if(ua.indexOf("iphone")<0 && ua.indexOf("ipad")<0){
	Object.defineProperty(window, '__STACK__', {
	    get: function(){
		let origin = Error.prepareStackTrace;
		Error.prepareStackTrace = function(_, stack){ return stack; };
		let err = new Error;
		if(Error.captureStackTrace)
		    Error.captureStackTrace(err, arguments.callee);
		let stack = err.stack;
		Error.prepareStackTrace = origin;
		return stack;
	    }
	});
	
	Object.defineProperty(window, '__FILE__', {
	    get: function(){
		let filename = __STACK__[1].getFileName();
		filename=filename.replace(location.origin, "").
		    replace(window.location.search, "");
		if(!filename) filename = "/";
		return filename;
	    }
	});
	
	Object.defineProperty(window, '__LINE__', {
	    get: function(){
		return __STACK__[1].getLineNumber();
	    }
	});
    }else{
	Object.defineProperty(window, '__FILE__', {
	    get: function(){
		return "unknown";
	    }
	});
	Object.defineProperty(window, '__LINE__', {
	    get: function(){
		return 0;
	    }
	});
    }

    const I = e=>e;
    let log=I;

    /* 繝ｭ繧ｰ蜃ｺ蜉� */
    function logString(tag, obj){
        let line=__STACK__[1].getLineNumber();
	console.log("L"+line+" "+tag+obj);
    }
    function logJSON(tag, obj){
	logString(tag, JSON.stringfy(obj));
    }

    /** 繝��繧ｿ讒矩�縺ｨ繧ｳ繝ｳ繧ｹ繝医Λ繧ｯ繧ｿ **/
    
    /* 繧ｿ繧ｹ繧ｯ
       actor: Actor
       fun: HatExp
       args: 驟榊�
       stack: ContStack
    */
    function Task(actor, fun, args, contarg, stack){
	// var obj=Object.create(Task.prototype);
	// if(!args) console.log("Task args is undefined.");
	this.actor=actor;
	this.fun=fun;
	this.args=args;
	this.contarg=contarg;
	this.stack=stack;
	// return obj;
    }
    
    /* 繧｢繧ｯ繧ｿ繝ｼ */
    function Actor(script){
	// var obj=Object.create(Actor.prototype);
	this.mailbox=[ ];
	this.script=script;
	this.plist=[ ];
	// return obj;
    }
    
    /* 繧ｽ繝ｼ繧ｹ繝輔ぃ繧､繝ｫ蜷阪→陦檎分蜿ｷ */
    function Source(filename, lineno){
	// var src=Object.create(Source.prototype);
	this.filename=filename;
	this.lineno=lineno;
	// return src;
    }
    
    /* 繝上ャ繝亥ｼ� */
    function HatExp(source){
	this.source=source; // 繧ｽ繝ｼ繧ｹ繝輔ぃ繧､繝ｫ蜷阪→陦檎分蜿ｷ
    }
    
    /* 螟画焚 */
    function HatVar(name, source){
	HatExp.call(this, source);
	this.name=name;
    }

    /* 謨ｰ蛟､ */
    function HatNumber(value, source){
	HatExp.call(this, source);
	this.value=value;
    }

    /* 隲也炊蛟､
    function HatBoolean(value, source){
	HatExp.call(this, source);
	this.value=value;
    } */
    
    /* JavaScript螟画焚
       莉･荳九�譖ｸ蠑上↓繧医▲縺ｦ縲゛avaScript縺ｧ螳夂ｾｩ縺輔ｌ縺滄未謨ｰ繧貞ｮ溯｡後☆繧九�
       JavaScript 髢｢謨ｰ螳夂ｾｩ 蠑墓焚 繝ｻ繝ｻ繝ｻ ^(謌ｻ繧雁､)
       莉･荳九�譖ｸ蠑上↓繧医▲縺ｦ縲゛avaScript縺ｧ螳夂ｾｩ縺輔ｌ縺滄未謨ｰ繧定ｿ斐☆縲�
       JavaScript 髢｢謨ｰ螳夂ｾｩ ^(髢｢謨ｰ)
       莉･荳九�譖ｸ蠑上↓繧医▲縺ｦ縲゛avaScript髢｢謨ｰ繧貞ｮ溯｡後☆繧九�
       髢｢謨ｰ 蠑墓焚 繝ｻ繝ｻ繝ｻ ^(謌ｻ繧雁､)
    */
    function JSVar(source){
	HatVar.call(this, "JavaScript", source);
    }
    /* 譁�ｭ怜� */
    function Str(string, source){
	HatExp.call(this, source);
	this.string=string;
    }
    
    /* 繝上ャ繝磯未謨ｰ */
    function HatFun(pars, contpar, funcall, source){
	HatExp.call(this, source);
	this.pars=pars;
	this.contpar=contpar;
	this.funcall=funcall;
    }
    
    /* JavaScript髢｢謨ｰ */
    function JSFun(code, source){
	HatExp.call(this, source);
	this.string=code.string;
	this.fun=eval(code.string);
    }

    let emptyArray=[ ];

    /* 繝ｪ繧ｹ繝�
       (array[start] array[start+1] 繝ｻ繝ｻ繝ｻ . tail)
       array: 驟榊�
       start: 驟榊�縺ｮ豺ｻ蟄�
       tail: 繝ｪ繧ｹ繝医�譛ｫ蟆ｾ
       assignment: 螟画焚縺ｸ縺ｮ蛟､縺ｮ蜑ｲ蠖�
       source: 繧ｽ繝ｼ繧ｹ繝輔ぃ繧､繝ｫ荳ｭ縺ｮ菴咲ｽｮ
    */
    function List(array, start, tail, assignment, source){
	assignment=Object.assign({ }, assignment);
	while(array && start>=array.length){
	    if(tail==null){
		array=emptyArray;
		break;
	    }
	    if(tail.type!="List") return tail.subst(assignment);
	    start=start-array.length+tail.start;
	    array=tail.array;
	    Object.assign(assignment, tail.assignment);
	    tail=tail.tail;
	}
	if(source==null && array!=null && start<array.length)
	    source=array[start].source;
	HatExp.call(this, source);
	var obj=this;
	obj.array=array? array: emptyArray;
	obj.start=start;
	obj.tail=tail;
	obj.assignment=Object.keys(assignment).length>0? assignment: null;
	if(obj.array==null) console.warn("obj.array=null");
    }
    
    /* 邯咏ｶ壹せ繧ｿ繝�け */
    function ContStack(first, rest){
	HatExp.call(this, first.source);
	this.first=first;
	this.rest=rest;
	this.size=rest? rest.size+1: 1;
    }
    
    /* 繧ｹ繧ｯ繝ｪ繝励ヨ */
    function Script(path){
	this.path=path;
	this.included=[ ];
	this.defined={ };
	this.dictionary=null;
    }

    /** 繝医ャ繝励Ξ繝吶Ν **/

    let running=true, performing=0;
    // let running=true;
    function performTasks( ){
	if(performing>0) return;
	if(!running){
	    // setTimeout(performTasks, 1000);
	    return;
	}
	++performing;
	/*
	var start=new Date().getTime();
	*/
	var start=new Date();
	// while(running){
	do{
	    var task=TaskQ.shift( );
	    if(!task) break;
	    /*
	    if(task.stack)
		console.log("performTask stack.size="+task.stack.size);
	    else console.log("performTask stack=null");
	    */
	    stepTask(task);
	    if(task.fun) TaskQ.push(task);
	    /*
	    if(new Date().getTime()-start>100){
		setTimeout(performTasks, 0);
		return;
	    }
	    */
	}while(new Date()-start<1000);
	--performing;
	setTimeout(performTasks, 0);
    }
    function performTasks2( ){
	var start=new Date().getTime();
	while(running){
	    var task=TaskQ.shift( );
	    if(!task) break;
	    // console.log("performTask stack.size="+task.stack.size);
	    stepTask(task);
	    if(task.fun) TaskQ.push(task);
	    if(new Date().getTime()-start>100){
		setTimeout(performTasks, 0);
		return;
	    }
	}
	setTimeout(performTasks, 1000);
    }
    // setTimeout(performTasks, 0);
    
    /** 繝励Ο繝医ち繧､繝� **/
    
    Task.prototype={
	assignArgs(pars, assignment){
	    if(this.args==null) return pars;
	    // console.log("1 this.args="+this.args);
	    var args=this.args;
	    var np=pars.length, na=args.length;
	    var n=np<na? np: na;
	    for(var i=0; i<n; ++i){
		// log("assignArgs", "pars["+i+"]="+pars[i]+" : "+args[i]);
		pars[i].assignValue(assignment, args[i]);
	    }
	    this.args=np<na? args.slice(np): null;
	    // console.log("2 this.args="+this.args);
	    return np>na? pars.slice(na): null;
	},
	pushCont(cont){
	    // log("Task.pushCont cont="+cont);
	    if(cont==null) return;
	    /*
	    console.log(cont.toString( ));
	    console.trace( );
	    */
	    if(this.stack && cont===this.stack.first)
		console.warn("Task.pushCont cont="+cont);
	    this.stack=new ContStack(cont, this.stack);
	    // log("Task.pushCont this.stack="+this.stack);
	},
	popCont( ){
	    // log("Task.popCont this.stack="+this.stack);
	    if(this.stack==null) return null;
	    let cont=this.stack.first;
	    this.stack=this.stack.rest;
	    return cont;
	},
	type: "Task"
    };

    /*
    let exit=new Var("exit", new Source(__FILE__, __LINE__));
    let zero=new Var("0", new Source(__FILE__, __LINE__));
    let exit_zero=new List([exit, zero], 0, null, null,
			   new Source(__FILE__, __LINE__));
    */
    function code2HatExp(code, path, line){
	let a=parse(code, line);
	return Array2HatExp(a, 0, path);
    }
    Actor.prototype={
	// start(fun, args){
	start(sexp_array, path){
	    // console.log("Actor.start");
	    // console.log("Actor.start sexp_array="+JSON.stringify(sexp_array));
	    let fun=new HatVar(sexp_array[0].content);
	    let args=[ ], cont=null;
	    for(let i=1; i<sexp_array.length; ++i){
		if(sexp_array[i].content=='.'){
		    cont=SExp2HatExp(sexp_array[i+1], path);
		    break;
		}
		args.push(SExp2HatExp(sexp_array[i], path));
	    }
	    // console.log("Actor.start args="+args);
	    let stack=new ContStack(
		code2HatExp("seq_infinite ()", __FILE__, __LINE__), null);
	    /*
		code2HatExp("^() exit 0", __FILE__, __LINE__), null);
	    */
	    log("Actor.start stack="+stack);
	    let t=new Task(this, fun, args, cont, stack);
	    if(loading>0) pending.push(t);
	    else TaskQ.push(t);
	    running=true;
	},
	type: "Actor"
    };
    
    Source.prototype={
	error( ){
	    console.error(this.filename+" "+this.lineno+": Error");
	},
	toString( ){
	    return this.filename+":"+this.lineno;
	},
	type: "Source"
    };
    
    HatExp.prototype={
	subst(assignment){
	    return this;
	},
	substAll( ){
	    return this;
	},
	isAtom( ){
	    return true;
	},
	type: "HatExp"
    };
    function hoge(){
	//縲Object||Array縺ｪ繧峨Μ繧ｹ繝医↓IN縺励※蠕ｪ迺ｰ蜿ら�繝√ぉ繝�け
	var checkList = [];
	return function(key,value){
            // 蛻晏屓逕ｨ
            if( key==='' ){
		checkList.push(value);
		return value;
            }
            // Node,Element縺ｮ鬘槭�繧ｫ繝�ヨ
            if( value instanceof Node ){
		return undefined;
            }
            // Object,Array縺ｪ繧牙ｾｪ迺ｰ蜿ら�繝√ぉ繝�け
            if( typeof value==='object' && value!==null ){
		return checkList.every(function(v,i,a){
                    return value!==v;
		}) ? value: undefined;
            }
            return value;       
	}
    }
    function toString(obj){
	return JSON.stringify(obj, hoge( ));
    }
    HatVar.prototype={
	__proto__: HatExp.prototype,
	step(task){
	    // console.log("Var.step name="+this.name);
	    // let fun=task.actor.script.getDictionary( )[this.name];
	    let fun=this.getValue(task);
	    // console.log("Var.step fun="+fun);
	    if(fun){
		task.fun=fun;
		return;
	    }
	    if(this.name != 'end'){
		console.error("Error: "+this.name+" at "+this.source+
			      " is undefined.");
	    }
	    task.fun=null;
	},
	getValue(task){
	    return task.actor.script.getDictionary( )[this.name];
	},
	subst(assignment){
	    if(assignment==null) return this;
	    var undefined;
	    if(assignment===undefined) return this;
	    if(this.name in assignment) return assignment[this.name];
	    return this;
	},
	assignValue(assignment, value){
	    assignment[this.name]=value;
	},
	remove(assignment){
	    delete assignment[this.name];
	},
	toString( ){
	    return this.name;
	},
	type: 'HatVar'
    };
    
    JSVar.prototype={
	__proto__: HatVar.prototype,
	step(task){
	    var args=task.args;
	    if(args.length>0){
		/*
		task.args=[new JSFun(args[0], this.source)];
		task.fun=makeArgFun(args.slice(1), task.contarg);
		*/
		task.fun=new JSFun(args[0], this.source);
		task.args=args.slice(1);
	    }else{
		task.fun=task.contarg? task.contarg: popCont( );
		task.args=[this];
	    }
	    return task;
	},
	type: "JSVar"
    };
    
    Str.prototype={
	__proto__: HatExp.prototype,
	step(task){
	    // console.log("Str.step");
	    // log("Str.step this.string="+this.string);
	    // before
	    /*
	    if(this.fun==null){
		console.log("Str.step this.fun");
		this.fun=eval(this.string);
	    }
	    task.fun=task.contarg? task.contarg: task.popCont( );
	    task.args=[this.fun(task.args)];
	    */
	    // after
	    task.fun=task.contarg? task.contarg: task.popCont( );
	    task.args.unshift(this);
	    task.contarg=null;
	},
	toString( ){
	    return '"'+this.string.replace(/\n/gu, "\\n")+'"';
	},
	type: "String"
    };

    HatNumber.prototype={
	__proto__: HatExp.prototype,
	step(task){
	    let args=task.args;
	    if(args && args.length>0){
		let arg0=args[0];
		if(arg0.type!="Number"){
		    task.fun=arg0;
		    args[0]=this;
		    return;
		}
		// console.log("HatNumber.step "+this.source);
		args.unshift(this);
	    }else task.args=[this];
	    if(task.contarg){
		task.fun=task.contarg;
		task.contarg=null;
	    }else task.fun=task.popCont();
	    // if(args) Array.prototype.push.apply(task.args, args);
	},
	toString( ){
	    return this.value+'';
	},
	type: "Number"
    };

    /*
    HatBoolean.prototype={
	__proto__: HatExp.prototype,
	step(task){
	    let args=task.args;
	    if(args && args.length>0){
		let arg0=args[0];
		if(arg0.type!="Boolean"){
		    task.fun=args0;
		    args[0]=this;
		    return;
		}
		args.unshift(this);
	    }else task.args=[this];
	    if(task.contarg){
		task.fun=task.contarg;
		task.contarg=null;
	    }else task.fun=task.popCont();
	},
	toString( ){
	    return this.value+'';
	},
	type: "Boolean"
    };
    */

    HatFun.prototype={
	__proto__: HatExp.prototype,
	step(task){
	    /*
	    log("HatFun.step task.fun="+task.fun);
	    log("HatFun.step task.args="+task.args);
	    log("HatFun.step task.contarg="+task.contarg);
	    */
	    var assignment={ }; // 螟画焚縺ｫ蟇ｾ縺吶ｋ蛟､縺ｮ蜑ｲ蠖�
	    /* 騾壼ｸｸ縺ｮ莉ｮ蠑墓焚縺ｫ蠑墓焚繧貞牡繧雁ｽ薙※繧九�
	       蜑ｲ繧雁ｽ薙※縺溽ｵ先棡縺ｯassignment縺ｫ蜿肴丐縺輔ｌ繧九�
	       谿九▲縺滉ｻｮ蠑墓焚縺梧綾繧雁､縺ｨ縺励※pars縺ｫ霑斐＆繧後ｋ縲�*/
	    var pars=task.assignArgs(this.pars, assignment);
	    if(pars!=null){
		task.fun=task.contarg? task.contarg: task.popCont( );
		task.args=[new HatFun(
		    pars, this.contpar, this.funcall.subst(assignment),
		    this.source)];
		task.contarg=null;
		return;
	    }
	    /* 2019/12/11 debug
	       逞�憾�壽忰蟆ｾ蜀榊ｸｰ縺ｧ繧ｹ繧ｿ繝�け繧ｵ繧､繧ｺ縺悟｢励∴縺ｦ縺�￥縲�
	       菫ｮ豁｣蜑搾ｼ嗾ask.pushCont(makeArgFun(task.args, task.contarg));
	       菫ｮ豁｣蠕鯉ｼ壻ｻ･荳�3陦� */
	    if(task.contarg && task.contarg.type=="ContStack"){
		task.stack=task.contarg;
		task.contarg=null;
	    }
	    if(task.args || task.contarg){
		/*
		console.log("HatFun.step task.args="+task.args);
		console.log("HatFun.step task.contarg="+task.contarg);
		*/
		task.pushCont(makeArgFun(task.args, task.contarg));
		task.args=null;
		task.contarg=null;
	    }
	    /*
	    if(task.args!=null && task.args.length>0){
		task.pushCont(makeArgFun(task.args, task.contarg));
	    }else{
		console.log("HatFun.step task.contarg="+task.contarg);
		task.pushCont(task.contarg);
	    }
	    */
	    if(this.contpar!=null){
		this.contpar.assignValue(assignment, task.stack);
		// this.contpar.assignValue(assignment, task.stack);
		// console.log(this.contpar+" <- "+task.stack);
	    }
	    // console.log(assignment);
	    var fun=this.funcall;
	    if(fun!=null) fun=fun.subst(assignment);
	    // console.log("HatFun.step: fun="+fun);
	    task.fun=fun;
	    /*
	    log("HatFun.step 2 task.fun="+task.fun);
	    log("HatFun.step 2 task.args="+task.args);
	    log("HatFun.step 2 task.contarg="+task.contarg);
	    */
	},
	subst(assignment){
	    // console.log(assignment);
	    // assignment=Object.create(assignment);
	    if(!assignment || Object.keys(assignment).length===0) return this;
	    assignment=Object.assign({ }, assignment);
	    for(var par of this.pars) par.remove(assignment);
	    // 2019/12/2 bug 莉･荳�2陦瑚ｿｽ蜉�
	    if(this.contpar!=null)
		this.contpar.remove(assignment);
	    // console.log(assignment);
	    let funcall=this.funcall;
	    if(funcall!=null) funcall=funcall.subst(assignment);
	    return new HatFun(this.pars, this.contpar, funcall, this.source);
	    /*
	    let f=new HatFun(this.pars, this.contpar, funcall, this.source);
	    console.log("HatFun.subst f="+f);
	    return f;
	    */
	},
	toString( ){
	    var str='^', pars=this.pars;
	    if(pars!=null && pars.length>0){
		str+='('+pars[0];
		for(var i=1; i<pars.length; ++i)
		    str+=' '+pars[i];
		if(this.contpar!=null)
		    str+=' . '+this.contpar;
		str+=')';
	    }else if(this.contpar!=null)
		str+=' '+this.contpar;
	    else str+='()';
	    return str+' '+this.funcall;
	},
	isAtom( ){
	    return false;
	},
	type: "HatFun"
    };

    JSFun.prototype={
	__proto__: HatExp.prototype,
	step(task){
	    currentSource=this.source;
	    if(task.contarg){
		task.fun=task.contarg;
		task.contarg=null;
	    }else task.fun=task.popCont( );
	    let args=[ ];
	    for(let arg of task.args){
		switch(arg.type){
		case 'HatVar':
		    switch(arg.name){
		    case 'true':
			args.push(true);
			break;
		    case 'false':
			args.push(false);
			break;
		    default:
			args.push(arg);
		    }
		    break;
		case 'Number':
		    args.push(arg.value);
		    break;
		case 'String':
		    args.push(arg.string);
		    break;
		default:
		    args.push(arg);
		}
	    }
	    let value=this.fun.apply(this, args);
	    task.args=[this.js2hatdata(value)];
	    /*
	    switch(typeof value){
	    case 'boolean':
		task.args=[new HatVar(value.toString(), this.source)];
		break;
	    case 'string':
		task.args=[new Str(value, this.source)];
		break;
	    case 'number':
		task.args=[new HatNumber(value, this.source)];
		break;
	    default:
		if(Array.isArray(value)){
		    for(let el of value){
		    }
		    task.args=[makeSequence(value, 0)];
		}else{
		    console.log("value="+value);
		    console.log("typeof value="+(typeof value));
		    task.args=[value];
		}
	    }
	    */
	},
	js2hatdata(value){
	    switch(typeof value){
	    case 'boolean':
		return new HatVar(value.toString(), this.source);
	    case 'string':
		return new Str(value, this.source);
	    case 'number':
		return new HatNumber(value, this.source);
	    }
	    if(!Array.isArray(value)) return value;
	    array=[ ];
	    for(let el of value)
		array.push(this.js2hatdata(el));
	    return makeSequence(array, 0);
	},
	toString( ){
	    return 'JavaScript '+this.string;
	},
	type: "JSFun"
    };
    
    function substArray(array, start, assignment){
	var array2=[ ];
	for(let i=start, n=array.length; i<n; ++i)
	    array2.push(array[i].subst(assignment));
	return array2;
    }

    function makeArgFun(args, tail){
	if(args==null || args.length==0) return tail;
	var source=args[0].source;
	var list=new List(args, 0, tail, null, source);
	var fc=new List([tmpVar], 0, list, null, source);
	return new HatFun([tmpVar], null, fc, source);
    }

    function isNumber(value){
	return Number.isFinite(value);
    }

    List.prototype={
	__proto__: HatExp.prototype,
	step(task){
	    /*
	    log("List.step task.fun="+task.fun);
	    log("List.step task.args="+task.args);
	    log("List.step task.contarg="+task.contarg);
	    */
	    if(this.array.length==0){ // 遨ｺ繝ｪ繧ｹ繝医↑繧峨�
		console.warn("List.step empty "+this.source);
		// 蠑墓焚繧堤┌隕悶＠縺ｦ謌ｻ繧�
		/*
		task.fun=task.popCont();
		task.args=null;
		task.contarg=null;
		*/
		task.fun=null; // 繧ｿ繧ｹ繧ｯ邨ゆｺ�
		return;
	    }
	    task.pushCont(makeArgFun(task.args, task.contarg));
	    let fun=this.getFirst( );
	    if(!fun) console.error("List.step fun="+fun);
	    // console.log("List.step assignment="+JSON.stringify(this.assignment));
	    var list=this.getRest( ), args=[ ];
	    // while(list!=null && list.type=='List'){
	    while(list && list instanceof List && list.array){
		// if(!list.array) break;
		let first=list.getFirst( );
		if(first && first.subst) first=first.subst(this.assignment);
		args.push(first);
		list=list.getRest( );
	    }
	    task.args=args;
	    // log("List.step list="+list);
	    task.contarg=list;
	    task.fun=fun;
	    if(!fun.step) console.warn("List.step !fun.step");
	    /*
	    if(fun.step){ // HatExp縺ｪ繧峨�
		task.fun=fun; // 縺昴�縺ｾ縺ｾ谺｡縺ｫ騾ｲ繧
		return;
	    }
	    console.log("List.prototype step fun="+fun);
	    switch(typeof fun){
	    case 'number':
	    case 'boolean':
		if(args.length>0){
		    let arg0=args[0];
		    if(arg0.type=='HatVar'){
			task.fun=arg0;
			task.args[0]=fun;
			return;
		    }
		}
		args.unshift(fun);
		if(list){
		    task.fun=list;
		    task.contarg=null;
		}else task.fun=task.popCont( );
		break;
	    default:
		task.fun=new HatVar(fun.toString(), this.source);
	    }
	    */
	},
	getFirst( ){
	    /*
	    console.log("getFirst this.array="+this.array);
	    console.log("getFirst this.start="+this.start);
	    */
	    var el=this.array[this.start], undefined;
	    if(!el) return undefined;
	    if(typeof el == 'string') return new Str(el, this.source);
	    if(isNumber(el)) return el;
	    return el.subst(this.assignment);
	},
	getRest( ){
	    var a=this.array, s=this.start+1;
	    if(s<a.length)
		return new List(a, s, this.tail, this.assignment, this.source);
	    var t=this.tail;
	    return t!=null? t.subst(this.assignment): null;
	},
	subst(assignment){
	    /*
	    console.log(assignment);
	    console.trace( );
	    */
	    if(isEmpty(assignment)) return this;
	    var a=Object.assign({ }, assignment);
	    // console.log(a);
	    if(this.assignment!=null) a=Object.assign(a, this.assignment);
	    // console.log("List.subst this.array="+this.array);
	    return new List(this.array, this.start, this.tail, a, this.source);
	},
	toString( ){
	    // console.log(this);
	    if(!this.array) return "()";
	    var first=this.getFirst( );
	    var str="()";
	    if(first!=null){
		/*
		if(isNumber(first)) str=first+'';
		else str=first.isAtom( )? first.toString( ): '('+first+')';
		*/
		str=first.isAtom()? first.toString( ): '('+first+')';
	    }
	    var rest=this.getRest( );
	    while(rest!=null && rest.array){
		first=rest.getFirst( );
		if(first){
		    if(first.isAtom){
			if(first.isAtom()) str+=' '+first;
			else str+='('+first+')';
		    }else{
			console.warn("List.toString first="+first);
			str+='('+first+')';
		    }
		}else str+='()';
		rest=rest.getRest( );
	    }
	    if(rest!=null)
		str+=rest.isAtom()? ' . '+rest: ' '+rest;
	    return str;
	},
	isAtom( ){
	    return false;
	},
	type: "List"
    };

    function testList(){
	var source=new Source(__FILE__, __LINE__);
	var assignment={ };
	assignment["c"]=new Str("d", source);
	var list=new List([new Str("a", source), new Str("b", source), new HatVar("c", source)], 1, null, assignment, source);
	console.log("testList: list="+list);
	var list2=new List([new Str("e", source), new Str("f", source), new HatVar("g", source)], 1, list, assignment, source);
	console.log("testList: list2="+list2);
    }
    
    ContStack.prototype={
	__proto__: HatExp.prototype,
	step(task){
	    /*
	    log("ContStack.step this.first="+this.first);
	    log("ContStack.step task.args="+task.args);
	    log("ContStack.step task.contarg="+task.contarg);
	    log("ContStack.step this.rest="+this.rest);
	    */
	    task.fun=this.first;
	    task.stack=this.rest;
	},
	subst(assignment){
	    return this;
	    /* 2019/12/14 Sat debug
	       逞�憾�壹≠繧矩未謨ｰ蜀�〒蛻･縺ｮ髢｢謨ｰ蜷阪→蜷後§螻謇螟画焚繧剃ｽｿ縺�→謌ｻ縺｣縺溷ｾ後〒繧ゅ�
	       縺昴�螻謇螟画焚縺悟盾辣ｧ縺輔ｌ繧九�
	    if(assignment==null) return this;
	    var undefined;
	    if(assignment===undefined) return this;
	    let first=this.first, rest=this.rest;
	    if(first) first=first.subst(assignment);
	    if(rest) rest=rest.subst(assignment);
	    return new ContStack(first, rest);
	    */
	},
	toString( ){
	    var s='(ContStack ';
	    for(var list=this; list!=null; list=list.rest)
		s+='('+list.first+')';
	    return s+')';
	},
	type: "ContStack"
    };

    function arrayUnion(array, array2){
	for(let el of array2)
	    if(!array.includes(el)) array.push(el);
	return array;
    }
    function arrayDifference(array, array2){
	return array.filter(function(el){
	    return !array2.includes(el);
	});
    }

    let sample1flag=false;

    Script.prototype={
	parse(code){
	    code=code.replace(/#\|[^|]*\|#/gu, function(str){
		return str.replace(/[^\n]/gu, "");
	    });
	    code=code.replace(/#;/gu, function(str){
		return "IGNORE_NEXT";
	    });
	    var ignore_count=0;
	    for(let sexp of parse(code, 1)){
		if(sexp.content=="IGNORE_NEXT"){
		    ++ignore_count;
		    continue;
		}
		if(ignore_count>0){
		    --ignore_count;
		    continue;
		}
		let first=sexp.content[0], second=sexp.content[1];
		switch(first.content){
		case "defineCPS":
		    sample1flag=(second.content=="sample1");
		    this.defined[second.content]=
			Array2HatExp(sexp.content, 2, this.path);
		    break;
		case "include":
		    let path=this.path.split("/");
		    path.pop( );
		    path.push(second.content);
		    this.included.push(getScript(path.join("/")));
		    break;
		}
	    }
	},
	loaded( ){
	    if(--this.loading>0) return;
	    for(let callback of this.callbacks)
		callback( );
	},
	includeScript(script){
	    for(let [key, value] of Object.entries(script.dictionary)){
		if(this.dictionary[key]){
		    console.warn('Warning: '+key+' is defined in '+
				 script.name+' and '+this.name+'.');
		}else this.dictionary[key]=value;
	    }
	},
	getClosure( ){
	    let closure=[ ];
	    for(let addition=this.included; addition.length>0;){
		Array.prototype.push.apply(closure, addition);
		let children=[ ];
		for(let script of addition)
		    arrayUnion(children, script.included);
		addition=arrayDifference(children, closure);
	    }
	    return closure;
	},
	getDictionary( ){
	    if(this.dictionary) return this.dictionary;
	    let dictionary=Object.assign({ }, this.defined);
	    for(let script of this.getClosure( )){
		for(let [key, value] of Object.entries(script.defined)){
		    let value2=dictionary[key];
		    if(value2){
			console.warn("Warning: "+key+" at "+value.source+
				     " is ignored because it is defined at "+
				     value2.source+" already.");
		    }else dictionary[key]=value;
		}
	    }
	    this.dictionary=dictionary;
	    return dictionary;
	},
	type: "Script"
    };
    
    // 髢｢謨ｰ
    function getScript(path){
	let script=scriptTable[path];
	if(script) return script;
	++loading;
	script=new Script(path);
	scriptTable[path]=script;
	httpGet(path, function(text){
	    script.parse(text);
	    if(--loading>0) return;
	    Array.prototype.push.apply(TaskQ, pending);
	    pending=[ ];
	});
	return script;
    }
    /*
      function newActor(script, args){
      var m=script.dictionary['main'];
      if(!m) return null;
      var a=Actor(script);
      var t=Task(a, m, args, null);
      if(script.loading>0) script.tasks.push(t);
      else TaskQ.push(t);
      }
    */
    
    function currentActor( ){
	if(currentTask==null) return null;
	return currentTask.actor;
    }
    
    function isSExpAtom(sexp, atom){
	return sexp.type=='atom' && sexp.content==atom;
    }
    
    function SExp2Var(sexp, path){
	let source=new Source(path, sexp.location.start.line);
	/*
	switch(sexp.content){
	case 'true':
	    return new HatBoolean(true, source);
	    break;
	case 'false':
	    return new HatBoolean(false, source);
	    break;
	}
	*/
	let number=Number(sexp.content);
	if(isNaN(number))
	    return new HatVar(sexp.content, source);
	return new HatNumber(number, source);
    }
    
    function SExp2String(sexp){
	switch(sexp.type){
	case 'list':
	    var list=sexp.content;
	    var len=list.length;
	    if(len==0) return "( )";
	    var buf="("+SExp2String(list[0]);
	    for(var i=1; i<len; ++i)
		buf+=SExp2String(list[i]);
	    return buf+")";
	default:
	    return sexp.content;
	}
    }
    
    function SExp2HatExp(sexp, path){
	var source=new Source(path, sexp.location.start.line);
	switch(sexp.type){
	case 'list':
	    if(sexp.content.length>0)
		return Array2HatExp(sexp.content, 0, path);
	    return new List(null, 0, null, null, source);
	case 'atom':
	    if(isSExpAtom(sexp, 'JavaScript'))
		return new JSVar(source);
	    return SExp2Var(sexp, path);
	case 'string':
	    return new Str(sexp.content, source);
	default:
	    throw new Error(source.toString( )+": Error "+sexp);
	}
    }
    
    function Array2HatExp(array, start, path){
	if(isSExpAtom(array[start], '^'))
	    return Array2HatFun(array, start, path);
	return Array2List(array, start, path);
    }
    
    function Array2HatFun(array, start, path){
	var head=array[start+1];
	var pars=[ ], contpar=null;
	switch(head.type){
	case 'list': // 莉ｮ蠑墓焚縺後Μ繧ｹ繝医�縺ｨ縺�
	    var list2=head.content;
	    var len=list2.length;
	    for(var i=0; i<len; ++i){
		if(isSExpAtom(list2[i], '.')) break;
		pars.push(SExp2Var(list2[i], path));
	    }
	    if(++i<len) contpar=SExp2Var(list2[i], path);
	    break;
	case 'atom': // 邯咏ｶ壹�莉ｮ蠑墓焚縺ｮ縺ｿ縺ｮ縺ｨ縺�
	    contpar=SExp2Var(head, path);
	    break;
	}
	var fc=Array2List(array, start+2, path);
	var source=new Source(path, array[start].location.start.line);
	return new HatFun(pars, contpar, fc, source);
    }
    
    function Array2List(array, start, path){
	var len=array.length;
	var array2=[ ];
	var tail=null;
	for(var i=start; i<len; ++i){
	    if(isSExpAtom(array[i], '.')){
		tail=SExp2HatExp(array[++i], path);
		break;
	    }
	    if(isSExpAtom(array[i], '^')){
		tail=Array2HatFun(array, i, path);
		break;
	    }
	    /*
	    if(sample1flag)
		console.log("Array2List array["+i+"]="+array[i].content);
	    */
	    array2.push(SExp2HatExp(array[i], path));
	}
	var source=new Source(path, array[start].location.start.line);
	return new List(array2, 0, tail, null, source);
    }
    
    function readHatCode(code, script, path){
	// console.log("readHatCode 1: code="+code);
	// code=code.replace(/#\|([^|]*\|[^#])*\|#/gu, function(str){
	code=code.replace(/#\|[^|]*\|#/gu, function(str){
	    // console.log("readHatCode 3: str="+str);
	    return str.replace(/[^\n]/gu, "");
	});
	// console.log("readHatCode 2: code="+code);
	for(var sexp of parse(code, 1)){
	    // console.log("sexp="+sexp);
	    var first=sexp.content[0];
	    // console.log("readHatCode 2: first="+JSON.stringify(first));
	    var second=sexp.content[1];
	    // console.log("readHatCode 3: second="+JSON.stringify(second));
	    switch(first.content){
	    case "defineCPS":
		// var rest=sexp.content.slice(2);
		// console.log("8: rest="+JSON.stringify(rest));
		script.dictionary[second.content]=
		    Array2HatExp(sexp.content, 2, path);
		break;
	    case "include":
		++script.loading;
		path2=second.content;
		httpGet(path2, function(text){
		    readHatCode(text, script, path2);
		});
		break;
	    }
	}
	if(--script.loading<=0){
	    Array.prototype.push.apply(TaskQ, script.tasks);
	}
    }
    
    function httpGet(path, callback){
	var request=new XMLHttpRequest( );
	request.onreadystatechange=function( ){
	    if( request.readyState==4 && request.status==200 ){
		callback(request.responseText);
		// callback(httpObj.responseURL);
	    }
	}
	/*
	  var date=new Date( );
	  request.open('GET', path+'?'+date.getTime( ), true);
	*/
	request.open('GET', path+'?', true);
	request.send( );
    }
    
    function loadFile(fileName, callback){
	var httpObj=new XMLHttpRequest( );
	httpObj.onreadystatechange=function( ){
	    if ((httpObj.readyState==4)&&(httpObj.status==200)){
		callback(httpObj.responseText);
		// callback(httpObj.responseURL);
	    }
	}
	httpObj.open('GET',fileName+"?"+(new Date()).getTime(),true);
	// ?莉･髯阪�繧ｭ繝｣繝�す繝･縺輔ｌ縺溘ヵ繧｡繧､繝ｫ縺ｧ縺ｯ縺ｪ縺上∵ｯ主屓隱ｭ縺ｿ霎ｼ繧縺溘ａ縺ｮ繧ゅ�
	// httpObj.send(null);
	httpObj.send( );
    }
    
    HatExp.isExp=function(obj, type){
	if(!HatExp.prototype.isPrototypeOf(obj))
	    return false;
	return type? obj.type===type: true;
    };
    
    function isEmpty(obj){
	return obj==null || Object.keys(obj).length==0;
    }
    
    function stepTask(task){
	currentTask=task;
	let fun=task.fun;
	if(fun && fun.step) task.fun.step(task);
	else console.error("Illegal function: "+fun);
    }
    
    /** JavaScript髢｢謨ｰ
	Hat蠑上°繧牙他縺ｳ蜃ｺ縺輔ｌ繧矩未謨ｰ
    **/
    
    /*
      Str path
      ContStack stack
    */
    function httpGetHatExp(path, stack){
	httpGet(path.string, function(text){
	    var source=new Source(path.string, 1);
	    var task=new Task(currentActor( ), null,
			      [new Str(text, source)], null, stack);
	    task.fun=task.popCont( );
	    TaskQ.push(task);
	});
    }

    function makePair(first, tail){
	return new List([first], 0, tail, null, this.source);
    }

    function makeSequence(array, start){
	// log("makeSequence:"+array);
	return new HatFun([tmpVar], null,
			  new List([tmpVar], 0,
				   new List(array, start, emptySeq, null,
					    currentSource),
				   null, currentSource), currentSource);
    }
    
    /** 繝｢繧ｸ繝･繝ｼ繝ｫ蜀�､画焚 **/
    let tmpVar=new HatVar("__TMP__", new Source(__FILE__, __LINE__));
    let TaskQ=[ ]; // 繧ｿ繧ｹ繧ｯ縺悟ｮ溯｡碁��↓荳ｦ縺ｶ蠕�■陦悟�
    let currentTask=null; // 迴ｾ蝨ｨ繧､繝ｳ繧ｿ繝励Μ繧ｿ縺悟ｮ溯｡後＠縺ｦ縺�ｋ繧ｿ繧ｹ繧ｯ
    let scriptTable={ }; // path 縺九ｉ ScriptRecord 縺ｸ縺ｮ騾｣諠ｳ驟榊�
    let parse=require("sexpr-plus").parse;
    let mainVar=new HatVar('main', new Source(__FILE__, __LINE__));
    let loading=0; // 隱ｭ霎ｼ荳ｭ縺ｮ繧ｹ繧ｯ繝ｪ繝励ヨ謨ｰ
    let pending=[ ]; // 繧ｹ繧ｯ繝ｪ繝励ヨ隱ｭ霎ｼ蠕�■縺ｮ繧ｿ繧ｹ繧ｯ髮�粋
    let emptySeq=new HatVar("seq_empty", new Source(__FILE__, __LINE__));
    let currentSource;
    let animationID;
    let lastTime;
    let zero=new HatNumber(0, new Source(__FILE__, __LINE__));
    /*
      Hat險隱槭�繧ｹ繧ｯ繝ｪ繝励ヨpath縺ｧ螳夂ｾｩ縺輔ｌ縺滄未謨ｰmain縺ｫ蠑墓焚args繧剃ｸ弱∴縺ｦ螳溯｡後☆繧九�
      path: 繧ｹ繧ｯ繝ｪ繝励ヨ縺ｮ繝代せ
      command: 繧ｳ繝槭Φ繝�
    */
    return{
	True: new HatVar("#t", new Source(__FILE__, __LINE__)),
	False: new HatVar("#f", new Source(__FILE__, __LINE__)),
	emptySeq: emptySeq,
	makePair: makePair,
	/* 繧ｽ繝ｼ繧ｹ繝輔ぃ繧､繝ｫpath繧定ｪｭ縺ｿ霎ｼ縺ｿ縲�未謨ｰfunc繧貞ｮ溯｡後☆繧九�*/
	start: function(path, func){
	    var caller=__STACK__[1];
	    var source=new Source(caller.getFileName( ), caller.getLineNumber( ));
	    var func_var=new HatVar(func, source);
	    /*
	    var a=command.split(/\s/);
	    var fun=new Var(a[0], source), args=[ ];
	    for(var i=1, n=a.length; i<n; ++i)
		args.push(new Str(a[i], source));
	    var list=new List(args, 0, null, null, source);
	    */
	    new Actor(getScript(path)).start(func_var, [ ]);
	    setTimeout(performTasks, 0);
	},
	/* 繧ｽ繝ｼ繧ｹ繧ｳ繝ｼ繝営ode繧定ｪｭ縺ｿ霎ｼ縺ｿ縲√さ繝槭Φ繝営ommand繧貞ｮ溯｡後☆繧九�
	   繧ｽ繝ｼ繧ｹ繝輔ぃ繧､繝ｫ蜷膏ath縺ｯ繧ｨ繝ｩ繝ｼ繝｡繝�そ繝ｼ繧ｸ縺ｪ縺ｩ縺ｧ菴ｿ繧上ｌ繧九�*/
	startCode: function(path, code, command){
	    // testList( );
	    if(animationID) window.cancelAnimationFrame(animationID);
	    resetCanvas();
	    TaskQ=[ ];
	    /*
	    var caller=__STACK__[1];
	    var source=new Source(caller.getFileName( ),
				  caller.getLineNumber( ));
	    let fun=SExp2HatExp(a[0], "Command");
	    for(let i=1, n=a.length; i<n; ++i)
		args.push(new Str(a[i], source));
		Array2List(, 0, "Command");
	    var fun=new Var(a[0], source), args=[ ];
	    var list=new List(args, 0, null, null, source);
	    var argSeq=makeArgFun(args, emptySeq);
	    */
	    var script=new Script(path);
	    scriptTable[path]=script;
	    script.parse(code);
	    new Actor(script).start(parse(command, 1), "Command");
	    setTimeout(performTasks, 0);
	    // new Actor(script).start(func_var, [ ]);
	    // new Actor(script).start(fun, argSeq);
	    // setTimeout(performTasks, 0);
	},
	stop: function(){ running=false; },
	restart: function(){ running=true; setTimeout(performTasks, 0); },
	makeSequence: makeSequence,
	log_on: function(){ log = console.log.bind(console, "%s"); },
	log_off: function(){ log = I; },
	waitDisplay: function(ret){
	    // console.log("waitDisplay ret.type="+ret.type);
	    animationID=window.requestAnimationFrame(function(time){
		if(lastTime){
		    dt=new HatNumber((time-lastTime)/1000, ret.source);
		}else{
		    // console.log('lastTime='+lastTime);
		    dt=zero;
		}
		// console.log("waitDisplay dt="+dt);
		if(running) lastTime=time;
		else{
		    let undefined;
		    lastTime=undefined;
		}
		let task=new Task(currentTask.actor, ret, [dt], null, null);
		TaskQ.push(task);
		// setTimeout(performTasks, 0);
		copyCanvas();
	    });
	},
	valueString: function(exp){
	    if(!exp) return "undefined";
	    if(exp.string) return exp.string;
	    if(exp.type=="HatVar") return exp.getValue(currentTask)+"";
	    return exp.toString();
	},
    };
})();
},{"sexpr-plus":2}],2:[function(require,module,exports){
module.exports = (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = function(f) { return f },
        peg$c1 = { type: "other", description: "initial shebang ('#!') line" },
        peg$c2 = "#!",
        peg$c3 = { type: "literal", value: "#!", description: "\"#!\"" },
        peg$c4 = /^[^\n]/,
        peg$c5 = { type: "class", value: "[^\\n]", description: "[^\\n]" },
        peg$c6 = "\n",
        peg$c7 = { type: "literal", value: "\n", description: "\"\\n\"" },
        peg$c8 = { type: "any", description: "any character" },
        peg$c9 = { type: "other", description: "whitespace" },
        peg$c10 = " ",
        peg$c11 = { type: "literal", value: " ", description: "\" \"" },
        peg$c12 = "\t",
        peg$c13 = { type: "literal", value: "\t", description: "\"\\t\"" },
        peg$c14 = "\r",
        peg$c15 = { type: "literal", value: "\r", description: "\"\\r\"" },
        peg$c16 = { type: "other", description: "comment" },
        peg$c17 = ";",
        peg$c18 = { type: "literal", value: ";", description: "\";\"" },
        peg$c19 = function(it) { return it; },
        peg$c20 = function(q, f) { return outputList([ q, f ], location()) },
        peg$c21 = "(",
        peg$c22 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c23 = ")",
        peg$c24 = { type: "literal", value: ")", description: "\")\"" },
        peg$c25 = function(c) { return outputList(c, location()); },
        peg$c26 = { type: "other", description: "list contents" },
        peg$c27 = function(first, rest) { return buildList(first, rest, 1) },
        peg$c28 = "'",
        peg$c29 = { type: "literal", value: "'", description: "\"'\"" },
        peg$c30 = function() { return outputAtom("quote", location()) },
        peg$c31 = "`",
        peg$c32 = { type: "literal", value: "`", description: "\"`\"" },
        peg$c33 = function() { return outputAtom("quasiquote", location()) },
        peg$c34 = ",@",
        peg$c35 = { type: "literal", value: ",@", description: "\",@\"" },
        peg$c36 = function() { return outputAtom("unquote-splicing", location()) },
        peg$c37 = ",",
        peg$c38 = { type: "literal", value: ",", description: "\",\"" },
        peg$c39 = function() { return outputAtom("unquote", location()) },
        peg$c40 = function(c) {
            return outputString(c.join(""), location())
          },
        peg$c41 = "\"",
        peg$c42 = { type: "literal", value: "\"", description: "\"\\\"\"" },
        peg$c43 = "\\",
        peg$c44 = { type: "literal", value: "\\", description: "\"\\\\\"" },
        peg$c45 = function(c) { return c; },
        peg$c46 = /^["\\]/,
        peg$c47 = { type: "class", value: "[\"\\\\]", description: "[\"\\\\]" },
        peg$c48 = /^[^"\\]/,
        peg$c49 = { type: "class", value: "[^\"\\\\]", description: "[^\"\\\\]" },
        peg$c50 = /^[bfnrtv0]/,
        peg$c51 = { type: "class", value: "[bfnrtv0]", description: "[bfnrtv0]" },
        peg$c52 = function(c) {
          switch(c) {
            case "b": return "\b";
            case "f": return "\f";
            case "n": return "\n";
            case "r": return "\r";
            case "t": return "\t";
            case "v": return "\v";
            case "0": return "\0";
          }
        },
        peg$c53 = function(c) {
          return c;
        },
        peg$c54 = function(c) {
          return outputAtom(c.join(""), location());
        },
        peg$c55 = function(s, c) { return c; },
        peg$c56 = /^[;"'`,\\()\n\t\r ]/,
        peg$c57 = { type: "class", value: "[;\"'`,\\\\()\\n\\t\\r ]", description: "[;\"'`,\\\\()\\n\\t\\r ]" },
        peg$c58 = /^[^;"'`,\\()\n\t\r ]/,
        peg$c59 = { type: "class", value: "[^;\"'`,\\\\()\\n\\t\\r ]", description: "[^;\"'`,\\\\()\\n\\t\\r ]" },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseshebangLine();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseform();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseform();
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c0(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseshebangLine() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c2) {
        s1 = peg$c2;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c3); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c4.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c5); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c4.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c5); }
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s3 = peg$c6;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c7); }
          }
          if (s3 === peg$FAILED) {
            s3 = peg$parseEOF();
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c1); }
      }

      return s0;
    }

    function peg$parseEOF() {
      var s0, s1;

      s0 = peg$currPos;
      peg$silentFails++;
      if (input.length > peg$currPos) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }
      peg$silentFails--;
      if (s1 === peg$FAILED) {
        s0 = void 0;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsewhitespace() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s1 = peg$c10;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 9) {
          s1 = peg$c12;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c13); }
        }
        if (s1 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s1 = peg$c6;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c7); }
          }
          if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 13) {
              s1 = peg$c14;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c15); }
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (input.charCodeAt(peg$currPos) === 32) {
            s1 = peg$c10;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 9) {
              s1 = peg$c12;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c13); }
            }
            if (s1 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 10) {
                s1 = peg$c6;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c7); }
              }
              if (s1 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 13) {
                  s1 = peg$c14;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c15); }
                }
              }
            }
          }
        }
      } else {
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }

      return s0;
    }

    function peg$parseendOfLineComment() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 59) {
        s1 = peg$c17;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c18); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c4.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c5); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c4.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c5); }
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s3 = peg$c6;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c7); }
          }
          if (s3 === peg$FAILED) {
            s3 = peg$parseEOF();
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }

      return s0;
    }

    function peg$parse__() {
      var s0;

      s0 = peg$parseendOfLineComment();
      if (s0 === peg$FAILED) {
        s0 = peg$parsewhitespace();
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      s0 = [];
      s1 = peg$parse__();
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parse__();
      }

      return s0;
    }

    function peg$parseform() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parselist();
      if (s1 === peg$FAILED) {
        s1 = peg$parseatom();
        if (s1 === peg$FAILED) {
          s1 = peg$parsestring();
          if (s1 === peg$FAILED) {
            s1 = peg$parsequotedForm();
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c19(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsequotedForm() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsequote();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseform();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c20(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parselist() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c21;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c22); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parselistContents();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                  s6 = peg$c23;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c24); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c25(s4);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parselistContents() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseform();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseform();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseform();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c27(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }

      return s0;
    }

    function peg$parsequote() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c28;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c30();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 96) {
          s1 = peg$c31;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c32); }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c33();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c34) {
            s1 = peg$c34;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c35); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c36();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s1 = peg$c37;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c38); }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c39();
            }
            s0 = s1;
          }
        }
      }

      return s0;
    }

    function peg$parsestring() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestringDelimiter();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestringContents();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsestringDelimiter();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c40(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsestringDelimiter() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 34) {
        s0 = peg$c41;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c42); }
      }

      return s0;
    }

    function peg$parsestringContents() {
      var s0, s1;

      s0 = [];
      s1 = peg$parsestringChar();
      if (s1 === peg$FAILED) {
        s1 = peg$parsestringEscapedChar();
        if (s1 === peg$FAILED) {
          s1 = peg$parsestringEscapedSpecialChar();
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parsestringChar();
        if (s1 === peg$FAILED) {
          s1 = peg$parsestringEscapedChar();
          if (s1 === peg$FAILED) {
            s1 = peg$parsestringEscapedSpecialChar();
          }
        }
      }

      return s0;
    }

    function peg$parsestringEscapedChar() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c43;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c44); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestringCharNeedingEscape();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c45(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsestringCharNeedingEscape() {
      var s0;

      if (peg$c46.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }

      return s0;
    }

    function peg$parsestringChar() {
      var s0;

      if (peg$c48.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }

      return s0;
    }

    function peg$parsestringEscapedSpecialCharLetter() {
      var s0;

      if (peg$c50.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c51); }
      }

      return s0;
    }

    function peg$parsestringEscapedSpecialChar() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c43;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c44); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestringEscapedSpecialCharLetter();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c52(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseatom() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseatomContents();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c53(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseatomContents() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseatomChar();
      if (s2 === peg$FAILED) {
        s2 = peg$parseatomEscapedChar();
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseatomChar();
          if (s2 === peg$FAILED) {
            s2 = peg$parseatomEscapedChar();
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c54(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseatomEscapedChar() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c43;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c44); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseatomCharNeedingEscape();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c55(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseatomCharNeedingEscape() {
      var s0;

      if (peg$c56.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c57); }
      }

      return s0;
    }

    function peg$parseatomChar() {
      var s0;

      if (peg$c58.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c59); }
      }

      return s0;
    }


      function extractList(list, index) {
        var result = [], i;

        for (i = 0; i < list.length; i++) {
          if (list[i][index] !== null) {
            result.push(list[i][index]);
          }
        }

        return result;
      }

      function buildList(first, rest, index) {
        return (first !== null ? [first] : []) .concat(extractList(rest, index));
      }

      function outputString(content, loc) {
        return {
          type : "string",
          content : content,
          location : loc
        };
      }

      function outputAtom(content, loc) {
        return {
          type : "atom",
          content : content,
          location : loc
        };
      }

      function outputList(content, loc) {
        return {
          type : "list",
          content : content,
          location : loc
        };
      }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})();

},{}]},{},[1]);
