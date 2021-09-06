import React from 'react';
import Modal from "./ModalWrapper";
import {createProfile, updateProfile} from "../../redux/actions/actions";
import {connect, useDispatch} from "react-redux";
import {get} from "lodash";
import {v4 as uuidv4} from "uuid";
import './modal.scss'
import '../../App.scss'
import {blankAva, calls, contact, eMail, Logo, webSite} from "../../assets/icons/icons";
import Avatar from "react-avatar";
import {useForm} from "react-hook-form";

const ModalForm = (props) => {
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const id = get(props, 'currentUser.id', uuidv4())

    const onSubmit = (data) => {
        !props.isUpdate ? dispatch(createProfile({...data, id: uuidv4()})) : dispatch(updateProfile(data, id))
    }

    const name = get(props, 'currentUser.name', '')
    const email = get(props, 'currentUser.email', '')
    const street = get(props, 'currentUser.address.street', '')
    const suite = get(props, 'currentUser.address.suite', '')
    const city = get(props, 'currentUser.address.city', '')
    const zip = get(props, 'currentUser.address.zipcode', '')
    const phone = get(props, 'currentUser.phone', '')
    const website = get(props, 'currentUser.website', '')
    const companyName = get(props, 'currentUser.company.name', '')
    const companyPhrase = get(props, 'currentUser.company.catchPhrase', '')

    return (
        <Modal>
            <form onSubmit={handleSubmit(onSubmit)} className="profileForm">
                <div className="profileForm__imgBg">
                    {name.length <= 0 ? <img src={blankAva} alt="" className="profileForm__imgBlank"/> :
                        <Avatar color="#b67d94" name={name} round="50%" className="profileForm__img"/>}
                </div>
                <div className="profileForm__body">
                    <input className="profileForm__name" type="text" placeholder="name"
                           defaultValue={name} {...register("name")}/>
                    <div className="profileForm__contacts">
                        <div className="profileForm__email">
                            <img src={eMail} alt=""/>
                            <input type="text" placeholder="email" defaultValue={email} {...register("email")}/>
                        </div>
                        <div className="profileForm__address">
                            <img src={contact} alt=""/>
                            <div>
                                <input type="text" placeholder="address line" defaultValue={street}
                                       {...register("address.street")}/>
                                <input type="text" placeholder="apt/suit/..." defaultValue={suite}
                                       {...register("address.suite")}/>
                                <input type="text" placeholder="city" defaultValue={city}
                                       {...register("address.city")}/>
                                <input type="text" placeholder="zip" defaultValue={zip}
                                       {...register("address.zipcode")}/>
                            </div>
                        </div>
                        <div className="profileForm__phone">
                            <img src={calls} alt=""/>
                            <input type="text" placeholder="phone" defaultValue={phone}
                                   {...register("phone")}/>
                        </div>
                        <div className="profileForm__website">
                            <img src={webSite} alt=""/>
                            <input type="text" placeholder="website" defaultValue={website}
                                   {...register("website")}/>
                        </div>
                    </div>
                    <div className="profileForm__companyInfo">
                        <img src={Logo} alt="Logo"/>
                        <div className="profileForm__companyTitle">
                            <input type="text" placeholder="company Name" defaultValue={companyName}
                                   {...register("company.name")}/>
                            <input type="text" placeholder="company phrase" defaultValue={companyPhrase}
                                   {...register("company.catchPhrase")}/>
                        </div>
                        <input type="submit" value="Ok" className="profileForm__Btn"/>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.profileReducer.currentUser,
        isUpdate: state.profileReducer.isUpdate
    }
}

export default connect(mapStateToProps)(ModalForm);
