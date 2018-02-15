<?php 
namespace PHPclass;

class ImgList_data {
	public $code;
	public function init () {
	}
	function run ( $path, $background) {
		$this->path= $path;
		$this->imgarr=[];
		$imgpath= "{$_SERVER['DOCUMENT_ROOT']}/$this->path";
		$img_ok = array("gif", "png", "jpg", "jpeg", "bmp", "GIF", "PNG", "JPG", "JPEG", "BMP");
		$i= 0;
		if (is_dir($imgpath)){
			if ($dh = opendir($imgpath)){
				while (($file = readdir($dh)) !== false){
					$fileInfo= pathinfo($file);
					$fileName= $fileInfo['dirname'];
					$fileExt= isset($fileInfo['extension']) ? $fileInfo['extension'] : null;
					if( $file === '.' || $file === '..' || !in_array($fileExt,$img_ok) ) continue;
					$this->imgarr[]= $file;
				}
				closedir($dh);
			}
		}
		sort($this->imgarr);
		$tag=[];
		$tag[0]= "<li class='img";
		$tag[1]= $background ? "'><div class='image' style=\"background-image: url('/" : "'><img src='/";
		$tag[2]= $background ? "');\" title='" : "' alt='";
		$tag[3]= $background ? "'></div></li>" : "'></li>";
		return $this->loop($tag);
	}
	public function loop($tag) {
		$alt;
		$i= 0;
		foreach ( $this->imgarr as $f ) {
			$f= rawurlencode($f);
// 			$f = iconv('euc-kr', 'utf-8', $f);
// 			$f = iconv('utf-8', 'euc-kr',  $f);
			$alt= $this->multiexplode(array(".","_"),$f)[1];
			echo "{$tag[0]}{$i}{$tag[1]}{$this->path}{$f}{$tag[2]}{$alt}{$tag[3]}";
			$i++;
			// 			echo "<li><img src='/{$path}{$f}'></li>";
			// 			echo "<li style=\"background-image: url('/{$path}{$f}');\"></li>";
		}
	}
	public function multiexplode ($delimiters,$string) {
	    $ready = str_replace($delimiters, $delimiters[0], $string);
	    $launch = explode($delimiters[0], $ready);
	    return  $launch;
	}
}
?>