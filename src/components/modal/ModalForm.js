import React, {useState} from 'react';
import Modal from "./ModalWrapper";
import {createProfile, updateProfile} from "../../redux/actions/actions";
import {connect, useDispatch} from "react-redux";
import {get} from "lodash";
import {v4 as uuidv4} from "uuid";
import './modal.scss'
import '../../App.scss'
import {blankAva, calls, contact, eMail, Logo, webSite} from "../../assets/icons/icons";
import Avatar from "react-avatar";

const ModalForm = (props) => {
    const dispatch = useDispatch()
    const id = get(props, 'currentUser.id', uuidv4())

    const [name, setName] = useState(get(props, 'currentUser.name', ''))
    const [email, setEmail] = useState(get(props, 'currentUser.email', ''))
    const [street, setStreet] = useState(get(props, 'currentUser.address.street', ''))
    const [suite, setSuite] = useState(get(props, 'currentUser.address.suite', ''))
    const [city, setCity] = useState(get(props, 'currentUser.address.city', ''))
    const [zip, setZip] = useState(get(props, 'currentUser.address.zipcode', ''))
    const [phone, setPhone] = useState(get(props, 'currentUser.phone', ''))
    const [website, setWeb] = useState(get(props, 'currentUser.website', ''))
    const [companyName, setCompanyName] = useState(get(props, 'currentUser.company.name', ''))
    const [companyPhrase, setCompanyPhrase] = useState(get(props, 'currentUser.company.catchPhrase', ''))

    let data = {
        id,
        name,
        email,
        phone,
        website,
        company: {
            name: companyName,
            catchPhrase: companyPhrase,
        },
        address: {
            street,
            suite,
            city,
            zipcode: zip
        },
        image: ''
    }

    return (
        <Modal>
            <div className="profileForm">
                <div className="profileForm__imgBg">
                    {name.length <= 0 ? <img src={blankAva} alt="" className="profileForm__imgBlank"/> :
                        <Avatar color="#b67d94" name={name} round="50%" className="profileForm__img"/>}
                </div>
                <div className="profileForm__body">
                    <input className="profileForm__name" type="text" placeholder="name" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                    <div className="profileForm__contacts">
                        <div className="profileForm__email">
                            <img src={eMail} alt=""/>
                            <input type="text" placeholder="email" value={email}
                                   onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="profileForm__address">
                            <img src={contact} alt=""/>
                            <div>
                            <input type="text" placeholder="address line" defaultValue={street}
                                   onChange={e => setStreet(e.target.value)}/>
                            <input type="text" placeholder="apt/suit/..." defaultValue={suite}
                                   onChange={e => setSuite(e.target.value)}/>
                            <input type="text" placeholder="city" defaultValue={city}
                                   onChange={e => setCity(e.target.value)}/>
                            <input type="text" placeholder="zip" defaultValue={zip}
                                   onChange={e => setZip(e.target.value)}/>
                            </div>
                        </div>
                        <div className="profileForm__phone">
                            <img src={calls} alt=""/>
                            <input type="text" placeholder="phone" defaultValue={phone}
                                   onChange={e => setPhone(e.target.value)}/>
                        </div>
                        <div className="profileForm__website">
                            <img src={webSite} alt=""/>
                            <input type="text" placeholder="website" defaultValue={website}
                                   onChange={e => setWeb(e.target.value)}/>
                        </div>
                    </div>
                    <div className="profileForm__companyInfo">
                        <img src={Logo} alt="Logo"/>
                        <div className="profileForm__companyTitle">
                            <input type="text" placeholder="company Name" defaultValue={companyName}
                                   onChange={e => setCompanyName(e.target.value)}/>
                            <input type="text" placeholder="company phrase" defaultValue={companyPhrase}
                                   onChange={e => setCompanyPhrase(e.target.value)}/>
                        </div>
                        <button className="profileForm__Btn" onClick={() => {
                            !props.isUpdate ? dispatch(createProfile(data)) : dispatch(updateProfile(data, id))
                        }}>Ok
                        </button>
                    </div>
                </div>
            </div>
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
