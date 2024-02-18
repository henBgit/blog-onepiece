import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getCharacterById, addCommentToCharacter } from '../services/CharctersServices';
import { getVideosByCharacterName } from '../services/vidoeService';


export default function Charecter() {


    const { id } = useParams();

    const [character, setCharacter] = useState(null);

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [videos, setVideos] = useState([]);

    const addComment = async () => {
        try {
            await addCommentToCharacter(character.id, comment);
            setComments([...comments, comment]);
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);

        }
    };


    useEffect(() => {
        const fetchVideos = async () => {
            try {

                if (character) {
                    const characterVideos = await getVideosByCharacterName(character.name);
                    setVideos(characterVideos);
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, [character]);


    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const characterData = await getCharacterById(id);
                setCharacter(characterData);
                setComments(characterData.comments || []);
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };

        fetchCharacter();
    }, [id]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
      
        <div className="container" style={{ direction: 'rtl', textAlign: 'right' }}>
            <hr />
            <div className="row">
                <div className="col-md-12">
                    <h2 style={{ textAlign: 'center' }}>{character?.name}</h2>
                    <div className="card" >
                        <img
                            src={character?.image_link}
                            className="card-img-top"
                          
                            alt={character?.name}
                        />
                        <div className="card-body" style={{ textAlign: 'center' }}>
                            <h5 className="card-title">{character?.category}</h5>
                            <p className="card-text">{character?.description}</p>
                            <p>
                                <strong>תאריך יצירה:</strong>
                                {character.createdAt && character.createdAt.seconds
                                    ? new Date(character.createdAt.seconds * 1000).toLocaleDateString()
                                    : 'Date Not Available'}
                            </p>
                            <p>
                                <strong>רמת כח:</strong> {character?.powerLevel}
                            </p>
                            <p>
                                <strong>משתמש פרי שטן:</strong> {character.devil_fruit ? 'כן' : 'לא'}
                            </p>
                            {/* <img src={icon} style={{ width: '300px', height: '200px' }} alt="Icon" /> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body" style={{ textAlign: 'center' }}>
                            <h5 className="card-title">Content</h5>
                            <div dangerouslySetInnerHTML={{ __html: character?.content }}></div>
                           
                            {videos.map((video, index) => (
                                <div className="video-banner" key={index}>
                                    <h1 style={{ textAlign: 'center' }}>{video.title}</h1>
                                    <p style={{ textAlign: 'center' }}>{video.description}</p>
                                    <div className="card mb-3">
                                        <video src={video.videoURL} controls className="card-img-top" style={{ borderRadius:'10px', border:'1px solid #FFFFF0', height: '450px' ,width:'100%', marginTop:"12px" }}></video>
                                    </div>
                                </div>
                            ))}
                         
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-12">
                    {comments.length > 0 && (
                        <div>
                            <h5>תגובות</h5>
                            <div className="comment-bubbles">
                                {comments.map((comment, index) => (
                                    <div className="comment-bubble" key={index}>
                                    <blockquote className="speech-bubble">{comment}</blockquote>
                                </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">הוסף תגובה</h5>
                            <textarea
                                id="comment"
                                className="form-control"
                                rows="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button className="btn btn-primary" onClick={addComment}>
                                הוסף תגובה
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-12" style={{ textAlign: 'center' }}>
                    <Link className="btn btn-primary" to={"/"} >
                        חזרה
                    </Link>
                </div>
            </div>
        </div>
    )
}


