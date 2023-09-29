import React from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

const PieceImage = styled.Image`
  height: 100%;
  width: 100%;
`;

function PieceAsset({ pieceCurrAsset, pieceData }) {
  if (pieceCurrAsset.type === 'img') {
    return (
      <PieceImage source={pieceCurrAsset.source} {...pieceData.assetProps} />
    );
  }
  if (pieceCurrAsset.type === 'lottie') {
    return (
      <LottieView
        source={pieceCurrAsset.source}
        autoPlay
        loop
        {...pieceData.assetProps}
      />
    );
  }
  return null;
}

export default PieceAsset;
