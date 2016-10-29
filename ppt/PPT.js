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

{
	var ppt = (parameters, ...args) => {
		var enabled;
		var positions;
		var items;

		let init = ({
			string: ajaxCall,
			object: setup,
		})[typeof parameters] || (()=>{log('please setup pixel-perfect-tool options')});
		init(parameters, addToolbar, addStencils);

		function setup(parameters, buildToolbar, buildStencils){
			enabled = parameters.enabled || false;
			positions = parameters.position.split(" ") || ['left', 'top'];
			items = parameters.items || false;

			let start = ({
				1: () => {
					buildToolbar(enabled, positions);
					({
						1:()=>{buildStencils(items)},
						0:()=>{log('there is no items');} 
					})[+(typeof items == 'object')]();
				},
				0: () => {log('pixel-perfect-tool - disabled')},
			})[+enabled] || (()=>{log('please setup pixel-perfect-tool options')});
			start();		
		}

		function ajaxCall(parameters){
			log('i will make it soon');
		}

		function addToolbar(status, positions){
			let body = document.body;
			addStyles(body);
			let toolbar = document.createElement('div');
			toolbar.className = "toolbar";

			let stencils = document.createElement('div');
			stencils.className = "stencils";


			let addPosition = (positions_array, element, index) => {
				({
					1: () => { 
						element.style[positions_array[index]] = '0px';
						addPosition(positions_array, element, ++index);
					},
					0: () => {}
				})[+(index<=positions_array.length)]();
			} 
			addPosition(positions, toolbar, 0);

			body.append(toolbar);
			body.append(stencils);

			log(toolbar);
		}

		function addStencils(items){
			let body = document.body;

			let stencils = document.getElementsByClassName('stencils')[0];
			//var stencil = new Stencil;

			var resolutions = Object.keys(items).map( key =>
			{ 
				var stencil = new Stencil;
				stencil.dataset.max_res = Math.max.apply(null, key.split('x'));
				stencil.dataset.min_res = Math.min.apply(null, key.split('x'));
				stencil.dataset.url = items[key]
				return stencil;
			});

			var createStencils = (array, parent, index) => {
				({
					1: ()=>{
						stencils.append(array[index]);
						console.dir(array[index]);
						createStencils(array, parent, ++index);
					},
					0: ()=>{}
				}[+(index < array.length)])();
			}
			createStencils(resolutions, stencils, 0);

			log(resolutions);

			
		}

		function log(message){
			console.log(message);
		}

	}

	function addStyles(body){
		let style = document.createElement('style');
		style.innerHTML = `
					.toolbar{
						background: green;
						height: 20px;
						opacity: .5;
						position: absolute;
						width: 100px;
					}
					.stencils{
						height:100%;
						left:0px;
						position:absolute;
						top:0px;
						width:100%;
					}
					stencil-item{
						width:100%;
						height: 100%;
						top: 0px;
						left: 0px;
						position: absolute;
						background-repeat: no-repeat;
						background-position: top center;

					}
			`;
		body.append(style);
	}
}

class StencilItem extends HTMLDivElement{
	constructor(){
		super();
	}

	createdCallback(){
		console.log(this);

		// this.hidden = true;
	}

	attachedCallback(){
		this.style.backgroundImage = 'url('+this.dataset.url+')';


	}

 

}

var Stencil = document.registerElement("stencil-item", StencilItem);


ppt({
	enabled:true,
	position:"right top",
	items: {
		'1201x9999': '1200px.jpg',
		'321x1200': '960px.jpg',
		'0x320': '320px.jpg'
	}
});

