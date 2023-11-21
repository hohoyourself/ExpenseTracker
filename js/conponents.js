globalVar;
import React from 'react';
import $ from 'jquery';
import Chart from 'chart.js'
import {currencyFormat, formatToday, formatDay} from './function.js'

Chart.defaults.global.defaultFontFamily = "'Varela Round', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";


export class Nav extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className = "d-flex flex-row justify-content-around" id = "nav">
                <div className = {"navButton my-auto d-flex flex-column " + (this.props.currentView=='add'?'text-primaryblue':'text-gray-2')} onClick = {()=>{this.props.switchView('add')}}><i className="fas fa-plus mx-auto"></i><div className = "custom-varela-round navTitle mt-1 mx-auto">Add</div></div>
                <div className = {"navButton my-auto d-flex flex-column " + (this.props.currentView=='month'?'text-primaryblue':'text-gray-2')} onClick = {()=>{
                    let d = formatToday();
                    this.props.switchView('month', parseInt(d.split('-')[0]+d.split('-')[1]));
                    }}><i className="fas fa-list mx-auto"></i><div className = "custom-varela-round navTitle mt-1 mx-auto">Month</div></div>
                <div className = {"navButton my-auto d-flex flex-column " + (this.props.currentView=='history'?'text-primaryblue':'text-gray-2')} onClick = {()=>{this.props.switchView('history')}}><i className="fas fa-history mx-auto"></i><div className = "custom-varela-round navTitle mt-1 mx-auto">History</div></div>
            </div>
        )
    }
}

export class Category extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className = "d-flex flex-column" id = "addViewCategory">
                <div className = "d-flex flex-row mb-4 mx-auto">
                    <div className = "d-flex mr-3 round-125rem">
                        <img className = "catgory-img round-125rem" src = "./img/meal_C.svg" alt = "meal color"/>
                        <img className = {"catgory-img-overlay action-item outline-lightwhite round-125rem " + (this.props.selectedCat == 'meal' ? 'op-0':'')} src = "./img/meal_G.svg" alt = "meal gray" onClick = {() => {this.props.switchCat('meal')}}/>
                    </div>
                    <div className = "d-flex mx-3 round-125rem">
                        <img className = "catgory-img round-125rem" src = "./img/gro_C.svg" alt = "grocery color"/>
                        <img className = {"catgory-img-overlay action-item outline-lightwhite round-125rem " + (this.props.selectedCat == 'gro' ? 'op-0':'')} src = "./img/gro_G.svg" alt = "gro gray" onClick = {() => {this.props.switchCat('gro')}}/>
                    </div>
                    <div className = "d-flex ml-3 round-125rem">
                        <img className = "catgory-img round-125rem" src = "./img/trans_C.svg" alt = "trans color"/>
                        <img className = {"catgory-img-overlay action-item outline-lightwhite round-125rem " + (this.props.selectedCat == 'trans' ? 'op-0':'')} src = "./img/trans_G.svg" alt = "trans gray" onClick = {() => {this.props.switchCat('trans')}}/>
                    </div>
                </div>
                <div className = "d-flex flex-row mb-4">
                    <div className = "d-flex mr-3 round-125rem">
                        <img className = "catgory-img round-125rem" src = "./img/leis_C.svg" alt = "leis color"/>
                        <img className = {"catgory-img-overlay action-item outline-lightwhite round-125rem " + (this.props.selectedCat == 'leis' ? 'op-0':'')} src = "./img/leis_G.svg" alt = "leis gray" onClick = {() => {this.props.switchCat('leis')}}/>
                    </div>
                    <div className = "d-flex mx-3 round-125rem">
                        <img className = "catgory-img round-125rem" src = "./img/shop_C.svg" alt = "shop color"/>
                        <img className = {"catgory-img-overlay action-item outline-lightwhite round-125rem " + (this.props.selectedCat == 'shop' ? 'op-0':'')} src = "./img/shop_G.svg" alt = "shop gray" onClick = {() => {this.props.switchCat('shop')}}/>
                    </div>
                    <div className = "d-flex ml-3 round-125rem">
                        <img className = "catgory-img round-125rem" src = "./img/util_C.svg" alt = "util color"/>
                        <img className = {"catgory-img-overlay action-item outline-lightwhite round-125rem " + (this.props.selectedCat == 'util' ? 'op-0':'')} src = "./img/util_G.svg" alt = "util gray" onClick = {() => {this.props.switchCat('util')}}/>
                    </div>
                </div>
                <div className = "d-flex flex-row">
                    <div className = "d-flex mr-3 round-125rem">
                        <img className = "catgory-img round-125rem" src = "./img/app_C.svg" alt = "app color"/>
                        <img className = {"catgory-img-overlay action-item outline-lightwhite round-125rem " + (this.props.selectedCat == 'app' ? 'op-0':'')} src = "./img/app_G.svg" alt = "app gray" onClick = {() => {this.props.switchCat('app')}}/>
                    </div>
                    <div className = "d-flex mx-3 round-125rem">
                        <img className = "catgory-img round-125rem" src = "./img/admin_C.svg" alt = "admin color"/>
                        <img className = {"catgory-img-overlay action-item outline-lightwhite round-125rem " + (this.props.selectedCat == 'admin' ? 'op-0':'')} src = "./img/admin_G.svg" alt = "admin gray" onClick = {() => {this.props.switchCat('admin')}}/>
                    </div>
                    <div className = "d-flex ml-3 round-125rem">
                        <img className = "catgory-img round-125rem" src = "./img/misc_C.svg" alt = "misc color"/>
                        <img className = {"catgory-img-overlay action-item outline-lightwhite round-125rem " + (this.props.selectedCat == 'misc' ? 'op-0':'')} src = "./img/misc_G.svg" alt = "misc gray" onClick = {() => {this.props.switchCat('misc')}}/>
                    </div>
                </div>
            </div>
        )
    }
}

