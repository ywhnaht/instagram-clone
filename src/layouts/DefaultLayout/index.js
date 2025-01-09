import { Outlet } from 'react-router-dom';
import LeftSideBar from '../LeftSideBar';
import NewFeed from '../NewFeed';
import RightSideBar from '../RightSideBar';

function DefaultLayout() {
    return (
        <div className="flex h-screen">
            {/* Left Sidebar */}
            <div className="w-64 h-full fixed">
                <LeftSideBar />
            </div>

            {/* Main Content */}
            <div className="ml-64 flex-1 flex flex-col">
                <main className="flex-1 flex items-center justify-center">
                    <div className="flex w-full justify-center max-w-7xl">
                        {/* New Feed */}
                        <div className="flex-grow w-full max-w-2xl">
                            <NewFeed />
                        </div>

                        {/* Right Sidebar */}
                        <div className="flex-1 pl-16 w-96">
                            <RightSideBar />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;
