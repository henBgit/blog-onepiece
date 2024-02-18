import React, { useState, useEffect } from 'react';
import { getVideos,uploadVideo,deleteVideo } from '../services/vidoeService';
import { getAllCharacters } from '../services/CharctersServices';
export default function Wmvideos({backToDashboard}) {

  const [videos, setVideos] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [selectedCharId,setselectedCharId]= useState('');

  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
  });
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const fetchedVideos = await getVideos();
      setVideos(fetchedVideos);
      const fetchedCharacters = await getAllCharacters();
      setCharacters(fetchedCharacters);
    }
    fetchData();
  }, []);




  const onSubmit = async (e) => {
    e.preventDefault();

    if (!videoForm.title || !videoForm.description || !videoFile) {
      
      return;
    }

    setIsUploading(true);


    try {
    
      const downloadURL = await uploadVideo(
        videoForm.title,
        videoForm.description,
        videoFile,
        selectedCharId
      );

   
      setVideos((prevVideos) => [
        ...prevVideos,
        {
          id: Date.now(), 
          title: videoForm.title,
          description: videoForm.description,
          videoURL: downloadURL,
          selectedCharId:selectedCharId
        },
      ]);

      setVideoForm({ title: '', description: '' });
      setVideoFile(null);
      setIsWaiting(false);
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const onFileChange = (e) => {
    
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const onDeleteVideo = async (videoId) => {
    try {

      await deleteVideo(videoId);
  

      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };


  return (
    <div className="container wmvideos-container">
    <div className="row">
      <div className="col-md-12">
        <div className="card shadow-effect bg-secondary-theme">
          <div className="card-body text-center">
            <h3 className="text-theme-center">כל הסרטונים</h3>
            <p className="subtitle">נהל את הסרטונים כמו סופר סאיין</p>
            <button className="btn btn-warning ml-2" onClick={() => backToDashboard()}>חזרה לדשבורד</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 mt-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Video List</h5>
            <ul className="list-group">
              {videos.length > 0 ? (
                videos.map(video => (
                  <li key={video.id} className="list-group-item">
                    <div className="video-card">
                      <div className="video-details">
                        <h6 className="card-subtitle mb-2">{video.title}</h6>
                        <p className="card-text">{video.description}</p>
                      </div>
                      <div className="video-player">
                        <video src={video.videoURL} controls />
                      </div>
                      <button className="btn btn-danger btn-delete" onClick={() => onDeleteVideo(video.id)}>Delete</button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No videos found.</li>
              )}
            </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container" dir="rtl" lang="he">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="text-theme-primary dragon-ball">הוסף וידאו <span className="dragon-ball">חדש</span></h3>
            <p className="mb-5 dragon-ball">ניתן להוסיף את הוידאו שלך כאן</p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="dragon-ball-form">
        <div className="form-group">
          <label htmlFor="character" className="dragon-ball-label">
            דמות
          </label>
          <select
            id="character"
            value={selectedCharId}
            onChange={(e) => setselectedCharId(e.target.value)}
            className="form-control dragon-ball-input"
          >
            <option value="">בחר דמות</option>
            {characters.map((character) => (
              <option key={character.id} value={character.id}>
                {character.name}
              </option>
            ))}
          </select>
        </div>
          <div className="form-group">
            <label htmlFor="title" className="dragon-ball-label">
              כותרת
            </label>
            <input
              type="text"
              id="title"
              value={videoForm.title}
              onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
              className="form-control dragon-ball-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="dragon-ball-label">
              תיאור
            </label>
            <textarea
              id="description"
              value={videoForm.description}
              onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
              className="form-control dragon-ball-textarea"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="videoFile" className="dragon-ball-label">
              קובץ וידאו
            </label>
            <input type="file" id="videoFile" onChange={onFileChange} className="form-control dragon-ball-input" />
          </div>
          <button type="submit" className="btn btn-primary dragon-ball-button">
            העלה וידאו
          </button>
        </form>
        <div className="loading-view" style={{ display: (isUploading || isWaiting) ? 'block' : 'none' }}>
          <div className="loading-spinner"></div>
          <p className="loading-message">אנא המתינו...</p>
        </div>
      </div>
    </div>
  );
}
