import React from 'react';
import {connect, useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {openCurrentPage} from "../../redux/actions/actions";

const Pagination = (props) => {
    const dispatch = useDispatch()

    return (
        <div className="pagination">
            {props.pageNumber.map(number => (
                <span key={uuidv4()}>
                    <a onClick={() => dispatch(openCurrentPage(number))} href="!#" className="pagination__numbers">{number}</a></span>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pageNumber: state.profileReducer.pagination.pageNumber,
    }
}

export default connect(mapStateToProps)(Pagination);
