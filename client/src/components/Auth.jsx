import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

//import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {

    const [form, setForm] = useState(initialState);  //state field for the form

    const [isSignup, setIsSignup] = useState(true);  //to check the user is in the signUp form
                                                     //if false then the user is in the signIn form 

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup); //TO SWITCH BETWEEN THE SIGNUP AND SIGN IN FORM 
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); //will update the state of the textfield based on the user input

    }


    const handleSubmit = async (e) => {         //FUNCTIONALITIES OF THE BUTTON onSubmit
       e.preventDefault();                      // To prevent the page from reloading once the user hit the button   
       
       console.log(form);

       const {username, password, phoneNumber, avatarURL } = form;   //getting and compressing the data 

       const URL = 'http://localhost:5000/auth';                                  //specify the url that we are making the request to
    


       //use the axios to make the request above
       const { data: { token, userId, hashedPassword, fullName} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
        username, password, fullName: form.fullName, phoneNumber, avatarURL,
            });
            
            //getting the data in the backend and storing it in the cookies
            cookies.set('token', token);
            cookies.set('username', username);
            cookies.set('fullName', fullName);
            cookies.set('userId', userId);

            if(isSignup) {
                cookies.set('phoneNumber', phoneNumber);
                cookies.set('avatarURL', avatarURL);
                cookies.set('hashedPassword', hashedPassword);
            }

            window.location.reload();               //reload the application to update the authToken

    }




return (

    <div className="auth__form-container">                          
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">

                <p>{isSignup ? 'Sign Up' : 'Sign In' /** it is a form header if is signUp show signUp otherwise show SignIN */}</p>

                <form onSubmit={handleSubmit} >
                
                {/**if it is in the signUp show the textfields below*/
                isSignup && ( //FULLNAME TEXTFIELD
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                )}
                            <div className="auth__form-container_fields-content_input" /**USERNAME TEXTFIELD */> 
                                <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                
                {/**if it is in the signUp show the textfields below*/
                isSignup && ( //PHONE NUMBER TEXTFIELD
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                    )}

                {/**if it is in the signUp show the textfields below*/
                isSignup && ( //AVATAR URL TEXTFIELD
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar Url</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar Url"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                    )}

                            <div className="auth__form-container_fields-content_input" /**PASSWORD TEXTFIELD */> 
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                {/**if it is in the signUp show the textfields below*/
                isSignup && ( //CONFIRM PASSWORD TEXTFIELD
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                    )}

                        <div className="auth__form-container_fields-content_button"/**FORM'S BUTTON */>
                            <button>{isSignup ? "Sign Up" : "Sign In"/**To change the name of the button base on the form */}</button>
                        </div>

                </form> 

                <div className="auth__form-container_fields-account" /**TO SWITCH BETWEEN THE SIGNUP AND SIGN IN FORM */>
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                </div>


                

            </div>
        </div>
        
        {/* <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
        </div> */}



    </div>

)
}

export default Auth