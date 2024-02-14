import React, { useState } from 'react'
import Wmnewchar from './Wmnewchar'
import Wmchars from './Wmchars'

export default function ManageChars({backToDashboard}) {
    const [showNewCharForm, setShowNewCharForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editCharacter, setEditCharacter] = useState(null);



    const handleAddNewChar = () => {
        setShowNewCharForm(true);
        setEditCharacter(null);
        setEditMode(false);
      };

      const handleBack = () => {
        setShowNewCharForm(false);
        backToDashboard(); 
      };
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow-effect bg-secondary-theme">
                            <div className="card-body text-center">
                                <h3 className="text-theme-center">All Blog Characters</h3>
                                <p className="subtitle">From here, you can manage your blog characters.</p>
                                {!showNewCharForm && (
                                    <button className="btn btn-info bg-theme" onClick={handleAddNewChar}>
                                    Add new Character
                                    </button>
                                )}
                                <button  onClick={handleBack} className="btn btn-warning ml-2">Back to Dashboard</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {showNewCharForm ? (
                    <Wmnewchar editMode={editMode} editCharacter={editCharacter} showNewCharForm={showNewCharForm} setShowNewCharForm={setShowNewCharForm} />
                    ) : (
                    <div className="col-md-12">
                        <Wmchars showNewCharForm={showNewCharForm} setShowNewCharForm={setShowNewCharForm} setEditCharacter={setEditCharacter} setEditMode={setEditMode} />
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
