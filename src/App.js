import React, {useEffect, useState} from 'react';
import AddBtn from "./components/utils/AddBtn";
import UserProfileCard from "./components/UserProfileCard";
import {v4 as uuidv4} from "uuid";
import ModalWrapper from "./components/modal/ModalForm";
import Pagination from "./components/utils/pagination";
import {connect, useDispatch} from "react-redux";
import {getUser} from "./redux/actions/asyncActions";
import Loader from "./components/utils/Loader";
import {paginate} from "./redux/actions/actions";

const App = (props) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getUser(setIsLoading))
    }, [dispatch])

    useEffect(() => {
        dispatch(paginate())
    }, [dispatch, props.users])

    if (isLoading) return <Loader/>

    return (
        <>
            <AddBtn/>
            <div className="wrapper">
                {props.currentCards.map((card, index) => <UserProfileCard key={uuidv4()} initialValue={card}
                                                                    index={index}/>)}
            </div>
            <Pagination/>
            {props.isFormOpen && <ModalWrapper/>}

        </>
    );
};
const mapStateToProps = (state) => {
    return {
        currentCards: state.profileReducer.pagination.currentCards,
        isFormOpen: state.profileReducer.isFormOpen,
        users: state.profileReducer.users
    }
}

export default connect(mapStateToProps)(App);
