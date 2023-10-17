import React, {useRef, useEffect , useState} from 'react';
import {select, easeLinear,easeExpOut,interpolateNumber, easeBackOut, svg } from 'd3';
import useWindowDimensions from './windowDimensions'
import './MyJourney.css';
import * as d3 from "d3"




// Data

const nodes = [
    {
        type:'Education',
        start_date:new Date(2005,6),
        end_date:new Date(2009,9),
        School:'University of Applied Science and Technology',
        Degree:"Associate",
        Field_of_study: 'Computer Software Engineering',
    },
    {
        type:'Education',
        start_date:new Date(2010,10),
        end_date:new Date(2014,9),
        School:'Azad University, South Tehran Branch',
        Degree:"Bachelor",
        Field_of_study: 'Computer Software Engineering',
    },
    {
        type:'Education',
        start_date:new Date(2014,10),
        end_date:new Date(2019,11),
        School:'Azad University, Science And Research Branch',
        Degree:"Master",
        Field_of_study: 'Artificial Intelligence',
    },
    {
        type:'Experience',
        start_date:new Date(2009,8),
        end_date:new Date(2012,8),
        Title:'Assistant Financial Analyst',
        Company:'Jahan ara housing cooperative'
    },
    {
        type:'Experience',
        start_date:new Date(2013,2),
        end_date:new Date(2018,4),
        Title:'Research Data Analyst',
        Company:'Artmis Rasa'
    },
    {
        type:'Experience',
        start_date:new Date(2022,5),
        end_date:new Date(),
        Title:'Data Analyst',
        Company:'CloudTalk'
    },
    {
        type:'Experience',
        start_date:new Date(2019,3),
        end_date:new Date(2022,5),
        Title:'Data Analyst',
        Company:'Samsung Mobile'
    }

]

