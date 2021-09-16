import React from 'react';
import Sheet from 'react-modal-sheet';

// Accepted Props
// isModalOpen -> is the primary modal open
// isSubmodalOpen -> is the submodal open
// modalHeaderContent -> a react view that will present inside the main modal's header
// modalContent -> the main modal's content
// submodalContent -> the submodal's content
// onModalClose -> A function which executes when the main modal is closed
// onSubmodalClose -> A function which executes when the main modal is closed

// SAMPLE CASE:
/*
<BottomModal
  isModalOpen={true}
  isSubmodalOpen={true}
  modalContent={<h1>Test</h1>}
  submodalContent={<h1>Test2</h1>}
  onModalClose={() => { console.log("Attempted to close main ") }}
  onSubmodalClose={() => { console.log("Closed submodal") }}
/>
  */
// export default class BottomModal extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = { // this state isn't needed, state is maintined in the parent component
//       isModalOpen: this.props.isModalOpen || false,
//       isSubmodalOpen: this.props.isSubmodalOpen || false,
//     }
//   }

//   render() {
    // changed isOpen to this.props from this.state in modal and submodal. using this.state as a prop prevents re-rendering on prop changes.

export default (props) => {
  return (
    <div>
      {/* Modal */}
      {/* <Sheet isOpen={this.props.isModalOpen} onClose={() => { this.props.onModalClose(); }} snapPoints={[0.33, 0.1]}>
        <Sheet.Container>
          <Sheet.Header>{this.props.modalHeaderContent}</Sheet.Header>.
          <Sheet.Content>{this.props.modalContent || <h1>No Content Present</h1>}</Sheet.Content>
        </Sheet.Container>
      </Sheet > */}

      {/* Submodal */}
      <Sheet disableDrag={true} isOpen={props.isModalOpen} onClose={() => {}} snapPoints={[0.28]}>
        <Sheet.Container>
          <Sheet.Header>
            <div style={{ marginLeft: '95%', width: "100%" }}>
              <h1 onClick={() => props.onModalClose()}>{'\u2715'}</h1>
            </div>
          </Sheet.Header>
          {/* <Sheet.Header>{props.modalHeaderContent}</Sheet.Header> */}
          <Sheet.Content>
            {props.modalContent || <h1>No Content Present</h1>}
          </Sheet.Content>
        </Sheet.Container>
      </Sheet >
    </div >
  );
}
// }