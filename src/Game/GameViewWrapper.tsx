import React from 'react';

export default function GameViewWrapper({
  children,
  ...props
}: { assets: any[] } & any) {
  return (
    <>
      {children.map((child: any, i) => (
        <child.type {...child.props} key={`${child.type}-${i}`} {...props} />
      ))}
    </>
  );
}
