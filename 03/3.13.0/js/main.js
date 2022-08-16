/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.10 - Axes and labels
*/

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X label
g.append("text")
      .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 110)
  .text("Months")

// Y label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -60)
  .attr("transform", "rotate(-90)")
  .text("Profit ($)")

// d3.json("data/buildings.json").then(data => {
d3.csv("data/revenues.csv").then(data => {
  data.forEach(d => {
    console.log(d)
    d.name = d.month
    d.height = Number(d.profit)
  })

  const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2)
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.height)])
    .range([HEIGHT, 0])

  const xAxisCall = d3.axisBottom(x)
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(xAxisCall)
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")

  const yAxisCall = d3.axisLeft(y)
    .ticks(10)
    .tickFormat(d => "$" + d )
  g.append("g")
    .call(yAxisCall)

  const rects = g.selectAll("rect")
    .data(data)
  
  rects.enter().append("rect")
    .attr("y", d => y(d.revenue))
    .attr("x", (d) => x(d.name))
    .attr("width", 20)
    .attr("height", d => HEIGHT - y(d.revenue))
    .attr("fill", "grey")

    const rects2 = g.selectAll("rect2")
    .data(data)
    rects2.enter().append("rect")
    .attr("y", d => y(d.profit))
    .attr("x", (d) => x(d.name) + 20)
    .attr("width", 20)
    .attr("height", d => HEIGHT - y(d.profit))
    .attr("fill", "red")

})