<?php

require_once __DIR__ . '/router.php';


$loc = '/mosab.store';

$index = $loc . '/';
$customers = $loc . '/customers';
$prodoct = $loc . '/prodoct';
$bills = $loc . '/bills';
$test = $loc . '/test';
$test = $loc . '/login';

get($index, 'views/index.php');

get($customers, 'views/customer.php');
get($bills, 'views/bills.php');
get($prodoct, 'views/prodoct.php');

get($test, 'views/login.php');



any('/404', 'views/404.php');
