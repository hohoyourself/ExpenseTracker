<?php
error_reporting(0);
require_once('./DB.php');

$catsList = ["meal","gro","trans","leis","shop","util","app","admin","misc"];

$con = start_con();
$month = (int)$_GET['month'];
if (!$month) exit();
$sql = "SELECT * FROM avaMonth WHERE month = $month;";
$result = mysqli_query($con,$sql);
if (mysqli_num_rows($result) == 0){
    // create new month table
    $sql = "CREATE TABLE entry$month LIKE entry;";
    mysqli_query($con,$sql);
    $sql = "INSERT INTO avaMonth VALUES ($month);";
    mysqli_query($con,$sql);
}
end_con($con);

switch ($_GET['request']) {
    case 'amount':
        echo json_encode(getAmount());
        break;
    
    case 'add':
        echo json_encode(addEntry());
        break;

    case 'monthDetail':
        echo json_encode(getMonthDetail());
        break;

    case 'history':
        echo json_encode(getHistory());
        break;

    case 'recent':
        echo json_encode(getRecent());
        break;

    case 'catEntry':
        echo json_encode(getCatEntry());
        break;
    
    case 'update':
        echo json_encode(updateEntry());
        break;

    case 'delete':
        echo json_encode(deleteEntry());
        break;

    default:
        break;
}

function addEntry(){
    global $month;

    $con = start_con();
    $amount = (float)urldecode($_GET['amount']);
    $comment = escapeAndQuote($con,urldecode($_GET['comment']));
    $cat = escapeAndQuote($con,$_GET['cat']);
    $day = (int)$_GET['day'];
    $sql = "INSERT INTO entry$month (day,cat,comment,amount) VALUES ($day,$cat,$comment,$amount);";
    mysqli_query($con,$sql);

    $sql = "SELECT SUM(amount) AS Total FROM entry$month;";
    $result = mysqli_query($con,$sql);
    $row = mysqli_fetch_assoc($result);

    end_con($con);
    return [$row['Total'],$month];
}

function updateEntry(){
    global $month;

    $con = start_con();
    $amount = (float)urldecode($_GET['amount']);
    $comment = escapeAndQuote($con,urldecode($_GET['comment']));
    $cat = escapeAndQuote($con,$_GET['cat']);
    $day = (int)$_GET['day'];
    $id = (int)$_GET['id'];
    $orgMonth = (int)$_GET['orgMonth'];
    if ($month == $orgMonth){
        $sql = "UPDATE entry$month SET cat = $cat, comment = $comment, amount = $amount, day = $day WHERE id = $id";
        mysqli_query($con,$sql);  
    }
    else{
        $sql = "INSERT INTO entry$month (day,cat,comment,amount) VALUES ($day,$cat,$comment,$amount);";
        mysqli_query($con,$sql);
        $sql = "DELETE FROM entry$orgMonth WHERE id = $id;";
        mysqli_query($con,$sql);
    }
    

    end_con($con);
    return [];
}

function deleteEntry(){
    global $month;

    $con = start_con();
    
    $id = (int)$_GET['id'];
    $sql = "DELETE FROM entry$month WHERE id = $id;";
    mysqli_query($con,$sql);

    end_con($con);
    return [];
}

function getAmount(){
    global $month;

    $con = start_con();
    $sql = "SELECT SUM(amount) AS Total FROM entry$month;";
    $result = mysqli_query($con,$sql);
    $row = mysqli_fetch_assoc($result);

    end_con($con);
    return [$row['Total']];
}

function getRecent(){
    global $month;
    $final = [];

    $con = start_con();
    $sql = "SELECT * FROM entry$month ORDER BY day DESC LIMIT 5;";
    $result = mysqli_query($con,$sql);
    while($row = mysqli_fetch_assoc($result)){
        $final[] = $row;
    }

    end_con($con);
    return $final;
}

function getCatEntry(){
    global $month;
    $final = [];
    $con = start_con();
    $cat = escapeAndQuote($con,$_GET['cat']);
    $sql = "SELECT * FROM entry$month WHERE cat = $cat ORDER BY day DESC;";
    $result = mysqli_query($con,$sql);
    while($row = mysqli_fetch_assoc($result)){
        $final[] = $row;
    }

    end_con($con);
    return $final;
}

function getHistory(){
    global $catsList;
    $con = start_con();

    $monthList = [];
    $sql = "SELECT * FROM avaMonth ORDER BY month ASC;";
    $result = mysqli_query($con,$sql);
    while($row = mysqli_fetch_assoc($result)){
        $monthList[] = $row['month'];
    }

    $resultList = [];
    foreach ($monthList as $month){
        $total = 0.0;
        $cats = [];
        $sql = "SELECT SUM(amount) AS Total, cat FROM entry$month GROUP BY cat;";
        $result = mysqli_query($con,$sql);
        while($row = mysqli_fetch_assoc($result)){
            $total += $row['Total'];
            $cats[$row['cat']] = $row['Total'];
        }
        foreach ($catsList as $c){
            if (!array_key_exists($c, $cats)) $cats[$c] = 0.0;
        }
        $resultList[$month] = [$total,$cats];
    }

    end_con($con);
    return $resultList;
}

function getMonthDetail(){
    global $month;
    global $catsList;

    $con = start_con();

    $avaMonth = [];
    $sql = "SELECT * FROM avaMonth;";
    $result = mysqli_query($con, $sql);
    while($row = mysqli_fetch_assoc($result)){
        $avaMonth[]=$row['month'];
    }

    $prevMonth = getPrevMonth($month);
    $prevTotal = 0.0;
    $prevCats = [];
    foreach ($catsList as $c){
        $prevCats[$c] = 0.0;
    }

    try{
        $sql = "SELECT SUM(amount) AS Total, cat FROM entry$prevMonth GROUP BY cat;";
        $result = mysqli_query($con,$sql);
        while($row = mysqli_fetch_assoc($result)){
            $prevTotal += $row['Total'];
            $prevCats[$row['cat']] = $row['Total'];
        }
    }
    catch(Exception $e){
    }
    
    $total = 0.0;
    $cats = [];
    
    $sql = "SELECT SUM(amount) AS Total, cat FROM entry$month GROUP BY cat ORDER BY Total DESC;";
    $result = mysqli_query($con,$sql);
    while($row = mysqli_fetch_assoc($result)){
        $total += $row['Total'];
        $cats[$row['cat']] = $row['Total'];
    }

    foreach ($catsList as $c){
        if (!array_key_exists($c, $cats)) $cats[$c] = 0.0;
    }

    end_con($con);
    return [$prevTotal, $prevCats, $total, $cats, $avaMonth];
}

function getPrevMonth($curMonth){
    $m = $curMonth % 100;
    $y = round($curMonth / 100);
    if ($m == 1){
        $m = 12;
        $y -= 1;
    }
    else{
        $m -= 1;
    }
    return $y * 100 + $m;
}