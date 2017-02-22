<!DOCTYPE html>
<html lang="ko">
  <head>
    <!-- Required meta tags always come first -->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/toy_portal/css/bootstrap.min.css">
    <link rel="stylesheet" href="/toy_portal/css/sticky-footer-navbar.css">
    <link rel="stylesheet" href="/toy_portal/css/carousel.css">
    <link rel="stylesheet" href="/toy_portal/css/bootstrap-datepicker.css">
    <style>

    </style>
  </head>
  <body>
    <div class="post-f-t" >
      <div class="collapse" id="navbar-header">
        <div class="container bg-inverse p-a-1">
          <h3> Collapsed content</h3>
        </div>
      </div>      
    </div>

    <div class="container" style="position:relative;">
      <?php $status = array("ordering"=>"작업 대기중", "postprocessing"=>"후가공 시작", "printing"=>"출력중", "delivery"=>"배송중", "done"=>"주문완료");
            $makeup = array("0"=>"없음", "1"=>"요청");
            foreach ($orders as $order) { ?>
      
        <div class="card">
          <div class="card-block" id="order<?php echo $order["id"]; ?>">
            <h3 class="card-title">주문번호: <?php echo $order["id"]; ?></h3>
            <p class="card-text">배송지: <?php echo $order["address"]; ?></p>
            <p class="card-text">수신인: <?php echo $order["nickname"]; ?></p>
            <p class="card-text">작업현황: 
                <?php foreach ($status as $key => $value) {
                      if ($value == $status[$order["status"]])
                        echo "<button type=\"button\" class=\"btn btn-success\" id=\"$key\">$value</button>&nbsp;";
                      else 
                        echo "<button type=\"button\" class=\"btn btn-secondary\" id=\"$key\">$value</button>&nbsp";
                      if ($key == "printing" && $value == $status[$order["status"]]) {
                        if (empty($order["completion_time"])) echo "미정";
                        else {
                          $dt = new DateTime(str_replace("/", "-", $order["completion_time"]));
                          $now = new DateTime();
                          $remaining = $now->diff($dt);
                          if ($remaining->format('%R') === '-')
                            echo $remaining->format('%a일') . " 경과됨&nbsp;";
                          else
                            echo $remaining->format('%a일') . " 소요 예정&nbsp;";
                        }
                      }
                   }
                ?>
                
            </p>
            <p class="card-text">메이크업 요청: <?php echo $makeup[$order["makeup"]]; ?></p>
            <a href="#" class="btn btn-primary">
            <div id="player" style="width:400px;height:400px;border:1px solid #ccc;">
            </div>
            </a>
          </div>
        </div>
      <?php } ?>
            
    </div>

    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4"> 
          </div>
          <div class="col-md-8">
          </div>
        </div>
      </div>
    </footer>

    <!-- jQuery first, then Tether, then Bootstrap JS. -->
    <script src="/toy_portal/js/jquery.min.js"> </script>
    <script src="/toy_portal/js/Three.js"> </script>
    <script src="/toy_portal/js/tether.min.js"> </script>
    <script src="/toy_portal/js/bootstrap.min.js"> </script>
    <script src="/toy_portal/js/bootstrap-datepicker.js"> </script>
    <script src="/toy_portal/js/3dmodelviewer.jquery.min.js"> </script>
    <script>
      $(document).ready( function() {
          $(".card-block > .btn").on('click', function(e) {
               e.preventDefault();
               var oid = $(this).parent(".card-block").attr("id").replace("order", "");
               window.location.href = '/toy_portal/index.php/model/mesh/' + oid + '.stl';
               $.post("/toy_portal/index.php/order/update", { orderid: oid, status: "postprocessing" })
               .done(function(data) {
                  $("#order" + oid + " > .card-text").children().removeClass("btn-success").addClass("btn-secondary");
              $(this).removeClass("btn-secondary").addClass("btn-success");
                  $("#order" + oid + " > .card-text > #postprocessing").removeClass("btn-secondary").addClass("btn-success"); 
               });
          });
          $(".card-block > .card-text > .btn").on('click', function(e) {
              e.preventDefault();
              var oid = $(this).parent().parent(".card-block").attr("id").replace("order", "");
              var button_key = $(this).attr("id");
              if (button_key == "printing") {
                  $(this).append("<div id='#datepicker'><div>").datepicker({
                    format: 'yyyy/mm/dd',
                    startDate: '0d',
                    clearBtn: true,
                    todayHighlight: true,
                    autoclose: true
                  }).on("changeDate", function(e) {
                      $.post("/toy_portal/index.php/order/update", { orderid: oid, status: "printing", completion_time: e.format('yyyy/mm/dd') }).done(function(data) { location.reload(); });
                  });
                  return;
              }
              $.post("/toy_portal/index.php/order/update", { orderid: oid, status: button_key })
               .done(function(data) {
                 location.reload();
                  //$("#order" + oid + " > .card-text > .btn").removeClass("btn-success").addClass("btn-secondary");
                  //$("#order" + oid + " > .card-text > #" + button_key ).removeClass("btn-secondary").addClass("btn-success");
               });
          });
          $('#player').threeDeeModelViewer({
              model: { mesh: '/toy_portal/index.php/model/mesh/6.stl'},
              autorotate: true
          });
      });
    </script>
  </body>
</html>
