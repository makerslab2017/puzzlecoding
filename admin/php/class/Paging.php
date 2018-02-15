<?php 
namespace pagePHPclass;
class Paging {
	public function printPage ($block, $wholecounts, $showcounts) {
		// 		global $ShowList;
		$arr_browser = array ("iPhone","iPad","iPod","Linux","IEMobile","Mobile","lgtelecom","PPC");
		$arr_browser_count= count($arr_browser);
		$isMobile= false;
		$subprint= $block;
		for($i = 0 ; $i < $arr_browser_count ; $i++) {
			if(strpos($_SERVER['HTTP_USER_AGENT'],$arr_browser[$i]) == true){
				$isMobile= true;
				$subprint= $arr_browser[$i]=== 'iPad' ? 20 : 10;
				break;
			}
		}

		$showcnt= $showcounts;
		$wholePgCnt= ceil($wholecounts/$showcnt);
		// 		$wholePgCnt= ceil($ShowList->wholecount[0]/$showcnt);
		$blockcount= ceil($wholePgCnt/$block);
		$prevtag= "<div id='leftsub'>
					<div id='prev' class='move'>
						<svg class='arrow'>
							<polyline class='arrowpoly' points='11,3 3,9 11,15 '/>
						</svg>
					</div>
					<div class='end'>1</div>
					<div class='now' title='now-page'>...</div>
				</div>";
		$nexttag= "<div id='rightsub'>
		<div class='now' title='now-page'>...</div>
		<div class='end'>{$wholePgCnt}</div>
		<div id='next' class='move'>
		<svg class='arrow'>
		<polyline class='arrowpoly' points='3,3 11,9 3,15 '/>
		</svg>
		</div>
		</div>";
		$divtag[0]= "<div id='page'>".( $wholePgCnt > $subprint ? $prevtag : null).
		"<div id=\"page-area\"><ul id=\"page-part\" wholepage={$wholePgCnt} blockcount={$blockcount}>";
		$blocktag[0]= "<li class=\"page-block";
		$blocktag[1]= "\" blocknum=";
		$spantag[0]= "<span class=\"";
		$spantag[1]= "</span>";
		$blocktag[2]= "</li>";
		$blocktag[3]= "</div>";
		$divtag[1]= "</ul></div>";

		echo $divtag[0];
		for ( $i=1;$i<=$wholePgCnt;$i++ ) {
			if($i%$block===1) {
				echo $blocktag[0].($i===1?' selected':null).$blocktag[1].(($i-($i%$block))/$block+1).'>';
			}
			echo $spantag[0].$i.($i===1?' selected':null).'">'.$i.$spantag[1];
			if($i%$block===0 || $i==$wholePgCnt) echo $blocktag[2];
		}
		echo $divtag[1].( $wholePgCnt > $subprint ? $nexttag : null ).$blocktag[3];
	}
}
?>