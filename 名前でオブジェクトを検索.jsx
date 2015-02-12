/*
名前でオブジェクトを検索.jsx
Copyright (c) 2015 Toshiyuki Takahashi
Released under the MIT license
http://opensource.org/licenses/mit-license.php
http://www.graphicartsunit.com/
*/
(function () {
	// Preference
	var settings = {
		'name' : ''
	};

	// Constant
	const SCRIPT_TITLE = "名前でオブジェクトを検索";
	const SCRIPT_VERSION = "0.5.0";

	// UI Dialog
	var keyword = prompt('パスの名前',　settings.name);
	selectPathByName(keyword);

	// Main Process
	function selectPathByName(str) {

		// Get layers and items
		var layers = app.activeDocument.layers;
		var items = app.activeDocument.pageItems;
		var layerProp = [];

		// Deselect all items
		for (var i = 0; i < layers.length; i++) {
			layers[i].hasSelectedArtwork = false;
		}

		// Array of delete items
		var targetCollection = [];
		var cantselected = 0;
		for (var i = 0; i < items.length; i++) {
			if(items[i].name == str && items[i].typename != "GroupItem"){
				try {
					items[i].selected = true;
					targetCollection.push(items[i]);
				} catch(e) {
					cantselected++;
				}
			}
		}
		for (var i = 0; i < targetCollection.length; i++) {
			targetCollection[i].selected = true;
		}

		// Show message
		var message = "全部で " + (targetCollection.length + cantselected) + " 個が見つかりました\nそのうち " + targetCollection.length + " 個を選択しました";
		if(cantselected > 0) {
			message += "が、" + cantselected + " 個はロック、非表示、グループのため選択できませんでした";
		}
		alert(message);

	}

}());
