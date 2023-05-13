import _ from 'lodash';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Text } from '@react-pdf/renderer';

function Words({ str, e, tag, style, defaultStyle, Component = Text }) {
  const wtag =
    e.type == 'nowrap'
      ? str
          .slice(e.start, e.end)
          .slice(tag.length + 2 + (e.data || '').length, -1 * (tag.length + 3))
      : str.slice(e.start, e.end);
  const ar = wtag.split(' ');

  const res = ar.map((e, i) => e + (i == ar.length - 1 ? '' : ' '));

  const props =
    e?.data?.length > 0
      ? e.data
          .split(' ')
          .filter(e => e.length > 0)
          .map(e => e.split('='))
          .reduce((res, e) => ({ ...res, [e[0]]: JSON.parse(e[1]) }), {})
      : {};

  return (
    <>
      {res.map((v, i) =>
        e.type == 'nowrap' ? (
          <Component style={style} key={i} {...props}>
            {v}
          </Component>
        ) : (
          <Text style={defaultStyle} key={i}>
            {v}
          </Text>
        ),
      )}
    </>
  );
}

export function Paragraph(props) {
  const { str, style = {}, defaultStyle = {}, tag = 'bold' } = props;
  const rex = new RegExp(`<${tag}(.*?)>.*?</${tag}>`, 'g');
  const res = [];
  let lastIdx = 0;
  let match;
  while ((match = rex.exec(str)) !== null) {
    if (lastIdx != match.index) {
      res.push({ start: lastIdx, end: match.index, type: 'wrap' });
    }
    res.push({
      start: match.index,
      end: rex.lastIndex,
      type: 'nowrap',
      data: match[1],
    });
    lastIdx = rex.lastIndex;
  }
  if (lastIdx != str.length) {
    res.push({ start: lastIdx, end: str.length, type: 'wrap' });
  }
  return (
    <>
      {res.map((e, i) => (
        <Words key={i} e={e} {...props} />
      ))}
    </>
  );
}
