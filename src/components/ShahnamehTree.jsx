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

const renderCustomNode = ({ nodeDatum, toggleNode }) => {
  const color = getNodeColor(nodeDatum);

  const spouseText = nodeDatum.spouse?.name
    ? `همسر: ${nodeDatum.spouse.name}`
    : null;
  const daughtersTexts = Array.isArray(nodeDatum.daughters)
    ? nodeDatum.daughters.map(d => `دختر: ${d.name}`)
    : [];

  const extraTexts = [];
  if (nodeDatum.attributes?.لقب) extraTexts.push(nodeDatum.attributes.لقب);
  if (spouseText) extraTexts.push(spouseText);
  extraTexts.push(...daughtersTexts);

  return (
    <g>
      <circle
        r={18}
        fill={color}
        stroke="#222"
        strokeWidth={1.5}
        onClick={toggleNode}
      />
      {/* نام اصلی */}
      <text fill="black" fontSize={12} textAnchor="middle" y={-10}>
        {nodeDatum.name}
      </text>

      {/* لقب، همسر، دخترها در یک خط */}
      <text fill="#555" fontSize={10} textAnchor="middle" y={10}>
        {extraTexts.map((txt, idx) => (
          <tspan
            key={idx}
            x={idx * 80} // فاصله افقی هر قسمت (میتوانی تنظیم کنی)
            style={{
              fontStyle:
                txt.startsWith('همسر') || txt.startsWith('دختر')
                  ? 'italic'
                  : 'normal',
              fill: txt.startsWith('همسر')
                ? '#C55'
                : txt.startsWith('دختر')
                ? '#AA55AA'
                : '#555',
            }}
          >
            {txt}
          </tspan>
        ))}
      </text>
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
        scaleExtent={{ min: 0.5, max: 3 }}
        translate={{ x: window.innerWidth / 2, y: 100 }}
      />
    </div>
  );
}
