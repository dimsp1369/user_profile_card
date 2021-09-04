import React from 'react';
import {openForm} from "../../redux/actions/actions";
import {Add} from "../../assets/icons/icons";
import {useDispatch} from "react-redux";

const AddBtn = () => {
    const dispatch = useDispatch()
    return (
        <div className="formWrapper">
            <div onClick={() => dispatch(openForm(true))} className="form">
                <img src={Add} className="form__center" alt=""/>
            </div>
        </div>
    );
};

export default AddBtn;
