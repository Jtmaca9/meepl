import React from 'react';

export default function GameViewWrapper({
  children,
  ...props
}: { assets: any[] } & any) {
  return (
    <>
      {children.map((child: any) => (
        <child.type {...child.props} {...props} />
      ))}
    </>
  );
}