export class InputGroup extends React.Component{
    constructor(props){
        super(props);
        
        this.addEntryCheck = this.addEntryCheck.bind(this);
    }
    addEntryCheck(){
        if (this.props.disableEntry) return;
        if (!$('#addComment').val() || !$('#addAmount').val() || this.props.selectedCat == 'none'){
            this.props.switchModal('invalid');
            this.props.showMainModal();
            return;
        }
        this.props.addEntry([this.props.selectedDate,this.props.selectedCat,$('#addComment').val(),$('#addAmount').val()]);
    }
    render(){
        let btnClass = 'bg-primaryblue action-item outline-primaryblue';
        if (this.props.disableEntry) btnClass = 'bg-gray-1 outline-gray-1'
        return(
            <div className = "d-flex flex-column mb-4 mx-auto flex-shrink-0" id = "addViewInputGroup">
                <div className = "d-flex flex-row round-2rem mb-3 border-lightgray">
                    <input className = "form-control round-2rem w-50 custom-varela-round border-0" type = "text" placeholder = "Comment" id = "addComment" maxLength = "25"/>
                    <div className = "d-flex flex-row w-50 round-2rem bg-lightblue outline-lightblue action-item" onClick = {()=>{
                        this.props.switchModal('date');
                        this.props.showMainModal();
                    }}>
                        <div className = "round-2rem text-primaryblue d-flex"><i className="fas fa-calendar my-auto ml-3" /></div>
                        <div className = "m-auto round-2rem custom-varela-round text-primaryblue bg-lightblue m-auto font-weight-bold">
                            {this.props.selectedDate}
                        </div>
                    </div>
                </div>
                <div className = "d-flex flex-row round-2rem border-lightgray">
                    <input className = "form-control round-2rem flex-grow-1 custom-varela-round border-0" type = "number" placeholder = "Amount" id = "addAmount"/>
                    <div className = {"d-flex flex-row round-2rem text-white align-middle text-center px-3 font-weight-bold custom-varela-round " + btnClass} onClick = {this.addEntryCheck}>
                        <div className = "my-auto">Spend</div>
                    </div>
                </div>
            </div>
        )
    }
}
  
