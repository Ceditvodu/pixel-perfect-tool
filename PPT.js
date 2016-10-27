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
// class PPT{
// 	constructor(options){
// 		this.status;
// 		var init = ({
// 			string:this.ajaxCall,
// 			object:this.setup,
// 		})[typeof options] || (()=>{console.log('please setup pixel-perfect-tool options')});
// 		init(options);

// 		this.setup = (options)=>{
// 			this.status = options.status || false;
// 			console.log(this.status);
// 		}
// 	}

// 	ajaxCall(){
// 		console.log("cool");
// 	}
// }

{
	var ppt = (parameters, ...args) => {
		var enabled;
		var positions;

		let init = ({
			string: ajaxCall,
			object: setup,
		})[typeof parameters] || (()=>{console.log('please setup pixel-perfect-tool options')});
		init(parameters, generate);

		function setup(parameters, build){
			enabled = parameters.enabled || 'false';
			positions = parameters.position.split(" ") || ['left', 'top'];

			let start = ({
				true: build,
				false: () => {console.log('pixel-perfect-tool - disabled')},
			})[enabled] || (()=>{console.log('please setup pixel-perfect-tool options')});
			start(enabled, positions);		
		}

		function ajaxCall(parameters){
			console.log('i will make it soon');
		}

		function generate(status, positions){
			let body = document.body;
			let toolbar = document.createElement('div');
			toolbar.className = "toolbar";

			var addPosition = (positions_array, element, index) => {
				({
					true: () => { 
						element.style[positions_array[index]] = '0px';
						addPosition(positions_array, element, ++index);
					},
					false: () => {}
				})[(index<=positions_array.length)]();
			} 
			addPosition(positions, toolbar, 0);

			body.append(toolbar);

			console.log(toolbar);
		}
		
	}
}

ppt({
	enabled:true,
	position:"right top"
});

