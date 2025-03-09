import DonutChart from './DonutChart';

export default {
  component: DonutChart,
  title: 'DonutChart',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  decorators: [(story) => <div style={{ marginInline: 'auto', maxWidth: '40%' }}>{story()}</div>],
};

export const Default = {
  args: {
    data: [
      { color: 'purple', id: 0, label: 'Food', percentage: 30 },
      { color: 'orange', id: 1, label: 'Travel', percentage: 20 },
      { color: 'gray', id: 2, label: 'General', percentage: 20 },
      { color: 'aqua', id: 3, label: 'Entertainment', percentage: 15 },
      { color: 'blue', id: 4, label: 'Other', percentage: 10 },
      { color: 'tomato', id: 5, label: 'Social', percentage: 5 },
    ],
  },
};
