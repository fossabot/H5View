ribbonControl = function (divID) {
	this.wrapper = document.createElement('div');
	this.wrapper.classList.add('ribbonControl');
	
	document.getElementById('ribbon').appendChild(this.wrapper);;

	this.tabsBar = document.createElement('div');
	this.tabsBar.classList.add('ribbonTabHeader');
	this.wrapper.appendChild(this.tabsBar);

	this.tabs = [];
}

ribbonControl.prototype = {
	init:function() {
		let aboutTab = new ribbonTab('H5View', 'aboutTab');
		aboutTab.tabBtn.onclick = function(e) {
			e.stopPropagation();
			guiModals.initAbout();
		};
		
		this.initMainTab();
		this.initFemTab();
		this.initResultsTab();
	},
	initMainTab:function() {
		let mainTab = new ribbonTab('Main'),
			btn;
			
		// Activate Tab
		mainTab.tabBtn.click();

		// Main Tab
		// ------------------------------------------------
		mainTab.addGroup('File');
		
		// Add in Controls
		btn = mainTab.addBtn('Open', 'openFile', false);
		btn.onclick = function(e) {
				e.stopPropagation();
				guiModals.initOpen();
			};
		
		// Import files
		btn = mainTab.addBtn('Import', 'import', false);
		btn.onclick = function(e) {
				let importFiles = document.getElementById('importFiles');
				importFiles.click();
			};
		let input = document.createElement('input');
		input.style.display = 'none';
		input.id = 'importFiles';
		input.type = 'file';
		input.onchange = function(){importFiles(this.files);};
		btn.appendChild(input);
		
		// View Group
		// ------------------------------------------------
		mainTab.addSplitter();
		mainTab.addGroup('View');
		
		btn = mainTab.addBtn('Fit', 'fitView', false);
		btn.addEventListener('click', function() {
			camera.fitZoom();
		}, false);

		btn = mainTab.addDropDown('View', 'isoView', false, false);
		mainTab.addDropDownItem(btn, 'Top', 'topView');
		mainTab.addDropDownItem(btn, 'Bottom', 'bottomView');
		mainTab.addDropDownItem(btn, 'Front', 'frontView');
		mainTab.addDropDownItem(btn, 'Back', 'backView');
		mainTab.addDropDownItem(btn, 'Left', 'leftView');
		mainTab.addDropDownItem(btn, 'Right', 'rightView');
		mainTab.addDropDownItem(btn, 'ISO', 'isoView');
		
		btn.addEventListener('onRibbonDropdownChange', function(e) {
				camera.setViewTo(e.detail.text);
			}, false );
		
		//Render Mode
		btn = mainTab.addDropDown('Shaded', 'shadedRander', false, true);	
		mainTab.addDropDownItem(btn, 'Shaded', 'shadedRander');
		mainTab.addDropDownItem(btn, 'Flat', 'isoView');
		mainTab.addDropDownItem(btn, 'Transparent', 'transparentRander');
		mainTab.addDropDownItem(btn, 'Wireframe', 'wireframeRander');

		btn.addEventListener('onRibbonDropdownChange', function(e) {
				render.setRenderStyle(e.detail.text);
			}, false );
		//Render Mode
		
		btn = mainTab.addBtn('Toggle Nodes', 'toggleNodes', true);
		btn.addEventListener('click', function() {
			render.toggleNodeShow();
		});
		
		btn = mainTab.addBtn('Toggle Edges', 'toggleEdges', true, true);
		btn.addEventListener('click', function() {
			render.toggleEdgeShow();
		});
		
		//Perspective
		btn = mainTab.addDropDown('Orthogonal', 'isoView', true, true);
		mainTab.addDropDownItem(btn, 'Orthogonal', 'isoView');
		mainTab.addDropDownItem(btn, 'Perspective', 'perspectiveView');

		
		btn.addEventListener('onRibbonDropdownChange', function(e) {
				camera.setPerspective(e.detail.text);
			}, false );
		//Perspective
		
		btn = mainTab.addBtn('Shrink elements', 'shrinkElements', true, true);
		btn.addEventListener('click', function() {
				render.toggleElmShrink();
			});

		// Settings Group
		// ------------------------------------------------
		mainTab.addSplitter();
		mainTab.addGroup('Settings');
		
		btn = mainTab.addBtn('Settings', 'settings', false);
		btn.addEventListener('click', function() {});

		btn = mainTab.addBtn('Help', 'help', false);
		btn.addEventListener('click', function() {
			CloseSidebar();
			openInNewTab('');
		});
		mainTab.addSplitter();
	},
	initFemTab:function(){	
		let femTab = new ribbonTab('FEM'), 
			tabGroup, btn;

		// Display Group
		femTab.addGroup('Display');
		
		// Display Buttons
		btn = femTab.addBtn('Label IDs', 'labelIds', false);
		btn.addEventListener('click', function() {
			sideBar.addFunction('/static/libs/FEM_Functions/showElmIds.js', 'showElmIds');
		});
		
		btn = femTab.addBtn('Show/Hide', 'showHide', false);
		btn.addEventListener('click', function() {
			sideBar.addFunction('/static/libs/FEM_Functions/showHideFem.js', 'showHideFem');
		});
		
		btn = femTab.addBtn('Properties', 'properties', false);
		btn.addEventListener('click', function() {
			sideBar.addFunction('/static/libs/FEM_Functions/showElmProp.js', 'showElmProp');
		});
		
		// Measurements Group
		femTab.addSplitter();
		femTab.addGroup('Measurements');
		
		// Measurements Buttons
		btn = femTab.addBtn('Distance', 'measure', false);
		btn.addEventListener('click', function() {
			sideBar.addFunction('/static/libs/FEM_Functions/measureDist.js', 'measureDist');
		});

		btn = femTab.addBtn('Diameter', 'compass', false);
		btn.addEventListener('click', function() {
			sideBar.addFunction('/static/libs/FEM_Functions/measureRadius.js', 'measureRadius');
		});
		femTab.addSplitter();
	},
	initResultsTab:function(){	
		let resultsTab = new ribbonTab('Results'), 
			tabGroup, btn;

		// Display Group
		resultsTab.addGroup('Result Plots');
		
		// Display Buttons
		btn = resultsTab.addBtn('Deformation', 'deform', false);
		btn.addEventListener('click', function() {
			sideBar.addFunction('/static/libs/FEM_Functions/resultsDispl.js', 'resultsDispl');
		});
		
		btn = resultsTab.addBtn('Fringe', 'fringe', false);
		btn.addEventListener('click', function() {
			sideBar.addFunction('/static/libs/FEM_Functions/resultsFringe.js', 'resultsFringe');
		});
		
		btn = resultsTab.addBtn('Cross Section', 'crossSection', false);
		btn.addEventListener('click', function() {
			sideBar.addFunction('/static/libs/FEM_Functions/resultsCrossSection.js', 'resultsCrossSection');
		});
		resultsTab.addSplitter();
	},
	closeAllDropDown:function () {
		let ddElms = document.getElementsByClassName('ribbonDrpdnCont');
		for (let ddElm of ddElms) {
			if ( ddElm.getAttribute('show') == 'true' ){
				ddElm.setAttribute('show', 'false');
				ddElm.previousSibling.classList.remove('arrow');
			}
		}
	}
};

