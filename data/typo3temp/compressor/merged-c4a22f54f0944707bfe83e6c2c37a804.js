
/***************************************************************
*  Copyright notice
*
*  (c) 2008-2011 Jeff Segars <jeff@webempoweredchurch.org>
*  All rights reserved
*
*  This script is part of the TYPO3 project. The TYPO3 project is
*  free software; you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation; either version 2 of the License, or
*  (at your option) any later version.
*
*  The GNU General Public License can be found at
*  http://www.gnu.org/copyleft/gpl.html.
*  A copy is found in the textfile GPL.txt and important notices to the license
*  from the author is found in LICENSE.txt distributed with these scripts.
*
*
*  This script is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  This copyright notice MUST APPEAR in all copies of the script!
***************************************************************/


Element.addMethods({
	pngHack: function(element) {
		element = $(element);
		var transparentGifPath = 'clear.gif';

			// If there is valid element, it is an image and the image file ends with png:
		if (Object.isElement(element) && element.tagName === 'IMG' && element.src.endsWith('.png')) {
			var alphaImgSrc = element.src;
			var sizingMethod = 'scale';
			element.src = transparentGifPath;
		}

		if (alphaImgSrc) {
			element.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="#{alphaImgSrc}",sizingMethod="#{sizingMethod}")'.interpolate(
			{
				alphaImgSrc: alphaImgSrc,
				sizingMethod: sizingMethod
			});
		}

		return element;
	}
});

var IECompatibility = Class.create({

	/**
	 * initializes the compatibility class
	 */
	initialize: function() {
		Event.observe(document, 'dom:loaded', function() {
			$$('input[type="checkbox"]').invoke('addClassName', 'checkbox');
		}.bind(this));

		Event.observe(window, 'load', function() {
			if (Prototype.Browser.IE) {
				var version = parseFloat(navigator.appVersion.split(';')[1].strip().split(' ')[1]);
				if (version === 6) {
					$$('img').each(function(img) {
						img.pngHack();
					});
					$$('#typo3-menu li ul li').each(function(li) {
						li.setStyle({height: '21px'});
					});
				}
			}
		});
	}
});

if (Prototype.Browser.IE) {
	var TYPO3IECompatibilty = new IECompatibility();
}

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
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2010-2011 Steffen Kamper <steffen@typo3.org>
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *  A copy is found in the textfile GPL.txt and important notices to the license
 *  from the author is found in LICENSE.txt distributed with these scripts.
 *
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

Ext.ns('TYPO3', 'TYPO3.CSH.ExtDirect');

/**
 * Class to show tooltips for links that have the css t3-help-link
 * need the tags data-table and data-field (HTML5)
 */


TYPO3.ContextHelp = function() {

	/**
	 * Cache for CSH
	 * @type {Ext.util.MixedCollection}
	 */
	var cshHelp = new Ext.util.MixedCollection(true),
	tip;

	/**
	 * Shows the tooltip, triggered from mouseover event handler
	 *
	 */
	function showToolTipHelp() {
		var link = tip.triggerElement;
		if (!link) {
			return false;
		}
		var table = link.getAttribute('data-table');
		var field = link.getAttribute('data-field');
		var key = table + '.' + field;
		var response = cshHelp.key(key);
		tip.target = tip.triggerElement;
		if (response) {
			updateTip(response);
		} else {
				// If a table is defined, use ExtDirect call to get the tooltip's content
			if (table) {
				var description = '';
				if (typeof(top.TYPO3.LLL) !== 'undefined') {
					description = top.TYPO3.LLL.core.csh_tooltip_loading;
				} else if (opener && typeof(opener.top.TYPO3.LLL) !== 'undefined') {
					description = opener.top.TYPO3.LLL.core.csh_tooltip_loading;
				}

					// Clear old tooltip contents
				updateTip({
					description: description,
					cshLink: '',
					moreInfo: '',
					title: ''
				});
					// Load content
				TYPO3.CSH.ExtDirect.getTableContextHelp(table, function(response, options) {
					Ext.iterate(response, function(key, value){
						cshHelp.add(value);
						if (key === field) {
							updateTip(value);
								// Need to re-position because the height may have increased
							tip.show();
						}
					});
				}, this);

				// No table was given, use directly title and description
			} else {
				updateTip({
					description: link.getAttribute('data-description'),
					cshLink: '',
					moreInfo: '',
					title: link.getAttribute('data-title')
				});
			}
		}
	}

	/**
	 * Update tooltip message
	 *
	 * @param {Object} response
	 */
	function updateTip(response) {
		tip.body.dom.innerHTML = response.description;
		tip.cshLink = response.id;
		tip.moreInfo = response.moreInfo;
		if (tip.moreInfo) {
			tip.addClass('tipIsLinked');
		}
		tip.setTitle(response.title);
		tip.doAutoWidth();
	}

	return {
		/**
		 * Constructor
		 */
		init: function() {
			tip = new Ext.ToolTip({
				title: 'CSH', // needs a title for init because of the markup
				html: '',
					// The tooltip will appear above the label, if viewport allows
				anchor: 'bottom',
				minWidth: 160,
				maxWidth: 240,
				target: Ext.getBody(),
				delegate: 'span.t3-help-link',
				renderTo: Ext.getBody(),
				cls: 'typo3-csh-tooltip',
				shadow: false,
				dismissDelay: 0, // tooltip stays while mouse is over target
				autoHide: true,
				showDelay: 1000, // show after 1 second
				hideDelay: 300, // hide after 0.3 seconds
				closable: true,
				isMouseOver: false,
				listeners: {
					beforeshow: showToolTipHelp,
					render: function(tip) {
						tip.body.on({
							'click': {
								fn: function(event) {
									event.stopEvent();
									if (tip.moreInfo) {
										try {
											top.TYPO3.ContextHelpWindow.open(tip.cshLink);
										} catch(e) {
											// do nothing
										}
									}
									tip.hide();
								}
							}
						});
						tip.el.on({
							'mouseover': {
								fn: function() {
									if (tip.moreInfo) {
										tip.isMouseOver = true;
									}
								}
							},
							'mouseout': {
								fn: function() {
									if (tip.moreInfo) {
										tip.isMouseOver = false;
										tip.hide.defer(tip.hideDelay, tip, []);
									}
								}
							}
						});
					},
					hide: function(tip) {
						tip.setTitle('');
						tip.body.dom.innerHTML = '';
					},
					beforehide: function(tip) {
						return !tip.isMouseOver;
					},
					scope: this
				}
			});

			Ext.getBody().on({
				'keydown': {
					fn: function() {
						tip.hide();
					}
				},
				'click': {
					fn: function() {
						tip.hide();
					}
				}
			});

			/**
			 * Adds a sequence to Ext.TooltTip::showAt so as to increase vertical offset when anchor position is 'botton'
			 * This positions the tip box closer to the target element when the anchor is on the bottom side of the box
			 * When anchor position is 'top' or 'bottom', the anchor is pushed slightly to the left in order to align with the help icon, if any
			 *
			 */
			Ext.ToolTip.prototype.showAt = Ext.ToolTip.prototype.showAt.createSequence(
				function() {
					var ap = this.getAnchorPosition().charAt(0);
					if (this.anchorToTarget && !this.trackMouse) {
						switch (ap) {
							case 'b':
								var xy = this.getPosition();
								this.setPagePosition(xy[0]-10, xy[1]+5);
								break;
							case 't':
								var xy = this.getPosition();
								this.setPagePosition(xy[0]-10, xy[1]);
								break;
						}
					}
				}
			);

		},

		/**
		 * Opens the help window, triggered from click event handler
		 *
		 * @param {Event} event
		 * @param {Node} link
		 */
		openHelpWindow: function(event, link) {
			var id = link.getAttribute('data-table') + '.' + link.getAttribute('data-field');
			event.stopEvent();
			top.TYPO3.ContextHelpWindow.open(id);
		}
	}
}();

