<?php
namespace PHPconnectDB;

class _connect{
	public $db_host,$db_user,$db_password,$db_name,$con;
	
	function connectDB(){
		$this->db_host = "localhost";
		$this->db_user = "root";
		$this->db_password = "0109";
		$this->db_name = "kjdns";
		$this->con = mysqli_connect($this->db_host, $this->db_user, $this->db_password, $this->db_name); // 데이터베이스 접속

		if ($this->con->connect_errno) { die('Connection Error : '.$con->connect_error); } // 오류가 있으면 오류 메세지 출력
	}
}
?>