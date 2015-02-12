/*
名前でオブジェクトを選択.jsx
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
	const SCRIPT_TITLE = "名前でオブジェクトを選択";
	const SCRIPT_VERSION = "0.5.2";

	// UI Dialog
	var keyword = prompt('オブジェクトの名前',　settings.name);
	if(keyword) {
		selectPathByName(keyword);
	} else {
		return false
	}

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
		var message = "オブジェクト名：" + str;
		if (targetCollection.length + cantselected == 0) {
			message += "\n見つかりませんでした";
		} else {
			message += "\n全 " + (targetCollection.length + cantselected) + " 個中 " + targetCollection.length + " 個を選択しました";
			if(cantselected > 0) {
				message += "（" + cantselected + " 個はロック、非表示、グループのため選択できませんでした）";
			}
		}
		alert(message);

	}

}());
