// import React, { useState, useEffect } from "react";
// import {
//   auth,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   signInWithEmailAndPassword,
// } from "../../firebase";
// import { useDispatch } from "react-redux";
// import { login } from "./userSlice";
// import Login from "./Login";

// const SignIn = () => {
//   return <div>{onloginpage ? <Login></Login> : <Register></Register>}</div>;
// };

// export default SignIn;

// // import React, { useState, useEffect } from "react";
// // import {
// //   auth,
// //   createUserWithEmailAndPassword,
// //   updateProfile,
// //   signInWithEmailAndPassword,
// // } from "../../firebase";
// // import { useDispatch } from "react-redux";
// // import { login } from "./userSlice";
// // import Login from "./Login";

// // const SignIn = () => {
// //   const [onloginpage, setonloginpage] = useState(true);

// //   const Register = () => {
// //     // use state constants for the the form inputs
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [name, setName] = useState("");
// //     const [error, seterror] = useState("");
// //     const [profilePic, setProfilePic] = useState("");
// //     const dispatch = useDispatch();

// //     // A quick check on the name field to make it mandatory
// //     const register = () => {
// //       if (!name) {
// //         return alert("Please enter a full name");
// //       }

// //       // Create a new user with Firebase
// //       createUserWithEmailAndPassword(auth, email, password)
// //         .then((userAuth) => {
// //           // Update the newly created user with a display name and a picture
// //           updateProfile(userAuth.user, {
// //             displayName: name,
// //             photoURL: profilePic,
// //           })
// //             .then(
// //               // Dispatch the user information for persistence in the redux state
// //               dispatch(
// //                 Register({
// //                   email: userAuth.user.email,
// //                   uid: userAuth.user.uid,
// //                   displayName: name,
// //                   photoUrl: profilePic,
// //                 })
// //               )
// //             )
// //             .catch((error) => {
// //               console.log("user not updated");
// //             });
// //         })
// //         .catch((err) => {
// //           alert(err);
// //         });
// //     };

// //     return (
// //       <div>
// //         <div className="Register">
// //           <form>
// //             <input
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               placeholder="Full name (required for registering)"
// //               type="text"
// //             />

// //             <input
// //               value={profilePic}
// //               onChange={(e) => setProfilePic(e.target.value)}
// //               placeholder="Profile picture URL (optional)"
// //               type="text"
// //             />
// //             <input
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="Email"
// //               type="email"
// //             />
// //             <input
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               placeholder="Password"
// //               type="password"
// //             />
// //             <button type="submit" onClick={register}>
// //               Register
// //             </button>
// //           </form>
// //           <p>
// //             <p>{error}</p>
// //             Not a member?{" "}
// //             <span
// //               className="Register__register"
// //               onClick={() => {
// //                 setonloginpage(true);
// //               }}
// //             >
// //               Register Now
// //             </span>
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const Login = () => {
// //     // use state constants for the the form inputs
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [error, seterror] = useState("");
// //     const dispatch = useDispatch();

// //     useEffect(() => {
// //       seterror("");
// //     });

// //     const loginToApp = (e) => {
// //       e.preventDefault();

// //       console.warn("SO I DID GET RIGHT THERE :)");

// //       // Sign in an existing user with Firebase
// //       signInWithEmailAndPassword(auth, email, password)
// //         // returns  an auth object after a successful authentication
// //         // userAuth.user contains all our user details
// //         .then((userAuth) => {
// //           console.warn("OK AND HERE :)");

// //           // store the user's information in the redux state
// //           dispatch(
// //             login({
// //               email: userAuth.user.email,
// //               uid: userAuth.user.uid,
// //               displayName: userAuth.user.displayName,
// //               photoUrl: userAuth.user.photoURL,
// //             })
// //           );

// //           console.warn("BUT NOOOOOT RIGHT THERE :)");
// //         })
// //         // display the error if any
// //         .catch((err) => {
// //           seterror("authentication failed, do not forget to register!");
// //         });
// //     };

// //     return (
// //       <div>
// //         <div className="login">
// //           <form>
// //             <input
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="Email"
// //               type="email"
// //             />
// //             <input
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               placeholder="Password"
// //               type="password"
// //             />
// //             <button type="submit" onClick={loginToApp}>
// //               Sign In
// //             </button>
// //           </form>
// //           <p>
// //             <p>{error}</p>
// //             Not a member?{" "}
// //             <span
// //               className="login__register"
// //               onClick={() => {
// //                 setonloginpage(false);
// //               }}
// //             >
// //               Register Now
// //             </span>
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return <div>{onloginpage ? <Login></Login> : <Register></Register>}</div>;
// // };

// // export default SignIn;
