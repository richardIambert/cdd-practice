import { motion } from 'motion/react';
import PropTypes from 'prop-types';

const DonutChart = ({ className = '', data = [] }) => {
  // Sort data by percentage descending
  const percentageDescending = (a, b) => b.percentage - a.percentage;

  // Calculate dynamic SVG information and append to data
  const addSVGProperties = (current, index, array) => {
    const { percentage } = current;
    const firstOffset = array[0].percentage - 2;
    const previousPercentagesSum = array
      .slice(0, index)
      .reduce((result, { percentage }) => result + percentage, 0);
    return {
      ...current,
      strokeDasharray: [percentage - 3, 100 - (percentage - 3)],
      strokeDashoffset: index ? 100 - previousPercentagesSum + firstOffset : percentage - 2,
    };
  };

  // Create ring segments from data
  const createRingSegments = ({ color, id, percentage, strokeDasharray, strokeDashoffset }) => (
    <motion.circle
      key={id}
      // A circumference of 100 makes percentage calculations easier, hence radius is 100 / 2π = 15.9145...
      r="15.915494309189533"
      cx="21"
      cy="21"
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2}
      strokeDashoffset={strokeDashoffset}
      initial={{ strokeDasharray: '0 100' }}
      animate={{ strokeDasharray: `${strokeDasharray[0]} ${strokeDasharray[1]}` }}
      // Transition duration is inversely proportional to percentage so animations complete at the same time
      transition={{ duration: 0.6 * (1 - percentage / 100) }}
    />
  );

  // Build ring segments form data
  const ringSegments = data
    .toSorted(percentageDescending)
    .map(addSVGProperties)
    .map(createRingSegments);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="none"
      viewBox="0 0 42 42"
      className={`aspect-square ${className}`}
    >
      {ringSegments}
    </svg>
  );
};

DonutChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      label: PropTypes.string,
      percentage: PropTypes.number.isRequired,
    })
  ),
};

export default DonutChart;