export class Modal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            previewMonth : "",
            previewDate: ""
        }
    }
    componentDidUpdate(){
        if (this.props.modalData == 'edtEntry'){
            $("#updateAmount").val(this.props.modalPayload.amount.toFixed(2));
            $("#updateComment").val(this.props.modalPayload.comment);
            $("#updateCat").val(this.props.modalPayload.cat);

            let td = formatToday();
            let month = (this.props.selectedMonth == 'current'?(td.split('-')[0]+td.split('-')[1]):this.props.selectedMonth);
            month = month.toString();
            let date = month.substr(0,4)+"-"+month.substr(4,2)+"-"+this.props.modalPayload.day.toString().padStart(2,'0');

            $("#updateDate").val(date);
        }
    }
    render(){
        let modalContent = '';
        switch (this.props.modalData){
            case 'date':
                let d = '';

                if (this.props.previewMonth == '') d = new Date(formatToday().substr(0,7)+"-01");
                else d = new Date(this.props.previewMonth+"-01");

                let offset = d.getUTCDay();
                let m = d.getUTCMonth();
                
                let monthStr = globalVar.monthRef[d.getUTCMonth()+1] + '-' + d.getUTCFullYear();

                let prevMonth = new Date(d);
                prevMonth.setUTCMonth(prevMonth.getUTCMonth()-1);
                prevMonth = formatDay(prevMonth).substr(0,7);

                let nextMonth = new Date(d);
                nextMonth.setUTCMonth(nextMonth.getUTCMonth()+1);
                nextMonth = formatDay(nextMonth).substr(0,7);

                let dateBtns = [];

                for (let i = 0;i<35;i++){
                    let dayNum = i-offset;
                    let dayStr = '';
                    let btnStyle = '';
                    let UTCStr = d.toUTCString();
                    if (dayNum >= 0 && m == d.getUTCMonth()){
                        dayStr = d.getUTCDate();
                        if (this.props.previewDate != '' && formatDay(d)==this.props.previewDate) btnStyle = "bg-primaryblue text-white font-weight-bold";
                        d.setUTCDate(d.getUTCDate()+1);
                    }
                    dateBtns.push(<div className = {"dateBtn mx-auto my-1 round-2rem d-flex action-item "+btnStyle} key = {"day_"+dayNum} onClick = {()=>{
                        if (dayStr != ''){
                            let selected = new Date(UTCStr);
                            this.props.switchPreviewDate(formatDay(selected));
                        }
                    }}><div className = "m-auto">{dayStr}</div></div>);
                }

                modalContent = 
                <div className = "round-2rem d-flex w-100 custom-varela-round overflow-clip">
                    <div className = "d-flex flex-column">
                        <div className = "d-flex px-3 py-3 bg-lightblue mb-2">
                            <div className = "d-flex mr-auto text-primaryblue ml-3 action-item" onClick = {()=>{this.props.switchPreviewMonth(prevMonth)}}><i className="my-auto fas fa-chevron-left fs-15rem"></i></div>
                            <div className = "d-flex fs-15rem text-primaryblue font-weight-bold">{monthStr}</div>
                            <div className = "d-flex ml-auto text-primaryblue mr-3 action-item" onClick = {()=>{this.props.switchPreviewMonth(nextMonth)}}><i className="my-auto fas fa-chevron-right fs-15rem"></i></div>
                        </div>
                        <div className = "d-flex mx-3 text-gray-2">
                            <div className = "mx-auto">S</div>
                            <div className = "mx-auto">M</div>
                            <div className = "mx-auto">T</div>
                            <div className = "mx-auto">W</div>
                            <div className = "mx-auto">T</div>
                            <div className = "mx-auto">F</div>
                            <div className = "mx-auto">S</div>
                        </div>
                        <hr className = "my-2 mx-3"/>
                        <div className = "d-flex flex-wrap mx-3">
                            {dateBtns}
                        </div>
                        <hr className = "my-2 mx-3"/>
                        <div className = "d-flex mx-3 mb-3 mt-2">
                            <div className = "d-flex action-item text-white bg-primaryblue round-2rem mr-5 flex-grow-1" onClick = {()=>{
                                this.props.switchPreviewDate(formatToday());
                                this.props.switchPreviewMonth(formatToday().substr(0,7));
                            }}>
                                <div className = "m-auto round-2rem">Today</div>
                            </div>
                            <div className = "d-flex action-item text-gray-2 bg-gray-1 round-2rem ml-3 flex-grow-1" onClick = {()=>{this.props.hideMainModal()}}>
                                <div className = "m-auto round-2rem">Cancel</div>
                            </div>
                            <div className = "d-flex action-item text-white bg-primaryblue round-2rem flex-grow-1 ml-3" onClick = {()=>{
                                if (this.props.previewDate != ''){
                                    if (this.props.previewDate == formatToday())  this.props.switchDate("Today");
                                    else this.props.switchDate(this.props.previewDate);
                                }
                                this.props.hideMainModal();
                            }}>
                                <div className = "m-auto round-2rem">Set</div>
                            </div>
                        </div>
                    </div>
                </div>
                break;

            case 'invalid':
                modalContent = 
                <div className = "round-2rem d-flex w-100 flex-column custom-varela-round">
                    <div className = "d-flex text-center fs-15rem mt-3 text-gray-2 mx-auto">Entry incomplete!</div>
                    <div className = "d-flex action-item text-white bg-primaryblue round-2rem mx-3 my-3" onClick = {()=>{this.props.hideMainModal()}}>
                        <div className = "m-auto round-2rem">Dismiss</div>
                    </div>
                </div>
                break;

            case 'delEntry':
                modalContent = 
                <div className = "round-2rem d-flex w-100 flex-column custom-varela-round">
                    <div className = "d-flex text-center fs-12rem my-3 text-red-1 mx-auto font-weight-bold">Delete the following enrty?</div>
                    <div className = "d-flex mx-4 fs-12rem" >
                        <div className = "mr-auto">{this.props.modalPayload.comment}</div>
                        <div className = "ml-auto">{this.props.modalPayload.dayStr}</div>
                    </div>
                    <div className = "mx-auto fs-2rem">{currencyFormat(this.props.modalPayload.amount)}</div>
                    <div className = "d-flex action-item text-white bg-red-1 round-2rem mx-3 mt-3" onClick = {()=>{
                            let date = formatToday();
                            let month = (this.props.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.props.selectedMonth);

                            let payload = [month,this.props.modalPayload.id,this.props.modalPayload.cat];
                            this.props.deleteEntry(payload);
                            this.props.hideMainModal();
                        }}>
                        <div className = "m-auto round-2rem">Confirm</div>
                    </div>
                    <div className = "d-flex action-item text-gray-2 bg-gray-1 round-2rem mx-3 my-3" onClick = {()=>{this.props.hideMainModal()}}>
                        <div className = "m-auto round-2rem">Cancel</div>
                    </div>
                </div>
                break;
            case 'edtEntry':
                let options = [];
                for (let cat in globalVar.catRef){
                    options.push(<option value = {cat} key = {"option_"+cat}>{globalVar.catRef[cat]}</option>);
                }
                modalContent = 
                <div className = "round-2rem d-flex w-100 flex-column custom-varela-round">
                    <div className = "d-flex text-center fs-12rem mt-3 text-orange-1 mx-auto font-weight-bold mb-3">Update entry</div>
                    <div className = "d-flex mx-3 fs-12rem flex-column">
                        <div className = "fs-08rem custom-varela-round mr-auto ml-2">Comment</div>
                        <input className = "form-control round-2rem custom-varela-round mb-3" id = "updateComment" type = "text"  maxLength = "25"/>
                        <div className = "fs-08rem custom-varela-round mr-auto ml-2">Amount</div>
                        <input className = "form-control round-2rem custom-varela-round mb-3" id = "updateAmount" type = "number"/>
                        <div className = "fs-08rem custom-varela-round mr-auto ml-2">Date</div>
                        <input className = "form-control round-2rem custom-varela-round mb-3" id = "updateDate" type = "date"/>
                        <div className = "fs-08rem custom-varela-round mr-auto ml-2">Category</div>
                        <select className = "form-control round-2rem custom-varela-round update-select" id = "updateCat">
                            {options}
                        </select>
                    </div>
                    <div className = "d-flex action-item text-white bg-orange-1 round-2rem mx-3 mt-3" onClick = {()=>{
                            let payload = [];
                            payload[0] = $("#updateDate").val();
                            payload[1] = this.props.modalPayload.cat;
                            payload[2] = $("#updateComment").val();
                            payload[3] = $("#updateAmount").val();
                            payload[4] = this.props.modalPayload.id;
                            payload[5] = $("#updateCat").val();

                            let date = formatToday();
                            let orgMonth = (this.props.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.props.selectedMonth);
                            
                            payload[6] = orgMonth;

                            this.props.updateEntry(payload);
                            this.props.hideMainModal();
                        }}>
                        <div className = "m-auto round-2rem">Confirm</div>
                    </div>
                    <div className = "d-flex action-item text-gray-2 bg-gray-1 round-2rem mx-3 my-3" onClick = {()=>{this.props.hideMainModal()}}>
                        <div className = "m-auto round-2rem">Cancel</div>
                    </div>
                </div>
                break;

            case 'month':
                let monthList = [];
                if (this.props.monthDetail.length != 0){
                    for (let monthStr of this.props.monthDetail[4]){
                        monthList.push(<div className = "d-flex mx-auto my-3 text-primaryblue action-item fs-12rem font-weight-bold custom-varela-round" key = {"switchMonth"+monthStr} onClick = {()=>{
                            this.props.switchSelectedMonth(parseInt(monthStr));
                            this.props.hideMainModal();
                        }}>{globalVar.monthRef[parseInt(monthStr.substr(4,2))]+"-"+monthStr.substr(0,4)}</div>);
                    }
                } 
               
                modalContent = 
                <div className = "round-2rem d-flex w-100 flex-column">
                    {monthList}
                </div>
                break;

            case 'filter':
                let filters = [];
                let checked = this.props.barChartFilter.length==0?true:false;
                filters.push(
                    <div className = "d-flex flex-row mx-3 my-3" key = "all-filter">
                        <i className="fas fa-th my-auto text-gray-2 fs-12rem ml-3" style = {{width:'3rem'}}></i>
                        <div className = "fs-12rem m-auto">All</div>
                        <div className="custom-control custom-switch my-auto">
                            <input type="checkbox" className="custom-control-input my-auto" id={`filterSwitch-all`} checked = {checked} onChange = {(e)=>{
                                if (this.props.barChartFilter.length==0){
                                    let filter = [];
                                    for (let c in globalVar.catRef){
                                        filter.push(c);
                                    }
                                    this.props.switchBarChartFilter(filter);
                                }
                                else{
                                    this.props.switchBarChartFilter([]);
                                }
                            }}/>
                            <label className={`custom-control-label filter-all my-auto`} htmlFor={`filterSwitch-all`}></label>
                        </div>
                    </div>
                );
                filters.push(<hr className = "my-0 p-0 mx-3" key = "hr"/>);
                for (let cat in globalVar.catRef){
                    let checked = this.props.barChartFilter.indexOf(cat)==-1?true:false;
                    filters.push(
                    <div className = "d-flex flex-row mx-3" key = {cat+"-filter"}>
                        <img className = "filter-img" src = {`./img/icon_${cat}_I.svg`}/>
                        <div className = "fs-12rem m-auto">{globalVar.catRef[cat]}</div>
                        <div className="custom-control custom-switch my-auto">
                            <input type="checkbox" className="custom-control-input my-auto" id={`filterSwitch-${cat}`} checked = {checked} onChange = {(e)=>{
                                if (this.props.barChartFilter.indexOf(cat)!=-1){
                                    let filter = [];
                                    for (let c of this.props.barChartFilter){
                                        if (c != cat) filter.push(c);
                                    }
                                    this.props.switchBarChartFilter(filter);
                                }
                                else{
                                    let filter = this.props.barChartFilter;
                                    filter.push(cat);
                                    this.props.switchBarChartFilter(filter);
                                }
                            }}/>
                            <label className={`custom-control-label filter-${cat} my-auto`} htmlFor={`filterSwitch-${cat}`}></label>
                        </div>
                    </div>
                    );
                }
                modalContent = 
                <div className = "round-2rem d-flex w-100 flex-column custom-varela-round">
                    <div className = "d-flex text-center fs-12rem mt-3 mx-auto font-weight-bold mb-3 mb-3">Category on chart</div>
                    {filters}
                    <div className = "d-flex action-item text-gray-2 bg-gray-1 round-2rem mx-3 my-3" onClick = {()=>{this.props.hideMainModal()}}>
                        <div className = "m-auto round-2rem">Close</div>
                    </div>
                </div>
                break;

            default:
                break;
        }
        return(
            <div className="custom-modal-container d-none" id = "mainModal" onClick = {(e)=>{
                if(e.target.id == 'mainModal')this.props.hideMainModal();
                //clicked on the backdrop area, hide modal 
            }}>
                <div className="custom-modal round-2rem my-auto d-flex">
                    {modalContent}
                </div>
            </div>
        )
    }
}

