import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import Chart from 'chart.js'
import {Nav, Category, Modal, InputGroup, Doughnut, InfoPill, BarLine, EntryPill} from './conponents.js'
import {formatToday, currencyFormat} from './function.js'
globalVar;

export class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentView : "add", // add, month, history
            selectedCat : "none",
            modalData : "",
            selectedDate : "Today",
            previewMonth : "",
            previewDate: "",
            curAmount : 0.0,
            disableEntry:false,
            monthDetail: [],
            recentEntry: [],
            catEntry:{},
            history:{},
            selectedMonth: "current",
            modalPayload:{},
            barChartEndMonth:"current",
            barChartFilter:[],
            responsiveState:1
        }
        this.switchView = this.switchView.bind(this);
        this.switchViewCB = this.switchViewCB.bind(this);
        this.switchCat = this.switchCat.bind(this);
        this.switchModal = this.switchModal.bind(this);
        this.switchDate = this.switchDate.bind(this);
        this.switchSelectedMonth = this.switchSelectedMonth.bind(this);
        this.switchBarChartMonth = this.switchBarChartMonth.bind(this);
        this.switchBarChartFilter = this.switchBarChartFilter.bind(this);
        this.switchPreviewDate = this.switchPreviewDate.bind(this);
        this.switchPreviewMonth = this.switchPreviewMonth.bind(this);
        this.showMainModal = this.showMainModal.bind(this);
        this.hideMainModal = this.hideMainModal.bind(this);
        this.hideMainModalCB = this.hideMainModalCB.bind(this);
        this.getView = this.getView.bind(this);
        this.getAmount = this.getAmount.bind(this);
        this.getHistory = this.getHistory.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this.getRecentEntry = this.getRecentEntry.bind(this);
        this.getMonthDetail = this.getMonthDetail.bind(this);
        this.getCatEntry = this.getCatEntry.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.updateEntry = this.updateEntry.bind(this);
        this.setModalPayload = this.setModalPayload.bind(this);
        this.responsiveUpdate = this.responsiveUpdate.bind(this);
    }
    componentDidMount(){
        window.addEventListener('resize',this.responsiveUpdate);
    }
    componentWillMount(){
        let remSize = window.getComputedStyle(document.getElementById('fontRef')).fontSize;
        remSize = parseInt(remSize.slice(0,-2));
        let windowSizeRem = $(window).width() / remSize;
        if (windowSizeRem < 46) this.setState({responsiveState:1});
        else{
            this.setState({responsiveState:2});
            globalVar.barline.config.options.aspectRatio = 2;
        }
    }
    switchView(newView, newMonth = null){
        if (this.state.currentView == newView) return;

        if (globalVar.doughnut.chart != ''){globalVar.doughnut.chart.destroy();globalVar.doughnut.chart = ''}
        if (globalVar.barline.chart != ''){globalVar.barline.chart.destroy();globalVar.barline.chart = ''}

        globalVar.doughnut.config.options.animation.animateRotate = true;
        globalVar.doughnut.config.data = {datasets:[],labels:[]}
        globalVar.barline.config.data = {datasets:[],labels:[]}

        document.getElementById('mainView').removeEventListener("animationend", this.switchViewCB);
        globalVar.newView = newView;
        if (newMonth) globalVar.newMonth = newMonth;
        else globalVar.newMonth = "";
        if (!$('#mainView').hasClass('custom-fadeOut-simple')) $('#mainView').removeClass("custom-fadeIn-simple").addClass("custom-fadeOut-simple");
        document.getElementById('mainView').addEventListener("animationend", this.switchViewCB);
    }
    switchViewCB(){
        $('#mainView').addClass("custom-fadeIn-simple").removeClass("custom-fadeOut-simple");
        if (globalVar.newMonth) this.setState({selectedMonth:globalVar.newMonth})
        else this.setState({selectedMonth:'current'})
        this.setState({
            barChartEndMonth:"current",
            barChartFilter:[],
            recentEntry:[],
            selectedCat:"none",
            selectedDate:"Today",
            monthDetail:[],
            history:{},
            currentView:globalVar.newView,
            disableEntry: false
        });
        document.getElementById('mainView').removeEventListener("animationend", this.switchViewCB);
    }
    switchPreviewDate(newDate){
        this.setState({previewDate:newDate});
    }
    switchPreviewMonth(newMonth){
        this.setState({previewMonth:newMonth});
    }
    switchCat(newCat){
        if (this.state.selectedCat != newCat) this.setState({selectedCat:newCat});
    }
    switchModal(newModal){
        if (newModal == 'date')this.setState({
            previewDate:(this.state.selectedDate == 'Today' ?formatToday():this.state.selectedDate),
            previewMonth:(this.state.selectedDate == 'Today' ?'':this.state.selectedDate.substr(0,7)),
        })
        if (this.state.modalData != newModal) this.setState({modalData:newModal});
    }
    setModalPayload(payload){
        this.setState({modalPayload:payload});
    }
    switchDate(newDate){
        if (!newDate) return;
        if (newDate == formatToday()) newDate = "Today";
        if (this.state.selectedDate != newDate) this.setState({selectedDate:newDate});
    }
    switchSelectedMonth(newMonth){
        let d = formatToday();
        let monthClean = newMonth;
        if (parseInt(d.split('-')[0]+d.split('-')[1]) == newMonth) monthClean = 'current';
        if (this.state.selectedMonth != monthClean){
            this.setState({selectedMonth:newMonth});
            this.getMonthDetail(newMonth);
            this.getRecentEntry(newMonth);
        }
    }
    switchBarChartMonth(newMonth){
        let d = formatToday();
        let monthClean = newMonth;
        if (parseInt(d.split('-')[0]+d.split('-')[1]) == newMonth) monthClean = 'current';
        if (this.state.barChartEndMonth != monthClean){
            this.setState({barChartEndMonth:newMonth});
        }
    }
    switchBarChartFilter(newFilter){
        this.setState({barChartFilter:newFilter});
    }
    responsiveUpdate(){
        let remSize = window.getComputedStyle(document.getElementById('fontRef')).fontSize;
        remSize = parseInt(remSize.slice(0,-2));
        let windowSizeRem = $(window).width() / remSize;
        if (windowSizeRem < 46){
            if (this.state.responsiveState == 2){
                if (globalVar.doughnut.chart != '') globalVar.doughnut.chart.destroy();
                globalVar.doughnut.chart = '';
                if (globalVar.barline.chart != '') globalVar.barline.chart.destroy();
                globalVar.barline.chart = '';

                globalVar.doughnut.config.data = {datasets:[],labels:[]};
                globalVar.barline.config.data = {datasets:[],labels:[]};

                globalVar.barline.config.options.aspectRatio = 1;
            }
            this.setState({responsiveState:1});
        }
        else{
            if (this.state.responsiveState == 1){
                if (this.state.currentView == 'month'){
                    if (globalVar.doughnut.chart != '') globalVar.doughnut.chart.destroy();
                    globalVar.doughnut.chart = '';
                }
                if (globalVar.barline.chart != '') globalVar.barline.chart.destroy();
                globalVar.barline.chart = '';

                globalVar.doughnut.config.data = {datasets:[],labels:[]};
                globalVar.barline.config.data = {datasets:[],labels:[]};

                globalVar.barline.config.options.aspectRatio = 2;
            }
            this.setState({responsiveState:2});
        }
    }
    showMainModal(){
        let modal = document.getElementById('mainModal');
        modal.removeEventListener("animationend", this.hideMainModalCB);
        let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        $('body').css('overflow','hidden').css('padding-right', scrollbarWidth + 'px');
        $('#mainModal').removeClass("d-none custom-fadeOut").addClass("custom-fadeIn d-flex");
        $('#modalBackdrop').removeClass("d-none custom-fadeOut-simple").addClass("custom-fadeIn-simple d-flex");
    }
    hideMainModal(){
        if ($('#mainModal').hasClass('d-none') || $('#mainModal').hasClass('custom-fadeOut')) return; // hidding is in transition
        $('body').css('overflow','').css('padding-right', '');;
        $('#mainModal').removeClass("custom-fadeIn d-flex").addClass("custom-fadeOut");
        $('#modalBackdrop').removeClass("custom-fadeIn-simple d-flex").addClass("custom-fadeOut-simple");
        let modal = document.getElementById('mainModal');
        modal.addEventListener("animationend", this.hideMainModalCB);
    }
    hideMainModalCB(){
        let modal = document.getElementById('mainModal');
        modal.removeEventListener("animationend", this.hideMainModalCB);
        $('#mainModal').removeClass("custom-fadeOut").addClass("d-none");
        $('#modalBackdrop').removeClass("custom-fadeOut-simple").addClass("d-none");
    }
    async getHistory(){
        let date = formatToday();
        let month = date.split('-')[0]+date.split('-')[1];
        fetch(`./handler/handler.php?request=history&month=${month}`).then((response)=>{return response.json()}).then((obj)=>{
            this.setState({history: obj})
        });
    }
    async getMonthDetail(month){
        fetch(`./handler/handler.php?request=monthDetail&month=${month}`).then((response)=>{return response.json()}).then((obj)=>{
            this.setState({monthDetail: obj})
        });
    }
    async getRecentEntry(month){
        fetch(`./handler/handler.php?request=recent&month=${month}`).then((response)=>{return response.json()}).then((obj)=>{
            this.setState({recentEntry: obj})
        });
    }
    async getCatEntry(month,cat){
        fetch(`./handler/handler.php?request=catEntry&month=${month}&cat=${cat}`).then((response)=>{return response.json()}).then((obj)=>{
            let org = this.state.catEntry;
            org[cat] = obj;
            this.setState({org});
        });
    }
    async getAmount(){
        let date = formatToday();
        fetch(`./handler/handler.php?request=amount&month=${date.split('-')[0]+date.split('-')[1]}`).then((response)=>{return response.json()}).then((obj)=>{
            let amount = obj[0];
            if (!amount) amount = 0.0;
            this.setState({curAmount: parseFloat(amount)})
        });
    }
    async deleteEntry(payload){
        fetch(`./handler/handler.php?request=delete&month=${payload[0]}&id=${payload[1]}`).then((response)=>{return response.json()}).then((obj)=>{
            this.getMonthDetail(payload[0]);
            this.getCatEntry(payload[0],payload[2]);
            this.getRecentEntry(payload[0]);
        });
    }
    async addEntry(payload){
        let date = payload[0];
        if (date == "Today") date = formatToday();
        let month = date.split('-')[0]+date.split('-')[1];
        this.setState({disableEntry:true});
        fetch(`./handler/handler.php?request=add&month=${month}&amount=${encodeURIComponent(parseFloat(payload[3]).toFixed(2))}&comment=${encodeURIComponent(payload[2])}&cat=${payload[1]}&day=${date.split('-')[2]}`).then((response)=>{return response.json()}).then((obj)=>{
            let amount = obj[0];
            let month = obj[1];

            if (!amount) amount = 0.0;
            this.setState({ disableEntry:false, selectedDate:"Today",selectedCat:"none"});

            let curMonth = formatToday().split('-')[0]+formatToday().split('-')[1];
            if (curMonth == month) this.setState({curAmount: parseFloat(amount)});

            $('#addComment').val("");
            $('#addAmount').val("");

            let date = formatToday();
            month = (this.state.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.state.selectedMonth);
            this.getMonthDetail(month);
        });
    }
    async updateEntry(payload){
        let date = payload[0];
        let month = date.split('-')[0]+date.split('-')[1];
        this.setState({disableEntry:true});
        fetch(`./handler/handler.php?request=update&month=${month}&amount=${encodeURIComponent(parseFloat(payload[3]).toFixed(2))}&comment=${encodeURIComponent(payload[2])}&cat=${payload[5]}&day=${date.split('-')[2]}&id=${payload[4]}&orgMonth=${payload[6]}`).then((response)=>{return response.json()}).then((obj)=>{
            let date = formatToday();
            let month = (this.state.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.state.selectedMonth);
            this.getMonthDetail(month);
            this.getCatEntry(month,payload[1]); //prev cat
            this.getCatEntry(month,payload[5]); //cur cat
            this.getRecentEntry(month);
        });
    }
    getView(){
        if (this.state.currentView == 'add'){
            return (<AddView showMainModal = {this.showMainModal} switchModal = {this.switchModal} selectedDate = {this.state.selectedDate} addEntry = {this.addEntry} disableEntry = {this.state.disableEntry} selectedCat = {this.state.selectedCat} switchCat = {this.switchCat} curAmount = {this.state.curAmount} getAmount = {this.getAmount} getMonthDetail = {this.getMonthDetail} responsiveState = {this.state.responsiveState} monthDetail = {this.state.monthDetail} selectedMonth = {this.state.selectedMonth} setModalPayload = {this.setModalPayload}/>)
        }
        else if (this.state.currentView == 'month'){
            return (<MonthView showMainModal = {this.showMainModal} switchModal = {this.switchModal} monthDetail = {this.state.monthDetail} recentEntry = {this.state.recentEntry} getMonthDetail = {this.getMonthDetail} getRecentEntry = {this.getRecentEntry} catEntry = {this.state.catEntry} getCatEntry = {this.getCatEntry} selectedMonth = {this.state.selectedMonth} setModalPayload = {this.setModalPayload} switchSelectedMonth = {this.switchSelectedMonth} responsiveState = {this.state.responsiveState}/>)
        }
        else{
            return(
                <HistoryView history = {this.state.history} getHistory = {this.getHistory}  switchSelectedMonth = {this.switchSelectedMonth} switchView = {this.switchView} barChartEndMonth = {this.state.barChartEndMonth} switchBarChartMonth = {this.switchBarChartMonth} switchBarChartFilter = {this.switchBarChartFilter} barChartFilter = {this.state.barChartFilter} switchModal = {this.switchModal} showMainModal = {this.showMainModal} responsiveState = {this.state.responsiveState}/>
            )
        }
    }
    render(){
        return(
            <div className = "d-flex flex-column" id = "appViewport">
                <div className = "d-flex flex-column mx-auto pt-3 custom-fadeIn-simple" id = "mainView">
                    {this.getView()}
                    <div className = "mt-3" id = "navMockup">mockup</div>
                </div>
                <Nav currentView = {this.state.currentView} switchView = {this.switchView} switchSelectedMonth = {this.switchSelectedMonth}/>
                <Modal hideMainModal = {this.hideMainModal} modalData = {this.state.modalData} switchDate = {this.switchDate} selectedDate = {this.state.selectedDate} modalPayload = {this.state.modalPayload} deleteEntry = {this.deleteEntry} updateEntry = {this.updateEntry} selectedMonth = {this.state.selectedMonth} switchSelectedMonth = {this.switchSelectedMonth} monthDetail = {this.state.monthDetail} barChartFilter = {this.state.barChartFilter} switchBarChartFilter = {this.switchBarChartFilter} previewDate = {this.state.previewDate} previewMonth = {this.state.previewMonth} switchPreviewDate = {this.switchPreviewDate} switchPreviewMonth = {this.switchPreviewMonth}/>
                <div className = "custom-modal-backdrop d-none" id = "modalBackdrop"></div>
            </div>
        )
    }
}

