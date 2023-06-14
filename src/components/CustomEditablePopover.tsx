import React from 'react';

import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { useTopicConfigMutation } from 'hooks/services/useTopicConfigMutation';

export interface CustomEditablePopoverProp {
  topicName: string;
  configKey: string;
  value: string | undefined;
  refetch: any;
}

export const CustomEditablePopover = ({
  topicName,
  configKey,
  value,
  refetch,
}: CustomEditablePopoverProp) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useTopicConfigMutation(topicName);

  const onButtonClickedEdit = () => {
    mutate(
      { key: configKey, value: inputRef.current?.value },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
    onClose();
  };

  const onClickedButtonOpen = () => {
    onOpen();
  };

  return (
    <>
      <IconButton
        icon={<EditIcon />}
        size="xs"
        bgColor="#f27a1a"
        _hover={{ bg: '#f59547' }}
        color="white"
        aria-label="edit"
        onClick={onClickedButtonOpen}></IconButton>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
        scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent>
          <ModalHeader>{configKey}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              ref={inputRef}
              mt="6px"
              size="sm"
              defaultValue={value}
              style={{ width: '500px' }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onButtonClickedEdit}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
