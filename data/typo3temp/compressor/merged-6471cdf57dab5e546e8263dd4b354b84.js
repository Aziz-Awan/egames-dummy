
/*
 * This code has been copied from Project_CMS
 * Copyright (c) 2005 by Phillip Berndt (www.pberndt.com)
 *
 * Extended Textarea for IE and Firefox browsers
 * Features:
 *  - Possibility to place tabs in <textarea> elements using a simply <TAB> key
 *  - Auto-indenting of new lines
 *
 * License: GNU General Public License
 */

function checkBrowser() {
	browserName = navigator.appName;
	browserVer = parseInt(navigator.appVersion);

	ok = false;
	if (browserName == "Microsoft Internet Explorer" && browserVer >= 4) {
		ok = true;
	} else if (browserName == "Netscape" && browserVer >= 3) {
		ok = true;
	}

	return ok;
}

	// Automatically change all textarea elements
function changeTextareaElements() {
	if (!checkBrowser()) {
			// Stop unless we're using IE or Netscape (includes Mozilla family)
		return false;
	}

	document.textAreas = document.getElementsByTagName("textarea");

	for (i = 0; i < document.textAreas.length; i++) {
			// Only change if the class parameter contains "enable-tab"
		if (document.textAreas[i].className && document.textAreas[i].className.search(/(^| )enable-tab( |$)/) != -1) {
			document.textAreas[i].textAreaID = i;
			makeAdvancedTextArea(document.textAreas[i]);
		}
	}
}

	// Wait until the document is completely loaded.
	// Set a timeout instead of using the onLoad() event because it could be used by something else already.
window.setTimeout("changeTextareaElements();", 200);

	// Turn textarea elements into "better" ones. Actually this is just adding some lines of JavaScript...
