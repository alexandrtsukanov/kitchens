'use client';

import { Modal as ModalDefault } from "@heroui/react";
import { ReactNode } from "react";

interface IProps {
    isOpen: boolean;
    onOpenChange: () => void;
    children: ReactNode;
    closeButton?: string;
    actionButton?: string;
    header: string;
}

const Modal = ({ isOpen, onOpenChange, children, closeButton, actionButton, header }: IProps) => {
    return (
        <ModalDefault isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalDefault.Backdrop>
                <ModalDefault.Container>
                    <ModalDefault.Dialog>
                        <ModalDefault.CloseTrigger />

                        <ModalDefault.Header>
                            <ModalDefault.Heading className="text-xl font-semibold">{header}</ModalDefault.Heading>
                        </ModalDefault.Header>

                        <ModalDefault.Body>{children}</ModalDefault.Body>

                        {!!closeButton && <ModalDefault.Footer>{closeButton}</ModalDefault.Footer>}
                    </ModalDefault.Dialog>
                </ModalDefault.Container>
            </ModalDefault.Backdrop>
        </ModalDefault>
    );
};

export default Modal;
