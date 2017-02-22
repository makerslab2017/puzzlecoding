<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Accessory extends CI_Controller {

	public function index()
	{
		
	}

	public function set()
	{
		$accessories = array("Hair_Blue", "Hair_Bluesum", "Hair_Greensum", "Hair_Pajama", "Hair_Pink", "Hair_Red",
			"Dress_Blue", "Dress_Pink", "Dress_Red", "Dress_SummerBlue", "Dress_Bluesum2", "Dress_Greensum", "Dress_Skyblue", "Dress_Violetsum", "Dress_White", "Dress_Yellowsum", 
			"Shoes_Blue", "Shoes_Pink", "Shoes_Red", 
			"Accessory_Blue_LeftHand", "Accessory_Green_RightHand", "Accessory_Pink_PouchBag", "Accessory_Red_Necklace", "Accessory_Blue_Necklace", "Accessory_Blue2_Necklace", "Accessory_Bluesum_LeftHand", "Accessory_Bluesum_Necklace", "Accessory_Greensum_Necklace", "Accessory_Pajama_LeftHand", "Accessory_Pajama2_LeftHand", "Accessory_Pink_Necklace", "Accessory_Pink2_LeftHand", "Accessory_Pink2_Necklace", "Accessory_Red2_Necklace", "Accessory_Violetsum_RightHand", "Accessory_Violetsum_Necklace", "Accessory_Yellowsum_Necklace",
			"Tiara_Blue2", "Tiara_Greensum", "Tiara_Bluesum", "Tiara_Pink2", "Tiara_Red", "Tiara_Violetsum", "Tiara_Yellowsum");
			
		header("Content-type: application/json");
		$result = array("result"=>array("error"=>"no"));
		if ( is_null($this->session->logged_in) ) {
			$result["result"]["error"] = "unauthorized";
			echo json_encode($result);
			return;
		}
		
		$userid = $this->session->logged_in;		
		$input_accessories = $this->input->post_get("accessories");
		if (empty($input_accessories)) {
			echo json_encode($result);
			return;	
		}
		/* clean up existing accessory info. */
		$str = "delete from WearingAccessory where userid='$userid';";
		$q = $this->db->query($str);

		$items = explode(",", $input_accessories);
		foreach ($items as $item) {
			if (in_array($item, $accessories) == false) continue;

			$str = "insert into WearingAccessory values ('$userid', '$item');";
			$q = $this->db->query($str);
			if ($q == null) $err = $this->db->error();
			if ($this->db->affected_rows() == 0) {
				$result["result"]["error"] = "insertion failure";
				break;
			}
		}
		echo json_encode($result);
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
		$items = array();
		$str = "select name from WearingAccessory where userid='$userid';";
		$q = $this->db->query($str);
		foreach ($q->result() as $row) {
			$items[] = $row->name;
		}
		$result["result"]["accessories"] = implode(",", $items);
		echo json_encode($result);
	}
	
}

/* End of file accessory.php */
/* Location: ./application/controllers/accessory.php */
