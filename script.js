'use strict'
/**
  * @name PPT
  * @version 1.0.0
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license MIT
  * @class
  * @namespace PPT
  * @constructs
  * @classdesc This is tool wich can help to create pixel-perfect design
  * @example var spoiler = new Spoiler('spoiler','opened', 1);
  * @param {String} options - Name of json file with options.
  * @param {Object} options - Settings for a project.
  * @param {String} options.status - Tell us if tool enabled/disables.
  */
class PPT{
	constructor(options){
		this.callesd = options;
		console.log(this.callesd);
		var init = ({
			string:this.ajaxCall,
			object:this.setup,
		})[typeof options] || (()=>{console.log('please setup pixel-perfect-tool options')});
		init(options);
	}

	ajaxCall(){
		console.log("cool");
	}

	setup(options){
		let status = options.status || false;

		console.log(status);
	}

}

var ppt = new PPT({status:'en'});