const MyJourney = () => {
    const svgRef = useRef();
    const WindowDimensions = useWindowDimensions();

    const shapeheight = WindowDimensions.height - (WindowDimensions.height * 0.2)
    const startDim = shapeheight - (shapeheight * 0.1)
    const endDim = (shapeheight* 0.1)

    const startDelay = 3000
    const YearSpace = 10
    const LineLenght = 130
    const SectionBoxWidth = 480/2 - YearSpace

    function GetYear(year){
        return year.getFullYear() + (year.getMonth()+1)/12;
    };
    function GetRangeYear(date) {
        return date.getFullYear()+"-"+date.getMonth()
    }
    function GetXPValue(type) {
        return type === 'Education' ? (WindowDimensions.width/2) + YearSpace + 10 : (WindowDimensions.width/2)-YearSpace - 10
    }
    const startYear = Math.min.apply(Math, nodes.map(function(o) { return GetYear(o.start_date)}))
    const endYear = Math.max.apply(Math, nodes.map(function(o) { return GetYear(o.end_date)}))


    function XPosition (type){
        return type === 'Education' ? (WindowDimensions.width/2) + YearSpace : (WindowDimensions.width/2)-YearSpace
    };
    function YPosition (year) {
        const value = GetYear(year);
        return endDim + (((startDim-endDim)/(endYear - startYear ))*(endYear - value))
    };
    function PointDelay(year){
        const value = GetYear(year);
        return (value- startYear)*1000 + startDelay
    };
    function DSection(node){

        return (GetYear(node.end_date)-GetYear(node.start_date))*1000
    };

    function TitleSection (node){
        return  node.type === 'Education' ? node.Field_of_study : node.Title
    };
    function textAnchor (node){
        return node.type === 'Education' ? 'start' : 'end'
    };
    function textAnchorXPos (node){
        return node.type === 'Education' ? XPosition(node.type) + 5 : XPosition(node.type) - 5
    };
    function textAnchorXPosLast(node){
        return node.type === 'Education' ? (WindowDimensions.width/2)+(LineLenght/2)+YearSpace + 80 : (WindowDimensions.width/2)-(LineLenght/2)-YearSpace - 80
    };

    function XLRect(node){
        return node.type === 'Education' ? XPosition(node.type) : XPosition(node.type)-SectionBoxWidth
    };
    function Degree(node){
        return node.type === 'Education' ? node.Degree : ' '
    };

    i
    function GetSections(nodes){

        const starts = nodes.map(a => {
            return {
                X: XPosition(a.type), // X Position
                Y: YPosition(a.start_date), // Y Position
                D: PointDelay(a.start_date), // Delay to show
                V: GetRangeYear(a.start_date), // Values Year
                XV: GetXPValue(a.type),
                YV: YPosition(a.start_date),
                AncText : textAnchor(a)
            }
        })
        const ends = nodes.map(a => {
            return {
                X: XPosition(a.type),
                Y: YPosition(a.end_date),
                D: PointDelay(a.end_date),
                V: GetRangeYear(a.end_date),
                XV: GetXPValue(a.type),
                YV: YPosition(a.end_date)+8 ,
                AncText : textAnchor(a)
            }
        })
        const full = starts.concat(ends)
        return full
    }

    function GetRanges(nodes){
        const Ranges = nodes.map(a => {
            return {
                PathDi:[
                    {x:XPosition(a.type),y:YPosition(a.start_date)},
                    {x:XPosition(a.type),y:YPosition(a.end_date)},
                        ],
                Ti : TitleSection(a) ,
                Du: DSection(a),
                De: PointDelay(a.start_date),
                AncX : textAnchorXPos(a),
                AncText : textAnchor(a),
                AncXL : textAnchorXPosLast(a),
                XLRect : XLRect(a),
                Degree: Degree(a)
            }
        })
        return Ranges
    };


    // Generate data
    const Sections = GetSections(nodes)
    const Lines = GetRanges(nodes)

    // Generate interpolator
    const interpolator = interpolateNumber (startYear,endYear);


    // Total animation duration
    const durationSvg = (endYear- startYear)*1000

    useEffect(()=>{
    // Create svg
    const svg = select(svgRef.current);


    var defs = svg.append("defs");

    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "120%");

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 3)
        .attr("dy", 3)
        .attr("result", "offsetBlur");

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");



    const StartEndPoints = svg.selectAll('circle')
        .data(Sections)
        .join('circle')
        .attr('r', 5)
        .attr('cx', function(d, i) {return d.X})
        .attr('cy', function(d, i) { return d.Y} )
        .attr('fill','#444')
        .attr('opacity', 0)
        .transition()
        .delay(function(d, i) { return d.D })
        .style('opacity', 1)



    const Years = svg.selectAll('text')
        .data(Sections)
        .join('text')
        .text(d => d.V)
        .attr("x",d => d.XV)
        .attr("y",d => d.YV)
        .style("text-anchor", d => d.AncText)
        .style("font-size", "10px")
        .attr('fill','#222831')
        .attr('opacity', 0)

        .transition()
            .delay(function(d, i) { return d.D })
            .style('opacity', 1)



    const MainYear = svg.append("text")
        .attr("x", WindowDimensions.width/2)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr('fill','#444')
        .attr('opacity', 0)
        .attr("y", endDim-10+((startDim-endDim)/(endYear - startYear ))*(endYear - startYear))
        .text(Math.floor(startYear))
        .transition().duration(startDelay).attr('opacity', 1 );

        MainYear.transition()
            .ease(easeLinear)
            .tween("text", function() {
                var selection = select(this);    // selection of node being transitioned
                return function(t) {
                    selection.text(Math.floor(interpolator(t)));
                };  // return value
            })
            .tween("attr", function() {
                var selection = select(this);    // selection of node being transitioned
                return function(t) {
                    selection.attr("y", endDim-10+((startDim-endDim)/(endYear - startYear ))*(endYear - interpolator(t)));
                };  // return value
            })
            .duration(durationSvg);

        MainYear.transition()
            .delay(durationSvg)
            .attr('opacity',0)
            .remove();

    const LeftLine = svg.append("rect")
        .attr('x', (WindowDimensions.width/2)-YearSpace)
        .attr('y', endDim+((startDim-endDim)/(endYear - startYear ))*(endYear - startYear))
        .attr('width',0)
        .attr('height',1)
        .attr('opacity',1)
        .attr('fill','#444')
        .transition().duration(startDelay).attr('width',LineLenght).attr('x', (WindowDimensions.width/2)-LineLenght-YearSpace)

        LeftLine.transition()
            .ease(easeLinear)
            .tween("attr", function() {
                var selection = select(this);    // selection of node being transitioned
                return function(t) {
                    selection.attr("y", endDim+((startDim-endDim)/(endYear - startYear ))*(endYear - interpolator(t)));
                };  // return value
            })
            .duration(durationSvg);

            // LeftLine.transition()
            // .delay(durationSvg)
            // .ease(easeExpOut)
            // .attr('x',(WindowDimensions.width/2)-LineLenght-YearSpace - 80 )

            LeftLine.transition()
            .delay(durationSvg)
            .attr('opacity',0)
            .remove();

    const RightLine = svg.append("rect")
        .attr('x', (WindowDimensions.width/2)+YearSpace)
        .attr('y', endDim+((startDim-endDim)/(endYear - startYear ))*(endYear - startYear))
        .attr('width',0)
        .attr('height',1)
        .attr('fill','#444')
        .attr('opacity',1)
        .transition().duration(startDelay).attr('width',LineLenght)

        RightLine.transition()
        .ease(easeLinear)
        .tween("attr", function() {
            var selection = select(this);    // selection of node being transitioned
            return function(t) {
                selection.attr("y", endDim+((startDim-endDim)/(endYear - startYear ))*(endYear - interpolator(t)));
            };  // return value
        })
        .duration(durationSvg);

        // RightLine.transition()
        //     .delay(durationSvg)
        //     .ease(easeExpOut)
        //     .attr('x',(WindowDimensions.width/2)+YearSpace+ 80 )

        RightLine.transition()
            .delay(durationSvg)
            .attr('opacity',0)
            .remove();




    const bulletRightLine = svg.append('circle')
        .attr('r', 5)
        .attr('cx', (WindowDimensions.width/2)+YearSpace)
        .attr('cy',endDim+((startDim-endDim)/(endYear - startYear ))*(endYear - startYear))
        .attr('fill','#444')
        .attr('opacity', 1)
        .transition().duration(startDelay).attr('opacity',1)

        bulletRightLine.transition()
        .ease(easeLinear)
        .tween("attr", function() {
            var selection = select(this);    // selection of node being transitioned
            return function(t) {
                selection.attr("cy", endDim+((startDim-endDim)/(endYear - startYear ))*(endYear - interpolator(t)));
            };  // return value
        })
        .duration(durationSvg);

        bulletRightLine.transition()
            .delay(durationSvg)
            .attr('opacity',0)
            .remove();



    const bulletLeftLine = svg.append('circle')
        .attr('r', 5)
        .attr('cx', (WindowDimensions.width/2)-YearSpace)
        .attr('cy',endDim+((startDim-endDim)/(endYear - startYear ))*(endYear - startYear))
        .attr('fill','#444')
        .attr('opacity', 1)
        .transition().duration(startDelay).attr('opacity',1)

        bulletLeftLine.transition()
        .ease(easeLinear)
        .tween("attr", function() {
            var selection = select(this); // selection of node being transitioned
            return function(t) {
                selection.attr("cy", endDim+((startDim-endDim)/(endYear - startYear ))*(endYear - interpolator(t)));
            };  // return value
        })
        .duration(durationSvg);

        bulletLeftLine.transition()
            .delay(durationSvg)
            .attr('opacity',0)
            .remove();


    const HeaderEducation = svg.append('text')
        .attr("x", (WindowDimensions.width/2)+(LineLenght/2)+YearSpace)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .style("fill", '#444')
        .attr('opacity', 0)
        .attr("y", endDim+((startDim-endDim)/(endYear - startYear ))*(endYear - startYear))
        .text("Education")
        .transition().duration(startDelay).attr('opacity', 1 ).attr("y", endDim-10+((startDim-endDim)/(endYear - startYear ))*(endYear - startYear))
        HeaderEducation.transition()
            .ease(easeLinear)
            .tween("attr", function() {
                var selection = select(this);    // selection of node being transitioned
                return function(t) {
                    selection.attr("y", endDim-10+((startDim-endDim)/(endYear - startYear ))*(endYear - interpolator(t)));
                };  // return value
            })
            .duration(durationSvg);

        HeaderEducation.transition()
            .delay(durationSvg)
            .ease(easeExpOut)
            .attr('x',(WindowDimensions.width/2)+YearSpace +  SectionBoxWidth/2)

    const HeaderExperience= svg.append('text')
        .attr("x", (WindowDimensions.width/2)-(LineLenght/2)-YearSpace)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .style("fill", '#444')
        .attr('opacity', 0)
        .attr("y", endDim+((startDim-endDim)/(endYear - startYear ))*(endYear - startYear))
        .text("Experience")
        .transition().duration(startDelay).attr('opacity', 1 ).attr("y", endDim-10+((startDim-endDim)/(endYear - startYear ))*(endYear - startYear))

        HeaderExperience.transition()
            .ease(easeLinear)
            .tween("attr", function() {
                var selection = select(this);    // selection of node being transitioned
                return function(t) {
                    selection.attr("y", endDim-10+((startDim-endDim)/(endYear - startYear ))*(endYear - interpolator(t)));
                };  // return value
            })
            .duration(durationSvg);

        HeaderExperience.transition()
            .delay(durationSvg)
            .ease(easeExpOut)
            .attr('x',(WindowDimensions.width/2)-YearSpace - SectionBoxWidth/2 )


    // Same for the y axis
    const x = d3.scaleLinear()
        .domain([0, WindowDimensions.width])
        .range([0, WindowDimensions.width]);


    const y = d3.scaleLinear()
        .domain([shapeheight,0])
        .range([shapeheight,0]);

    const line = d3.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    const proj = svg.selectAll(".proj")
        .data(Lines)
        .enter()
        .append("g")
        .attr("class", "proj");

        proj.append("path")
                        .attr("class", "line")
                        .attr("id" , function(d, i){
                            return "line" + i;
                        })
                        .attr("stroke-linecap","round")
                        .attr("d", function(d,i) {
                            return line(d.PathDi);
                            })
                        .style("stroke", '#444' );


        //Select All of the lines and process them one by one
        d3.selectAll(".line").each(function(d,i){

        // Get the length of each line in turn
        var totalLength = d3.select("#line" + i).node().getTotalLength();

        d3.selectAll("#line" + i).attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
                .ease(easeLinear)
                .duration(d => d.Du)
                .delay(d => d.De)
                .attr("stroke-dashoffset", 0)
                .style("stroke-width",3);
        })


    const Title = svg.selectAll('.section')
        .data(Lines)
        .join('text')
        .attr("class", "section")
        .attr("id", function(d,i){ return "section_"+i; })
        .attr("x", d => d.AncX )
        .attr("y", d => d.PathDi[0].y - 10 )
        .attr("text-anchor", d => d.AncText)
        .style("font-size", "15px")
        .style("fill", '#444')
        .attr('opacity', 0)
        .text(d => d.Ti)
        .transition()
            .ease(easeLinear)
            .delay(function(d, i) { return d.De })
            .duration(1000)
            .attr('opacity', 1 )
            .attr("y", d => d.PathDi[0].y - 5 )
        .transition()
            .ease(easeLinear)
            .duration(function(d, i) { return d.Du - 1000 })
            .attr("y", d => d.PathDi[1].y + 20 )
        .transition()
            .ease(easeBackOut.overshoot(1.43))
            .duration(2000)
            .attr("y", d => ((d.PathDi[1].y - d.PathDi[0].y)/2) +  d.PathDi[0].y )

    const DegreeGrade = svg.selectAll('.degree')
        .data(Lines)
        .join('text')
        .attr("class", "degree")
        .attr("x", d => d.AncX )
        .attr("y", d => ((d.PathDi[1].y - d.PathDi[0].y)/2) +  d.PathDi[0].y - 15 )
        .attr("text-anchor", d => d.AncText)
        .style("font-size", "13px")
        .style("fill", '#444')
        .text(d=>d.Degree)
        .attr('opacity', 0)
        .transition()
            .delay(durationSvg+startDelay*2)
            .duration(1000)
            .attr('opacity', 1)


    // filters go in defs element



    // const SectionDiv = svg.selectAll('.SectionBox')
    //     .data(Lines)
    //     .join("rect")
    //     .attr("class", "SectionBox")
    //     .attr('x', d => d.PathDi[1].x)
    //     .attr('y', d => d.PathDi[1].y)
    //     .attr('width',0)
    //     .attr("rx", 4)
    //     .style('fill','rgba(255, 255, 255, .7)')
    //     .style("filter", "url(#drop-shadow)")
    //     .attr('height', d => d.PathDi[0].y - d.PathDi[1].y)





    //     .on('mouseover', i => {
    //         console.log("#section_"+i)
    //         d3.select(this)
    //         .style('fill','rgba(189, 196, 204, .4)')

    //         d3.select("#section_"+i)
    //         .attr('opacity', 0)
    //     })
    //     .on('mouseout', function (d,i) {
    //         d3.select(this)
    //         .style('fill','rgba(255, 255, 255, .1)')

    //         console.log(d)

    //         d3.select("#section_"+i)
    //         .attr('opacity', 1)
    //     })
    //     .transition().delay(durationSvg+startDelay).duration(startDelay).attr('width',SectionBoxWidth).attr('x', d => d.XLRect)


    },[])
    return (

        <div className="MyJourney">
            <svg  height={WindowDimensions.height - (WindowDimensions.height * 0.2)} width={WindowDimensions.width} ref={svgRef} >
            </svg>
        </div>
    );
};

export default MyJourney;
