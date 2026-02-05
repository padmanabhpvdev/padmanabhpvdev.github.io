import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export default function Blog(){
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 8;
    const filteredExamples = useMemo(() => {
        if (!searchQuery.trim()) {
            return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        
        const query = searchQuery.toLowerCase().trim();
        return posts
            .filter(blog => 
                blog.title.toLowerCase().includes(query) ||
                blog.desc.toLowerCase().includes(query) ||
                blog.category.toLowerCase().includes(query) ||
                blog.id.toString().includes(query)
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [searchQuery, posts]);
    
    const totalPages = Math.ceil(filteredExamples.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredExamples.slice(indexOfFirstItem, indexOfLastItem);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    useEffect(()=>{
        document.title="Blogs ● Padmanabh's Blog";
      },[]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/padmanabhpvdev/my-blog-contents/main/posts.json')
        .then(res => res.json())
        .then(data => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

  if (loading) return <div>Loading posts...</div>;
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };
    
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for(let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let startPage, endPage;
            
            if (currentPage <= 3) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            
            if (startPage > 1) {
                pageNumbers.unshift('...');
                pageNumbers.unshift(1);
            }
            if (endPage < totalPages) {
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        
        return pageNumbers;
    };

    return(
        <section className="container-fluid p-3">
            <div className="container mt-4">
                <form onSubmit={handleSearchSubmit}>
                    <div className="input-group mb-3">
                        <input type="search" className="form-control shadow-none rounded-0" name="search" id="search" 
                            placeholder="Search a topic or keyword...." aria-describedby="searchForm" value={searchQuery} onChange={handleSearchChange} />
                        <button type="submit" className="input-group-text text-primary bg-light" id="searchForm" >
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </form>
                
                {searchQuery && (
                    <div className="alert alert-info mb-3">
                        Found {filteredExamples.length} result(s) for "<strong>{searchQuery}</strong>"
                        <button className="btn btn-sm btn-danger ms-3" onClick={() => setSearchQuery("")} >
                            <i className="fa fa-close"></i>
                        </button>
                    </div>
                )}
            </div>
            
            <div className="container p-3">
                {filteredExamples.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="fa fa-search fa-3x text-muted mb-3"></i>
                        <h4>No results found</h4>
                        <p className="text-muted">Try different keywords or clear your search</p>
                    </div>
                ) : (
                    <>
                        <div className="row">
                            {currentItems.map(blog =>
                                <div className="col-12 g-3" key={blog.slug}>
                                    <a href={`/blog/${blog.slug}`} className="card mb-3 h-100 rounded border-0 shadow" style={{transform:'translateY(0)'}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={blog.image} alt={blog.title} className="img-fluid h-100 object-fit-cover" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title fw-bold">{blog.title}</h5>
                                                    <p className="card-text text-muted text-truncate">{blog.desc}</p>
                                                    <p className="card-text">
                                                        <small className="text-body-secondary">
                                                            <span className="badge bg-primary me-2">{blog.category}</span>
                                                        </small>
                                                    </p>
                                                    <p className="card-text">
                                                        <small className="text-body-secondary">Created on {blog.date}</small>
                                                    </p>
                                                    {searchQuery && (
                                                        <p className="card-text">
                                                            <small className="text-success">
                                                                <i className="fa fa-check-circle me-1"></i>
                                                                Matches your search
                                                            </small>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                        
                        {totalPages > 1 && (
                            <nav aria-label="Blog Pagination">
                                <ul className="pagination justify-content-center mt-4">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                            <i className="fa fa-chevron-left"></i>
                                        </a>
                                    </li>
                                    
                                    {getPageNumbers().map((page, index) => (
                                        <li key={index} 
                                            className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}>
                                            {page === '...' ? (
                                                <span className="page-link">...</span>
                                            ) : (
                                                <a className="page-link" onClick={() => handlePageChange(page)}>{page}</a>
                                            )}
                                        </li>
                                    ))}
                                    
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <a 
                                            className="page-link" 
                                            onClick={() => handlePageChange(currentPage + 1)} 
                                            disabled={currentPage === totalPages}
                                        >
                                            <i className="fa fa-chevron-right"></i>
                                        </a>
                                    </li>
                                </ul>
                                
                                <div className="text-center text-muted mt-2">
                                    Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredExamples.length)} of {filteredExamples.length} post{filteredExamples.length !== 1 ? 's' : ''}
                                    {searchQuery && " matching your search"}
                                </div>
                            </nav>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}