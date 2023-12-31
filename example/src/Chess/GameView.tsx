// import React, { useState } from 'react';
// import {
//   Table,
//   Board,
//   BottomPanel,
//   useGameState,
//   UI,
//   ZoneAndPieceRenderer,
// } from 'meepl';
// import styled from 'styled-components/native';
// import { isZoneAvailable } from './gameLogic';
// const Text = styled.Text`
//   font-size: 20px;
//   font-weight: bold;
//   color: #333;
// `;

// export default function Game(props) {
//   const {
//     zones,
//     pieces,
//     moves,
//     meta,
//     players,
//     setTableTransform,
//     tableTransform,
//   } = useGameState(props);

//   const availableStyle = {
//     backgroundColor: 'rgba(0, 0, 200, 0.5)',
//   };

//   const [activePieceID, setActivePieceID] = useState(null);

//   return null;
//   <Table tableWidth={400} tableHeight={400}>
//     <Board height={400} width={400} asset={'Chessboard'} />
//     <ZoneAndPieceRenderer
//       isZoneAvailable={(args) => isZoneAvailable(activePieceID, args)}
//       availableStyle={availableStyle}
//       onHandleZonePress={(targetZoneId) => {
//         moves.movePiece(activePieceID, targetZoneId);
//         setActivePieceID(null);
//       }}
//       isPieceDraggable={() => true}
//       onDragPieceStart={(id) => setActivePieceID(id)}
//       onSelectedPiece={(id) => setActivePieceID(id)}
//       onDragPieceEnd={(_, targetZoneId) => {
//         moves.movePiece(activePieceID, targetZoneId);
//         setActivePieceID(null);
//       }}
//       legalPieceDragCheck={(targetZoneID) =>
//         isZoneAvailable(activePieceID, {
//           id: targetZoneID,
//           activePlayer: players[meta.currentPlayerID],
//           pieces,
//           zones,
//         })
//       }
//     />
//   </Table>
//   <UI>
//     <BottomPanel height={60}>
//       <Text>
//         {players[meta.currentPlayerID].name}'s turn! {'\n'} Active Piece:{' '}
//         {players[meta.currentPlayerID].activePiece}
//       </Text>
//     </BottomPanel>
//   </UI>
// }
