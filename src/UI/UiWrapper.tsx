import React from 'react';

function UiWrapper(props: any) {
  return (
    <>
      {Array.isArray(props.children) ? (
        props.children.map((child: any, i) => (
          <child.type key={i} {...props} {...child.props} />
        ))
      ) : (
        <props.children.type {...props} {...props.children.props} />
      )}
    </>
  );
}

export default UiWrapper;
