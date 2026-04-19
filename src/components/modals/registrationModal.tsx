import RegistrationForm from "@/components/forms/registrationForm";
import Modal from "../UI/modal";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: IProps) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} header="Sign up">
            <RegistrationForm onClose={onClose} />
        </Modal>
    );
};

export default RegistrationModal;
