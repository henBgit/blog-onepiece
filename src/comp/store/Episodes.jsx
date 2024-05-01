import React, { useState, useEffect } from 'react';

export default function Episodes() {
    const [pageNumber, setPageNumber] = useState('1');

    const loadPage = () => {
        if (pageNumber !== "") {
            const url = `https://animeisrael.website/watch/fulllink/op/fulllinkop-${pageNumber}.php`;
            document.getElementById("animeFrame").src = url;
        } else {
            alert("Please select a page number.");
        }
    };

    const handlePageChange = (event) => {
        setPageNumber(event.target.value);
    };

    useEffect(() => {
        loadPage();
    }, [pageNumber]);

    return (
        <div>
            <div className="container" style={{ direction: 'rtl', textAlign: 'right' }} dir="rtl" lang="he">
                <div className="row" style={{textAlign:'center' }}>
                    <select  className='masho' id="pageNumber" onChange={handlePageChange} value={pageNumber}>

                        <option value="">Select a Episode number</option>
                        {[...Array(1000).keys()].map((index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>
                <div className="row">
                    <iframe id="animeFrame" frameborder="0" height={'1000px'} title='bla' scrolling='no'></iframe>
                </div>
            </div>
        </div>
    );
}
