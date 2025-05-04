import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function SummaryChart({ summary }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = 350; // Adjusted to match compact design
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 }; // Increased bottom margin for labels

    const data = [
      { name: 'Income', value: summary.total_income || 0 },
      { name: 'Expenses', value: summary.total_expenses || 0 },
      { name: 'Balance', value: summary.balance || 0 },
    ];

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.2); // Increased padding for better spacing

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    // X-axis with styled labels
    svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#333');

    // Y-axis with grid lines
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickFormat(d3.format('d')) // Ensure integer formatting
          .tickSize(-width + margin.left + margin.right) // Grid lines across the chart
      )
      .selectAll('.tick line')
      .style('stroke', '#e0e0e0')
      .style('stroke-opacity', 0.5);

    // Bars
    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth())
      .attr('fill', 'steelblue');
  }, [summary]);

  return <svg ref={ref}></svg>;
}

export default SummaryChart;