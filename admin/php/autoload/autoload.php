<?php
/**
 * Autoload based on PSR-4
 *
 * 완전한 클래스명으로 인스턴스를 생성하기 위해 Include.
 *
 * 완전한 클래스명 (Fully qualified class name)
 * \<NamespaceName>(\<SubNamespaceNames>)*\<ClassName>
 *
 */

require_once __DIR__ . '/AutoloadClass.php';

$oLoader = new MoveOpn\Vendor\Autoload\AutoloadClass();

$aMap = require __DIR__ . '/AutoloadMap.php';

foreach ($aMap as $sNamespace => $sPath) {
    $oLoader->addNamespace($sNamespace, $sPath);
}

$oLoader->register();