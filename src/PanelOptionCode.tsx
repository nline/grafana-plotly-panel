// Code from https://github.com/gapitio/gapit-htmlgraphics-panel
import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { CodeEditor } from '@grafana/ui';
import AutoSizer from 'react-virtualized-auto-sizer';

interface Props extends StandardEditorProps<string, any, any> {}

export const PanelOptionCode: React.FC<Props> = ({ value, item, onChange }) => {
  if (typeof value !== 'string') {
    value = JSON.stringify(value, null, 2);
  }
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <CodeEditor
          language={item.settings?.language}
          showLineNumbers={item.settings?.language === 'javascript' ? true : false}
          value={value === 'null' ? JSON.stringify(item.settings?.initValue, null, 2) : value}
          width={width}
          height="50vh"
          onBlur={(code) => {
            if (item.settings?.language === 'json' && code) {
              code = JSON.parse(code);
            }
            onChange(code);
          }}
        />
      )}
    </AutoSizer>
  );
};
