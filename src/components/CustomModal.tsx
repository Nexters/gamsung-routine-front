import styled from '@emotion/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import CustomText from '~/components/CustomText';
import { ActionColor, BackgroundColor, SurfaceColor, TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface Props {
  isVisible: boolean;
  onClose?: () => void;
  content?: string;
  subContent?: string;
  noneTitle?: boolean;
  modalImage?: React.ReactNode;
  leftButtonText?: string;
  onLeftButtonClick?: () => void;
  rightButtonText: string;
  onRightButtonClick: () => void;
  backgroundOpacity?: number;
  children?: React.ReactNode;
}

const CustomModal = ({
  isVisible,
  onClose,
  content,
  subContent,
  noneTitle = false,
  modalImage,
  leftButtonText,
  onLeftButtonClick,
  rightButtonText,
  onRightButtonClick,
  backgroundOpacity = 0.4,
  children,
}: Props) => {
  return (
    <Modal
      style={styles.modal}
      backdropOpacity={backgroundOpacity}
      isVisible={isVisible}
      onBackButtonPress={onClose}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}>
      <ModalStyled>
        <ModalImageStyled>{modalImage}</ModalImageStyled>
        <ModalContentView>
          <CustomText font={FontType.MEDIUM_BODY_01} color={TextColor.BLACK} align={Align.CENTER}>
            {content}
          </CustomText>
          <CustomText
            font={noneTitle ? FontType.MEDIUM_BODY_01 : FontType.REGULAR_BODY_02}
            color={TextColor.PRIMARY_L}
            align={Align.CENTER}>
            {subContent}
          </CustomText>
        </ModalContentView>
        <ModalButtonView>
          {leftButtonText && (
            <LeftButton onPress={onLeftButtonClick}>
              <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_L}>
                {leftButtonText}
              </CustomText>
            </LeftButton>
          )}
          <RightButton onPress={onRightButtonClick} only={!leftButtonText}>
            <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_D}>
              {rightButtonText}
            </CustomText>
          </RightButton>
        </ModalButtonView>
      </ModalStyled>
      {children}
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
  background-color: ${BackgroundColor.DEPTH1_L};
  border-radius: 20px;
`;

const ModalImageStyled = styled.View`
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 160px;
  position: absolute;
  top: -130px;
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
  overflow: hidden;
  bottom: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const LeftButton = styled.TouchableOpacity`
  width: 50%;
  justify-content: center;
  align-items: center;
  background-color: ${SurfaceColor.DEPTH2_L};
`;

const RightButton = styled.TouchableOpacity<{ only: boolean }>`
  width: ${({ only }) => (only ? '100%' : '50%')};
  justify-content: center;
  align-items: center;
  background-color: ${ActionColor.ACTIVE};
`;

export default CustomModal;