export class Doughnut extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let ctx = document.getElementById("doughnut").getContext("2d");
        globalVar.doughnut.chart = new Chart(ctx, globalVar.doughnut.config);
    }
    componentDidUpdate(){
        if (globalVar.doughnut.chart != ''){
            if (globalVar.doughnut.updatePending){
                globalVar.doughnut.config.options.animation.animateRotate = true;
                globalVar.doughnut.chart.update();
                globalVar.doughnut.updatePending = false;
            }
            else{
                globalVar.doughnut.config.options.animation.animateRotate = false;
                globalVar.doughnut.chart.update();
            }
        }
        
    }
    render(){
        let monthCats = this.props.monthDetail[3];
        let amount = parseFloat(this.props.monthDetail[2]);
        let prevAmount = parseFloat(this.props.monthDetail[0]);

        let graphData = {data:[],bgColor:[],labels:[]};

        for (let cat in monthCats){
            graphData.data.push(parseFloat(parseFloat(monthCats[cat])).toFixed(2));
            graphData.bgColor.push(globalVar.colorRef[cat]);
            graphData.labels.push(globalVar.catRef[cat]);
        }
        if (this.props.monthDetail.length != 0){
            if (globalVar.doughnut.config.data.datasets.length != 0){
                if (!(JSON.stringify(graphData.data) === JSON.stringify(globalVar.doughnut.config.data.datasets[0].data)) || !(JSON.stringify(graphData.labels) === JSON.stringify(globalVar.doughnut.config.data.labels))) globalVar.doughnut.updatePending = true;
                else globalVar.doughnut.updatePending = false;
            }
            else globalVar.doughnut.updatePending = true;

            globalVar.doughnut.config.data.datasets=[{data:graphData.data,backgroundColor:graphData.bgColor}];
            globalVar.doughnut.config.data.labels = graphData.labels;
        }
        else globalVar.doughnut.updatePending = false;
        
        let diff = amount - prevAmount;
        let pct = Math.abs(prevAmount == 0?1:(diff/prevAmount));

        let indicator = '';

        if (diff > 0) indicator = "fa-arrow-up";
        else if (diff == 0) indicator = "fa-equals";
        else indicator = "fa-arrow-down";

        let date = formatToday();
        let month = (this.props.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.props.selectedMonth);
        month = month.toString();

        let y = month.substr(0,4);
        let m = globalVar.monthRef[parseInt(month.substr(4,2))];

        return(
           <div className = "d-flex" id = "doughnutContainer">
               <canvas className = "m-auto" id = "doughnut"></canvas>
               <div className = "d-flex custom-varela-round flex-column" id = "doughnutCenter">
                    <div className = "d-flex mx-auto mt-auto mb-2 text-gray-2 fs-12rem">
                        <i className = {`fas ${indicator} my-auto ml-auto mr-2`}></i>
                        <div className = "">{`${currencyFormat(Math.abs(diff))} (${(pct*100).toFixed(2)+'%'})`}</div>
                    </div>
                    <div className = "mx-auto mb-2 fs-3rem">{currencyFormat(amount)}</div>
                    <div className = "mx-auto mb-auto text-gray-2 fs-12rem">{m+'-'+y}</div>
               </div>
           </div>
        )
    }
}