/**
 * Calls the init on Ext.onReady
 */
Ext.onReady(TYPO3.ContextHelp.init, TYPO3.ContextHelp);

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2010-2011 Steffen Kamper <info@sk-typo3.de>
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 * Flashmessage rendered by ExtJS
 *
 *
 * @author Steffen Kamper <info@sk-typo3.de>
 */
Ext.ns('TYPO3');

/**
 * Object for named severities
 */
TYPO3.Severity = {
	notice: 0,
	information: 1,
	ok: 2,
	warning: 3,
	error: 4
};

/**
 * @class TYPO3.Flashmessage
 * Passive popup box singleton
 * @singleton
 *
 * Example (Information message):
 * TYPO3.Flashmessage.display(1, 'TYPO3 Backend - Version 4.4', 'Ready for take off', 3);
 */
TYPO3.Flashmessage = function() {
	var messageContainer;
	var severities = ['notice', 'information', 'ok', 'warning', 'error'];

	function createBox(severity, title, message) {
		return ['<div class="typo3-message message-', severity, '" style="width: 400px">',
				'<div class="t3-icon t3-icon-actions t3-icon-actions-message t3-icon-actions-message-close t3-icon-message-' + severity + '-close"></div>',
				'<div class="header-container">',
				'<div class="message-header">', title, '</div>',
				'</div>',
				'<div class="message-body">', message, '</div>',
				'</div>'].join('');
	}

	return {
		/**
		 * Shows popup
		 * @member TYPO3.Flashmessage
		 * @param int severity (0=notice, 1=information, 2=ok, 3=warning, 4=error)
		 * @param string title
		 * @param string message
		 * @param float duration in sec (default 5)
		 */
		display : function(severity, title, message, duration) {
			duration = duration || 5;
			if (!messageContainer) {
				messageContainer = Ext.DomHelper.insertFirst(document.body, {
					id   : 'msg-div',
					style: 'position:absolute;z-index:10000'
				}, true);
			}

			var box = Ext.DomHelper.append(messageContainer, {
				html: createBox(severities[severity], title, message)
			}, true);
			messageContainer.alignTo(document, 't-t');
			box.child('.t3-icon-actions-message-close').on('click',	function (e, t, o) {
				var node;
				node = new Ext.Element(Ext.get(t).findParent('div.typo3-message'));
				node.hide();
				Ext.removeNode(node.dom);
			}, box);
			box.slideIn('t').pause(duration).ghost('t', {remove: true});
		}
	};
}();

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
/**
 * Fix the problem of DTM in dbNewContentElWizard that the last selected
 * tab could not be selected initially (e.g. on page reload) due to
 * his removal via "manipulateWizardItems"
 *
 * @author Tobias Ferger <tobi@tt36.de>
 */

function DTM_activate(idBase,index,doToogle) {
// Hiding all:
	if (DTM_array[idBase]) {
		for(var cnt = 0; cnt < DTM_array[idBase].length ; cnt++) {
			if (DTM_array[idBase][cnt] !== idBase + '-' + index) {
				document.getElementById(DTM_array[idBase][cnt]+'-DIV').style.display = 'none';
// Only Overriding when Tab not disabled
				if (document.getElementById(DTM_array[idBase][cnt]+'-MENU').attributes.getNamedItem('class').nodeValue !== 'disabled') {
					document.getElementById(DTM_array[idBase][cnt]+'-MENU').attributes.getNamedItem('class').nodeValue = 'tab';
				}
			}
		}
	}
// Showing one:
	if(!document.getElementById(idBase+'-'+index+'-MENU')){
		index = 1;
	}
	if (document.getElementById(idBase+'-'+index+'-DIV')) {
		if (doToogle && document.getElementById(idBase+'-'+index+'-DIV').style.display === 'block') {
			document.getElementById(idBase+'-'+index+'-DIV').style.display = 'none';
			if (DTM_origClass === '') {
				document.getElementById(idBase+'-'+index+'-MENU').attributes.getNamedItem('class').nodeValue = 'tab';
			} else {
				DTM_origClass = 'tab';
			}
			top.DTM_currentTabs[idBase] = -1;
		} else {
			document.getElementById(idBase+'-'+index+'-DIV').style.display = 'block';
			if (DTM_origClass === '') {
				document.getElementById(idBase+'-'+index+'-MENU').attributes.getNamedItem('class').nodeValue = 'tabact';
			} else {
				DTM_origClass = 'tabact';
			}
			top.DTM_currentTabs[idBase] = index;
		}
	}
	document.getElementById(idBase+'-'+index+'-MENU').attributes.getNamedItem('class').nodeValue = 'tabact';
}
/*
 * drag-and-drop library for content elements
 * requires ExtJS
 * 
 * - FEATURE: reload-less DnD: compare page lastchange to current page "age" on ajax (pageRenderTime inserted by onReady injector)
 */

