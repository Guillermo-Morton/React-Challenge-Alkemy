import React from 'react';
import Team from './team/Team';

const Home = () => {
    return (
        <div className='container'>
           <h2 className='font-weight-light my-3'>TEAMS</h2>
           <Team></Team>
        </div>
    );
};

export default Home;