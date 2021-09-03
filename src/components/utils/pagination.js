import React from 'react';
import {connect} from "react-redux";
import {v4 as uuidv4} from "uuid";

const Pagination = ({cardPerPage, users, paginate}) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(users.length / cardPerPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <div className="pagination">
            {pageNumbers.map(number => (
                <span key={uuidv4()}>
                    <a onClick={() => paginate(number)} href="!#" className="pagination__numbers">{number}</a></span>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.profileReducer.users,
    }
}

export default connect(mapStateToProps)(Pagination);
