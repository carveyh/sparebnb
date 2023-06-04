import LoginForm from "./LoginForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";

const LoginFormModal = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div onClick={e => setShowModal(true)}>Log in</div>
			{showModal && <Modal onClose={e => setShowModal(false)}>
				<LoginForm />
			</Modal>}
		</>
	)
}

export default LoginFormModal;