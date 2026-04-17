import Modal from "../UI/modal";
import LoginForm from "@/forms/loginForm";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: IProps) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} header="Log in">
            <LoginForm />
        </Modal>
    );
};

export default LoginModal;