export class BarLine extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let ctx = document.getElementById("barline").getContext("2d");
        globalVar.barline.chart = new Chart(ctx, globalVar.barline.config);
        globalVar.barline.updatePending = false;
    }
    componentDidUpdate(){
        if (globalVar.barline.chart != ''){
            if (globalVar.barline.updatePending){
                globalVar.barline.chart.update();
                globalVar.barline.updatePending = false;
            }
        }
    }
    render(){
        let datasets = {};
        let labels = [];
        let total = [];

        let d = formatToday()
        let endMonth = this.props.barChartEndMonth == 'current'?(d.split('-')[0]+d.split('-')[1]):this.props.barChartEndMonth;
        endMonth = endMonth.toString();
        
        let months = [];

        for (let cat in globalVar.catRef){
            if (this.props.barChartFilter.indexOf(cat) == -1) datasets[cat] = [];
        }
        for (let monthStr in this.props.history){
            months.push(monthStr);
            labels.push(globalVar.monthRef[parseInt(monthStr.substr(4,2))]+"-"+monthStr.substr(0,4));
            let cats = this.props.history[monthStr][1];
            let monthTotal = 0.0;
            for (let cat in cats){
                if (this.props.barChartFilter.indexOf(cat) == -1){
                    datasets[cat].push(parseFloat(parseFloat(cats[cat]).toFixed(2)));
                    monthTotal += parseFloat(parseFloat(cats[cat]).toFixed(2));
                }
            }
            total.push(parseFloat(parseFloat(monthTotal).toFixed(2)));
        }
        let endMonthIdx = months.reverse().indexOf(endMonth);

        let limit = this.props.responsiveState == 1?3:6;

        labels = labels.reverse().slice(endMonthIdx,endMonthIdx+limit).reverse();
        total = total.reverse().slice(endMonthIdx,endMonthIdx+limit).reverse();

        let payload = [];

        let catLabels = ['Total'];

        for (let cat in datasets){
            let obj = {};
            datasets[cat] = datasets[cat].reverse().slice(endMonthIdx,endMonthIdx+limit).reverse();
            obj.data = datasets[cat];
            obj.type = 'bar',
            obj.label = globalVar.catRef[cat];
            obj.backgroundColor = globalVar.colorRef[cat];
            payload.push(obj);
            catLabels.push(globalVar.catRef[cat]);
        }

        let totalObj = {}
        totalObj.data = total;
        totalObj.type = 'line';
        totalObj.label = "Total";
        totalObj.backgroundColor = "#4D4D4D";
        totalObj.borderColor = "#4D4D4D";
        totalObj.fill = false;
        payload.unshift(totalObj);
        let prevCatLabels = [];

        if (globalVar.barline.config.data.datasets.length != 0){
            
            for (let dataset of globalVar.barline.config.data.datasets){
                prevCatLabels.push(dataset.label);
            }
        }
        else prevCatLabels.push('Total');

        if (Object.entries(this.props.history).length != 0){
            if (globalVar.barline.config.data.labels.length == 0){
                globalVar.barline.updatePending = true;
                globalVar.barline.config.data.labels = labels;
                globalVar.barline.config.data.datasets = payload;
            }
            else{
                if (!(JSON.stringify(labels) === JSON.stringify(globalVar.barline.config.data.labels)) || !(JSON.stringify(prevCatLabels) === JSON.stringify(catLabels))){
                    
                    globalVar.barline.config.data.labels = labels;
                    globalVar.barline.config.data.datasets = payload;   globalVar.barline.updatePending = true;
                }
                else globalVar.barline.updatePending = false;
            }
        }
        else globalVar.barline.updatePending = false;
        
        return(
           <div className = "d-flex" id = {"barlineContainer"+this.props.responsiveState}>
               <canvas className = "m-auto" id = "barline"></canvas>
           </div>
        )
    }
}

