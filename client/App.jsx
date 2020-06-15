/* eslint-disable import/extensions */
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import LoginPage from './LoginPage.jsx';
import './stylesheets/styles.scss';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const mapStateToProps = ({ awsAuth }) => ({
  accessKeyId: awsAuth.accessKeyId,
});

function App(props) {
  const { accessKeyId } = props;
  return (
    <Router>
      <div id="main"> {accessKeyId ? <MainContainer /> : <LoginPage />}</div>
    </Router>
  );
}

export default connect(mapStateToProps)(App);