GridElementsDD = function() {
	var
	// set when initAll() has finished
		isInitialized = false,

	// default draggable template - filled on initAll
		defaultTemplate = '',

	// basic setup for all drag elements (existing content elements that can be dragged around)

		dragBehaviorDragelements = {
			// the current class
			dragClass: null,

			// flag for "draggables" (new content elements dragged in)
			isDraggable: false,

			// cache for content of the dragger
			draggerContent: null,

			// called whenever dragging starts (mousedown for a little while)
			b4StartDrag: function() {

				Ext.dd.ScrollManager.register('typo3-docbody');

				Ext.dd.ScrollManager.frequency = 50;
				Ext.dd.ScrollManager.increment = 20;
				Ext.dd.ScrollManager.animate = false;

				// reset all top. properties set below
				top.originalfirstDroptarget = null;
				top.originalPositionDropTargetId = null;
				top.elementUID = null;
				top.targetUID = null;
				// memorize current id
				top.elId = this.id;
				// set isDragging for other scripts
				top.isDragging = true;

				// cache dragger
				if(!this.el) {
					this.el = Ext.get(this.getEl());
				}
				if(!this.scrollBody) {
					this.scrollBody = Ext.get('typo3-docbody');
				}

				top.startScrollTop = this.scrollBody.dom.scrollTop;
				top.startScrollLeft = this.scrollBody.dom.scrollLeft;

				// is this a new or an existing element?
				var dragEl = Ext.get(this.el);
				if(dragEl.select('span.ce-icons-left a span').elements.length > 0) {
					top.elementUID = dragEl.select('span.ce-icons-left a span').elements[0].getAttribute('title').replace('id=', '').match(/^(\d)+/g);

					var currentSpacer = document.createElement('div');
					Ext.get(currentSpacer).addClass('t3-dd-spacer');
					Ext.get(currentSpacer).insertAfter(this.getEl());

				} else {
					top.elementUID = 'NEW';
				}

				// is this a top level element?
				top.isTopLevelOnly = (dragEl.select('div.t3-gridTLContainer').elements.length ? true : false);

				// get CType
				if(dragEl.select('div.t3-page-ce-body div[class^=t3-ctype-]').elements.length){
					// existing ce
					top.elementCType = dragEl.select('div.t3-page-ce-body div[class^=t3-ctype-]').elements[0].className.substr(9).replace(/ t3-gridTLContainer/g, '');
				}else{
					// new ce
					top.elementCType = dragEl.select('div[class^=t3-ctype-]').elements[0].className.substr(9).replace(/ t3-gridTLContainer/g, '');
				}

				// always cache the original XY Coordinates of the element
				this.originalXY = this.el.getXY();

				// memorize current position of this.el in DOM
				this.nextEl = this.el.next();
				this.prevEl = this.el.prev();

				// reset invalidDrop
				this.invalidDrop = false;

				// add dragging class
				this.el.addClass('x-dd-dragging');

				if(this.isDraggable) {
					// cache current content within dragger
					this.draggerContent = this.el.dom.innerHTML;

					// this uses the actual dragger icon:
					this.draggerTemplate = '<div>' + this.prevEl.dom.innerHTML + '</div>';

					/*
					 // TODO: get actual template (maybe get actual content after drop finished), this is just a demo one
					 this.draggerTemplate = '\
					 <div class="t3-page-ce x-dd-makemedrag x-dd-makedroptarget x-dd-droptargetgroup-els active">\
					 <h4 class="t3-page-ce-header">\
					 <div class="t3-row-header">\
					 <a href="#" onclick="window.location.href=\'{editurl}\'; return false;" title="Edit"><span class="t3-icon t3-icon-actions t3-icon-actions-document t3-icon-document-open">&nbsp;</span></a>\
					 <a href="{hideurl}" title="Hide"><span class="t3-icon t3-icon-actions t3-icon-actions-edit t3-icon-edit-hide">&nbsp;</span></a>\
					 <a href="{deleteurl}" onclick="return confirm(String.fromCharCode(65,114,101,32,121,111,117,32,115,117,114,101,32,121,111,117,32,119,97,110,116,32,116,111,32,100,101,108,101,116,101,32,116,104,105,115,32,114,101,99,111,114,100,63));" title="Delete"><span class="t3-icon t3-icon-actions t3-icon-actions-edit t3-icon-edit-delete">&nbsp;</span></a>\
					 <span class="t3-page-ce-icons-move">\
					 <a href="{moveupurl}" title="Move record up"><span class="t3-icon t3-icon-actions t3-icon-actions-move t3-icon-move-up">&nbsp;</span></a>\
					 <a href="{movedownurl}" title="Move record down"><span class="t3-icon t3-icon-actions t3-icon-actions-move t3-icon-move-down">&nbsp;</span></a>\
					 </span>\
					 </div>\
					 </h4>\
					 <div class="t3-page-ce-body">\
					 <div class="t3-page-ce-type">\
					 <a href="#" onclick="showClickmenu(&quot;tt_content&quot;,&quot;263&quot;,&quot;1&quot;,&quot;&quot;,&quot;..%2F..%2F..%2F|727949ac25&quot;,&quot;&quot;);return false;" oncontextmenu="showClickmenu(&quot;tt_content&quot;,&quot;263&quot;,&quot;1&quot;,&quot;&quot;,&quot;..%2F..%2F..%2F|727949ac25&quot;,&quot;&quot;);return false;"><span title="" class="t3-icon t3-icon-mimetypes t3-icon-mimetypes-x t3-icon-x-content-table">&nbsp;</span></a>\
					 <span class="t3-icon t3-icon-flags t3-icon-flags-gb t3-icon-gb">&nbsp;</span>&nbsp;English (Default) &nbsp;<strong>Table</strong>\
					 </div>\
					 <div>\
					 <strong><a href="#" onclick="window.location.href=\'{editurl}\'; return false;" title="Edit">{exampletitle}</a></strong><br>\
					 <span class="exampleContent">{exampletext}</span>\
					 </div>\
					 </div>\
					 <div class="x-dd-droptargetarea debugme">\
					 <div class="x-dd-droptargetarea" title="">{dropzonetext}</div>\
					 </div>\
					 </div>\
					 ';
					 */

					// template node found? use default one
					if(this.draggerTemplate) {
						this.el.dom.innerHTML = this.draggerTemplate;
					}else{
						this.el.dom.innerHTML = defaultTemplate;
					}

					var newElRel = String(this.prevEl.getAttribute('onclick'));
					newElRel = newElRel.split('document.editForm.defValues.value=unescape(\'');
					newElRel = newElRel[1].split('\');goToalt_doc();');
					this.el.dom.rel = unescape(newElRel[0]).replace(/defVals\[tt_content\]/g, 'data[tt_content][NEW]');

				} else {
					this.nextEl = false;
				}

				// activate dropzones of elements other than the current one, depending on ctype and toplevel
				Ext.each(Ext.select('.x-dd-droptargetgroup-' + this.dragClass).elements, function(elementNow) {

					var showDropTarget = false;

					if(top.elId !== elementNow.id){

						var elNow = Ext.get(elementNow);
						var parentGridContainer = elNow.findParent('div.t3-gridContainer', 7);

						if(elNow.select('.x-dd-droptargetarea').elements[0]){
							if(elNow.findParent('td.t3-allow-all', 5) || elNow.findParent('td.t3-allow-'+top.elementCType, 5)){
								if(top.isTopLevelOnly && parentGridContainer){
									if(elNow.findParent('td.t3-gridTL', 5)){
										showDropTarget = true;
									}
								}else{
									showDropTarget = true;
								}
							}
						}

					}

					if(showDropTarget){
						Ext.get(elementNow).select('.x-dd-droptargetarea').addClass('x-dd-showdroptarget');
					}else{
						Ext.get(elementNow).select('.x-dd-droptargetarea').removeClass('x-dd-showdroptarget');
					}

				});
			},
			// called when the drag element is dragged over the a drop target with the same ddgroup
			onDragEnter: function(evtObj, targetElId) {
				// colorize the drag target if the drag node's parent is not the same as the drop target
				if(
					targetElId !== this.getEl().id
						&&
						(
							(
								top.originalPositionDropTargetId
									&&
									top.originalPositionDropTargetId !== targetElId
								)
								||
								(
									!top.originalPositionDropTargetId
										&&
										top.originalfirstDroptarget !== targetElId
									)
							)
					) {
					Ext.get(targetElId).addClass('x-dd-overdroparea');
				}
			},
			onDrag: function(evtObj, targetElId) {
				this.el.dom.style.left = evtObj.xy[0] - this.originalXY[0] + this.scrollBody.dom.scrollLeft - top.startScrollLeft + 'px';
				this.el.dom.style.top = evtObj.xy[1] - this.originalXY[1] + this.scrollBody.dom.scrollTop - top.startScrollTop  + 'px';
			},
			// called when element is dragged out of a dropzone with the same ddgroup
			onDragOut: function(evtObj, targetElId) {
				// remove "over" class from drop target
				Ext.get(targetElId).removeClass('x-dd-overdroparea');
			},

			// called when element is dropped not anything other than a dropzone with the same ddgroup
			onInvalidDrop: function() {
				// set invalidDrop flag
				this.invalidDrop = true;
			},

			// called when dnd completes successfully
			onDragDrop: function(evtObj, targetElId) {

				// reset invalidDrop
				this.invalidDrop = false;

				if(
				// move node only if the drag element is not the same as the drop target
					Ext.get(targetElId).hasClass('x-dd-showdroptarget')
						&&
					this.el.dom.id !== targetElId
						&&
						// cancel drops resulting in current position
						(top.originalPositionDropTargetId !== targetElId)
						&&
						// cancel drops resulting in current position
						(top.originalfirstDroptarget !== targetElId)
					) {

					// we need a flag to define, if we have to insert the element on top of any column
					var columnInsert = true;

					// the title contains the relevant information
					// when it is "column-12345-6" the position is on top of column 6 of element 12345
					// when it is "id=12345" the position is after element 12345
					// otherwise the position is on top of column x of the current page
					var targetTitle = Ext.get(targetElId).getAttribute('title');
					if(targetTitle.substr(0,7) == 'column-') {
						top.targetUID = targetTitle.substr(7);
					} else if(targetTitle.substr(0,3) == 'id=') {
						top.targetUID = targetTitle.substr(3);
						columnInsert = false;
					} else {
						top.targetUID = targetTitle.replace(/DD_DROP_PID/g, top.elementUID);
					}

					// Ajax timeout should match the server timeout
					Ext.Ajax.timeout = 60000;

					// if the user pressed the CTRL-key while dropping, the action has to be a copy
					// otherwise it's just a move
					var
						actionURL = '',
						ctrlPressed = false;

					if(evtObj.ctrlKey) {
						actionURL = top.copyURL.replace(/DD_DRAG_UID/g, top.elementUID);
						ctrlPressed = true;
					} else {
						actionURL = top.moveURL.replace(/DD_DRAG_UID/g, top.elementUID);
					}

					// the rest of the action URL works the same way for both actions
					actionURL = actionURL.replace(/DD_DROP_UID/g, '-' + top.targetUID);
					actionURL = actionURL.replace('../../../', top.TS.PATH_typo3);

					// we don't need the redirect URL, since we will do a reload after the Ajax action
					// so a redirect within the Ajax action would be too much server load here
					actionURL = actionURL.replace('&redirect=1', '');

					GridElementsDD.doCmdAction(actionURL, ctrlPressed);

					// add after Ext.get(targetElId)
					if(columnInsert) {
						this.el.insertAfter(Ext.get(targetElId).parent());
					} else {
						this.el.insertAfter(Ext.get(targetElId).parent().parent());
					}

					// remove the drag invitation
					this.onDragOut(evtObj, targetElId);

					// clear the styles and reset content to previous
					this.el.dom.style.position ='';
					this.el.dom.style.top = '';
					this.el.dom.style.left = '';
				} else {

					// invalid drop, initiate a repair
					this.onInvalidDrop();
				}
			},

			// called after dnd ends with or without success
			endDrag: function() {
				// Remove tmp spacer div from grid layout
				var ddSpacer = Ext.select('.t3-dd-spacer');
				if(ddSpacer.elements.length){
					ddSpacer.first().remove();
				}

				// invoke animation only if invalidDrop is true
				if(this.invalidDrop === true) {

					// define animation
					var animCfgObj = {
						easing: 'easeNone', //'elasticOut',
						duration: 0.2,
						scope: this,
						callback: function() {
							// remove the position attribute
							this.el.dom.style.position = '';
							this.el.dom.style.left = '';
							this.el.dom.style.top = '';

							if(this.isDraggable) {
								// replace content with original draggerContent
								this.el.dom.innerHTML = this.draggerContent;
							}

							// put item back to original DOM position
							this.el.insertAfter(this.prevEl);
						}
					};

					// apply animation
					this.el.moveTo(this.originalXY[0], this.originalXY[1], animCfgObj);

					// reset invalidDrop
					this.invalidDrop = false;
				}

				// remove dragging class
				this.el.removeClass('x-dd-dragging');

				// deactivate all dropzones after all drops
				Ext.each(Ext.select('.x-dd-droptargetgroup-' + this.dragClass).elements, function(elementNow) {
					Ext.get(elementNow).select('.x-dd-droptargetarea').removeClass('x-dd-showdroptarget');
				});

				// set isDragging for other scripts
				top.isDragging = false;
			}
		},

	// copy dragBehaviorDragelements onto dragBehaviorDraggables
		dragBehaviorDraggables = Ext.apply({}, dragBehaviorDragelements);

	// end var

	// overwrite dragBehaviorDraggables specials
	dragBehaviorDraggables.isDraggable = true;
	dragBehaviorDraggables.onDragDrop = function(evtObj, targetElId) {
		// remove invalidDrop flag
		this.invalidDrop = false;

		// move node only if the drag element's parent is not the same as the drop target
		if(this.el.dom.parentNode.id != targetElId && Ext.get(targetElId).hasClass('x-dd-showdroptarget')) {

			// clone template element
			var newContentEl = Ext.get(this.el).dom.cloneNode(true);

			// reset the element's ID as this 
			newContentEl.id = '';

			// add clone to DOM after Ext.get(targetElId) to ...
			var extNewEl = Ext.get(newContentEl).insertAfter(Ext.get(targetElId).parent().parent());

			// assign drag element group
			var	dragElementNow = new Ext.dd.DD(Ext.get(extNewEl), 'droptargets-' + this.dragClass, {
				isTarget: false,
				scroll: false,
				maintainOffset: false
			});

			/*
			 // assign an ID to contained H4
			 var tempH4El = Ext.get(extNewEl.select('h4').elements[0]);

			 // restrict drag handle to h4 within
			 dragElementNow.setHandleElId(extNewEl.select('h4').elements[0].id);
			 */

			// apply the overrides object to the newly created instance of DD
			dragBehaviorDragelements.dragClass = this.dragClass;
			Ext.apply(dragElementNow, dragBehaviorDragelements);

			// make extNewEl a dropzone too - one for each contained class!
			var
			// init matchingClass
				matchingClass = '',
			// get all currentClasses
				currentClasses = extNewEl.dom.className.split(' ');

			// look for x-dd-droptargetgroup-XYZ class
			for(var i in currentClasses) {

				if(!currentClasses.hasOwnProperty(i)) {
					continue;
				}

				if(/x-dd-droptargetgroup-/.test(currentClasses[i]) === true) {
					matchingClass = currentClasses[i].split('-')[3];

					// get all possible droptargets
					// there might be more than one in cascaded elements (sub-elements)
					var allMatches = extNewEl.select('.x-dd-droptargetarea').elements;

					// we need to make the last one a drop target
					// this ensures we get the one matching the current element, not one of a sub-element
					var dropZoneNow = new Ext.dd.DDTarget(allMatches[allMatches.length - 1], 'droptargets-' + matchingClass);
				}
			}

			// remove the drag invitation from drop area
			this.onDragOut(evtObj, targetElId);

			// clear the styles and reset content to previous
			/*
			 this.el.dom.style.position = 'relative';
			 this.el.dom.style.top = '';
			 this.el.dom.style.left = '';
			 */

			// replace content with original draggerContent
			//this.el.dom.innerHTML = this.draggerContent;

			// set title
			var targetTitle = Ext.get(targetElId).getAttribute('title');

			if(targetTitle.substr(0,7) == 'column-') {
				top.targetUID = targetTitle.substr(7);
			} else if(targetTitle.substr(0,3) == 'id=') {
				top.targetUID = targetTitle.substr(3);
			} else {
				top.targetUID = targetTitle.replace(/DD_DROP_PID/g, 'NEW');
			}

			// show loading spinner
			top.TYPO3.Backend.ContentContainer.setMask();

			actionURL = top.TYPO3.configuration.PATH_typo3 + 'alt_doc.php?' + this.el.dom.rel + '&edit[tt_content][]=new';

			Ext.Ajax.request({
				url: actionURL,
				params: {
					doSave: 1,
					'data[tt_content][NEW][pid]': '-' + top.targetUID,
					'data[tt_content][NEW][header]': TYPO3.l10n.localize('tx_gridelements_js.newcontentelementheader'),
					DDinsertNew : top.DDpid,
					formToken : top.DDtoken
				},
				method: 'GET',
				success: function( result, request ) {
					if(GridElementsDD.baseConf.doReloadsAfterDrops) {
						// reload page to verify/show updates
						locationSplit = self.location.href.split('#');
						self.location.href = locationSplit[0] + '#ce' + top.targetUID;
						self.location.reload(true);
					}else{
						// after the operation has finished, we simply hide the spinner
						top.TYPO3.Backend.ContentContainer.removeMask();
					}
				},
				failure: function( result, request ) {
					if(GridElementsDD.baseConf.doReloadsAfterDrops) {
						// reload page to verify/show updates
						locationSplit = self.location.href.split('#');
						self.location.href = locationSplit[0] + '#ce' + top.targetUID;
						self.location.reload(true);
					}else{
						// TODO: error happened - remove just dropped element and show error');
						// after the operation has finished, we simply hide the spinner
						top.TYPO3.Backend.ContentContainer.removeMask();
					}
				}
			});

		} else {
			// This was an invalid drop, initiate a repair
			this.onInvalidDrop();
		}
	};

	return {

		// some config vars, can be set by the onReady script
		baseConf: {
			// this is set by the onReady loader script (in lib/class.tx_gridelements_addjavascript.php) which gets the current time from the server
			pageRenderTime: null,
			// base url of the extension, used for Ajax URLs
			extBaseUrl: '',
			doReloadsAfterDrops: false,
			useIconsForNew: false
		},

		// stores the UIDs of copied items
		copyItemUids: {},

		// retrieves a localized string from the TYPO3.lang global
		// llId is a key from locallang_db.xml w/o the "tx_gridelements_js." part
		getLL: function(llId) {
			return TYPO3.lang["tx_gridelements_js." + llId];
		},

		// initialize this lib
		initAll: function() {

			this.defaultTemplate = '<div class="x-dd-defaulttpl">' + TYPO3.l10n.localize('tx_gridelements_js.missingcontenttemplate') + '</div>';

			// check, if this.baseConf.pageRenderTime has been str_replaced by onReady script
			if(this.baseConf.pageRenderTime === 'insert_server_time_here') {
				this.baseConf.pageRenderTime = null;
			}

			// this is called when you click an item in the content selection wizard (popup)
			// yes, this one has to be a global!
			window.setFormValueFromBrowseWin = function(colPosUidPid, tableUid, headerText){

				top.elementUID = tableUid.replace(/tt_content_/g, '');
				top.targetUID = colPosUidPid;

				// Ajax timeout should match the server timeout
				Ext.Ajax.timeout = 60000;

				var
					actionURL = '',
					ctrlPressed = true;

				actionURL = top.copyURL.replace(/DD_DRAG_UID/g, top.elementUID);
				actionURL = actionURL.replace(/DD_DROP_UID/g, top.targetUID);
				actionURL = actionURL.replace('../../../', top.TS.PATH_typo3);

				// we don't need the redirect URL, since we will do a reload after the Ajax action
				// so a redirect within the Ajax action would be too much server load here
				actionURL = actionURL.replace('&redirect=1', '');

				GridElementsDD.doCmdAction(actionURL, ctrlPressed);

			}

			// make elements draggable
			Ext.each(Ext.select('.x-dd-makemedrag').elements, function(elementNow) {

				var
					extElNow = Ext.get(elementNow),
					currentClasses = Ext.get(extElNow).dom.className.split(' '),
					matchingClass = '';

				// reset previous settings
				dragBehaviorDragelements.dragClass = null;

				// look for x-dd-droptargetgroup class in all currentClasses and make element draggable using the found targets
				for(var i in currentClasses) {

					if(!currentClasses.hasOwnProperty(i)) {
						continue;
					}

					// find x-dd-droptargetgroup-XYZ class
					if(/x-dd-droptargetgroup-/.test(currentClasses[i]) === true) {
						matchingClass = currentClasses[i].split('-')[3];

						// add Ext.dd.DD class to element with matching IDs
						var dragElementNow = new Ext.dd.DD(elementNow, 'droptargets-' + matchingClass, {
							isTarget: false,
							scroll: false,
							maintainOffset: false
						});

						// restrict drag handle to h4 within
						var handleEl = Ext.get(extElNow.select('h4').elements[0]);
						if(handleEl) {
							dragElementNow.setHandleElId(handleEl.id);
						}

						// apply the overrides object to the newly created instance of DD
						dragBehaviorDragelements.dragClass = matchingClass;
						Ext.apply(dragElementNow, dragBehaviorDragelements);

						// only do this for 1st matching class
						break;
					}
				}

			});

			// add draggers for icons with class x-dd-makedragger: <div class="x-dd-droptargetgroup" style="left: 100px; top: 100px;"></div>
			Ext.each(Ext.select('.x-dd-makedragger').elements, this.makeDragger);

			// define drop targets depending on their x-dd-droptargetgroup-XYZ class
			Ext.each(Ext.select('.x-dd-makedroptarget').elements, function(elementNow) {

				var
					matchingClass = '',
					currentClasses = Ext.get(elementNow).dom.className.split(' ');

				// look for x-dd-droptargetgroup-XYZ class
				for(var i in currentClasses) {

					if(!currentClasses.hasOwnProperty(i)) {
						continue;
					}

					//if(currentClasses[i] === 'x-dd-droptargetgroup-all' || /x-dd-droptargetgroup-/.test(currentClasses[i]) === true) {
					if(/x-dd-droptargetgroup-/.test(currentClasses[i]) === true) {
						matchingClass = currentClasses[i].split('-')[3];

						// get all possible droptargets
						// there might be more than one in cascaded elements (sub-elements)
						var allMatches = Ext.get(elementNow).select('.x-dd-droptargetarea').elements;

						// we need to make the last one a drop target
						// this ensures we get the one matching the current element, not one of a sub-element
						var dropZoneNow = new Ext.dd.DDTarget(allMatches[allMatches.length - 1], 'droptargets-' + matchingClass);

					}
				}
			});

			// add "new reference from other page" icons
			var
				newFromPageIconConf = {
					tag: 'a',
					href: '#',
					title: TYPO3.l10n.localize('tx_gridelements_js.copyfrompage'),
					rel: '',
					cn: {
						tag: 'span',
						'class': top.geSprites.copyfrompage,
						html: '&nbsp;'
					}
				},
			// add doc header "New" icon to a new array that collects all "New" icons
			// arrNewicons = [Ext.select('.t3-icon-document-new', true, 'typo3-docheader-row1').elements[0]];

			// for now: no "get copy from ..." icon on top of page
				arrNewicons = [];

			// add all other ”New" icons to array
			Ext.each(Ext.select('.t3-icon-document-new', true, Ext.select('.t3-page-ce-wrapper-new-ce, .t3-page-ce-new-ce').elements).elements, function(){
				arrNewicons.push(this);
			});

			// add new icon and bind click event
			Ext.each(arrNewicons, function(){
				var parent = typeof this.parent === 'function' ? this.parent() : null;
				newFromPageIconConf.rel = '';
				if(parent){
					var
						onclickAttr = parent.dom.getAttribute('onclick'),
						uidPidMatch = onclickAttr.match(/uid_pid=([-\d]+)/),
						colPosMatch = onclickAttr.match(/colPos=([-\d]+)/),
						containerMatch = onclickAttr.match(/tx_gridelements_container=([-\d]+)/),
						containerColPosMatch = onclickAttr.match(/tx_gridelements_columns=([-\d]+)/),
						uidPid = uidPidMatch !== null && typeof uidPidMatch != 'undefined' ? uidPidMatch[1] : '';
						colPos = colPosMatch !== null && typeof colPosMatch != 'undefined' ? colPosMatch[1] : '';
						container = containerMatch !== null && typeof containerMatch != 'undefined' ? containerMatch[1] : '';
						containerColPos = containerColPosMatch !== null && typeof containerColPosMatch != 'undefined' ? containerColPosMatch[1] : '';

					if(container > 0 && containerColPos > 0) {
						newFromPageIconConf.rel = - container + 'x' + containerColPos;
					} else if(container == '' && colPos > 0 && uidPid > 0) {
						newFromPageIconConf.rel = uidPid + 'x' + colPos;
					} else {
						newFromPageIconConf.rel = uidPid;
					}

					Ext.DomHelper.insertAfter(parent, newFromPageIconConf, true).on('click', function(targetEvent, targetEl){
							var url = top.backPath + 'browser.php?mode=db&bparams=' + targetEl.parentNode.rel + '|||tt_content|';
							var browserWin = window.open(url, "Typo3WinBrowser", "height=650,width=650,status=0,menubar=0,resizable=1,scrollbars=1");
							browserWin.focus();
						}
					);
				}
			});

			this.isInitialized = true;
		},

		doCmdAction: function(actionURL, ctrlPressed) {
			// before executing the Ajax action, we have to activate the mask with the spinning wheel
			top.TYPO3.Backend.ContentContainer.setMask();
			Ext.Ajax.request({
				url: actionURL,
				success: function( result, request ) {
					if(GridElementsDD.baseConf.doReloadsAfterDrops) {
						// reload page to verify/show updates
						locationSplit = self.location.href.split('#');
						self.location.href = locationSplit[0] + '#ce' + top.targetUID;
						self.location.reload(true);
					}else{
						// after the operation has finished, we simply hide the spinner
						top.TYPO3.Backend.ContentContainer.removeMask();
					}
				},
				failure: function( result, request ) {
					if(GridElementsDD.baseConf.doReloadsAfterDrops) {
						// reload page to verify/show updates
						locationSplit = self.location.href.split('#');
						self.location.href = locationSplit[0] + '#ce' + top.targetUID;
						self.location.reload(true);
					}else{
						// TODO: error happened - put dragged element back to original position');
						top.TYPO3.Backend.ContentContainer.removeMask();
					}
				}
			});
		},

		makeDragger: function(elementNow) {
			var
				extElNow = Ext.get(elementNow),
				elementNowTitle = extElNow.getAttribute('title'),
				elementNowWidth = extElNow.getComputedWidth(),
				elementNowHeight = extElNow.getHeight(),
				elementNowMargins = extElNow.getMargins(),
				elementNowValign = extElNow.getStyles('vertical-align')['vertical-align'],
				elementNowCType = (extElNow.getAttribute('onclick').match(/tt_content%5D%5BCType%5D%3D\w+/) ? 't3-ctype-' + extElNow.getAttribute('onclick').match(/tt_content%5D%5BCType%5D%3D\w+/)[0].substr(27) : ''),
				elementNowTopLevelLayout = (extElNow.getAttribute('onclick').match(/isTopLevelLayout/) ? ' t3-gridTLContainer' : ''),
				elementNowClassContainer = '<div class="' + elementNowCType + elementNowTopLevelLayout + '" style="display:none"></div>',
				currentEl = Ext.DomHelper.insertHtml('afterEnd', elementNow, '<div title="' + elementNowTitle + '" class="x-dd-droptargetgroup" style="position: relative; display: inline-block; z-index: 99; width: ' + elementNowWidth + 'px; height: ' + elementNowHeight + 'px; margin-left: -' + (elementNowWidth + elementNowMargins.right) + 'px; margin-top: -' + elementNowMargins.top + 'px; vertical-align: ' + elementNowValign + '">' + elementNowClassContainer + '</div>'),
				currentClasses = Ext.get(extElNow).dom.className.split(' '),
				matchingClass = '';

			// reset previous settings
			dragBehaviorDraggables.dragClass = null;
			dragBehaviorDraggables.useTpl = null;

			// set right margin to the one of the original element
			currentEl.style.marginTop = elementNowMargins.top + 'px';
			currentEl.style.marginRight = elementNowMargins.right + 'px';

			// look for x-dd-usetpl-XYZ class
			for(var i in currentClasses) {
				if(!currentClasses.hasOwnProperty(i)) {
					continue;
				}

				// find useTpl in x-dd-usetpl-XYZ class if dragBehaviorDraggables.useTpl was not found yet
				if(/x-dd-usetpl-/.test(currentClasses[i]) === true) {
					dragBehaviorDraggables.useTpl = currentClasses[i].split('-')[3];

					// break after first one
					break;
				}
			}

			// look for x-dd-droptargetgroup-XYZ class
			for(var h in currentClasses) {
				if(!currentClasses.hasOwnProperty(h)) {
					continue;
				}

				// find x-dd-droptargetgroup-XYZ class
				if(/x-dd-droptargetgroup-/.test(currentClasses[h]) === true) {
					// get XYZ class part from x-dd-droptargetgroup-XYZ
					matchingClass = currentClasses[h].split('-')[3];

					// use matchingClass for dragBehaviorDraggables.useTpl if not found before
					if(dragBehaviorDraggables.useTpl === null) {
						dragBehaviorDraggables.useTpl = matchingClass;
					}

					// add Ext.dd.DD class to element with matching IDs
					var draggerNow = new Ext.dd.DD(currentEl, 'droptargets-' + matchingClass, {
						isTarget: false,
						scroll: false,
						maintainOffset: false
					});

					// apply the overrides object to the newly created instance of DD
					dragBehaviorDraggables.dragClass = matchingClass;
					Ext.apply(draggerNow, dragBehaviorDraggables);

				}
			}
		},

		listenForCopyItem: function(intItemUid) {
			//console.log('GridElementsDD.listenForCopyItem() reached, intItemUid = ' + intItemUid, GridElementsDD.copyItemUids);
			GridElementsDD.copyItemUids[intItemUid] = true;
		},

		handleClipboardItem: function(clipboardItemUid, params) {

			// set top vars so they're instantly available in reloaded frames
			if(params.search(/setCopyMode.+/) != -1) {
				top.DDclipboardfilled = (top.DDclipboardfilled == "copy" && top.DDclipboardElId == clipboardItemUid) ? "" : "copy";
			} else {
				top.DDclipboardfilled = (top.DDclipboardfilled == "move" && top.DDclipboardElId == clipboardItemUid) ? "" : "move";
			}

			top.DDclipboardElId = top.DDclipboardfilled ? clipboardItemUid : 0;

			// remove and re-add insert icons
			GridElementsDD.removePasteAndRefIcons();
			if(top.DDclipboardfilled) {
				GridElementsDD.addPasteAndRefIcons(clipboardItemUid);
			}

		},

		removePasteAndRefIcons: function() {
			// console.log('removePasteAndRefIcons reached');
			// remove all existing paste-copy icons
			var pasteIcons = Ext.select('.t3-icon-gridelements-pastecopy').elements;
			Ext.each(pasteIcons, function(iconEl) {
				Ext.get(iconEl).remove();
			});

			// remove all existing paste-reference icons
			var pasteRefIcons = Ext.select('.t3-icon-gridelements-pasteref').elements;
			Ext.each(pasteRefIcons, function(iconEl) {
				Ext.get(iconEl).remove();
			});
		},

		addPasteAndRefIcons: function(clipboardItemUid) {
			// console.log('addPasteAndRefIcons reached');
			// add paste icons to column headers
			if(clipboardItemUid.substr(0,5) != '_FILE') {
				colHeader = Ext.select('.t3-page-ce-wrapper-new-ce, .t3-page-ce-new-ce').elements;
				Ext.each(colHeader, function(currentColHeader) {
					var dropZoneID = null,
						parentCell = Ext.get(currentColHeader).hasClass('t3-page-ce-new-ce') ? Ext.get(currentColHeader).parent('.t3-page-ce').select('.t3-icon-mimetypes, .t3-icon-tcarecords').elements[0] : Ext.get(currentColHeader).parent('.t3-page-column');

					if(Ext.get(currentColHeader).hasClass('t3-page-ce-wrapper-new-ce') && Ext.get(parentCell).id.substr(0, 6) != 'column') {
						var parentCellClass = Ext.get(parentCell).dom.className.split(' ');
						for(i = 0; i < parentCellClass.length; i++) {
							if(parentCellClass[i].substr(0, 15) == 't3-page-column-') {
								// add page id - must be negative to identify it as a PID
								dropZoneID = top.DDpid + 'x' + parentCellClass[i].substr(15);
							}
						};
					} else {
						if(Ext.get(currentColHeader).hasClass('t3-page-ce-new-ce')) {
							dropZoneID = '-' + parentCell.getAttribute('title').substr(3);
						} else {
							dropZoneID = '-' + Ext.get(parentCell).id.substr(7);
						}
					}

					// dropZoneID now has this format: column-1234567x0 or DD_PAGECOLUMNx0
					// the number after the "x" can be positive and negative, e.g. DD_PAGECOLUMNx-2 for "unused elements"
					var lastColHeaderLink = Ext.get(currentColHeader).select('a:last').elements[0];

					// add "paste copy" icon
					var
						pasteCopyIconConf = {
							tag: 'a',
							href: '#',
							title: TYPO3.l10n.localize('tx_gridelements_js.pastecopy'),
							cn: {
								tag:'span',
								'class': top.geSprites.pastecopy,
								html:'&nbsp;'
							}
						},
						pasteCopyIcon = Ext.DomHelper.insertAfter(lastColHeaderLink, pasteCopyIconConf, true);

					if(top.DDclipboardfilled == 'move'){

						// bind click event
						pasteCopyIcon.on('click', function(){
							GridElementsDD.ajaxThenReload(
								top.moveURL.replace('DD_DRAG_UID', clipboardItemUid).replace('DD_DROP_UID', dropZoneID) + "&CB[paste]=tt_content%7C-" + clipboardItemUid + "&CB[pad]=normal"
							);
							return false;
						});

					} else if(top.DDclipboardfilled == 'copy'){

						// bind click event
						pasteCopyIcon.on('click', function(){
							GridElementsDD.ajaxThenReload(
								top.pasteTpl.replace('DD_REFYN', '0&DDcopy=1').replace('DD_DRAG_UID', clipboardItemUid).replace('DD_DROP_UID', dropZoneID)
							);
							return false;
						});

						// also add "paste reference" icon in this case
						var
							pasteRefIconConf = {
								tag: 'a',
								href: '#',
								title: TYPO3.l10n.localize('tx_gridelements_js.pasteref'),
								cn: {
									tag:'span',
									'class': top.geSprites.pasteref,
									html:'&nbsp;'
								}
							},
							pasteRefIcon = Ext.DomHelper.insertAfter(pasteCopyIcon, pasteRefIconConf, true);

						// bind click event
						pasteRefIcon.on('click', function(){
							GridElementsDD.ajaxThenReload(
								top.pasteTpl.replace('DD_REFYN', 1).replace('DD_DRAG_UID', clipboardItemUid).replace('DD_DROP_UID', dropZoneID)
							);
							return false;
						});
					}
				});
			}
		},

		ajaxThenReload: function(actionURL) {

			// show spinner icon
			top.TYPO3.Backend.ContentContainer.setMask();

			Ext.Ajax.request({
				url: actionURL,
				success: function(result, request) {
					if(GridElementsDD.baseConf.doReloadsAfterDrops) {
						// reload page to verify/show updates
						locationSplit = self.location.href.split('#');
						self.location.href = locationSplit[0] + '#ce' + top.targetUID;
						self.location.reload(true);
					}else{
						// after the operation has finished, we simply hide the spinner
						top.TYPO3.Backend.ContentContainer.removeMask();
					}
				},
				failure: function(result, request) {
					if(GridElementsDD.baseConf.doReloadsAfterDrops) {
						// reload page to verify/show updates
						locationSplit = self.location.href.split('#');
						self.location.href = locationSplit[0] + '#ce' + top.targetUID;
						self.location.reload(true);
					}else{
						// TODO: handle error
						top.TYPO3.Backend.ContentContainer.removeMask();
					}
				}
			});
		},

		getPasteLinkForItem: function(itemUID, isReference) {
			if(typeof isReference === 'undefined') {
				isReference = 0;
			}

			// use URL template and replace UID field
			return top.UrlTpl.replace('DD_TARGET_UID', itemUID) +
				(isReference ? '&reference=1' : '') +
				'&redirect=' +
				top.rawurlencode(top.content.list_frame.document.location.pathname + top.content.list_frame.document.location.search);
		}

	};
}();