export class InfoPill extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            collapsed: true
        }
        this.handler = this.handler.bind(this);
    }
    handler(){
        if (this.state.collapsed){
            let date = formatToday();
            let month = (this.props.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.props.selectedMonth);
            month = parseInt(month);
            
            this.props.getCatEntry(month, this.props.cat);
            this.setState({collapsed: false});
        }
        else this.setState({collapsed: true});
    }
    render(){
        if (this.props.list == "cat"){
            let indicator = '';

            if (this.props.diff > 0) indicator = "fa-arrow-up";
            else if (this.props.diff == 0) indicator = "fa-equals";
            else indicator = "fa-arrow-down";

            let entries = [];
            let containerHeight = 0;

            if (this.props.catEntry){
                let num = this.props.catEntry.length;
                containerHeight = num*4.5;
                for (let i = 0;i<num;i++){
                    let entry = this.props.catEntry[i];
                    let rank = ((i+1) == num ? 'btm':'mid');
                    entries.push(<EntryPill rank = {rank} amount = {parseFloat(entry.amount)} comment = {entry.comment} day = {parseInt(entry.day)} selectedMonth = {this.props.selectedMonth}  key = {"cat_detail"+entry.id} showMainModal = {this.props.showMainModal} switchModal = {this.props.switchModal} entryID = {entry.id} cat = {entry.cat} setModalPayload = {this.props.setModalPayload}/>);
                }
            }

            let actionIcon = 'fa-list';

            if (this.state.collapsed) containerHeight = 0;
            else actionIcon = 'fa-times';

            return (
            <div className = "d-flex flex-column round-125rem w-100 mt-3 overflow-clip">
                <div className = "d-flex infoPill bg-gray-1">
                    <img className = "h-100" src = {`./img/${this.props.cat}_C.svg`} alt = "category"/>
                    <div className = "d-flex flex-column m-auto custom-varela-round">
                        <div className = "mx-auto fs-15rem">{this.props.amount}</div>
                        <div className = "mx-auto d-flex text-gray-2">
                            <i className = {`fas ${indicator} my-auto ml-auto mr-2`}></i>
                            <div className = "mr-auto">{`${currencyFormat(Math.abs(this.props.diff))} (${this.props.pct})`}</div>
                        </div>
                    </div>{
                        this.props.amount == "$0.00"?
                        <div className = "d-flex mr-3 fs-15rem op-0"><i className="fas fa-list my-auto"></i></div>
                        :
                        <div className = "d-flex mr-3 fs-15rem action-item" style = {{color:globalVar.colorRef[this.props.cat]}} onClick = {this.handler}><i className={`fas ${actionIcon} my-auto`}></i></div>
                    }
                    
                </div>
                <div className = "d-flex flex-column cat-detail-container " style = {{height:`${containerHeight}rem`}}>
                    {entries}
                </div>
            </div>
            )
        }
        else if (this.props.list == "history"){

            let indicator = '';

            if (this.props.diff > 0) indicator = "fa-arrow-up";
            else if (this.props.diff == 0) indicator = "fa-equals";
            else indicator = "fa-arrow-down";

            return (
                <div className = "d-flex flex-column round-125rem w-100 mt-3 overflow-clip">
                    <div className = "d-flex infoPill bg-gray-1">
                        <div className = "custom-varela-round mx-3 text-gray-2 d-flex flex-column">
                            <div className = "mx-auto fs-15rem mt-auto">{globalVar.monthRef[this.props.month]}</div>
                            <div className = "mx-auto mb-auto fs-08rem">{this.props.year}</div>
                        </div>
                        <div className = "d-flex flex-column m-auto custom-varela-round">
                            <div className = "mx-auto fs-15rem">{this.props.amount}</div>
                            <div className = "mx-auto d-flex text-gray-2">
                                <i className = {`fas ${indicator} my-auto ml-auto mr-2`}></i>
                                <div className = "mr-auto">{`${currencyFormat(Math.abs(this.props.diff))} (${this.props.pct})`}</div>
                            </div>
                        </div>
                        <div className = "d-flex mr-3 fs-15rem action-item text-primaryblue" onClick = {()=>{
                            this.props.switchView('month', this.props.year*100+this.props.month);
                        }}><i className="fas fa-list my-auto"></i></div>
                    </div>
                </div>
            )
        }
        
    }
}

