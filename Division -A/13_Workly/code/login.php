<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="assets/css/bootstrap.css">

      <script defer src="assets/fontawesome/js/all.min.js"></script>
    <link rel="stylesheet" href="assets/css/app.css">
</head>
<?php
  include("Connectionfile1.php");
  $success = NULL;

  if ($_SERVER["REQUEST_METHOD"] == "POST") 
        {
            if (isset($_POST['login'])) 
            {   
               
                $email = $_POST['email'];
                $password =$_POST['password'];
                  if($email == "$email" && $password == "$password")
                  { 
                    header("Location: employee.html");
                  }
                  else
                  {
                      $sql = "SELECT password FROM customer where email='$email'";
                      $result = $conn->query($sql);
                      $conn->close();
                      if ($result->num_rows > 0) 
                        {
                              $options= mysqli_fetch_all($result, MYSQLI_ASSOC);
                              foreach ($options as $option)
                              {
                                $a = $option['password'];
                              }
                          
                              if($a == $password)
                              {
                                sleep(3);
                                session_start();
                                $_SESSION['ema'] = "$email"; 
                                header("Location:../../Customerside/Dashboard/dashboard.php");
                              }
                              else{
                                ?><script>console.log("erro");</script><?php
                                echo $success = "Password Does Not Match";}
                        }
                        else{ 
                          ?><script>console.log("erro");</script><?php
                          echo $success = "No such Username Found"; 
                        }
                  
                      
                  }
                
                
              }
          }
            ?>
<body>
    <div id="auth">

        <div class="container">
            <div class="row">
                <div class="col-md-5 col-sm-12 mx-auto">
                    <div class="card pt-4">
                        <div class="card-body">

                            <div class="text-center mb-5">
                                <h3>Employee Login</h3>
                            </div>
                            <form action="" method="post">
                                <div class="form-group position-relative has-icon-left">
                                    <label for="username">User id</label>
                                    <div class="position-relative">
                                        <input type="text" class="form-control" id="username" required />
                                        <div class="form-control-icon">
                                            <i class="fa fa-user"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group position-relative has-icon-left">
                                    <div class="clearfix">
                                        <label for="password">Password</label>
                                        <a href="#" class='float-end'>
                                            <small>Forgot password?</small>
                                        </a>
                                    </div>
                                    <div class="position-relative">
                                        <input type="password" class="form-control" id="password" required />
                                        <div class="form-control-icon">
                                            <i class="fa fa-key"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <button class="btn btn-primary float-end ">Login</button>
                                    <p class = "error-success"><?php echo $success?><p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <script src="assets/js/feather-icons/feather.min.js"></script>
    <script src="assets/js/app.js"></script>

    <script src="assets/js/main.js"></script>
</body>

</html>