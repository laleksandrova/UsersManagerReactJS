import React from 'react';
import { useState, useEffect } from 'react';
import { getUserById, saveUser } from './../../../core/api/users.api';
import './UserEdit.css';
import { Redirect } from 'react-router-dom';


export function UserEdit(props) {
    console.log(props);

    const [editedUser, setEditedUser] = useState({ name: '', age: 0, email: '', password: '', isAdmin: false, isActive: false });
    const [error, setError] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (props.computedMatch.params.id) {

            getUserById(props.computedMatch.params.id).then((currentUser) => {
                console.log(currentUser);
                setEditedUser(currentUser.data);
            });
        }
    }, [props.computedMatch.params.id]);

    const onInputChange = (event) => {
        event.persist();

        setEditedUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        if (error) {
            setError('');
        }
    }

    const OnCheckboxChange = (event) => {
        event.persist();

        setEditedUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.checked
        }))

        if (error) {
            setError('');
        }
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        saveUser(editedUser).then(() => {
            console.log('success');
            setShouldRedirect(true);

        })
            .catch((err) => setError(err.message));

    }

    return (
        <>
            {shouldRedirect && <Redirect to='/users' />}

             <div className="user-edit-wrapper">
                            <form className="user-edit-form" onSubmit={onFormSubmit}>
                                {error && <span className="text-danger">{error}</span>}
                                <div className="form-group row">
                                    <label labelFor="name" class="col-4 col-form-label text-white">Name</label>
                                    <div class="col-8">
                                    <input type="text" name="name" id="name" className="form-control" onChange={onInputChange} value={editedUser.name} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                <label labelFor="age" class="col-4 col-form-label text-white">Age</label> 
                                    <div class="col-8">
                                    <input type="number" name="age" id="age" min="0" max="100" className="form-control" onChange={onInputChange} value={editedUser.age} />
                                    </div>      
                                </div>
                                <div className="form-group row">
                                    <label labelFor="email" class="col-4 col-form-label text-white" >Email</label>
                                    <div class="col-8">
                                    <input type="email" name="email" id="email" className="form-control" onChange={onInputChange} value={editedUser.email} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label labelFor="password" class="col-4 col-form-label text-white">Password</label>
                                    <div class="col-8">
                                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange} value={editedUser.password} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label labelFor="isActive" class="col-4 col-form-label text-white">Is Active</label>
                                    <div class="col-8">
                                    <input type="checkbox" name="isActive" id="isActive" className="form-control" onChange={OnCheckboxChange} value={editedUser.isActive} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label labelFor="isAdmin" class="col-4 col-form-label text-white">Is Admin</label>
                                    <div class="col-8">
                                    <input type="checkbox" name="isAdmin" id="isAdmin" className="form-control" onChange={OnCheckboxChange} value={editedUser.isAdmin} />
                                    </div>
                                </div>
                                <button className="btn btn-outline-light btn-success btn-lg mt-5">Save user</button>
                            </form>
                        </div>                        
        </>        
    )
}