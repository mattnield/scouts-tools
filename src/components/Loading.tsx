import React from 'react';

type LoadingProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
  color?: string;
};

const Loading: React.FC<LoadingProps> = ({
  width = '100%',
  height = '100%',
  borderRadius = '8px',
  color = '#e0e0e0',
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: color,
        animation: 'pulse 1.5s infinite',
      }}
    />
  );
};

export default Loading;