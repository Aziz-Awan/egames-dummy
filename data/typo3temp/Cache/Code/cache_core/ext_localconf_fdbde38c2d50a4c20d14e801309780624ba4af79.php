<?php
/**
 * Compiled ext_localconf.php cache file
 */

global $TYPO3_CONF_VARS, $T3_SERVICES, $T3_VAR;

/**
 * Extension: core
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/core/ext_localconf.php
 */

$_EXTKEY = 'core';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

if (TYPO3_MODE === 'BE' && !(TYPO3_REQUESTTYPE & TYPO3_REQUESTTYPE_INSTALL)) {
	\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance('TYPO3\\CMS\\Extbase\\SignalSlot\\Dispatcher')->connect(
		'TYPO3\\CMS\\Core\\Resource\\ResourceFactory',
		\TYPO3\CMS\Core\Resource\ResourceFactory::SIGNAL_PostProcessStorage,
		'TYPO3\\CMS\\Core\\Resource\\Security\\StoragePermissionsAspect',
		'addUserPermissionsToStorage'
	);
}




/**
 * Extension: cms
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/cms/ext_localconf.php
 */

$_EXTKEY = 'cms';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig('
	options.saveDocView = 1
	options.saveDocNew = 1
	options.saveDocNew.pages = 0
	options.saveDocNew.sys_file = 0
	options.disableDelete.sys_file = 1
	TCAdefaults.tt_content.imagecols = 2
');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
mod.wizards.newContentElement {
	renderMode = tabs
	wizardItems {
		common.header = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common
		common.elements {
			header {
				icon = gfx/c_wiz/regular_header.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_headerOnly_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_headerOnly_description
				tt_content_defValues {
					CType = header
				}
			}
			text {
				icon = gfx/c_wiz/regular_text.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_regularText_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_regularText_description
				tt_content_defValues {
					CType = text
				}
			}
			textpic {
				icon = gfx/c_wiz/text_image_right.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_textImage_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_textImage_description
				tt_content_defValues {
					CType = textpic
					imageorient = 17
				}
			}
			image {
				icon = gfx/c_wiz/images_only.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_imagesOnly_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_imagesOnly_description
				tt_content_defValues {
					CType = image
				}
			}
			bullets {
				icon = gfx/c_wiz/bullet_list.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_bulletList_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_bulletList_description
				tt_content_defValues {
					CType = bullets
				}
			}
			table {
				icon = gfx/c_wiz/table.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_table_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:common_table_description
				tt_content_defValues {
					CType = table
				}
			}

		}
		common.show = header,text,textpic,image,bullets,table

		special.header = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special
		special.elements {
			uploads {
				icon = gfx/c_wiz/filelinks.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_filelinks_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_filelinks_description
				tt_content_defValues {
					CType = uploads
				}
			}
			multimedia {
				icon = gfx/c_wiz/multimedia.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_multimedia_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_multimedia_description
				tt_content_defValues {
					CType = multimedia
				}
			}
			media {
				icon = gfx/c_wiz/multimedia.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_media_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_media_description
				tt_content_defValues {
					CType = media
				}
			}
			menu {
				icon = gfx/c_wiz/sitemap2.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_menus_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_menus_description
				tt_content_defValues {
					CType = menu
					menu_type = 0
				}
			}
			html {
				icon = gfx/c_wiz/html.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_plainHTML_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_plainHTML_description
				tt_content_defValues {
					CType = html
				}
			}
			div {
				icon = gfx/c_wiz/div.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_divider_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_divider_description
				tt_content_defValues {
					CType = div
				}
			}
			shortcut {
				icon = gfx/c_wiz/shortcut.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_shortcut_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:special_shortcut_description
				tt_content_defValues {
					CType = shortcut
				}
			}

		}
		special.show = uploads,media,menu,html,div,shortcut

		forms.header = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:forms
		forms.elements {
			mailform {
				icon = gfx/c_wiz/mailform.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:forms_mail_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:forms_mail_description
				tt_content_defValues {
					CType = mailform
					bodytext (
	# Example content:
	Name: | *name = input,40 | Enter your name here
	Email: | *email=input,40 |
	Address: | address=textarea,40,5 |
	Contact me: | tv=check | 1

	|formtype_mail = submit | Send form!
	|html_enabled=hidden | 1
	|subject=hidden| This is the subject
					)
				}
			}
			search {
				icon = gfx/c_wiz/searchform.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:forms_search_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:forms_search_description
				tt_content_defValues {
					CType = search
				}
			}
		}
		forms.show = mailform,search

		plugins.header = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:plugins
		plugins.elements {
			general {
				icon = gfx/c_wiz/user_defined.gif
				title = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:plugins_general_title
				description = LLL:EXT:cms/layout/locallang_db_new_content_el.xml:plugins_general_description
				tt_content_defValues.CType = list
			}
		}
		plugins.show = *
	}
}

');
$TYPO3_CONF_VARS['SYS']['contentTable'] = 'tt_content';
$TYPO3_CONF_VARS['FE']['eID_include']['tx_cms_showpic'] = 'EXT:cms/tslib/showpic.php';
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['compat_version']['cms'] = array(
	'title' => 'CMS Frontend',
	'version' => 4000000,
	'description' => '<ul>' . '<li><p>The extention simluatestatic has been removed in TYPO3 6.0</p></li>' . '<li><p>CSS Stylesheets and JavaScript are put into an external file by default.</p>' . '<p>Technically, that means that the default value of "config.inlineStyle2TempFile" is now set to "1" and that of "config.removeDefaultJS" to "external"</p></li>' . '</ul>'
);
// Registering hooks for the treelist cache
$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['processDatamapClass'][] = 'EXT:cms/tslib/hooks/class.tx_cms_treelistcacheupdate.php:&TYPO3\\CMS\\Frontend\\Hooks\\TreelistCacheUpdateHooks';
$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['processCmdmapClass'][] = 'EXT:cms/tslib/hooks/class.tx_cms_treelistcacheupdate.php:&TYPO3\\CMS\\Frontend\\Hooks\\TreelistCacheUpdateHooks';
$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['moveRecordClass'][] = 'EXT:cms/tslib/hooks/class.tx_cms_treelistcacheupdate.php:&TYPO3\\CMS\\Frontend\\Hooks\\TreelistCacheUpdateHooks';
if (TYPO3_MODE === 'FE') {
	// Register the core media wizard provider
	\TYPO3\CMS\Frontend\MediaWizard\MediaWizardProviderManager::registerMediaWizardProvider('TYPO3\\CMS\\Frontend\\MediaWizard\\MediaWizardProvider');
	// Register eID provider for ExtDirect for the frontend
	$GLOBALS['TYPO3_CONF_VARS']['FE']['eID_include']['ExtDirect'] = PATH_tslib . 'extdirecteid.php';
}
// Register search keys
$GLOBALS['TYPO3_CONF_VARS']['SYS']['livesearch']['page'] = 'pages';
$GLOBALS['TYPO3_CONF_VARS']['SYS']['livesearch']['content'] = 'tt_content';
// Register hook to show preview info
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tslib/class.tslib_fe.php']['hook_previewInfo']['cms'] = 'EXT:cms/tslib/hooks/class.tx_cms_fehooks.php:TYPO3\\CMS\\Frontend\\Hooks\\FrontendHooks->hook_previewInfo';



/**
 * Extension: lang
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/lang/ext_localconf.php
 */

$_EXTKEY = 'lang';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

if (isset($GLOBALS['TYPO3_CONF_VARS']['SYS']['lang']['cache']['clear_menu']) && $GLOBALS['TYPO3_CONF_VARS']['SYS']['lang']['cache']['clear_menu']) {
	// Register Clear Cache Menu hook
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['additionalBackendItems']['cacheActions']['clearLangCache'] = 'TYPO3\CMS\Lang\ClearLanguageCacheMenuItem';
} else {
	// Clear l10n cache when the user clears all caches
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['clearCachePostProc']['clearLangCache'] = 'TYPO3\CMS\Lang\LanguageCacheClearer->clearCache';
}
// Register Ajax call
$GLOBALS['TYPO3_CONF_VARS']['BE']['AJAX']['lang::clearCache'] = 'TYPO3\CMS\Lang\LanguageCacheClearer->clearCache';



/**
 * Extension: sv
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/sv/ext_localconf.php
 */

$_EXTKEY = 'sv';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
// Register base authentication service
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addService($_EXTKEY, 'auth', 'TYPO3\\CMS\\Sv\\AuthenticationService', array(
	'title' => 'User authentication',
	'description' => 'Authentication with username/password.',
	'subtype' => 'getUserBE,authUserBE,getUserFE,authUserFE,getGroupsFE,processLoginDataBE,processLoginDataFE',
	'available' => TRUE,
	'priority' => 50,
	'quality' => 50,
	'os' => '',
	'exec' => '',
	'className' => 'TYPO3\\CMS\\Sv\\AuthenticationService'
));
// Add hooks to the backend login form
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/index.php']['loginFormHook'][$_EXTKEY] = 'EXT:' . $_EXTKEY . '/class.tx_sv_loginformhook.php:TYPO3\\CMS\\Sv\\LoginFormHook->getLoginFormTag';
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/index.php']['loginScriptHook'][$_EXTKEY] = 'EXT:' . $_EXTKEY . '/class.tx_sv_loginformhook.php:TYPO3\\CMS\\Sv\\LoginFormHook->getLoginScripts';



/**
 * Extension: extensionmanager
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/extensionmanager/ext_localconf.php
 */

$_EXTKEY = 'extensionmanager';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

// Register extension list update task
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['scheduler']['tasks']['TYPO3\\CMS\\Extensionmanager\\Task\\UpdateExtensionListTask'] = array(
	'extension' => $_EXTKEY,
	'title' => 'LLL:EXT:' . $_EXTKEY . '/Resources/Private/Language/locallang.xlf:task.updateExtensionListTask.name',
	'description' => 'LLL:EXT:' . $_EXTKEY . '/Resources/Private/Language/locallang.xlf:task.updateExtensionListTask.description',
	'additionalFields' => '',
);



/**
 * Extension: extbase
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/extbase/ext_localconf.php
 */

$_EXTKEY = 'extbase';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

require_once \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath('extbase') . 'Classes/Mvc/Dispatcher.php';
require_once \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath('extbase') . 'Classes/Utility/ExtensionUtility.php';

if (!is_array($GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['extbase_typo3dbbackend_tablecolumns'])) {
	$GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['extbase_typo3dbbackend_tablecolumns'] = array();
}
if (!is_array($GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['extbase_datamapfactory_datamap'])) {
	$GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['extbase_datamapfactory_datamap'] = array();
}

// We need to set the default implementation for Storage Backend & Query Settings
// the code below is NO PUBLIC API! It's just to make sure that
// Extbase works correctly in the backend if the page tree is empty or no
// template is defined.
/** @var $extbaseObjectContainer \TYPO3\CMS\Extbase\Object\Container\Container */
$extbaseObjectContainer = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance('TYPO3\\CMS\\Extbase\\Object\\Container\\Container');
// Singleton
$extbaseObjectContainer->registerImplementation('TYPO3\CMS\Extbase\Persistence\QueryInterface', 'TYPO3\CMS\Extbase\Persistence\Generic\Query');
$extbaseObjectContainer->registerImplementation('TYPO3\CMS\Extbase\Persistence\QueryResultInterface', 'TYPO3\CMS\Extbase\Persistence\Generic\QueryResult');
$extbaseObjectContainer->registerImplementation('TYPO3\CMS\Extbase\Persistence\PersistenceManagerInterface', 'TYPO3\CMS\Extbase\Persistence\Generic\PersistenceManager');
$extbaseObjectContainer->registerImplementation('TYPO3\\CMS\\Extbase\\Persistence\\Generic\\Storage\\BackendInterface', 'TYPO3\\CMS\\Extbase\\Persistence\\Generic\\Storage\\Typo3DbBackend');
$extbaseObjectContainer->registerImplementation('TYPO3\\CMS\\Extbase\\Persistence\\Generic\\QuerySettingsInterface', 'TYPO3\\CMS\\Extbase\\Persistence\\Generic\\Typo3QuerySettings');
unset($extbaseObjectContainer);
// Register type converters
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\ArrayConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\BooleanConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\DateTimeConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\FloatConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\IntegerConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\ObjectStorageConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\PersistentObjectConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\StringConverter');
// Experimental FAL<->extbase converters
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\FileConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\FileReferenceConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\FolderBasedFileCollectionConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\StaticFileCollectionConverter');
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerTypeConverter('TYPO3\\CMS\\Extbase\\Property\\TypeConverter\\FolderConverter');
// $GLOBALS ['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['processDatamapClass'][] = 'EXT:extbase/Classes/Persistence/Hook/TCEMainValueObjectUpdater.php:tx_Extbase_Persistence_Hook_TCEMainValueObjectUpdater';
if (TYPO3_MODE === 'BE') {
	// registers Extbase at the cli_dispatcher with key "extbase".
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['GLOBAL']['cliKeys']['extbase'] = array(
		'EXT:extbase/Scripts/CommandLineLauncher.php',
		'_CLI_lowlevel'
	);
	// register help command
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['extbase']['commandControllers'][] = 'TYPO3\\CMS\\Extbase\\Command\\HelpCommandController';
}



/**
 * Extension: fluid
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/fluid/ext_localconf.php
 */

$_EXTKEY = 'fluid';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
// Register caches if not already done in localconf.php or a previously loaded extension.
if (!is_array($GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['fluid_template'])) {
	$GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['fluid_template'] = array(
		'backend' => 'TYPO3\\CMS\\Core\\Cache\\Backend\\FileBackend',
		'frontend' => 'TYPO3\\CMS\\Core\\Cache\\Frontend\\PhpFrontend'
	);
}



/**
 * Extension: install
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/install/ext_localconf.php
 */

$_EXTKEY = 'install';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
// TYPO3 6.0 - Update localconf.php to LocalConfiguration.php
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['localConfiguration'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\LocalConfigurationUpdate';
// TYPO3 6.0 - Create page and TypoScript root template (automatically executed in 123-mode)
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['rootTemplate'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\RootTemplateUpdate';
// TYPO3 4.5 - Check the database to be utf-8 compliant
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['charsetDefaults'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\CharsetDefaultsUpdate';
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['changeCompatibilityVersion'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\CompatVersionUpdate';
// manage split includes of css_styled_contents since TYPO3 4.3
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['splitCscToMultipleTemplates'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\CscSplitUpdate';
// remove pagetype "not in menu" since TYPO3 4.2
// as there is an option in every pagetype
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['removeNotInMenuDoktypeConversion'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\NotInMenuUpdate';
// remove pagetype "advanced" since TYPO3 4.2
// this is merged with doctype "standard" with tab view to edit
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['mergeAdvancedDoktypeConversion'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\MergeAdvancedUpdate';
// TYPO3 6.0 - Add new tables for ExtensionManager
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['extensionManagerTables'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\ExtensionManagerTables';
// add new / outsourced system extensions since TYPO3 4.3
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['installSystemExtensions'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\InstallSysExtsUpdate';
// change tt_content.imagecols=0 to 1 for proper display in TCEforms since TYPO3 4.3
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['changeImagecolsValue'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\ImagecolsUpdate';
// register eID script for install tool AJAX calls
$TYPO3_CONF_VARS['FE']['eID_include']['tx_install_ajax'] = 'EXT:install/mod/class.tx_install_ajax.php';
// warn for t3skin installed in Version 4.4
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['checkForT3SkinInstalled'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\T3skinUpdate';
// Version 4.4: warn for set CompressionLevel and warn user to update his .htaccess
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['checkForCompressionLevel'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\CompressionLevelUpdate';
// Version 4.5: migrate workspaces to use custom stages and install the required extensions
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['migrateWorkspaces'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\MigrateWorkspacesUpdate';
// Version 4.5: Removes the ".gif" suffix from entries in sys_language
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['flagsFromSprites'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\FlagsFromSpriteUpdate';
// Version 4.5: Adds excludeable FlexForm fields to Backend group access lists (ACL)
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['addFlexformsToAcl'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\AddFlexFormsToAclUpdate';
// Version 4.5: Split tt_content image_link to newline by comma
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['imagelink'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\ImagelinkUpdate';
// Version 6.0: Migrate files content elements to use File Abstraction Layer
// Migrations of tt_content.image DB fields and captions, alt texts, etc. into sys_file_reference records.
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['sysext_file_init'] = 'TYPO3\\CMS\\Install\\Updates\\InitUpdateWizard';
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['sysext_file_images'] = 'TYPO3\\CMS\\Install\\Updates\\TceformsUpdateWizard';
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['sysext_file_uploads'] = 'TYPO3\\CMS\\Install\\Updates\\TtContentUploadsUpdateWizard';
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['referenceIntegrity'] = 'TYPO3\\CMS\\Install\\Updates\\ReferenceIntegrityUpdateWizard';

$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['sysext_file_filemounts'] = 'TYPO3\\CMS\\Install\\Updates\\FilemountUpdateWizard';
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['sysext_file_rtemagicimages'] = 'TYPO3\\CMS\\Install\\Updates\\RteMagicImagesUpdateWizard';
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['sysext_file_rtefilelinks'] = 'TYPO3\\CMS\\Install\\Updates\\RteFileLinksUpdateWizard';

// Version 4.7: Migrate the flexforms of MediaElement
$TYPO3_CONF_VARS['SC_OPTIONS']['ext/install']['update']['mediaElementFlexform'] = 'TYPO3\\CMS\\Install\\CoreUpdates\\MediaFlexformUpdate';



/**
 * Extension: sys_note
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/sys_note/ext_localconf.php
 */

$_EXTKEY = 'sys_note';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

// Register "switchableControllerActions" manually because it exists no plugin or module for sys_note
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['extbase']['extensions']['SysNote']['modules']['Note']['controllers'] = array(
	'Note' => array(
		'actions' => array('list')
	)
);

// Hook into the list module
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['recordlist/mod1/index.php']['drawFooterHook'][$_EXTKEY] = 'EXT:' . $_EXTKEY . '/Classes/Hook/RecordListHook.php:TYPO3\\CMS\\SysNote\\Hook\\RecordListHook->render';
// Hook into the page module
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/db_layout.php']['drawFooterHook'][$_EXTKEY] = 'EXT:' . $_EXTKEY . '/Classes/Hook/PageHook.php:TYPO3\\CMS\\SysNote\\Hook\\PageHook->render';
// Hook into the info module
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/web_info/class.tx_cms_webinfo.php']['drawFooterHook'][$_EXTKEY] = 'EXT:' . $_EXTKEY . '/Classes/Hook/InfoModuleHook.php:TYPO3\\CMS\\SysNote\\Hook\\InfoModuleHook->render';



/**
 * Extension: lowlevel
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/lowlevel/ext_localconf.php
 */

$_EXTKEY = 'lowlevel';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
if (TYPO3_MODE == 'BE') {
	// Setting up scripts that can be run from the cli_dispatch.phpsh script.
	$TYPO3_CONF_VARS['SC_OPTIONS']['GLOBAL']['cliKeys']['lowlevel_refindex'] = array('EXT:lowlevel/dbint/cli/refindex_cli.php', '_CLI_lowlevel');
	$TYPO3_CONF_VARS['SC_OPTIONS']['GLOBAL']['cliKeys']['lowlevel_cleaner'] = array('EXT:lowlevel/dbint/cli/cleaner_cli.php', '_CLI_lowlevel');
	$TYPO3_CONF_VARS['SC_OPTIONS']['GLOBAL']['cliKeys']['lowlevel_admin'] = array('EXT:lowlevel/admin_cli.php', '_CLI_lowlevel');
	$TYPO3_CONF_VARS['EXTCONF']['lowlevel']['cleanerModules']['missing_files'] = array('EXT:lowlevel/clmods/class.missing_files.php:TYPO3\\CMS\\Lowlevel\\MissingFilesCommand');
	$TYPO3_CONF_VARS['EXTCONF']['lowlevel']['cleanerModules']['missing_relations'] = array('EXT:lowlevel/clmods/class.missing_relations.php:TYPO3\\CMS\\Lowlevel\\MissingRelationsCommand');
	$TYPO3_CONF_VARS['EXTCONF']['lowlevel']['cleanerModules']['double_files'] = array('EXT:lowlevel/clmods/class.double_files.php:TYPO3\\CMS\\Lowlevel\\DoubleFilesCommand');
	$TYPO3_CONF_VARS['EXTCONF']['lowlevel']['cleanerModules']['rte_images'] = array('EXT:lowlevel/clmods/class.rte_images.php:TYPO3\\CMS\\Lowlevel\\RteImagesCommand');
	$TYPO3_CONF_VARS['EXTCONF']['lowlevel']['cleanerModules']['lost_files'] = array('EXT:lowlevel/clmods/class.lost_files.php:TYPO3\\CMS\\Lowlevel\\LostFilesCommand');
	$TYPO3_CONF_VARS['EXTCONF']['lowlevel']['cleanerModules']['orphan_records'] = array('EXT:lowlevel/clmods/class.orphan_records.php:TYPO3\\CMS\\Lowlevel\\OrphanRecordsCommand');
	$TYPO3_CONF_VARS['EXTCONF']['lowlevel']['cleanerModules']['deleted'] = array('EXT:lowlevel/clmods/class.deleted.php:TYPO3\\CMS\\Lowlevel\\DeletedRecordsCommand');
	$TYPO3_CONF_VARS['EXTCONF']['lowlevel']['cleanerModules']['versions'] = array('EXT:lowlevel/clmods/class.versions.php:TYPO3\\CMS\\Lowlevel\\VersionsCommand');
	$TYPO3_CONF_VARS['EXTCONF']['lowlevel']['cleanerModules']['cleanflexform'] = array('EXT:lowlevel/clmods/class.cleanflexform.php:TYPO3\\CMS\\Lowlevel\\CleanFlexformCommand');
	$TYPO3_CONF_VARS['EXTCONF']['lowlevel']['cleanerModules']['syslog'] = array('EXT:lowlevel/clmods/class.syslog.php:TYPO3\\CMS\\Lowlevel\\SyslogCommand');
}



/**
 * Extension: beuser
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/beuser/ext_localconf.php
 */

$_EXTKEY = 'beuser';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_userauth.php']['logoff_pre_processing'][] = 'TYPO3\\CMS\\Beuser\\Hook\\SwitchBackUserHook->switchBack';



/**
 * Extension: css_styled_content
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/css_styled_content/ext_localconf.php
 */

$_EXTKEY = 'css_styled_content';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
// unserializing the configuration so we can use it here:
$_EXTCONF = unserialize($_EXTCONF);
if ($_EXTCONF['setPageTSconfig'] || !$_EXTCONF) {
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('<INCLUDE_TYPOSCRIPT: source="FILE:EXT:css_styled_content/pageTSconfig.txt">');
}
if ($_EXTCONF['removePositionTypes'] || !$_EXTCONF) {
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
		TCEFORM.tt_content.imageorient.types.image.removeItems = 8,9,10,17,18,25,26
	');
}
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['compat_version']['tx_cssstyledcontent_accessibility'] = array(
	'title' => 'CSS Styled Content: Accessibility improvements',
	'version' => 3009000,
	'description' => '<p>The rendering of the following elements will change:
				<ul><li><strong>tt_content.menu</strong> (used f.e. for sitemaps): Instead of div-tags, lists are used now.</li>
				<li><strong>tt_content.mailform</strong>: Mailforms do not use tables anymore, instead, they use the div-tag. Besides that, mailforms are accessible now.</li>
				<li><strong>The p-tag</strong> has been removed from all table cells.</li>
				<li><strong>CSS based "image" and "text with image"</strong><br />As the extension cron_cssstyledimgtext has been merged into the core, rendering of the content elements "image" and "text with image" has been changed to be CSS instead of table based. Read the <a href="http://wiki.typo3.org/index.php/TYPO3_4.0" target="_blank">4.0 release notes</a> for further information.</li></ul>',
	'description_acknowledge' => 'You will have to update your stylesheets to comply with these changes.'
);
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['compat_version']['tx_cssstyledcontent_pagetargets'] = array(
	'title' => 'CSS Styled Content: Default targets for non-frame pages',
	'version' => 4002000,
	'description' => '<p>The default page target is empty (so no target is generated). If you use frames, you have to set target to "page" in Constants.</p>'
);
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['compat_version']['tx_cssstyledcontent_menuhtmlspecialchars'] = array(
	'title' => 'CSS Styled Content: htmlspecialchars in menu content elements',
	'version' => 4003000,
	'description' => '<p>Page titles will get htmlspecialchar\'ed when rendered in "Sitemap/menu" content elements, to avoid generating invalid XHTML.</p>'
);
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['compat_version']['tx_cssstyledcontent_clearerdivsafterintexttextpicelements'] = array(
	'title' => 'CSS Styled Content: clear divs, changed row space, corrected margins',
	'version' => 4004000,
	'description' => '<ul><li>Clear divs will be generated by default for in-text right or left positioned textpic elements.</li><li>The default row space changes to 10px, to be in line with col space and text margin.</li><li>Rendering bugs with wrong margins were fixed (Default CSS changed).</li></ul>'
);
// Register ourselves as "content rendering template" (providing the hooks of "static template 43" = content (default) )
$GLOBALS['TYPO3_CONF_VARS']['FE']['contentRenderingTemplates'] = array(
	'cssstyledcontent/static/',
	'cssstyledcontent/static/v6.0/',
	'cssstyledcontent/static/v4.7/',
	'cssstyledcontent/static/v4.6/',
	'cssstyledcontent/static/v4.5/',
	'cssstyledcontent/static/v4.4/',
	'cssstyledcontent/static/v4.3/',
	'cssstyledcontent/static/v4.2/',
	'cssstyledcontent/static/v3.9/',
	'cssstyledcontent/static/v3.8/'
);



/**
 * Extension: t3skin
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/t3skin/ext_localconf.php
 */

$_EXTKEY = 't3skin';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
	RTE.default.skin = EXT:' . $_EXTKEY . '/rtehtmlarea/htmlarea.css
	RTE.default.FE.skin = EXT:' . $_EXTKEY . '/rtehtmlarea/htmlarea.css
');



/**
 * Extension: t3editor
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/t3editor/ext_localconf.php
 */

$_EXTKEY = 't3editor';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
if (TYPO3_MODE == 'BE') {
	// Register hooks for tstemplate module
	$TYPO3_CONF_VARS['SC_OPTIONS']['typo3/template.php']['preStartPageHook'][] = 'EXT:t3editor/Classes/class.tx_t3editor_hooks_tstemplateinfo.php:&TYPO3\\CMS\\T3Editor\\Hook\\TypoScriptTemplateInfoHook->preStartPageHook';
	$TYPO3_CONF_VARS['SC_OPTIONS']['ext/tstemplate_info/class.tx_tstemplateinfo.php']['postOutputProcessingHook'][] = 'EXT:t3editor/Classes/class.tx_t3editor_hooks_tstemplateinfo.php:&TYPO3\\CMS\\T3Editor\\Hook\\TypoScriptTemplateInfoHook->postOutputProcessingHook';
	$TYPO3_CONF_VARS['SC_OPTIONS']['ext/t3editor/classes/class.tx_t3editor.php']['ajaxSaveCode']['tx_tstemplateinfo'] = 'EXT:t3editor/Classes/class.tx_t3editor_hooks_tstemplateinfo.php:&TYPO3\\CMS\\T3Editor\\Hook\\TypoScriptTemplateInfoHook->save';
	$TYPO3_CONF_VARS['SC_OPTIONS']['ext/t3editor/classes/class.tx_t3editor.php']['ajaxSaveCode']['file_edit'] = 'EXT:t3editor/Classes/class.tx_t3editor_hooks_fileedit.php:&TYPO3\\CMS\\T3Editor\\Hook\\FileEditHook->save';
	$TYPO3_CONF_VARS['SC_OPTIONS']['typo3/template.php']['preStartPageHook'][] = 'EXT:t3editor/Classes/class.tx_t3editor_hooks_fileedit.php:&TYPO3\\CMS\\T3Editor\\Hook\\FileEditHook->preStartPageHook';
	$TYPO3_CONF_VARS['SC_OPTIONS']['typo3/file_edit.php']['preOutputProcessingHook'][] = 'EXT:t3editor/Classes/class.tx_t3editor_hooks_fileedit.php:&TYPO3\\CMS\\T3Editor\\Hook\\FileEditHook->preOutputProcessingHook';
	$TYPO3_CONF_VARS['SC_OPTIONS']['typo3/file_edit.php']['postOutputProcessingHook'][] = 'EXT:t3editor/Classes/class.tx_t3editor_hooks_fileedit.php:&TYPO3\\CMS\\T3Editor\\Hook\\FileEditHook->postOutputProcessingHook';
}



/**
 * Extension: reports
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/reports/ext_localconf.php
 */

$_EXTKEY = 'reports';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['scheduler']['tasks']['TYPO3\\CMS\\Reports\\Task\\SystemStatusUpdateTask'] = array(
	'extension' => $_EXTKEY,
	'title' => 'LLL:EXT:' . $_EXTKEY . '/reports/locallang.xml:status_updateTaskTitle',
	'description' => 'LLL:EXT:' . $_EXTKEY . '/reports/locallang.xml:status_updateTaskDescription',
	'additionalFields' => 'TYPO3\\CMS\\Reports\\Task\\SystemStatusUpdateTaskNotificationEmailField'
);
$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_befunc.php']['displayWarningMessages']['tx_reports_WarningMessagePostProcessor'] = 'EXT:reports/reports/status/class.tx_reports_reports_status_warningmessagepostprocessor.php:TYPO3\\CMS\\Reports\\Report\\Status\\WarningMessagePostProcessor';



/**
 * Extension: felogin
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/felogin/ext_localconf.php
 */

$_EXTKEY = 'felogin';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
//replace old Login
$pluginContent = trim('
plugin.tx_felogin_pi1 = USER_INT
plugin.tx_felogin_pi1 {
  includeLibs = EXT:felogin/pi1/class.tx_felogin_pi1.php
  userFunc = tx_felogin_pi1->main
}
');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScript($_EXTKEY, 'setup', '
# Setting ' . $_EXTKEY . ' plugin TypoScript
' . $pluginContent);
$addLine = '
tt_content.login = COA
tt_content.login {
	10 = < lib.stdheader
	20 >
	20 = < plugin.tx_felogin_pi1
}
';
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScript($_EXTKEY, 'setup', '# Setting ' . $_EXTKEY . ' plugin TypoScript' . $addLine . '', 43);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
mod.wizards.newContentElement.wizardItems.forms {
	elements {
		login {
			icon = gfx/c_wiz/login_form.gif
			title = LLL:EXT:cms/layout/locallang_db_new_content_el.xlf:forms_login_title
			description = LLL:EXT:cms/layout/locallang_db_new_content_el.xlf:forms_login_description
			tt_content_defValues {
				CType = login
			}
		}
	}
	show :=addToList(login)
}
');

// Page module hook
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem'][$_EXTKEY] =
	'EXT:' . $_EXTKEY . '/Classes/Hooks/CmsLayout.php:TYPO3\CMS\Felogin\Hooks\CmsLayout';




/**
 * Extension: form
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/form/ext_localconf.php
 */

$_EXTKEY = 'form';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
\TYPO3\CMS\Form\Utility\FormUtility::getInstance()->initializeFormObjects()->initializePageTsConfig();



/**
 * Extension: recycler
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/recycler/ext_localconf.php
 */

$_EXTKEY = 'recycler';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
$TYPO3_CONF_VARS['BE']['AJAX']['RecyclerAjaxController::init'] = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/Controller/class.tx_recycler_controller_ajax.php:TYPO3\\CMS\\Recycler\\Controller\\RecyclerAjaxController->init';



/**
 * Extension: saltedpasswords
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/saltedpasswords/ext_localconf.php
 */

$_EXTKEY = 'saltedpasswords';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
// Form evaluation function for fe_users
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tce']['formevals']['tx_saltedpasswords_eval_fe'] = 'EXT:saltedpasswords/Classes/Evaluation/FrontendEvaluator.php';
// Form evaluation function for be_users
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tce']['formevals']['tx_saltedpasswords_eval_be'] = 'EXT:saltedpasswords/Classes/Evaluation/BackendEvaluator.php';
// Hook for processing "forgotPassword" in felogin
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['felogin']['password_changed'][] = 'EXT:saltedpasswords/Classes/class.tx_saltedpasswords_div.php:TYPO3\\CMS\\Saltedpasswords\\Utility\\SaltedPasswordsUtility->feloginForgotPasswordHook';
// Registering all available hashes to factory
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/saltedpasswords']['saltMethods'] = array(
	'TYPO3\\CMS\\Saltedpasswords\\Salt\\Md5Salt' => 'EXT:saltedpasswords/Classes/salts/class.tx_saltedpasswords_salts_md5.php:TYPO3\\CMS\\Saltedpasswords\\Salt\\Md5Salt',
	'TYPO3\\CMS\\Saltedpasswords\\Salt\\BlowfishSalt' => 'EXT:saltedpasswords/Classes/salts/class.tx_saltedpasswords_salts_blowfish.php:TYPO3\\CMS\\Saltedpasswords\\Salt\\BlowfishSalt',
	'TYPO3\\CMS\\Saltedpasswords\\Salt\\PhpassSalt' => 'EXT:saltedpasswords/Classes/salts/class.tx_saltedpasswords_salts_phpass.php:TYPO3\\CMS\\Saltedpasswords\\Salt\\PhpassSalt'
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addService('saltedpasswords', 'auth', 'TYPO3\\CMS\\Saltedpasswords\\SaltedPasswordService', array(
	'title' => 'FE/BE Authentification salted',
	'description' => 'Salting of passwords for Frontend and Backend',
	'subtype' => 'authUserFE,authUserBE',
	'available' => TRUE,
	'priority' => 70,
	// must be higher than tx_sv_auth (50) and rsaauth (60) but lower than OpenID (75)
	'quality' => 70,
	'os' => '',
	'exec' => '',
	'className' => 'TYPO3\\CMS\\Saltedpasswords\\SaltedPasswordService'
));

// Use popup window to refresh login instead of the AJAX relogin:
$TYPO3_CONF_VARS['BE']['showRefreshLoginPopup'] = 1;
// Register bulk update task
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['scheduler']['tasks']['TYPO3\\CMS\\Saltedpasswords\\Task\\BulkUpdateTask'] = array(
	'extension' => $_EXTKEY,
	'title' => 'LLL:EXT:' . $_EXTKEY . '/locallang.xml:ext.saltedpasswords.tasks.bulkupdate.name',
	'description' => 'LLL:EXT:' . $_EXTKEY . '/locallang.xml:ext.saltedpasswords.tasks.bulkupdate.description',
	'additionalFields' => 'TYPO3\\CMS\\Saltedpasswords\\Task\\BulkUpdateFieldProvider'
);



/**
 * Extension: gridelements
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/gridelements/ext_localconf.php
 */

$_EXTKEY = 'gridelements';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig('
	options.saveDocNew.tx_gridelements_backend_layout=1
');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
	mod.wizards.newContentElement.renderMode = tabs
');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPItoST43($_EXTKEY, 'Classes/Plugin/Gridelements.php', '_pi1', 'CType', 1);

// register BE AJAX controller
$TYPO3_CONF_VARS['BE']['AJAX']['tx_gridelements::controller'] =
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/View/AjaxRecordList.php:GridElementsTeam\\Gridelements\\View\\AjaxRecordList->init';

// XCLASS
$GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects']['TYPO3\\CMS\\Recordlist\\RecordList\\DatabaseRecordList'] = array(
	'className' => 'GridElementsTeam\\Gridelements\\Xclass\\DatabaseRecordList',
);


/**
 * Extension: go_backend
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/go_backend/ext_localconf.php
 */

$_EXTKEY = 'go_backend';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined ("TYPO3_MODE")) {
	die ("Access denied.");
}

/*
 * HOOKS
 */
/*
 * render backend view of all content elements
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['go_backend'] = 'GOSIGN\\GoBackend\\Layout\\ContentElementPreview';
/*
 * add configured header files to the backend
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/template.php']['preHeaderRenderHook']['go_backend'] = '&GOSIGN\\GoBackend\\Utility\\AddFilesToBackend->addHeaderFiles';

/*
 * pageTSconfig
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
# set default permissions for new pages
TCEMAIN.permissions {
	# User can do anything (default):
	user = 31

	# Group can do anything (normally "delete" is disabled)
	group = 31

	# Everybody can at least see the page (normally everybody can do nothing)
	everybody = show

	# Default groupId for new sites
	groupid = 1
}

# do not add (Kopie 1) to copied elements
TCEMAIN.table.tt_content {
	disablePrependAtCopy = 1
	disableHideAtCopy = 1
}
');


/*
 * userTSconfig
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig('
# always show thumbnails
setup.override.thumbnailsByDefault = 1

# always show page ids in page tree
options.pageTree.showPageIdWithTitle = 1
');




/**
 * Extension: realurl
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/realurl/ext_localconf.php
 */

$_EXTKEY = 'realurl';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];



$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_tstemplate.php']['linkData-PostProc']['tx_realurl'] = 'EXT:realurl/class.tx_realurl.php:&tx_realurl->encodeSpURL';
$TYPO3_CONF_VARS['SC_OPTIONS']['tslib/class.tslib_content.php']['typoLink_PostProc']['tx_realurl'] = 'EXT:realurl/class.tx_realurl.php:&tx_realurl->encodeSpURL_urlPrepend';
$TYPO3_CONF_VARS['SC_OPTIONS']['tslib/class.tslib_fe.php']['checkAlternativeIdMethods-PostProc']['tx_realurl'] = 'EXT:realurl/class.tx_realurl.php:&tx_realurl->decodeSpURL';
$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['clearPageCacheEval']['tx_realurl'] = 'EXT:realurl/class.tx_realurl.php:&tx_realurl->clearPageCacheMgm';

$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['clearAllCache_additionalTables']['tx_realurl_urldecodecache'] = 'tx_realurl_urldecodecache';
$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['clearAllCache_additionalTables']['tx_realurl_urlencodecache'] = 'tx_realurl_urlencodecache';

$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['processDatamapClass']['tx_realurl'] = 'EXT:realurl/class.tx_realurl_tcemain.php:&tx_realurl_tcemain';
$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['processCmdmapClass']['tx_realurl'] = 'EXT:realurl/class.tx_realurl_tcemain.php:&tx_realurl_tcemain';

$TYPO3_CONF_VARS['FE']['addRootLineFields'] .= ',tx_realurl_pathsegment,tx_realurl_exclude,tx_realurl_pathoverride';
$TYPO3_CONF_VARS['FE']['pageOverlayFields'] .= ',tx_realurl_pathsegment';

// Include configuration file
$_realurl_conf = @unserialize($_EXTCONF);
if (is_array($_realurl_conf)) {
	$_realurl_conf_file = trim($_realurl_conf['configFile']);
	if ($_realurl_conf_file && @file_exists(PATH_site . $_realurl_conf_file)) {
		require_once(PATH_site . $_realurl_conf_file);
	}
	unset($_realurl_conf_file);
}

define('TX_REALURL_AUTOCONF_FILE', 'typo3conf/realurl_autoconf.php');
if (!isset($GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'])) {
	@include_once(PATH_site . TX_REALURL_AUTOCONF_FILE);
}
unset($_realurl_conf);

define('TX_REALURL_SEGTITLEFIELDLIST_DEFAULT', 'tx_realurl_pathsegment,alias,nav_title,title,uid');
define('TX_REALURL_SEGTITLEFIELDLIST_PLO', 'tx_realurl_pathsegment,nav_title,title,uid');

// TYPO3 clean up handler
//$GLOBALS ['TYPO3_CONF_VARS']['EXTCONF']['lowlevel']['cleanerModules'][$_EXTKEY] = array('EXT:' . $_EXTKEY . '/class.tx_realurl_cleanuphandler.php:tx_realurl_cleanuphandler');




/**
 * Extension: static_info_tables
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/static_info_tables/ext_localconf.php
 */

$_EXTKEY = 'static_info_tables';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined ('TYPO3_MODE')) 	die ('Access denied.');

if (!defined ('STATIC_INFO_TABLES_EXTkey')) {
	define('STATIC_INFO_TABLES_EXTkey',$_EXTKEY);
}

if (!defined ('PATH_BE_staticinfotables')) {
	define('PATH_BE_staticinfotables', t3lib_extMgm::extPath(STATIC_INFO_TABLES_EXTkey));
}

if (!defined ('PATH_BE_staticinfotables_rel')) {
	define('PATH_BE_staticinfotables_rel', t3lib_extMgm::extRelPath(STATIC_INFO_TABLES_EXTkey));
}

$_EXTCONF = unserialize($_EXTCONF);    // unserializing the configuration so we can use it here:

if (!isset($GLOBALS['TYPO3_CONF_VARS']['EXTCONF'][STATIC_INFO_TABLES_EXTkey]['charset']))	{
	$GLOBALS['TYPO3_CONF_VARS']['EXTCONF'][STATIC_INFO_TABLES_EXTkey]['charset'] = (isset($_EXTCONF) && is_array($_EXTCONF) && $_EXTCONF['charset'] ? $_EXTCONF['charset'] : 'utf-8');
}

$labelTable = array(
	'static_territories' => array(
		'label_fields' => array(	// possible label fields for different languages. Default as last.
			'tr_name_##', 'tr_name_en',
		),
		'isocode_field' => array(
			'tr_iso_##',
		),
	),
	'static_countries' => array(
		'label_fields' => array(
			'cn_short_##', 'cn_short_en',
		),
		'isocode_field' => array(
			'cn_iso_##',
		),
	),
	'static_country_zones' => array(
		'label_fields' => array(
			'zn_name_##', 'zn_name_local',
		),
		'isocode_field' => array(
			'zn_code', 'zn_country_iso_##',
		),
	),
	'static_languages' => array(
		'label_fields' => array(
			'lg_name_##', 'lg_name_en',
		),
		'isocode_field' => array(
			'lg_iso_##', 'lg_country_iso_##',
		),
	),
	'static_currencies' => array(
		'label_fields' => array(
			'cu_name_##', 'cu_name_en',
		),
		'isocode_field' => array(
			'cu_iso_##',
		),
	),
);

if (t3lib_extMgm::isLoaded('static_info_tables_markets')) {
	$labelTable['static_markets'] = array(
		'label_fields' => array(
			'institution_description',
		),
		'isocode_field' => array(
			'institution_description',
		),
	);
}

if (isset($GLOBALS['TYPO3_CONF_VARS']['EXTCONF'][STATIC_INFO_TABLES_EXTkey]['tables']) && is_array($GLOBALS['TYPO3_CONF_VARS']['EXTCONF'][STATIC_INFO_TABLES_EXTkey]['tables'])) {
	$GLOBALS['TYPO3_CONF_VARS']['EXTCONF'][STATIC_INFO_TABLES_EXTkey]['tables'] = array_merge ($labelTable, $GLOBALS['TYPO3_CONF_VARS']['EXTCONF'][STATIC_INFO_TABLES_EXTkey]['tables']);
} else {
	$GLOBALS['TYPO3_CONF_VARS']['EXTCONF'][STATIC_INFO_TABLES_EXTkey]['tables'] = $labelTable;
}

require_once(t3lib_extMgm::extPath(STATIC_INFO_TABLES_EXTkey).'class.tx_staticinfotables_div.php');



/**
 * Extension: static_info_tables_de
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/static_info_tables_de/ext_localconf.php
 */

$_EXTKEY = 'static_info_tables_de';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined ('TYPO3_MODE')) 	die ('Access denied.');

if (!defined ('STATIC_INFO_TABLES_DE_EXTkey')) {
	define('STATIC_INFO_TABLES_DE_EXTkey', $_EXTKEY);
}

if (!defined ('STATIC_INFO_TABLES_EXTkey')) {
	define('STATIC_INFO_TABLES_EXTkey','static_info_tables');
}

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF'][STATIC_INFO_TABLES_EXTkey]['extendingTCA'][] = $_EXTKEY;




/**
 * Extension: golib_fal
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/golib_fal/ext_localconf.php
 */

$_EXTKEY = 'golib_fal';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined ('TYPO3_MODE')) {
 	die ('Access denied.');
}

$GLOBALS['TYPO3_CONF_VARS']['GOLIB_FAL']['tx_golibfal_imagemask']['defaults'] = array(
	'workspace' => array(
		'maxWidth' => '800',
		'maxHeight' => '800',
	),
);

$GLOBALS['TYPO3_CONF_VARS']['BE']['AJAX']['GosignImageHandling::serializeCroppingData'] = 'GOSIGN\\GolibFal\\ImageHandling\\AjaxRequestHandler->serializeCroppingData';
$GLOBALS['TYPO3_CONF_VARS']['BE']['AJAX']['GosignImageHandling::serializePositioningData'] = 'GOSIGN\\GolibFal\\ImageHandling\\AjaxRequestHandler->serializePositioningData';




/**
 * Extension: go_language
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/go_language/ext_localconf.php
 */

$_EXTKEY = 'go_language';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined ('TYPO3_MODE')) {
 	die ('Access denied.');
}

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPItoST43($_EXTKEY, 'piMenu/class.tx_golanguage_piMenu.php', '_piMenu', '', 1);

/**
 * Hooks
 */
/**
 * @TODO comment
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tslib/class.tslib_fe.php']['checkAlternativeIdMethods-PostProc']['tx_golanguage'] = 'tx_golanguage->setPreferredBrowserLanguage';
/**
 * @TODO comment
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tsparser.php']['preParseFunc']['getLanguageTSConfig'] = 'tx_golanguage->getLanguageTSConfig';
/**
 * @TODO comment
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tstemplate.php']['includeStaticTypoScriptSources']['writeLanguageTSConfig'] = 'tx_golanguage->writeLanguageTSConfig';
/**
 * @TODO comment
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tstemplate.php']['includeStaticTypoScriptSourcesAtEnd']['getTSConfigLinkVars'] = 'tx_golanguage->getTSConfigLinkVars';

/**
 * Read extension config, unserialize it if necessary
 */
if (is_array($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['go_language'])) {
	$extensionConfig = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['go_language'];
} else {
	$extensionConfig = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['go_language']);
	if (!is_array($extensionConfig)) {
		$extensionConfig = array();
	}
}

/**
 * set default language title and flag for backend
 */
if (!empty($extensionConfig)) {
	$defaultPageTSconfig = array(
		'mod.SHARED.defaultLanguageLabel = 0',
		'mod.SHARED.defaultLanguageLabel := getLanguageTSConfig(getLanguageLocalName)',
		'mod.SHARED.defaultLanguageFlag = 0',
		'mod.SHARED.defaultLanguageFlag := getLanguageTSConfig(getLanguageFlag)'
	);
	// The following is neccessary to circumvent the pageTSconfig caching ...
	$tempPageId = \TYPO3\CMS\Core\Utility\GeneralUtility::_GET('id');
	if (TYPO3_MODE === 'BE' && $tempPageId) {
		$defaultPageTSconfig[] = 'mod.SHARED.pageId = ' . $tempPageId;
	}
	unset($tempPageId);

	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(implode("\n", $defaultPageTSconfig) . "\n");
}




/**
 * Extension: go_translation
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/go_translation/ext_localconf.php
 */

$_EXTKEY = 'go_translation';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];



if (!defined ('TYPO3_MODE')) {
	die ('Access denied.');
}

/**
 * hook to override labels via typoscript
 * Maybe there is a better hook anywhere else.
 * is used this, because it should be called before rendering the page,
 * but after initialising the frontend. there are various variables which have to be
 * initialized, e.g. $GLOBALS['TSFE']->sys_page
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tslib/class.tslib_fe.php']['determineId-PostProc']['go_translation'] = 'EXT:go_translation/Classes/Hooks/Frontend.php:GOSIGN\\GoTranslation\\Hooks\\Frontend->main';




/**
 * Extension: go_404handling
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/go_404handling/ext_localconf.php
 */

$_EXTKEY = 'go_404handling';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined ('TYPO3_MODE')) {
 	die ('Access denied.');
}

// Setup our 404 handler as the default page not found handler.
$GLOBALS['TYPO3_CONF_VARS']['FE']['pageNotFound_handling'] = 'USER_FUNCTION:tx_go404handling_404handling->handle404';

// If the cache is cleared, clear our cache too.
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['clearCachePostProc']['go_404handling'] = 'tx_go404handling_cache->clearCachePostProc';




/**
 * Extension: go_tsconfig
 * File: /var/www/egames-dummy1/htdocs/typo3conf/ext/go_tsconfig/ext_localconf.php
 */

$_EXTKEY = 'go_tsconfig';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined ('TYPO3_MODE')) {
	die ('Access denied.');
}

	// in order to do the inheritance logic, we need to add this fields to the rootline
if (!empty($GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'])) {
	$GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'] .= ',';
}
$GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'] .= 'tx_gotsconfig_logo';

$GLOBALS['TYPO3_CONF_VARS']['FE']['pageOverlayFields'] .= ',tx_gotsconfig_logo';

/*
 * userTSconfig
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig('
# add new doktype 21 to page drag area
options.pageTree.doktypesToShowInNewPageDragArea = 1,6,4,7,3,21,254,255,199
');

/*
 * pageTSconfig
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
<INCLUDE_TYPOSCRIPT: source="FILE:EXT:go_tsconfig/page_ts_rootPage.ts">
');



/**
 * Extension: go_cachecontrol
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/go_cachecontrol/ext_localconf.php
 */

$_EXTKEY = 'go_cachecontrol';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined ('TYPO3_MODE')) {
	die ('Access denied.');
}

/**
 * Hooks
 */
/**
 * Clear cache hook
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['clearPageCacheEval']['go_cachecontrol'] = '&tx_gocachecontrol_clearCache->findPages';

/**
 * Clear cache post process hook - write an email if a backend user used the clear cache command
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['clearCachePostProc']['go_cachecontrol'] = '&tx_gocachecontrol_clearCache->writeNotificationEmail';

/**
 * Cache timeout post process hook - check the cache timeout
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tslib/class.tslib_fe.php']['get_cache_timeout']['go_cachecontrol'] = '&tx_gocachecontrol_cacheTimeout->getCacheTimeout';

/**
 * Changes the HTTP caching and cookie headers
 *
 * - Disables proxy/client-side caching - even if the page is cached by Typo3
 *   (sets the HTTP headers to "no-cache", when checked in page properties in BE)
 *
 * - Removes the fe_typo_user cookie in case the page shall be cached
 *   (because proxy servers will not cache pages that send "set-cookie" headers)
 *   (Typo3 has the strange behaviour to ALWAYS set the fe_typo_user cookie. This is not very intelligent)
 *
 * Hook is called after generating the page or after fetching it from the cache
 * (which means every time the page is delivered)
 */
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tslib/class.tslib_fe.php']['contentPostProc-output'][] = '&tx_gocachecontrol_cacheAndCookies->handleHeaders';

/**
 * in order to do the inheritance logic, we need to add this field to the rootline
 */
if (!empty($GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'])) {
	$GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'] .= ',';
}
$GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'] .= 'tx_gocachecontrol_proxycache';




/**
 * Extension: go_seo
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/go_seo/ext_localconf.php
 */

$_EXTKEY = 'go_seo';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined ('TYPO3_MODE')) {
	die ('Access denied.');
}

	// in order to do the inheritance logic, we need to add this fields to the rootline
if (!empty($GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'])) {
	$GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'] .= ',';
}
$GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'] .= 'keywords,description,abstract,tx_goseo_robots,tx_goseo_verification,tx_goseo_prefix,tx_goseo_postfix';

// set pageOverlayFields
$GLOBALS['TYPO3_CONF_VARS']['FE']['pageOverlayFields'] .= ',tx_goseo_prefix,tx_goseo_postfix,tx_goseo_title,tx_goseo_canonical,tx_goseo_metatags';

// Hook for Backend Form
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tceforms.php']['getMainFieldsClass']['go_seo'] = 'GOSIGN\\GoSeo\\Hooks\\FormEngineHooks';

// Hook to add custom meta tags to the page.meta object
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tslib/class.tslib_fe.php']['settingLanguage_postProcess']['go_seo'] = 'GOSIGN\\GoSeo\\Hooks\\TypoScriptFrontendControllerHooks->settingLanguage_postProcess';




/**
 * Extension: caretaker_instance
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/caretaker_instance/ext_localconf.php
 */

$_EXTKEY = 'caretaker_instance';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


/***************************************************************
 * Copyright notice
 *
 * (c) 2009-2011 by n@work GmbH and networkteam GmbH
 *
 * All rights reserved
 *
 * This script is part of the Caretaker project. The Caretaker project
 * is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * The GNU General Public License can be found at
 * http://www.gnu.org/copyleft/gpl.html.
 *
 * This script is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 * This is a file of the caretaker project.
 * http://forge.typo3.org/projects/show/extension-caretaker
 *
 * Project sponsored by:
 * n@work GmbH - http://www.work.de
 * networkteam GmbH - http://www.networkteam.com/
 *
 * $Id$
 */

if (!defined ('TYPO3_MODE')) 	die ('Access denied.');

// Add eID script for caretaker instance frontend service
$TYPO3_CONF_VARS['FE']['eID_include']['tx_caretakerinstance'] = 'EXT:caretaker_instance/eid/eid.tx_caretakerinstance.php';

// Register default caretaker Operations
$operations = array(
	'GetPHPVersion',
	'GetTYPO3Version',
	'GetExtensionVersion',
	'GetExtensionList',
	'GetRecord',
	'GetFilesystemChecksum',
	'MatchPredefinedVariable',
	'CheckPathExists',
);
foreach ($operations as $operationKey) {
	$TYPO3_CONF_VARS['EXTCONF']['caretaker_instance']['operations'][$operationKey] =
		'EXT:caretaker_instance/classes/class.tx_caretakerinstance_Operation_' . $operationKey . '.php:&tx_caretakerinstance_Operation_' . $operationKey;
}

require(t3lib_extMgm::extPath('caretaker_instance').'/ext_conf_include.php');




/**
 * Extension: go_caretaker_instance
 * File: /var/www/egames-dummy1/htdocs/typo3/ext/go_caretaker_instance/ext_localconf.php
 */

$_EXTKEY = 'go_caretaker_instance';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


if (!defined ("TYPO3_MODE")) 	die ("Access denied.");

require_once(t3lib_extMgm::extPath('go_caretaker_instance') . 'ext_conf_include.php');




/**
 * Extension: version
 * File: /var/www/egames-dummy1/htdocs/typo3/sysext/version/ext_localconf.php
 */

$_EXTKEY = 'version';
$_EXTCONF = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY];


/* $Id: ext_localconf.php 7251 2010-04-06 18:57:45Z francois $ */
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
// register the hook to actually do the work within TCEmain
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['processCmdmapClass']['version'] = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath('version', 'class.tx_version_tcemain.php:&TYPO3\\CMS\\Version\\Hook\\DataHandlerHook');
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['moveRecordClass']['version'] = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath('version', 'class.tx_version_tcemain.php:&TYPO3\\CMS\\Version\\Hook\\DataHandlerHook');
// Register hook for overriding the icon status overlay
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_iconworks.php']['overrideIconOverlay']['version'] = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath('version', 'class.tx_version_iconworks.php:&TYPO3\\CMS\\Version\\Hook\\IconUtilityHook');
// Register hook to check for the preview mode in the FE
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tslib/class.tslib_fe.php']['connectToDB']['version_preview'] = 'EXT:version/Classes/Preview.php:TYPO3\\CMS\\Version\\Hook\\PreviewHook->checkForPreview';
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tslib/index_ts.php']['postBeUser']['version_preview'] = 'EXT:version/Classes/Preview.php:TYPO3\\CMS\\Version\\Hook\\PreviewHook->initializePreviewUser';
if (TYPO3_MODE == 'BE') {
	// add default notification options to every page
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSconfig('
	tx_version.workspaces.stageNotificationEmail.subject = LLL:EXT:version/Resources/Private/Language/locallang_emails.xml:subject
	tx_version.workspaces.stageNotificationEmail.message = LLL:EXT:version/Resources/Private/Language/locallang_emails.xml:message
	# tx_version.workspaces.stageNotificationEmail.additionalHeaders =
');
}



#