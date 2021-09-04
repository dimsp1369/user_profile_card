import React, {useEffect, useState} from 'react';
import AddBtn from "./components/utils/AddBtn";
import UserProfileCard from "./components/UserProfileCard";
import {v4 as uuidv4} from "uuid";
import ModalWrapper from "./components/modal/ModalForm";
import Pagination from "./components/utils/pagination";
import {connect, useDispatch} from "react-redux";
import {getUser} from "./redux/actions/asyncActions";
import Loader from "./components/utils/Loader";

const App = (props) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [cardPerPage] = useState(15)

    useEffect(() => {
        dispatch(getUser(setIsLoading))
    }, [dispatch])

    const indexOfLastCard = currentPage * cardPerPage;
    const indexOfFirstCard = indexOfLastCard - cardPerPage;
    const currentCards = props.users.slice(indexOfFirstCard, indexOfLastCard)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    if (isLoading) return <Loader/>

    return (
        <>
            <AddBtn/>
            <div className="wrapper">
                {currentCards.map((user, index) => <UserProfileCard key={uuidv4()} initialValue={user}
                                                                    index={index}/>)}
            </div>
            {props.isFormOpen && <ModalWrapper/>}
            <Pagination cardPerPage={cardPerPage} paginate={paginate}/>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        users: state.profileReducer.users,
        isFormOpen: state.profileReducer.isFormOpen
    }
}

export default connect(mapStateToProps)(App);
