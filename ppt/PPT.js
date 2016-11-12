'use strict'
{
/**
  * @name PPT
  * @version 1.0.1
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license MIT
  * @desc It is tool for pixel perfect mark up! 
  * @example 
		  ppt({
				enabled:true,
				position:"right top",
				items: {
					'1201x9999': '1200px.jpg',
					'960x1200': '960px.jpg',
					'0x960': '320px.jpg'
				}
			});
  * @param {Boolean} parametrs.enabled - Status trigger.
  * @param {String} parametrs.position - Position of toolbox interface on document.
  * @param {Object} parametrs.items - List of items in next structer {'min_resolutionxmax_resolution':'file adress'}.
  */
	var ppt = (parameters, ...args) => {
		let init = ({
			string: ajaxCall,
			object: setup,
		})[typeof parameters] || (()=>{log('please setup pixel-perfect-tool options')});
		init(parameters, addToolbar, addStencils);
	}

  /**
    * @function setup 
    * @desc Initialized work of script according parametrs.
    * @param {Object} parametrs  - parametrs that tackes from host function.
    * @mamberof ppt
    * @instance
    */
		function setup(parameters, buildToolbar, buildStencils){
			var enabled = parameters.enabled || false;
			var positions = parameters.position.split(" ") || ['left', 'top'];
			var items = parameters.items || false;

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

/**
  * @function ajaxCall 
  * @desc For getting parametrs from outer file.
  * @param {Object} parametrs  - Parametrs that tackes from host function.
  * @mamberof ppt
  * @instance
  */
	function ajaxCall(parameters){
		log('i will make it soon');
	}

/**
  * @function addToolbar 
  * @desc Function that adding html code of toolbar to document.
  * @param {Boolean} status  - Worked script or no.
  * @param {String} positions - Toolbar position according window [top, right, bottom, left].
  * @mamberof ppt
  * @instance
  */
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

		toolbar.innerHTML = addTools();

		body.append(toolbar);
			
		toolbar.addEventListener("click", (event)=>{delegate(toolbar, event)} );
		
		body.append(stencils);
	}

/**
  * @function addToolbar 
  * @desc Function that adding html code of toolbar to document.
  * @param {Boolean} status  - Worked script or no.
  * @param {String} positions - Toolbar position according window [top, right, bottom, left].
  * @mamberof ppt
  * @instance
  */
	function addTools(){
		var parent = document.createElement('div');
		parent.append(createOnOff());

		return parent.innerHTML;
	}	

/**
  * @function addToolbar 
  * @desc Function that adding html code of toolbar to document.
  * @param {Boolean} status  - Worked script or no.
  * @param {String} positions - Toolbar position according window [top, right, bottom, left].
  * @mamberof ppt
  * @instance
  */
	function createOnOff(){
		let on_off = document.createElement('span');
		on_off.className = 'toolbar_tool';

		let label = document.createElement('label');
		label.className = 'toolbar_on-off toolbar_on-off__off';
		label.htmlFor = 'onoff';
		label.innerHTML = 'on/off';
		on_off.append(label);

		let control = document.createElement('input');
		control.type = 'checkbox';
		control.id = 'onoff'
		on_off.append(control);

		return on_off;
	}	

/**
  * @function addStencils 
  * @desc Function that adding html code of toolbar to document.
  * @param {Boolean} status  - Worked script or no.
  * @mamberof ppt
  * @instance
  */
	function addStencils(items){
		let body = document.body;
		let stencils = document.getElementsByClassName('stencils')[0];

		var resolutions = Object.keys(items).map( key =>
		{ 
			var stencil = new Stencil;
			stencil.dataset.max_res = Math.max.apply(null, key.split('x'));
			stencil.dataset.min_res = Math.min.apply(null, key.split('x'));
			stencil.dataset.url = items[key];
			return stencil;
		});

		var createStencils = (array, parent, index) => {
			({
				1: ()=>{
					stencils.append(array[index]);
					createStencils(array, parent, ++index);
				},
				0: ()=>{}
			}[+(index < array.length)])();
		}
		createStencils(resolutions, stencils, 0);

	}

/**
  * @function delegate 
  * @desc delegation of events on toolbar.
  * @param {Object} object  - Object under some action.
  * @mamberof ppt
  * @instance
  */
	function delegate(object, event){
		let tool = event.target;

		({
			onoff:()=>{
				({
					1:()=>{
						var stencils = document.getElementsByTagName('stencil-item')[0];
						stencils.style.display = 'none';
					},
					0:()=>{
						var stencils = document.getElementsByTagName('stencil-item')[0];
						stencils.style.display = 'block';
					}
				}[+(tool.checked)])()
			},
			'':()=>{}
		}[tool.id])()

	}

/**
  * @function log 
  * @desc Cut the long log call.
  * @param {String} message  - what must be shown in console.
  * @mamberof ppt
  * @instance
  */
	function log(message){
		console.log(message);
	}

/**
  * @function addStyles 
  * @desc Adding global styles to the dom.
  * @param {Object} body  - body of document.
  * @mamberof ppt
  * @instance
  */
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
					.toolbar input[type="checkbox"]{
						display: none;
					}
					.stencils{
						height:100%;
						left:0px;
						position:absolute;
						top:0px;
						bottom: 0px;
						width:100%;
				    pointer-events: none;
				    cursor: move !important;
				    z-index: 2147483646 !important;
					}
					stencil-item{
						width:100%;
						height: 100%;
						top: 0px;
						left: 0px;
						position: absolute;
						background-repeat: no-repeat;
						background-position: top center;
						opacity:.5;
					}
					stencil-item img{
						margin: 0 auto;
						display: block;
					}
			`;
		body.append(style);
	}
}

/**
  * @name StencilItem
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license MIT
  * @class
  * @constructs
  * @classdesc It is web component that realise one entity that hold .jpg image 
  * @example 
			var stencil = new Stencil;
			stencil.dataset.max_res = 1200;
			stencil.dataset.min_res = 960;
			stencil.dataset.url = 'main-1200.jpg';
  * @param {Number} dataset.max_res - Maximum resolution breackpoint.
  * @param {Number} dataset.min_res - Minimum resolution breackpoint.
  * @param {String} dataset.url - Url to image.
  */
class StencilItem extends HTMLDivElement{
	constructor(){
		super();
	}

	createdCallback(){

		this.className = "stencils_item";
	}

	attachedCallback(){

  	var shadow = this.createShadowRoot();

		shadow.innerHTML = `
		<p>
			<img src="`+this.dataset.url+`">
		</p>
		`;
		shadow.innerHTML += `
			<style>
				p{
					display: none;
					text-align: center;
					margin: 0;
				}
				@media screen and (min-width:`+this.dataset.min_res+`px) and (max-width:`+this.dataset.max_res+`px){
					p{
						display: block;
					}
				}
			</style>
		`;
	}
}
var Stencil = document.registerElement("stencil-item", StencilItem);


ppt({
	enabled:true,
	position:"right top",
	items: {
		'1201x9999': '1200px.jpg',
		'960x1200': '960px.jpg',
		'0x960': '320px.jpg'
	}
});

