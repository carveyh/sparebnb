import SignupForm from "./SignupForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";

const SignupFormModal = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div onClick={e => setShowModal(true)}>Sign up</div>
			{showModal && <Modal onClose={e => setShowModal(false)}>
				<SignupForm />
			</Modal>}
		</>
	)
}

export default SignupFormModal;