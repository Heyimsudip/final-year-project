import {Modal} from 'antd'

const CitizenshipModal = ({u, showModal, setShowModal}) => {
    return (
        <Modal visible={showModal}
            width={500}
            title="Citizenship Photo" 
            onCancel={() =>setShowModal(!showModal)}>
            <img 
                    src={`${process.env.REACT_APP_API}/user-details/citizenshipimage/${u._id}`}
                    alt='default hotel'
                    className="card-image img img-fluid rounded"  />
        </Modal>
    )
}

export default CitizenshipModal;