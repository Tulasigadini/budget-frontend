import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function SummaryChart({ income, expenses }) {
  const svgRef = useRef();

  useEffect(() => {
    const data = [
      { category: 'Income', value: income },
      { category: 'Expenses', value: expenses },
    ];

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.category))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) * 1.2])
      .range([height, 0]);

    // Add bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#4682b4');

    // Add Y-axis
    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('d')));

    // Add X-axis with category labels
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#333');
  }, [income, expenses]);

  return <svg ref={svgRef}></svg>;
}

export default SummaryChart;