/*
 * drag-and-drop library for content elements
 * requires ExtJS
 * 
 * - FEATURE: reload-less DnD: compare page lastchange to current page "age" on ajax (pageRenderTime inserted by onReady injector)
 */
GridElementsListView = function() {

	return {
		elExpandCollapse: function(id, sortField, level) {
			var el = Ext.get(Ext.query("a[rel='" + id + "']>span").first());

			if (el.hasClass('t3-icon-pagetree-collapse')) {
				el.removeClass('t3-icon-pagetree-collapse'); //.addClass('t3-icon-pagetree-expand');
				GridElementsListView.addSpinner(el);

				var idParam = id.split(':');
				var sorting = sortField.split(':');
				Ext.Ajax.request({
					url: 'ajax.php',
					params: {
						ajaxID: 'tx_gridelements::controller',
						cmd: 'getListRows',
						table: idParam[0],
						uid: idParam[1],
						level: level,
						sortField: sorting[0],
						sortRev: sorting[1]
					},
					timeout: 10000,
					success: function(req){
						GridElementsListView.ajaxSuccess(el, req);
					},
					failure: function() {
						GridElementsListView.ajaxFailure(el);
					}
				});

			} else {
				el.removeClass('t3-icon-pagetree-expand').addClass('t3-icon-actions').addClass('t3-icon-pagetree-collapse');
				GridElementsListView.removeSpinner(el);

				var tr =  Ext.get(el.findParent('tr'));
				tr = tr.next();
				var forBrealk = false;
				for (var i=0; i <= 100; i++) {
					var trNext = tr.next();
					if (tr.hasClass('tr-' + el.id)) {
						forBrealk = true;
					}
					tr.remove();

					if (forBrealk) {
						break
					} else {
						tr = trNext;
					}
				}
			}
		},

		ajaxSuccess: function(el, req) {
			GridElementsListView.removeSpinner(el)
			el.removeClass('t3-icon-pagetree-collapse').addClass('t3-icon-pagetree-expand');
			if (req.responseText) {
				htmlRows = Ext.util.JSON.decode(req.responseText)
			}

			var tr =  Ext.get(el.findParent('tr'));
			tr.insertHtml('afterEnd','<tr class="hidden tr-' + el.id + '"><td></td></tr>');
			htmlRows.list.reverse().each(function(el) {
				var newTr = tr.insertHtml('afterEnd',el);
			})
		},

		ajaxFailure: function(id) {
			alert('ajaxFailure');
		},

		addSpinner: function(el) {
			el.removeClass('t3-icon-actions').addClass('spinner');
		},

		removeSpinner: function(el) {
			el.addClass('t3-icon-actions').removeClass('spinner');
		}

}
}();