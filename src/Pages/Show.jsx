import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Show() {
    const [formData, setFormData] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState(true); 
    const recordsPerPage = 2;

    useEffect(() => {
        const data = localStorage.getItem("formdataList");
        if (data) {
            setFormData(JSON.parse(data));
        }
    }, []);

    const handleDelete = (pos) => {
        const updatedRecords = formData.filter((_, index) => index !== pos);
        setFormData(updatedRecords);
        localStorage.setItem("formdataList", JSON.stringify(updatedRecords));
    };

    const handleSort = () => {
        let sortedData = [...formData];
        sortedData.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return sortOrder ? -1 : 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return sortOrder ? 1 : -1;
            return 0;
        });
        setSortOrder(!sortOrder);
        setFormData(sortedData);
    };

    const filteredData = formData.filter((item) =>
        search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    return (
        <div className="show-container">
            <h1>Show Data</h1>
            <input
                type='text'
                placeholder='Search by name...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='search-input'
            />
            <button onClick={handleSort} className='sort-button'>Sort by Name ⬆⬇</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Gender</th>
                        <th>Hobby</th>
                        <th>City</th>
                        <th>Image</th>
                        <th>Upload</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((v, i) => (
                        <tr key={i}>
                            <td>{v.name}</td>
                            <td>{v.email}</td>
                            <td>{v.password}</td>
                            <td>{v.gender}</td>
                            <td>{v.hobby.toString()}</td>
                            <td>{v.city}</td>
                            <td><img src={v.image} alt="Profile" height="50" /></td>
                            <td><img src={v.newImage} alt="Upload" height="50" /></td>
                            <td>
                                <button onClick={() => handleDelete(i)}>Delete</button>
                                <Link to={`/update/${i}`}></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='pagination'>
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
}

export default Show;
