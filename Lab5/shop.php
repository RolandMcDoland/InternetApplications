<?php session_start();
$db = new mysqli("localhost", "root", "", "shop_items"); ?>
<!DOCTYPE html>
<html>

<head>
    <title>Basic shop</title>
    <script src="jquery-3.3.1.min.js"></script>
    <script type="text/javascript">
        let inCart = {};
        function addToCart(button) {
            let row = $(button).parent().parent();
            let item = $(row).children('td.item:first-child').text();
			$(button).css("display","none");
            let cart = $('#cart .items');
            let previous = $('#cart .items').html();
			$(cart).html(previous + '<input type="text" name="item[]" value="' + item + '">');
        }
        function clearCart() {
            location.reload();
        }
		function setAlert(msg) {
			alert(msg);
		}
    </script>
</head>

<body>
    <h1>Basic shop</h1>



    <table>

        <?php
        
        if (!$db) { ?>
            <?echo "Cannot connect: " . mysqli_connect_error() .; ?>
            <?php
            exit();
        }
        $allItems = $db->query("select * from items");
        foreach ($allItems as $it) : ?>
            <tr>
                <td class="item"><?= $it['name'] ?></td>
                <td><button class="addtocart" onClick="addToCart(this)">Add to cart</button></td>
            </tr>

        <?php endforeach;
    ?>

    </table>


    <form action="shop.php" id="cart" method="post">
            <div class="button">CART</div>
            <table class="items">

            </table>
            <input type="hidden" name="isPosted" value="1" />
            <input type="submit" class="buy" name="buy" value="Buy">
             

    </form>
	<button class="clear" onClick="clearCart()">Clear</button>
	

    <?php
if (isset($_POST['isPosted'])) {
	$db->begin_transaction();
	$db->query("delete from bought");
    $rowCount = count($_POST['item']);
	$flag=1;
    for ($i = 0; $i < $rowCount; $i++) {
		$stmt = $db->prepare("insert into bought values(?,?);");
		$stmt->bind_param('is', $i, $_POST['item'][$i]);
		if(!$stmt->execute()) {
			echo "<script>setAlert('Error while buying: ' + $db->error);</script>";
			$flag=0;
			$db->rollback();
			break;
		}
    }
	if($flag==1) {
		$db->commit();
		echo "<script>setAlert('Succesfully bought!');</script>";
	}
    session_unset();
    session_destroy();
    header("Refresh:0");
}
?>




</body>

</html>