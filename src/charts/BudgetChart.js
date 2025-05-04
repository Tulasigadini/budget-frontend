import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function BudgetChart({ budget, expenses }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const data = [
      { name: 'Budget', value: budget },
      { name: 'Expenses', value: expenses },
      { name: 'Remaining', value: budget - expenses },
    ];

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

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
  }, [budget, expenses]);

  return <svg ref={ref}></svg>;
}

export default BudgetChart;