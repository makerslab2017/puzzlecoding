<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {

	public function index()
	{

	}

	public function view($page)
	{
		$userid = $this->session->logged_in;
		if (!empty($userid)) {
			echo $this->session->type;
			if (empty($this->session->type) || $this->session->type != 'administrator')
			{
				echo "logout and login as an adminstrator";
				return;
			}
			header("Location: /toy_portal/index.php/$page/view");
			return;
		}
		$userid = $this->input->post_get('userid');
		$passwd = $this->input->post_get('passwd');
		if (empty($userid) ||empty($passwd)) {
			$this->load->view('login');
			return;
		}
		$str = "select name, type from UserAccount where userid='$userid' and passwd=sha2('$passwd', 224);";
		$q = $this->db->query($str);
		if ($q->num_rows() > 0) {
			$row = $q->row();
			$this->session->logged_in_name = $row->name;
			$this->session->logged_in = $userid;
			$this->session->type = $row->type;
			header("Location: /toy_portal/index.php/$page/view");
			return;
		}
		$this->load->view('login');
	}

	public function login()
	{
		header("Content-type: application/json");
		$result = array("result"=>array("error"=>"no"));
		$userid = $this->session->logged_in;
		if (!is_null($userid)) {
			$name = $this->session->logged_in_name;
			$result["result"]["msg"] = "$name, already logged in";
			echo json_encode($result);
			return;
		}
		$userid = $this->input->post_get('userid');
		$passwd = $this->input->post_get('passwd');
		if (empty($passwd)) {
			// please check whether the given id is GUID. if so, register it instead
			if (preg_match("/^(\{)?[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}(?(1)\})$/i", $userid)) {
				$str = "select name, activation_flag, type from UserAccount where userid='$userid' and passwd='';";
				$q = $this->db->query($str);
				if ($q->num_rows() > 0) {
					$row = $q->row();
					$this->session->logged_in_name = $row->name;
					$this->session->logged_in = $userid;
					$this->session->type = $row->type;
					if ($row->activation_flag == 0) {
						$str = "update UserAccount set activation_flag=True where userid='$userid' and passwd='';";
						$this->db->query($str);
						if ($this->db->affected_rows() == 0) {
							$result["result"]["error"] = "failure to reactivate your account. Please contact administrator.";
							$result["result"]["msg"] = $row->activation_flag;
							echo json_encode($result);
							return;
						}
						$result["result"]["msg"] = "reactivated as well";
					}
					echo json_encode($result);
					return;
				}
				// not found any. register automatically.
				$str = "insert into UserAccount(userid, passwd, email) values ('$userid', '', 'anonymous@makerslab.com');";
				$this->db->query($str);
				if ($this->db->affected_rows() == 0) {
					$result["result"]["error"] = "failure to register your anonymous account. Please contact administrator.";
					echo json_encode($result);
					return;
				}
				$str = "select name, type from UserAccount where userid='$userid' and passwd='';";
				$q = $this->db->query($str);
				if ($q->num_rows() > 0) {
					$row = $q->row();
					$result["result"]["name"] = $row->name;
					$this->session->logged_in_name = $row->name;
					$this->session->logged_in = $userid;
					$this->session->type = $row->type;
				} else {
					$result["result"]["error"] = "no matched user";
				}
			} else {
				$result["result"]["error"] = "no matched user";
				echo json_encode($result);
				return;
			}
		} else {
			$str = "select name, type from UserAccount where userid='$userid' and passwd=sha2('$passwd', 224);";
			$q = $this->db->query($str);
			if ($q->num_rows() > 0) {
				$row = $q->row();
				$result["result"]["name"] = $row->name;
				$this->session->logged_in_name = $row->name;
				$this->session->logged_in = $userid;
				$this->session->type = $type;
			} else {
				$result["result"]["error"] = "no matched user";
			}
		}
		echo json_encode($result);
	}
	
	public function logout()
	{
		$result = array("result"=>array("error"=>"no"));
		header("Content-type: application/json");
		if ($this->session->logged_in) 
			$this->session->sess_destroy();
		else 
			$result["result"]["error"] = "unrecognized request";
		echo json_encode( $result ); // sample test result
	}
	
	public function register()
	{
		$result = array("result"=>array("error"=>"no"));
		header("Content-type: application/json");
		$userid = $this->session->logged_in;
		if (!is_null($userid)) {
			$name = $this->session->logged_in_name;
			$result["result"]["error"] = "$name . already logged in. Please log out first";
			echo json_encode($result);
			return;
		}

		$unique_id = $this->input->post_get('unique_id');
		$userid = $this->input->post_get('userid');
		$passwd = $this->input->post_get('passwd');
		$email = $this->input->post_get('email');
		$name = $this->input->post_get('name');
		$tel = $this->input->post_get('tel');
		$zip = $this->input->post_get('zip');
		$address = $this->input->post_get('address');
		
		if (empty($unique_id) || empty($userid) || empty($passwd) || empty($email) ) {
			$result["result"]["error"] = "invalid arguments";
			echo json_encode($result);
			return;
		}
		
		// check whether unique_id is registered before and make sure there is no password checking
		$str = "select userid from UserAccount where userid='$unique_id' and passwd='';";
		$q = $this->db->query($str);
		if ($q->num_rows() == 0) {
			// it has no unique_id. this should be a problem. we no longer continue to work at this monment.
			$result["result"]["error"] = "failed due to no previous usage record. $str";
			echo json_encode($result);
			return;
		}
		// this guarantees that the given unique_id was found.
		// if so, we will create a new legal account and associate all tuples associated with the given unique_id with the legal one.

		// first, we need to check whether the new legal account is occupied.
		$str = "select userid from UserAccount where userid='$userid';";
		$q = $this->db->query($str);
		if ($q->num_rows() > 0) {
			// it is already occupied by somebody else.
			$result["result"]["error"] = "given userid is occupied already.";
			echo json_encode($result);
			return;
		}
		// it is not occupied by any.
		$str = "insert into UserAccount values('$userid', sha2('$passwd',224), '$email', '$name', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, True);";
		$q = $this->db->query($str);
		if ($this->db->affected_rows() == 0) {
			$result["result"]["error"] = "can't register. Please contact us.";
			echo json_encode($result);
			return;
		}
		// inserted a new account successfully.

		// insert address info if available
		if (!empty($address)) {
			$str = "insert into Address values(NULL, '$userid', '$address', $zip, '$tel', CURRENT_TIMESTAMP, '$name');";
			$q = $this->db->query($str);
			if ($this->db->affected_rows() == 0) {
				// insertion failure to register address.
				// if so, we won't do any further action against it.
			}
		}

		// insert all related tables accordingly.

		$str = "update Address set userid='$userid' where userid='$unique_id';";
		$q = $this->db->query($str);

		$str = "update DollModel set creatorid='$userid' where creatorid='$unique_id';";
		$q = $this->db->query($str);

		$str = "update OrderTransaction set customerid='$userid' where customerid='$unique_id';";
		$q = $this->db->query($str);

		$str = "update WearingAccessory set userid='$userid' where userid='$unique_id';";
		$q = $this->db->query($str);
		
		echo json_encode($result);
	}
	
	public function unregister()
	{
		header("Content-type: application/json");
		$result = array("result"=>array("error"=>"no"));
		if (empty($this->session->logged_in)) {
			$result["result"]["error"] = "unauthorized";
			echo json_encode($result);
			return;
		}
		$userid = $this->session->logged_in;
		$str = "update UserAccount set activation_flag=False where userid='$userid';";
		$q = $this->db->query($str);
		$this->session->sess_destroy();

		echo json_encode($result);
	}


	public function zipcode($address)
	{
		$ch = curl_init();
		$url = 'http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdSearchAllService';
		$queryParams = '?' . '_wadl&type=xml';
		$queryParams .= '&' . urlencode('ServiceKey') . '=' .  'HApbTO02bgeeq3zpj326JAUPg%2FA58GgMfO8IRPRMteTA1TNyYgcytxRCUxTujcbqx%2Fxjdm4HTzR5tSiHlc6%2FVw%3D%3D'; /*Service Key*/
		$queryParams .= '&' . urlencode('numOfRows') . '=' . urlencode('999'); /*검색건수*/
		$queryParams .= '&' . urlencode('pageNo') . '=' . urlencode('1'); /*페이지 번호*/
		$queryParams .= '&' . urlencode('srchwrd') . '=' . urlencode($address); /*search zipcode */

        echo $url . $queryParams;

		curl_setopt($ch, CURLOPT_URL, $url . $queryParams);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
		$response = curl_exec($ch);
		curl_close($ch);

		var_dump($response);

	}
	
}

/* End of file user.php */
/* Location: ./application/controllers/user.php */
