import React, { useEffect, useState } from 'react';
import { getVideos } from '../services/vidoeService';
import { Link } from 'react-router-dom';



export default function AllVideos() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const videosDb = await getVideos();
            setVideos(videosDb);
        };

        fetchVideos();
    }, []);

    return (
        <div>
            <div className="container" style={{ direction: 'rtl', textAlign: 'right' }} dir="rtl" lang="he">
                <div className="row">
                    {videos.map((video, index) => (
                        <div className="col-md-6" >
                            <div className="card mb-4" key={index}>
                            <div style={{marginRight:'130px'}}>

                            <div className="card-body">
                                <h2 className="card-title"><Link to={"/character/" + video.selectedCharId} style={{textDecoration:"none"}}  className='category-button'> {video.title} </Link></h2>
                                <p className="card-text">{video.description}</p>
                                <video  src={video.videoURL} controls className="card-img-top" style={{ borderRadius:'10px', border:'1px solid #FFFFF0', height: '200px' ,width:'300px', marginTop:"12px" }}></video>
                                </div>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    )
}
