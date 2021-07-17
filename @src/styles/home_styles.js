import styled from 'styled-components';
export const Container = styled.SafeAreaView`
  flex: 1;
  display: flex;
  background-color: white;
  position: relative;
`;
export const Header = styled.View`
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
`;
export const Controls = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;
export const ControlButton = styled.TouchableOpacity`
  margin-left: 20px;
`;
export const TabViewContainer = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 30px;
`;
export const BottomButton = styled.View`
  position: absolute;
  z-index: 9;
  padding-bottom: 25px;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
`;
export const TaskItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 30px;
  padding-left: 30px;
`;
