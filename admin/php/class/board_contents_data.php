<?php
namespace commonPHPclass;
// use PHPclass\Child\test\TestClass as TestClass;

class board_contents_data
{
	public $table,$showcount,$field,$fieldStr,$fieldprint,$odctrl,$checkbox,$page,$index,
	$query,$result,$conn,$where,$orderby,$order,$like,$whereStr,$count_query,$wholecount;
	
	public function init( $prop ){
		global $conn;
		$this->conn= $conn;
		
		if( !isset($conn) ){
			require_once "{$_SERVER['DOCUMENT_ROOT']}/php/autoload/autoload.php";
			$connect= new \PHPconnectDB\_connect();
			$connect->connectDB();
			$this->conn= $connect->con;
		}
		
		$this->fieldprint= true;
		$this->odctrl= false;
		$this->checkbox= false;
		
		foreach ( $prop as $key => $value ) {
			$this->$key= $value;
		}
		$this->fieldStr= implode(",",$this->field);
		$this->colcount= count($this->field);
		$limitqueryStr='';
		if( isset($this->showcount) ) {
			$this->showpage= isset($this->page) ? ( $this->page - 1 ) * ( $this->showcount ) : 0;
			$limitqueryStr= "LIMIT {$this->showpage} , {$this->showcount}";
		}
		$this->indexkey= isset($this->index) ? array_search($this->index,$this->field) : null;
		
		if ( isset($this->where) && $this->where[1]!=='') {
			$text= substr($this->where[1], 0 , strpos( $this->where[1], '*' ));
			$this->like= strpos( $this->where[1], '*' ) ? "{$text}%" : "%{$this->where[1]}%";
			$this->whereStr= "WHERE {$this->where[0]} LIKE '{$this->like}'";
		}
		$this->search();
		
		$this->query= "SELECT {$this->fieldStr} FROM {$this->table} {$this->whereStr} ORDER BY {$this->orderby} {$this->order} $limitqueryStr";
		$this->field_query= "SHOW FULL COLUMNS FROM {$this->table}";
		$this->count_query= "SELECT COUNT(*) FROM {$this->table} {$this->whereStr}";

		$this->count_result= mysqli_query($this->conn, $this->count_query);
		$this->wholecount= mysqli_fetch_array($this->count_result);
		
	}
	
	public function search () {
		if ( isset($this->search) ) {
			if( isset($this->whereStr) ) {
				$this->whereStr.= " AND {$this->search[0]} LIKE '%{$this->search[1]}%'";
			} else {
				$this->whereStr.= " WHERE {$this->search[0]} LIKE '%{$this->search[1]}%'";
			}
		}
	}
	
	public function totalcount () {
		echo "<div class='totalcount'>Result <span>{$this->wholecount[0]}</span></div>";
	}
	
	public function rows(){
		$this->result= mysqli_query($this->conn,$this->query);
		$this->field_result= mysqli_query($this->conn, $this->field_query);
		
		/* if( $this->checkbox ) 
		{
			$chk0= '<div class="checks etrans b-chk ';
			$chk1= '">
					<input type="checkbox" id="ex_chk';
			$chk2= '">
					<label for="ex_chk';
			$chk3= '"></label>
						</div>';
		}
		
		$tag[0]= '<li class="col ';
		$tag[1]= '" name="';
		$tag[2]='"><span>';
		$tag[3]= '</span>';
		$tag[4]= '</li>'; */
		$this->arrwtag= 
			$this->odctrl ? 
			'<div class="sort-arrow">
				<svg>
					<path d="M 1.5 5 l 5 6 l 6 -6" />
				</svg>
			</div>' :
			'';
		$this->fieldarr= array();
		$this->fieldidx= array();
		$colcount= $this->colcount;
		$fldcnt;
		
		if ( $colcount > 0 ) {
			while ( $row = mysqli_fetch_assoc( $this->field_result ) ) {
				if( in_array($row['Field'], $this->field) ){
					$fldcnt= array_search($row['Field'],$this->field);
					$this->fieldidx[$fldcnt]= $row['Field'];
					$this->fieldarr[$fldcnt]= ($row['Comment']==='') ? $row['Field'] : $row['Comment'];
					// 					if ( $this->fieldprint ) echo $tag[0].$fldcnt.' field'.$fldcnt.$tag[1].$fieldname.$tag[2].$fieldname.$tag[3].$arrwtag.$tag[4];
					// 					echo "<li class='col {$fldcnt} field {$fldcnt}' name='{$fieldname}'><span>{$fieldname}</span>{$arrwtag}</li>";
					// 					$fldcnt++;
				}
			}
		}
// 		if ( $this->fieldprint ) $this->FiledPrinting();



		
		
// 		$this->conn->close();
	}
	public function FiledPrinting () {
		//		Contents Field Print-->
		if ( $this->fieldprint ) {
			echo '<div class="board_field_area">';
			// 			if( $this->checkbox ) echo $chk0.'field'.$chk1.'0'.$chk2.'0'.$chk3;
			if( $this->checkbox ) echo "<div class='checks etrans b-chk field'><input type='checkbox' id='ex_chk 0'><label for='ex_chk 0'></label></div>";
			echo '<ul class="board_field" id="board_field">';
		}
		$colcount= $this->colcount;
		if ( $this->fieldprint ) {
			for ( $i=0; $i<=$colcount-1; $i++ ) {
				echo "<li class='col {$i} field {$i}' name='{$this->fieldarr[$i]}' index='{$this->fieldidx[$i]}'><span>{$this->fieldarr[$i]}</span>{$this->arrwtag}</li>";
			}
		}
		if ( $this->fieldprint ) echo '</ul></div>';
		// 		<--Contents Field Print
	}
	public function DataPrinting () {
		// 		Contents List Print-->
		if ( $this->fieldprint ) echo "<div class='board_list_area'>";
		if ($this->wholecount[0] > 0) {
			$x= $this->result->field_count;
			$c= 0;
			$concnt= $x-1;
			$indexTag;
			while ($row = mysqli_fetch_row($this->result)) {
				$c++;
				if( $this->checkbox )
				// 					echo $chk0.'list'.$chk1.$c.$chk2.$c.$chk3;
					echo "<div class='checks etrans b-chk list'><input type='checkbox' id='ex_chk{$c}'><label for='ex_chk{$c}'></label></div>";
					$indexTag= $this->indexkey !== null ? "data-index='{$row[$this->indexkey]}'" : '';
					echo "<ul class='board_list' id='board_list' $indexTag>";
					for($i=0; $i<=$concnt; $i++){
						// 					echo $tag[0].$i.$tag[1].$fieldarr[$i].$tag[2].$row[$i].$tag[3].$tag[4];
						echo "<li class='col {$i}' name='{$this->fieldarr[$i]}'><span>{$row[$i]}</span></li>";
					}
					echo '</ul>';
					// 				usleep(10000);
			}
		}
		if ( $this->fieldprint )echo '</div>';
		// 		Contents List Print-->
	}
}

class Paging {
	public function printPage ($block, $showcounts) {
		global $ShowList;
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
		$wholePgCnt= ceil($ShowList->wholecount[0]/$showcnt);
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