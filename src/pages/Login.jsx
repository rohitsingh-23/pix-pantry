import React, { useContext, useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        //   const temp = useContext(AuthContext);

          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(error);
        });

      //   createUserWithEmailAndPassword(auth, email, password)
      //     .then((userCredential) => {
      //       // Signed up
      //       console.log("created user: " + userCredential.user);
      //       const user = userCredential.user;
      //       console.log("Signed up Successfully");
      //       navigate("/");
      //       // ...
      //     })
      //     .catch((error) => {
      //       console.log("error: " + error);
      //       const errorCode = error.code;
      //       const errorMessage = error.message;
      //       // ..
      //     });
    } catch (err) {}
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      {error && <div> Something went wrong : {error}</div>}
      <div className="hero-content flex-col ">
        <div className="text-center">
          <h1 className="text-5xl font-bold">PIXPANTRY</h1>
          <p className="py-6 text-3xl">Login to see your photos.</p>
        </div>
        <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="input input-bordered"
                required
              />
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
