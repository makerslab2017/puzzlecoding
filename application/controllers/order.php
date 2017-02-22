<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Order extends CI_Controller {

	public function index()
	{
		header("Content-type: application/json");
		$result = array("result"=>array("error"=>"no"));
		if ( is_null($this->session->logged_in) ) {
			$result["result"]["error"] = "unauthorized";
			echo json_encode($result);
			return;
		}
		$userid = $this->session->logged_in;
		$dollid = $this->session->dollid;
		if (empty($dollid)) {
			$str = "select id from DollModel where creatorid='$userid' order by id desc limit 1;";
			//$str = "select id from DollModel limit 1;";
			$q = $this->db->query($str);
			if ($q->num_rows() == 0) {
				$result["result"]["error"] = "no matched";
				echo json_encode($result);
				return;
			}
			$row = $q->row();
			$dollid = $row->id;
		}
		$name = $this->input->post_get("name");
		$tel = $this->input->post_get("tel");
		$zip = $this->input->post_get("zip");
		$address = $this->input->post_get("address");
		$makeup = $this->input->post_get("makeup");		
		$dollid = intval($dollid);

		// find address
		$str = "select * from Address where userid='$userid' and address='$address' and tel='$tel' and nickname='$name';";
		$q = $this->db->query($str);
		if ($q->num_rows() == 0) {
			$str = "insert into Address values (NULL, '$userid', '$address', '$zip', '$tel', CURRENT_TIMESTAMP, '$name');";
			$q = $this->db->query($str);
			$addressid = $this->db->insert_id();			
		} else {
			$row = $q->row();
			$addressid = $row->id;	
		}
		if (empty($addressid)) {
			$result["result"]["error"] = "fail to find your address";
			echo json_encode($result);
			return;
		}

		$str = "insert into OrderTransaction(id, customerid, dollid, addressid, creation_time, makeup) values (NULL, '$userid', $dollid, $addressid, CURRENT_TIMESTAMP, $makeup);";
		$result["result"]["query"] = $str;		
		$q = $this->db->query($str);
		$orderid = $this->db->insert_id();
		$result["result"]["id"] = $orderid;
		echo json_encode($result);
	}

	public function address()
	{
		header("Content-type: application/json");
		$result = array("result"=>array("error"=>"no"));
		if ( is_null($this->session->logged_in) ) {
			$result["result"]["error"] = "unauthorized";
			echo json_encode($result);
			return;
		}
		$userid = $this->session->logged_in;
		$str = "select * from Address where userid='$userid' order by id desc limit 1;";
		$q = $this->db->query($str);
		if ($q->num_rows() == 0) {
			echo json_encode($result);
			return;
		}
		$row = $q->row();
		$result["result"]["address"] = array("address"=>$row->address, "zip"=>$row->zip, "tel"=>$row->tel, "name"=>$row->nickname);
		echo json_encode($result);
	}

	public function status()
	{
		header("Content-type: application/json");
		$result = array("result"=>array("error"=>"no"));
		if ( is_null($this->session->logged_in) ) {
			$result["result"]["error"] = "unauthorized";
			echo json_encode($result);
			return;
		}
		$userid = $this->session->logged_in;
	}

	public function cancel()
	{
		header("Content-type: application/json");
		$result = array("result"=>array("error"=>"no"));
		if ( is_null($this->session->logged_in) ) {
			$result["result"]["error"] = "unauthorized";
			echo json_encode($result);
			return;
		}
		$userid = $this->session->logged_in;
	}

	function _lst()
	{
		$result = array("result"=>array("error"=>"no"));
		if ( is_null($this->session->logged_in) ) {
			$result["result"]["error"] = "unauthorized";
			return $result;
		}
		$userid = $this->session->logged_in;
		$str = "select * from OrderTransaction where customerid='$userid' order by id desc limit 6;";
		$q = $this->db->query($str);
		$orders = array();
		foreach ($q->result() as $row ) {
			$orders[] = array("id"=>$row->id, "dollid"=>$row->dollid, "makeup"=>$row->makeup, "status"=>$row->status, "when"=>$row->creation_time, "addressid"=>$row->addressid);
		}


		foreach ($orders as &$order) {
			$addrid = $order["addressid"];
			$str = "select address from Address where userid='$userid' and id='$addrid';";
			$q = $this->db->query($str);
			$row = $q->row();
			$order["address"] = $row->address;
		}
		$result["result"]["orders"] = $orders;
		return $result;
	}

	public function lst()
	{
		header("Content-type: application/json");
		echo json_encode( $this->_lst() );
	}

	
	public function view()
	{
		if (empty($this->session->type) || $this->session->type != 'administrator') {
			header("Location: /toy_portal/index.php/user/view/order");
			return;
		}
		
		$data = array();
		$str = "select * from OrderTransaction where status!= 'done' order by creation_time asc;";
		$q = $this->db->query($str);
		$orders = array();
		foreach ($q->result() as $row ) {
			$orders[] = array("id"=>$row->id, "dollid"=>$row->dollid, "makeup"=>$row->makeup, "status"=>$row->status, "when"=>$row->creation_time, "addressid"=>$row->addressid, "filename"=>$row->customerid . "-" . $row->dollid . ".obj", "completion_time"=>$row->completion_time);
		}
		foreach ($orders as &$order) {
			$addrid = $order["addressid"];
			$str = "select address, nickname from Address where id='$addrid';";
			$q = $this->db->query($str);
			$row = $q->row();
			$order["nickname"] = $row->nickname;
			$order["address"] = $row->address;
			
		}
		$data['orders'] = $orders;
		$this->load->view('order', $data);		
	}

	public function update()
	{
		$result = array("result"=>array("error"=>"no"));
		if (empty($this->session->type) || $this->session->type != 'administrator') {
			$result["result"]["error"] = "unauthorized";
			echo json_encode($result);
			return;
		}
		$orderid = $this->input->post_get("orderid");
		$status = $this->input->post_get("status");
		$completion_time = $this->input->post_get("completion_time");

		if (empty($orderid) || empty($status)) {
			$result["result"]["error"] = "mismatched parameters";
			echo json_encode($result);
			return;
		}
		$str = "update OrderTransaction set status='$status' ";
		if (!empty($completion_time)) $str .= ", completion_time='$completion_time' ";
		$str .= " where id='$orderid';";
		$this->db->query($str);
		if ($this->db->affected_rows() == 0) {
			echo json_encode($result);
			return;
		}
		echo json_encode($result);
	}
	
}

/* End of file order.php */
/* Location: ./application/controllers/order.php */
