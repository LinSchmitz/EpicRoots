import React from 'react';
import { FamilyTree } from 'family-chart';

import data from '../data/shahnamehFamilyData.json';

const nodeTemplate = ({ data }) => {
  // رنگ بر اساس سلسله یا ویژگی ها
  let bgColor = '#888';
  if (data.attributes?.سلسله) {
    switch (data.attributes.سلسله) {
      case 'پیشدادی':
        bgColor = '#E8B04A';
        break;
      case 'کیانی':
        bgColor = '#6F9FD8';
        break;
      case 'ساسانیان':
        bgColor = '#A056A2';
        break;
    }
  } else if (data.attributes?.منطقه === 'سیستان') {
    bgColor = '#4AAE81';
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: '8px 14px',
        borderRadius: 8,
        border: '1px solid #444',
        cursor: 'pointer',
        minWidth: 120,
        textAlign: 'center',
        fontFamily: 'Vazir, Tahoma, sans-serif',
        userSelect: 'none',
      }}
      title={data.name}
    >
      <div style={{ fontWeight: 'bold', fontSize: 14 }}>{data.name}</div>
      {data.attributes?.لقب && (
        <div style={{ fontSize: 11, color: '#222' }}>{data.attributes.لقب}</div>
      )}
      {data.attributes?.نقش && (
        <div style={{ fontSize: 11, color: '#222' }}>{data.attributes.نقش}</div>
      )}
      {data.attributes?.منطقه && (
        <div style={{ fontSize: 11, color: '#222' }}>
          {data.attributes.منطقه}
        </div>
      )}
      {data.attributes?.ویژگی && (
        <div style={{ fontSize: 11, color: '#222' }}>
          {data.attributes.ویژگی}
        </div>
      )}
      {data.attributes?.زمان && (
        <div style={{ fontSize: 11, color: '#222' }}>
          {data.attributes.زمان}
        </div>
      )}
    </div>
  );
};

export default function ShahnamehFamilyChart() {
  return (
    <div style={{ width: '100%', height: '100vh', direction: 'rtl' }}>
      <FamilyTree
        data={data}
        nodeTemplate={nodeTemplate}
        draggable
        zoomable
        zoom={1}
        showID={false}
      />
    </div>
  );
}
