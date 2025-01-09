import React from 'react';
import NewFeed from '../../layouts/NewFeed';
import RightSideBar from '../../layouts/RightSideBar';

const Home = () => {
    return (
        <main className="flex flex-1 flex-grow-1 flex-col items-center justify-center h-screen">
            <div className="flex justify-center w-full items-stretch flex-row">
                <div className="max-w-2xl w-full ml-36">
                    <NewFeed />
                </div>
                <div className="flex-1 pl-16 max-w-96">
                    <RightSideBar />
                </div>
            </div>
        </main>
    );
};

export default Home;
