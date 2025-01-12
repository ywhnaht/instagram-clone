import { HStack } from '@chakra-ui/react';
import StoryItem from './StoryItem';
import { useRef, useState, useEffect } from 'react';
import ScrollButton from '../ScrollButton';
import { useNavigate } from 'react-router-dom';

function StoryList({ stories }) {
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const [isLeftVisible, setIsLeftVisible] = useState(false);
    const [isRightVisible, setIsRightVisible] = useState(true);

    const updateButtonVisibility = () => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;
    
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    
        const isAtStart = scrollLeft <= 0;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1; // Dùng -1 để tránh sai số nhỏ
    
        setIsLeftVisible(!isAtStart);
        setIsRightVisible(!isAtEnd);
    };
    

    const handleScroll = (direction) => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollAmount = 315;
        const newScrollPosition =
            direction === 'left'
                ? scrollContainer.scrollLeft - scrollAmount
                : scrollContainer.scrollLeft + scrollAmount;

        scrollContainer.scrollTo({
            left: newScrollPosition,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        scrollContainer.addEventListener('scroll', updateButtonVisibility);

        updateButtonVisibility();

        return () => {
            scrollContainer.removeEventListener(
                'scroll',
                updateButtonVisibility
            );
        };
    }, []);

    return (
        <div className="relative w-[38.5rem]">
            {isLeftVisible && (
                <ScrollButton
                    direction="left"
                    onClick={() => handleScroll('left')}
                />
            )}
            <div
                ref={scrollRef}
                className="flex overflow-hidden py-3"
                style={{ scrollBehavior: 'smooth' }}
            >
                <HStack spacing={4}>
                    {stories.map((story, index) => (
                        <StoryItem
                            key={index}
                            onClick={() => navigate(`/stories/${story.username}/${story.storyId}`)}
                            {...story}
                        />
                    ))}
                </HStack>
            </div>
            {isRightVisible && (
                <ScrollButton
                    direction="right"
                    onClick={() => handleScroll('right')}
                />
            )}
        </div>
    );
}

export default StoryList;
