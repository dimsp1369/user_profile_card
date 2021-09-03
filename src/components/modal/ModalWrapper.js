import React from 'react';
import './modal.scss'
import '../../App.scss'
import {connect, useDispatch} from "react-redux";
import {openForm} from "../../redux/actions/actions";

const ModalWrapper = (props) => {
    const dispatch = useDispatch()

    return (
        <div className={props.isFormOpen ? "modal active" : "modal"}
             onClick={() => dispatch(openForm(false))}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isFormOpen: state.profileReducer.isFormOpen,
    }
}

export default connect(mapStateToProps)(ModalWrapper);