ribbonTab = function (name, id = false) {
	this.tabBtn = document.createElement('button');
	this.tabBtn.classList.add('ribbonTab');
	this.tabBtn.innerHTML = name;
	
	if(id){ // aboutTabException
		this.tabBtn.id = id;
	} else {
		this.tabBtn.addEventListener('click', this.onTabChange, false);
		this.table = document.createElement('table');
		this.table.classList.add('ribbonTabContent');
		this.table.style.display = 'none';
		
		let tbody = document.createElement('tbody');
		this.table.appendChild(tbody);
		
		this.tr1 = document.createElement('tr'); // row one
		this.tr2 = document.createElement('tr'); // row two
		this.footTr = document.createElement('tr'); // row tree
		
		tbody.appendChild(this.tr1);
		tbody.appendChild(this.tr2);
		tbody.appendChild(this.footTr);
		
		ribbon.tabs.push(this);
		ribbon.wrapper.appendChild(this.table);
	}
	
	ribbon.tabsBar.appendChild(this.tabBtn);
};
	
ribbonTab.prototype = {
	addGroup:function(name) {		
		this.footTd = document.createElement('td');
		this.footTd.classList.add('ribbonTabGroupFooter');
		this.footTd.innerHTML = name;
		
		this.count = 0;
		this.footTr.appendChild(this.footTd);
	},
	addSplitter(){
		let td = document.createElement('td');
		td.classList.add('ribbonTabSplitter');
		this.tr1.appendChild(td);
		td.rowSpan = 3;
	},
	addBtn(text, icon, isSmall, is2ndRow=false){
		let btn = document.createElement('button');
		
		btn.classList.add('ribbonButton');
		btn.innerHTML = text;
		btn.setAttribute('icon', icon);
		
		// Set Icon to Large
		if(isSmall == false)
			btn.setAttribute('size', 'large');
		
		this.addItem(btn, isSmall, is2ndRow)
		return btn;
	},
	addDropDown(text, icon, isSmall, isSelectable, is2ndRow=false){
		let wrap = document.createElement('div'),
			btn = document.createElement('button'),
			dropDown = document.createElement('div');
		
		btn.classList.add('ribbonDropdownBtn');
		btn.innerHTML = text;
		btn.setAttribute('icon', icon);
		
		if(!isSmall)
			btn.setAttribute('size', 'large');
		if(!isSelectable)
			btn.setAttribute('changeicon', 'no');
		
		wrap.classList.add('ribbonDropdown');
		wrap.appendChild(btn);
		
		dropDown.classList.add('ribbonDrpdnCont');
		dropDown.setAttribute('show', false);
		wrap.appendChild(dropDown);
		
		btn.addEventListener('click', this.onDropDownClick, false);

		this.addItem(wrap, isSmall, is2ndRow)
		return btn;
	},
	addDropDownItem:function(dropDown, text, icon){
		let btn = document.createElement('button');
		btn.setAttribute('icon', icon);
		btn.innerHTML = text;
		dropDown.nextSibling.appendChild(btn);
		btn.addEventListener('click', this.onDropDownOptionClick, false);
	},
	addItem(item, isSmall, is2ndRow){
		let td = document.createElement('td');
		
		td.appendChild(item);
		if(isSmall && is2ndRow){
			this.tr2.appendChild(td);
		} else {
			this.tr1.appendChild(td);
			if (!isSmall){
				td.rowSpan = 2;
			}
			this.count ++;
			this.footTd.colSpan = this.count;
		}
	},	
	onTabChange:function(e){
		e.stopPropagation();

		for (tab of ribbon.tabs) {
			if(tab.tabBtn !== this){
				tab.table.style.display = 'none';
				tab.tabBtn.classList.remove('active');
			} else {
				tab.table.style.display = 'block';
				tab.tabBtn.classList.add('active');
			}			
		}
	},
	onDropDownClick:function (e) {
		e.stopPropagation();
		
		let isShown = this.nextSibling.getAttribute('show');
		ribbon.closeAllDropDown();
		
		if( isShown == 'false' ){ 
			this.nextSibling.setAttribute('show', 'true');
			this.classList.toggle('arrow');
		}
		document.addEventListener('click', ribbon.closeAllDropDown, {once: true});
	},
	onDropDownOptionClick:function(e){
		//Change icon and text
		if(this.parentElement.previousSibling.getAttribute('changeicon') !== 'no'){
			this.parentElement.previousSibling.innerHTML = this.innerHTML;
			let icn = this.getAttribute('icon');
			this.parentElement.previousSibling.setAttribute('icon', icn);
		}
		
		//Run custom event
		let event = new CustomEvent('onRibbonDropdownChange', 
		{
			detail: {
				text: this.innerHTML,
			},
			bubbles: true,
			cancelable: true
		});
		this.parentElement.previousSibling.dispatchEvent(event);

		this.parentElement.parentElement.setAttribute('show', 'false');
		this.parentElement.previousSibling.classList.remove('arrow');
	}
};

var ribbon = new ribbonControl();
ribbon.init();
var ribbonHeight = document.getElementById('ribbon').clientHeight;