class AddView extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let date = formatToday();
        let month = (this.props.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.props.selectedMonth);
        month = parseInt(month);

        this.props.getAmount();
        this.props.getMonthDetail(month);
    }
    render(){
        if (this.props.responsiveState == 1){
            return[
                <div className = "text-center custom-varela-round mt-auto mb-3 flex-shrink-0" id = "addViewAmount" key = "addViewAmount">{currencyFormat(this.props.curAmount)}</div>,
                <InputGroup showMainModal = {this.props.showMainModal} switchModal = {this.props.switchModal} selectedDate = {this.props.selectedDate} addEntry = {this.props.addEntry} disableEntry = {this.props.disableEntry} selectedCat = {this.props.selectedCat} key = "InputGroup"/>,
                <div className = "d-flex mb-auto flex-shrink-0" key = "categorySelect"><Category selectedCat = {this.props.selectedCat} switchCat = {this.props.switchCat}/></div>
            ]
        }
        else{
            let date = formatToday();
            let month = (this.props.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.props.selectedMonth);
            month = month.toString();

            return(
                <div className = "d-flex flex-row flex-shrink-0 my-auto">
                    <div className = "d-flex flex-shrink-0 my-auto mr-5" key = "doughnutChart"><Doughnut monthDetail = {this.props.monthDetail} selectedMonth = {this.props.selectedMonth}/></div>
                    <div className = "d-flex flex-column flex-shrink-0">
                        <InputGroup showMainModal = {this.props.showMainModal} switchModal = {this.props.switchModal} selectedDate = {this.props.selectedDate} addEntry = {this.props.addEntry} disableEntry = {this.props.disableEntry} selectedCat = {this.props.selectedCat} key = "InputGroup"/>
                        <div className = "d-flex mb-auto flex-shrink-0" key = "categorySelect"><Category selectedCat = {this.props.selectedCat} switchCat = {this.props.switchCat}/></div>
                    </div>
                </div>
            )
        }
        
    }
}

