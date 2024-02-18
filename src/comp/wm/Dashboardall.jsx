import React, { useState } from 'react'
import Wmcateg from './Wmcateg';
import Wmvideos from './Wmvideos';
import ManageChars from './ManageChars';
import WmHeader from './WmHeader'


export default function Dashboardall() {

    const [activeComponent, setActiveComponent] = useState(null);

    const showCategoriesComponent = () => {
        setActiveComponent('categories');
    };

    const showCharactersComponent = () => {
        setActiveComponent('characters');
    };

    const showVideosComponent = () => {
        setActiveComponent('videos');
    };

    const handleBackToDashboard = () => {
        setActiveComponent(null); 
        
    };

      
    return (
        <div>
          <div className="container">
                { activeComponent === null ? (
                <div className="row banner-row">
                    <div className="col-md-4 md-5" style={{ marginTop: '10%' }}>
                        <button className="card shadow-effect" onClick={showCategoriesComponent}>
                            <div className="card-body text-center bg-dragon-ball">
                                <h1 className="mt-3 text-theme-primary"><i className="fas fa-dragon"></i></h1>
                                <h2 className="text-theme-primary">Category</h2>
                                <p>Manage your category details here</p>
                            </div>
                        </button>
                    </div>

                    <div className="col-md-4 mb-5" style={{ marginTop: '10%' }}>
                        <button className="card shadow-effect" onClick={showCharactersComponent}>
                            <div className="card-body text-center bg-dragon-ball">
                                <h1 className="mt-3 text-theme-primary"><i className="fas fa-dragon"></i></h1>
                                <h2 className="text-theme-primary">Character</h2>
                                <p>Manage your character details here</p>
                            </div>
                        </button>
                    </div>

                    <div className="col-md-4 mb-5" id="vidoesbanner" style={{ marginTop: '10%' }}>
                        <button className="card shadow-effect" onClick={showVideosComponent}>
                            <div className="card-body text-center bg-dragon-ball">
                                <h1 className="mt-3 text-theme-primary"><i className="fas fa-dragon"></i></h1>
                                <h2 className="text-theme-primary">Video</h2>
                                <p>Upload videos</p>
                            </div>
                        </button>
                    </div>
                </div>) :
                        (
                <div className="container mt-5">
                    {activeComponent === 'categories' && <Wmcateg backToDashboard={handleBackToDashboard} />}
                    {activeComponent === 'characters' && < ManageChars backToDashboard={handleBackToDashboard} />}
                    {activeComponent === 'videos' && < Wmvideos  backToDashboard={handleBackToDashboard} />}
                </div>)
                }
            </div>
        </div>
    )
}
