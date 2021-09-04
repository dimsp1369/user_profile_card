import React from 'react';
import {get} from 'lodash'
import "../App.scss"
import Avatar from 'react-avatar';
import {useDispatch} from "react-redux";
import {openForm} from "../redux/actions/actions";
import {calls, contact, webSite, eMail, Edit, Logo} from "../assets/icons/icons";


const UserProfileCard = (props) => {
    const dispatch = useDispatch()

    const name = get(props, 'initialValue.name', '')
    const email = get(props, 'initialValue.email', '')
    const phone = get(props, 'initialValue.phone', '')
    const website = get(props, 'initialValue.website', '')
    const image = get(props, 'initialValue.image', '')
    const companyName = get(props, 'initialValue.company.name', '')
    const companyPhrase = get(props, 'initialValue.company.catchPhrase', '')
    const addressStreet = get(props, 'initialValue.address.street', '')
    const addressSuite = get(props, 'initialValue.address.suite', '')
    const addressCity = get(props, 'initialValue.address.city', '')
    const addressZip = get(props, 'initialValue.address.zipcode', '')
    return (
        <div className="card">
            <div className="card__imgBg">
                {image.length <= 0 ? <Avatar color="#b67d94" name={name} round="50%" className="card__avatar"/> :
                    <img src={image} alt="userPhoto" className="card__img"/>}
                <img src={Edit} className="card__edit"
                     onClick={() => dispatch(openForm(true, true, props.initialValue))}
                     alt='edit'/>
            </div>
            <div className="card__body">
                <div className="card__name">
                    {name}
                </div>
                <div className="card__contacts">
                    <div className="card__email">
                        <img src={eMail} alt=""/>
                        <h4>{email}</h4>
                    </div>
                    <div className="card__address">
                        <img src={contact} alt=""/>
                        <h4>{`${addressStreet}, ${addressSuite}, ${addressCity}, ${addressZip}`}</h4>
                    </div>
                    <div className="card__phone">
                        <img src={calls} alt=""/>
                        <h4>{phone}</h4>
                    </div>
                    <div className="card__website">
                        <img src={webSite} alt=""/>
                        <h4>{website}</h4>
                    </div>
                </div>
                <div className="card__companyInfo">
                    <img src={Logo} alt="Logo"/>
                    <div className="card__companyTitle">
                        <h4>{companyName}</h4>
                        <h4>{companyPhrase}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;