class MonthView extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let date = formatToday();
        let month = (this.props.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.props.selectedMonth);
        month = parseInt(month);

        this.props.getMonthDetail(month);
        this.props.getRecentEntry(month);
    }
    render(){
        if (!this.props.monthDetail || this.props.monthDetail.length==0) return <div></div>;
        let monthCats = this.props.monthDetail[3];
        let prevCats = this.props.monthDetail[1];
        let catPills = [];

        for (let cat in monthCats){
            let diff = parseFloat(monthCats[cat]) - parseFloat(prevCats[cat]);
            let pct = Math.abs(parseFloat(prevCats[cat]) == 0?(diff == 0.0 ?0:1):(diff/parseFloat(prevCats[cat])));

            catPills.push(<InfoPill list = "cat" cat = {cat} amount = {currencyFormat(parseFloat(monthCats[cat]))} diff = {diff} pct = {(pct*100).toFixed(2)+'%'} catEntry = {this.props.catEntry[cat]} getCatEntry = {this.props.getCatEntry} selectedMonth = {this.props.selectedMonth} key = {"cat_"+cat+"_"+this.props.selectedMonth} showMainModal = {this.props.showMainModal} switchModal = {this.props.switchModal} setModalPayload = {this.props.setModalPayload}/>);
        }

        let date = formatToday();
        let month = (this.props.selectedMonth == 'current'?(date.split('-')[0]+date.split('-')[1]):this.props.selectedMonth);
        month = month.toString();

        let monthStr = globalVar.monthRef[parseInt(month.substr(4,2))]+"-"+month.substr(0,4);
        let monthInt = parseInt(month);
        let leftStyles = ['action-item','text-primaryblue','fas fa-angle-left'];
        let rightStyles = ['action-item','text-primaryblue','fas fa-angle-right'];
        let leftMonth = 0;
        let rightMonth = 0;

        if (this.props.monthDetail.length != 0){
            let curIndex = this.props.monthDetail[4].indexOf(month);
            if (curIndex == 0) leftStyles = ['','text-gray-2','far fa-circle'];
            else leftMonth = parseInt(this.props.monthDetail[4][curIndex-1]);
            if (curIndex == (this.props.monthDetail[4].length-1)) rightStyles = ['','text-gray-2',' far fa-circle'];
            else rightMonth = parseInt(this.props.monthDetail[4][curIndex+1]);
        
        }

        let recentPills = [];
        if (this.props.recentEntry.length != 0){
            let i = 0;
            for (let entry of this.props.recentEntry){
                let rank = '';

                if (i == 0) rank = 'top';
                else if (i == this.props.recentEntry.length-1) rank = "btm";
                else rank = 'mid';

                if (i == 0 && i == this.props.recentEntry.length-1) rank = "whole";

                recentPills.push(<EntryPill rank = {rank} amount = {parseFloat(entry.amount)} comment = {entry.comment} day = {parseInt(entry.day)} selectedMonth = {this.props.selectedMonth}  key = {"recent"+entry.id} showMainModal = {this.props.showMainModal} switchModal = {this.props.switchModal} entryID = {entry.id} cat = {entry.cat} setModalPayload = {this.props.setModalPayload} displayCat = {true}/>);
                i++;
            }
            
        }

        if (this.props.responsiveState == 1){
            return[
                <div className = "d-flex mt-auto flex-row mx-auto fs-15rem mb-3 bg-gray-1 round-2rem flex-shrink-0"  key = "monthSelect" id = "monthControl">
                    <div className = {`${leftStyles[0]} ${leftStyles[1]} round-2rem d-flex`} onClick = {()=>{if (leftMonth!=0) this.props.switchSelectedMonth(leftMonth)}}><i className={`${leftStyles[2]} my-auto mx-3`}></i></div>
                    <div className = "py-1 px-3 mx-auto custom-varela-round text-primaryblue round-2rem action-item" onClick = {()=>{
                        this.props.switchModal('month');
                        this.props.showMainModal();
                    }}>{monthStr}</div>
                    <div className = {`${rightStyles[0]} ${rightStyles[1]} round-2rem d-flex`} onClick = {()=>{if (rightMonth!=0) this.props.switchSelectedMonth(rightMonth)}}><i className={`${rightStyles[2]} my-auto mx-3`}></i></div>
                </div>,
                <div className = "d-flex flex-shrink-0" key = "doughnutChart"><Doughnut monthDetail = {this.props.monthDetail} selectedMonth = {this.props.selectedMonth}/></div>,
                <div className = "d-flex mb-auto flex-column flex-shrink-0" key = "catPillsContainer">
                    {catPills}
                </div>
            ]
        }
        else{
            return(
                <div className = "d-flex flex-shrink-0 m-auto">
                    <div className = "d-flex flex-shrink-0 flex-column mr-5">
                        <div className = "d-flex flex-row mx-auto fs-15rem my-3 bg-gray-1 round-2rem flex-shrink-0"  key = "monthSelect" id = "monthControl">
                            <div className = {`${leftStyles[0]} ${leftStyles[1]} round-2rem d-flex`} onClick = {()=>{if (leftMonth!=0) this.props.switchSelectedMonth(leftMonth)}}><i className={`${leftStyles[2]} my-auto mx-3`}></i></div>
                            <div className = "py-1 px-3 mx-auto custom-varela-round text-primaryblue round-2rem action-item" onClick = {()=>{
                                this.props.switchModal('month');
                                this.props.showMainModal();
                            }}>{monthStr}</div>
                            <div className = {`${rightStyles[0]} ${rightStyles[1]} round-2rem d-flex`} onClick = {()=>{if (rightMonth!=0) this.props.switchSelectedMonth(rightMonth)}}><i className={`${rightStyles[2]} my-auto mx-3`}></i></div>
                        </div>
                        <div className = "d-flex flex-shrink-0 flex-column mb-3" key = "doughnutChart"><Doughnut monthDetail = {this.props.monthDetail} selectedMonth = {this.props.selectedMonth}/></div>
                        <div className = "d-flex flex-shrink-0 flex-column ">{recentPills}</div>
                    </div>
                    <div className = "d-flex flex-shrink-0 flex-column" key = "catPillsContainer" id = "catPillsContainer">
                    {catPills}
                </div>
                </div>
            )
        }
        


    }
}

