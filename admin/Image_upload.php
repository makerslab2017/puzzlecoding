<?php 
class UploadImg {
	
	public function run () {
// 		require_once "{$_SERVER['DOCUMENT_ROOT']}/Shinhan-Trading/PHPclass/autoload/autoload.php";
// 		$connect= new \PHPconnect\connect();
// 		$connect->connectDB();
// 		$this->conn= $connect->con;
		
// 		if(isset($_COOKIE['id'])) echo $_COOKIE['id'];
// 		echo '<pre>';
// 		var_dump($_FILES);
// 		var_dump($_POST);

		$error = $_FILES['file']['error'][0];
		// 오류 확인
		if( $error != UPLOAD_ERR_OK ) {
			switch( $error ) {
				case UPLOAD_ERR_INI_SIZE:
				case UPLOAD_ERR_FORM_SIZE:
					echo "파일이 너무 큽니다. ($error)";
					break;
				case UPLOAD_ERR_NO_FILE:
					echo "파일이 첨부되지 않았습니다. ($error)";
					break;
				default:
					echo "파일이 제대로 업로드되지 않았습니다. ($error)";
			}
			exit;
		}
		
		if (isset($_POST['thumbLen'])) $thumbLen= $_POST['thumbLen'];
		$folders= array_unique($_POST['foldername']);
		if(isset($_FILES['file'])){
			$uploaddirUser= "{$_SERVER['DOCUMENT_ROOT']}/";
			foreach( $folders as $val ) {
				$uploaddir= "$val/";
				if(!is_dir($uploaddir)){
					mkdir($uploaddir,0775,true);
				}
				$this-> delFile($uploaddir);
			}
			$file_ary = $this-> reArrayFiles($_FILES['file'],$_POST['foldername']);
			$filename; $ext;
			$i=0;
			$width; $height; $ratio;
			foreach($file_ary as $val) {
				$ext= explode('.',$val['name'])[1];
				$filename= isset($_POST['staticName']) ? "{$_POST['staticName']}.jpg" : $val['name'];
				$new_img= "{$val['foldername']}/{$i}_{$filename}";
				$org= $val['tmp_name'];
				
// 				file_put_contents("{$uploaddirUser}{$val['foldername']}/{$val['name']}", file_get_contents($val['tmp_name']));
				if( isset($thumbLen) ) {
					list($width, $height) = getimagesize($org);
					$ratio= $height / $width;
					$thumb = imagecreatetruecolor($thumbLen, $thumbLen*$ratio);
					
					switch($val['type']) {
						case 'image/jpeg':
							$source = imagecreatefromjpeg($org);
							imagecopyresampled($thumb, $source, 0, 0, 0, 0, $thumbLen, $thumbLen*$ratio, $width, $height);
							imagejpeg($thumb, $org, 75);
							move_uploaded_file($org, $new_img);
							break;
						case 'image/png':
							imagealphablending($thumb, FALSE);
							imagesavealpha($thumb, TRUE);
							$source = imagecreatefrompng($org);
							imagecopyresampled($thumb, $source, 0, 0, 0, 0, $thumbLen, $thumbLen*$ratio, $width, $height);
							imagepng($thumb, $org, 9);
							move_uploaded_file($org, $new_img);
							break;
						case 'image/gif':
							$source = imagecreatefromgif($org);
// 							imagecopyresampled($thumb, $source, 0, 0, 0, 0, $thumbLen, $thumbLen*$ratio, $width, $height);
// 							$background = imagecolorallocate($thumb, 0, 0, 0);
// 							imagecolortransparent($thumb, $background);
// 							imagegif($thumb, $org);
							move_uploaded_file($org, $new_img);
					}
				}
				$i++;
			}
		}
	}
	
	private function reArrayFiles(&$file_post,&$add_post) {
		$file_ary= [];
		$file_count = count($file_post['name']);
		for ($i=0; $i<$file_count; $i++) {
			foreach ($file_post as $key=>$val) {
				$file_ary[$i][$key] = $file_post[$key][$i];
			}
			foreach ($add_post as $key=>$val) {
				$file_ary[$i]['foldername'] = $add_post[$i];
			}
		}
		return $file_ary;
	}
	
	private function delFile ($directory) {
		$handle = opendir($directory); // 절대경로
		while ($file = readdir($handle)) {
			@unlink($directory.$file);
		}
		closedir($handle);
	}
}
$UploadImg= new UploadImg;
$UploadImg-> run();
?>