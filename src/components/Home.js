import React from 'react';
import Team from './team/Team';

const Home = (props) => {
    return (
        <div className='container'>
           <h2 className='font-weight-light text-center mt-5'>TEAMS</h2>
           <Team toggleScroll={props.toggleScroll}></Team>
        </div>
    );
};

export default Home;