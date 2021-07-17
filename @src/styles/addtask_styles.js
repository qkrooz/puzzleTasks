import styled from 'styled-components';
export const Field = styled.View`
  padding: 0 15px 15px 15px;
  flex-grow: 1;
`;
export const FieldHeader = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;
export const FieldInput = styled.TextInput`
  background-color: #f9f9f8;
  border-radius: 10px;
  padding-left: 10px;
  height: 60px;
`;
export const FakeFieldInput = styled.View`
  width: 100%;
  background-color: #f9f9f8;
  border-radius: 10px;
  padding-left: 10px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
