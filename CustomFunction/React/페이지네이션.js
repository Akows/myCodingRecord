import React from 'react';

import '../style/Pagination.css';
import '../style/GlobalStyle.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='paganation-outer'>
            {pageNumbers.map(number => (
                <div className='paganation-btu' key={number}>
                    <button className='paganation-button gifont' onClick={() => paginate(number)}>{number}</button>
                </div>
            ))}
        </div>
    );
};

export default Pagination;


// .paganation-outer {
//     margin: 20px;
// }

// .paganation-btu {
//     display: inline-flex;
// }

// .paganation-button {
//     width: 30px;
//     height: 30px;

//     margin: 2px;

//     border: none;
//     border-radius: 10px;

//     background-color: black;
//     color: white;
// }
// .paganation-button:active {
//     background-color: white;
//     color: black;
// }



    // 페이지네이션 로직
    // 페이지네이션 로직

    // 현재 페이지를 제어할 변수 (가장 처음으로 보여질 페이지)
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지 당 요소 갯수를 제어할 변수
    const [postPerPage] = useState(7);

    // Get current posts
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = boarddata.datas?.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    //
    <Pagination
    postsPerPage={postPerPage}
    totalPosts={boarddata.datas?.length}
    paginate={paginate}
    />