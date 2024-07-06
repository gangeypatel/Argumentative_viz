var data, subgroups = [];
let arrpvt = []
let arrgov = []
let dictpvt = {}
let dictgov = {}
let svg1, svg2;
let x1, x2, y, color, xSubgroups;
var width1; let height1;
let width2; let height2;
var margin = { top: 40, bottom: 40, left: 90, right: 90 };

document.addEventListener('DOMContentLoaded', function () {
    Promise.all([d3.csv('data/JobSurveyIndia.csv')])
        .then(function (value) {
            data = value[0];
            isChecked();
     
        });
});

function datafilterforcatagory() {
    arrpvt = []
    dictpvt = {}
    arrgov = []
    dictgov = {}
    data.forEach(element => {
        if (element['Employment Sector'] === 'Entrepreneurship' || element['Employment Sector'] === 'Private Sector') {
            arrpvt.push(element)
        }
        if (element['Employment Sector'] === 'Government Sector') {
            arrgov.push(element)
        }
    });
    arrpvt.forEach(obj => {
        const sector = obj['Employment Background'];

        if (dictpvt[sector]) {
            dictpvt[sector].push(obj);
        } else {
            dictpvt[sector] = [obj];
        }
    });
    delete dictpvt['Art ']
    arrgov.forEach(obj => {
        const sector = obj['Employment Background'];

        if (dictgov[sector]) {
            dictgov[sector].push(obj);
        } else {
            dictgov[sector] = [obj];
        }
    });
}

function datafilterforsalary() {
    arrpvt = []
    dictpvt = {}
    arrgov = []
    dictgov = {}
    data.forEach(element => {
        if (element['Employment Sector'] === 'Entrepreneurship' || element['Employment Sector'] === 'Private Sector') {
            arrpvt.push(element)
        }
        if (element['Employment Sector'] === 'Government Sector') {
            arrgov.push(element)
        }
    });
    arrpvt.forEach(obj => {
        const sector = obj['IdealYearlyIncome'];

        if (dictpvt[sector]) {
            dictpvt[sector].push(obj);
        } else {
            dictpvt[sector] = [obj];
        }
    });
    delete dictpvt['Art ']
    arrgov.forEach(obj => {
        const sector = obj['IdealYearlyIncome'];

        if (dictgov[sector]) {
            dictgov[sector].push(obj);
        } else {
            dictgov[sector] = [obj];
        }
    });
}
function svgforcatagory() {

    svg1 = d3.selectAll("#svg1")
        .attr("width", width1)
        .attr("height", height1)
        .append("g")


    svg1.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 120)
        .attr("x", -height1 / 2 + 40)
        .text("Catagory")
        .attr("font-size", "14px");

    svg1.append("text")
        .attr("text-anchor", "end")
        .attr("x", width1 / 2 + 80)
        .attr("y", height1 + margin.top - 40)
        .text("Total Number of available jobs").attr("font-size", "14px");


    svg2 = d3.selectAll("#svg2")
        .attr("width", width1)
        .attr("height", height1)
        .append("g")

    svg2.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 120)
        .attr("x", -height2 / 2 + 40)
        .text("Catagory")
        .attr("font-size", "14px");
    svg2.append("text")
        .attr("text-anchor", "end")
        .attr("x", width2 / 2 + 80)
        .attr("y", height2 + margin.top - 40)
        .text("Total Number of available jobs").attr("font-size", "14px");

    x1 = d3.scaleLinear()
        .domain([0, 170])
        .range([margin.left, width1 - margin.right]);
    x2 = d3.scaleLinear()
        .domain([0, 170])
        .range([margin.left, width2 - margin.right]);

    var yDomain1 = Object.keys(dictpvt)
    y = d3.scaleBand()
        .range([height1 - margin.bottom, margin.top])
        .domain(yDomain1)
        .padding(.1)

}

function svgforsalary() {
    svg1 = d3.selectAll("#svg1")
        .attr("width", width1)
        .attr("height", height1)
        .append("g")

    svg1.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 120)
        .attr("x", -height1 / 2 + 40)
        .text("Salary Range")
        .attr("font-size", "14px")

    svg1.append("text")
        .attr("text-anchor", "end")
        .attr("x", width1 / 2 + 80)
        .attr("y", height1 + margin.top - 40)
        .text("Total Number of Employees").attr("font-size", "14px");

    svg2 = d3.selectAll("#svg2")
        .attr("width", width1)
        .attr("height", height1)
        .append("g")

    svg2 = d3.selectAll("#svg2")
        .attr("width", width1)
        .attr("height", height1)
        .append("g")

    svg2.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 120)
        .attr("x", -height2 / 2 + 40)
        .text("Salary Range")
        .attr("font-size", "14px");
    svg2.append("text")
        .attr("text-anchor", "end")
        .attr("x", width2 / 2 + 80)
        .attr("y", height2 + margin.top - 40)
        .text("Total Number of Employees").attr("font-size", "14px");

    x1 = d3.scaleLinear()
        .domain([0, 170])
        .range([margin.left, width1 - margin.right]);
    x2 = d3.scaleLinear()
        .domain([0, 170])
        .range([margin.left, width2 - margin.right]);

    var yDomain1 = Object.keys(dictpvt)
    y = d3.scaleBand()
        .range([height1 - margin.bottom, margin.top])
        .domain(yDomain1)
        .padding(.1)
}


function makebargraph() {

    svg1.append("g")
        .transition().duration(1000)
        .attr("transform", `translate(0, ${height1 - margin.bottom})`)
        .attr("id", "x-axis")
        .call(d3.axisBottom(x1))
        ;
    svg1.append("g")
        .transition().duration(1000)
        .attr("transform", `translate(${margin.left},0)`)
        .attr("id", "y-axis")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg1.selectAll("myRect")
        .data(Object.entries(dictpvt))
        .enter()
        .append("rect")
        .attr("x", x1(0))
        .attr("y", function (d) { return y(d[0]) + 20; })
        .transition().duration(1000)
        .attr("width", function (d) { return x1(d[1].length); })
        .attr("height", y.bandwidth() - 40)
        .attr("fill", "#e5989b")
        .style("stroke", "#6d6875")

    svg2.append("g")
        .transition().duration(1000)
        .attr("transform", `translate(0, ${height1 - margin.bottom})`)
        .attr("id", "x-axis")
        .call(d3.axisBottom(x2));
    svg2.append("g")
        .transition().duration(1000)
        .attr("transform", `translate(${margin.left},0)`)
        .attr("id", "y-axis")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg2.selectAll("myRect")
        .data(Object.entries(dictgov))
        .enter()
        .append("rect")
        .attr("x", x2(0))
        .attr("y", function (d) { return y(d[0]) + 20; })
        .transition().duration(1000)
        .attr("width", function (d) { return x2(d[1].length); })
        .attr("height", y.bandwidth() - 40)
        .attr("fill", "#e5989b")
        .style("stroke", "#6d6875")
        .transition().duration(1000)
}

function isChecked() {
    d3.selectAll("svg > *").remove();
    var rect1 = document.getElementById('svg1').getBoundingClientRect();
    height1 = rect1.height;
    width1 = rect1.width
    var rect2 = document.getElementById('svg2').getBoundingClientRect();
    height2 = rect2.height;
    width2 = rect2.width

    var checkbox = document.getElementById("checkbox");
    if (!checkbox.checked) {
        datafilterforcatagory();
        svgforcatagory();
        makebargraph();
    }
    else {
        datafilterforsalary();
        svgforsalary();
        makebargraph()
    }
}