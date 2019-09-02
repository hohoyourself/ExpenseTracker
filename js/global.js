var globalVar = {
    newView : "",
    newMonth: "",
    modalData: {},
    colorRef: {
        meal:"#FFAC0F",
        gro:"#FF7E00",
        trans:"#FF590D",
        leis:"#0BBBFD",
        shop:"#A7DCFF",
        util:"#FFCB0D",
        app:"#007DFF",
        admin:"#2F4EB4",
        misc:"#00365C"
    },
    catRef: {
        meal:"Meal",
        gro:"Grocery",
        trans:"Transit",
        leis:"Leisure",
        shop:"Shopping",
        util:"Utility",
        app:"App & Service",
        admin:"Administrative",
        misc:"Miscellaneous"
    },
    monthRef: {
        1:"Jan",
        2:"Feb",
        3:"Mar",
        4:"Apr",
        5:"May",
        6:"Jun",
        7:"Jul",
        8:"Aug",
        9:"Sep",
        10:"Oct",
        11:"Nov",
        12:"Dec"
    },
    doughnut:{
        config:{
            type: 'doughnut',
            data: {
                datasets:[],
                labels:[]
            },
            options: {
                legend : {
                    display: false
                },
                aspectRatio: 1,
                responsive: true,
                cutoutPercentage:85,
                animation:{
                    animateRotate:true
                }
            }
        },
        chart: '',
        updatePending:false
    },
    barline:{
        config:{
            type: 'bar',
            data: {
                datasets:[],
                labels:[]
            },
            options: {
                title: {
                    display: false
                },
                legend:{
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                aspectRatio: 1,
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines:{
                            display:false
                        },
                        maxBarThickness: 16
                    }],
                    yAxes: [{
                        stacked: true,
                        gridLines:{
                            display:false,
                            drawBorder:false
                        },
                        display:false
                    }]
                }
            }
        },
        chart: '',
        updatePending:false
    }
}