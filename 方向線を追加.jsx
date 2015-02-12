/*
方向線を追加.jsx
Copyright (c) 2015 Toshiyuki Takahashi
Released under the MIT license
http://opensource.org/licenses/mit-license.php
http://www.graphicartsunit.com/
*/
(function () {
	// Preference
	var settings = {
		'diameter' : 10,
		'pointName' : '_added_direction_point_',
		'pathName' : '_added_direction_path_',
		'anchorName' : '_added_direction_anchor_',
		'addDirectionLine' : true,
		'addDirectionPoint' : false,
		'addAnchorPoint' : false
	};

	// Constant
	const SCRIPT_TITLE = "方向線を追加";
	const SCRIPT_VERSION = "0.5.1";

	// UI Dialog
	function mainDialog() {
		this.init();
		return this;
	};
	mainDialog.prototype.init = function() {

		var unit = 20;
		var thisObj = this;

		thisObj.dlg = new Window("dialog", SCRIPT_TITLE + " - ver." + SCRIPT_VERSION);
		thisObj.dlg.margins = [unit*1.5, unit*1.5, unit*1.5, unit*1.5];

		thisObj.checkBox = {};

		thisObj.settingPanel = thisObj.dlg.add("panel", undefined, "追加：");
		thisObj.settingPanel.alignment = "left";
		thisObj.settingPanel.margins = [unit, unit, unit, unit];
		thisObj.settingPanel.orientation = "column";

		thisObj.checkBox.addDirectionLine = thisObj.settingPanel.add("checkbox", undefined, "方向線");
		thisObj.checkBox.addDirectionPoint = thisObj.settingPanel.add("checkbox", undefined, "方向点（ハンドル）");
		thisObj.checkBox.addAnchorPoint = thisObj.settingPanel.add("checkbox", undefined, "アンカーポイント");

		for (var key in thisObj.checkBox) {
			thisObj.checkBox[key].value = settings[key];
			thisObj.checkBox[key].alignment = "left";
		}

		thisObj.buttonGroup = thisObj.dlg.add("group", undefined);
		thisObj.buttonGroup.margins = [unit, unit*0, unit, unit*0];
		thisObj.buttonGroup.alignment = "center";
		thisObj.buttonGroup.orientation = "row";
		thisObj.cancel = thisObj.buttonGroup.add("button", undefined, "キャンセル", {name: "cancel"});
		thisObj.ok = thisObj.buttonGroup.add("button", undefined, "実行", { name:"ok"});

		thisObj.ok.onClick = function() {
			for (var key in thisObj.checkBox) {
				settings[key] = thisObj.checkBox[key].value;
			}
			thisObj.closeDialog();
			try {
				addDirection();
			} catch(e) {
				alert("以下エラーが発生しましたので処理を中止します\n" + e);
			}
		}
		thisObj.cancel.onClick = function() {
			thisObj.closeDialog();
		}

	};
	mainDialog.prototype.showDialog = function() {
		this.dlg.show();
	};
	mainDialog.prototype.closeDialog = function() {
		this.dlg.close();
	};

	// Prototype of direction line
	function DirectionLine(from, to) {
		this.from = from;
		this.to = to;
		return this;
	};
	DirectionLine.prototype.setPropaties = function(obj) {
		for (var prop in obj){
			this[prop] = obj[prop];
		}
	};
	DirectionLine.prototype.draw = function() {
		drawLine(this.from, this.to);
	};

	// Prototype of direction point
	function DirectionPoint(point, diameter) {
		this.point = point;
		this.diameter = diameter;
		return this;
	};
	DirectionPoint.prototype.setPropaties = function(obj) {
		for (var prop in obj){
			this[prop] = obj[prop];
		}
	};
	DirectionPoint.prototype.draw = function() {
		drawCircle([this.point[0], this.point[1]], this.diameter);
	};

	// Prototype of Anchor point
	function AnchorPoint(point, diameter) {
		this.point = point;
		this.diameter = diameter;
		return this;
	};
	AnchorPoint.prototype.setPropaties = function(obj) {
		for (var prop in obj){
			this[prop] = obj[prop];
		}
	};
	AnchorPoint.prototype.draw = function() {
		drawSquare([this.point[0], this.point[1]], this.diameter);
	};


	var dialog = new mainDialog();
	dialog.showDialog();

	// Main Process
	function drawCircle(point, di) {
		var cir = activeDocument.pathItems.ellipse(point[1] + di / 2, point[0] - di / 2, di, di);
		var c = new GrayColor();
		c.gray = 50;
		cir.stroked = false;
		cir.filled = true;
		cir.fillColor = c;
		cir.name = settings.pointName;
	}
	function drawSquare(point, di) {
		var squ = activeDocument.pathItems.rectangle(point[1] + di / 2, point[0] - di / 2, di, di);
		var c = new GrayColor();
		c.gray = 50;
		squ.stroked = false;
		squ.filled = true;
		squ.fillColor = c;
		squ.name = settings.anchorName;
	}
	function drawLine(from, to) {
		var line = activeDocument.pathItems.add();
		line.setEntirePath([from, to]);
		var c = new GrayColor();
		c.gray = 50;
		line.filled = false;
		line.stroked = true;
		line.strokeWidth = 1;
		line.strokeColor = c;
		line.name = settings.pathName;
	}

	// Main Process
	function addDirection() {

		// Get layers and items
		var layers = app.activeDocument.layers;
		var items = app.activeDocument.pageItems;
		var directionLines = [];
		var directionPoints = [];
		var anchorPoints = [];

		// Array of delete items
		var targetCollection = [];
		for (var i = 0; i < items.length; i++) {
			if(items[i].selected && items[i].typename == "PathItem") {
				targetCollection.push(items[i]);
			}
		}

		// Get delete items
		for (var i = 0; i < targetCollection.length; i++) {
			for (var j = 0; j < targetCollection[i].pathPoints.length; j++) {
				var point = targetCollection[i].pathPoints[j];
				var ancor = {x:point.anchor[0], y:point.anchor[1]};
				var leftDirection = {x:point.leftDirection[0], y:point.leftDirection[1]};
				var rightDirection = {x:point.rightDirection[0], y:point.rightDirection[1]};

				if(point.selected == PathPointSelection.LEFTDIRECTION || point.selected == PathPointSelection.ANCHORPOINT) {
					if(ancor.x != leftDirection.x || ancor.y != leftDirection.y) {
						if(settings.addDirectionLine) directionLines.push(new DirectionLine([ancor.x, ancor.y],[leftDirection.x, leftDirection.y]));
						if(settings.addDirectionPoint) directionPoints.push(new DirectionPoint([leftDirection.x, leftDirection.y], 5));
					}
				}
				if(point.selected == PathPointSelection.RIGHTDIRECTION || point.selected == PathPointSelection.ANCHORPOINT) {
					if(ancor.x != rightDirection.x || ancor.y != rightDirection.y) {
						if(settings.addDirectionLine) directionLines.push(new DirectionLine([ancor.x, ancor.y],[rightDirection.x, rightDirection.y]));
						if(settings.addDirectionPoint) directionPoints.push(new DirectionPoint([rightDirection.x, rightDirection.y], 5));
					}
				}
				if(point.selected != PathPointSelection.NOSELECTION && settings.addAnchorPoint) {
					anchorPoints.push(new AnchorPoint([ancor.x, ancor.y], 5));
				}

			}
		}

		for (var index in directionLines){
			directionLines[index].draw();
		}
		for (var index in directionPoints){
			directionPoints[index].draw();
		}
		for (var index in anchorPoints){
			anchorPoints[index].draw();
		}
	}
}());
