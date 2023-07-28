import { ModalPropsType } from '../types';

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function Modal({ basicModal, setBasicModal, title, description }: ModalPropsType) {

  return (
    <>
      <MDBModal tabIndex='-1' show={basicModal} setShow={setBasicModal} className='' >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setBasicModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p style={{ textAlign: 'center' }}>
                {description}
              </p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setBasicModal(false)}>
                Shut up
              </MDBBtn>
              <MDBBtn onClick={() => window.location.reload()}>Play Again</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
