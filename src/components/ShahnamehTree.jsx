import React from 'react';
import Tree from 'react-d3-tree';
import treeData from '../data/shahnamehTreeData.json';

// رنگ اختصاصی برای هر سلسله یا نقش
const getNodeColor = node => {
  const s = node.attributes?.سلسله;
  if (s === 'پیشدادی') return '#E8B04A';
  if (s === 'کیانی') return '#6F9FD8';
  if (s === 'ساسانیان') return '#A056A2';
  if (node.name === 'پهلوانان سیستان') return '#4AAE81';
  return '#888';
};

// طراحی نود سفارشی شامل رنگ، نام و لقب
const renderCustomNode = ({ nodeDatum, toggleNode }) => {
  const color = getNodeColor(nodeDatum);
  return (
    <g>
      <circle
        r={18}
        fill={color}
        stroke="#222"
        strokeWidth={1.5}
        onClick={toggleNode}
      />
      <text fill="black" fontSize={12} textAnchor="middle" y={-25}>
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes?.لقب && (
        <text fill="#555" fontSize={10} textAnchor="middle" y={35}>
          {nodeDatum.attributes.لقب}
        </text>
      )}
    </g>
  );
};

export default function ShahnamehTree() {
  const containerStyles = {
    width: '100%',
    height: '100vh',
    direction: 'rtl',
    fontFamily: 'Vazir, Tahoma, sans-serif',
  };

  return (
    <div style={containerStyles}>
      <Tree
        data={treeData}
        orientation="vertical"
        renderCustomNodeElement={renderCustomNode}
        zoomable
        translate={{ x: window.innerWidth / 2, y: 100 }}
      />
    </div>
  );
}
