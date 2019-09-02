import { Page } from "./templates.js";
import ReactDOM from 'react-dom';
import React from'react';
import $ from 'jquery';
globalVar;

$(document).ready(function(){
    ReactDOM.render(<Page />, document.getElementById('pageContainer'))
})