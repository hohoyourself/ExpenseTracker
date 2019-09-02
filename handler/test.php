<?php
echo getPrevMonth(201901);

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