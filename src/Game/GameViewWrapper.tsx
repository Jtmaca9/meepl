import React from 'react';

export default function GameViewWrapper({
  children,
  ...props
}: { assets: any[] } & any) {
  const isCurrentPlayer = props.playerID === props.ctx.currentPlayer;
  return (
    <>
      {children.map((child: any) => (
        <child.type
          {...child.props}
          {...props}
          isCurrentPlayer={isCurrentPlayer}
        />
      ))}
    </>
  );
}
