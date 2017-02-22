<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model extends CI_Controller {

	public function index()
	{
		
	}

	public function lst()
	{

	}

	public function mesh($orderid)
	{
		if (empty($this->session->type) || $this->session->type != 'administrator') return;

		$orderid = str_replace(".stl", "", $orderid);
		$str = "select customerid, dollid from OrderTransaction where id='$orderid';";
		$q = $this->db->query($str);
		if ($q->num_rows() == 0) return;
		$row = $q->row();

		header("Content-type: application/octet-stream");

		$target_dir = realpath(dirname(__FILE__) . "\\..\\..\\uploads");
		$target_file = $target_dir . "\\" . $row->customerid . "-" . $row->dollid . ".stl";
		echo @file_get_contents($target_file);
	}

	public function get()
	{
		header("Content-type: application/json");
		$result = array("result"=>array("error"=>"no"));
		if ( is_null($this->session->logged_in) ) {
			$result["result"]["error"] = "unauthorized";
			echo json_encode($result);
			return;
		}
		$userid = $this->session->logged_in;
		$str = "select * from DollModel where creatorid='$userid' order by id desc limit 1;";
		$q = $this->db->query($str);
		if ($q->num_rows() == 0) {
			$result["result"]["error"] = "no matched";
			echo json_encode($result);
			return;
		}
		$row = $q->row();
		$result["result"]["model"] = array(
			"id" => $row->id,
			"name" => $row->name,
			"Cheek" => floatval($row->cheek),
			"Cheekbone" => floatval($row->cheekbone),
			"Jaw" => floatval($row->jaw),
			"EyePosition" => floatval($row->eyePosition),
			"EyeSpace" => floatval($row->eyeSpace),
			"EyeEdge" => floatval($row->eyeEdge),
			"EyeSize" => floatval($row->eyeSize),
			"EyebrowPosition" => floatval($row->eyebrowPosition),
			"EyebrowAngle" => floatval($row->eyebrowAngle),
			"EyebrowThick" => floatval($row->eyebrowThick),
			"NoseLength" => floatval($row->noseLength),
			"NoseUpWidth" => floatval($row->noseUpWidth),
			"NoseDownWidth" => floatval($row->noseDownWidth),
			"MouthWidth" => floatval($row->mouthWidth),
			"MouthThick" => floatval($row->mouthThick),
			"MouthLineUp" => floatval($row->mouthLineUp)
		);
		echo json_encode($result);
	}

	public function set()
	{
		header("Content-type: application/json");
		$result = array("result"=>array("error"=>"no"));
		if ( is_null($this->session->logged_in) ) {
			$result["result"]["error"] = "unauthorized";
			echo json_encode($result);
			return;
		}
		$name = $this->session->logged_in_name;
		$userid = $this->session->logged_in;
		$cheek = floatval($this->input->post_get("Cheek"));
		$cheekbone = floatval($this->input->post_get("Cheekbone"));
		$jaw = floatval($this->input->post_get("Jaw"));
		$eyePosition = floatval($this->input->post_get("EyePosition"));
		$eyeSpace = floatval($this->input->post_get("EyeSpace"));
		$eyeEdge = floatval($this->input->post_get("EyeEdge"));
		$eyeSize = floatval($this->input->post_get("EyeSize"));
		$eyebrowPosition = floatval($this->input->post_get("EyebrowPosition"));
		$eyebrowAngle = floatval($this->input->post_get("EyebrowAngle"));
		$eyebrowThick = floatval($this->input->post_get("EyebrowThick"));
		$noseLength = floatval($this->input->post_get("NoseLength"));
		$noseUpWidth = floatval($this->input->post_get("NoseUpWidth"));
		$noseDownWidth = floatval($this->input->post_get("NoseDownWidth"));
		$mouthWidth = floatval($this->input->post_get("MouthWidth"));
		$mouthThick = floatval($this->input->post_get("MouthThick"));
		$mouthLineUp = floatval($this->input->post_get("MouthLineUp"));
		

		$str = "insert into DollModel values (NULL, '$name', '$userid', 
		$cheek, $cheekbone, $jaw, $eyePosition, $eyeSpace, $eyeEdge, $eyeSize,
		$eyebrowPosition, $eyebrowAngle, $eyebrowThick,
		$noseLength, $noseUpWidth, $noseDownWidth, $mouthWidth, $mouthThick, $mouthLineUp);";
		$q = $this->db->query($str);
		$id = $this->db->insert_id();
		$this->session->last_dollid = $id;
		$result["result"]["id"] = $id + ", $str";
		echo json_encode($result);
	}


	public function set_file()
	{
		header("Content-type: application/json");
		$result = array("result"=>array("error"=>"no file available or network delivery error"));
		if ( is_null($this->session->logged_in) ) {
			$result["result"]["error"] = "unauthorized call";
			echo json_encode($result);
			return;
		}		
		if ( !isset($_FILES) || !$_FILES["obj"] || $_FILES["obj"]["error"] ) {
			echo json_encode($result);
			return;
		}
		$target_dir = realpath(dirname(__FILE__) . "\\..\\..\\uploads");
		$pathinfo = pathinfo($_FILES["obj"]["tmp_name"]);
		$target_file = $target_dir . "\\" . $this->session->logged_in . "-" . $this->session->last_dollid . ".obj";
		$stl = $target_dir . "\\" . $this->session->logged_in . "-" . $this->session->last_dollid . ".stl";
		move_uploaded_file( $_FILES["obj"]["tmp_name"], $target_file);
		$result["result"]["msg"] = '"C:\\Program Files\\VCG\\MeshLab\\meshlabserver.exe" -i ' . "$target_file  -o " . "$stl"; 
		exec('"C:\\Program Files\\VCG\\MeshLab\\meshlabserver.exe" -i ' . "$target_file  -o " . "$stl");
		$result["result"]["error"] = "no";
		
		echo json_encode($result);
	}
	
	public function delete()
	{

	}
	
	
}

/* End of file model.php */
/* Location: ./application/controllers/model.php */
