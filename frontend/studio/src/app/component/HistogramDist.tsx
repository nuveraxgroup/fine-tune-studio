import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
const BUCKET_NUMBER = 10;
const BUCKET_PADDING = 1;

type HistogramDistProps = {
  width: number;
  height: number;
  data: number[];
  median: number
};

export const HistogramDist = ({ width, height, data, median }: HistogramDistProps) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = useMemo(() => {
    const max = Math.max(...data);
    return d3
      .scaleLinear()
      .domain([0, max + 2]) // note: limiting to 1000 instead of max here because of extreme values in the dataset
      .range([0, boundsWidth]);
  }, [data, width]);

  const buckets = useMemo(() => {
    const domain = xScale.domain()
    const bucketGenerator = d3
      .bin()
      .value((d) => d)
      .domain([domain[0], domain[1]])
      .thresholds(xScale.ticks(BUCKET_NUMBER));
    return bucketGenerator(data);
  }, [xScale]);

  const yScale = useMemo(() => {
    const max = Math.max(...buckets.map((bucket) => bucket?.length));
    return d3
      .scaleLinear()
      .range([boundsHeight, 0])
      .domain([0, max])
      // .nice();
  }, [data, height]);

  // Render the X axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
    const yDomain = yScale.domain()
    svgElement
      .append("line")
      .attr("x1", xScale(median) )
      .attr("x2", xScale(median) )
      .attr("y1", yScale(yDomain[0]))
      .attr("y2", yScale(yDomain[1]))
      .attr("stroke", "grey")
      .attr("stroke-dasharray", "4")
    svgElement
      .append("text")
      .attr("x", xScale(median))
      .attr("y", yScale(yDomain[1] - 0.1))
      .text(`Median: ${median}`)
      .style("font-size", "12px")
  }, [xScale, yScale, boundsHeight]);

  const allRects = buckets.map((bucket, i) => {
    return (
      <rect
        key={i}
        fill="#69b3a2"
        x={xScale(bucket.x0!!) + BUCKET_PADDING / 2}
        width={xScale(bucket.x1!!) - xScale(bucket.x0!!) - BUCKET_PADDING}
        y={yScale(bucket.length)}
        height={boundsHeight - yScale(bucket.length)}
      />
    );
  });

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allRects}
      </g>
      <g
        width={boundsWidth}
        height={boundsHeight}
        ref={axesRef}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      />
    </svg>
  );
};