class HistoryView extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getHistory();
    }
    render(){
        let monthPills = [];
        let prevAmount = 0.0;

        for (let month in this.props.history){
            let payload = this.props.history[month];
            let amount = parseFloat(payload[0]);
            let diff = amount - prevAmount;
            let pct = prevAmount == 0.0?(diff == 0.0 ?0:1):Math.abs(diff)/prevAmount;
            pct = (pct*100).toFixed(2)+"%";
            monthPills.push(<InfoPill list = "history" amount = {currencyFormat(amount)} diff = {diff} pct = {pct} month = {parseInt(month)%100} year = {Math.floor(parseInt(month)/100)} key = {month+"_infopill"} switchView = {this.props.switchView} switchSelectedMonth = {this.props.switchSelectedMonth}/>);
            prevAmount = amount;
        }

        monthPills = monthPills.reverse();

        let leftStyles = ['action-item','text-primaryblue','fas fa-angle-left'];
        let rightStyles = ['action-item','text-primaryblue','fas fa-angle-right'];
        let leftMonth = 0;
        let rightMonth = 0;
        let endMonth = '';
        let startMonth = '';
        let title = '';

        if (Object.entries(this.props.history).length != 0){
            let months = [];
            for (let monthStr in this.props.history){
                months.push(monthStr);
            }
            let limit = this.props.responsiveState == 1?3:6;

            let d = formatToday()
            endMonth = this.props.barChartEndMonth == 'current'?(d.split('-')[0]+d.split('-')[1]):this.props.barChartEndMonth;;
            endMonth = endMonth.toString();
            let endMonthIdx = months.indexOf(endMonth);
            let startMonthIdx = endMonthIdx - limit + 1;
            if (startMonthIdx <0) startMonthIdx = 0;
            startMonth = months[startMonthIdx];

            if (endMonthIdx <= limit-1) leftStyles = ['','text-gray-2','far fa-circle'];
            else leftMonth = parseInt(months[endMonthIdx-1]);
            if (endMonthIdx == (months.length-1)) rightStyles = ['','text-gray-2',' far fa-circle'];
            else rightMonth = parseInt(months[endMonthIdx+1]);

            title = globalVar.monthRef[parseInt(startMonth.substr(4,2))]+"-"+globalVar.monthRef[parseInt(endMonth.substr(4,2))]
        }

        return[
            <div className = "d-flex mt-auto flex-row mx-auto fs-15rem mb-3 bg-gray-1 round-2rem flex-shrink-0"  key = "monthSelect" id ={"monthControl"+this.props.responsiveState}>
                <div className = {`${leftStyles[0]} ${leftStyles[1]} round-2rem d-flex`} onClick = {()=>{if (leftMonth!=0) this.props.switchBarChartMonth(leftMonth)}}><i className={`${leftStyles[2]} my-auto mx-3`}></i></div>
                <div className = "py-1 mx-auto custom-varela-round round-2rem">{title}</div>
                <div className = {`${rightStyles[0]} ${rightStyles[1]} round-2rem d-flex`} onClick = {()=>{if (rightMonth!=0) this.props.switchBarChartMonth(rightMonth)}}><i className={`${rightStyles[2]} my-auto mx-3`}></i></div>
            </div>,
            <div className = {"d-flex mx-auto flex-row mb-3 round-2rem flex-shrink-0 py-1 custom-varela-round action-item "+(this.props.barChartFilter.length==0?"bg-lightblue text-primaryblue":"bg-primaryblue text-white")} key = "filterControl" id = {"filterControl"+this.props.responsiveState} onClick = {()=>{
                this.props.switchModal('filter');
                this.props.showMainModal();
            }}><i className="fas fa-filter ml-auto mr-1 my-auto"></i><div className = "mr-auto">{this.props.barChartFilter.length!=0?"Filter activated":"No filter"}</div></div>,
            <div className = "d-flex flex-shrink-0" key = "barlineChart"><BarLine history = {this.props.history} barChartEndMonth = {this.props.barChartEndMonth} barChartFilter = {this.props.barChartFilter} responsiveState = {this.props.responsiveState} key = {"barline_"+this.props.responsiveState}/></div>,
            <div className = "d-flex mb-auto flex-column flex-shrink-0" key = "monthPillsContainer">
                {monthPills}
            </div>
        ]
    }
}