export class EntryPill extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let borderCSS = `entry-border-${this.props.rank}`;

        let date = formatToday();
        let month = (this.props.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.props.selectedMonth);
        month = month.toString();

        let y = month.substr(0,4);
        let m = month.substr(4,2);
        let d = this.props.day.toString().padStart(2,'0');

        let entryDate = new Date(y+"-"+m+"-"+d);
        let catIndicator = '';
        if (this.props.displayCat){
            catIndicator = <div className = "my-auto mr-1 round-2rem" style = {{backgroundColor:globalVar.colorRef[this.props.cat],height:'0.5rem',width:'0.5rem'}}></div>;
        }

        return (
            <div className = {"d-flex flex-column custom-varela-round cat-detail "+borderCSS}>
                <div className = "d-flex mx-3 mt-auto">
                    <div className = "text-gray-2 mr-auto d-flex">{catIndicator}<div className ="d-flex">{this.props.comment}</div></div>
                    <div className = "text-gray-2 ml-auto">{`${entryDate.toUTCString().substr(0,3)}, ${this.props.day}`}</div>
                </div>
                <div className = "d-flex mx-3 mb-auto">
                    <div className = "mr-auto fs-15rem">{currencyFormat(this.props.amount)}</div>
                    <div className = "d-flex ml-auto my-auto fs-12rem">
                        <i className="fas fa-eraser mr-5 action-item" onClick = {()=>{
                            this.props.switchModal('delEntry');
                            let payload = {id:this.props.entryID,amount:this.props.amount,comment:this.props.comment,dayStr:`${entryDate.toUTCString().substr(0,3)}, ${this.props.day}`,cat:this.props.cat, day:this.props.day};
                            this.props.setModalPayload(payload);
                            this.props.showMainModal();
                        }}></i>
                        <i className="fas fa-edit action-item" onClick = {()=>{
                            this.props.switchModal('edtEntry');
                            let payload = {id:this.props.entryID,amount:this.props.amount,comment:this.props.comment,dayStr:`${entryDate.toUTCString().substr(0,3)}, ${this.props.day}`,cat:this.props.cat, day:this.props.day};
                            this.props.setModalPayload(payload);
                            this.props.showMainModal();
                        }}></i>
                    </div>
                </div>
            </div>
        )
    }
}