function makeAdvancedTextArea(textArea) {
	if (textArea.tagName.toLowerCase() != "textarea") {
		return false;
	}

		// On attempt to leave the element:
		// Do not leave if this.dontLeave is true
	textArea.onblur = function(e) {
		if (!this.dontLeave) {
			return;
		}
		this.dontLeave = null;
		window.setTimeout("document.textAreas[" + this.textAreaID + "].restoreFocus()", 1);
		return false;
	}

		// Set the focus back to the element and move the cursor to the correct position.
	textArea.restoreFocus = function() {
		this.focus();

		if (this.caretPos) {
			this.caretPos.collapse(false);
			this.caretPos.select();
		}
	}

		// Determine the current cursor position
	textArea.getCursorPos = function() {
		if (this.selectionStart) {
			currPos = this.selectionStart;
		} else if (this.caretPos) {	// This is very tricky in IE :-(
			oldText = this.caretPos.text;
			finder = "--getcurrpos" + Math.round(Math.random() * 10000) + "--";
			this.caretPos.text += finder;
			currPos = this.value.indexOf(finder);

			this.caretPos.moveStart('character', -finder.length);
			this.caretPos.text = "";

			this.caretPos.scrollIntoView(true);
		} else {
			return;
		}

		return currPos;
	}

		// On tab, insert a tabulator. Otherwise, check if a slash (/) was pressed.
	textArea.onkeydown = function(e) {
		if (this.selectionStart == null &! this.createTextRange) {
			return;
		}
		if (!e) {
			e = window.event;
		}

			// Tabulator
		if (e.keyCode == 9) {
			this.dontLeave = true;
			this.textInsert(String.fromCharCode(9));
		}

			// Newline
		if (e.keyCode == 13) {
				// Get the cursor position
			currPos = this.getCursorPos();

				// Search the last line
			lastLine = "";
			for (i = currPos - 1; i >= 0; i--) {
				if(this.value.substring(i, i + 1) == '\n') {
					break;
				}
			}
			lastLine = this.value.substring(i + 1, currPos);

				// Search for whitespaces in the current line
			whiteSpace = "";
			for (i = 0; i < lastLine.length; i++) {
				if (lastLine.substring(i, i + 1) == '\t') {
					whiteSpace += "\t";
				} else if (lastLine.substring(i, i + 1) == ' ') {
					whiteSpace += " ";
				} else {
					break;
				}
			}

				// Another ugly IE hack
			if (navigator.appVersion.match(/MSIE/)) {
				whiteSpace = "\\n" + whiteSpace;
			}

				// Insert whitespaces
			window.setTimeout("document.textAreas["+this.textAreaID+"].textInsert(\""+whiteSpace+"\");", 1);
		}
	}

		// Save the current cursor position in IE
	textArea.onkeyup = textArea.onclick = textArea.onselect = function(e) {
		if (this.createTextRange) {
			this.caretPos = document.selection.createRange().duplicate();
		}
	}

		// Insert text at the current cursor position
	textArea.textInsert = function(insertText) {
		if (this.selectionStart != null) {
			var savedScrollTop = this.scrollTop;
			var begin = this.selectionStart;
			var end = this.selectionEnd;
			if (end > begin + 1) {
				this.value = this.value.substr(0, begin) + insertText + this.value.substr(end);
			} else {
				this.value = this.value.substr(0, begin) + insertText + this.value.substr(begin);
			}

			this.selectionStart = begin + insertText.length;
			this.selectionEnd = begin + insertText.length;
			this.scrollTop = savedScrollTop;
		} else if (this.caretPos) {
			this.caretPos.text = insertText;
			this.caretPos.scrollIntoView(true);
		} else {
			text.value += insertText;
		}

		this.focus();
	}
}
(function(jQuery) {
	var object;

	/**
	 * The ajaxID for communication with the ajax handler
	 */
	var ajaxID = 'GosignImageHandling::serializeCroppingData';

	/**
	 * Apply the given offset values and dimensions to the overlay
	 *
	 * @param	jQuery	overlay: resizable and draggable overlay
	 * @param	jQuery	parent: parent object in which we are working
	 *
	 * @return	void
	 */
	function resizeOverlay(overlay, parent) {
		var hiddenInfos = jQuery('.hiddenInfos', parent);
		var scale = jQuery('input[name="scale"]', hiddenInfos).val();
		overlay.css('top', jQuery('input[name="offsetY"]', hiddenInfos).val() * scale);
		overlay.css('left', jQuery('input[name="offsetX"]', hiddenInfos).val() * scale);
		overlay.css('width', jQuery('input[name="width"]', hiddenInfos).val() * scale);
		overlay.css('height', jQuery('input[name="height"]', hiddenInfos).val() * scale);
	}

	/**
	 * Callback function for jQuery.draggable and jQuery.resizable which determines the serialized
	 * value for the cropping field via an ajax request.
	 *
	 * @param	jQuery	overlay: resizable and draggable overlay
	 * @param	jQuery	parent: parent object in which we are working
	 *
	 * @return	void
	 */
	function updateValues(overlay, parent) {
		var hiddenInfos = jQuery('.hiddenInfos', parent);
		var valueField = jQuery('.valueWrapper input', parent);
		var datastring = 'ajaxID=' + ajaxID;
		datastring += '&ajax[crop][offsetX]=' + overlay.css('left');
		datastring += '&ajax[crop][offsetY]=' + overlay.css('top');
		datastring += '&ajax[crop][width]=' + overlay.css('width');
		datastring += '&ajax[crop][height]=' + overlay.css('height');
		datastring += '&ajax[scale]=' + jQuery('input[name="scale"]', hiddenInfos).val();

		jQuery.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: datastring,
			context: document.body,
			success: function(data, textStatus, jqXHR){
				valueField.val(data.serializedString);
			}
		});
	}

	/**
	 * This function initializes the overlay by apllying jQuery.draggable and jQuery.resizable
	 *
	 * @param	jQuery	overlay: resizable and draggable overlay
	 * @param	jQuery	parent: parent object in which we are working
	 *
	 * @return	void
	 */
	function initializeOverlay(overlay, parent) {
		var hiddenInfos = jQuery('.hiddenInfos', parent);
		var ratioField = jQuery('input[name="ratio"]', hiddenInfos);
		var minWidthField = jQuery('input[name="minWidth"]', hiddenInfos);
		var minHeightField = jQuery('input[name="minHeight"]', hiddenInfos);

		var ratio = (ratioField.length > 0) ? parseFloat(ratioField.val()) : false;
		var minWidth = (minWidthField.length > 0) ? parseInt(minWidthField.val()) : 10;
		var minHeight = (minHeightField.length > 0) ? parseInt(minHeightField.val()) : 10;

		overlay.draggable({
			containment: 'parent',
			stop: function() {
				updateValues(jQuery(this), parent);
			}
		});

		overlay.resizable({
			handles: 'n, ne, e, se, s, sw, w, nw',
			containment: 'parent',
			aspectRatio: ratio,
			minWidth: minWidth,
			minHeight: minHeight,
			stop: function() {
				updateValues(jQuery(this), parent);
			}
		});
	}

	/**
	 * Main method of this Script
	 *
	 * @param	jQuery	parent: parent object in which we are working
	 *
	 * @return	void
	 */
	function main(parent) {
		var overlay = jQuery('.overlay', parent);

		initializeOverlay(overlay, parent);
		resizeOverlay(overlay, parent);
	}

	/**
	 * This function checks if there is a image in the image crop field which has to be handled
	 *
	 * @param	object	jQuery object to check
	 *
	 * @return	boolean - true if initialized is successfully
	 */
	jQuery.fn.extend({
		initObject: function initObject() {
			obj = jQuery(this);
			if (obj.length > 0) {
				object = obj;

				return true;
			}

			return false;
		}
	});

	jQuery(document).ready(function() {
		if (jQuery('.imageCropWrapper').initObject()) {
			object.each(function(indexInArray, valueOfElement) {
				main(valueOfElement);
			});
		}

			// click event for inline elements
		jQuery('.t3-form-field-container-inline').click(function() {
				// record in the inline element
			jQuery('.t3-form-field-record-inline', this).each(function() {
				var self = jQuery(this);
				var timeoutFunction = function() {
					imageCrop = jQuery('.imageCropWrapper', self);
						// if imageCrop object is found in 'self', process with the main method
					if (imageCrop.initObject()) {
						object.each(function(indexInArray, valueOfElement) {
							if (!jQuery('.overlay', valueOfElement).hasClass('ui-draggable')) {
								main(valueOfElement);
							}
						});
					} else if (jQuery('table', self).length == 0) {
							// if there is a table found in 'self', the content is load via ajax
							// so we have to set timeout as long as there is no table loaded in case
							// that the imageCrop object could not be initialized
						setTimeout(timeoutFunction, 250);
					}

				};

				timeoutFunction();
			});
		});
	});
})(jQuery);
(function(jQuery) {
	var object;

	/**
	 * The ajaxID for communication with the ajax handler
	 */
	var ajaxID = 'GosignImageHandling::serializePositioningData';

	/**
	 * Apply the given offset values to the overlay images
	 *
	 * @param	jQuery	overlay: draggable overlay
	 * @param	jQuery	parent: parent object in which we are working
	 *
	 * @return	void
	 */
	function setOverlayPosition(overlay, parent) {
		var hiddenInfos = jQuery('.hiddenInfos', parent);

		jQuery('img', overlay).each(function() {
			var self = jQuery(this);
			var imageUid = self.attr('id');

			self.css('left', jQuery('input[name="' + imageUid + '[offsetX]"]', hiddenInfos).val() + 'px');
			self.css('top', jQuery('input[name="' + imageUid + '[offsetY]"]', hiddenInfos).val() + 'px');
		});
		jQuery('p.descriptionOverlay', overlay).each(function() {
			var self = jQuery(this);

			self.css('left', jQuery('input[name="description[offsetX]"]', hiddenInfos).val() + 'px');
			self.css('top', jQuery('input[name="description[offsetY]"]', hiddenInfos).val() + 'px');
		});
	}

	/**
	 * Callback function for jQuery.draggable which determines the serialized
	 * value for the positioning field via an ajax request.
	 *
	 * @param	jQuery	overlay: draggable overlay
	 * @param	jQuery	parent: parent object in which we are working
	 *
	 * @return	void
	 */
	function updateValues(overlay, parent) {
		var hiddenInfos = jQuery('.hiddenInfos', parent);
		var valueField = jQuery('.valueWrapper input', parent);
		var datastring = 'ajaxID=' + ajaxID;

		jQuery('img', overlay).each(function() {
			var self = jQuery(this);
			var imageUid = self.attr('id');

			datastring += '&ajax[images][' + imageUid + '][offsetX]=' + self.css('left');
			datastring += '&ajax[images][' + imageUid + '][offsetY]=' + self.css('top');
		});
		jQuery('p.descriptionOverlay', overlay).each(function() {
			var self = jQuery(this);

			datastring += '&ajax[images][description][offsetX]=' + self.css('left');
			datastring += '&ajax[images][description][offsetY]=' + self.css('top');
		});

		datastring += '&ajax[frontend][offsetX]=' + jQuery('input[name="frontend[offsetX]"]', hiddenInfos).val();
		datastring += '&ajax[frontend][offsetY]=' + jQuery('input[name="frontend[offsetY]"]', hiddenInfos).val();

		jQuery.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: datastring,
			context: document.body,
			success: function(data, textStatus, jqXHR){
				valueField.val(data.serializedString);
			}
		});
	}

	/**
	 * This function initializes the overlay by apllying jQuery.draggable
	 *
	 * @param	jQuery	overlay: draggable overlay
	 * @param	jQuery	parent: parent object in which we are working
	 *
	 * @return	void
	 */
	function initializeOverlay(overlay, parent) {
		jQuery('img', overlay).draggable({
			containment: 'parent',
			stop: function() {
				updateValues(overlay, parent);
			}
		});
		jQuery('p.descriptionOverlay', overlay).draggable({
			containment: 'parent',
			stop: function() {
				updateValues(overlay, parent);
			}
		});
	}

	/**
	 * Main method of this Script
	 *
	 * @param	jQuery	parent: parent object in which we are working
	 *
	 * @return	void
	 */
	function main(parent) {
		var overlay = jQuery('.overlay', parent);

		initializeOverlay(overlay, parent);
		setOverlayPosition(overlay, parent);
	}

	/**
	 * This function checks if there is a image in the image positioning field which has to be handled
	 *
	 * @param	object	jQuery object to check
	 *
	 * @return	boolean - true if initialized is successfully
	 */
	jQuery.fn.extend({
		initPositioningObject: function initPositioningObject() {
			obj = jQuery(this);
			if (obj.length > 0) {
				object = obj;

				return true;
			}

			return false;
		}
	});

	jQuery(document).ready(function() {
		if (jQuery('.imagePositioningWrapper').initPositioningObject()) {
			object.each(function(indexInArray, valueOfElement) {
				main(valueOfElement);
			});
		}

			// click event for inline elements
		jQuery('.t3-form-field-container-inline').click(function() {
				// record in the inline element
			jQuery('.t3-form-field-record-inline', this).each(function() {
				var self = jQuery(this);
				var timeoutFunction = function() {
					imagePositioning = jQuery('.imagePositioningWrapper', self);
						// if imagePositioning object is found in 'self', process with the main method
					if (imagePositioning.initPositioningObject()) {
						object.each(function(indexInArray, valueOfElement) {
							if (!jQuery('.overlay img', valueOfElement).hasClass('ui-draggable')) {
								main(valueOfElement);
							}
						});
					} else if (jQuery('table', self).length == 0) {
							// if there is a table found in 'self', the content is load via ajax
							// so we have to set timeout as long as there is no table loaded in case
							// that the imagePositioning object could not be initialized
						setTimeout(timeoutFunction, 250);
					}

				};

				timeoutFunction();
			});
		});
	});
})(jQuery);