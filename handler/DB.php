<?php
error_reporting(0);

$username = "expenseTracker";
$pwd = "track spending@Sandbox";

function start_con($usecase='browse'){

    global $username;
    global $pwd;

    $con = mysqli_connect('localhost',$username,$pwd,"ExpenseTracker");
    return $con;
}

function end_con($con){
    mysqli_close($con);
}

function escapeAndQuote($con,$input){
    return "'".mysqli_real_escape_string($con,$input)."'";
}