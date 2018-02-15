<?php
/**
 * autoload_classmap.php
 *
 * Autoload 시킬 대상에 대한 맵핑 정보
 *
 * @return array KEY: prefix, VALUE: base directory
 */

// $sBaseDir = dirname(dirname(__DIR__));
$sBaseDir= "{$_SERVER['DOCUMENT_ROOT']}";
$subDir= "/php/class";

return array(
        // Key 는 prefix, Value 는 Base directory
		'\commonPHPclass' => "{$sBaseDir}/{$subDir}",
		'\pagePHPclass' => "{$sBaseDir}/{$subDir}",
		'\PHPconnect' => "{$sBaseDir}/php/connect",
		'\PHPconnectDB' => "{$sBaseDir}/php/connect",
		'\PHPclass' => "{$sBaseDir}/{$subDir}",
		'\adminPHPclass'=> "{$sBaseDir}/admin{$subDir}"
//         '\Moveopn\App' => $sBaseDir.'/app',
//         '\Moveopn\Core' => $sBaseDir.'/core',
//         '\Moveopn\Core\Deprecated' => $sBaseDir.'/core/deprecated',
//         '\Moveopn\Lib' => $sBaseDir.'/lib',
//         '\Moveopn\Vendor' => $sBaseDir.'/vendor',
//         '\Moveopn\Tests' => $sBaseDir.'/tests'

);