import styled from '@emotion/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import CustomText from '~/components/CustomText';
import { TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface Props {
  isVisible: boolean;
  onClose?: () => void;
  content: string;
  leftButtonText?: string;
  onLeftButtonClick?: () => void;
  rightButtonText: string;
  onRightButtonClick: () => void;
}

const CustomModal = ({
  isVisible,
  onClose,
  content,
  leftButtonText,
  onLeftButtonClick,
  rightButtonText,
  onRightButtonClick,
}: Props) => {
  return (
    <Modal
      style={styles.modal}
      backdropOpacity={0.4}
      isVisible={isVisible}
      onBackButtonPress={onClose}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}>
      <ModalStyled>
        <ModalContentView>
          <CustomText font={FontType.REGULAR_BODY_01} color={TextColor.PRIMARY} align={Align.CENTER}>
            {content}
          </CustomText>
        </ModalContentView>
        <ModalButtonView>
          {leftButtonText && (
            <LeftButton onPress={onLeftButtonClick}>
              <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY}>
                {leftButtonText}
              </CustomText>
            </LeftButton>
          )}
          <RightButton onPress={onRightButtonClick} only={!leftButtonText}>
            <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.WHITE}>
              {rightButtonText}
            </CustomText>
          </RightButton>
        </ModalButtonView>
      </ModalStyled>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
});

const ModalStyled = styled.View`
  width: 256px;
  height: 216px;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  border-radius: 20px;
`;

const ModalContentView = styled.View`
  width: 100%;
  height: 168px;
  justify-content: center;
  align-items: center;
`;

const ModalButtonView = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
`;

const LeftButton = styled.TouchableOpacity`
  width: 50%;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f4;
`;

const RightButton = styled.TouchableOpacity<{ only: boolean }>`
  width: ${({ only }) => (only ? '100%' : '50%')};
  justify-content: center;
  align-items: center;
  background-color: #5f4bf2;
`;

export default CustomModal;
