import { useEffect, useState } from 'react';
import './Sample.css'
import { Link } from 'react-router-dom';

export default function Home(){
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        fetch('https://raw.githubusercontent.com/padmanabhpvdev/my-blog-contents/main/posts.json').then(res=>res.json())
        .then(data=>{setPosts(data);setLoading(false)})
        .catch(error=>{console.error('Error fetching posts: ',error);setLoading(false)})
    },[]);
    
    const showLatest= [...posts].sort(
        (a,b) => new Date(b.date) - new Date(a.date)
    ).slice(0,3);
    return(
        <section className="container-fluid p-4">
            <div className="container mt-4">
                <h3 className="text-center fw-bold">Welcome to <span className="text-primary">My Blog</span></h3>
                <h5 className="text-center">I'll share topics about:</h5><br />
                <div className="row g-3">
                    <div className="col-6 col-sm-3">
                        <div className="card p-4 coding text-white h-100">
                            <h2 className="card-title text-center p-2">
                                <i className="fa fa-code"></i>
                            </h2>
                            <strong className="text-center">Coding</strong>
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="card p-4 electronics text-white h-100">
                            <h2 className="card-title text-center p-2">
                                <i className="fa fa-microchip"></i>
                            </h2>
                            <strong className="text-center">Electronics</strong>
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="card p-4 se text-white h-100">
                            <h2 className="card-title text-center p-2">
                                <i className="fa fa-volume-low"></i>
                            </h2>
                            <strong className="text-center">Sound Engineering</strong>
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="card p-4 tech text-white h-100">
                            <h2 className="card-title text-center p-2">
                                <i className="fa fa-gears"></i>
                            </h2>
                            <strong className="text-center">And more...</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <h3 className='fw-bold'>Latest <span className="text-primary">Blogs</span> &#x270F;</h3><br />
                <div className="row g-3">
                    {showLatest.map(blogs=>(
                        <div className="col-sm-4">
                            <Link to={`/blog/${blogs.slug}`} className="card shadow border-0 h-100" key={`/blog/${blogs.slug}`}>
                                <img src={blogs.image} alt={blogs.title} className="card-img-top h-100" />
                                <div className="card-body">
                                    <h5 className="fw-bold card-title">{blogs.title}</h5>
                                    <small className="text-muted">
                                        <i className="fa fa-calendar"></i> {blogs.date}</small>
                                </div>
                            </Link>
                        </div>   
                    ))}
                </div><br />
                <div className="text-center">
                    <a href="/blog" className="buttonh btn btn-primary rounded-0"><i className="fa fa-compass"></i> Explore More</a>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src="https://img.freepik.com/free-photo/musical-button-object-stereo-volume_1172-501.jpg" alt="Radio" className="img-fluid rounded" />
                    </div>
                    <div className="col-md-6">
                        <h3 className='fw-bold'>Online <span className="text-primary">Radio</span> &#x1f1ee;&#x1f1f3;</h3>
                        <p className=''>In this website, you can access India's most comprehensive online radio directory, featuring over 1000 active stations streaming from every corner of the country.
                             This curated collection spans all major genres and languages, organized for easy navigation. You'll find everything from national FM broadcasters like <span className="fw-bold">AIR (All India Radio)</span> and <span className="fw-bold">private networks (Radio Mirchi, Red FM, Fever)</span> to hyper-local community stations, regional language channels
                              and niche digital-only streams.</p>
                        <div className="align-items-center">
                            <a href="/radios" className="btn btn-primary rounded-0"><i className="fa fa-radio"></i> Explore Radios</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}