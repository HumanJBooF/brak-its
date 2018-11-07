// import React from "react";
// import ReactDom from 'react-dom';
// import Container from "../../components/Container";
// import Card from "../../components/Card";
// import Navbar from "../../components/Navbar";

// const formValid = formErrors => {
//     let valid = true;
//     Object.values(formErrors).forEach(val => {
//         val.length > 0 && (valid = false);
//     })

//     return valid;
// }

// class SignIn extends React.Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//            username: null,
//            password: null,
//            formErrors: {
//                username: "",
//                email:    "",
//                password: ""
//            }
//         }
//     }

//     handleSubmit = event => {
//         event.prevent.default();

//         if (formValid(this.state.formErrors)){
//             console.log(`
//             ------SUBMITTING-----
//             username: ${this.state.username}
//             password: ${this.state.email}
//             `)
//         } else {
//             console.log("INVALID FORM ENTRY");
//         }
//     }
//     handleChange = event => {
//         event.prevent.default();
        
//         //const { username, value } = e.target;
//         let  formErrors = this.state.formErrors;

//         switch(username) {
//             case 'username':
//                 formErrors.username = value.length > 0;
//                 break;
//             case 'password':
//                 formErrors.username = value.length > 8 
//         }
//     }


//     render() {
//         return (
//             <>
//             <Navbar />
//             <Container>
//                 <Card>
//                 <header className="center-align s12">Sign In!</header>
//                     <div className="row">
//                         <form className="col s12 center-align" onSubmit={this.handleSubmit}>
//                             <div className="row">
//                                 <div className="input field col m6 center-align username">
//                                     <input 
//                                         id="username" 
//                                         type="text" 
//                                         name="username"
//                                         className="validate" 
//                                         onChange={this.handleChange} 
//                                     />
//                                     <label for="username">UserName:</label>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="center-align input field col m6">
//                                     <input 
//                                         name="password" 
//                                         id="password" 
//                                         type="password" 
//                                         className="validate" 
//                                         onChange={this.handleChange}    
//                                     />
//                                     <label for="password">Password:</label>
                                
//                                 </div><div className="btn btn-large" > sign in!</div>
//                             </div>
//                         </form>
//                     </div>
//                 </Card>
//             </Container>
//             </>
//         )
//     }

// }

// export default SignIn;